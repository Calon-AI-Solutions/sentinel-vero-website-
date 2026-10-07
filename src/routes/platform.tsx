import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  BadgePoundSterling,
  Briefcase,
  Check,
  ChevronRight,
  Clock,
  HardHat,
  LayoutDashboard,
  type LucideIcon,
  Play,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Users,
  Wand2,
} from "lucide-react";

import { demoHref } from "@/components/demo-request-dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqLd, pageHead, softwareLd } from "@/lib/seo";

export const Route = createFileRoute("/platform")({
  head: () =>
    pageHead({
      path: "/platform",
      title: "Features: Fire & Security Job Management Software | Sentinel Vero",
      description:
        "See every Sentinel Vero feature screen by screen: field app, AI quoting, AI advisory, jobs, time and payroll for fire and security contractors.",
      ogTitle: "Features | Sentinel Vero",
      ogDescription:
        "The real office and field screens behind Sentinel Vero, from first enquiry to payroll.",
      image: "/screens/dashboard.webp",
      jsonLd: [softwareLd, faqLd(faqs)],
    }),
  component: PlatformPage,
});

const bookHref = "mailto:hello@sentinelvero.com?subject=Book%20a%20Discovery";
const talkHref = "mailto:hello@sentinelvero.com?subject=Question%20about%20Sentinel%20Vero";

type Screen = { src: string; title: string; caption: string; phone?: boolean };
type Feature = {
  id: string;
  label: string;
  icon: LucideIcon;
  title: string;
  body: string;
  bullets: string[];
  screens: Screen[];
  proof?: { quote: string; who: string; photo: string };
};
type Group = { id: string; eyebrow: string; title: string; body: string; features: Feature[] };

const groups: Group[] = [
  {
    id: "field",
    eyebrow: "Made for the field",
    title: "Engineers finish the job, not the paperwork.",
    body: "One app that logs time, mileage, photos and notes while the work happens, so nothing waits for the end of the day.",
    features: [
      {
        id: "field-app",
        label: "Field App",
        icon: Smartphone,
        title: "Everything for today, in one screen.",
        body: "The engineer opens the app and sees their shift, the next job and what is left. Travel, time on site and expenses are tracked without anyone filling in a timesheet.",
        bullets: [
          "Shift time and jobs left, live",
          "Next job with site, SLA and directions",
          "Photos and notes captured on site",
          "Apple and Android",
        ],
        screens: [
          {
            src: "/screens/field-app-today.png",
            phone: true,
            title: "The Today view",
            caption:
              "Shift clock, jobs completed, miles and expenses at the top. Below it, the next job with the site address, the service type, the SLA time and a single button to start.",
          },
        ],
        proof: {
          quote:
            "In 17 years as an engineer, this is the easiest app I’ve used. Time and mileage log automatically, photos and notes go in on site, and I’m done.",
          who: "Engineer, Volt Secure",
          photo: "/testimonials/volt-engineer.webp",
        },
      },
    ],
  },
  {
    id: "office",
    eyebrow: "Made for the office",
    title: "Less rekeying. More quotes out the door.",
    body: "The office sees every customer, job and recommendation in one place, with AI drafting the work nobody enjoys doing.",
    features: [
      {
        id: "core",
        label: "Core operations",
        icon: LayoutDashboard,
        title: "The whole business on one dashboard.",
        body: "Customers, sites, enquiries, quotes, jobs and invoices share one record, so the dashboard is always the real picture, not last week’s spreadsheet.",
        bullets: [
          "CRM, contacts and sites",
          "Enquiries through to jobs",
          "Service and maintenance scheduling",
          "Documents, compliance and reporting",
        ],
        screens: [
          {
            src: "/screens/dashboard.webp",
            title: "Dashboard",
            caption:
              "Jobs created, active, unassigned, overdue, completed and invoiced across the top. Turnover and profit over twelve months, and quotes created, won and lost each month.",
          },
        ],
        proof: {
          quote:
            "Quoting, compliance and payroll used to live in different places. Now it’s all in one system.",
          who: "Cai, Volt Secure",
          photo: "/testimonials/cai-desk.webp",
        },
      },
      {
        id: "quoting",
        label: "AI Quoting",
        icon: Wand2,
        title: "Drop in the plans. Get the first draft.",
        body: "Add the brief, the site plans and the device schedule. The AI Quote Studio reads them and prepares the quote items. Your team reviews the pricing and sends it.",
        bullets: [
          "Reads PDFs, spreadsheets, documents and photos",
          "Four clear steps from brief to send",
          "Final pricing always stays with your team",
        ],
        screens: [
          {
            src: "/screens/ai-quote-studio.webp",
            title: "AI Quote Studio",
            caption:
              "Quote context on the left, the brief in the middle and the analysed source documents on the right. One click generates the pricing breakdown, then it moves through pricing review, proposal and send.",
          },
        ],
      },
      {
        id: "advisory",
        label: "AI Advisory",
        icon: Sparkles,
        title: "Every recommendation from site becomes a quote.",
        body: "When an engineer spots extra work, it lands in the office with their notes and photos attached. AI turns it into a draft quote, so follow on work stops slipping through.",
        bullets: [
          "Engineer notes and photos kept exactly as submitted",
          "AI drafted quote, reviewed before it goes",
          "Pricing engine suggests margin and price",
        ],
        screens: [
          {
            src: "/screens/advisory-queue.webp",
            title: "Step 1. The advisory queue",
            caption:
              "Every recommendation from the field, with the customer, site, engineer, job reference and photos. Pending and quote sent tabs show what still needs action.",
          },
          {
            src: "/screens/advisory-detail.webp",
            title: "Step 2. The recommendation in detail",
            caption:
              "The engineer’s words exactly as they wrote them, the photos from the job, and a quote already drafted by AI for the office to check.",
          },
          {
            src: "/screens/advisory-quote.webp",
            title: "Step 3. A quote ready to price and send",
            caption:
              "The recommended work is already listed as quote lines. The AI pricing engine suggests options and margin before anyone presses send.",
          },
        ],
        proof: {
          quote:
            "The AI advisory analyses photos from our engineers on site to spot new work, so we win more revenue, faster.",
          who: "Cai, Volt Secure",
          photo: "/testimonials/cai-award.webp",
        },
      },
    ],
  },
  {
    id: "management",
    eyebrow: "Made for owners and finance",
    title: "Payroll you can sign off without a chase.",
    body: "Time, mileage and expenses are checked by the system first, so you only look at what is actually wrong.",
    features: [
      {
        id: "payroll",
        label: "Time & Payroll",
        icon: Clock,
        title: "Verified hours, straight to payroll.",
        body: "Engineer time is checked against clock in, van location and job times. Anything that does not match is flagged with the evidence, and everything else is ready to release.",
        bullets: [
          "Early departures, GPS and mileage variances flagged",
          "Evidence timeline for every exception",
          "Weekly totals ready for Xero",
        ],
        screens: [
          {
            src: "/screens/timesheet-review.webp",
            title: "Step 1. Review only the variances",
            caption:
              "Variances ranked high, medium and low. Open one and see the evidence: clocked in, van arrived, scheduled finish, early departure. Approve, query or add a note.",
          },
          {
            src: "/screens/payroll-week.webp",
            title: "Step 2. Release the week",
            caption:
              "Site hours, payable miles and expenses for every engineer, with a trust score and status. When exceptions are cleared, release the week with the gross payroll already calculated.",
          },
        ],
        proof: {
          quote:
            "We used to spend hours checking timesheets and mileage before payroll. Volt verifies it for us, so by the time it reaches Xero, it’s already right.",
          who: "Cai, Volt Secure",
          photo: "/testimonials/cai-award.webp",
        },
      },
    ],
  },
];

const steps = [
  ["Customer", "Every contact, site and asset starts with one reliable record."],
  ["Quote", "Pricing logic, history and scope stay together. AI prepares the first draft."],
  ["Job", "The accepted quote becomes work without rekeying the detail."],
  ["Field", "Engineers capture time, evidence and decisions as the work happens."],
  ["Review", "The office sees exceptions and missing evidence before the job closes."],
  ["Advisory", "Likely next work is surfaced and becomes a quote ready to send."],
  ["Invoice", "Approved work moves forward with its evidence still attached."],
  ["Payroll", "Engineer time and mileage reach payroll without a monthly chase."],
];

const roles: Array<{ role: string; icon: LucideIcon; gets: string; sees: string; href: string }> = [
  {
    role: "Owner",
    icon: Briefcase,
    gets: "Visibility, scale and profit",
    sees: "Turnover, profit and won work on one dashboard",
    href: "#core",
  },
  {
    role: "Operations",
    icon: LayoutDashboard,
    gets: "Status, capacity and exceptions",
    sees: "Unassigned and overdue jobs before they become complaints",
    href: "#core",
  },
  {
    role: "Commercial",
    icon: Wand2,
    gets: "Scope, cost and margin",
    sees: "AI drafted quotes and follow on work from site",
    href: "#quoting",
  },
  {
    role: "Finance",
    icon: BadgePoundSterling,
    gets: "Hours, expenses and outputs",
    sees: "Verified hours and mileage ready for Xero",
    href: "#payroll",
  },
  {
    role: "Engineer",
    icon: HardHat,
    gets: "Clarity, fairness and reliability",
    sees: "Today’s jobs, time logged for them, no paperwork",
    href: "#field-app",
  },
  {
    role: "Customer",
    icon: Users,
    gets: "Evidence, consistency and trust",
    sees: "Photos and notes from every visit, attached to the record",
    href: "#advisory",
  },
];

const faqs = [
  [
    "How long does it take to get started?",
    "It depends on your data and your team. You’ll get a real timeline on the Discovery call, based on what you run today, not a guess now.",
  ],
  [
    "What does it run on?",
    "The office works in the browser. Engineers use a dedicated app on Apple and Android.",
  ],
  [
    "We already pay for Simpro, Uptick or Out On Site. Why switch?",
    "Paying for software and using it properly are two different things. If half your workflow still runs through spreadsheets, that’s the gap we close, and we move your records across properly.",
  ],
  [
    "Does the AI make decisions for us?",
    "No. It drafts quotes, flags follow on work and checks timesheets. Your team reviews and approves every price and every payroll run.",
  ],
  [
    "How does pricing work?",
    "Per user, plus a one off setup and migration fee. Real numbers come after a Discovery call, because your business isn’t generic and neither is your quote.",
  ],
];

function Frame({ screen }: { screen: Screen }) {
  if (screen.phone) {
    return (
      <div className="relative flex justify-center overflow-hidden rounded-xl border border-bone/10 bg-[radial-gradient(circle_at_50%_110%,rgba(0,211,154,.28),transparent_60%)] px-6 pt-10">
        <div className="w-full max-w-[17rem] rounded-t-[2rem] border border-b-0 border-bone/15 bg-ink p-2 pb-0 shadow-2xl">
          <img
            src={screen.src}
            alt={`${screen.title} in the Sentinel Vero field app`}
            loading="lazy"
            className="max-h-[30rem] w-full rounded-t-[1.6rem] object-cover object-top"
          />
        </div>
      </div>
    );
  }
  return (
    <div className="relative">
      <div
        className="pointer-events-none absolute -inset-6 rounded-[2rem] bg-mint/10 blur-3xl"
        aria-hidden="true"
      />
      <div className="relative overflow-hidden rounded-xl border border-bone/10 bg-panel shadow-[0_30px_80px_rgba(0,0,0,.45)]">
        <div className="flex items-center gap-2 border-b border-bone/10 px-4 py-3">
          <span className="size-2.5 rounded-full bg-bone/15" />
          <span className="size-2.5 rounded-full bg-bone/15" />
          <span className="size-2.5 rounded-full bg-bone/15" />
          <span className="vh-eyebrow ml-3 truncate text-dim">
            Sentinel Vero · {screen.title.replace(/^Step \d\. /, "")}
          </span>
        </div>
        <img
          src={screen.src}
          alt={`${screen.title} in Sentinel Vero`}
          loading="lazy"
          className="w-full bg-bone"
        />
      </div>
    </div>
  );
}

function FeatureBlock({ feature }: { feature: Feature }) {
  const Icon = feature.icon;
  return (
    <article
      id={feature.id}
      className="scroll-mt-28 border-t border-bone/10 pt-16 first:border-t-0 first:pt-0"
    >
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-mint/30 bg-mint/10 px-3 py-1.5 text-sm font-semibold text-mint">
            <Icon className="size-4" /> {feature.label}
          </span>
          <h3 className="mt-5 text-balance font-display text-3xl font-semibold md:text-4xl">
            {feature.title}
          </h3>
          <p className="mt-4 max-w-xl text-lg leading-8 text-muted-ink">{feature.body}</p>
        </div>
        <div className="flex flex-col justify-end gap-6">
          <ul className="grid gap-3">
            {feature.bullets.map((b) => (
              <li key={b} className="flex items-start gap-3 text-[15px] font-medium text-bone">
                <Check className="mt-0.5 size-5 shrink-0 text-mint" />
                {b}
              </li>
            ))}
          </ul>
          {feature.proof && (
            <figure className="flex items-start gap-4 rounded-lg border border-bone/10 bg-bone/[.03] p-4">
              <img
                src={feature.proof.photo}
                alt=""
                className="size-11 shrink-0 rounded-full object-cover object-[50%_30%]"
              />
              <div>
                <blockquote className="text-sm leading-6 text-bone">
                  “{feature.proof.quote}”
                </blockquote>
                <figcaption className="vh-eyebrow mt-2 text-mint">{feature.proof.who}</figcaption>
              </div>
            </figure>
          )}
        </div>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-14">
        {feature.screens.map((screen, i) => (
          <div
            key={screen.src}
            className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12"
          >
            <div className={`lg:col-span-8 ${i % 2 === 1 ? "lg:order-2" : ""}`}>
              <Frame screen={screen} />
            </div>
            <div className={`lg:col-span-4 ${i % 2 === 1 ? "lg:order-1" : ""}`}>
              {feature.screens.length > 1 && (
                <span className="font-label text-xs text-mint">
                  {String(i + 1).padStart(2, "0")} /{" "}
                  {String(feature.screens.length).padStart(2, "0")}
                </span>
              )}
              <h4 className="mt-2 font-display text-xl font-semibold">{screen.title}</h4>
              <p className="mt-3 leading-7 text-muted-ink">{screen.caption}</p>
            </div>
          </div>
        ))}
      </div>

      <a
        href={bookHref}
        className="vh-focus mt-10 inline-flex items-center gap-2 font-semibold text-mint hover:text-mint-hover"
      >
        See {feature.label} on your own jobs <ArrowRight className="size-4" />
      </a>
    </article>
  );
}

function PlatformPage() {
  return (
    <>
      <section className="hero-grid overflow-hidden text-bone">
        <div className="site-container py-16 lg:py-24">
          <div className="mx-auto max-w-4xl text-center">
            <p className="vh-eyebrow text-mint">Features</p>
            <h1 className="mt-5 text-balance font-display text-5xl font-semibold leading-[0.98] md:text-7xl">
              One record. Every next action.
            </h1>
            <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-muted-ink">
              Everything the job needs. See it, don’t just read about it. These are the real office
              and field screens your team would use, one step at a time.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a
                href={bookHref}
                className="vh-focus inline-flex h-12 items-center gap-2 rounded-[10px] bg-mint px-6 font-semibold text-ink transition-colors hover:bg-mint-hover"
              >
                Book a Discovery <ArrowRight className="size-4" />
              </a>
              <a
                href={demoHref}
                className="vh-focus vh-ghost inline-flex h-12 items-center gap-2 rounded-[10px] px-6 font-medium"
              >
                <Play className="size-4 fill-current" /> Watch demo
              </a>
            </div>
          </div>

          <nav aria-label="Features by team" className="mt-16 grid gap-3 md:grid-cols-3">
            {groups.map((g) => (
              <a
                key={g.id}
                href={`#${g.id}`}
                className="vh-focus group rounded-xl border border-bone/10 bg-panel/60 p-6 transition-colors hover:border-mint/40"
              >
                <p className="vh-eyebrow text-mint">{g.eyebrow}</p>
                <p className="mt-3 font-display text-lg font-semibold">
                  {g.features.map((f) => f.label).join(", ")}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm text-muted-ink group-hover:text-bone">
                  Jump to it <ChevronRight className="size-4" />
                </span>
              </a>
            ))}
          </nav>
        </div>
      </section>

      {groups.map((g, gi) => (
        <section
          key={g.id}
          id={g.id}
          className={`section-space scroll-mt-20 overflow-hidden border-t border-bone/10 text-bone ${gi % 2 === 0 ? "bg-surface" : "bg-ink"}`}
        >
          <div className="site-container">
            <div className="max-w-3xl">
              <p className="vh-eyebrow text-mint">{g.eyebrow}</p>
              <h2 className="mt-4 text-balance font-display text-4xl font-semibold leading-tight md:text-5xl">
                {g.title}
              </h2>
              <p className="mt-5 text-lg leading-8 text-muted-ink">{g.body}</p>
              {g.features.length > 1 && (
                <div className="mt-8 flex flex-wrap gap-2">
                  {g.features.map((f) => (
                    <a
                      key={f.id}
                      href={`#${f.id}`}
                      className="vh-focus rounded-full border border-bone/15 px-4 py-2 text-sm font-medium text-bone transition-colors hover:border-mint hover:text-mint"
                    >
                      {f.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
            <div className="mt-16 grid grid-cols-1 gap-16">
              {g.features.map((f) => (
                <FeatureBlock key={f.id} feature={f} />
              ))}
            </div>
          </div>
        </section>
      ))}

      <section className="section-space">
        <div className="site-container grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
          <div>
            <p className="eyebrow">The evidence chain</p>
            <h2 className="mt-4 font-display text-4xl font-semibold">
              From first enquiry to final payroll.
            </h2>
            <p className="mt-5 text-muted-foreground">
              Every feature above shares one record, so nothing important disappears between the
              person doing the work and the person making the decision.
            </p>
          </div>
          <div className="divide-y divide-border border-y border-border">
            {steps.map(([title, body], i) => (
              <div key={title} className="grid grid-cols-[3rem_1fr] items-start gap-4 py-5">
                <span className="font-mono text-xs text-primary">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-display text-lg font-bold">{title}</h3>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space bg-surface text-bone">
        <div className="site-container">
          <div className="max-w-3xl">
            <p className="vh-eyebrow text-mint">Two views. One truth.</p>
            <h2 className="mt-4 text-balance font-display text-4xl font-semibold md:text-5xl">
              What each role gets.
            </h2>
            <p className="mt-5 text-lg leading-8 text-muted-ink">
              Same record, different view. Everyone sees what they need at the moment they need it.
            </p>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {roles.map(({ role, icon: Icon, gets, sees, href }) => (
              <a
                key={role}
                href={href}
                className="vh-focus group flex flex-col rounded-xl border border-bone/10 bg-panel p-6 transition-colors hover:border-mint/40"
              >
                <span className="grid size-11 place-items-center rounded-lg bg-mint/10 text-mint">
                  <Icon className="size-5" />
                </span>
                <h3 className="mt-6 font-display text-2xl font-semibold">{role}</h3>
                <p className="mt-1 font-medium text-mint">{gets}</p>
                <p className="mt-3 flex-1 text-sm leading-6 text-muted-ink">{sees}</p>
                <span className="mt-5 inline-flex items-center gap-1 text-sm text-muted-ink group-hover:text-bone">
                  See the screen <ChevronRight className="size-4" />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="site-container grid gap-12 lg:grid-cols-[.65fr_1.35fr]">
          <div>
            <p className="eyebrow">FAQs</p>
            <h2 className="mt-4 font-display text-4xl font-semibold">
              What else do you need to know?
            </h2>
          </div>
          <Accordion type="single" collapsible className="border-t border-border">
            {faqs.map(([q, a], i) => (
              <AccordionItem value={`item-${i}`} key={q}>
                <AccordionTrigger className="py-6 text-left text-base">{q}</AccordionTrigger>
                <AccordionContent className="max-w-2xl pb-6 leading-7 text-muted-foreground">
                  {a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section className="section-space hero-grid !pt-[clamp(5rem,10vw,8rem)] text-bone">
        <div className="site-container">
          <div className="mx-auto max-w-3xl text-center">
            <ShieldCheck className="mx-auto size-10 text-mint" />
            <h2 className="mt-6 text-balance font-display text-4xl font-semibold md:text-5xl">
              No pitch deck. Just your operation, on screen.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-muted-ink">
              On a Discovery call we map how your quotes, jobs and payroll run today, then show you
              the platform doing the same work. If we are not the right fit, we will tell you.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a
                href={bookHref}
                className="vh-focus inline-flex h-14 items-center gap-2 rounded-[10px] bg-mint px-8 text-base font-semibold text-ink transition-colors hover:bg-mint-hover"
              >
                Book a Discovery <ArrowRight className="size-5" />
              </a>
              <a
                href={talkHref}
                className="vh-focus vh-ghost inline-flex h-14 items-center rounded-[10px] px-8 text-base font-medium"
              >
                Speak to us
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
