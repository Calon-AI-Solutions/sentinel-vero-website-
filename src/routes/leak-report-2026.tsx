import { createFileRoute } from "@tanstack/react-router";

import { CtaBlock, DocBody, DocHero } from "@/components/content";
import { getPage } from "@/lib/content";
import { articleLd, docHead } from "@/lib/seo";

const doc = getPage("leak-report-2026")!;

export const Route = createFileRoute("/leak-report-2026")({
  head: () =>
    docHead(
      doc,
      [
        { name: "Home", path: "/" },
        { name: doc.title, path: doc.path },
      ],
      [articleLd(doc)],
    ),
  component: LeakReportPage,
});

function LeakReportPage() {
  return (
    <div className="bg-surface text-bone">
      <DocHero doc={doc} />
      <div className="site-container py-14 md:py-20">
        <DocBody blocks={doc.blocks} />
      </div>
      {doc.cta && <CtaBlock cta={doc.cta} />}
    </div>
  );
}
