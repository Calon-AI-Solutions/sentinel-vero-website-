import * as DialogPrimitive from "@radix-ui/react-dialog";
import { useServerFn } from "@tanstack/react-start";
import { ArrowRight, Check, Play, X } from "lucide-react";
import { useEffect, useRef, useState, type FormEvent } from "react";

import {
  demoErrors,
  demoLink,
  demoRequestSchema,
  submitDemoRequest,
  turnstileSiteKey,
} from "@/lib/demo-request";

/** Any link to this hash opens the Watch the demo form instead of jumping. */
export const demoHref = "#watch-demo";

type Status = "idle" | "sending" | "sent" | "saved" | "error";

type Turnstile = {
  render: (el: HTMLElement, options: Record<string, unknown>) => string;
  reset: (id: string) => void;
  remove: (id: string) => void;
};
declare global {
  interface Window {
    turnstile?: Turnstile;
  }
}

let turnstileScript: Promise<Turnstile> | undefined;
function loadTurnstile() {
  turnstileScript ??= new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
    script.async = true;
    script.onload = () => (window.turnstile ? resolve(window.turnstile) : reject());
    script.onerror = () => {
      turnstileScript = undefined;
      reject(new Error("Turnstile failed to load"));
    };
    document.head.appendChild(script);
  });
  return turnstileScript;
}

/** Cloudflare Turnstile bot check. It adds a hidden cf-turnstile-response field to the form. */
function TurnstileWidget({ resetKey }: { resetKey: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const widget = useRef<string | undefined>(undefined);
  useEffect(() => {
    if (!turnstileSiteKey) return;
    let cancelled = false;
    loadTurnstile()
      .then((turnstile) => {
        if (cancelled || !ref.current) return;
        widget.current = turnstile.render(ref.current, {
          sitekey: turnstileSiteKey,
          theme: "dark",
          size: "flexible",
        });
      })
      .catch((error: unknown) => console.error(error));
    return () => {
      cancelled = true;
      if (widget.current) window.turnstile?.remove(widget.current);
      widget.current = undefined;
    };
  }, []);
  useEffect(() => {
    if (resetKey && widget.current) window.turnstile?.reset(widget.current);
  }, [resetKey]);
  if (!turnstileSiteKey) return null;
  return <div ref={ref} className="min-h-[65px]" />;
}
type Errors = Partial<Record<"name" | "email" | "company", string | undefined>>;

const fieldClass =
  "vh-focus mt-1.5 h-11 w-full rounded-[10px] border border-bone/15 bg-ink px-3.5 text-[15px] text-bone placeholder:text-dim focus:border-mint/60 focus:outline-none";
const labelClass = "vh-eyebrow text-muted-ink";

export function DemoRequestDialog() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  // A Turnstile token works once, so the widget is reset after every failed attempt.
  const [attempt, setAttempt] = useState(0);
  const submit = useServerFn(submitDemoRequest);

  useEffect(() => {
    const openFromHash = () => {
      if (window.location.hash !== demoHref) return;
      setOpen(true);
      // Drop the hash so the same link opens the form again after it is closed.
      history.replaceState(null, "", window.location.pathname + window.location.search);
    };
    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest?.(`a[href="${demoHref}"]`);
      if (!link || event.defaultPrevented || event.metaKey || event.ctrlKey) return;
      event.preventDefault();
      setOpen(true);
    };
    openFromHash();
    window.addEventListener("hashchange", openFromHash);
    document.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("hashchange", openFromHash);
      document.removeEventListener("click", onClick);
    };
  }, []);

  const onOpenChange = (next: boolean) => {
    setOpen(next);
    if (!next && status !== "sending") {
      setStatus("idle");
      setErrors({});
    }
  };

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const values = Object.fromEntries(new FormData(event.currentTarget)) as Record<string, string>;
    values["page"] = window.location.pathname;
    const parsed = demoRequestSchema.safeParse(values);
    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;
      setErrors({
        name: fieldErrors.name?.[0],
        email: fieldErrors.email?.[0],
        company: fieldErrors.company?.[0],
      });
      return;
    }
    setErrors({});
    setEmail(parsed.data.email);
    setStatus("sending");
    try {
      const result = await submit({ data: parsed.data });
      setStatus(result.emailed ? "sent" : "saved");
    } catch (error) {
      console.error(error);
      const message = error instanceof Error ? error.message : "";
      setErrorMessage(
        message === demoErrors.bot
          ? "We couldn’t confirm you’re not a bot. Please complete the check above and try again."
          : message === demoErrors.rateLimited
            ? "We’ve had a few requests from you already. Please wait a few minutes, or email"
            : "Something went wrong sending your demo. Please try again, or email",
      );
      setStatus("error");
      setAttempt((n) => n + 1);
    }
  }

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-[60] bg-ink/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in-0" />
        <DialogPrimitive.Content className="fixed top-1/2 left-1/2 z-[61] max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-[480px] -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-2xl border border-bone/10 bg-surface p-6 text-bone shadow-2xl focus:outline-none data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 sm:p-8">
          <DialogPrimitive.Close className="vh-focus absolute top-4 right-4 rounded-md p-1 text-muted-ink transition-colors hover:text-bone">
            <X className="size-5" />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>

          {status === "saved" ? (
            <div className="text-center">
              <span className="mx-auto flex size-12 items-center justify-center rounded-full bg-mint/15 text-mint">
                <Check className="size-6" />
              </span>
              <DialogPrimitive.Title className="mt-5 font-display text-2xl font-semibold">
                Thanks, we’ve got your details
              </DialogPrimitive.Title>
              <DialogPrimitive.Description className="mt-3 text-[15px] leading-7 text-muted-ink">
                We’ll send the demo to <span className="text-bone">{email}</span> shortly.
              </DialogPrimitive.Description>
            </div>
          ) : status === "sent" ? (
            <div className="text-center">
              <span className="mx-auto flex size-12 items-center justify-center rounded-full bg-mint/15 text-mint">
                <Check className="size-6" />
              </span>
              <DialogPrimitive.Title className="mt-5 font-display text-2xl font-semibold">
                Check your inbox
              </DialogPrimitive.Title>
              <DialogPrimitive.Description className="mt-3 text-[15px] leading-7 text-muted-ink">
                We’ve sent the demo to <span className="text-bone">{email}</span>.
                {demoLink
                  ? " You can also watch it right now."
                  : " The video is nearly ready, and the link will land in your inbox as soon as it’s live."}
              </DialogPrimitive.Description>
              {demoLink && (
                <a
                  href={demoLink}
                  target="_blank"
                  rel="noreferrer"
                  className="vh-focus mt-6 inline-flex h-12 items-center gap-2 rounded-[10px] bg-mint px-6 font-semibold text-ink transition-colors hover:bg-mint-hover"
                >
                  <Play className="size-4 fill-current" /> Watch the demo
                </a>
              )}
            </div>
          ) : (
            <>
              <p className="vh-eyebrow text-mint">Watch the demo</p>
              <DialogPrimitive.Title className="mt-3 font-display text-2xl leading-tight font-semibold">
                See Vero find £40k of unbilled work in 12 minutes
              </DialogPrimitive.Title>
              <DialogPrimitive.Description className="mt-3 text-[15px] leading-7 text-muted-ink">
                Tell us where to send it and the demo lands in your inbox straight away.
              </DialogPrimitive.Description>

              <form noValidate onSubmit={onSubmit} className="mt-6 grid gap-4">
                <Field label="Full name" name="name" autoComplete="name" error={errors.name} />
                <Field
                  label="Work email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  error={errors.email}
                />
                <Field
                  label="Company"
                  name="company"
                  autoComplete="organization"
                  error={errors.company}
                />
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Phone (optional)" name="phone" type="tel" autoComplete="tel" />
                  <label className="block">
                    <span className={labelClass}>Team size (optional)</span>
                    <select name="teamSize" defaultValue="" className={fieldClass}>
                      <option value="">Choose</option>
                      <option>1 to 10</option>
                      <option>11 to 50</option>
                      <option>51 to 200</option>
                      <option>200+</option>
                    </select>
                  </label>
                </div>
                {/* Honeypot for bots; hidden from people and screen readers. */}
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="absolute -left-[9999px] h-0 w-0 opacity-0"
                />

                <TurnstileWidget resetKey={attempt} />

                {status === "error" && (
                  <p
                    role="alert"
                    className="rounded-[10px] border border-red-400/30 bg-red-400/10 px-3.5 py-2.5 text-sm text-red-200"
                  >
                    {errorMessage}
                    {errorMessage.endsWith("email") && (
                      <>
                        {" "}
                        <a className="underline" href="mailto:hello@sentinelvero.com">
                          hello@sentinelvero.com
                        </a>
                        .
                      </>
                    )}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="vh-focus mt-1 inline-flex h-12 items-center justify-center gap-2 rounded-[10px] bg-mint px-6 font-semibold text-ink transition-colors hover:bg-mint-hover disabled:opacity-60"
                >
                  {status === "sending" ? "Sending…" : "Send me the demo"}
                  {status !== "sending" && <ArrowRight className="size-4" />}
                </button>
                <p className="text-center text-xs text-dim">
                  We’ll only use your details to send the demo and follow up about Vero.
                </p>
              </form>
            </>
          )}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

function Field({
  label,
  name,
  type = "text",
  autoComplete,
  error,
}: {
  label: string;
  name: string;
  type?: string;
  autoComplete?: string | undefined;
  error?: string | undefined;
}) {
  return (
    <label className="block">
      <span className={labelClass}>{label}</span>
      <input
        name={name}
        type={type}
        autoComplete={autoComplete}
        aria-invalid={!!error}
        className={`${fieldClass} ${error ? "border-red-400/60" : ""}`}
      />
      {error && <span className="mt-1 block text-xs text-red-300">{error}</span>}
    </label>
  );
}
