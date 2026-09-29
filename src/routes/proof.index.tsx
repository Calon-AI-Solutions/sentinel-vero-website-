import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check, Plus } from "lucide-react";
import { useMemo, useState } from "react";

import { bookHref, DiscoveryClose, StoryCard, StoryTags } from "@/components/stories";
import { featuredSlug, getStory, stories, type Story } from "@/lib/stories";

export const Route = createFileRoute("/proof/")({
  head: () => ({
    meta: [
      { title: "Customer stories | Sentinel Vero" },
      {
        name: "description",
        content:
          "How fire and security operators run their jobs, quotes and payroll on Sentinel Vero, in their own words.",
      },
      { property: "og:title", content: "Customer stories | Sentinel Vero" },
      {
        property: "og:description",
        content: "Real operators. Real jobs. Their words, and the evidence behind them.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/proof" }],
  }),
  component: ProofPage,
});

type Facet = "size" | "region" | "trade";
const facets: Array<{ key: Facet; label: string }> = [
  { key: "size", label: "Team size" },
  { key: "region", label: "Region" },
  { key: "trade", label: "Trade" },
];

function optionsFor(key: Facet) {
  const values = [...new Set(stories.map((s) => s[key].value))];
  // Team sizes read best smallest first ("1 to 10" before "11 to 50").
  return key === "size" ? values.sort((a, b) => parseInt(a) - parseInt(b)) : values.sort();
}

function ProofPage() {
  const featured = getStory(featuredSlug)!;
  const [filters, setFilters] = useState<Record<Facet, string | null>>({
    size: null,
    region: null,
    trade: null,
  });

  const visible = useMemo(
    () =>
      stories.filter((s) =>
        facets.every(({ key }) => filters[key] === null || s[key].value === filters[key]),
      ),
    [filters],
  );
  const filtered = Object.values(filters).some((v) => v !== null);

  return (
    <div className="bg-surface text-bone">
      <section className="hero-grid overflow-hidden pt-0!">
        <div className="site-container flex flex-col items-center py-20 text-center md:py-28">
          <p className="vh-eyebrow text-mint">Customer stories</p>
          <h1 className="mt-5 max-w-4xl text-balance font-display text-5xl font-semibold leading-[0.98] md:text-7xl">
            Real operators. Real jobs. Their words.
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-muted-ink">
            Sentinel Vero is built inside a live fire and security business and shaped by the people
            who use it every day. These are their stories, told with the evidence behind them, never
            with numbers we can’t back up.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href={bookHref}
              className="vh-focus inline-flex h-14 items-center gap-2 rounded-[10px] bg-mint px-8 text-base font-semibold text-ink transition-colors hover:bg-mint-hover"
            >
              Book a Discovery <ArrowRight className="size-5" />
            </a>
            <a
              href="#stories"
              className="vh-focus vh-ghost inline-flex h-14 items-center rounded-[10px] px-8 text-base font-medium"
            >
              Browse the stories
            </a>
          </div>
          <div className="mt-14 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 opacity-80">
            {[...new Map(stories.map((s) => [s.company, s])).values()].map((s) => (
              <span key={s.company} className="flex items-center gap-3">
                {s.logo && <img src={s.logo} alt="" className="h-9 w-auto object-contain" />}
                <span className="font-display text-sm font-semibold text-bone">{s.company}</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      <FeaturedStory story={featured} />

      <section id="stories" className="scroll-mt-28 border-t border-bone/10 py-20 md:py-28">
        <div className="site-container">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="vh-eyebrow text-mint">Every story</p>
              <h2 className="mt-4 text-balance font-display text-4xl font-semibold leading-tight md:text-5xl">
                Find a business that looks like yours.
              </h2>
            </div>
            {filtered && (
              <button
                type="button"
                onClick={() => setFilters({ size: null, region: null, trade: null })}
                className="vh-focus self-start text-sm font-semibold text-mint hover:text-mint-hover lg:self-auto"
              >
                Clear filters
              </button>
            )}
          </div>

          <div className="mt-10 grid gap-5 rounded-2xl border border-bone/10 bg-panel/60 p-5 md:grid-cols-3 md:p-6">
            {facets.map(({ key, label }) => (
              <fieldset key={key}>
                <legend className="vh-eyebrow text-dim">{label}</legend>
                <div className="mt-3 flex flex-wrap gap-2">
                  {[null, ...optionsFor(key)].map((option) => {
                    const active = filters[key] === option;
                    return (
                      <button
                        key={option ?? "all"}
                        type="button"
                        aria-pressed={active}
                        onClick={() => setFilters((f) => ({ ...f, [key]: option }))}
                        className={`vh-focus h-9 rounded-full border px-4 text-sm font-medium transition-colors ${active ? "border-mint bg-mint text-ink" : "border-bone/15 text-bone hover:border-bone/40"}`}
                      >
                        {option ?? "All"}
                      </button>
                    );
                  })}
                </div>
              </fieldset>
            ))}
          </div>

          <p className="mt-6 text-sm text-muted-ink" aria-live="polite">
            Showing {visible.length} of {stories.length} stories
          </p>

          <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {visible.map((story) => (
              <StoryCard key={story.slug} story={story} />
            ))}
            <NextStoryTile />
          </div>
        </div>
      </section>

      <section className="border-t border-bone/10 py-20 md:py-28">
        <div className="site-container grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
          <div>
            <p className="vh-eyebrow text-mint">How we publish a story</p>
            <h2 className="mt-4 text-balance font-display text-4xl font-semibold leading-tight">
              Every result needs a trail.
            </h2>
            <p className="mt-5 max-w-md leading-7 text-muted-ink">
              We only publish what the customer has said and what their own records show. If a
              figure is not confirmed yet, we leave it out rather than guess.
            </p>
          </div>
          <div className="grid gap-px overflow-hidden rounded-2xl border border-bone/10 bg-bone/10 md:grid-cols-3">
            {[
              ["Before", "We map the current workflow, the delays and the missing evidence."],
              ["During", "We track what changes, who acts and where work moves faster."],
              ["After", "We review the same records against outcomes the business can verify."],
            ].map(([title, body], i) => (
              <article key={title} className="bg-surface p-7">
                <span className="vh-eyebrow text-mint">0{i + 1}</span>
                <h3 className="mt-10 font-display text-2xl font-bold">{title}</h3>
                <p className="mt-3 leading-7 text-muted-ink">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <DiscoveryClose title="Curious what your story could look like?" />
    </div>
  );
}

function FeaturedStory({ story }: { story: Story }) {
  return (
    <section className="py-20 md:py-28">
      <div className="site-container">
        <p className="vh-eyebrow text-mint">Featured story</p>
        <div className="mt-6 grid overflow-hidden rounded-2xl border border-bone/10 bg-panel lg:grid-cols-[1fr_1.1fr]">
          <div className="relative min-h-72 lg:min-h-full">
            <img
              src={story.person.photo}
              alt={`${story.person.name}, ${story.company}`}
              className="absolute inset-0 size-full object-cover object-[50%_30%]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-panel/80 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-panel/60" />
          </div>
          <div className="p-8 md:p-10 lg:p-12">
            <div className="flex items-center gap-3">
              {story.logo && <img src={story.logo} alt="" className="h-8 w-auto object-contain" />}
              <span className="font-display text-sm font-semibold">{story.company}</span>
            </div>
            <h2 className="mt-6 text-balance font-display text-3xl font-semibold leading-tight md:text-4xl">
              {story.headline}
            </h2>
            <blockquote className="mt-6 border-l-2 border-mint pl-5 text-lg leading-8 text-bone">
              “{story.quote}”
              <footer className="vh-eyebrow mt-3 text-mint">
                {story.person.name}, {story.person.role}
              </footer>
            </blockquote>
            <ul className="mt-8 grid gap-3">
              {story.results.map((r) => (
                <li key={r} className="flex items-start gap-3 text-[15px] leading-6 text-muted-ink">
                  <Check className="mt-0.5 size-4 shrink-0 text-mint" />
                  {r}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
              <StoryTags story={story} />
              <Link
                to="/proof/$slug"
                params={{ slug: story.slug }}
                className="vh-focus inline-flex h-12 items-center gap-2 rounded-[10px] bg-mint px-6 text-sm font-semibold text-ink transition-colors hover:bg-mint-hover"
              >
                Read the full story <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function NextStoryTile() {
  return (
    <a
      href={bookHref}
      className="vh-focus group flex min-h-80 flex-col justify-between rounded-2xl border border-dashed border-bone/20 p-8 transition-colors hover:border-mint/50"
    >
      <span className="grid size-12 place-items-center rounded-full border border-mint/40 text-mint">
        <Plus className="size-5" />
      </span>
      <div>
        <p className="font-display text-2xl font-semibold leading-snug">
          Your story could be next.
        </p>
        <p className="mt-3 leading-7 text-muted-ink">
          Start with a Discovery. If we can help, we’ll measure the difference together.
        </p>
        <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-mint group-hover:text-mint-hover">
          Book a Discovery <ArrowRight className="size-4" />
        </span>
      </div>
    </a>
  );
}
