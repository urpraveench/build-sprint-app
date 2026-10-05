import { defineSchema, defineTable } from "convex/server";
import { authTables } from "@convex-dev/auth/server";
import { v } from "convex/values";

import { voiceBrief, voiceFact, voiceTurn } from "./voiceFields";
import { offerDetails, comparisonRow, offerSnapshot } from "./offerFields";

export default defineSchema({
  ...authTables,
  voiceSessions: defineTable({ tokenHash: v.string(), userId: v.union(v.id("users"), v.null()), expiresAt: v.number(), attempts: v.number(), busyUntil: v.number() }).index("by_token", ["tokenHash"]),
  voiceOffers: defineTable({ userId: v.id("users"), requestId: v.string(), shop: v.string(), brief: voiceBrief, facts: v.array(voiceFact), turns: v.array(voiceTurn), reviewedKeys: v.array(v.string()), corrections: v.array(v.object({ key: v.string(), value: v.string() })), createdAt: v.number(), updatedAt: v.number() }).index("by_user", ["userId"]).index("by_request", ["userId", "requestId"]),
  waitlist: defineTable({
    email: v.string(),
  }).index("by_email", ["email"]),
  captures: defineTable({ userId: v.id("users"), purchaseId: v.id("purchases"), slot: v.number(), notes: v.string(), updatedAt: v.number() }).index("by_purchase", ["purchaseId", "slot"]),
  attachments: defineTable({ userId: v.id("users"), captureId: v.id("captures"), storageId: v.id("_storage"), processingId: v.id("_storage"), name: v.string(), requestId: v.string() }).index("by_capture", ["captureId"]).index("by_request", ["userId", "requestId"]),
  offers: defineTable({ userId: v.id("users"), purchaseId: v.id("purchases"), captureId: v.id("captures"), slot: v.number(), shop: v.string(), details: offerDetails, confirmedAt: v.number() }).index("by_purchase", ["purchaseId", "slot"]),
  comparisons: defineTable({ userId: v.id("users"), purchaseId: v.id("purchases"), rows: v.array(comparisonRow), offerSnapshot: v.optional(v.array(offerSnapshot)), budgetSnapshot: v.optional(v.number()), itemSnapshot: v.optional(v.string()), updatedAt: v.number(), needsUpdatedAt: v.number(), offersUpdatedAt: v.number() }).index("by_purchase", ["purchaseId"]),
  aiLimits: defineTable({ key: v.string(), window: v.number(), count: v.number() }).index("by_key", ["key", "window"]),
  purchases: defineTable({
    userId: v.id("users"),
    item: v.string(),
    budget: v.number(),
    situation: v.string(),
    updatedAt: v.number(),
  }).index("by_user", ["userId"]),
});
