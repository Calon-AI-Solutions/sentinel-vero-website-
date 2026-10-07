import { absoluteUrl, isSet, settings, type Doc } from "@/lib/content";

type Crumb = { name: string; path: string };
type JsonLd = Record<string, unknown>;

/** Default share image for pages without their own. 1200x630. */
export const defaultOgImage = "/og-image.png";

const orgId = `${absoluteUrl("/")}#organization`;
const websiteId = `${absoluteUrl("/")}#website`;
const softwareId = `${absoluteUrl("/")}#software`;

const publisher = { "@id": orgId };

const ldScript = (ld: JsonLd) => ({ type: "application/ld+json", children: JSON.stringify(ld) });

/**
 * Head tags for a hand-built page: absolute canonical, og:url and share image, plus any JSON-LD.
 * `ogTitle`/`ogDescription` default to the page title and description.
 */
export function pageHead(opts: {
  path: string;
  title: string;
  description: string;
  ogTitle?: string;
  ogDescription?: string;
  ogType?: "website" | "article";
  image?: string;
  jsonLd?: JsonLd[];
}) {
  const url = absoluteUrl(opts.path);
  const image = absoluteUrl(opts.image ?? defaultOgImage);
  const ogTitle = opts.ogTitle ?? opts.title;
  const ogDescription = opts.ogDescription ?? opts.description;
  return {
    meta: [
      { title: opts.title },
      { name: "description", content: opts.description },
      { property: "og:title", content: ogTitle },
      { property: "og:description", content: ogDescription },
      { property: "og:type", content: opts.ogType ?? "website" },
      { property: "og:url", content: url },
      { property: "og:image", content: image },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: ogTitle },
      { name: "twitter:description", content: ogDescription },
      { name: "twitter:image", content: image },
    ],
    links: [{ rel: "canonical", href: url }],
    scripts: (opts.jsonLd ?? []).map(ldScript),
  };
}

export const faqLd = (faqs: ReadonlyArray<ReadonlyArray<string>>): JsonLd => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map(([q, a]) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
});

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
  image: absoluteUrl(defaultOgImage),
  ...(doc.published ? { datePublished: doc.published } : {}),
  ...(doc.updated ? { dateModified: doc.updated } : {}),
  ...(doc.author ? { author: authorLd(doc.author) } : {}),
  publisher,
  mainEntityOfPage: absoluteUrl(doc.path),
});

// Company facts from the Company details section of content/pages/security-and-compliance.md
// and the About page. Rendered on every page from the root route.
export const organizationLd: JsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": orgId,
  name: "Sentinel Vero",
  legalName: "Sentinel Vero Ltd",
  alternateName: ["Vero", "Sentinel Vero Ltd"],
  url: absoluteUrl("/"),
  logo: absoluteUrl("/icon-512.png"),
  image: absoluteUrl(defaultOgImage),
  description:
    "Sentinel Vero builds Vero, operational software for UK fire and security contractors that connects enquiries, quotes, jobs, field work, compliance records and payroll in one system.",
  slogan: "Eliminate the graft, elevate the craft.",
  foundingDate: "2025",
  brand: { "@type": "Brand", name: "Vero" },
  identifier: { "@type": "PropertyValue", name: "Company number", value: "17492624" },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Caerphilly",
    addressRegion: "Wales",
    addressCountry: "GB",
  },
  areaServed: { "@type": "Country", name: "United Kingdom" },
  email: settings.legalEmail,
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    email: settings.legalEmail,
    areaServed: "GB",
    availableLanguage: "English",
  },
  knowsAbout: [
    "Fire alarm maintenance",
    "Security system installation",
    "BS 5839-1:2025",
    "BAFE SP203-1",
    "NSI and SSAIB certification",
    "Field service management software",
    "Engineer timesheets and payroll",
  ],
  sameAs: [
    "https://find-and-update.company-information.service.gov.uk/company/17492624",
    ...(isSet(settings.social.linkedin) ? [settings.social.linkedin] : []),
  ],
};

export const websiteLd: JsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": websiteId,
  name: "Sentinel Vero",
  url: absoluteUrl("/"),
  inLanguage: "en-GB",
  publisher,
};

export const softwareLd: JsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "@id": softwareId,
  name: "Vero",
  alternateName: "Sentinel Vero",
  applicationCategory: "BusinessApplication",
  applicationSubCategory: "Field service management for fire and security contractors",
  operatingSystem: "Web, iOS, Android",
  url: absoluteUrl("/platform"),
  image: absoluteUrl("/screens/dashboard.webp"),
  description:
    "Operational software for fire and security contractors: CRM, enquiries, AI quoting, job management, engineer field app, service scheduling, compliance records, timesheets and payroll in one connected system.",
  featureList: [
    "CRM, customers, contacts and sites",
    "Enquiries and opportunities",
    "AI quoting with visible margin",
    "Job management and engineer workflows",
    "Engineer field app for time, photos and notes",
    "Service and maintenance scheduling",
    "Documents and compliance records",
    "AI advisory from site photos",
    "Verified timesheets, mileage and payroll export to Xero",
    "Dashboards and reporting",
  ],
  audience: { "@type": "BusinessAudience", audienceType: "Fire and security contractors" },
  provider: publisher,
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
      { property: "og:image", content: absoluteUrl(defaultOgImage) },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: doc.metaTitle },
      { name: "twitter:description", content: doc.metaDescription },
      { name: "twitter:image", content: absoluteUrl(defaultOgImage) },
    ],
    links: [{ rel: "canonical", href: url }],
    scripts: [breadcrumbLd(crumbs), ...jsonLd].map(ldScript),
  };
}
