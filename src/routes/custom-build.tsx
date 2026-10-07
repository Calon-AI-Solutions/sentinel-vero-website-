import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { BuildShowcase } from "@/components/build-showcase";
import { Button } from "@/components/ui/button";
import { DiscoveryCta } from "@/components/site-shell";
import { faqLd, pageHead } from "@/lib/seo";

export const Route = createFileRoute("/custom-build")({
  head: () =>
    pageHead({
      path: "/custom-build",
      title: "Custom Build for Fire & Security Firms | Sentinel Vero",
      description:
        "Sentinel Vero is configured and extended around how your fire and security business already works: forms, pricing, integrations, reporting and automation.",
      ogTitle: "Custom Build | Sentinel Vero",
      ogDescription: "Most platforms make you bend to fit them. We bend to fit you.",
      jsonLd: [faqLd(faqs)],
    }),
  component: CustomBuildPage,
});

const steps = [
  ["Discover", "We learn how you actually work."],
  ["Scope", "We agree exactly what gets built."],
  ["Build", "We configure and extend the platform."],
  ["Test", "Your team uses it before it goes live."],
  ["Launch", "Trained, tested, live."],
  ["Improve", "New features as your needs change."],
];

const faqs = [
  ["How long does a custom build take?", "It depends on scope. You’ll get a real timeline after the Discovery call, not a guess now."],
  ["What happens when our needs change?", "We keep building with you. Changes are scoped and added properly, not bolted on."],
  ["Will platform updates break our setup?", "No. Your configuration is part of the platform, so it’s carried forward with every update."],
  ["How is it priced?", "Every build is scoped after an Operational Discovery. No generic tiers, no published price list."],
];

function CustomBuildPage() {
  return <>
    <section className="hero-grid text-background">
      <div className="site-container flex flex-col items-center py-20 text-center md:py-28">
        <p className="eyebrow text-primary">Custom build</p>
        <h1 className="mt-5 max-w-4xl text-balance font-display text-5xl font-semibold leading-[0.98] md:text-7xl">Built around how you already work.</h1>
        <p className="mt-7 max-w-2xl text-lg leading-8 text-background/70">Most platforms make you bend to fit them. We configure and extend Sentinel Vero around your forms, your pricing and your workflows.</p>
        <Button asChild variant="signal" size="xl" className="mt-8"><a href="mailto:hello@sentinelvero.com?subject=Book%20a%20Discovery">Book a Discovery <ArrowRight /></a></Button>
      </div>
    </section>

    <BuildShowcase />

    <section className="section-space bg-secondary"><div className="site-container">
      <p className="eyebrow">How a custom build works</p>
      <h2 className="mt-4 font-display text-4xl font-semibold">We look before we build.</h2>
      <div className="mt-12 grid gap-px overflow-hidden rounded-md border border-border bg-border sm:grid-cols-3 lg:grid-cols-6">
        {steps.map(([title, body], i) => <div key={title} className="bg-background p-6"><span className="step-number">0{i + 1}</span><h3 className="mt-8 font-display text-lg font-bold">{title}.</h3><p className="mt-2 text-sm text-muted-foreground">{body}</p></div>)}
      </div>
    </div></section>

    <section className="section-space bg-foreground text-background"><div className="site-container grid gap-10 lg:grid-cols-[auto_1fr] lg:items-center">
      <img src="/testimonials/john-oconnell.webp" alt="John O’Connell" className="mx-auto size-40 rounded-md object-cover object-[50%_30%] lg:size-48" />
      <div>
        <p className="font-display text-2xl font-semibold leading-snug md:text-3xl">“My client looked at the big platforms, but this was built around how security companies actually work. It was set up quickly, the team listens, and new features arrive when we need them.”</p>
        <p className="mt-5 text-sm font-semibold">John O’Connell <span className="font-normal text-background/60">· Senior Security Partner, JOC Security Growth</span></p>
      </div>
    </div></section>

    <section className="section-space"><div className="site-container grid gap-12 lg:grid-cols-[.65fr_1.35fr]">
      <div><p className="eyebrow">FAQ</p><h2 className="mt-4 font-display text-4xl font-semibold">Straight answers.</h2></div>
      <Accordion type="single" collapsible className="border-t border-border">
        {faqs.map(([q, a], i) => <AccordionItem value={`item-${i}`} key={q}><AccordionTrigger className="py-6 text-left text-base">{q}</AccordionTrigger><AccordionContent className="max-w-2xl pb-6 leading-7 text-muted-foreground">{a}</AccordionContent></AccordionItem>)}
      </Accordion>
    </div></section>

    <DiscoveryCta title="Tell us how you work. We’ll show you what we’d build." />
  </>;
}
