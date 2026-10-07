import { getRequestHeader, getRequestIP } from "@tanstack/react-start/server";
import postgres from "postgres";

// Server-only helpers for the Watch the demo form: storage in PostgreSQL, Cloudflare Turnstile
// verification and rate limiting. Configure in Vercel:
//   DATABASE_URL          PostgreSQL connection string; the table is created on first use
//   TURNSTILE_SECRET_KEY  Cloudflare Turnstile secret key (pairs with VITE_TURNSTILE_SITE_KEY)

export type StoredRequest = {
  name: string;
  email: string;
  company: string;
  phone: string;
  teamSize: string;
  ipHash: string;
  userAgent: string;
  page: string;
};

/** Requests allowed per visitor (by IP) and per email address in the window below. */
const limits = { perIp: 5, perEmail: 3, windowMinutes: 10 };

let sql: postgres.Sql | null | undefined;
let tableReady: Promise<unknown> | undefined;

function db() {
  if (sql !== undefined) return sql;
  const url = process.env["DATABASE_URL"];
  if (!url) return (sql = null);
  const local = /@(localhost|127\.0\.0\.1)[:/]/.test(url);
  sql = postgres(url, {
    // Serverless: one connection per instance, released quickly when idle.
    max: 1,
    idle_timeout: 20,
    connect_timeout: 10,
    // Hosted Postgres (AWS RDS and most providers) needs TLS; sslmode in the URL wins.
    ...(url.includes("sslmode=") || local ? {} : { ssl: "require" as const }),
  });
  return sql;
}

async function ready(sql: postgres.Sql) {
  tableReady ??= sql`
    create table if not exists demo_requests (
      id bigserial primary key,
      created_at timestamptz not null default now(),
      name text not null,
      email text not null,
      company text not null,
      phone text not null default '',
      team_size text not null default '',
      page text not null default '',
      user_agent text not null default '',
      ip_hash text not null default '',
      email_sent boolean not null default false
    )`
    .then(
      () =>
        sql`create index if not exists demo_requests_ip_recent on demo_requests (ip_hash, created_at)`,
    )
    .then(
      () =>
        sql`create index if not exists demo_requests_email_recent on demo_requests (lower(email), created_at)`,
    )
    .catch((error: unknown) => {
      tableReady = undefined;
      throw error;
    });
  await tableReady;
}

/** Visitor IP (behind Vercel's proxy) and browser, for rate limiting and the team's records. */
export function requestInfo() {
  return {
    ip: getRequestIP({ xForwardedFor: true }) ?? "",
    userAgent: (getRequestHeader("user-agent") ?? "").slice(0, 300),
  };
}

export const hasDatabase = () => db() !== null;

/** SHA-256 of the IP, so rate limiting works without storing raw addresses. */
export async function hashIp(ip: string) {
  const bytes = new TextEncoder().encode(`sentinel-vero-demo:${ip}`);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

export async function verifyTurnstile(token: string, ip: string) {
  const secret = process.env["TURNSTILE_SECRET_KEY"];
  if (!secret) return true;
  if (!token) return false;
  const body = new URLSearchParams({ secret, response: token });
  if (ip) body.set("remoteip", ip);
  const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    body,
  });
  const result = (await response.json()) as { success?: boolean; "error-codes"?: string[] };
  if (!result.success) console.warn("Turnstile rejected a demo request", result["error-codes"]);
  return result.success === true;
}

// Fallback when no database is configured: per instance only, but still slows a single bot.
const recent = new Map<string, number[]>();

export async function isRateLimited(ipHash: string, email: string) {
  const sql = db();
  if (sql) {
    await ready(sql);
    const [row] = await sql<{ by_ip: number; by_email: number }[]>`
      select
        count(*) filter (where ip_hash = ${ipHash})::int as by_ip,
        count(*) filter (where lower(email) = lower(${email}))::int as by_email
      from demo_requests
      where created_at > now() - make_interval(mins => ${limits.windowMinutes})`;
    return (row?.by_ip ?? 0) >= limits.perIp || (row?.by_email ?? 0) >= limits.perEmail;
  }
  const now = Date.now();
  const cutoff = now - limits.windowMinutes * 60_000;
  const hits = (recent.get(ipHash) ?? []).filter((t) => t > cutoff);
  hits.push(now);
  recent.set(ipHash, hits);
  if (recent.size > 5000) recent.clear();
  return hits.length > limits.perIp;
}

/** Saves the request and returns its id, or null when no database is configured. */
export async function saveRequest(request: StoredRequest) {
  const sql = db();
  if (!sql) return null;
  await ready(sql);
  const [row] = await sql<{ id: string }[]>`
    insert into demo_requests (name, email, company, phone, team_size, page, user_agent, ip_hash)
    values (${request.name}, ${request.email}, ${request.company}, ${request.phone},
      ${request.teamSize}, ${request.page}, ${request.userAgent}, ${request.ipHash})
    returning id`;
  return row?.id ?? null;
}

export async function markEmailed(id: string) {
  const sql = db();
  if (sql) await sql`update demo_requests set email_sent = true where id = ${id}`;
}
