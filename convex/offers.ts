import { getAuthUserId } from "@convex-dev/auth/server";
import { ConvexError, v } from "convex/values";
import { query, mutation, internalQuery, internalMutation } from "./_generated/server";
import { offerDetails, compare, comparisonRow, validateDetails, offerSnapshot } from "./offerFields";
import type { MutationCtx, QueryCtx } from "./_generated/server";
async function owned(ctx: QueryCtx | MutationCtx) {
  const userId = await getAuthUserId(ctx);
  if (!userId) throw new ConvexError("Sign in to save shop information.");
  const purchase = await ctx.db.query("purchases").withIndex("by_user", q => q.eq("userId", userId)).unique();
  if (!purchase) throw new ConvexError("Save your needs and budget first.");
  return { userId, purchase };
}
const slotCheck = (slot: number) => { if (![1,2].includes(slot)) throw new ConvexError("This milestone supports two shop offers."); };
export const saveSource = mutation({
  args: { slot: v.number(), notes: v.string() }, returns: v.id("captures"),
  handler: async (ctx, args) => {
    const {userId, purchase} = await owned(ctx); slotCheck(args.slot);
    if (args.notes.length > 6000) throw new ConvexError("Keep notes under 6,000 characters.");
    const capture = await ctx.db.query("captures").withIndex("by_purchase", q => q.eq("purchaseId",purchase._id).eq("slot",args.slot)).unique();
    if (capture) {
      if (capture.notes !== args.notes) throw new ConvexError("Original notes are preserved. Correct the captured details below instead.");
      return capture._id;
    }
    return await ctx.db.insert("captures", { userId, purchaseId: purchase._id, ...args, updatedAt: Date.now() });
  }
});
const attachmentView = v.object({ _id: v.id("attachments"), name: v.string(), url: v.union(v.string(),v.null()) });
const captureView = v.object({ _id: v.id("captures"), slot: v.number(), notes: v.string(), attachments: v.array(attachmentView) });
const offerView = v.object({ _id: v.id("offers"), slot: v.number(), shop: v.string(), details: offerDetails, confirmedAt: v.number(), captureId: v.id("captures") });
export const current = query({ args: {}, returns: v.object({ captures: v.array(captureView), offers: v.array(offerView), comparison: v.union(v.object({rows: v.array(comparisonRow), offers: v.array(offerSnapshot), budget: v.number(), item: v.string(), updatedAt: v.number(), stale: v.boolean()}),v.null()) }), handler: async ctx => {
  const {purchase} = await owned(ctx);
  const captures = await ctx.db.query("captures").withIndex("by_purchase",q => q.eq("purchaseId",purchase._id)).take(2);
  const offers = await ctx.db.query("offers").withIndex("by_purchase",q => q.eq("purchaseId",purchase._id)).take(2);
  const comparison = await ctx.db.query("comparisons").withIndex("by_purchase",q => q.eq("purchaseId",purchase._id)).unique();
  return { captures: await Promise.all(captures.map(async c => ({ _id:c._id,slot:c.slot,notes:c.notes,attachments:await Promise.all((await ctx.db.query("attachments").withIndex("by_capture",q=>q.eq("captureId",c._id)).take(2)).map(async a=>({_id:a._id,name:a.name,url:await ctx.storage.getUrl(a.storageId)}))) }))), offers:offers.map(({_id,slot,shop,details,confirmedAt,captureId})=>({_id,slot,shop,details,confirmedAt,captureId})), comparison:comparison ? {rows:comparison.rows,offers:comparison.offerSnapshot ?? offers.map(({slot,shop,details,confirmedAt,captureId})=>({slot,shop,details,confirmedAt,captureId})),budget:comparison.budgetSnapshot ?? purchase.budget,item:comparison.itemSnapshot ?? purchase.item,updatedAt:comparison.updatedAt,stale:!comparison.offerSnapshot || comparison.needsUpdatedAt !== purchase.updatedAt || comparison.offerSnapshot?.some(s=>offers.find(o=>o.slot===s.slot)?.confirmedAt!==s.confirmedAt) || comparison.offerSnapshot?.length!==offers.length} : null };
} });
export const confirm = mutation({ args:{slot:v.number(),shop:v.string(),captureId:v.id("captures"),details:offerDetails},returns:v.id("offers"),handler:async(ctx,args)=>{
  const {userId,purchase}=await owned(ctx); slotCheck(args.slot);
  if (!args.shop.trim() || args.shop.length>120) throw new ConvexError("Enter a shop name under 120 characters.");
  const capture = await ctx.db.get(args.captureId);
  if (!capture || capture.userId!==userId || capture.purchaseId!==purchase._id || capture.slot!==args.slot) throw new ConvexError("This source is not part of your offer.");
  const files=await ctx.db.query("attachments").withIndex("by_capture",q=>q.eq("captureId",capture._id)).take(1);
  if (!capture.notes.trim() && !files.length) throw new ConvexError("Add an original note or photo before confirming.");
  let details;
  try { details=validateDetails(args.details); } catch(e) { throw new ConvexError((e as Error).message); }
  const existing = await ctx.db.query("offers").withIndex("by_purchase",q=>q.eq("purchaseId",purchase._id).eq("slot",args.slot)).unique();
  const values={...args,shop:args.shop.trim(),details,userId,purchaseId:purchase._id,confirmedAt:Math.max(Date.now(),(existing?.confirmedAt ?? 0)+1)};
  if(existing){await ctx.db.patch(existing._id,values);return existing._id;}
  return await ctx.db.insert("offers",values);
} });
export const updateComparison = mutation({args:{},returns:v.null(),handler:async ctx=>{
  const {userId,purchase}=await owned(ctx);
  const offers=await ctx.db.query("offers").withIndex("by_purchase",q=>q.eq("purchaseId",purchase._id)).take(2);
  if(offers.length<2)throw new ConvexError("Add and confirm two shop offers first.");
  const values={userId,purchaseId:purchase._id,rows:compare(purchase.budget,offers),offerSnapshot:offers.map(({slot,shop,details,confirmedAt,captureId})=>({slot,shop,details,confirmedAt,captureId})),budgetSnapshot:purchase.budget,itemSnapshot:purchase.item,updatedAt:Date.now(),needsUpdatedAt:purchase.updatedAt,offersUpdatedAt:Math.max(...offers.map(o=>o.confirmedAt))};
  const old=await ctx.db.query("comparisons").withIndex("by_purchase",q=>q.eq("purchaseId",purchase._id)).unique();
  if(old)await ctx.db.patch(old._id,values);else await ctx.db.insert("comparisons",values);
  return null;
} });
export const sourceForAction=internalQuery({args:{captureId:v.id("captures")},returns:v.object({userId:v.id("users"),notes:v.string(),images:v.array(v.string())}),handler:async(ctx,args)=>{
  const {userId}=await owned(ctx);const c=await ctx.db.get(args.captureId);
  if(!c || c.userId!==userId)throw new ConvexError("Could not open your source.");
  const attachments=await ctx.db.query("attachments").withIndex("by_capture",q=>q.eq("captureId",c._id)).take(2);
  return {userId,notes:c.notes,images:(await Promise.all(attachments.map(a=>ctx.storage.getUrl(a.processingId)))).filter((x):x is string=>x!==null)};
} });
export const reserveAI=internalMutation({args:{},returns:v.null(),handler:async ctx=>{
  const {userId}=await owned(ctx);const window=Math.floor(Date.now()/3600000);
  for(const [key,limit] of [["global",100],[String(userId),10]] as const){
    const row=await ctx.db.query("aiLimits").withIndex("by_key",q=>q.eq("key",key).eq("window",window)).unique();
    if(row && row.count>=limit)throw new ConvexError("Busy right now. Try again in a few minutes.");
    if(row)await ctx.db.patch(row._id,{count:row.count+1});else await ctx.db.insert("aiLimits",{key,window,count:1});
  }return null;
} });
export const attach=internalMutation({args:{captureId:v.id("captures"),storageId:v.id("_storage"),processingId:v.id("_storage"),name:v.string(),requestId:v.string()},returns:v.id("attachments"),handler:async(ctx,args)=>{
 const {userId}=await owned(ctx);const c=await ctx.db.get(args.captureId);
 if(!c || c.userId!==userId)throw new ConvexError("Could not open your source.");
 const old=await ctx.db.query("attachments").withIndex("by_request",q=>q.eq("userId",userId).eq("requestId",args.requestId)).unique();
 if(old){if(old.captureId!==args.captureId)throw new ConvexError("This upload retry belongs to another shop.");await ctx.storage.delete(args.storageId);await ctx.storage.delete(args.processingId);return old._id;}
 const files=await ctx.db.query("attachments").withIndex("by_capture",q=>q.eq("captureId",c._id)).take(2);
 if(files.length>=2)throw new ConvexError("Use up to two photos per shop.");
 return await ctx.db.insert("attachments",{...args,userId});
} });
