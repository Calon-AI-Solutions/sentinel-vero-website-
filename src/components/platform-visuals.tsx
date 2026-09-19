import { Check, Sparkles } from "lucide-react";

export function DashboardVisual() {
  return (
    <div className="dashboard-shell" aria-label="Sentinel Vero operational dashboard preview">
      <div className="flex items-center justify-between border-b border-border p-4"><span className="text-xs font-bold uppercase text-muted-foreground">Operations overview</span><span className="status-pill"><i /> Live</span></div>
      <div className="grid grid-cols-2 gap-px bg-border md:grid-cols-4">
        {[['24','Enquiries'],['56','Live jobs'],['28','Overdue'],['£126k','Pipeline']].map(([value,label]) => <div key={label} className="bg-card p-4"><strong className="font-mono text-xl">{value}</strong><p className="mt-1 text-xs text-muted-foreground">{label}</p></div>)}
      </div>
      <div className="grid gap-3 p-4 md:grid-cols-[1.3fr_.7fr]">
        <div className="rounded-md border border-border p-4"><p className="text-xs font-bold uppercase text-muted-foreground">Requires attention</p>{['Quote awaiting review','Site service overdue','Engineer hours ready'].map((label, index) => <div key={label} className="mt-3 flex items-center justify-between border-t border-border pt-3 text-sm"><span>{label}</span><span className={index === 2 ? 'status-pill' : 'review-pill'}>{index === 2 ? 'Verified' : 'Review'}</span></div>)}</div>
        <div className="rounded-md bg-foreground p-4 text-background"><Sparkles className="text-primary"/><p className="mt-8 text-xs uppercase text-background/55">AI advisory</p><p className="mt-2 text-sm font-semibold">3 recommendations are ready to become quotes.</p></div>
      </div>
    </div>
  );
}

export function FieldVisual() {
  return <div className="phone-shell"><div className="phone-top"/><p className="eyebrow mt-5">Job 1048</p><h3 className="mt-2 font-display text-xl font-semibold">Fire alarm service</h3><p className="mt-1 text-sm text-muted-foreground">Apex House · Level 2</p><div className="mt-6 space-y-3">{['Arrived on site','Evidence captured','Customer sign-off'].map((item) => <div key={item} className="flex items-center gap-3 rounded-md border border-border p-3 text-sm"><span className="grid size-6 place-items-center rounded-full bg-primary text-primary-foreground"><Check className="size-3.5"/></span>{item}</div>)}</div><button className="mt-6 w-full rounded-md bg-primary p-3 text-sm font-bold text-primary-foreground">Complete job</button></div>;
}