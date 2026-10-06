import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { isSet, settings } from "./content";

// Watch the demo form. On submit the visitor gets an auto-reply with the demo link and the team
// gets a notification. Mail goes through Resend (https://resend.com); set these in Vercel:
//   RESEND_API_KEY   required, the Resend API key
//   DEMO_FROM_EMAIL  optional, sender on a domain verified in Resend
//   DEMO_TEAM_EMAIL  optional, where new requests are sent

const defaultFrom = "Sentinel Vero <hello@sentinelvero.com>";
const defaultTeam = "hello@sentinelvero.com";

export const demoRequestSchema = z.object({
  name: z.string().trim().min(1, "Please enter your name").max(120),
  email: z.string().trim().email("Please enter a valid work email").max(200),
  company: z.string().trim().min(1, "Please enter your company").max(160),
  phone: z.string().trim().max(40).optional().default(""),
  teamSize: z.string().trim().max(40).optional().default(""),
  // Honeypot: real visitors never see or fill this field.
  website: z.string().max(200).optional().default(""),
});

export type DemoRequest = z.input<typeof demoRequestSchema>;

export const demoLink = isSet(settings.demoUrl) ? settings.demoUrl : null;

const escapeHtml = (value: string) =>
  value.replace(
    /[&<>"']/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] ?? c,
  );

async function sendEmail(apiKey: string, message: Record<string, unknown>) {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify(message),
  });
  if (!response.ok) {
    throw new Error(`Resend responded ${response.status}: ${await response.text()}`);
  }
}

function autoReply(name: string) {
  const first = escapeHtml(name.split(" ")[0] ?? name);
  const link = demoLink
    ? `<p><a href="${escapeHtml(demoLink)}" style="display:inline-block;background:#00D39A;color:#031716;padding:12px 20px;border-radius:10px;font-weight:600;text-decoration:none">Watch the demo</a></p>`
    : `<p>The demo video is being finalised. We'll send you the link as soon as it's live.</p>`;
  const text = demoLink
    ? `Watch the demo: ${demoLink}`
    : "The demo video is being finalised. We'll send you the link as soon as it's live.";
  return {
    subject: "Your Sentinel Vero demo",
    html: `<div style="font-family:Arial,sans-serif;font-size:15px;line-height:1.6;color:#031716">
<p>Hi ${first},</p>
<p>Thanks for your interest in Sentinel Vero. Here's your demo, showing how Vero finds unbilled work across your jobs, quotes and payroll.</p>
${link}
<p>Want to see it on your own jobs? Just reply to this email and we'll set up an Operational Discovery.</p>
<p>The Sentinel Vero team</p>
</div>`,
    text: `Hi ${name.split(" ")[0] ?? name},\n\nThanks for your interest in Sentinel Vero.\n\n${text}\n\nWant to see it on your own jobs? Just reply to this email and we'll set up an Operational Discovery.\n\nThe Sentinel Vero team`,
  };
}

export const submitDemoRequest = createServerFn({ method: "POST" })
  .inputValidator((data: DemoRequest) => demoRequestSchema.parse(data))
  .handler(async ({ data }) => {
    // Bots that fill the honeypot get a normal-looking success and no email.
    if (data.website) return { ok: true as const };

    const apiKey = process.env["RESEND_API_KEY"];
    if (!apiKey) {
      console.error("Demo request not emailed: RESEND_API_KEY is not set", data.email);
      throw new Error("Email is not configured yet");
    }
    const from = process.env["DEMO_FROM_EMAIL"] || defaultFrom;
    const team = process.env["DEMO_TEAM_EMAIL"] || defaultTeam;

    const rows = [
      ["Name", data.name],
      ["Email", data.email],
      ["Company", data.company],
      ["Phone", data.phone || "Not given"],
      ["Team size", data.teamSize || "Not given"],
    ];

    await Promise.all([
      sendEmail(apiKey, { from, to: data.email, reply_to: team, ...autoReply(data.name) }),
      sendEmail(apiKey, {
        from,
        to: team,
        reply_to: data.email,
        subject: `Demo request: ${data.name}, ${data.company}`,
        html: `<p>New Watch the demo request from the website.</p><table>${rows
          .map(([k, v]) => `<tr><td><b>${k}</b></td><td>${escapeHtml(v ?? "")}</td></tr>`)
          .join("")}</table>`,
        text: rows.map(([k, v]) => `${k}: ${v}`).join("\n"),
      }),
    ]);
    return { ok: true as const };
  });
