import { absoluteUrl, type Doc } from "@/lib/content";

type Crumb = { name: string; path: string };
type JsonLd = Record<string, unknown>;

const publisher = {
  "@type": "Organization",
  name: "Calon AI Solutions Ltd",
  brand: { "@type": "Brand", name: "Vero" },
};

export const breadcrumbLd = (crumbs: Crumb[]): JsonLd => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: crumbs.map((c, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: c.name,
    item: absoluteUrl(c.path),
  })),
});

/** "Alom, Founder, Calon AI Solutions" is a person; "Calon AI Solutions" is the company. */
const authorLd = (author: string) => {
  const [name = author, ...rest] = author.split(",").map((s) => s.trim());
  return rest.length
    ? { "@type": "Person", name, jobTitle: rest.join(", ") }
    : { "@type": "Organization", name };
};

export const articleLd = (doc: Doc): JsonLd => ({
  "@context": "https://schema.org",
  "@type": "Article",
  headline: doc.title,
  description: doc.description,
  ...(doc.published ? { datePublished: doc.published } : {}),
  ...(doc.updated ? { dateModified: doc.updated } : {}),
  ...(doc.author ? { author: authorLd(doc.author) } : {}),
  publisher,
  mainEntityOfPage: absoluteUrl(doc.path),
});

// From the Company details section of content/pages/security-and-compliance.md.
export const organizationLd: JsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Calon AI Solutions Ltd",
  legalName: "Calon AI Solutions Ltd",
  brand: { "@type": "Brand", name: "Vero" },
  identifier: { "@type": "PropertyValue", name: "Company number", value: "15984397" },
  address: {
    "@type": "PostalAddress",
    streetAddress: "Ty Merlin, Caerphilly Business Park",
    addressCountry: "GB",
  },
};

export function docHead(doc: Doc, crumbs: Crumb[], jsonLd: JsonLd[] = []) {
  const url = absoluteUrl(doc.path);
  return {
    meta: [
      { title: doc.metaTitle },
      { name: "description", content: doc.metaDescription },
      { property: "og:title", content: doc.metaTitle },
      { property: "og:description", content: doc.metaDescription },
      { property: "og:type", content: doc.published ? "article" : "website" },
      { property: "og:url", content: url },
    ],
    links: [{ rel: "canonical", href: url }],
    scripts: [breadcrumbLd(crumbs), ...jsonLd].map((ld) => ({
      type: "application/ld+json",
      children: JSON.stringify(ld),
    })),
  };
}
