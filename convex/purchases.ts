import { getAuthUserId } from "@convex-dev/auth/server";
import { ConvexError, v } from "convex/values";
import { query, mutation } from "./_generated/server";

const details = { item: v.string(), budget: v.number(), situation: v.string() };
const purchase = v.object({
  _id: v.id("purchases"), _creationTime: v.number(), userId: v.id("users"),
  ...details, updatedAt: v.number(),
});

function validate(input: { item: string; budget: number; situation: string }) {
  const item = input.item.trim();
  const situation = input.situation.trim();
  if (!item || item.length > 120) throw new ConvexError("Enter an item up to 120 characters.");
  if (!Number.isFinite(input.budget) || input.budget <= 0 || input.budget > 100000000 || Math.abs(input.budget * 100 - Math.round(input.budget * 100)) > 0.00001) {
    throw new ConvexError("Enter a positive budget with at most two decimal places.");
  }
  if (!situation || situation.length > 3000) throw new ConvexError("Describe your situation in up to 3,000 characters.");
  return { item, budget: input.budget, situation };
}

export const current = query({
  args: {}, returns: v.union(purchase, v.null()),
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return null;
    return await ctx.db.query("purchases").withIndex("by_user", q => q.eq("userId", userId)).unique();
  },
});

export const save = mutation({
  args: details, returns: v.id("purchases"),
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new ConvexError("Sign in to save your purchase.");
    const values = validate(args);
    const existing = await ctx.db.query("purchases").withIndex("by_user", q => q.eq("userId", userId)).unique();
    if (existing) {
      await ctx.db.patch(existing._id, { ...values, updatedAt: Date.now() });
      return existing._id;
    }
    return await ctx.db.insert("purchases", { userId, ...values, updatedAt: Date.now() });
  },
});
