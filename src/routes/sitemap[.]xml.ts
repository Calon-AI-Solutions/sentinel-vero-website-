import { createFileRoute } from "@tanstack/react-router";

import { absoluteUrl, contentPaths } from "@/lib/content";
import { stories } from "@/lib/stories";

const staticPaths = ["/", "/platform", "/custom-build", "/proof", "/about"];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: () => {
        const entries = [
          ...staticPaths.map((path) => ({ path, lastmod: undefined as string | undefined })),
          ...stories.map((s) => ({ path: `/proof/${s.slug}`, lastmod: undefined })),
          ...contentPaths,
        ];
        const urls = entries
          .map(
            (e) =>
              `  <url><loc>${absoluteUrl(e.path)}</loc>${e.lastmod ? `<lastmod>${e.lastmod}</lastmod>` : ""}</url>`,
          )
          .join("\n");
        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
        return new Response(xml, {
          headers: { "Content-Type": "application/xml; charset=utf-8" },
        });
      },
    },
  },
});
