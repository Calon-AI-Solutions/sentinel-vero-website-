import { Link, useRouterState } from "@tanstack/react-router";
import { ChevronDown, Menu, X } from "lucide-react";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type FocusEvent,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";

import { demoHref } from "./demo-request-dialog";

// Pages that open on a dark hero. The header overlays these and stays transparent until scrolled.
const overlayPaths = new Set(["/", "/custom-build", "/platform", "/about"]);

const bookHref = "mailto:hello@sentinelvero.com?subject=Book%20a%20Discovery";

// Pages reached from the Resources menu, so its button shows as active on them.
const resourcePaths = ["/about", "/leak-report-2026", "/guides", "/blog", "/security"];

// Features and Resources are dropdown menus; these are the plain links between them.
const navItems = [
  { to: "/custom-build" as const, label: "Custom Build" },
  { to: "/proof" as const, label: "Our partners" },
];

type MenuLink = { title: string; description: string } & (
  | {
      to:
        "/about" | "/proof" | "/platform" | "/leak-report-2026" | "/guides" | "/blog" | "/security";
      hash?: string;
    }
  | { href: string }
);
type MenuColumn = { label: string; links: MenuLink[] };
type Featured = { eyebrow: string; title: string; cta: string; href: string };
type MenuKey = "features" | "resources";
type Menu = { key: MenuKey; label: string; columns: MenuColumn[]; featured: Featured };

// Hashes match the section ids on the Features page.
const featuresMenu: Menu = {
  key: "features",
  label: "Features",
  columns: [
    {
      label: "Operations",
      links: [
        {
          title: "Core operations",
          description: "CRM, jobs, scheduling, compliance",
          to: "/platform",
          hash: "core",
        },
        {
          title: "Field App",
          description: "Time, photos and notes on site",
          to: "/platform",
          hash: "field-app",
        },
        {
          title: "Time & Payroll",
          description: "Verified hours, straight to payroll",
          to: "/platform",
          hash: "payroll",
        },
      ],
    },
    {
      label: "AI",
      links: [
        {
          title: "AI Quoting",
          description: "Plans in, first draft out",
          to: "/platform",
          hash: "quoting",
        },
        {
          title: "AI Advisory",
          description: "Site findings become quotes",
          to: "/platform",
          hash: "advisory",
        },
        { title: "All features", description: "Every screen, enquiry to payroll", to: "/platform" },
      ],
    },
  ],
  featured: {
    eyebrow: "Discovery",
    title: "See how Vero would run your operation",
    cta: "Book a Discovery →",
    href: bookHref,
  },
};

const resourcesMenu: Menu = {
  key: "resources",
  label: "Resources",
  columns: [
    {
      label: "Learn",
      links: [
        {
          title: "Leak Report 2026",
          description: "Where contractors lose margin",
          to: "/leak-report-2026",
        },
        { title: "Guides", description: "Quoting, scheduling, payroll", to: "/guides" },
        { title: "Blog", description: "Notes from the field", to: "/blog" },
      ],
    },
    {
      label: "Company",
      links: [
        { title: "Case studies", description: "Real numbers from real firms", to: "/proof" },
        { title: "Security & compliance", description: "BAFE, NSI, GDPR", to: "/security" },
        { title: "About", description: "Who builds Vero", to: "/about" },
      ],
    },
  ],
  featured: {
    eyebrow: "Featured",
    title: "See Vero find £40k of unbilled work in 12 minutes",
    cta: "▶ Watch the demo",
    href: demoHref,
  },
};

function MenuAnchor({
  link,
  className,
  onNavigate,
  children,
}: {
  link: MenuLink;
  className: string;
  onNavigate: () => void;
  children: ReactNode;
}) {
  if ("to" in link)
    return (
      <Link
        to={link.to}
        {...(link.hash ? { hash: link.hash } : {})}
        className={className}
        onClick={onNavigate}
      >
        {children}
      </Link>
    );
  return (
    <a href={link.href} className={className} onClick={onNavigate}>
      {children}
    </a>
  );
}

function FeaturedCard({
  featured,
  onNavigate,
  compact = false,
}: {
  featured: Featured;
  onNavigate: () => void;
  compact?: boolean;
}) {
  return (
    <a
      href={featured.href}
      onClick={onNavigate}
      className={`vh-focus flex flex-col rounded-xl bg-mint text-ink transition-colors hover:bg-mint-hover ${compact ? "p-4" : "m-3 p-5"}`}
    >
      <span className="vh-eyebrow">{featured.eyebrow}</span>
      <span
        className={`mt-3 leading-[1.2] font-semibold ${compact ? "text-[19px]" : "text-[22px]"}`}
      >
        {featured.title}
      </span>
      <span className={`mt-auto text-[15px] font-semibold ${compact ? "pt-4" : "pt-6"}`}>
        {featured.cta}
      </span>
    </a>
  );
}

function HeaderLogo() {
  return (
    <Link
      to="/"
      className="vh-focus flex min-h-11 items-center gap-3 text-bone"
      aria-label="Sentinel Vero home"
    >
      <span aria-hidden="true" className="relative grid size-[26px] shrink-0 place-items-center">
        <span className="absolute inset-0 rotate-45 border-[1.5px] border-bone" />
        <span className="size-1.5 rounded-full bg-mint" />
      </span>
      <span className="text-[13px] leading-[1.15] font-semibold tracking-[.06em] max-[359px]:hidden">
        SENTINEL
        <br />
        VERO
      </span>
    </Link>
  );
}

function MegaMenu({
  menu,
  open,
  active,
  onOpen,
  onClose,
  onHoverOpen,
  onHoverLeave,
  isPinned,
}: {
  menu: Menu;
  open: boolean;
  active: boolean;
  onOpen: (pin: boolean) => void;
  onClose: () => void;
  onHoverOpen: () => void;
  onHoverLeave: () => void;
  isPinned: () => boolean;
}) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  const onBlur = (e: FocusEvent<HTMLDivElement>) => {
    if (open && !e.currentTarget.contains(e.relatedTarget as Node | null)) onClose();
  };
  const onClick = () => {
    // A click on a menu the mouse already opened keeps it open instead of toggling it shut.
    if (open && !isPinned()) onOpen(true);
    else if (open) onClose();
    else onOpen(true);
  };

  return (
    <div
      className="static"
      onPointerEnter={(e: ReactPointerEvent) => e.pointerType === "mouse" && onHoverOpen()}
      onPointerLeave={(e: ReactPointerEvent) => e.pointerType === "mouse" && onHoverLeave()}
      onBlur={onBlur}
    >
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={onClick}
        className="vh-focus vh-nav group flex min-h-11 cursor-pointer items-center"
        data-active={active || open ? "true" : undefined}
      >
        <span className="vh-nav-label inline-flex items-center gap-1.5">
          {menu.label}
          <ChevronDown
            aria-hidden="true"
            className={`size-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          />
        </span>
      </button>
      {open && (
        <div
          id={panelId}
          className="vh-panel absolute left-1/2 top-[calc(100%+12px)] grid w-[880px] max-w-[calc(100vw-2rem)] grid-cols-[1fr_1fr_250px] rounded-2xl border border-bone/12 bg-panel shadow-[0_30px_80px_rgba(0,0,0,.5)] min-[1100px]:grid-cols-[1fr_1fr_300px]"
        >
          {menu.columns.map((column, i) => (
            <div key={column.label} className={`p-3 ${i === 1 ? "border-l border-bone/8" : ""}`}>
              <p className="vh-eyebrow px-3 pt-3 pb-2 text-dim">{column.label}</p>
              <ul>
                {column.links.map((link) => (
                  <li key={link.title}>
                    <MenuAnchor
                      link={link}
                      onNavigate={onClose}
                      className="vh-focus block rounded-[10px] p-3 transition-colors hover:bg-bone/5"
                    >
                      <span className="block text-[15px] font-semibold text-bone">
                        {link.title}
                      </span>
                      <span className="mt-0.5 block text-[13px] text-muted-ink">
                        {link.description}
                      </span>
                    </MenuAnchor>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <FeaturedCard featured={menu.featured} onNavigate={onClose} />
        </div>
      )}
    </div>
  );
}

function MobileSheet({ id, onClose }: { id: string; onClose: () => void }) {
  const [expanded, setExpanded] = useState<MenuKey | null>(null);
  const itemClass =
    "vh-focus flex min-h-11 w-full items-center py-2 text-[28px] leading-tight font-medium text-bone";

  const accordion = (menu: Menu) => {
    const isOpen = expanded === menu.key;
    const panelId = `${id}-${menu.key}`;
    return (
      <div key={menu.key}>
        <button
          type="button"
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={() => setExpanded(isOpen ? null : menu.key)}
          className={`${itemClass} cursor-pointer justify-between text-left`}
        >
          {menu.label}
          <ChevronDown
            aria-hidden="true"
            className={`size-6 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          />
        </button>
        {isOpen && (
          <div id={panelId} className="grid gap-5 pt-2 pb-4">
            {menu.columns.map((column) => (
              <div key={column.label}>
                <p className="vh-eyebrow pb-1 text-dim">{column.label}</p>
                <ul>
                  {column.links.map((link) => (
                    <li key={link.title}>
                      <MenuAnchor
                        link={link}
                        onNavigate={onClose}
                        className="vh-focus block rounded-[10px] py-2.5"
                      >
                        <span className="block text-[17px] font-semibold text-bone">
                          {link.title}
                        </span>
                        <span className="block text-[13px] text-muted-ink">{link.description}</span>
                      </MenuAnchor>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <FeaturedCard featured={menu.featured} onNavigate={onClose} compact />
          </div>
        )}
      </div>
    );
  };

  return (
    <div
      id={id}
      className="fixed inset-0 z-40 flex flex-col overflow-y-auto overscroll-contain bg-surface pt-[96px] min-[900px]:hidden"
    >
      <nav aria-label="Mobile navigation" className="flex flex-col gap-1 px-6">
        {accordion(featuresMenu)}
        {navItems.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            onClick={onClose}
            className={itemClass}
            activeProps={{ className: "text-mint" }}
          >
            {item.label}
          </Link>
        ))}
        {accordion(resourcesMenu)}
      </nav>
      {/* Kept in view at the bottom even when an accordion makes the sheet scroll. */}
      <div className="sticky bottom-0 mt-auto grid gap-2 border-t border-bone/8 bg-surface px-6 pt-4 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
        <a
          href={demoHref}
          onClick={onClose}
          className="vh-focus vh-ghost flex h-11 items-center justify-center rounded-[10px] text-[15px] font-medium"
        >
          Watch demo
        </a>
        <a
          href={bookHref}
          className="vh-focus flex h-11 items-center justify-center rounded-[10px] bg-mint text-[15px] font-semibold text-ink transition-colors hover:bg-mint-hover"
        >
          Book a Discovery →
        </a>
      </div>
    </div>
  );
}

export function SiteHeader() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const overlay = overlayPaths.has(pathname);
  const [scrolled, setScrolled] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<MenuKey | null>(null);
  const pinned = useRef(false);
  const closeTimer = useRef<number | undefined>(undefined);
  const navRef = useRef<HTMLElement>(null);
  const sheetId = useId();

  const closeMenu = useCallback(() => {
    pinned.current = false;
    setOpenMenu(null);
  }, []);

  useEffect(() => {
    if (!openMenu) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!navRef.current?.contains(e.target as Node)) closeMenu();
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [openMenu, closeMenu]);

  useEffect(() => () => window.clearTimeout(closeTimer.current), []);

  const menuProps = (menu: Menu, active: boolean) => ({
    menu,
    active,
    open: openMenu === menu.key,
    onClose: closeMenu,
    onOpen: (pin: boolean) => {
      pinned.current = pin;
      setOpenMenu(menu.key);
    },
    onHoverOpen: () => {
      window.clearTimeout(closeTimer.current);
      if (openMenu !== menu.key) pinned.current = false;
      setOpenMenu(menu.key);
    },
    onHoverLeave: () => {
      if (pinned.current) return;
      // A short delay lets the pointer cross the gap between the button and the panel.
      closeTimer.current = window.setTimeout(() => setOpenMenu(null), 150);
    },
    isPinned: () => pinned.current,
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setSheetOpen(false);
    closeMenu();
  }, [pathname, closeMenu]);

  useEffect(() => {
    if (!sheetOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSheetOpen(false);
    };
    const wide = window.matchMedia("(min-width: 900px)");
    const onWide = () => {
      if (wide.matches) setSheetOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    wide.addEventListener("change", onWide);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKeyDown);
      wide.removeEventListener("change", onWide);
    };
  }, [sheetOpen]);

  const solid = scrolled || sheetOpen;

  return (
    <header
      className={`vh-header sticky top-0 z-50 font-ui ${overlay ? "-mb-[84px]" : "bg-surface"}`}
      data-scrolled={solid ? "true" : undefined}
      data-sheet={sheetOpen ? "true" : undefined}
    >
      <div className="relative z-50 flex h-[84px] items-center justify-between gap-6 px-5 min-[900px]:px-8 min-[1180px]:px-14">
        <HeaderLogo />
        <nav
          ref={navRef}
          aria-label="Main navigation"
          className="hidden items-center gap-7 min-[900px]:flex min-[1180px]:gap-10"
        >
          <MegaMenu {...menuProps(featuresMenu, pathname === "/platform")} />
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="vh-focus vh-nav flex min-h-11 items-center"
              activeProps={{ "data-active": "true", "aria-current": "page" }}
            >
              <span className="vh-nav-label">{item.label}</span>
            </Link>
          ))}
          <MegaMenu
            {...menuProps(
              resourcesMenu,
              resourcePaths.some((p) => pathname.startsWith(p)),
            )}
          />
        </nav>
        <div className="flex items-center gap-2">
          <a
            href={demoHref}
            className="vh-focus vh-ghost hidden h-11 items-center rounded-[10px] px-5 text-[15px] font-medium whitespace-nowrap min-[1080px]:inline-flex"
          >
            Watch demo
          </a>
          <a
            href={bookHref}
            className="vh-focus inline-flex h-11 items-center rounded-[10px] bg-mint px-4 whitespace-nowrap text-[14px] font-semibold text-ink transition-colors hover:bg-mint-hover min-[900px]:px-5 min-[900px]:text-[15px]"
          >
            Book a Discovery
            <span aria-hidden="true" className="ml-1.5 hidden min-[900px]:inline">
              →
            </span>
          </a>
          <button
            type="button"
            className="vh-focus grid size-11 cursor-pointer place-items-center rounded-[10px] text-bone min-[900px]:hidden"
            aria-label={sheetOpen ? "Close menu" : "Open menu"}
            aria-expanded={sheetOpen}
            aria-controls={sheetId}
            onClick={() => setSheetOpen(!sheetOpen)}
          >
            {sheetOpen ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </div>
      <div aria-hidden="true" className="vh-rule absolute inset-x-0 bottom-0 z-50 h-px" />
      {sheetOpen && <MobileSheet id={sheetId} onClose={() => setSheetOpen(false)} />}
    </header>
  );
}
