declare const process: { env: Record<string, string | undefined> };
import { getAuthUserId } from "@convex-dev/auth/server";
import { ConvexError, v } from "convex/values";
import { mutation, query, internalMutation } from "./_generated/server";
import { checkFacts, checkTurns, voiceBrief, voiceFact, voiceTurn } from "./voiceFields";

export const setup=query({args:{},returns:v.object({ready:v.boolean(),message:v.string()}),handler:async()=>{
 const configured=!!process.env.SARVAM_API_KEY,privacy=process.env.SARVAM_ZERO_RETENTION_CONFIRMED==="true",enabled=process.env.SARVAM_VOICE_TEST_ENABLED==="true";
 return {ready:configured&&privacy&&enabled,message:!configured?"Voice setup is waiting for your Sarvam key. No paid voice session is enabled.":!privacy?"Confirm No retention for Model APIs in Sarvam before voice testing. No audio has been sent.":!enabled?"Sarvam is configured. Voice testing is paused until the test spending allowance is approved.":"Ready for a bounded voice test."};
}});
// No text or audio in this table: only expiring capabilities and usage counters.
export const newSession=mutation({args:{tokenHash:v.string()},returns:v.id("voiceSessions"),handler:async(ctx,{tokenHash})=>{
 if(!process.env.SARVAM_API_KEY)throw new ConvexError("Voice setup is waiting for your Sarvam key.");
 if(process.env.SARVAM_ZERO_RETENTION_CONFIRMED!=="true")throw new ConvexError("Confirm No retention for Sarvam Model APIs before starting voice.");
 if(process.env.SARVAM_VOICE_TEST_ENABLED!=="true") throw new ConvexError("Voice testing is paused. Your saved offers are still available.");
 if(!/^[a-f0-9]{64}$/.test(tokenHash))throw new ConvexError("Could not start a secure conversation.");
 const day=Math.floor(Date.now()/86400000),key="voice:sessions";
 const limit=await ctx.db.query("aiLimits").withIndex("by_key",q=>q.eq("key",key).eq("window",day)).unique();
 if((limit?.count??0)>=6)throw new ConvexError("Today's voice test limit is reached. No new paid session was started.");
 if(limit)await ctx.db.patch(limit._id,{count:limit.count+1});else await ctx.db.insert("aiLimits",{key,window:day,count:1});
 const prior=await ctx.db.query("voiceSessions").withIndex("by_token",q=>q.eq("tokenHash",tokenHash)).unique();
 if(prior)throw new ConvexError("Start a new conversation rather than retrying this start.");
 return ctx.db.insert("voiceSessions",{tokenHash,userId:await getAuthUserId(ctx),expiresAt:Date.now()+10*60000,attempts:0,busyUntil:0});
}});
export const reserve=internalMutation({args:{sessionId:v.id("voiceSessions"),tokenHash:v.string(),attempts:v.number()},returns:v.null(),handler:async(ctx,a)=>{
 const s=await ctx.db.get(a.sessionId),user=await getAuthUserId(ctx);
 if(!s || s.tokenHash!==a.tokenHash || (s.userId && s.userId!==user) || s.expiresAt<=Date.now())throw new ConvexError("This voice session has ended. Review the captured text.");
 if(!Number.isInteger(a.attempts) || a.attempts<1 || a.attempts>3)throw new ConvexError("Invalid voice request.");
 if(s.busyUntil>Date.now())throw new ConvexError("The previous voice turn is still processing. Wait before retrying.");
 if(s.attempts+a.attempts>48)throw new ConvexError("This conversation reached its test limit. Review what was captured.");
 const day=Math.floor(Date.now()/86400000),key="voice:attempts";
 const limit=await ctx.db.query("aiLimits").withIndex("by_key",q=>q.eq("key",key).eq("window",day)).unique();
 if((limit?.count??0)+a.attempts>120)throw new ConvexError("Today's voice test allowance is used. Take over and review the text.");
 if(limit)await ctx.db.patch(limit._id,{count:limit.count+a.attempts});else await ctx.db.insert("aiLimits",{key,window:day,count:a.attempts});
 await ctx.db.patch(s._id,{attempts:s.attempts+a.attempts,busyUntil:Date.now()+90000});return null;
}});
export const release=internalMutation({args:{sessionId:v.id("voiceSessions")},returns:v.null(),handler:async(ctx,{sessionId})=>{const s=await ctx.db.get(sessionId);if(s)await ctx.db.patch(sessionId,{busyUntil:0});return null;}});
function stable(value:unknown):string { if(Array.isArray(value))return "["+value.map(stable).join(",")+"]";if(value&&typeof value==="object")return "{"+Object.entries(value).sort(([a],[b])=>a.localeCompare(b)).map(([k,v])=>JSON.stringify(k)+":"+stable(v)).join(",")+"}";return JSON.stringify(value); }
const saved=v.object({_id:v.id("voiceOffers"),shop:v.string(),brief:voiceBrief,facts:v.array(voiceFact),turns:v.array(voiceTurn),reviewedKeys:v.array(v.string()),corrections:v.array(v.object({key:v.string(),value:v.string()})),createdAt:v.number(),updatedAt:v.number()});
export const current=query({args:{},returns:v.union(saved,v.null()),handler:async(ctx)=>{
 const userId=await getAuthUserId(ctx);if(!userId)return null;
 const o=await ctx.db.query("voiceOffers").withIndex("by_user",q=>q.eq("userId",userId)).unique();
 if(!o)return null;const {_creationTime,userId:_,requestId,...result}=o;return result;
}});
export const save=mutation({args:{requestId:v.string(),shop:v.string(),brief:voiceBrief,facts:v.array(voiceFact),turns:v.array(voiceTurn),reviewedKeys:v.array(v.string()),corrections:v.array(v.object({key:v.string(),value:v.string()}))},returns:v.id("voiceOffers"),handler:async(ctx,a)=>{
 const userId=await getAuthUserId(ctx);if(!userId)throw new ConvexError("Sign in to save your offer; your conversation draft is still on this device.");
 if(!/^[a-zA-Z0-9-]{16,80}$/.test(a.requestId) || !a.shop.trim() || a.shop.length>120 || !a.brief.item.trim() || a.brief.item.length>120 || a.brief.situation.length>3000 || (a.brief.budget!==null && (!Number.isFinite(a.brief.budget)||a.brief.budget<=0||a.brief.budget>100000000)))throw new ConvexError("Check the shop and brief before saving.");
 checkTurns(a.turns);checkFacts(a.facts,a.turns);
 if(!a.turns.some(t=>t.speaker==="shop"))throw new ConvexError("No shop response was captured. Do not save an enquiry as an offer.");
 if(a.reviewedKeys.length>4 || new Set(a.reviewedKeys).size!==a.reviewedKeys.length || a.reviewedKeys.some(k=>!["model","price","inclusions","extraCosts"].includes(k)||!a.facts.some(f=>f.key===k)))throw new ConvexError("Only displayed offer details can be confirmed.");
 if(a.corrections.length>4 || new Set(a.corrections.map(c=>c.key)).size!==a.corrections.length || a.corrections.some(c=>!["model","price","inclusions","extraCosts"].includes(c.key)||!c.value.trim()||c.value.length>1000))throw new ConvexError("Check the correction before saving.");
 const prior=await ctx.db.query("voiceOffers").withIndex("by_user",q=>q.eq("userId",userId)).unique();
 if(prior){if(prior.requestId!==a.requestId)throw new ConvexError("Your first shop offer is already saved. Reopen it; adding another shop belongs to the next milestone.");const {requestId,shop,brief,facts,turns,reviewedKeys,corrections}=prior;
 if(stable({requestId,shop,brief,facts,turns,reviewedKeys,corrections})!==stable({...a,shop:a.shop.trim()}))throw new ConvexError("This offer is already saved with different details. Reopen the saved version.");return prior._id;}
 const now=Date.now();return ctx.db.insert("voiceOffers",{...a,shop:a.shop.trim(),userId,createdAt:now,updatedAt:now});
}});
export const correct=mutation({args:{offerId:v.id("voiceOffers"),key:v.string(),value:v.string()},returns:v.null(),handler:async(ctx,a)=>{
 const userId=await getAuthUserId(ctx),offer=await ctx.db.get(a.offerId);
 if(!userId||!offer||offer.userId!==userId)throw new ConvexError("Sign in to the account that saved this offer.");
 if(!["model","price","inclusions","extraCosts"].includes(a.key)||!a.value.trim()||a.value.length>1000)throw new ConvexError("Check the correction before saving.");
 await ctx.db.patch(offer._id,{corrections:[...offer.corrections.filter(c=>c.key!==a.key),{key:a.key,value:a.value.trim()}],reviewedKeys:offer.reviewedKeys.filter(k=>k!==a.key),updatedAt:Math.max(Date.now(),offer.updatedAt+1)});return null;
}});
