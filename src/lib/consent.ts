import { settings, type OptionalCookieCategory } from "@/lib/content";

// Cookie consent under UK PECR: nothing beyond strictly necessary storage is set, and no
// analytics or marketing script loads, until the visitor opts in to that category.

export const CONSENT_COOKIE = "vero_consent";
/** Bump when the categories or their purposes change, so every visitor is asked again. */
export const CONSENT_VERSION = 1;
const SIX_MONTHS_SECONDS = 60 * 60 * 24 * 182;

export type Consent = { v: number } & Record<OptionalCookieCategory, boolean>;

export const categoriesInUse = settings.optionalCookieCategories;

export const categoryInfo: Record<OptionalCookieCategory, { label: string; description: string }> =
  {
    analytics: {
      label: "Analytics",
      description:
        "Tell us which pages are visited and how people move around the site, so we can improve it.",
    },
    marketing: {
      label: "Marketing",
      description: "Help us measure whether our advertising works.",
    },
  };

/**
 * Third-party scripts, each gated behind the category it needs. When a tool is added, list it
 * here and add its category to `optionalCookieCategories` in content/settings.json.
 */
export const consentScripts: { category: OptionalCookieCategory; src: string }[] = [];

export function readConsent(): Consent | null {
  const raw = document.cookie
    .split("; ")
    .find((c) => c.startsWith(`${CONSENT_COOKIE}=`))
    ?.slice(CONSENT_COOKIE.length + 1);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(decodeURIComponent(raw)) as Partial<Consent>;
    if (parsed.v !== CONSENT_VERSION) return null;
    return { v: CONSENT_VERSION, analytics: !!parsed.analytics, marketing: !!parsed.marketing };
  } catch {
    return null;
  }
}

function writeConsent(consent: Consent) {
  const secure = location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${CONSENT_COOKIE}=${encodeURIComponent(JSON.stringify(consent))}; Max-Age=${SIX_MONTHS_SECONDS}; Path=/; SameSite=Lax${secure}`;
}

type State = { consent: Consent | null; panelOpen: boolean; ready: boolean };

let state: State = { consent: null, panelOpen: false, ready: false };
const listeners = new Set<() => void>();
const setState = (next: Partial<State>) => {
  state = { ...state, ...next };
  listeners.forEach((l) => l());
};

export const consentStore = {
  subscribe: (listener: () => void) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
  getSnapshot: () => state,
  getServerSnapshot: () => state,
};

/** Called once on the client, after hydration, so server and client render the same markup. */
export const initConsent = () => setState({ consent: readConsent(), ready: true });

export const openCookieSettings = () => setState({ panelOpen: true });
export const closeCookieSettings = () => setState({ panelOpen: false });

export function saveConsent(choice: Record<OptionalCookieCategory, boolean>) {
  const previous = state.consent;
  const consent: Consent = { v: CONSENT_VERSION, ...choice };
  writeConsent(consent);
  setState({ consent, panelOpen: false });
  // A script that already ran cannot be unloaded, so withdrawing consent reloads the page.
  const withdrawn = previous && categoriesInUse.some((c) => previous[c] && !consent[c]);
  if (withdrawn) location.reload();
}

const allCategories = (value: boolean) => ({
  analytics: value && categoriesInUse.includes("analytics"),
  marketing: value && categoriesInUse.includes("marketing"),
});
export const acceptAll = () => saveConsent(allCategories(true));
export const rejectAll = () => saveConsent(allCategories(false));

export function loadConsentedScripts(consent: Consent) {
  for (const { category, src } of consentScripts) {
    if (!consent[category] || document.querySelector(`script[src="${src}"]`)) continue;
    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    document.head.appendChild(script);
  }
}
