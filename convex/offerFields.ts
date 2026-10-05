import { v } from "convex/values";
export const textFields = ["brand", "model", "specifications", "inclusions", "warranty", "installation", "service", "availability", "quoteDate", "validUntil"] as const;
export const fields = {
  brand: v.string(), model: v.string(), specifications: v.string(), inclusions: v.string(),
  warranty: v.string(), installation: v.string(), service: v.string(), availability: v.string(),
  quoteDate: v.string(), validUntil: v.string(), price: v.union(v.number(), v.null()),
  installationCost: v.union(v.number(), v.null()), deliveryCost: v.union(v.number(), v.null()),
  otherCost: v.union(v.number(), v.null()),
  fit: v.union(v.literal("yes"), v.literal("no"), v.literal("unknown")), fitReasons: v.string(),
};
export const offerDetails = v.object(fields);
export type Details = {
  [K in typeof textFields[number]]: string;
} & { price: number | null; installationCost: number | null; deliveryCost: number | null; otherCost: number | null; fit: "yes" | "no" | "unknown"; fitReasons: string };
export function validateDetails(d: Details) {
  for (const key of textFields) {
    if (d[key].length > 2000) throw new Error("Keep each detail under 2,000 characters.");
    d[key] = d[key].trim() || "Not provided";
  }
  for (const k of ["price", "installationCost", "deliveryCost", "otherCost"] as const) {
    const n = d[k];
    if (n !== null && (!Number.isFinite(n) || n < 0 || n > 100000000 || Math.abs(n * 100 - Math.round(n * 100)) > 0.00001)) throw new Error("Enter valid rupee amounts with at most two decimal places.");
  }
  for (const key of ["quoteDate", "validUntil"] as const) {
    const s = d[key];
    if (!["Not provided", "Needs checking"].includes(s) && (!/^\d{4}-\d{2}-\d{2}$/.test(s) || !Number.isFinite(new Date(s).getTime()) || new Date(s).toISOString().slice(0, 10) !== s)) throw new Error("Use YYYY-MM-DD for quote dates, or mark them unknown.");
  }
  if (d.quoteDate !== "Not provided" && /^\d/.test(d.quoteDate) && d.quoteDate > new Date().toISOString().slice(0,10)) throw new Error("Quote date cannot be in the future.");
  if (/^\d/.test(d.quoteDate) && /^\d/.test(d.validUntil) && d.validUntil < d.quoteDate) throw new Error("Validity cannot end before the quote date.");
  if (d.fitReasons.length > 2000 || (d.fit !== "unknown" && !d.fitReasons.trim())) throw new Error("Explain your fit assessment against your needs.");
  return d;
}
export function compare(budget: number, offers: { slot: number; details: Details }[]) {
  return offers.map(o => {
    const d = o.details;
    const costs = [d.price, d.installationCost, d.deliveryCost, d.otherCost];
    const total = costs.every(n => n !== null) ? costs.reduce<number>((sum, n) => sum + Math.round((n ?? 0) * 100), 0) / 100 : null;
    const gaps: string[] = [];
    for (const k of ["brand", "model", "specifications", "inclusions", "warranty", "installation", "service", "availability", "quoteDate", "validUntil"] as const) if (["Not provided", "Needs checking"].includes(d[k])) gaps.push(k);
    if (total === null) gaps.push("complete total cost");
    if (d.fit === "unknown") gaps.push("fit against your needs");
    if (/^\d/.test(d.validUntil) && d.validUntil < new Date().toISOString().slice(0,10)) gaps.push("expired quote; check current price and availability");
    const overBudget = total !== null ? total > budget : d.price !== null && d.price > budget;
    return { slot: o.slot, total, gaps, fit: overBudget || d.fit === "no" ? "Does not fit your stated needs" : gaps.length ? "Fit needs checking" : "Fits your stated needs", reason: overBudget ? "Known costs exceed your budget." : d.fitReasons || "Check the product against your stated needs.", finalRecommendationBlocked: gaps.length > 0 };
  });
}
export const comparisonRow = v.object({ slot: v.number(), total: v.union(v.number(), v.null()), gaps: v.array(v.string()), fit: v.string(), reason: v.string(), finalRecommendationBlocked: v.boolean() });

export const offerSnapshot = v.object({ slot: v.number(), shop: v.string(), details: offerDetails, confirmedAt: v.number(), captureId: v.id("captures") });
