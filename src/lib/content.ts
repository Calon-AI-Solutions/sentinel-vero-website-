import { Marked, type Tokens } from "marked";

// Markdown content lives in /content and is bundled at build time. `[[...]]` marks a fact the
// owner must confirm: it renders highlighted, and the production build fails while any remain.

const rawFiles = import.meta.glob("/content/**/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

export type OptionalCookieCategory = "analytics" | "marketing";
type Settings = {
  siteUrl: string;
  demoUrl: string;
  legalEmail: string;
  /** Left out of the footer until it is a real URL. */
  developerCentreUrl: string;
  /** Social profiles; an icon renders only once its value is a real URL. */
  social: { linkedin: string };
  /** Only categories the site actually uses. The cookie banner shows once this is non-empty. */
  optionalCookieCategories: OptionalCookieCategory[];
};
const settingsModules = import.meta.glob("/content/settings.json", {
  import: "default",
  eager: true,
}) as Record<string, Settings>;
export const settings = settingsModules["/content/settings.json"] as Settings;

export const isPlaceholder = (value: string) => value.includes("[[");
/** A setting that is filled in with a real value, not empty and not a placeholder. */
export const isSet = (value: string | undefined): value is string =>
  !!value && !isPlaceholder(value);

export type Collection = "pages" | "guides" | "blog" | "legal";

export type Cta = { heading: string; text: string; label: string };

export type Block =
  | { kind: "markdown"; html: string }
  | { kind: "callout"; html: string }
  | { kind: "cta"; cta: Cta }
  | { kind: "calculator" };

export type Doc = {
  collection: Collection;
  title: string;
  slug: string;
  description: string;
  summary?: string;
  /** Policies only: ISO date, or a placeholder until the owner sets it. */
  lastReviewed?: string;
  /** Legal hub only: policy paths in display order, read from the list in legal-index.md. */
  listing?: string[];
  metaTitle: string;
  metaDescription: string;
  published?: string;
  updated?: string;
  author?: string;
  readingTime: number;
  path: string;
  blocks: Block[];
  /** The closing call to action, lifted out so layouts can place Related above it. */
  cta?: Cta;
  headings: { id: string; text: string }[];
};

const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/<[^>]+>/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

const marked = new Marked({
  gfm: true,
  renderer: {
    heading({ tokens, depth, text }: Tokens.Heading) {
      const id = slugify(text);
      const inner = this.parser.parseInline(tokens);
      // Every h2 gets a visible anchor so a section can be linked to directly.
      const anchor =
        depth === 2
          ? ` <a class="heading-anchor" href="#${id}" aria-label="Link to section: ${text.replace(/[*_`]/g, "").replace(/"/g, "&quot;")}">#</a>`
          : "";
      return `<h${depth} id="${id}">${inner}${anchor}</h${depth}>\n`;
    },
    checkbox() {
      return '<span class="task-box" aria-hidden="true"></span>';
    },
  },
});

const highlightPlaceholders = (html: string) =>
  html.replace(
    /\[\[([\s\S]*?)\]\]/g,
    '<mark class="placeholder" title="To confirm before publishing">[[$1]]</mark>',
  );

// Tables scroll inside their own focusable container so the page never scrolls sideways.
// Each container is named after the heading above it so screen readers can tell them apart.
const wrapTables = (html: string) => {
  let heading = "";
  let count = 0;
  return html.replace(
    /<h[23][^>]*>([\s\S]*?)<\/h[23]>|<table>|<\/table>/g,
    (match, headingHtml: string | undefined) => {
      if (headingHtml !== undefined) {
        heading = headingHtml
          .replace(/<a class="heading-anchor"[\s\S]*?<\/a>/, "")
          .replace(/<[^>]+>/g, "")
          .trim();
        return match;
      }
      if (match === "</table>") return "</table></div>";
      count++;
      const label = heading ? `${heading} table` : `Table ${count}`;
      return `<div class="prose-table" role="region" aria-label="${label}" tabindex="0"><table>`;
    },
  );
};

// A link whose address is still a placeholder is not valid markdown, so show its text with the
// highlighted placeholder beside it until the real address is filled in.
const unlinkPlaceholderUrls = (md: string) =>
  md.replace(/\[([^\]\n]+)\]\((\[\[[^\]\n]+\]\])\)/g, "$1 $2");

export const renderMarkdown = (md: string) =>
  wrapTables(
    highlightPlaceholders(marked.parse(unlinkPlaceholderUrls(md), { async: false }) as string),
  );

function parseFrontmatter(raw: string): { data: Record<string, string>; body: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!match) return { data: {}, body: raw };
  const data: Record<string, string> = {};
  for (const line of (match[1] ?? "").split(/\r?\n/)) {
    const m = line.match(/^(\w+):\s*(.*)$/);
    if (!m) continue;
    data[m[1] as string] = (m[2] ?? "").trim().replace(/^"(.*)"$/, "$1");
  }
  return { data, body: raw.slice(match[0].length) };
}

function parseBlocks(body: string): Block[] {
  const blocks: Block[] = [];
  let buffer: string[] = [];
  const flush = () => {
    const md = buffer.join("\n").trim();
    if (md) blocks.push({ kind: "markdown", html: renderMarkdown(md) });
    buffer = [];
  };
  const lines = body.split(/\r?\n/);
  for (let i = 0; i < lines.length; i++) {
    const open = (lines[i] ?? "").match(/^```(callout|cta|calculator)\s*$/);
    if (!open) {
      buffer.push(lines[i] ?? "");
      continue;
    }
    flush();
    const inner: string[] = [];
    while (++i < lines.length && (lines[i] ?? "").trim() !== "```") inner.push(lines[i] ?? "");
    const kind = open[1];
    if (kind === "calculator") blocks.push({ kind: "calculator" });
    else if (kind === "callout")
      blocks.push({ kind: "callout", html: renderMarkdown(inner.join("\n")) });
    else {
      const [heading = "", text = "", label = ""] = inner.map((l) => l.trim()).filter(Boolean);
      blocks.push({ kind: "cta", cta: { heading, text, label } });
    }
  }
  flush();
  return blocks;
}

const pathFor = (collection: Collection, slug: string) =>
  collection === "pages" ? `/${slug}` : `/${collection}/${slug}`;

function loadDoc(file: string, raw: string): Doc {
  const collection = file.split("/")[2] as Collection;
  const { data, body } = parseFrontmatter(raw);
  // The title is rendered by the page layout, so the leading h1 is dropped from the body.
  let withoutTitle = body.replace(/^\s*#\s+.+\r?\n/, "");
  // legal-index.md lists the policies for the hub to render; that list is data, not copy.
  let listing: string[] | undefined;
  const marker = withoutTitle.match(/^Policies in display order:\s*$/m);
  if (marker?.index !== undefined) {
    listing = [...withoutTitle.slice(marker.index).matchAll(/\(`(\/[^`]+)`\)/g)].map(
      (m) => m[1] as string,
    );
    withoutTitle = withoutTitle.slice(0, marker.index);
  }
  const blocks = parseBlocks(withoutTitle);
  const last = blocks[blocks.length - 1];
  const cta = last?.kind === "cta" ? (blocks.pop(), last.cta) : undefined;
  const words = withoutTitle.split(/\s+/).filter(Boolean).length;
  const headings = marked
    .lexer(withoutTitle)
    .filter((t): t is Tokens.Heading => t.type === "heading" && t.depth === 2)
    .map((t) => ({ id: slugify(t.text), text: t.text.replace(/[*_`]/g, "") }));
  const slug = data["slug"] ?? file.replace(/^.*\/|\.md$/g, "");
  const doc: Doc = {
    collection,
    title: data["title"] ?? slug,
    slug,
    description: data["description"] ?? data["summary"] ?? "",
    metaTitle: data["metaTitle"] ?? data["title"] ?? slug,
    metaDescription: data["metaDescription"] ?? data["description"] ?? "",
    readingTime: Number(data["readingTime"]) || Math.max(1, Math.ceil(words / 220)),
    path: pathFor(collection, slug),
    blocks,
    headings,
  };
  if (data["published"]) doc.published = data["published"];
  if (data["updated"]) doc.updated = data["updated"];
  if (data["author"]) doc.author = data["author"];
  if (cta) doc.cta = cta;
  if (data["summary"]) doc.summary = data["summary"];
  if (data["lastReviewed"]) doc.lastReviewed = data["lastReviewed"];
  if (listing) doc.listing = listing;
  return doc;
}

const docs = Object.entries(rawFiles).map(([file, raw]) => loadDoc(file, raw));

const byDate = (a: Doc, b: Doc) => (a.published ?? "").localeCompare(b.published ?? "");

/** Guides read as a sequence (pricing, scheduling, payroll), so oldest first. */
export const guides = docs.filter((d) => d.collection === "guides").sort(byDate);
/** Blog posts are newest first. */
export const blogPosts = docs
  .filter((d) => d.collection === "blog")
  .sort(byDate)
  .reverse();

export const getPage = (slug: string) =>
  docs.find((d) => d.collection === "pages" && d.slug === slug);
export const getGuide = (slug: string) => guides.find((d) => d.slug === slug);
export const getPost = (slug: string) => blogPosts.find((d) => d.slug === slug);
export const getPolicy = (slug: string) =>
  docs.find((d) => d.collection === "legal" && d.slug === slug);
/** Policies in the order legal-index.md lists them. */
export const policies = (getPage("legal")?.listing ?? []).flatMap((path) => {
  const doc = docs.find((d) => d.collection === "legal" && d.path === path);
  return doc ? [doc] : [];
});

export const absoluteUrl = (path: string) => `${settings.siteUrl.replace(/\/$/, "")}${path}`;

export const formatDate = (iso: string) =>
  new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${iso}T00:00:00Z`));

const shortMonths = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

/** "2026-09-29" becomes "29 Sep 2026". Anything else (a placeholder) is returned as is. */
export const formatShortDate = (value: string) => {
  const m = value.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  return m ? `${Number(m[3])} ${shortMonths[Number(m[2]) - 1]} ${m[1]}` : value;
};

/** Every content route, for the sitemap. */
export const contentPaths = docs.map((d) => ({ path: d.path, lastmod: d.updated ?? d.published }));
