import { createFileRoute } from "@tanstack/react-router";

import { IndexHero, PolicyList } from "@/components/content";
import { getPage } from "@/lib/content";
import { docHead } from "@/lib/seo";

const page = getPage("legal")!;

export const Route = createFileRoute("/legal/")({
  head: () =>
    docHead(page, [
      { name: "Home", path: "/" },
      { name: "Legal", path: page.path },
    ]),
  component: LegalHub,
});

function LegalHub() {
  return (
    <div className="bg-surface text-bone">
      <IndexHero page={page} />
      <div className="site-container py-14 md:py-20">
        <PolicyList />
      </div>
    </div>
  );
}
