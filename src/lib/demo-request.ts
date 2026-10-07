import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { isSet, settings } from "./content";

// Watch the demo form. Each request is checked for bots (Cloudflare Turnstile, a honeypot and a
// rate limit), saved to PostgreSQL, then the visitor gets an auto-reply with the demo link and the
// team gets a notification. Mail goes through Resend (https://resend.com). Set these in Vercel:
//   RESEND_API_KEY           the Resend API key
//   DEMO_FROM_EMAIL          optional, sender on a domain verified in Resend
//   DEMO_TEAM_EMAIL          optional, where new requests are sent
//   DATABASE_URL             PostgreSQL connection string (see demo-request.server.ts)
//   VITE_TURNSTILE_SITE_KEY  Turnstile site key, shown in the form
//   TURNSTILE_SECRET_KEY     Turnstile secret key, checked on the server
// Every part is optional: whatever is configured runs, but at least one of the database or Resend
// must be set or the form reports an error.

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
  // Filled in by the Cloudflare Turnstile widget.
  "cf-turnstile-response": z.string().max(4096).optional().default(""),
  page: z.string().max(300).optional().default(""),
});

export type DemoRequest = z.input<typeof demoRequestSchema>;

/** Error messages the form recognises and explains to the visitor. */
export const demoErrors = {
  bot: "Bot check failed",
  rateLimited: "Too many requests",
} as const;

export const turnstileSiteKey = import.meta.env["VITE_TURNSTILE_SITE_KEY"] as string | undefined;

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
    const body = await response.text();
    console.error(`Resend responded ${response.status}: ${body}`);
    // Resend's error name (e.g. validation_error) is safe to show; the message stays in the log.
    const name = /"name"\s*:\s*"([a-z_]+)"/.exec(body)?.[1] ?? "";
    throw new Error(`EMAIL_${response.status}${name ? `_${name}` : ""}`);
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
  .validator((data: DemoRequest) => demoRequestSchema.parse(data))
  .handler(async ({ data }) => {
    // Bots that fill the honeypot get a normal-looking success and nothing is stored or sent.
    if (data.website) return { ok: true as const, emailed: true };

    const server = await import("./demo-request.server");
    const { ip, userAgent } = server.requestInfo();
    if (!(await server.verifyTurnstile(data["cf-turnstile-response"], ip))) {
      throw new Error(demoErrors.bot);
    }
    const ipHash = await server.hashIp(ip);

    const apiKey = process.env["RESEND_API_KEY"];
    if (!apiKey && !server.hasDatabase()) {
      console.error("Demo request dropped: set DATABASE_URL or RESEND_API_KEY", data.email);
      throw new Error("NOT_CONFIGURED");
    }

    // A database problem must not lose the lead: log it and still send the emails.
    let dbError = "";
    let id: string | null = null;
    try {
      if (await server.isRateLimited(ipHash, data.email)) {
        throw new Error(demoErrors.rateLimited);
      }
      id = await server.saveRequest({
        name: data.name,
        email: data.email,
        company: data.company,
        phone: data.phone,
        teamSize: data.teamSize,
        page: data.page,
        userAgent,
        ipHash,
      });
    } catch (error) {
      if (error instanceof Error && error.message === demoErrors.rateLimited) throw error;
      console.error("Demo request could not be saved to the database", error);
      dbError = `DB_${(error as { code?: string }).code ?? "ERROR"}`;
    }
    if (!apiKey) {
      if (dbError) throw new Error(dbError);
      console.warn("Demo request saved but not emailed: RESEND_API_KEY is not set", id);
      return { ok: true as const, emailed: false };
    }

    const from = process.env["DEMO_FROM_EMAIL"] || defaultFrom;
    const team = process.env["DEMO_TEAM_EMAIL"] || defaultTeam;

    const rows = [
      ["Name", data.name],
      ["Email", data.email],
      ["Company", data.company],
      ["Phone", data.phone || "Not given"],
      ["Team size", data.teamSize || "Not given"],
      ["Page", data.page || "Not given"],
    ];

    try {
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
    } catch (error) {
      // The request is already saved, so the team still has it; tell the visitor honestly.
      if (id) {
        console.error("Demo request saved but email failed", id, error);
        return { ok: true as const, emailed: false };
      }
      const emailError = error instanceof Error ? error.message : "EMAIL_ERROR";
      throw new Error(dbError ? `${dbError} ${emailError}` : emailError);
    }
    if (id) await server.markEmailed(id);
    return { ok: true as const, emailed: true };
  });
