import { Link, useRouter } from "@tanstack/react-router";
import type { MouseEvent } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { LeakCalculator } from "@/components/leak-calculator";
import {
  formatDate,
  formatShortDate,
  isPlaceholder,
  isSet,
  policies,
  settings,
  type Block,
  type Cta,
  type Doc,
} from "@/lib/content";

export function DocHero({
  doc,
  back,
  showMeta = true,
}: {
  doc: Doc;
  back?: { to: "/guides" | "/blog"; label: string };
  showMeta?: boolean;
}) {
  return (
    <section className="hero-grid pt-0!">
      <div className="site-container py-14 md:py-20">
        {back && (
          <Link
            to={back.to}
            className="vh-focus mb-10 inline-flex items-center gap-2 text-sm font-medium text-muted-ink hover:text-bone"
          >
            <ArrowLeft aria-hidden="true" className="size-4" /> {back.label}
          </Link>
        )}
        <h1 className="max-w-4xl text-balance font-display text-4xl font-semibold leading-[1.05] md:text-6xl">
          {doc.title}
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-ink">{doc.description}</p>
        {showMeta && <DocMeta doc={doc} className="mt-8" />}
      </div>
    </section>
  );
}

/** Index pages use their own intro copy in the hero instead of the meta description. */
export function IndexHero({ page }: { page: Doc }) {
  return (
    <section className="hero-grid pt-0!">
      <div className="site-container py-14 md:py-20">
        <h1 className="max-w-4xl text-balance font-display text-4xl font-semibold leading-[1.05] md:text-6xl">
          {page.title}
        </h1>
        <div className="mt-6 max-w-2xl text-lg leading-8 text-muted-ink [&_p+p]:mt-4">
          {page.blocks.map((b, i) =>
            b.kind === "markdown" ? (
              <div key={i} dangerouslySetInnerHTML={{ __html: b.html }} />
            ) : null,
          )}
        </div>
      </div>
    </section>
  );
}

export function DocMeta({ doc, className = "" }: { doc: Doc; className?: string }) {
  const parts = [
    doc.author,
    doc.published && `Published ${formatDate(doc.published)}`,
    doc.updated && doc.updated !== doc.published && `Updated ${formatDate(doc.updated)}`,
    `${doc.readingTime} min read`,
  ].filter(Boolean);
  return (
    <p className={`vh-eyebrow flex flex-wrap gap-x-4 gap-y-1 text-muted-ink ${className}`}>
      {parts.map((p) => (
        <span key={p as string}>{p}</span>
      ))}
    </p>
  );
}

export function Callout({ html }: { html: string }) {
  return (
    <aside
      className="prose-vero my-8 rounded-r-xl border-l-[3px] border-mint bg-panel px-5 py-4 [&>*:first-child]:mt-0 [&>*:last-child]:mb-0"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

export function CtaBlock({ cta }: { cta: Cta }) {
  return (
    <section className="border-t border-bone/10 bg-panel">
      <div className="site-container flex flex-col gap-6 py-14 md:flex-row md:items-end md:justify-between md:py-16">
        <div className="max-w-2xl">
          <h2 className="font-display text-3xl font-semibold leading-tight md:text-4xl">
            {cta.heading}
          </h2>
          <p className="mt-4 text-lg leading-8 text-muted-ink">{cta.text}</p>
        </div>
        <div className="flex shrink-0 flex-col items-start gap-2">
          <a
            href="mailto:hello@sentinelvero.com?subject=Book%20a%20demo"
            className="vh-focus inline-flex h-12 items-center gap-2 rounded-[10px] bg-mint px-6 text-[15px] font-semibold text-ink transition-colors hover:bg-mint-hover"
          >
            {cta.label} <ArrowRight aria-hidden="true" className="size-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

/** Renders a document body. Prose is capped at a readable width; the calculator runs wide. */
export function DocBody({ blocks }: { blocks: Block[] }) {
  const router = useRouter();
  // Links inside rendered markdown are plain anchors; route internal ones through the router.
  const onClick = (e: MouseEvent<HTMLDivElement>) => {
    const href = (e.target as HTMLElement).closest("a")?.getAttribute("href");
    if (!href?.startsWith("/") || e.defaultPrevented || e.button !== 0) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    void router.navigate({ href });
  };
  return (
    <div onClick={onClick}>
      {blocks.map((block, i) => {
        if (block.kind === "calculator") return <LeakCalculator key={i} />;
        if (block.kind === "callout") return <Callout key={i} html={block.html} />;
        if (block.kind === "cta") return <CtaBlock key={i} cta={block.cta} />;
        return (
          <div key={i} className="prose-vero" dangerouslySetInnerHTML={{ __html: block.html }} />
        );
      })}
    </div>
  );
}

export function Toc({ headings }: { headings: Doc["headings"] }) {
  if (!headings.length) return null;
  const list = (
    <ol className="grid gap-1 text-sm">
      {headings.map((h) => (
        <li key={h.id}>
          <a
            href={`#${h.id}`}
            className="vh-focus block rounded-md py-1.5 text-muted-ink transition-colors hover:text-bone"
          >
            {h.text}
          </a>
        </li>
      ))}
    </ol>
  );
  return (
    <>
      <details className="print-hide mb-8 rounded-xl border border-bone/10 bg-panel px-5 py-3 lg:hidden">
        <summary className="vh-focus vh-eyebrow cursor-pointer py-1 text-muted-ink">
          On this page
        </summary>
        <nav aria-label="On this page" className="pt-2 pb-1">
          {list}
        </nav>
      </details>
      <nav aria-label="On this page" className="print-hide sticky top-28 hidden lg:block">
        <p className="vh-eyebrow mb-3 text-dim">On this page</p>
        {list}
      </nav>
    </>
  );
}

export function DocList({ docs, showDate }: { docs: Doc[]; showDate: boolean }) {
  return (
    <ul className="divide-y divide-bone/10 border-y border-bone/10">
      {docs.map((doc) => (
        <li key={doc.slug}>
          <Link
            to={doc.collection === "guides" ? "/guides/$slug" : "/blog/$slug"}
            params={{ slug: doc.slug }}
            className="vh-focus group grid gap-2 py-7 md:grid-cols-[1fr_auto] md:items-baseline md:gap-10"
          >
            <span>
              <span className="block font-display text-xl font-semibold text-bone transition-colors group-hover:text-mint md:text-2xl">
                {doc.title}
              </span>
              <span className="mt-2 block text-muted-ink">{doc.description}</span>
            </span>
            <span className="vh-eyebrow flex gap-4 text-dim md:justify-end">
              {showDate && doc.published && <span>{formatDate(doc.published)}</span>}
              <span>{doc.readingTime} min read</span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function ArticleLayout({ doc, group }: { doc: Doc; group: Doc[] }) {
  const isGuide = doc.collection === "guides";
  const related = group.filter((d) => d.slug !== doc.slug);
  return (
    <article className="bg-surface text-bone">
      <DocHero
        doc={doc}
        back={
          isGuide ? { to: "/guides", label: "All guides" } : { to: "/blog", label: "All posts" }
        }
      />
      <div className="site-container py-14 md:py-20">
        {isGuide ? (
          <div className="grid gap-x-16 lg:grid-cols-[minmax(0,1fr)_15rem]">
            <div className="lg:order-2">
              <Toc headings={doc.headings} />
            </div>
            <div className="min-w-0 lg:order-1">
              <DocBody blocks={doc.blocks} />
            </div>
          </div>
        ) : (
          <DocBody blocks={doc.blocks} />
        )}
      </div>
      <Related docs={related} label={isGuide ? "Related guides" : "Related posts"} />
      {doc.cta && <CtaBlock cta={doc.cta} />}
    </article>
  );
}

export function Related({ docs, label }: { docs: Doc[]; label: string }) {
  if (!docs.length) return null;
  return (
    <section className="border-t border-bone/10">
      <div className="site-container py-14 md:py-16">
        <h2 className="vh-eyebrow mb-6 text-dim">{label}</h2>
        <DocList docs={docs} showDate={docs[0]?.collection === "blog"} />
      </div>
    </section>
  );
}

/** A policy's review date: "29 Sep 2026", or the highlighted placeholder until it is set. */
export function ReviewDate({ value }: { value: string }) {
  return isPlaceholder(value) ? (
    <mark className="placeholder">{value}</mark>
  ) : (
    <time dateTime={value}>{formatShortDate(value)}</time>
  );
}

export function PolicyLayout({ doc }: { doc: Doc }) {
  return (
    <article className="bg-surface text-bone">
      <section className="hero-grid pt-0!">
        <div className="site-container py-14 md:py-20">
          <Link
            to="/legal"
            className="print-hide vh-focus mb-10 inline-flex items-center gap-2 text-sm font-medium text-muted-ink hover:text-bone"
          >
            <ArrowLeft aria-hidden="true" className="size-4" /> All policies
          </Link>
          <h1 className="max-w-4xl text-balance font-display text-4xl font-semibold leading-[1.05] md:text-6xl">
            {doc.title}
          </h1>
          {doc.lastReviewed && (
            <p className="vh-eyebrow mt-6 text-muted-ink">
              Last reviewed <ReviewDate value={doc.lastReviewed} />
            </p>
          )}
          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-ink">{doc.description}</p>
        </div>
      </section>
      <div className="site-container py-14 md:py-20">
        <div className="grid gap-x-16 lg:grid-cols-[minmax(0,1fr)_15rem]">
          <div className="lg:order-2">
            <Toc headings={doc.headings} />
          </div>
          <div className="min-w-0 lg:order-1">
            <DocBody blocks={doc.blocks} />
            <div className="prose-vero mt-14 border-t border-bone/10 pt-8">
              <p>
                Questions about this policy? Email{" "}
                {isSet(settings.legalEmail) ? (
                  <a href={`mailto:${settings.legalEmail}`}>{settings.legalEmail}</a>
                ) : (
                  <mark className="placeholder">{settings.legalEmail}</mark>
                )}
              </p>
              <p className="print-hide">
                <Link to="/legal">All policies</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

/** The Legal hub list: every policy in the order legal-index.md gives. */
export function PolicyList() {
  return (
    <ul className="grid gap-x-12 md:grid-cols-2">
      {policies.map((doc) => (
        <li key={doc.slug} className="border-t border-bone/10 py-6">
          <Link
            to="/legal/$slug"
            params={{ slug: doc.slug }}
            className="vh-focus font-display text-xl font-semibold text-bone transition-colors hover:text-mint"
          >
            {doc.title}
          </Link>
          <p className="mt-2 text-muted-ink">{doc.summary ?? doc.description}</p>
          {doc.lastReviewed && (
            <p className="vh-eyebrow mt-3 text-dim">
              Last reviewed <ReviewDate value={doc.lastReviewed} />
            </p>
          )}
        </li>
      ))}
    </ul>
  );
}
