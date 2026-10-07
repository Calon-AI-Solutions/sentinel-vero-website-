import { createFileRoute } from "@tanstack/react-router";

import { CtaBlock, DocBody, DocHero } from "@/components/content";
import { getPage } from "@/lib/content";
import { docHead } from "@/lib/seo";

const doc = getPage("security")!;

export const Route = createFileRoute("/security")({
  head: () =>
    docHead(doc, [
      { name: "Home", path: "/" },
      { name: doc.title, path: doc.path },
    ]),
  component: SecurityPage,
});

function SecurityPage() {
  return (
    <div className="bg-surface text-bone">
      <DocHero doc={doc} showMeta={false} />
      <div className="site-container py-14 md:py-20">
        <DocBody blocks={doc.blocks} />
      </div>
      {doc.cta && <CtaBlock cta={doc.cta} />}
    </div>
  );
}
