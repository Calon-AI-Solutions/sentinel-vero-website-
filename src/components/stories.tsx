import { Link } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";

import type { Story, StoryStat, StoryTag } from "@/lib/stories";

export const bookHref = "mailto:hello@sentinelvero.com?subject=Book%20a%20Discovery";

/** A size, region or trade chip. Unconfirmed values get a dashed outline until they are signed off. */
export function Tag({ tag }: { tag: StoryTag }) {
  return (
    <span
      title={tag.confirm ? "To confirm before publishing" : undefined}
      className={`vh-eyebrow inline-flex h-7 items-center rounded-full border px-3 text-[10px] ${tag.confirm ? "border-dashed border-mint/50 text-muted-ink" : "border-bone/15 text-muted-ink"}`}
    >
      {tag.value}
    </span>
  );
}

export function StoryTags({ story }: { story: Story }) {
  return (
    <div className="flex flex-wrap gap-2">
      <Tag tag={story.size} />
      <Tag tag={story.region} />
      <Tag tag={story.trade} />
    </div>
  );
}

export function Stat({ stat }: { stat: StoryStat }) {
  const pending = stat.value === null;
  return (
    <div
      className={`rounded-xl p-6 ${pending ? "border border-dashed border-mint/40 bg-transparent" : "border border-bone/10 bg-panel"}`}
    >
      <p
        className={`font-display text-5xl font-semibold ${pending ? "text-mint/50" : "text-mint"}`}
      >
        {pending ? "TBC" : stat.value}
      </p>
      <p className="mt-3 text-sm leading-6 text-muted-ink">{stat.label}</p>
      {pending && <p className="vh-eyebrow mt-3 text-[10px] text-mint/70">Figure to confirm</p>}
    </div>
  );
}

export function StoryCard({ story }: { story: Story }) {
  return (
    <Link
      to="/proof/$slug"
      params={{ slug: story.slug }}
      className="vh-focus group flex flex-col overflow-hidden rounded-2xl border border-bone/10 bg-panel transition-colors hover:border-mint/40"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={story.person.photo}
          alt=""
          loading="lazy"
          className="size-full object-cover object-[50%_30%] transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-panel via-panel/10 to-transparent" />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <StoryTags story={story} />
        <p className="mt-5 font-display text-xl font-semibold leading-snug text-bone">
          “{story.quote}”
        </p>
        <div className="mt-auto flex items-center justify-between gap-4 pt-6">
          <div>
            <p className="text-sm font-semibold text-bone">{story.person.name}</p>
            <p className="text-sm text-muted-ink">
              {story.person.role}
              {story.person.role.includes(story.company) ? "" : `, ${story.company}`}
            </p>
          </div>
          <span className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-mint group-hover:text-mint-hover">
            Read story <ArrowRight className="size-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}

/** Low pressure close shared by the stories index and every story page. */
export function DiscoveryClose({ title }: { title: string }) {
  return (
    <section className="bg-surface pb-24 text-bone md:pb-32">
      <div className="site-container">
        <div className="grid gap-8 rounded-2xl border border-mint/25 bg-[linear-gradient(135deg,rgba(0,211,154,.12),rgba(6,34,32,.9)_55%)] p-8 md:p-10 lg:grid-cols-[1.3fr_1fr] lg:items-center">
          <div>
            <p className="vh-eyebrow text-mint">Operational Discovery</p>
            <h2 className="mt-3 text-balance font-display text-3xl font-semibold md:text-4xl">
              {title}
            </h2>
            <p className="mt-4 max-w-xl leading-7 text-muted-ink">
              No pitch deck and no pressure. We look at how your jobs move today, show you where
              time and margin are leaking, and tell you honestly whether we are the right fit.
            </p>
            <ul className="mt-6 grid gap-2 sm:grid-cols-3">
              {["Your real jobs, not a demo", "An honest view of the gaps", "Nothing to sign"].map(
                (b) => (
                  <li key={b} className="flex items-center gap-2 text-sm font-medium text-bone">
                    <Check className="size-4 shrink-0 text-mint" />
                    {b}
                  </li>
                ),
              )}
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
              See the platform first
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
