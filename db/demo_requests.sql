-- Watch the demo form submissions. The site creates this table on first use; run this by hand
-- only if the database user is not allowed to create tables.
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
);
create index if not exists demo_requests_ip_recent on demo_requests (ip_hash, created_at);
create index if not exists demo_requests_email_recent on demo_requests (lower(email), created_at);
