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

// Pages that open on a dark hero. The header overlays these and stays transparent until scrolled.
const overlayPaths = new Set(["/", "/custom-build"]);

const bookHref = "mailto:hello@sentinelvero.com?subject=Book%20a%20Discovery";
// Placeholder until the demo video and resource pages exist.
const placeholderHref = "#";
const demoHref = placeholderHref;

const navItems = [
  { to: "/platform" as const, label: "Features" },
  { to: "/custom-build" as const, label: "Custom Build" },
  { to: "/proof" as const, label: "Proof" },
];

type ResourceLink = { title: string; description: string } & (
  { to: "/about" | "/proof" } | { href: string }
);

const resourceColumns: Array<{ label: string; links: ResourceLink[] }> = [
  {
    label: "Learn",
    links: [
      {
        title: "Leak Report 2026",
        description: "Where contractors lose margin",
        href: placeholderHref,
      },
      { title: "Guides", description: "Quoting, scheduling, payroll", href: placeholderHref },
      { title: "Blog", description: "Notes from the field", href: placeholderHref },
    ],
  },
  {
    label: "Company",
    links: [
      { title: "Case studies", description: "Real numbers from real firms", to: "/proof" },
      { title: "Security & compliance", description: "BAFE, NSI, GDPR", href: placeholderHref },
      { title: "About", description: "Who builds Vero", to: "/about" },
    ],
  },
];

function ResourceAnchor({
  link,
  className,
  onNavigate,
  children,
}: {
  link: ResourceLink;
  className: string;
  onNavigate: () => void;
  children: ReactNode;
}) {
  if ("to" in link)
    return (
      <Link to={link.to} className={className} onClick={onNavigate}>
        {children}
      </Link>
    );
  return (
    <a href={link.href} className={className} onClick={onNavigate}>
      {children}
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
      <span className="text-[13px] leading-[1.15] font-semibold tracking-[.06em]">
        SENTINEL
        <br />
        VERO
      </span>
    </Link>
  );
}

function ResourcesMenu({ active }: { active: boolean }) {
  const [open, setOpen] = useState(false);
  const pinned = useRef(false);
  const closeTimer = useRef<number | undefined>(undefined);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();

  const close = useCallback(() => {
    pinned.current = false;
    setOpen(false);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!wrapperRef.current?.contains(e.target as Node)) close();
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, close]);

  useEffect(() => () => window.clearTimeout(closeTimer.current), []);

  const onPointerEnter = (e: ReactPointerEvent) => {
    if (e.pointerType !== "mouse") return;
    window.clearTimeout(closeTimer.current);
    setOpen(true);
  };
  const onPointerLeave = (e: ReactPointerEvent) => {
    if (e.pointerType !== "mouse" || pinned.current) return;
    // A short delay lets the pointer cross the gap between the button and the panel.
    closeTimer.current = window.setTimeout(() => setOpen(false), 150);
  };
  const onBlur = (e: FocusEvent<HTMLDivElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node | null)) close();
  };
  const onClick = () => {
    // A click on a menu the mouse already opened keeps it open instead of toggling it shut.
    if (open && !pinned.current) {
      pinned.current = true;
      return;
    }
    if (open) close();
    else {
      pinned.current = true;
      setOpen(true);
    }
  };

  return (
    <div
      ref={wrapperRef}
      className="static"
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
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
          Resources
          <ChevronDown
            aria-hidden="true"
            className={`size-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          />
        </span>
      </button>
      {open && (
        <div
          id={panelId}
          className="vh-panel absolute left-1/2 top-[calc(100%+12px)] grid w-[880px] max-w-[calc(100vw-2rem)] grid-cols-[1fr_1fr_300px] rounded-2xl border border-bone/12 bg-panel shadow-[0_30px_80px_rgba(0,0,0,.5)]"
        >
          {resourceColumns.map((column, i) => (
            <div key={column.label} className={`p-3 ${i === 1 ? "border-l border-bone/8" : ""}`}>
              <p className="vh-eyebrow px-3 pt-3 pb-2 text-dim">{column.label}</p>
              <ul>
                {column.links.map((link) => (
                  <li key={link.title}>
                    <ResourceAnchor
                      link={link}
                      onNavigate={close}
                      className="vh-focus block rounded-[10px] p-3 transition-colors hover:bg-bone/5"
                    >
                      <span className="block text-[15px] font-semibold text-bone">
                        {link.title}
                      </span>
                      <span className="mt-0.5 block text-[13px] text-muted-ink">
                        {link.description}
                      </span>
                    </ResourceAnchor>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <a
            href={demoHref}
            onClick={close}
            className="vh-focus m-3 flex flex-col rounded-xl bg-mint p-5 text-ink transition-colors hover:bg-mint-hover"
          >
            <span className="vh-eyebrow">Featured</span>
            <span className="mt-3 text-[22px] leading-[1.2] font-semibold">
              See Vero find £40k of unbilled work in 12 minutes
            </span>
            <span className="mt-auto pt-6 text-[15px] font-semibold">▶ Watch the demo</span>
          </a>
        </div>
      )}
    </div>
  );
}

function MobileSheet({ id, onClose }: { id: string; onClose: () => void }) {
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const itemClass =
    "vh-focus flex min-h-11 items-center py-2 text-[28px] leading-tight font-medium text-bone";
  return (
    <div
      id={id}
      className="fixed inset-0 z-40 flex flex-col overflow-y-auto bg-surface px-6 pt-[108px] pb-8 min-[900px]:hidden"
    >
      <nav aria-label="Mobile navigation" className="flex flex-col gap-2">
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
        <button
          type="button"
          aria-expanded={resourcesOpen}
          onClick={() => setResourcesOpen(!resourcesOpen)}
          className={`${itemClass} cursor-pointer justify-between text-left`}
        >
          Resources
          <ChevronDown
            aria-hidden="true"
            className={`size-6 transition-transform duration-200 ${resourcesOpen ? "rotate-180" : ""}`}
          />
        </button>
        {resourcesOpen && (
          <div className="grid gap-6 pb-2 pl-1">
            {resourceColumns.map((column) => (
              <div key={column.label}>
                <p className="vh-eyebrow pb-1 text-dim">{column.label}</p>
                <ul>
                  {column.links.map((link) => (
                    <li key={link.title}>
                      <ResourceAnchor
                        link={link}
                        onNavigate={onClose}
                        className="vh-focus block rounded-[10px] py-2.5"
                      >
                        <span className="block text-[17px] font-semibold text-bone">
                          {link.title}
                        </span>
                        <span className="block text-[13px] text-muted-ink">{link.description}</span>
                      </ResourceAnchor>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </nav>
      <div className="mt-auto grid gap-2 pt-10">
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
  const sheetId = useId();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setSheetOpen(false);
  }, [pathname]);

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
  const resourcesActive = pathname === "/about";

  return (
    <header
      className={`vh-header sticky top-0 z-50 font-ui ${overlay ? "-mb-[84px]" : "bg-surface"}`}
      data-scrolled={solid ? "true" : undefined}
      data-sheet={sheetOpen ? "true" : undefined}
    >
      <div className="relative z-50 flex h-[84px] items-center justify-between gap-6 px-5 min-[900px]:px-8 min-[1180px]:px-14">
        <HeaderLogo />
        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-7 min-[900px]:flex min-[1180px]:gap-10"
        >
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
          <ResourcesMenu active={resourcesActive} />
        </nav>
        <div className="flex items-center gap-2">
          <a
            href={demoHref}
            className="vh-focus vh-ghost hidden h-11 items-center rounded-[10px] px-5 text-[15px] font-medium min-[900px]:inline-flex"
          >
            Watch demo
          </a>
          <a
            href={bookHref}
            className="vh-focus inline-flex h-11 items-center rounded-[10px] bg-mint px-4 text-[14px] font-semibold text-ink transition-colors hover:bg-mint-hover min-[900px]:px-5 min-[900px]:text-[15px]"
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
