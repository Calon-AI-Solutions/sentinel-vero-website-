import { createFileRoute } from "@tanstack/react-router";

import { DocBody } from "@/components/content";
import { getPage } from "@/lib/content";
import { docHead } from "@/lib/seo";

const page = getPage("site-map")!;

export const Route = createFileRoute("/site-map")({
  head: () =>
    docHead(page, [
      { name: "Home", path: "/" },
      { name: page.title, path: page.path },
    ]),
  component: SiteMapPage,
});

function SiteMapPage() {
  return (
    <div className="bg-surface text-bone">
      <section className="hero-grid pt-0!">
        <div className="site-container py-14 md:py-20">
          <h1 className="font-display text-4xl font-semibold leading-[1.05] md:text-6xl">
            {page.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-ink">{page.description}</p>
        </div>
      </section>
      <div className="site-map site-container py-14 md:py-20">
        <DocBody blocks={page.blocks} />
      </div>
    </div>
  );
}
