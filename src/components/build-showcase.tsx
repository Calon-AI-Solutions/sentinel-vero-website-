import {
  ArrowRight,
  BarChart3,
  Bell,
  Check,
  ClipboardCheck,
  FileText,
  ImageIcon,
  Link2,
  type LucideIcon,
  Palette,
} from "lucide-react";
import { type KeyboardEvent, useRef, useState } from "react";

const bookHref = "mailto:hello@sentinelvero.com?subject=Book%20a%20Discovery";

/*
 * Screens are designed separately and dropped in as images.
 * Export each at 1600 x 1000 (16:10) and save to public/showcase/<key>.webp,
 * then set `image` on the matching capability below.
 */
function ScreenSlot({ cap }: { cap: Capability }) {
  return (
    <div className="relative">
      <div
        className="pointer-events-none absolute -inset-6 rounded-[2rem] bg-mint/15 blur-3xl"
        aria-hidden="true"
      />
      <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-bone/10 bg-panel shadow-[0_30px_80px_rgba(2,20,20,.35)]">
        {cap.image ? (
          <img
            src={cap.image}
            alt={`${cap.label} screen in Sentinel Vero`}
            loading="lazy"
            className="size-full object-cover object-top"
          />
        ) : (
          <div className="grid size-full place-items-center bg-[radial-gradient(circle_at_50%_120%,rgba(0,211,154,.18),transparent_60%)] p-6 text-center">
            <div>
              <span className="mx-auto grid size-12 place-items-center rounded-xl border border-bone/15 text-mint">
                <ImageIcon className="size-6" />
              </span>
              <p className="vh-eyebrow mt-4 text-dim">{cap.label} screen</p>
              <p className="mt-1 font-label text-xs text-bone/40">1600 × 1000</p>
            </div>
          </div>
        )}
      </div>
    </div>
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
  image?: string;
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
  },
];

export function BuildShowcase() {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const cap = capabilities[active]!;

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
          <div key={`${cap.key}-screen`} className="animate-in fade-in zoom-in-95 duration-500">
            <ScreenSlot cap={cap} />
          </div>
        </div>
      </div>
    </section>
  );
}
