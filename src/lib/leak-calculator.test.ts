import { describe, expect, test } from "bun:test";

import { computeLeaks, defaultInputs, formatGBP, parseField } from "./leak-calculator";

const within1 = (actual: number, expected: number) =>
  expect(Math.abs(actual - expected)).toBeLessThanOrEqual(1);

describe("computeLeaks with the model firm defaults", () => {
  const r = computeLeaks(defaultInputs);

  test.each([
    ["L1", 24231],
    ["L2", 35305],
    ["L3", 33638],
    ["L4", 3744],
    ["L5", 22724],
    ["L6", 17250],
    ["L7", 32200],
    ["L8", 14400],
    ["L9", 10800],
  ] as const)("%s", (id, expected) => within1(r.leaks[id], expected));

  test("group subtotals", () => {
    within1(r.groups.margin, 96917);
    within1(r.groups.hours, 72174);
    within1(r.groups.revenue, 25200);
  });

  test("total and share of turnover", () => {
    within1(r.total, 194291);
    expect((r.shareOfTurnover * 100).toFixed(1)).toBe("6.5");
  });
});

describe("parseField", () => {
  test("empty is zero with a message", () =>
    expect(parseField("")).toEqual({ value: 0, issue: "empty" }));
  test("negative is zero", () => expect(parseField("-5")).toEqual({ value: 0, issue: "negative" }));
  test("percentages cap at 100", () =>
    expect(parseField("140", true)).toEqual({ value: 100, issue: "over100" }));
  test("non-percentages above 100 pass", () => expect(parseField("140")).toEqual({ value: 140 }));
});

test("formats GBP without pence", () => expect(formatGBP(194291.4)).toBe("£194,291"));
