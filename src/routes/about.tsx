import { createFileRoute } from "@tanstack/react-router";
import { DiscoveryCta, PageIntro } from "@/components/site-shell";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About us | Sentinel Vero" },
      { name: "description", content: "Sentinel Vero builds practical operational software for fire, security and field service businesses, developed and tested inside a live operation." },
      { property: "og:title", content: "About Sentinel Vero | Built in the field" },
      { property: "og:description", content: "One clearer operational environment for growing operators, built and tested inside a live fire and security business." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  const capabilities: Array<[string, string]> = [
    ["01", "Enquiries and customer information"],
    ["02", "Quotes and job management"],
    ["03", "Scheduling and field activity"],
    ["04", "Timesheets and labour visibility"],
    ["05", "Project and job costing"],
    ["06", "Certificates, service records and job history"],
    ["07", "Operational reporting"],
    ["08", "Evidence and paperwork control"],
    ["09", "Workflow automation"],
  ];

  const team: Array<{ name: string; role: string; bio: string }> = [
    {
      name: "Fabrizio Pierri",
      role: "Commercial strategy, positioning and growth",
      bio: "Fabrizio leads the commercial development of Sentinel Vero. He focuses on understanding the problems faced by founder-led businesses, translating operational pain into a clear proposition and developing the relationships and route to market required for sustainable growth.",
    },
    {
      name: "Alom",
      role: "Technology, product development and systems architecture",
      bio: "Alom leads the technical direction of the platform. He translates real operational requirements into reliable, scalable systems while ensuring the technology remains practical, intuitive and commercially viable.",
    },
    {
      name: "Cai",
      role: "Live operational insight and implementation",
      bio: "Through Volt Secure, Cai provides the direct operational experience behind the platform. He brings an operator’s perspective to its development and provides the live environment in which Sentinel Vero can be tested, challenged and improved across real teams, jobs, customers and workflows.",
    },
    {
      name: "Joc",
      role: "Industry relationships and strategic growth",
      bio: "Joc brings sector knowledge, industry relationships and a wider strategic perspective. He supports market access, partnerships and commercial opportunities while helping shape the long-term growth of Sentinel Vero.",
    },
  ];

  return (
    <>
      <PageIntro eyebrow="About Sentinel Vero" title="Built in the field. Shaped by real operations.">
        <p>Sentinel Vero is building practical operational software for fire, security and field service businesses.</p>
        <p className="mt-4">
          We help growing operators replace disconnected systems, spreadsheets and paperwork with one clearer operational environment that connects the information, people and processes required to run the business effectively.
        </p>
        <p className="mt-4">
          From the first customer enquiry through to quoting, scheduling, field delivery, job costing and reporting, Sentinel Vero is designed to give operators greater control over how work moves through their business.
        </p>
      </PageIntro>

      <section className="section-space bg-foreground text-background">
        <div className="site-container grid gap-12 lg:grid-cols-[1fr_1fr]">
          <div>
            <p className="eyebrow text-primary">Software grounded in operational reality</p>
            <h2 className="mt-4 font-display text-4xl font-semibold">Tested where it matters: inside a live business.</h2>
          </div>
          <div className="space-y-5 text-lg leading-8 text-background/70">
            <p>Sentinel Vero was not conceived in isolation or built around assumptions.</p>
            <p>
              The platform is being developed and tested inside <strong className="font-semibold text-background">Volt Secure</strong>, a live fire and security business where it is used by the team every day. Real jobs, customers, engineers and workflows generate the feedback that shapes the product.
            </p>
            <p>
              That gives us something we believe matters: direct visibility of how operational systems perform when they meet the realities of the field.
            </p>
          </div>
        </div>
        <div className="site-container mt-12 grid gap-px border border-background/15 bg-background/15 md:grid-cols-3">
          {[
            ["Every workflow", "can be tested against genuine requirements."],
            ["Every improvement", "can be informed by real usage."],
            ["Every decision", "can remain focused on whether it makes the business clearer, faster and easier to control."],
          ].map(([lead, body]) => (
            <div key={lead} className="bg-foreground p-8">
              <p className="font-display text-xl font-bold">{lead}</p>
              <p className="mt-3 text-background/60">{body}</p>
            </div>
          ))}
        </div>
        <div className="site-container mt-10 max-w-3xl">
          <p className="text-lg leading-8 text-background/70">
            This is not technology for technology’s sake. It is software built to solve the operational problems that growing service businesses encounter every day.
          </p>
        </div>
      </section>

      <section className="section-space">
        <div className="site-container">
          <p className="eyebrow">One clearer operational environment</p>
          <div className="mt-4 grid gap-10 lg:grid-cols-[.9fr_1.1fr] lg:items-end">
            <h2 className="font-display text-4xl font-semibold">The core areas required to manage work effectively.</h2>
            <p className="max-w-xl text-lg leading-8 text-muted-foreground">
              Sentinel Vero brings them together in one place. The aim is simple: reduce fragmentation, improve visibility and help operators make better decisions with greater confidence.
            </p>
          </div>
          <div className="mt-10 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {capabilities.map(([num, label]) => (
              <div key={num} className="bg-card p-6">
                <p className="font-mono text-xs text-muted-foreground">{num}</p>
                <p className="mt-3 font-display text-lg font-bold leading-snug">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space bg-secondary">
        <div className="site-container">
          <p className="eyebrow">The team</p>
          <h2 className="mt-4 max-w-2xl font-display text-4xl font-semibold">Built by four complementary perspectives.</h2>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
            Commercial strategy, technical capability, live operational experience and industry relationships.
          </p>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {team.map((member) => (
              <div key={member.name} className="border border-border bg-background p-8">
                <div className="flex items-center gap-3">
                  <span className="control-mark" aria-hidden="true"><i /></span>
                  <div>
                    <h3 className="font-display text-2xl font-bold leading-tight">{member.name}</h3>
                    <p className="mt-1 font-mono text-xs uppercase tracking-wide text-muted-foreground">{member.role}</p>
                  </div>
                </div>
                <p className="mt-5 leading-7 text-muted-foreground">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="site-container grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
          <div>
            <p className="eyebrow">Practical by design</p>
            <h2 className="mt-4 font-display text-4xl font-semibold">The business should never work around the software.</h2>
          </div>
          <div className="space-y-5 text-lg leading-8 text-muted-foreground">
            <p>
              We believe operational software should reflect how a business actually works. It should never force the business to work around the software.
            </p>
            <p>
              That is why Sentinel Vero is being built alongside the people using it, shaped by live operational evidence and focused on the areas that create meaningful commercial value: visibility, control, consistency, efficiency and stronger decision-making.
            </p>
          </div>
        </div>
        <div className="site-container mt-12 border-t border-border pt-8">
          <p className="font-display text-2xl font-semibold md:text-3xl">Sentinel Vero. Built around the realities of the field.</p>
        </div>
      </section>

      <DiscoveryCta title="Let’s find the gaps before they cost you more." />
    </>
  );
}
