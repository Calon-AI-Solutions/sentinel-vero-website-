import { createFileRoute } from "@tanstack/react-router";

import { DocList, IndexHero } from "@/components/content";
import { getPage, guides } from "@/lib/content";
import { docHead } from "@/lib/seo";

const page = getPage("guides")!;

export const Route = createFileRoute("/guides/")({
  head: () =>
    docHead(page, [
      { name: "Home", path: "/" },
      { name: page.title, path: page.path },
    ]),
  component: GuidesIndex,
});

function GuidesIndex() {
  return (
    <div className="bg-surface text-bone">
      <IndexHero page={page} />
      <div className="site-container py-14 md:py-20">
        <DocList docs={guides} showDate={false} />
      </div>
    </div>
  );
}
