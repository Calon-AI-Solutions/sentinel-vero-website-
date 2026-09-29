import { Link } from "@tanstack/react-router";
import { ArrowRight, Linkedin } from "lucide-react";
import { type ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { openCookieSettings } from "@/lib/consent";
import { isSet, settings } from "@/lib/content";

export function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <span className="inline-flex items-center gap-3" aria-label="Sentinel Vero">
      <span className="control-mark" aria-hidden="true">
        <i />
      </span>
      {!compact && (
        <span className="font-display text-[0.72rem] leading-[0.88rem] font-semibold uppercase">
          Sentinel
          <br />
          <strong className="font-extrabold">Vero</strong>
        </span>
      )}
    </span>
  );
}

const navItems = [
  { to: "/platform" as const, label: "Features" },
  { to: "/custom-build" as const, label: "Custom Build" },
  { to: "/proof" as const, label: "Our partners" },
];

const supportHref = "mailto:hello@sentinelvero.com?subject=Customer%20support";

const legalLink = "vh-focus hover:text-primary";

// Profiles render only once their URL in content/settings.json is real.
const socialLinks = [
  { href: settings.social.linkedin, label: "Vero on LinkedIn", Icon: Linkedin },
].filter((s) => isSet(s.href));

export function SiteFooter() {
  return (
    <footer className="print-hide border-t border-border bg-foreground text-background">
      <div className="site-container grid gap-10 py-12 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <BrandMark />
          <p className="mt-5 max-w-sm text-sm text-background/65">
            Operational truth, made visible for fire and security contractors.
          </p>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-background/70">
          {navItems.map((item) => (
            <Link key={item.to} to={item.to} className="hover:text-primary">
              {item.label}
            </Link>
          ))}
          <Link to="/about" hash="story" className="hover:text-primary">
            Our story
          </Link>
          <a href={supportHref} className="hover:text-primary">
            Customer support
          </a>
        </div>
      </div>
      <div className="site-container flex flex-col gap-4 border-t border-background/15 py-5 text-sm text-background/70 md:flex-row md:items-center md:justify-between">
        <nav aria-label="Legal" className="flex flex-wrap gap-x-6 gap-y-3">
          <Link to="/site-map" className={legalLink}>
            Site map
          </Link>
          <Link to="/legal" className={legalLink}>
            Legal
          </Link>
          <Link to="/legal/$slug" params={{ slug: "privacy" }} className={legalLink}>
            Privacy
          </Link>
          <Link to="/legal/$slug" params={{ slug: "cookies" }} className={legalLink}>
            Cookies
          </Link>
          <Link to="/security" className={legalLink}>
            Security
          </Link>
          {isSet(settings.developerCentreUrl) && (
            <a href={settings.developerCentreUrl} className={legalLink}>
              Developer centre
            </a>
          )}
          <button
            type="button"
            onClick={openCookieSettings}
            className={`${legalLink} cursor-pointer`}
          >
            Cookie settings
          </button>
        </nav>
        {socialLinks.length > 0 && (
          <div className="flex gap-2">
            {socialLinks.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="vh-focus grid size-9 place-items-center rounded-md hover:text-primary"
              >
                <Icon aria-hidden="true" className="size-5" />
              </a>
            ))}
          </div>
        )}
      </div>
      <div className="site-container flex flex-col gap-2 border-t border-background/15 py-5 text-xs text-background/65 sm:flex-row sm:justify-between">
        <span>
          © {__BUILD_YEAR__} Calon AI Solutions Ltd. Registered in England and Wales, company number
          15984397.
        </span>
        <span>See the leaks. Fix the system.</span>
      </div>
    </footer>
  );
}

export function PageIntro({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="page-intro">
      <div className="site-container relative z-10 py-20 md:py-28">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-5 max-w-4xl text-balance font-display text-5xl font-semibold leading-[0.98] md:text-7xl">
          {title}
        </h1>
        <div className="mt-7 max-w-2xl text-lg leading-8 text-foreground/70">{children}</div>
      </div>
    </section>
  );
}

export function DiscoveryCta({
  title = "Has your business outgrown the systems running it?",
}: {
  title?: string;
}) {
  return (
    <section className="bg-primary text-primary-foreground">
      <div className="site-container grid gap-8 py-16 md:grid-cols-[1fr_auto] md:items-end md:py-20">
        <div>
          <p className="eyebrow text-primary-foreground/65">A clearer operation starts here</p>
          <h2 className="mt-4 max-w-3xl font-display text-4xl font-semibold leading-tight md:text-5xl">
            {title}
          </h2>
          <p className="mt-5 max-w-2xl text-primary-foreground/75">
            Let’s map how the operation actually works, find where it’s leaking, and find out
            honestly whether we’re the right fit.
          </p>
        </div>
        <Button asChild variant="inverse" size="xl">
          <a href="mailto:hello@sentinelvero.com?subject=Book%20a%20Discovery">
            Book a Discovery <ArrowRight />
          </a>
        </Button>
      </div>
    </section>
  );
}
