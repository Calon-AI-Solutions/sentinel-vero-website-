import { createFileRoute, notFound } from "@tanstack/react-router";

import { ArticleLayout } from "@/components/content";
import { blogPosts, getPost } from "@/lib/content";
import { articleLd, docHead } from "@/lib/seo";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    if (!getPost(params.slug)) throw notFound();
  },
  head: ({ params }) => {
    const doc = getPost(params.slug);
    if (!doc) return { meta: [{ title: "Post not found | Vero" }] };
    return docHead(
      doc,
      [
        { name: "Home", path: "/" },
        { name: "Blog", path: "/blog" },
        { name: doc.title, path: doc.path },
      ],
      [articleLd(doc)],
    );
  },
  component: PostPage,
});

function PostPage() {
  const { slug } = Route.useParams();
  const doc = getPost(slug)!;
  return <ArticleLayout doc={doc} group={blogPosts} />;
}
