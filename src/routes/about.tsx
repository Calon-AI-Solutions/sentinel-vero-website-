import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Check, Code2, Headset, MapPin, Quote } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About us | Sentinel Vero" },
      {
        name: "description",
        content:
          "Sentinel Vero started in 2025 in Caerphilly. Meet Joc, Alom, Fabrizio and Cai, the team building operational software for fire and security businesses.",
      },
      { property: "og:title", content: "Our story | Sentinel Vero" },
      {
        property: "og:description",
        content:
          "Four people in Caerphilly, one solution, and a live fire and security business to test every idea against.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

const bookHref = "mailto:hello@sentinelvero.com?subject=Book%20a%20Discovery";
const talkHref = "mailto:hello@sentinelvero.com?subject=Question%20about%20Sentinel%20Vero";

type Member = {
  name: string;
  first: string;
  role: string;
  photo: string;
  bio: string;
  highlights?: string[];
  quote?: string;
};

const lead: Member = {
  name: "Joc O’Connell",
  first: "Joc",
  role: "Industry & Partnerships",
  photo: "/team/joc.webp",
  bio: "Thirty years building fire and security businesses across the UK, Ireland, France, Spain, Canada and Russia. Joc has built and sold five of them, four to major PLCs including Chubb and Sensormatic, and has coached 14 more companies through acquisition. Joc knows what a strong security business looks like from the inside and brings that playbook to every Vero client.",
  highlights: [
    "Built and sold five fire and security businesses",
    "Turned a Sensormatic branch from loss to £1.8m profit in two years",
    "Lifted recurring revenue by 62% across 12 security companies",
    "Developed the Eyewitness999 body worn CCTV in 2003/04",
  ],
  quote: "An uncanny habit of bringing people, businesses and opportunities together, profitably.",
};

const rest: Member[] = [
  {
    name: "Alom",
    first: "Alom",
    role: "Product & Technology",
    photo: "/team/alom.webp",
    bio: "Nine years building AI and cloud solutions, much of it for large safety and security enterprises. Alom turns the way your team actually works into software that is reliable, fast and simple to use.",
  },
  {
    name: "Fabrizio Pierri",
    first: "Fabrizio",
    role: "Commercial & Growth",
    photo: "/team/fabrizio.webp",
    bio: "Fabrizio brings deep commercial strategy experience and makes sure every feature earns its place by solving a real, costly problem for founder led businesses.",
  },
  {
    name: "Cai",
    first: "Cai",
    role: "Operations & Live Testing",
    photo: "/team/cai.webp",
    bio: "Cai has worked in the field for years and runs Volt Secure, where Vero is tested on real jobs, real engineers and real customers before it ever reaches yours.",
  },
];

const team: Member[] = [lead, ...rest];

const numbers: Array<[string, string]> = [
  ["2025", "The year it started, in Caerphilly"],
  ["30+", "Years Joc has spent in fire and security"],
  ["9", "Years Alom has spent building AI and cloud systems"],
  ["1", "Live business, Volt Secure, testing it every day"],
];

const crew = [
  {
    icon: Code2,
    title: "Development",
    body: "The engineers building and shipping the platform alongside Alom.",
  },
  {
    icon: Headset,
    title: "Support",
    body: "The people who help your team get set up and keep things running.",
  },
];

function Portrait({ member, className = "" }: { member: Member; className?: string }) {
  return (
    <img
      src={member.photo}
      alt={`Portrait of ${member.name}`}
      width={480}
      height={480}
      loading="lazy"
      className={`aspect-square w-full object-cover transition duration-500 md:grayscale md:group-hover:grayscale-0 ${className}`}
    />
  );
}

function AboutPage() {
  return (
    <>
      <section className="hero-grid overflow-hidden text-bone">
        <div className="site-container py-16 lg:py-24">
          <div className="mx-auto max-w-4xl text-center">
            <p className="vh-eyebrow inline-flex items-center gap-2 text-mint">
              <MapPin className="size-3.5" /> Caerphilly, 2025
            </p>
            <h1 className="mt-5 text-balance font-display text-5xl font-semibold leading-[0.98] md:text-7xl">
              4 people, 1 solution
            </h1>
            <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-muted-ink">
              Sentinel Vero is practical operational software for fire, security and field service
              businesses, built by people who know the trade and tested every day inside a live one.
            </p>
            <div className="mt-10 flex items-center justify-center">
              <div className="flex -space-x-3">
                {team.map((m) => (
                  <img
                    key={m.first}
                    src={m.photo}
                    alt={m.name}
                    width={56}
                    height={56}
                    className="size-14 rounded-full border-2 border-surface object-cover"
                  />
                ))}
              </div>
              <p className="ml-4 text-left text-sm leading-5 text-muted-ink">
                Joc, Alom, Fabrizio and Cai
                <br />
                <span className="text-bone">working together since day one</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        id="story"
        className="section-space scroll-mt-20 border-t border-bone/10 bg-ink text-bone"
      >
        <div className="site-container grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="vh-eyebrow text-mint">Our story</p>
            <h2 className="mt-4 text-balance font-display text-4xl font-semibold leading-tight md:text-5xl">
              It started in Caerphilly.
            </h2>
          </div>
          <div className="space-y-6 text-lg leading-8 text-muted-ink">
            <p>
              <span className="text-bone">2025.</span> Four people who each held a different piece
              of the same problem decided to solve it together.
            </p>
            <p>
              <span className="text-bone">Joc</span> had spent more than thirty years building,
              turning around and selling fire and security businesses.{" "}
              <span className="text-bone">Cai</span> was running Volt Secure, living the daily
              reality of jobs, engineers and customers. <span className="text-bone">Alom</span> had
              spent nine years building AI and cloud systems for large safety and security
              enterprises. <span className="text-bone">Fabrizio</span> brought the commercial
              strategy to turn it all into something founder led businesses would actually want.
            </p>
            <p>
              So we built it the only way that made sense to us: not in a lab, but inside Volt
              Secure. Real jobs, real engineers and real customers shape every screen, and every
              idea gets tested against a working day before it reaches yours.
            </p>
            <p className="border-l-2 border-mint pl-5 font-display text-2xl font-semibold leading-snug text-bone">
              All four of us are still in the room. That is the point.
            </p>
          </div>
        </div>

        <div className="site-container mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-bone/10 bg-bone/10 lg:grid-cols-4">
          {numbers.map(([value, label]) => (
            <div key={label} className="bg-panel p-6 md:p-8">
              <p className="font-display text-4xl font-semibold text-mint md:text-5xl">{value}</p>
              <p className="mt-3 text-sm leading-6 text-muted-ink">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <section
        id="team"
        className="section-space scroll-mt-20 border-t border-bone/10 bg-surface text-bone"
      >
        <div className="site-container">
          <div className="max-w-3xl">
            <p className="vh-eyebrow text-mint">The team</p>
            <h2 className="mt-4 text-balance font-display text-4xl font-semibold leading-tight md:text-5xl">
              Built by operators, not observers.
            </h2>
            <p className="mt-5 text-lg leading-8 text-muted-ink">
              Industry, technology, commercial strategy and live operations. Four seats at one
              table, all of them filled by the people you will actually work with.
            </p>
          </div>

          <article className="group mt-12 grid overflow-hidden rounded-xl border border-bone/10 bg-panel transition-colors hover:border-mint/40 lg:grid-cols-[.9fr_1.1fr]">
            <div className="relative">
              <Portrait member={lead} className="h-full lg:aspect-auto" />
              <span className="vh-eyebrow absolute left-4 top-4 rounded-full bg-ink/80 px-3 py-1.5 text-mint">
                01
              </span>
            </div>
            <div className="flex flex-col p-6 md:p-10">
              <p className="vh-eyebrow text-mint">{lead.role}</p>
              <h3 className="mt-3 font-display text-3xl font-semibold md:text-4xl">{lead.name}</h3>
              <p className="mt-5 leading-7 text-muted-ink">{lead.bio}</p>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {lead.highlights?.map((h) => (
                  <li
                    key={h}
                    className="flex items-start gap-3 text-sm font-medium leading-6 text-bone"
                  >
                    <Check className="mt-0.5 size-4 shrink-0 text-mint" />
                    {h}
                  </li>
                ))}
              </ul>
              {lead.quote && (
                <blockquote className="mt-8 flex gap-3 border-t border-bone/10 pt-6 text-bone">
                  <Quote className="size-5 shrink-0 text-mint" />
                  <p className="font-display text-lg italic leading-7">{lead.quote}</p>
                </blockquote>
              )}
            </div>
          </article>

          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {rest.map((m, i) => (
              <article
                key={m.first}
                className="group flex flex-col overflow-hidden rounded-xl border border-bone/10 bg-panel transition-colors hover:border-mint/40"
              >
                <div className="relative">
                  <Portrait member={m} />
                  <span className="vh-eyebrow absolute left-4 top-4 rounded-full bg-ink/80 px-3 py-1.5 text-mint">
                    0{i + 2}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="vh-eyebrow text-mint">{m.role}</p>
                  <h3 className="mt-3 font-display text-2xl font-semibold">{m.name}</h3>
                  <p className="mt-4 leading-7 text-muted-ink">{m.bio}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-20 border-t border-bone/10 pt-16">
            <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
              <div>
                <p className="vh-eyebrow text-mint">Behind the four</p>
                <h3 className="mt-4 text-balance font-display text-3xl font-semibold md:text-4xl">
                  And the crew who keep it running.
                </h3>
              </div>
              <p className="max-w-xl text-lg leading-8 text-muted-ink">
                Our development and support team. Full profiles are on their way.
              </p>
            </div>
            <div className="mt-10 grid gap-4 md:grid-cols-2">
              {crew.map(({ icon: Icon, title, body }) => (
                <div
                  key={title}
                  className="flex items-start gap-5 rounded-xl border border-dashed border-bone/15 bg-bone/[.02] p-6"
                >
                  <span className="grid size-12 shrink-0 place-items-center rounded-lg bg-mint/10 text-mint">
                    <Icon className="size-5" />
                  </span>
                  <div>
                    <h4 className="font-display text-xl font-semibold">{title}</h4>
                    <p className="mt-2 leading-7 text-muted-ink">{body}</p>
                    <div className="mt-4 flex -space-x-2" aria-hidden="true">
                      {[0, 1, 2].map((n) => (
                        <span
                          key={n}
                          className="size-9 rounded-full border-2 border-surface bg-bone/10"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-space hero-grid !pt-[clamp(5rem,10vw,8rem)] text-bone">
        <div className="site-container">
          <div className="mx-auto max-w-3xl text-center">
            <p className="vh-eyebrow text-mint">Why it matters to you</p>
            <h2 className="mt-5 text-balance font-display text-4xl font-semibold md:text-5xl">
              Senior people, from day one.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-muted-ink">
              No junior account managers, no paying a big firm for two rushed hours. We are local,
              we sit with your team, and we build it with you.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a
                href={bookHref}
                className="vh-focus inline-flex h-14 items-center gap-2 rounded-[10px] bg-mint px-8 text-base font-semibold text-ink transition-colors hover:bg-mint-hover"
              >
                Book a Discovery <ArrowRight className="size-5" />
              </a>
              <a
                href={talkHref}
                className="vh-focus vh-ghost inline-flex h-14 items-center rounded-[10px] px-8 text-base font-medium"
              >
                Speak to us
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
