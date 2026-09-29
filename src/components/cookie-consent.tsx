import { Link } from "@tanstack/react-router";
import { useEffect, useState, useSyncExternalStore } from "react";

import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import {
  acceptAll,
  categoriesInUse,
  categoryInfo,
  closeCookieSettings,
  consentStore,
  initConsent,
  loadConsentedScripts,
  openCookieSettings,
  rejectAll,
  saveConsent,
  type Consent,
} from "@/lib/consent";
import type { OptionalCookieCategory } from "@/lib/content";

// All three choices share one style so Reject is exactly as easy to find as Accept.
const choiceButton =
  "vh-focus vh-ghost inline-flex h-11 flex-1 cursor-pointer items-center justify-center rounded-[10px] px-4 text-sm font-semibold whitespace-nowrap";

/** Banner on first visit plus the Manage choices dialog. Mounted once in the root layout. */
export function CookieConsent() {
  const { consent, panelOpen, ready } = useSyncExternalStore(
    consentStore.subscribe,
    consentStore.getSnapshot,
    consentStore.getServerSnapshot,
  );

  useEffect(initConsent, []);
  useEffect(() => {
    if (consent) loadConsentedScripts(consent);
  }, [consent]);

  // Strictly necessary cookies need no consent, so the banner only appears once the site
  // actually uses an optional category.
  const showBanner = ready && !consent && categoriesInUse.length > 0 && !panelOpen;

  return (
    <>
      {showBanner && (
        <section
          aria-label="Cookie choices"
          className="print-hide fixed inset-x-0 bottom-0 z-[60] p-3 font-ui md:p-5"
        >
          <div className="mx-auto flex max-w-4xl flex-col gap-4 rounded-2xl border border-bone/12 bg-panel p-5 text-bone shadow-[0_30px_80px_rgba(0,0,0,.5)] md:flex-row md:items-center md:gap-8">
            <p className="text-sm leading-6 text-muted-ink">
              We use strictly necessary cookies to run this site. With your permission we would also
              use {categoriesInUse.map((c) => categoryInfo[c].label.toLowerCase()).join(" and ")}{" "}
              cookies. Read our{" "}
              <Link
                to="/legal/$slug"
                params={{ slug: "cookies" }}
                className="vh-focus text-bone underline"
              >
                Cookie policy
              </Link>
              .
            </p>
            <div className="flex shrink-0 flex-wrap gap-2 md:w-[26rem]">
              <button type="button" className={choiceButton} onClick={acceptAll}>
                Accept all
              </button>
              <button type="button" className={choiceButton} onClick={rejectAll}>
                Reject all
              </button>
              <button type="button" className={choiceButton} onClick={openCookieSettings}>
                Manage choices
              </button>
            </div>
          </div>
        </section>
      )}
      <ChoicesDialog open={panelOpen} consent={consent} />
    </>
  );
}

function ChoicesDialog({ open, consent }: { open: boolean; consent: Consent | null }) {
  const [choice, setChoice] = useState<Record<OptionalCookieCategory, boolean>>({
    analytics: false,
    marketing: false,
  });

  // Start from the saved choice each time the dialog opens.
  useEffect(() => {
    if (open) setChoice({ analytics: !!consent?.analytics, marketing: !!consent?.marketing });
  }, [open, consent]);

  return (
    <Dialog open={open} onOpenChange={(o) => !o && closeCookieSettings()}>
      <DialogContent className="print-hide max-h-[calc(100dvh-2rem)] w-[calc(100vw-2rem)] max-w-lg overflow-y-auto rounded-2xl border-bone/12 bg-panel font-ui text-bone motion-reduce:animate-none sm:rounded-2xl">
        <DialogTitle className="font-display text-xl font-semibold">Cookie settings</DialogTitle>
        <DialogDescription className="text-sm leading-6 text-muted-ink">
          Choose which cookies we can use. You can change this at any time from the Cookie settings
          link in the footer.{" "}
          <Link
            to="/legal/$slug"
            params={{ slug: "cookies" }}
            onClick={closeCookieSettings}
            className="vh-focus text-bone underline"
          >
            Cookie policy
          </Link>
        </DialogDescription>

        <ul className="grid gap-3">
          <li className="flex items-start justify-between gap-4 rounded-xl border border-bone/10 p-4">
            <div>
              <p id="consent-necessary" className="text-sm font-semibold">
                Strictly necessary
              </p>
              <p className="mt-1 text-sm leading-6 text-muted-ink">
                Make the site work, keep it secure and remember your cookie choices. Always on.
              </p>
            </div>
            <Switch checked disabled aria-labelledby="consent-necessary" className="mt-0.5" />
          </li>
          {categoriesInUse.map((c) => (
            <li
              key={c}
              className="flex items-start justify-between gap-4 rounded-xl border border-bone/10 p-4"
            >
              <div>
                <p id={`consent-${c}`} className="text-sm font-semibold">
                  {categoryInfo[c].label}
                </p>
                <p className="mt-1 text-sm leading-6 text-muted-ink">
                  {categoryInfo[c].description}
                </p>
              </div>
              <Switch
                checked={choice[c]}
                onCheckedChange={(v) => setChoice((prev) => ({ ...prev, [c]: v }))}
                aria-labelledby={`consent-${c}`}
                className="mt-0.5 data-[state=unchecked]:bg-bone/20"
              />
            </li>
          ))}
        </ul>
        {categoriesInUse.length === 0 && (
          <p className="text-sm leading-6 text-muted-ink">
            This site does not currently use analytics or marketing cookies.
          </p>
        )}

        <div className="flex flex-wrap gap-2">
          {categoriesInUse.length > 0 ? (
            <>
              <button type="button" className={choiceButton} onClick={acceptAll}>
                Accept all
              </button>
              <button type="button" className={choiceButton} onClick={rejectAll}>
                Reject all
              </button>
              <button type="button" className={choiceButton} onClick={() => saveConsent(choice)}>
                Save choices
              </button>
            </>
          ) : (
            <button type="button" className={choiceButton} onClick={closeCookieSettings}>
              Done
            </button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
