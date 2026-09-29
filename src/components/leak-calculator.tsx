import { useId, useMemo, useState } from "react";

import {
  allFields,
  assumptionFields,
  computeLeaks,
  defaultInputs,
  formatGBP,
  groupNames,
  leakGroupOf,
  leakNames,
  parseField,
  quickFields,
  type FieldIssue,
  type LeakField,
  type LeakGroup,
  type LeakId,
  type LeakInputKey,
  type LeakInputs,
} from "@/lib/leak-calculator";

type Raw = Record<LeakInputKey, string>;

const defaultRaw = () =>
  Object.fromEntries(allFields.map((f) => [f.key, String(f.default)])) as Raw;

const issueText: Record<FieldIssue, string> = {
  empty: "Empty, counted as 0.",
  negative: "Cannot be negative, counted as 0.",
  over100: "Capped at 100%.",
};

const groupBar: Record<LeakGroup, string> = {
  margin: "bg-mint",
  hours: "bg-mint/60",
  revenue: "bg-mint/35",
};

function Field({
  field,
  raw,
  issue,
  onChange,
}: {
  field: LeakField;
  raw: string;
  issue: FieldIssue | undefined;
  onChange: (value: string) => void;
}) {
  const id = useId();
  const messageId = `${id}-msg`;
  return (
    <div>
      <label htmlFor={id} className="block text-sm leading-5 font-medium text-bone">
        {field.label}
      </label>
      <input
        id={id}
        type="number"
        inputMode="decimal"
        min={0}
        {...(field.percent ? { max: 100 } : {})}
        step="any"
        value={raw}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={issue ? true : undefined}
        aria-describedby={issue ? messageId : undefined}
        className="vh-focus mt-2 h-11 w-full rounded-[10px] border border-bone/15 bg-ink px-3 font-label text-[15px] text-bone [appearance:textfield] focus:border-mint focus:outline-none"
      />
      {issue && (
        <p id={messageId} className="mt-1.5 text-xs text-amber-200">
          {issueText[issue]}
        </p>
      )}
    </div>
  );
}

export function LeakCalculator() {
  const [raw, setRaw] = useState<Raw>(defaultRaw);
  const [showAll, setShowAll] = useState(false);
  const disclosureId = useId();

  const { inputs, issues } = useMemo(() => {
    const inputs = { ...defaultInputs };
    const issues: Partial<Record<LeakInputKey, FieldIssue>> = {};
    for (const f of allFields) {
      const parsed = parseField(raw[f.key], f.percent);
      inputs[f.key] = parsed.value;
      if (parsed.issue) issues[f.key] = parsed.issue;
    }
    return { inputs: inputs as LeakInputs, issues };
  }, [raw]);

  const result = useMemo(() => computeLeaks(inputs), [inputs]);
  const bars = (Object.keys(result.leaks) as LeakId[])
    .map((id) => ({ id, value: result.leaks[id] }))
    .sort((a, b) => b.value - a.value);
  const max = Math.max(...bars.map((b) => b.value), 1);

  const renderField = (f: LeakField) => (
    <Field
      key={f.key}
      field={f}
      raw={raw[f.key]}
      issue={issues[f.key]}
      onChange={(value) => setRaw((r) => ({ ...r, [f.key]: value }))}
    />
  );

  return (
    <section
      aria-labelledby={`${disclosureId}-title`}
      className="my-10 rounded-2xl border border-bone/10 bg-panel p-5 md:p-8"
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h3 id={`${disclosureId}-title`} className="font-display text-2xl font-semibold text-bone">
          Leak calculator
        </h3>
        <button
          type="button"
          onClick={() => setRaw(defaultRaw())}
          className="vh-focus vh-ghost inline-flex h-11 cursor-pointer items-center rounded-[10px] px-4 text-sm font-medium"
        >
          Reset to model firm
        </button>
      </div>
      <p className="mt-2 text-sm text-muted-ink">
        Runs in your browser. Nothing you enter is sent or stored.
      </p>

      <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,24rem)]">
        <div>
          <div className="grid gap-5 sm:grid-cols-2">{quickFields.map(renderField)}</div>
          <button
            type="button"
            aria-expanded={showAll}
            aria-controls={`${disclosureId}-all`}
            onClick={() => setShowAll(!showAll)}
            className="vh-focus mt-8 inline-flex min-h-11 cursor-pointer items-center gap-2 text-sm font-semibold text-mint"
          >
            {showAll ? "Hide all assumptions" : "Show all assumptions"}
            <span aria-hidden="true">{showAll ? "−" : "+"}</span>
          </button>
          {showAll && (
            <div
              id={`${disclosureId}-all`}
              className="mt-5 grid gap-5 border-t border-bone/10 pt-6 sm:grid-cols-2"
            >
              {assumptionFields.map(renderField)}
            </div>
          )}
        </div>

        <div className="lg:sticky lg:top-28 lg:self-start">
          <div aria-live="polite" className="rounded-xl border border-bone/10 bg-ink p-5">
            <dl className="grid gap-3">
              {(Object.keys(groupNames) as LeakGroup[]).map((g) => (
                <div key={g} className="flex items-baseline justify-between gap-4">
                  <dt className="text-sm text-muted-ink">{groupNames[g]}</dt>
                  <dd className="font-label text-base text-bone">{formatGBP(result.groups[g])}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-5 border-t border-bone/10 pt-5">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <p className="text-sm font-semibold text-bone">Total</p>
                <p className="vh-eyebrow text-[10px] text-muted-ink">
                  Modelled estimate, not a quote or audit
                </p>
              </div>
              <p className="mt-2 font-display text-4xl font-semibold text-mint">
                {formatGBP(result.total)}
              </p>
              <p className="mt-1 text-sm text-muted-ink">
                {(result.shareOfTurnover * 100).toFixed(1)}% of turnover
              </p>
            </div>
          </div>

          <h4 className="vh-eyebrow mt-6 mb-3 text-dim">Each leak, largest first</h4>
          <ul className="grid gap-3">
            {bars.map((b) => (
              <li key={b.id}>
                <div className="flex items-baseline justify-between gap-3 text-xs">
                  <span className="text-muted-ink">{leakNames[b.id]}</span>
                  <span className="shrink-0 font-label text-bone">{formatGBP(b.value)}</span>
                </div>
                <div className="mt-1 h-2 rounded-full bg-bone/8">
                  <div
                    className={`h-2 rounded-full ${groupBar[leakGroupOf[b.id]]}`}
                    style={{ width: `${(b.value / max) * 100}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
          <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-ink">
            {(Object.keys(groupNames) as LeakGroup[]).map((g) => (
              <li key={g} className="inline-flex items-center gap-1.5">
                <span aria-hidden="true" className={`size-2.5 rounded-full ${groupBar[g]}`} />
                {groupNames[g]}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
