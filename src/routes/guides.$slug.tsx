import { createFileRoute, notFound } from "@tanstack/react-router";

import { ArticleLayout } from "@/components/content";
import { getGuide, guides } from "@/lib/content";
import { articleLd, docHead } from "@/lib/seo";

export const Route = createFileRoute("/guides/$slug")({
  loader: ({ params }) => {
    if (!getGuide(params.slug)) throw notFound();
  },
  head: ({ params }) => {
    const doc = getGuide(params.slug);
    if (!doc) return { meta: [{ title: "Guide not found | Vero" }] };
    return docHead(
      doc,
      [
        { name: "Home", path: "/" },
        { name: "Guides", path: "/guides" },
        { name: doc.title, path: doc.path },
      ],
      [articleLd(doc)],
    );
  },
  component: GuidePage,
});

function GuidePage() {
  const { slug } = Route.useParams();
  const doc = getGuide(slug)!;
  return <ArticleLayout doc={doc} group={guides} />;
}
