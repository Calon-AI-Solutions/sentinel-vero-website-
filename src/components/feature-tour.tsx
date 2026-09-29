import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Check,
  Clock,
  LayoutDashboard,
  type LucideIcon,
  Smartphone,
  Sparkles,
  Wand2,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

const bookHref = "mailto:hello@sentinelvero.com?subject=Book%20a%20Discovery";
const STEP_MS = 9000;

type Feature = {
  key: string;
  label: string;
  icon: LucideIcon;
  pain: string;
  title: string;
  body: string;
  bullets: string[];
  screens?: string[];
  phone?: string;
  proof?: { quote: string; who: string; photo: string };
};

const features: Feature[] = [
  {
    key: "core",
    label: "Core operations",
    icon: LayoutDashboard,
    pain: "Five systems and one person holding it together",
    title: "Every customer, site and job in one place.",
    body: "Enquiries become quotes, quotes become jobs, and every record keeps its history. Nobody has to remember where anything lives.",
    bullets: [
      "CRM, contacts and sites",
      "Enquiries through to jobs",
      "Service and maintenance scheduling",
      "Documents, compliance and dashboards",
    ],
    screens: ["/screens/dashboard.webp"],
    proof: {
      quote:
        "Quoting, compliance and payroll used to live in different places. Now it’s all in one system.",
      who: "Cai, Volt Secure",
      photo: "/testimonials/cai-desk.png",
    },
  },
  {
    key: "quoting",
    label: "AI Quoting",
    icon: Wand2,
    pain: "Every quote rebuilt from scratch",
    title: "The first draft is already written.",
    body: "The system knows your pricing logic, the site and the job history, so it drafts the quote. Your team checks it, adjusts it and sends it.",
    bullets: [
      "Your own pricing rules built in",
      "Site and job history pulled in",
      "Review, adjust and send in minutes",
    ],
    screens: ["/screens/ai-quote-studio.webp"],
  },
  {
    key: "advisory",
    label: "AI Advisory",
    icon: Sparkles,
    pain: "Follow on work missed after the job",
    title: "The next job finds you.",
    body: "Engineer photos and notes from site are analysed as they come in. Anything likely needed next is flagged and turned into a quote ready to send.",
    bullets: [
      "Photos from site analysed automatically",
      "Recommended work queued for review",
      "One click from advisory to quote",
    ],
    screens: [
      "/screens/advisory-queue.webp",
      "/screens/advisory-detail.webp",
      "/screens/advisory-quote.webp",
    ],
    proof: {
      quote:
        "The AI advisory analyses photos from our engineers on site to spot new work, so we win more revenue, faster.",
      who: "Cai, Volt Secure",
      photo: "/testimonials/cai-award.png",
    },
  },
  {
    key: "payroll",
    label: "Time & Payroll",
    icon: Clock,
    pain: "Hours lost checking timesheets",
    title: "Payroll that is already right.",
    body: "Time and mileage are logged as engineers work, verified by the system, then flow straight into payroll and Xero.",
    bullets: [
      "Time logged from the field app",
      "Mileage calculated automatically",
      "Verified before it reaches Xero",
    ],
    screens: ["/screens/timesheet-review.webp", "/screens/payroll-week.webp"],
    proof: {
      quote:
        "We used to spend hours checking timesheets and mileage before payroll. By the time it reaches Xero, it’s already right.",
      who: "Cai, Volt Secure",
      photo: "/testimonials/cai-award.png",
    },
  },
  {
    key: "field",
    label: "Field App",
    icon: Smartphone,
    pain: "Paperwork at the end of every day",
    title: "Built for the van, not the office.",
    body: "Engineers capture photos, notes and time while the job is happening. The office sees it live. Apple and Android.",
    bullets: [
      "Photos and notes on site",
      "Time and mileage logged automatically",
      "Works on Apple and Android",
    ],
    phone: "/screens/field-app-today.png",
    proof: {
      quote:
        "In 17 years as an engineer, this is the easiest app I’ve used. No paperwork at the end of the day.",
      who: "Engineer, Volt Secure",
      photo: "/testimonials/volt-engineer.webp",
    },
  },
];

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

function ScreenStack({ screens, alt }: { screens: string[]; alt: string }) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    setIndex(0);
    if (screens.length < 2 || prefersReducedMotion()) return;
    const id = setInterval(
      () => setIndex((i) => (i + 1) % screens.length),
      STEP_MS / screens.length,
    );
    return () => clearInterval(id);
  }, [screens]);
  return (
    <div className="relative aspect-[16/9] overflow-hidden bg-bone">
      {screens.map((src, i) => (
        <img
          key={src}
          src={src}
          alt={i === index ? alt : ""}
          aria-hidden={i !== index}
          loading="lazy"
          className={`absolute inset-0 size-full object-cover object-top transition-opacity duration-700 ${i === index ? "opacity-100" : "opacity-0"}`}
        />
      ))}
      {screens.length > 1 && (
        <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5 rounded-full bg-ink/70 px-2.5 py-1.5 backdrop-blur">
          {screens.map((src, i) => (
            <span
              key={src}
              className={`h-1.5 rounded-full transition-all ${i === index ? "w-5 bg-mint" : "w-1.5 bg-bone/40"}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function FeatureVisual({ feature }: { feature: Feature }) {
  return (
    <div className="relative">
      <div
        className="pointer-events-none absolute -inset-8 rounded-[2rem] bg-mint/10 blur-3xl"
        aria-hidden="true"
      />
      <div className="relative overflow-hidden rounded-xl border border-bone/10 bg-panel shadow-[0_30px_80px_rgba(0,0,0,.45)]">
        <div className="flex items-center gap-2 border-b border-bone/10 px-4 py-3">
          <span className="size-2.5 rounded-full bg-bone/15" />
          <span className="size-2.5 rounded-full bg-bone/15" />
          <span className="size-2.5 rounded-full bg-bone/15" />
          <span className="vh-eyebrow ml-3 text-dim">Sentinel Vero · {feature.label}</span>
        </div>
        {feature.screens ? (
          <ScreenStack screens={feature.screens} alt={`${feature.label} screen in Sentinel Vero`} />
        ) : (
          <div className="relative flex aspect-[16/9] items-end justify-center overflow-hidden bg-[radial-gradient(circle_at_50%_120%,rgba(0,211,154,.25),transparent_60%)]">
            <div className="w-[34%] translate-y-[18%] rounded-[1.75rem] border border-bone/15 bg-ink p-1.5 shadow-2xl">
              <img
                src={feature.phone}
                alt={`${feature.label} screen in Sentinel Vero`}
                loading="lazy"
                className="w-full rounded-[1.4rem]"
              />
            </div>
          </div>
        )}
      </div>
      {feature.proof && (
        <figure className="relative mx-4 -mt-10 flex items-start gap-4 rounded-lg border border-bone/10 bg-surface/95 p-4 shadow-xl backdrop-blur sm:mx-8 md:p-5">
          <img
            src={feature.proof.photo}
            alt=""
            className="size-11 shrink-0 rounded-full object-cover object-[50%_30%]"
          />
          <div>
            <blockquote className="text-sm leading-6 text-bone md:text-[15px]">
              “{feature.proof.quote}”
            </blockquote>
            <figcaption className="vh-eyebrow mt-2 text-mint">{feature.proof.who}</figcaption>
          </div>
        </figure>
      )}
    </div>
  );
}

export function FeatureTour() {
  const [active, setActive] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only auto advance on desktop, where the visual sits beside the list and nothing jumps while reading.
    if (prefersReducedMotion() || !window.matchMedia("(min-width: 1024px)").matches)
      setAutoplay(false);
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry!.isIntersecting), {
      threshold: 0.35,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const running = autoplay && inView && !paused;
  const feature = features[active]!;

  return (
    <section className="section-space border-t border-bone/10 bg-surface text-bone">
      <div className="site-container">
        <div className="mx-auto max-w-3xl text-center">
          <p className="vh-eyebrow text-mint">The platform</p>
          <h2 className="mt-4 text-balance font-display text-4xl font-semibold leading-tight md:text-5xl">
            Everything the job needs. See it, don’t just read about it.
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted-ink">
            Pick the problem costing you the most. We’ll show you the exact office and field screens
            your team would use to fix it.
          </p>
        </div>

        <div
          ref={ref}
          className="mt-14 grid gap-10 lg:grid-cols-[minmax(0,24rem)_minmax(0,1fr)] lg:items-start lg:gap-14"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div
            role="tablist"
            aria-label="Platform features"
            aria-orientation="vertical"
            className="grid gap-2"
          >
            {features.map((f, i) => {
              const isActive = i === active;
              const Icon = f.icon;
              return (
                <div
                  key={f.key}
                  className={`relative overflow-hidden rounded-xl border transition-colors ${isActive ? "border-mint/40 bg-panel" : "border-bone/10 hover:border-bone/25 hover:bg-panel/50"}`}
                >
                  <button
                    type="button"
                    role="tab"
                    id={`tour-tab-${f.key}`}
                    aria-selected={isActive}
                    aria-controls={`tour-panel-${f.key}`}
                    onClick={() => {
                      setActive(i);
                      setAutoplay(false);
                    }}
                    className="vh-focus flex w-full items-center gap-4 px-5 py-4 text-left"
                  >
                    <span
                      className={`grid size-10 shrink-0 place-items-center rounded-lg ${isActive ? "bg-mint text-ink" : "bg-bone/5 text-mint"}`}
                    >
                      <Icon className="size-5" />
                    </span>
                    <span className="min-w-0">
                      <span className="block font-display text-lg font-bold">{f.label}</span>
                      <span className="block text-sm text-muted-ink">{f.pain}</span>
                    </span>
                  </button>
                  {isActive && (
                    <div
                      id={`tour-panel-${f.key}`}
                      role="tabpanel"
                      aria-labelledby={`tour-tab-${f.key}`}
                      className="px-5 pb-6"
                    >
                      <h3 className="font-display text-xl font-semibold text-bone">{f.title}</h3>
                      <p className="mt-2 text-[15px] leading-7 text-muted-ink">{f.body}</p>
                      <ul className="mt-4 grid gap-2">
                        {f.bullets.map((b) => (
                          <li
                            key={b}
                            className="flex items-start gap-2.5 text-sm font-medium text-bone"
                          >
                            <Check className="mt-0.5 size-4 shrink-0 text-mint" />
                            {b}
                          </li>
                        ))}
                      </ul>
                      <div className="mt-6 lg:hidden">
                        <FeatureVisual feature={f} />
                      </div>
                      <a
                        href={bookHref}
                        className="vh-focus mt-6 inline-flex items-center gap-2 text-sm font-semibold text-mint hover:text-mint-hover"
                      >
                        See {f.label} on your own jobs <ArrowRight className="size-4" />
                      </a>
                    </div>
                  )}
                  {isActive && autoplay && (
                    <span
                      key={`${f.key}-progress`}
                      aria-hidden="true"
                      onAnimationEnd={() => setActive((a) => (a + 1) % features.length)}
                      className="tour-progress absolute inset-x-0 bottom-0 h-0.5 origin-left bg-mint"
                      style={{
                        animationDuration: `${STEP_MS}ms`,
                        animationPlayState: running ? "running" : "paused",
                      }}
                    />
                  )}
                </div>
              );
            })}
          </div>

          <div className="hidden lg:sticky lg:top-28 lg:block">
            <FeatureVisual key={feature.key} feature={feature} />
          </div>
        </div>

        <div className="mt-16 grid gap-8 rounded-2xl border border-mint/25 bg-[linear-gradient(135deg,rgba(0,211,154,.12),rgba(6,34,32,.9)_55%)] p-8 md:p-10 lg:grid-cols-[1.3fr_1fr] lg:items-center">
          <div>
            <p className="vh-eyebrow text-mint">Operational Discovery</p>
            <h3 className="mt-3 text-balance font-display text-3xl font-semibold md:text-4xl">
              See it running on your own jobs.
            </h3>
            <p className="mt-4 max-w-xl leading-7 text-muted-ink">
              Bring a real quote, a week of timesheets, or the job that went sideways. We’ll walk it
              through the platform with you and show where the time and margin are leaking.
            </p>
            <ul className="mt-6 grid gap-2 sm:grid-cols-3">
              {[
                "The real platform, not slides",
                "Mapped to how you work",
                "A clear quote afterwards",
              ].map((b) => (
                <li key={b} className="flex items-center gap-2 text-sm font-medium text-bone">
                  <Check className="size-4 shrink-0 text-mint" />
                  {b}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col lg:items-stretch">
            <a
              href={bookHref}
              className="vh-focus flex h-14 items-center justify-center gap-2 rounded-[10px] bg-mint px-8 text-base font-semibold text-ink transition-colors hover:bg-mint-hover"
            >
              Book a Discovery <ArrowRight className="size-5" />
            </a>
            <Link
              to="/platform"
              className="vh-focus vh-ghost flex h-14 items-center justify-center gap-2 rounded-[10px] px-8 text-base font-medium"
            >
              Explore every feature
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
