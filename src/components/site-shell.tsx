import { Link } from "@tanstack/react-router";
import { ArrowRight, Menu, X } from "lucide-react";
import { useState, type ReactNode } from "react";

import { Button } from "@/components/ui/button";

export function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <span className="inline-flex items-center gap-3" aria-label="Sentinel Vero">
      <span className="control-mark" aria-hidden="true"><i /></span>
      {!compact && (
        <span className="font-display text-[0.72rem] leading-[0.88rem] font-semibold uppercase">
          Sentinel<br /><strong className="font-extrabold">Vero</strong>
        </span>
      )}
    </span>
  );
}

const navItems = [
  { to: "/platform" as const, label: "Platform" },
  { to: "/proof" as const, label: "Proof" },
  { to: "/about" as const, label: "About us" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/95 backdrop-blur">
      <div className="site-container flex h-[4.75rem] items-center justify-between gap-4">
        <Link to="/" className="text-foreground" aria-label="Sentinel Vero home"><BrandMark /></Link>
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Main navigation">
          {navItems.map((item) => (
            <Link key={item.to} to={item.to} activeProps={{ className: "text-primary" }} className="nav-link">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Button asChild variant="signal" size="lg"><a href="mailto:hello@sentinelvero.com?subject=Book%20a%20Discovery">Book a Discovery</a></Button>
          <Button variant="ghost" size="icon" className="lg:hidden" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(!open)}>
            {open ? <X /> : <Menu />}
          </Button>
        </div>
      </div>
      {open && (
        <nav className="site-container grid gap-1 border-t border-border py-3 lg:hidden" aria-label="Mobile navigation">
          {navItems.map((item) => (
            <Link key={item.to} to={item.to} onClick={() => setOpen(false)} className="rounded-md px-3 py-3 text-sm font-semibold hover:bg-secondary">
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-foreground text-background">
      <div className="site-container grid gap-10 py-12 md:grid-cols-[1fr_auto] md:items-end">
        <div><BrandMark /><p className="mt-5 max-w-sm text-sm text-background/65">Operational truth, made visible for fire and security contractors.</p></div>
        <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-background/70">
          {navItems.map((item) => <Link key={item.to} to={item.to} className="hover:text-primary">{item.label}</Link>)}
        </div>
      </div>
      <div className="site-container flex flex-col gap-2 border-t border-background/15 py-5 text-xs text-background/50 sm:flex-row sm:justify-between">
        <span>© 2026 Sentinel Vero</span><span>See the leaks. Fix the system.</span>
      </div>
    </footer>
  );
}

export function PageIntro({ eyebrow, title, children }: { eyebrow: string; title: string; children: ReactNode }) {
  return (
    <section className="page-intro">
      <div className="site-container relative z-10 py-20 md:py-28">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-5 max-w-4xl text-balance font-display text-5xl font-semibold leading-[0.98] md:text-7xl">{title}</h1>
        <div className="mt-7 max-w-2xl text-lg leading-8 text-foreground/70">{children}</div>
      </div>
    </section>
  );
}

export function DiscoveryCta({ title = "Has your business outgrown the systems running it?" }: { title?: string }) {
  return (
    <section className="bg-primary text-primary-foreground">
      <div className="site-container grid gap-8 py-16 md:grid-cols-[1fr_auto] md:items-end md:py-20">
        <div><p className="eyebrow text-primary-foreground/65">A clearer operation starts here</p><h2 className="mt-4 max-w-3xl font-display text-4xl font-semibold leading-tight md:text-5xl">{title}</h2><p className="mt-5 max-w-2xl text-primary-foreground/75">Let’s map how the operation actually works, find where it’s leaking, and find out honestly whether we’re the right fit.</p></div>
        <Button asChild variant="inverse" size="xl"><a href="mailto:hello@sentinelvero.com?subject=Book%20a%20Discovery">Book a Discovery <ArrowRight /></a></Button>
      </div>
    </section>
  );
}