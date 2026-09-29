import { createFileRoute } from "@tanstack/react-router";

import { DocList, IndexHero } from "@/components/content";
import { blogPosts, getPage } from "@/lib/content";
import { docHead } from "@/lib/seo";

const page = getPage("blog")!;

export const Route = createFileRoute("/blog/")({
  head: () =>
    docHead(page, [
      { name: "Home", path: "/" },
      { name: "Blog", path: page.path },
    ]),
  component: BlogIndex,
});

function BlogIndex() {
  return (
    <div className="bg-surface text-bone">
      <IndexHero page={page} />
      <div className="site-container py-14 md:py-20">
        <DocList docs={blogPosts} showDate />
      </div>
    </div>
  );
}
