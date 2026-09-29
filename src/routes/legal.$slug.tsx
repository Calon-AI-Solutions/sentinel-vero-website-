import { createFileRoute, notFound } from "@tanstack/react-router";

import { PolicyLayout } from "@/components/content";
import { getPolicy } from "@/lib/content";
import { docHead } from "@/lib/seo";

export const Route = createFileRoute("/legal/$slug")({
  loader: ({ params }) => {
    if (!getPolicy(params.slug)) throw notFound();
  },
  head: ({ params }) => {
    const doc = getPolicy(params.slug);
    if (!doc) return { meta: [{ title: "Policy not found | Vero" }] };
    return docHead(doc, [
      { name: "Home", path: "/" },
      { name: "Legal", path: "/legal" },
      { name: doc.title, path: doc.path },
    ]);
  },
  component: PolicyPage,
});

function PolicyPage() {
  const { slug } = Route.useParams();
  return <PolicyLayout doc={getPolicy(slug)!} />;
}
