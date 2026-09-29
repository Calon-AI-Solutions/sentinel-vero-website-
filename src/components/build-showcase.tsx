import {
  ArrowRight,
  BarChart3,
  Bell,
  Check,
  ClipboardCheck,
  FileText,
  Home,
  Link2,
  type LucideIcon,
  Mail,
  Palette,
  PenLine,
  Smartphone,
  Users,
  Wrench,
  Zap,
} from "lucide-react";
import { type KeyboardEvent, type ReactNode, useRef, useState } from "react";

const bookHref = "mailto:hello@sentinelvero.com?subject=Book%20a%20Discovery";

/* Small building blocks shared by every mock screen. */

type Tone = "mint" | "amber" | "red" | "muted";
const toneClass: Record<Tone, string> = {
  mint: "bg-mint/15 text-mint",
  amber: "bg-[#F5B84B]/15 text-[#F5B84B]",
  red: "bg-[#FF7A6B]/15 text-[#FF8A7C]",
  muted: "bg-bone/8 text-muted-ink",
};

function Pill({ tone = "mint", children }: { tone?: Tone; children: ReactNode }) {
  return (
    <span
      className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-2 py-0.5 text-[10.5px] font-semibold ${toneClass[tone]}`}
    >
      <i className="size-1.5 rounded-full bg-current" />
      {children}
    </span>
  );
}

function Tile({
  label,
  value,
  note,
  tone,
}: {
  label: string;
  value: string;
  note?: string;
  tone?: Tone;
}) {
  return (
    <div className="rounded-lg border border-bone/10 bg-panel p-3">
      <p className="vh-eyebrow !text-[9.5px] text-dim">{label}</p>
      <p className="mt-1.5 font-display text-xl font-bold text-bone">{value}</p>
      {note && (
        <p
          className={`mt-0.5 text-[10.5px] font-medium ${tone === "amber" ? "text-[#F5B84B]" : "text-mint"}`}
        >
          {note}
        </p>
      )}
    </div>
  );
}

function PrimaryBtn({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-md bg-mint px-3 py-1.5 text-[11px] font-semibold text-ink">
      {children}
    </span>
  );
}

function GhostBtn({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-md border border-bone/15 px-3 py-1.5 text-[11px] font-medium text-bone">
      {children}
    </span>
  );
}

const railIcons: { key: string; icon: LucideIcon }[] = [
  { key: "home", icon: Home },
  { key: "forms", icon: ClipboardCheck },
  { key: "quotes", icon: FileText },
  { key: "sync", icon: Link2 },
  { key: "dash", icon: BarChart3 },
  { key: "auto", icon: Zap },
  { key: "reports", icon: Palette },
];

function AppWindow({
  area,
  railKey,
  eyebrow,
  title,
  status,
  children,
}: {
  area: string;
  railKey: string;
  eyebrow: string;
  title: string;
  status?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="relative">
      <div
        className="pointer-events-none absolute -inset-6 rounded-[2rem] bg-mint/15 blur-3xl"
        aria-hidden="true"
      />
      <div className="relative overflow-hidden rounded-xl border border-bone/10 bg-ink font-ui text-bone shadow-[0_30px_80px_rgba(2,20,20,.35)]">
        <div className="flex items-center gap-2 border-b border-bone/10 bg-surface px-4 py-2.5">
          <span className="size-2.5 rounded-full bg-bone/15" />
          <span className="size-2.5 rounded-full bg-bone/15" />
          <span className="size-2.5 rounded-full bg-bone/15" />
          <span className="vh-eyebrow ml-3 truncate text-dim">Sentinel Vero · {area}</span>
        </div>
        <div className="flex">
          <nav
            aria-hidden="true"
            className="hidden w-12 shrink-0 flex-col items-center gap-2 border-r border-bone/10 bg-surface py-4 sm:flex"
          >
            <span className="mb-2 grid size-7 place-items-center rounded-md bg-mint font-display text-[11px] font-extrabold text-ink">
              SV
            </span>
            {railIcons.map(({ key, icon: Icon }) => (
              <span
                key={key}
                className={`grid size-8 place-items-center rounded-md ${key === railKey ? "bg-mint/15 text-mint" : "text-dim"}`}
              >
                <Icon className="size-4" />
              </span>
            ))}
          </nav>
          <div className="min-w-0 flex-1 p-4 sm:p-5">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div className="min-w-0">
                <p className="vh-eyebrow !text-[9.5px] text-mint">{eyebrow}</p>
                <p className="mt-1 truncate font-display text-base font-bold sm:text-lg">{title}</p>
              </div>
              {status}
            </div>
            <div className="mt-4">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* The six mock screens. All data is illustrative. */

function FormsScreen() {
  const rows: [string, string, Tone, string][] = [
    ["Control panel", "No faults showing", "mint", "Pass"],
    ["Manual call points", "18 of 18 tested", "mint", "Pass"],
    ["Detectors, zone 3", "2 heads not responding", "red", "Defect"],
    ["Standby batteries", "Load test within limits", "mint", "Pass"],
    ["Log book", "Awaiting engineer note", "amber", "Open"],
  ];
  return (
    <AppWindow
      area="Inspection forms"
      railKey="forms"
      eyebrow="Fire alarm service visit"
      title="Harbour View Apartments"
      status={<Pill tone="amber">In progress</Pill>}
    >
      <div className="flex items-center gap-3">
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-bone/10">
          <div className="h-full w-[88%] rounded-full bg-mint" />
        </div>
        <span className="font-label text-[10.5px] text-muted-ink">22 / 25 checks</span>
      </div>
      <ul className="mt-3 divide-y divide-bone/8 overflow-hidden rounded-lg border border-bone/10 bg-panel">
        {rows.map(([name, detail, tone, label]) => (
          <li key={name} className="flex items-center gap-3 px-3 py-2.5">
            <span
              className={`grid size-5 shrink-0 place-items-center rounded ${tone === "mint" ? "bg-mint text-ink" : "border border-bone/20"}`}
            >
              {tone === "mint" && <Check className="size-3.5" strokeWidth={3} />}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[12.5px] font-semibold">{name}</span>
              <span className="block truncate text-[11px] text-muted-ink">{detail}</span>
            </span>
            <Pill tone={tone}>{label}</Pill>
          </li>
        ))}
      </ul>
      <div className="mt-3 grid gap-3 sm:grid-cols-[1fr_auto] sm:items-end">
        <div className="rounded-lg border border-dashed border-bone/20 px-3 py-2">
          <p className="vh-eyebrow !text-[9.5px] text-dim">Customer sign off</p>
          <svg viewBox="0 0 160 28" className="mt-1 h-6 w-32 text-bone/80" aria-hidden="true">
            <path
              d="M4 20c10-14 16-14 14 0s10-16 18-8 6 10 14 2 10-10 16 0 12 4 20-6 12 8 22 4 18-6 28-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <PrimaryBtn>
          Complete and send <ArrowRight className="size-3.5" />
        </PrimaryBtn>
      </div>
    </AppWindow>
  );
}

function QuoteScreen() {
  const lines: [string, string, string, string?][] = [
    ["4K bullet camera", "× 8", "£1,784"],
    ["16 channel recorder, 8TB", "× 1", "£612"],
    ["Engineer labour, 2 days", "× 2", "£960"],
    ["Access platform hire", "× 1", "£240", "Added by rule"],
  ];
  return (
    <AppWindow
      area="Quotes"
      railKey="quotes"
      eyebrow="Quote 2231 · CCTV upgrade"
      title="Marlow Logistics, Unit 4"
      status={<Pill tone="muted">Draft</Pill>}
    >
      <div className="grid gap-3 md:grid-cols-[1fr_11rem]">
        <div className="overflow-hidden rounded-lg border border-bone/10 bg-panel">
          <div className="vh-eyebrow flex !text-[9.5px] text-dim">
            <span className="flex-1 px-3 py-2">Item</span>
            <span className="w-10 py-2">Qty</span>
            <span className="w-16 px-3 py-2 text-right">Total</span>
          </div>
          {lines.map(([item, qty, total, rule]) => (
            <div key={item} className="flex items-center border-t border-bone/8 text-[12px]">
              <span className="min-w-0 flex-1 px-3 py-2.5">
                <span className="block truncate font-medium">{item}</span>
                {rule && (
                  <span className="mt-1 inline-flex items-center gap-1 text-[10.5px] font-semibold text-mint">
                    <Zap className="size-3" /> {rule}
                  </span>
                )}
              </span>
              <span className="w-10 font-label text-[11px] text-muted-ink">{qty}</span>
              <span className="w-16 px-3 text-right font-label text-[11.5px]">{total}</span>
            </div>
          ))}
          <div className="flex items-center justify-between border-t border-bone/10 bg-mint/8 px-3 py-2.5">
            <span className="text-[12px] font-semibold">Total before VAT</span>
            <span className="font-display text-lg font-bold text-mint">£4,318</span>
          </div>
        </div>
        <div className="rounded-lg border border-bone/10 bg-panel p-3">
          <p className="vh-eyebrow !text-[9.5px] text-dim">Your pricing rules</p>
          <ul className="mt-2 grid gap-2 text-[11.5px]">
            {[
              "Trade margin 32%",
              "Labour at day rate",
              "Height over 4m adds access",
              "Maintenance plan offered",
            ].map((r) => (
              <li key={r} className="flex items-start gap-1.5">
                <Check className="mt-0.5 size-3.5 shrink-0 text-mint" />
                {r}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mt-3 flex flex-wrap justify-end gap-2">
        <GhostBtn>Preview PDF</GhostBtn>
        <PrimaryBtn>
          Send to customer <ArrowRight className="size-3.5" />
        </PrimaryBtn>
      </div>
    </AppWindow>
  );
}

function IntegrationsScreen() {
  const nodes: [string, LucideIcon][] = [
    ["Field app", Smartphone],
    ["Sentinel Vero", ClipboardCheck],
    ["Xero", Link2],
  ];
  const log: [string, string, Tone, string][] = [
    ["Timesheets, week 39", "12 engineers · 468 hours", "mint", "Synced"],
    ["Mileage claims", "1,284 miles · checked", "mint", "Synced"],
    ["Invoice 1042", "Harbour View · £2,860", "mint", "Synced"],
    ["Invoice 1043", "Marlow Logistics · £4,318", "amber", "Needs approval"],
  ];
  return (
    <AppWindow
      area="Integrations"
      railKey="sync"
      eyebrow="Connected apps"
      title="Accounts and payroll sync"
      status={<Pill>Live</Pill>}
    >
      <div className="flex items-center justify-between gap-1 rounded-lg border border-bone/10 bg-panel px-3 py-4">
        {nodes.map(([name, Icon], i) => (
          <div key={name} className="contents">
            <div className="flex flex-col items-center gap-1.5 text-center">
              <span
                className={`grid size-10 place-items-center rounded-lg ${i === 1 ? "bg-mint text-ink" : "border border-bone/15 text-mint"}`}
              >
                <Icon className="size-5" />
              </span>
              <span className="text-[11px] font-semibold">{name}</span>
            </div>
            {i < nodes.length - 1 && (
              <div className="relative mb-5 h-px flex-1 bg-bone/15" aria-hidden="true">
                <span className="sync-dot absolute -top-[3px] left-0 size-[7px] rounded-full bg-mint" />
              </div>
            )}
          </div>
        ))}
      </div>
      <ul className="mt-3 divide-y divide-bone/8 overflow-hidden rounded-lg border border-bone/10 bg-panel">
        {log.map(([name, detail, tone, label]) => (
          <li key={name} className="flex items-center gap-3 px-3 py-2.5">
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[12.5px] font-semibold">{name}</span>
              <span className="block truncate text-[11px] text-muted-ink">{detail}</span>
            </span>
            <Pill tone={tone}>{label}</Pill>
          </li>
        ))}
      </ul>
    </AppWindow>
  );
}

function DashboardScreen() {
  const weeks = [42, 55, 48, 63, 58, 71, 66, 82];
  const people: [string, number][] = [
    ["Jordan", 92],
    ["Priya", 86],
    ["Sam", 74],
  ];
  return (
    <AppWindow
      area="Dashboards"
      railKey="dash"
      eyebrow="Operations overview"
      title="September at a glance"
      status={<Pill tone="muted">This month</Pill>}
    >
      <div className="grid grid-cols-2 gap-2.5 lg:grid-cols-4">
        <Tile label="Revenue" value="£48.2k" note="12% up on August" />
        <Tile label="Jobs done" value="132" note="On track" />
        <Tile label="Quotes won" value="64%" note="8 points up" />
        <Tile label="Services due" value="3" note="Overdue this week" tone="amber" />
      </div>
      <div className="mt-3 grid gap-3 md:grid-cols-[1fr_10rem]">
        <div className="rounded-lg border border-bone/10 bg-panel p-3">
          <p className="vh-eyebrow !text-[9.5px] text-dim">Weekly revenue</p>
          <svg viewBox="0 0 400 90" className="mt-2 h-24 w-full" aria-hidden="true">
            {[22, 45, 68].map((y) => (
              <line key={y} x1="0" x2="400" y1={y} y2={y} stroke="rgba(240,239,234,.07)" />
            ))}
            {weeks.map((v, i) => (
              <rect
                key={i}
                x={i * 50 + 8}
                width="30"
                y={90 - v}
                height={v}
                rx="3"
                fill={i === weeks.length - 1 ? "#00D39A" : "rgba(0,211,154,.35)"}
              />
            ))}
          </svg>
        </div>
        <div className="rounded-lg border border-bone/10 bg-panel p-3">
          <p className="vh-eyebrow !text-[9.5px] text-dim">Engineer time</p>
          <ul className="mt-2 grid gap-2.5">
            {people.map(([name, pct]) => (
              <li key={name} className="text-[11.5px]">
                <span className="flex justify-between">
                  <span className="font-medium">{name}</span>
                  <span className="font-label text-muted-ink">{pct}%</span>
                </span>
                <span className="mt-1 block h-1 overflow-hidden rounded-full bg-bone/10">
                  <span
                    className="block h-full rounded-full bg-mint"
                    style={{ width: `${pct}%` }}
                  />
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </AppWindow>
  );
}

function AutomationsScreen() {
  const rules: [string, string, boolean][] = [
    ["Service due in 30 days", "Email and text the customer", true],
    ["Quote unopened for 5 days", "Nudge the account manager", true],
    ["Job over £5,000", "Ask a director to approve", true],
    ["Certificate expiring", "Book the next visit", false],
  ];
  return (
    <AppWindow
      area="Automations"
      railKey="auto"
      eyebrow="Workflow rules"
      title="Running quietly in the background"
      status={<Pill>3 active</Pill>}
    >
      <div className="grid gap-3 md:grid-cols-[1fr_12rem]">
        <ul className="grid gap-2">
          {rules.map(([when, then, on]) => (
            <li
              key={when}
              className="flex items-center gap-3 rounded-lg border border-bone/10 bg-panel px-3 py-2.5"
            >
              <span className="min-w-0 flex-1 text-[11.5px]">
                <span className="block truncate">
                  <span className="text-dim">When </span>
                  <span className="font-semibold">{when}</span>
                </span>
                <span className="block truncate text-muted-ink">
                  <span className="text-mint">Then </span>
                  {then}
                </span>
              </span>
              <span
                className={`relative h-4 w-7 shrink-0 rounded-full ${on ? "bg-mint" : "bg-bone/15"}`}
              >
                <span
                  className={`absolute top-0.5 size-3 rounded-full bg-ink ${on ? "right-0.5" : "left-0.5 bg-bone/60"}`}
                />
              </span>
            </li>
          ))}
        </ul>
        <div className="rounded-lg border border-mint/30 bg-mint/8 p-3">
          <p className="vh-eyebrow !text-[9.5px] text-mint">Needs your approval</p>
          <p className="mt-2 text-[12.5px] font-semibold">Quote 2231 · £4,318</p>
          <p className="text-[11px] text-muted-ink">Marlow Logistics</p>
          <div className="mt-3 flex gap-2">
            <PrimaryBtn>Approve</PrimaryBtn>
            <GhostBtn>Query</GhostBtn>
          </div>
          <p className="mt-3 border-t border-bone/10 pt-2 text-[10.5px] text-muted-ink">
            <Bell className="mr-1 inline size-3 text-mint" />
            14 service reminders sent at 09:00
          </p>
        </div>
      </div>
    </AppWindow>
  );
}

function ReportsScreen() {
  return (
    <AppWindow
      area="Customer reports"
      railKey="reports"
      eyebrow="Certificate 0917"
      title="Sent straight from the job"
      status={<Pill>Delivered</Pill>}
    >
      <div className="grid gap-3 md:grid-cols-[1fr_12.5rem]">
        <div className="rounded-lg bg-bone p-4 text-ink shadow-lg">
          <div className="flex items-center justify-between border-b border-ink/10 pb-3">
            <span className="rounded border border-dashed border-ink/30 px-2 py-1 font-label text-[9.5px] font-bold tracking-widest text-ink/60">
              YOUR LOGO
            </span>
            <span className="font-label text-[9.5px] text-ink/50">29 Sep 2026</span>
          </div>
          <p className="mt-3 font-display text-base font-bold">Certificate of inspection</p>
          <p className="text-[11px] text-ink/60">Fire detection and alarm system</p>
          <dl className="mt-3 grid grid-cols-2 gap-x-3 gap-y-1.5 text-[11px]">
            <dt className="text-ink/50">Premises</dt>
            <dd className="font-semibold">Harbour View Apartments</dd>
            <dt className="text-ink/50">Engineer</dt>
            <dd className="font-semibold">Jordan Hale</dd>
            <dt className="text-ink/50">Result</dt>
            <dd>
              <span className="rounded-full bg-[#00A878]/15 px-2 py-0.5 text-[10.5px] font-bold text-[#007A58]">
                Satisfactory
              </span>
            </dd>
          </dl>
          <div className="mt-3 flex items-end justify-between border-t border-ink/10 pt-2">
            <svg viewBox="0 0 120 24" className="h-5 w-24 text-ink/70" aria-hidden="true">
              <path
                d="M3 17c8-12 13-12 11 0s9-14 15-7 5 8 12 2 8-8 13 0 10 3 17-5 10 6 18 3"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
            <span className="text-[9.5px] text-ink/50">Page 1 of 3</span>
          </div>
        </div>
        <div className="rounded-lg border border-bone/10 bg-panel p-3">
          <p className="vh-eyebrow !text-[9.5px] text-dim">Delivery</p>
          <ol className="mt-3 grid gap-3 text-[11.5px]">
            {[
              [PenLine, "Signed on site", "14:28"],
              [FileText, "Report generated", "14:29"],
              [Mail, "Emailed to customer", "14:29"],
              [Users, "Opened by facilities", "14:51"],
            ].map(([Icon, label, time]) => {
              const I = Icon as LucideIcon;
              return (
                <li key={label as string} className="flex items-center gap-2">
                  <span className="grid size-6 shrink-0 place-items-center rounded-full bg-mint/15 text-mint">
                    <I className="size-3.5" />
                  </span>
                  <span className="min-w-0 flex-1 truncate">{label as string}</span>
                  <span className="font-label text-[10px] text-dim">{time as string}</span>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </AppWindow>
  );
}

type Capability = {
  key: string;
  label: string;
  icon: LucideIcon;
  title: string;
  before: string;
  after: string;
  bullets: string[];
  Screen: () => ReactNode;
};

const capabilities: Capability[] = [
  {
    key: "forms",
    label: "Inspection forms",
    icon: ClipboardCheck,
    title: "Your forms, your fields, your sign off steps.",
    before: "Engineers fill in a generic form, then someone in the office retypes it into yours.",
    after:
      "We build your exact inspection sheets into the field app, with the checks, pass rules and sign off your auditors expect.",
    bullets: [
      "Your own sections and fields",
      "Defects flagged the moment they are found",
      "Customer signs before the job closes",
    ],
    Screen: FormsScreen,
  },
  {
    key: "quotes",
    label: "Quotes & pricing",
    icon: FileText,
    title: "Every quote starts from the right numbers.",
    before: "Quotes rebuilt from last month’s spreadsheet, with a different margin every time.",
    after:
      "Your labour rates, kit prices and margin rules live inside the quote builder, so the first draft is already priced your way.",
    bullets: [
      "Labour and kit rates built in",
      "Margin and access rules applied for you",
      "Branded PDF ready to send",
    ],
    Screen: QuoteScreen,
  },
  {
    key: "integrations",
    label: "Integrations",
    icon: Link2,
    title: "Timesheets, mileage and invoices flow straight through.",
    before: "Someone loses every Friday copying hours, miles and invoices into Xero.",
    after:
      "We connect Sentinel Vero to the tools you already run, so time, mileage and invoices sync on their own once they are checked.",
    bullets: [
      "Xero and accounting sync",
      "Payroll ready timesheets",
      "Nothing leaves without approval",
    ],
    Screen: IntegrationsScreen,
  },
  {
    key: "dashboards",
    label: "Dashboards",
    icon: BarChart3,
    title: "The numbers you run the business on, in one view.",
    before: "Monthly figures pieced together from five exports and a lot of guesswork.",
    after:
      "We build the dashboard around the numbers you actually watch: revenue, jobs, win rate and what is overdue.",
    bullets: [
      "Live figures, no exports",
      "Engineer time and utilisation",
      "Overdue work surfaced early",
    ],
    Screen: DashboardScreen,
  },
  {
    key: "automations",
    label: "Automations",
    icon: Bell,
    title: "Reminders and approvals that happen on their own.",
    before: "Service reminders, chasers and sign offs depend on someone remembering.",
    after:
      "We set up the rules once. Reminders go out, quotes get chased and big jobs wait for the right approval, without anyone chasing.",
    bullets: [
      "Service reminders by email and text",
      "Approval steps that match your policy",
      "A clear record of what was sent",
    ],
    Screen: AutomationsScreen,
  },
  {
    key: "reports",
    label: "Customer reports",
    icon: Palette,
    title: "Reports and certificates in your branding.",
    before: "Certificates typed up back at the office and emailed days after the visit.",
    after:
      "Reports are generated from the job itself in your branding, then sent to the customer before the engineer has left site.",
    bullets: [
      "Your logo, layout and wording",
      "Sent automatically when the job closes",
      "See when the customer opens it",
    ],
    Screen: ReportsScreen,
  },
];

export function BuildShowcase() {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const cap = capabilities[active]!;
  const Screen = cap.Screen;

  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const dir = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!dir) return;
    e.preventDefault();
    const next = (active + dir + capabilities.length) % capabilities.length;
    setActive(next);
    tabs.current[next]?.focus();
  };

  return (
    <section className="section-space">
      <div className="site-container">
        <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="eyebrow">What we can build</p>
            <h2 className="mt-4 max-w-3xl font-display text-4xl font-semibold leading-tight md:text-5xl">
              Your process, not a template.
            </h2>
          </div>
          <p className="max-w-md leading-7 text-muted-foreground">
            Six things we build most often. Pick one to see the screen your team would actually use.
          </p>
        </div>

        <div
          role="tablist"
          aria-label="What we can build"
          onKeyDown={onKey}
          className="mt-10 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6"
        >
          {capabilities.map((c, i) => {
            const isActive = i === active;
            const Icon = c.icon;
            return (
              <button
                key={c.key}
                ref={(el) => {
                  tabs.current[i] = el;
                }}
                type="button"
                role="tab"
                id={`build-tab-${c.key}`}
                aria-selected={isActive}
                aria-controls="build-panel"
                tabIndex={isActive ? 0 : -1}
                onClick={() => setActive(i)}
                className={`vh-focus flex min-w-0 items-center gap-2.5 rounded-lg border px-3 py-3 text-left text-sm font-semibold transition-colors ${isActive ? "border-foreground bg-foreground text-background" : "border-border bg-card text-foreground hover:border-foreground/40"}`}
              >
                <span
                  className={`grid size-7 shrink-0 place-items-center rounded-md ${isActive ? "bg-mint text-ink" : "bg-primary/10 text-primary"}`}
                >
                  <Icon className="size-4" />
                </span>
                <span className="min-w-0 leading-tight">{c.label}</span>
              </button>
            );
          })}
        </div>

        <div
          id="build-panel"
          role="tabpanel"
          aria-labelledby={`build-tab-${cap.key}`}
          className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:min-h-[35rem] lg:items-center lg:gap-14"
        >
          <div key={cap.key} className="animate-in fade-in slide-in-from-bottom-2 duration-500">
            <p className="step-number">
              0{active + 1} / 0{capabilities.length}
            </p>
            <h3 className="mt-3 text-balance font-display text-3xl font-semibold leading-tight">
              {cap.title}
            </h3>
            <div className="mt-6 grid gap-3">
              <div className="rounded-lg border border-border bg-card p-4">
                <p className="eyebrow text-muted-foreground">Before</p>
                <p className="mt-1.5 text-[15px] leading-6 text-muted-foreground">{cap.before}</p>
              </div>
              <div className="rounded-lg border border-primary/40 bg-primary/5 p-4">
                <p className="eyebrow text-primary">With your build</p>
                <p className="mt-1.5 text-[15px] leading-6">{cap.after}</p>
              </div>
            </div>
            <ul className="mt-5 grid gap-2">
              {cap.bullets.map((b) => (
                <li key={b} className="flex items-start gap-2.5 text-sm font-medium">
                  <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                  {b}
                </li>
              ))}
            </ul>
            <a
              href={bookHref}
              className="vh-focus mt-6 inline-flex items-center gap-2 text-sm font-semibold text-foreground underline decoration-primary decoration-2 underline-offset-4 hover:text-primary"
            >
              Scope this for your team <ArrowRight className="size-4" />
            </a>
          </div>
          <div
            key={`${cap.key}-screen`}
            className="animate-in fade-in zoom-in-95 duration-500"
            aria-label={`Example ${cap.label.toLowerCase()} screen in Sentinel Vero`}
            role="img"
          >
            <Screen />
          </div>
        </div>
        <p className="mt-6 flex items-center gap-2 text-xs text-muted-foreground lg:justify-end">
          <Wrench className="size-3.5 text-primary" /> Example screens with sample data. Yours are
          built around your own process.
        </p>
      </div>
    </section>
  );
}
