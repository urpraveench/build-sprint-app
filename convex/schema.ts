import { defineSchema, defineTable } from "convex/server";
import { authTables } from "@convex-dev/auth/server";
import { v } from "convex/values";

export default defineSchema({
  ...authTables,
  waitlist: defineTable({
    email: v.string(),
  }).index("by_email", ["email"]),
  purchases: defineTable({
    userId: v.id("users"),
    item: v.string(),
    budget: v.number(),
    situation: v.string(),
    updatedAt: v.number(),
  }).index("by_user", ["userId"]),
});
