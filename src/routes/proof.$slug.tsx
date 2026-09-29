import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";

import { bookHref, DiscoveryClose, Stat, StoryCard, Tag } from "@/components/stories";
import { getStory, stories } from "@/lib/stories";

export const Route = createFileRoute("/proof/$slug")({
  loader: ({ params }) => {
    const story = getStory(params.slug);
    if (!story) throw notFound();
    return { story };
  },
  head: ({ loaderData, params }) => {
    const story = loaderData?.story;
    if (!story) return { meta: [{ title: "Customer story | Sentinel Vero" }] };
    return {
      meta: [
        { title: `${story.company} customer story | Sentinel Vero` },
        { name: "description", content: story.summary },
        { property: "og:title", content: story.headline },
        { property: "og:description", content: story.summary },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: `/proof/${params.slug}` }],
    };
  },
  component: StoryPage,
});

function StoryPage() {
  const { story } = Route.useLoaderData();
  const more = stories.filter((s) => s.slug !== story.slug);

  return (
    <div className="bg-surface text-bone">
      <section className="hero-grid overflow-hidden pt-0!">
        <div className="site-container py-14 md:py-20">
          <Link
            to="/proof"
            className="vh-focus inline-flex items-center gap-2 text-sm font-medium text-muted-ink hover:text-bone"
          >
            <ArrowLeft className="size-4" /> All customer stories
          </Link>
          <div className="mt-10 grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-center">
            <div>
              <div className="flex items-center gap-3">
                {story.logo && (
                  <img src={story.logo} alt="" className="h-10 w-auto object-contain" />
                )}
                <span className="font-display text-base font-semibold">{story.company}</span>
              </div>
              <h1 className="mt-6 text-balance font-display text-4xl font-semibold leading-[1.05] md:text-6xl">
                {story.headline}
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-muted-ink">{story.summary}</p>
            </div>
            <figure className="relative">
              <div
                className="pointer-events-none absolute -inset-8 rounded-[2rem] bg-mint/10 blur-3xl"
                aria-hidden="true"
              />
              <div className="relative overflow-hidden rounded-2xl border border-bone/10">
                <img
                  src={story.person.photo}
                  alt={`${story.person.name}, ${story.company}`}
                  className="aspect-[4/3] w-full object-cover object-[50%_30%]"
                />
              </div>
              <div className="relative mx-4 -mt-16 rounded-xl border border-bone/10 bg-surface/95 p-5 shadow-xl backdrop-blur sm:mx-8 md:p-6">
                <blockquote className="font-display text-lg font-semibold leading-snug md:text-xl">
                  “{story.quote}”
                </blockquote>
                <figcaption className="vh-eyebrow mt-3 text-mint">
                  {story.person.name}, {story.person.role}
                </figcaption>
              </div>
            </figure>
          </div>
        </div>
      </section>

      <section className="border-t border-bone/10 py-16 md:py-24">
        <div className="site-container grid gap-12 lg:grid-cols-[1fr_20rem] lg:gap-16">
          <article className="max-w-2xl">
            <p className="text-xl leading-9 text-bone">{story.about}</p>

            <div className="mt-10 rounded-2xl border border-mint/25 bg-panel p-6 md:p-8">
              <p className="vh-eyebrow text-mint">At a glance</p>
              <ul className="mt-5 grid gap-4">
                {story.results.map((r) => (
                  <li key={r} className="flex items-start gap-3 leading-7 text-bone">
                    <Check className="mt-1 size-4 shrink-0 text-mint" />
                    {r}
                  </li>
                ))}
              </ul>
            </div>

            {[story.problem, story.change].map((part, i) => (
              <div key={part.title} className="mt-14">
                <p className="vh-eyebrow text-mint">{i === 0 ? "The problem" : "What changed"}</p>
                <h2 className="mt-3 font-display text-3xl font-semibold">{part.title}</h2>
                {part.body.map((p) => (
                  <p key={p.slice(0, 24)} className="mt-5 text-[17px] leading-8 text-muted-ink">
                    {p}
                  </p>
                ))}
              </div>
            ))}

            {story.secondQuote && (
              <blockquote className="mt-14 border-l-2 border-mint pl-6">
                <p className="font-display text-2xl font-semibold leading-snug md:text-3xl">
                  “{story.secondQuote.quote}”
                </p>
                <footer className="vh-eyebrow mt-4 text-mint">{story.secondQuote.who}</footer>
              </blockquote>
            )}
          </article>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-2xl border border-bone/10 bg-panel p-6">
              <p className="font-display text-lg font-semibold">{story.company}</p>
              <dl className="mt-5 grid gap-4">
                {(
                  [
                    ["Team size", story.size],
                    ["Region", story.region],
                    ["Trade", story.trade],
                  ] as const
                ).map(([label, tag]) => (
                  <div key={label} className="flex items-center justify-between gap-4">
                    <dt className="text-sm text-muted-ink">{label}</dt>
                    <dd>
                      <Tag tag={tag} />
                    </dd>
                  </div>
                ))}
              </dl>
              <div className="mt-6 border-t border-bone/10 pt-6">
                <p className="text-sm leading-6 text-muted-ink">
                  Want to see how this would work in your business?
                </p>
                <a
                  href={bookHref}
                  className="vh-focus mt-4 flex h-12 items-center justify-center gap-2 rounded-[10px] bg-mint px-5 text-sm font-semibold text-ink transition-colors hover:bg-mint-hover"
                >
                  Book a Discovery <ArrowRight className="size-4" />
                </a>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="border-t border-bone/10 py-16 md:py-24">
        <div className="site-container">
          <p className="vh-eyebrow text-mint">The results</p>
          <h2 className="mt-4 font-display text-4xl font-semibold">What changed, in numbers.</h2>
          <div
            className={`mt-10 grid gap-4 sm:grid-cols-2 ${story.stats.length > 2 ? "lg:grid-cols-3" : ""}`}
          >
            {story.stats.map((s) => (
              <Stat key={s.label} stat={s} />
            ))}
          </div>
          <div className="mt-12 rounded-2xl bg-mint p-8 text-ink md:p-10">
            <p className="vh-eyebrow text-ink/70">Key takeaway</p>
            <p className="mt-4 max-w-3xl text-balance font-display text-2xl font-semibold leading-snug md:text-3xl">
              {story.takeaway}
            </p>
          </div>
        </div>
      </section>

      {more.length > 0 && (
        <section className="border-t border-bone/10 py-16 md:py-24">
          <div className="site-container">
            <div className="flex items-end justify-between gap-6">
              <h2 className="font-display text-3xl font-semibold md:text-4xl">More stories</h2>
              <Link
                to="/proof"
                className="vh-focus inline-flex items-center gap-1.5 text-sm font-semibold text-mint hover:text-mint-hover"
              >
                View all <ArrowRight className="size-4" />
              </Link>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {more.map((s) => (
                <StoryCard key={s.slug} story={s} />
              ))}
            </div>
          </div>
        </section>
      )}

      <DiscoveryClose title="See what this would look like on your jobs." />
    </div>
  );
}
