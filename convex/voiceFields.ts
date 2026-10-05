import { ConvexError, v } from "convex/values";
export const language = v.union(v.literal("hi-IN"), v.literal("te-IN"));
export const voiceTurn = v.object({ speaker: v.union(v.literal("buyer"), v.literal("shop"), v.literal("assistant")), text: v.string(), at: v.number() });
export const voiceBrief = v.object({ item: v.string(), budget: v.union(v.number(), v.null()), situation: v.string() });
export const factKeys = ["model", "price", "inclusions", "extraCosts", "fit", "warranty", "validity"] as const;
export const voiceFact = v.object({ key: v.string(), value: v.string(), turn: v.number(), quote: v.string() });
export type Turn = { speaker: "buyer" | "shop" | "assistant"; text: string; at: number };
export type Fact = { key: string; value: string; turn: number; quote: string };
export function checkTurns(turns: Turn[]) {
  if (turns.length > 60 || turns.reduce((n,t)=>n+t.text.length,0)>24000 || turns.some(t=>!t.text.trim() || t.text.length>3000 || !Number.isFinite(t.at))) throw new ConvexError("This conversation is too long. End and review what was captured.");
}
export function checkFacts(facts: Fact[], turns: Turn[]) {
  if(facts.length>7 || new Set(facts.map(f=>f.key)).size!==facts.length) throw new ConvexError("Offer details need checking.");
  for(const f of facts) {
    const source=turns[f.turn];
    if(!factKeys.includes(f.key as any) || !source || source.speaker!=="shop" || !f.quote.trim() || f.quote.length>1000 || !source.text.includes(f.quote) || !f.value.trim() || f.value.length>1000 || !f.quote.includes(f.value)) throw new ConvexError("A captured detail does not match the conversation. Review the text and try again.");
  }
}
export const questions = {
  hi: {
    brief: "आप क्या खरीदना चाहते हैं, किस काम के लिए, और आपका बजट कितना है?",
    purpose: "आपके लिए इसमें सबसे ज़रूरी बात क्या है?",
    budget: "आपका बजट कितना है? यह बात सिर्फ़ आपके लिए रहेगी।",
    item: "आप कौन सा product खरीदना चाहते हैं?",
    model: "आप कौन सा exact model दे रहे हैं? उसका model number बता दीजिए।",
    price: "इस model की quoted price कितनी है?",
    inclusions: "इस price में क्या-क्या included है? Installation और delivery भी?",
    extraCosts: "Installation, delivery या किसी और चीज़ के extra charges कितने होंगे?",
    fit: "इस model की size और installation requirements क्या हैं?",
    warranty: "Warranty और local service में क्या मिलता है?",
    validity: "यह quote कब तक valid है, और product कब मिल सकता है?",
    unclear: "माफ़ कीजिए, यह बात साफ़ नहीं सुनाई दी। एक बार फिर बता देंगे?",
    handoff: "फैसला buyer का है। मैं deal accept या खरीदने का वादा नहीं कर सकता। अब buyer बात करेंगे।",
    intro: "नमस्ते, मैं इस buyer का AI buying assistant हूँ। मैं product और price के बारे में पूछूँगा। Conversation का text रखा जाएगा, audio recording नहीं रखी जाएगी। क्या आप बात करने के लिए तैयार हैं?",
  },
  te: {
    brief: "మీరు ఏ product కొనాలనుకుంటున్నారు, దేనికి వాడతారు, మీ budget ఎంత?",
    purpose: "ఈ product లో మీకు ముఖ్యంగా ఏది కావాలి?",
    budget: "మీ budget ఎంత? ఈ విషయం మీకు మాత్రమే కనిపిస్తుంది.",
    item: "మీరు ఏ product కొనాలనుకుంటున్నారు?",
    model: "మీరు offer చేస్తున్న exact model ఏది? Model number చెప్పగలరా?",
    price: "ఈ model quoted price ఎంత?",
    inclusions: "ఈ price లో ఏమేమి included? Installation, delivery కూడా ఉన్నాయా?",
    extraCosts: "Installation, delivery లేదా ఇతర extra charges ఎంత ఉంటాయి?",
    fit: "ఈ model size, installation requirements ఏమిటి?",
    warranty: "Warranty, local service లో ఏమి వస్తాయి?",
    validity: "ఈ quote ఎప్పటి వరకు valid? Product ఎప్పుడు అందుతుంది?",
    unclear: "ఆ మాట స్పష్టంగా వినిపించలేదు. మరోసారి చెప్పగలరా?",
    handoff: "నిర్ణయం buyer దే. నేను deal accept చేయలేను, కొంటామని మాట ఇవ్వలేను. ఇప్పుడు buyer మాట్లాడతారు.",
    intro: "నమస్కారం, నేను ఈ buyer కి AI buying assistant ని. Product, price గురించి అడుగుతాను. Conversation text ఉంచుతాము, audio recording ఉంచము. మీరు మాట్లాడటానికి సిద్ధమేనా?",
  },
} as const;
export type Question = keyof typeof questions.hi;
export function spokenQuestion(code: Question, lang: string) { return questions[lang==="te-IN"?"te":"hi"][code]; }
