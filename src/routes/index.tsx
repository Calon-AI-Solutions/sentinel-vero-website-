import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check, ChevronRight, Play } from "lucide-react";
import { useEffect, useState } from "react";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DiscoveryCta } from "@/components/site-shell";
import { DashboardVisual, FieldVisual } from "@/components/platform-visuals";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Sentinel Vero | Operational control for fire & security contractors" },
    { name: "description", content: "Connect every enquiry, quote, job, site and payroll run in one operational system built for fire and security contractors." },
    { property: "og:title", content: "Sentinel Vero | See the leaks. Fix the system." },
    { property: "og:description", content: "Operational control for fire and security contractors who have outgrown fragmented systems." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ], links: [{ rel: "canonical", href: "/" }] }), component: HomePage,
});

const issues = [['The Stack','Timesheets in one app. Job tracking in another. Pricing living in someone’s head.'],['The Guess','Profit isn’t measured. It’s estimated, or patched together by pasting numbers into ChatGPT or Claude and hoping for a clean answer.'],['The Headcount Fix','Compliance gets complicated, so the answer is always “hire another person”, never “build a system that handles it.”']];
const chain = ['Customer','Quote','Job','Field','Review','Advisory','Invoice','Payroll'];
const promises = [['See','Every record, in context.'],['Verify','A trail you can trust, not a guess you hope is right.'],['Surface','The stuff that matters, first.'],['Improve','Decisions stay human. The system makes them easier to get right.']];
const features = ['CRM, customers, contacts & sites','Enquiries & opportunities','Job management & engineer workflows','Service & maintenance scheduling','Documents & compliance','Dashboards & reporting'];
const partnerLogos: Array<{ name: string; src: string; iconOnly?: boolean }> = [
  { name: 'Volt Secure', src: '/partners/volt-secure.png', iconOnly: true },
  { name: 'HeatGlow', src: '/partners/heatglow.png' },
  { name: 'JOC Security Growth', src: '/partners/joc.png' },
  { name: 'Caerphilly Business Club', src: '/partners/caerphilly-business-club.png', iconOnly: true },
];
const testimonials = [
  { quote: 'We used to spend hours checking timesheets and mileage before payroll. Volt verifies it for us, so by the time it reaches Xero, it’s already right.', name: 'Cai', role: 'Founder & Managing Director', company: 'Volt Secure', photo: '/testimonials/cai-award.png' },
  { quote: 'Quoting, compliance and payroll used to live in different places. Now it’s all in one system, and the AI advisory analyses photos from our engineers on site to spot new work, so we win more revenue, faster.', name: 'Cai', role: 'Founder & Managing Director', company: 'Volt Secure', photo: '/testimonials/cai-desk.png' },
  { quote: 'In 17 years as an engineer, this is the easiest app I’ve used. Time and mileage log automatically, photos and notes go in on site, and I’m done. No paperwork at the end of the day.', name: '', role: 'Engineer', company: 'Volt Secure', photo: '/testimonials/volt-engineer.webp' },
  { quote: 'My client looked at the big platforms, but this was built around how security companies actually work. It was set up quickly, the team listens, and new features arrive when we need them.', name: 'John O’Connell', role: 'Senior Security Partner', company: 'JOC Security Growth', photo: '/testimonials/john-oconnell.webp' },
];
const platformTabs: Array<{ key: string; label: string; title: string; body: string; bullets?: string[]; visual: "dashboard" | "field"; screens?: string[]; phone?: string }> = [
  { key: 'core', label: 'Core operations', title: 'Everything the job needs.', body: 'CRM, enquiries, job management, service scheduling, documents and dashboards, all in one connected system.', bullets: features, visual: 'dashboard', screens: ['/screens/dashboard.webp'] },
  { key: 'quoting', label: 'AI Quoting', title: 'Stop rebuilding every quote from scratch.', body: 'The system already knows the pricing logic, the job history, the site. Let it write the first draft.', visual: 'dashboard', screens: ['/screens/ai-quote-studio.webp'] },
  { key: 'advisory', label: 'AI Advisory', title: 'Nothing gets missed after the job.', body: 'After a job wraps, the system flags what’s likely needed next and turns it into a quote that’s ready to send.', visual: 'dashboard', screens: ['/screens/advisory-queue.webp', '/screens/advisory-detail.webp', '/screens/advisory-quote.webp'] },
  { key: 'payroll', label: 'Time & Payroll', title: 'No timesheets. No chasing.', body: 'Engineers log time as they work. It flows straight into payroll, with mileage calculated automatically.', visual: 'dashboard', screens: ['/screens/timesheet-review.webp', '/screens/payroll-week.webp'] },
  { key: 'field', label: 'Field App', title: 'Built for the field, not the office.', body: 'Engineers capture evidence, update the job and log time while it’s happening, not after.', visual: 'field', phone: '/screens/field-app-today.png' },
];

function SectionHeading({ eyebrow, title, body }: { eyebrow: string; title: string; body?: string }) { return <div className="max-w-3xl"><p className="eyebrow">{eyebrow}</p><h2 className="mt-4 text-balance font-display text-4xl font-semibold leading-tight md:text-5xl">{title}</h2>{body && <p className="mt-6 text-lg leading-8 text-muted-foreground">{body}</p>}</div>; }

function ScreenRotator({ screens, alt }: { screens: string[]; alt: string }) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    if (screens.length < 2) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % screens.length), 2500);
    return () => clearInterval(id);
  }, [screens.length]);
  return (
    <div className="rounded-xl border border-border bg-secondary p-3 shadow-lg md:p-5">
      <div className="grid overflow-hidden rounded-md border border-border bg-card">
        {screens.map((src, i) => <img key={src} src={src} alt={i === index ? alt : ""} aria-hidden={i !== index} className={`col-start-1 row-start-1 w-full self-start transition-opacity duration-500 ${i === index ? "opacity-100" : "opacity-0"}`} />)}
      </div>
    </div>
  );
}

function TestimonialCarousel({ items }: { items: typeof testimonials }) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % items.length), 2000);
    return () => clearInterval(id);
  }, [items.length]);
  const t = items[index]!;
  const logo = partnerLogos.find((p) => p.name === t.company);
  return (
    <div className="grid gap-8 rounded-md border border-border bg-card p-6 shadow-sm lg:grid-cols-[1.1fr_1fr] lg:items-center lg:p-8">
      <div className="overflow-hidden rounded-md border border-border"><img src={t.photo} alt={t.name || `${t.role}, ${t.company}`} className="aspect-video w-full object-cover object-[50%_30%]" /></div>
      <div>
        <div className="flex items-center justify-between gap-4 rounded-md bg-foreground px-5 py-4 text-background">
          {t.name ? <p className="font-display text-base font-bold">{t.name}<span className="block text-sm font-normal text-background/60">{t.role}</span></p> : <p className="text-sm font-semibold text-background/70">{t.role}, {t.company}</p>}
          {logo && <img src={logo.src} alt={logo.name} className="h-6 w-auto max-w-24 object-contain" />}
        </div>
        <p className="mt-6 font-display text-2xl font-semibold leading-snug md:text-3xl">“{t.quote}”</p>
        <div className="mt-6 flex gap-1.5">{items.map((_, i) => <span key={i} className={`h-1.5 w-6 rounded-full transition-colors ${i === index ? 'bg-primary' : 'bg-border'}`} />)}</div>
      </div>
    </div>
  );
}

function HomePage() {
  return <>
    <section className="hero-grid overflow-hidden text-background">
      <div className="site-container flex flex-col items-center py-16 text-center lg:py-24">
        <p className="eyebrow text-primary">For fire & security contractors who are done guessing</p>
        <h1 className="mt-5 max-w-4xl text-balance font-display text-5xl font-semibold leading-[0.98] md:text-7xl">You can’t measure what you can’t see.</h1>
        <p className="mt-7 max-w-2xl text-lg leading-8 text-background/70">You know the leaks are there. You just can’t see them all at once. Sentinel Vero puts every enquiry, quote, job, site and payroll run in one place, with AI already working in the background, so you stop finding out too late.</p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Button asChild variant="signal" size="xl"><a href="mailto:hello@sentinelvero.com?subject=Book%20a%20Discovery">Book a Discovery <ArrowRight /></a></Button>
          <Button variant="outline" size="xl" className="border-background/30 bg-transparent text-background hover:bg-background/10 hover:text-background"><Play className="fill-current" /> Watch Demo</Button>
        </div>
        <p className="mt-4 max-w-md text-xs leading-5 text-background/50">We don’t publish a price. Because we don’t sell software. We sell control.</p>
      </div>
    </section>

    <section className="section-space bg-foreground text-background"><div className="site-container">
      <p className="eyebrow text-center text-primary">Trusted by our partners</p>
      <div className="logo-marquee mt-8">
        <div className="logo-marquee-track">
          {[...partnerLogos, ...partnerLogos].map((partner, i) => <div key={partner.name + i} className="flex h-20 shrink-0 items-center gap-3 md:h-24"><img src={partner.src} alt={partner.iconOnly ? "" : partner.name} className="h-14 w-auto max-w-56 object-contain md:h-16" />{partner.iconOnly && <span className="max-w-40 font-display text-base font-semibold leading-tight text-background md:text-lg">{partner.name}</span>}</div>)}
        </div>
      </div>
    </div></section>

    <section className="section-space bg-secondary"><div className="site-container">
      <p className="eyebrow text-center">What our partners say</p>
      <div className="mt-8">
        <TestimonialCarousel items={testimonials} />
      </div>
    </div></section>

    <section className="section-space"><div className="site-container"><SectionHeading eyebrow="The problem" title="Growth doesn’t break businesses. Spreadsheets do." body="Nobody plans to run a growing company like this. It happens one hire at a time, one workaround at a time, until the day nobody, including you, actually knows what’s going on. That’s not a technology problem. That’s a control problem."/><div className="mt-12 grid gap-3 md:grid-cols-3">{issues.map(([title,body],i) => <article key={title} className="issue-card"><span className="step-number">0{i+1}</span><h3>{title}.</h3><p>{body}</p></article>)}</div></div></section>

    <section className="section-space bg-secondary"><div className="site-container"><SectionHeading eyebrow="The connected platform" title="One truth. Everywhere it’s needed." body="A customer becomes a quote. A quote becomes a job. A job becomes a payroll entry. Right now, that’s five systems and a person holding it together in their head. An engineer’s notes and photos from the field turn straight into the next quote, so the upsell writes itself instead of getting missed. Sentinel Vero makes it one thread, start to finish, so nothing gets lost between the field and the decision."/><div className="evidence-chain mt-12">{chain.map((item,i) => <div key={item} className="chain-item"><span>{String(i+1).padStart(2,'0')}</span><strong>{item}</strong>{i < chain.length-1 && <ChevronRight />}</div>)}</div><p className="mt-5 text-sm text-muted-foreground">Advisory auto-converts to quote. Payroll tracks every engineer.</p></div></section>

    <section className="section-space bg-foreground text-background"><div className="site-container"><SectionHeading eyebrow="Our position" title="We’re not another app on the pile." body="You don’t need one more login. You need someone who understands how fire and security businesses actually run, and builds the system around that, not the other way round."/><div className="mt-12 grid gap-px border border-background/15 bg-background/15 md:grid-cols-4">{promises.map(([title,body],i) => <article key={title} className="bg-foreground p-7"><span className="font-mono text-xs text-primary">0{i+1}</span><h3 className="mt-10 font-display text-2xl font-bold">{title}.</h3><p className="mt-3 text-sm leading-6 text-background/60">{body}</p></article>)}</div><p className="mt-8 text-xl font-semibold">Most platforms make you bend to fit them. <span className="text-primary">We bend to fit you.</span> That’s the whole difference.</p></div></section>

    <section className="section-space"><div className="site-container grid gap-12 lg:grid-cols-[.8fr_1.2fr]"><div><SectionHeading eyebrow="Who it’s for" title="Too big for spreadsheets. Too specific for generic software." body="Wherever you are in that growth, the story’s the same: things have gotten complicated, but you haven’t slowed down. Good. You shouldn’t have to."/><div className="mt-8 border-l-2 border-primary pl-5"><p className="eyebrow">Who fits best</p><p className="mt-3 text-sm leading-7 text-muted-foreground">Running the business on Excel and good intentions · Outgrowing Out On Site · Paying for Simpro or Uptick and still doing half the work by hand</p></div></div><div className="divide-y divide-border border-y border-border">{[['10 to 20 people','Past DIY. Build the process before you hire your way out of it.'],['20 to 35 people','The workflows exist. They’re just not connected yet.'],['35 to 50 people','Stop depending on the three people who remember everything.']].map(([title,body]) => <div key={title} className="grid gap-3 py-6 sm:grid-cols-[9rem_1fr]"><h3 className="font-mono font-bold text-primary">{title}</h3><p className="text-muted-foreground">{body}</p></div>)}</div></div></section>

    <section className="section-space"><div className="site-container">
      <SectionHeading eyebrow="The platform" title="Everything the job needs. See it, don’t just read about it." body="Click through what the platform actually does: the same office and field views your team would use."/>
      <Tabs defaultValue="core" className="mt-12">
        <TabsList className="h-auto flex-wrap justify-start gap-1 bg-transparent p-0">
          {platformTabs.map((tab) => <TabsTrigger key={tab.key} value={tab.key} className="rounded-full px-5 py-2.5 text-sm font-semibold text-muted-foreground shadow-none data-[state=active]:bg-primary/15 data-[state=active]:text-foreground data-[state=active]:shadow-none">{tab.label}</TabsTrigger>)}
        </TabsList>
        {platformTabs.map((tab) => <TabsContent key={tab.key} value={tab.key} className={`mt-8 grid gap-10 ${tab.screens ? '' : 'items-center lg:grid-cols-[1fr_auto]'}`}>
          <div>
            <h3 className="font-display text-2xl font-bold md:text-3xl">{tab.title}</h3>
            <p className="mt-3 max-w-lg text-muted-foreground">{tab.body}</p>
            {tab.bullets && <div className="mt-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">{tab.bullets.map((item) => <div key={item} className="flex items-center gap-2 text-sm font-semibold"><Check className="size-4 text-primary"/>{item}</div>)}</div>}
          </div>
          {tab.screens ? <ScreenRotator screens={tab.screens} alt={`${tab.label} screen`} /> : tab.phone ? <div className="mx-auto w-full max-w-[19rem] rounded-[2.25rem] border border-border bg-secondary p-2.5 shadow-lg"><img src={tab.phone} alt={`${tab.label} screen`} className="w-full rounded-[1.75rem]" /></div> : tab.visual === 'field' ? <FieldVisual/> : <DashboardVisual/>}
        </TabsContent>)}
      </Tabs>
      <div className="mt-8"><Button asChild variant="outline" size="lg"><Link to="/platform">See how to use the platform <ArrowRight /></Link></Button></div>
    </div></section>

    <section className="section-space bg-foreground text-background"><div className="site-container grid gap-8 md:grid-cols-[1fr_auto] md:items-end"><div><p className="eyebrow text-primary">Proof</p><h2 className="mt-4 max-w-3xl font-display text-4xl font-semibold">We build this inside a real business, not a slide deck.</h2><p className="mt-4 text-background/60">Real client results, not slides.</p></div><Button asChild variant="inverse" size="lg"><Link to="/proof">View proof <ArrowRight /></Link></Button></div></section>

    <section className="section-space"><div className="site-container"><SectionHeading eyebrow="How it works" title="We look before we build."/><div className="mt-12 grid gap-px overflow-hidden rounded-md border border-border bg-border md:grid-cols-5">{[['Discover','We learn how you actually work.'],['Configure','The platform bends to fit.'],['Migrate','Your records, moved properly.'],['Launch','Trained, tested, live.'],['Improve','We keep tuning it.']].map(([title,body],i) => <div key={title} className="bg-background p-6"><span className="step-number">0{i+1}</span><h3 className="mt-8 font-display text-lg font-bold">{title}.</h3><p className="mt-2 text-sm text-muted-foreground">{body}</p></div>)}</div></div></section>

    <section className="section-space bg-secondary"><div className="site-container">
      <SectionHeading eyebrow="Partnership & pricing" title="Simple enough to say yes to. Structured enough to trust." body="Sentinel Vero is licensed per user, with pricing shaped by your team size, migration needs and the workflows you configure. You’ll get a clear quote after an Operational Discovery, not a generic tier."/>
      <div className="mt-12 grid gap-px overflow-hidden rounded-md border border-border bg-border md:grid-cols-3">{[['A 12-month partnership','Not a subscription you forget you’re paying for.'],['Implementation & migration, scoped to you','Not a flat fee that ignores how messy your data actually is.'],['Room to grow','Add what you need later, properly scoped, not bolted on.']].map(([title,body],i) => <article key={title} className="bg-background p-7"><span className="step-number">0{i+1}</span><h3 className="mt-8 font-display text-xl font-bold">{title}.</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{body}</p></article>)}</div>
    </div></section>

    <section className="section-space"><div className="site-container grid gap-12 lg:grid-cols-[.65fr_1.35fr]"><SectionHeading eyebrow="FAQ" title="Straight answers."/><Accordion type="single" collapsible className="border-t border-border">{[['How long does this take?','Depends on your data and your team. You’ll get a real timeline on the Discovery call, not a guess now.'],['What does it run on?','Browser, for the office. A dedicated app, for the field. Apple and Android.'],['How is this different from generic job software?','It’s built around how fire and security businesses actually quote, schedule and prove compliance.'],['We already pay for Simpro, Uptick or Out On Site. Why bother?','Because paying for software and using it properly are two different things. If you’re still running half your workflow through spreadsheets, that’s the gap we close.'],['How does pricing actually work?','Per user, plus a one-off setup and migration fee. Real numbers come after a Discovery call, because your business isn’t generic, and neither is your quote.']].map(([q,a],i) => <AccordionItem value={`item-${i}`} key={q}><AccordionTrigger className="py-6 text-left text-base">{q}</AccordionTrigger><AccordionContent className="max-w-2xl pb-6 leading-7 text-muted-foreground">{a}</AccordionContent></AccordionItem>)}</Accordion></div></section>
    <DiscoveryCta />
  </>;
}