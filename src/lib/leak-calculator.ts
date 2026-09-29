export type LeakInputKey =
  | "turnover"
  | "engineers"
  | "engRate"
  | "quotesPerWeek"
  | "contracts"
  | "contractValue"
  | "adminRate"
  | "estRate"
  | "materialsShare"
  | "markup"
  | "priceDrift"
  | "unverifiedMins"
  | "overMiles"
  | "mileRate"
  | "runsPerWeek"
  | "runHours"
  | "runMiles"
  | "visitsPerWeek"
  | "typeMins"
  | "voiceMins"
  | "rewriteShare"
  | "rewriteMins"
  | "quoteHours"
  | "quoteRecover"
  | "idleMins"
  | "oohPerWeek"
  | "oohUnbilled"
  | "oohCharge"
  | "lapseRate"
  | "installs"
  | "convertUplift";

export type LeakInputs = Record<LeakInputKey, number>;

export type LeakField = { key: LeakInputKey; label: string; default: number; percent?: boolean };

export const quickFields: LeakField[] = [
  { key: "turnover", label: "Annual turnover (£)", default: 3000000 },
  { key: "engineers", label: "Field engineers", default: 15 },
  { key: "engRate", label: "Engineer cost per hour, including on-costs (£)", default: 28 },
  { key: "quotesPerWeek", label: "Quotes sent per week", default: 12 },
  { key: "contracts", label: "Active service contracts", default: 200 },
  { key: "contractValue", label: "Average contract value per year (£)", default: 900 },
];

export const assumptionFields: LeakField[] = [
  { key: "adminRate", label: "Office admin cost per hour (£)", default: 17 },
  { key: "estRate", label: "Estimator cost per hour (£)", default: 25 },
  { key: "materialsShare", label: "Materials share of turnover (%)", default: 35, percent: true },
  { key: "markup", label: "Average materials markup (%)", default: 30, percent: true },
  { key: "priceDrift", label: "Supplier price rises not passed on (%)", default: 3, percent: true },
  { key: "unverifiedMins", label: "Unverified time per engineer per day (minutes)", default: 20 },
  { key: "overMiles", label: "Over-claimed miles per engineer per week", default: 10 },
  { key: "mileRate", label: "Mileage rate (£ per mile)", default: 0.45 },
  { key: "runsPerWeek", label: "Unplanned wholesaler runs per engineer per week", default: 1 },
  { key: "runHours", label: "Hours per wholesaler run", default: 1.5 },
  { key: "runMiles", label: "Miles per wholesaler run", default: 15 },
  { key: "visitsPerWeek", label: "Service visits per engineer per week", default: 8 },
  { key: "typeMins", label: "Minutes to type a report on a phone", default: 10 },
  { key: "voiceMins", label: "Minutes with voice capture", default: 3 },
  { key: "rewriteShare", label: "Reports rewritten by the office (%)", default: 30, percent: true },
  { key: "rewriteMins", label: "Minutes per rewrite", default: 10 },
  { key: "quoteHours", label: "Hours per quote", default: 2.5 },
  { key: "quoteRecover", label: "Quote time that could be saved (%)", default: 50, percent: true },
  {
    key: "idleMins",
    label: "Avoidable travel or idle time per engineer per day (minutes)",
    default: 20,
  },
  { key: "oohPerWeek", label: "Out of hours callouts per week", default: 4 },
  { key: "oohUnbilled", label: "Out of hours callouts not billed (%)", default: 10, percent: true },
  { key: "oohCharge", label: "Average out of hours charge (£)", default: 180 },
  {
    key: "lapseRate",
    label: "Contracts lost through missed renewal (%)",
    default: 8,
    percent: true,
  },
  { key: "installs", label: "Installs completed per year", default: 60 },
  {
    key: "convertUplift",
    label: "Extra installs that could become contracts (%)",
    default: 20,
    percent: true,
  },
];

export const allFields = [...quickFields, ...assumptionFields];

export const defaultInputs = Object.fromEntries(
  allFields.map((f) => [f.key, f.default]),
) as LeakInputs;

const WEEKS = 46;
const DAYS = 230;
const OOH_WEEKS = 52;

export type LeakId = "L1" | "L2" | "L3" | "L4" | "L5" | "L6" | "L7" | "L8" | "L9";
export type LeakGroup = "margin" | "hours" | "revenue";

export const leakNames: Record<LeakId, string> = {
  L1: "Quotes priced from old supplier sheets",
  L2: "Timesheets and mileage nobody can check",
  L3: "Unplanned runs to the wholesaler",
  L4: "Out of hours callouts never billed",
  L5: "Reports typed, then rewritten",
  L6: "Quotes built by copy and paste",
  L7: "Travel and idle time from manual scheduling",
  L8: "Service contracts that lapse",
  L9: "Installs that never become contracts",
};

export const groupNames: Record<LeakGroup, string> = {
  margin: "Margin you lose",
  hours: "Hours you lose",
  revenue: "Revenue you never collect",
};

export type LeakResult = {
  leaks: Record<LeakId, number>;
  groups: Record<LeakGroup, number>;
  total: number;
  shareOfTurnover: number;
};

/** Percent inputs are whole numbers (35 = 35%); the formulas use them as decimals. */
export function computeLeaks(inputs: LeakInputs): LeakResult {
  const i = inputs;
  const pct = (v: number) => v / 100;

  const materialsCost = (i.turnover * pct(i.materialsShare)) / (1 + pct(i.markup));
  const L1 = materialsCost * pct(i.priceDrift);
  const L2 =
    i.engineers * (i.unverifiedMins / 60) * DAYS * i.engRate +
    i.engineers * i.overMiles * WEEKS * i.mileRate;
  const L3 =
    i.engineers * i.runsPerWeek * WEEKS * (i.runHours * i.engRate + i.runMiles * i.mileRate);
  const L4 = i.oohPerWeek * OOH_WEEKS * pct(i.oohUnbilled) * i.oohCharge;

  const reports = i.engineers * i.visitsPerWeek;
  const L5 =
    reports * ((i.typeMins - i.voiceMins) / 60) * WEEKS * i.engRate +
    reports * pct(i.rewriteShare) * (i.rewriteMins / 60) * WEEKS * i.adminRate;
  const L6 = i.quotesPerWeek * i.quoteHours * pct(i.quoteRecover) * WEEKS * i.estRate;
  const L7 = i.engineers * (i.idleMins / 60) * DAYS * i.engRate;

  const L8 = i.contracts * pct(i.lapseRate) * i.contractValue;
  const L9 = i.installs * pct(i.convertUplift) * i.contractValue;

  const groups = { margin: L1 + L2 + L3 + L4, hours: L5 + L6 + L7, revenue: L8 + L9 };
  const total = groups.margin + groups.hours + groups.revenue;
  return {
    leaks: { L1, L2, L3, L4, L5, L6, L7, L8, L9 },
    groups,
    total,
    shareOfTurnover: i.turnover > 0 ? total / i.turnover : 0,
  };
}

export const leakGroupOf: Record<LeakId, LeakGroup> = {
  L1: "margin",
  L2: "margin",
  L3: "margin",
  L4: "margin",
  L5: "hours",
  L6: "hours",
  L7: "hours",
  L8: "revenue",
  L9: "revenue",
};

export type FieldIssue = "empty" | "negative" | "over100";

/** Parses a raw input value: empty becomes 0, negatives become 0, percentages cap at 100. */
export function parseField(raw: string, percent = false): { value: number; issue?: FieldIssue } {
  if (raw.trim() === "") return { value: 0, issue: "empty" };
  const n = Number(raw);
  if (!Number.isFinite(n)) return { value: 0, issue: "empty" };
  if (n < 0) return { value: 0, issue: "negative" };
  if (percent && n > 100) return { value: 100, issue: "over100" };
  return { value: n };
}

const gbp = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
  maximumFractionDigits: 0,
});

export const formatGBP = (n: number) => gbp.format(Math.round(n));
