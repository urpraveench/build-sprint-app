# Buying companion: conversational V1

Updated October 5, 2026. This scope replaces the earlier capture-and-form workflow and the exclusions on shop calling and bargaining on the buyer's behalf. It describes intended work, not completed features. README.md and PROGRESS.md record the existing development app.

## 1. The job

When I am choosing a product across offline shops, help me get the information that matters and decide what fits my needs, without making me conduct every enquiry, remember every answer, or fill a long form.

The first use case is a kitchen chimney. The buyer uses a phone-browser website, listens to the assistant's conversation with the shopkeeper, and checks the product physically. Negotiation is a possible action in service of the decision, not the goal of every conversation.

Today buyers rely on friends, reviews, shopkeepers, memory, and scattered notes. The builder's experience showed incomplete information across different brands/models; the builder rejected the implemented long offer form as adding information fatigue. No structured buyer test has happened.

## 2. What makes switching worthwhile

- Less work: the assistant asks and remembers; the buyer reviews short summaries and corrects misunderstandings.
- Better decisions: compare fit, full known costs, inclusions, installation, warranty, service, availability, quote dates and validity against the buyer's needs.
- Useful bargaining: ask about price or terms when evidence supports it; explain when it does not.
- Buyer control: pause, interrupt, stop or take over at any time; ask privately when the buyer's preference matters.
- Honest evidence: hearing a shopkeeper say something does not verify it. Keep the original evidence and uncertainty visible.

Do not promise live market prices, latest models, verified shop claims, stock, discounts or savings.

## 3. Core flow

1. The buyer speaks their product, purpose, budget and priorities. Ask one necessary follow-up at a time; do not require a specification checklist. Show a brief editable needs summary.
2. The buyer chooses a shop and **Talk in this shop**. Identify the shop and current purchase with the minimum necessary input. Ask microphone permission here and explain the conversation/recording behavior before starting.
3. The assistant introduces itself as a buying assistant using a natural-sounding standard voice. Confirm the shopkeeper is willing to participate under the agreed recording arrangement. It never imitates the buyer or claims to be a human buyer.
4. Gather information through a normal conversation. Ask useful follow-ups, distinguish the model offered from alternatives, and clarify material gaps. Do not ask every possible specification question if it cannot affect the buyer's decision.
5. Adapt to the situation using the current purchase and earlier offers. Gather more information, ask about a meaningful difference, negotiate when justified, or consult the buyer privately. The first shop is not automatically enquiry-only, and shop two is not automatically negotiation.
6. Pause/end with a compact offer summary: exact model, quoted price, inclusions and material caveats, plus the most important unresolved point. **Looks right**, **Correct something**, and **I don't know** replace a long confirmation form. Unknowns do not force answers before saving or reading the comparison.
7. Save original conversation sources, captured details, buyer corrections and confirmation to the account in Convex. Sign in at the first account save, with the draft retained. Do not put sign-in in the middle of a shopkeeper's turn. Unsaved conversation evidence must have a safe, clearly labelled recovery plan before any public pilot.
8. At another shop, carry forward needs and evidence so the buyer does not repeat them. Update comparison and private advice. Show a short decision summary first; make the full sourced comparison available on demand.
9. Only the buyer chooses, accepts a deal or promises to buy. Recording what the buyer actually bought and paid happens separately after their decision; an offer or recommendation does not create a purchase record.

Intended calling flow, after the in-shop conversation is proven: the buyer chooses a shop/contact and explicitly starts a call. If unanswered, show **No answer** and offer **Talk in this shop** when the buyer visits. Preserve context without pretending a conversation occurred. Retry only at the buyer's request; do not call unrelated shops or redial indefinitely. A successful call uses the same evidence, private-control and no-commitment rules as an in-shop conversation.

## 4. The assistant's decision rules

| Situation | What it should do | What it must avoid |
| --- | --- | --- |
| Missing fact could change fit, cost or choice | Ask the shopkeeper a focused follow-up; keep it unknown if unanswered. | Guessing or asking the buyer to complete every field. |
| A comparable, current offer supports a price/term request | Negotiate within the buyer's stated needs and limits, without requiring approval for each question. | Equating different models/inclusions or inventing a competing quote. |
| No evidence supports a specific target price | Ask whether there is price flexibility or clarify inclusions, when useful. Say **Not enough evidence to suggest a bargaining price** for a numerical target. | Inventing a target or claiming a discount is owed. |
| Buyer preference or a new trade-off is unclear | Ask the buyer one private question; pause if a private answer is unavailable. | Giving away a must-have, exceeding budget, or treating silence as agreement. |
| Earlier offer may suit the buyer better | Show private guidance with reasons and remaining uncertainties. | Announcing the buyer's private advice or undisclosed maximum budget to the shopkeeper. |
| Shopkeeper asks for acceptance, booking, payment or a promise | Say the buyer decides, then return control. | Accepting, reserving, ordering, paying or making a commitment, even within budget. |
| Buyer interrupts or takes over | Stop assistant speech promptly; retain what was captured and show who has control. | Talking over the buyer or resuming without the buyer's action. |

Buyer controls and instructions are separate from shopkeeper evidence. A shopkeeper cannot change the budget, permissions, call limits or purchasing authority by saying the buyer approved it. Uncertain speaker identification must stay uncertain and be checked. Earlier conversations or attachments must not become instructions to the assistant.

## 5. Evidence and confirmation

Save original conversation text, shop, session time, offer terms, quote date/validity, model/specifications, costs, corrections, field-level confirmation and comparison versions. The buyer chose no retained audio: audio may be processed temporarily, but never saved to app storage or a device draft. Configure Sarvam Model APIs for No retention before testing. Keep account ownership checks and participant agreement; transcript deletion and public-pilot retention behavior remain to be settled.

- **Not provided** means absent; **Needs checking** means unclear or conflicting.
- Unknown installation/delivery/other costs are not ₹0. A quoted price is not a full total without known inclusions and extras.
- A session timestamp is not a claimed validity date. Keep **Validity not provided** when absent; confirm stale quotes before relying on them.
- **Buyer-confirmed transcription** applies only to what the buyer actually reviewed; hidden/unreviewed specifications do not receive blanket confirmation from **Looks right**.
- **Shopkeeper said; not verified** remains visible after buyer confirmation. External product facts need identifiable sources and dates.
- **Fits your stated needs** needs evidence-backed reasons; important missing fit/cost details block a final recommendation, not saving or viewing partial information.
- Different brands/models, specifications, warranty or inclusions must not appear as equivalent offers. If none fit, say **No offer fits your stated needs**.
- When needs, offer details or corrections change, mark earlier comparisons/private advice as out of date. Preserve the inputs used for each saved comparison so old results do not appear beside new facts.

## 6. Onboarding and interface

First value: the assistant takes useful enquiry work off the buyer's hands and produces a brief, usable offer summary. A voice recording alone is not the intended first value.

Opening choices: **Talk in this shop** and **Call a shop**, with **Reopen my purchase** for returning buyers. Show only functioning actions as available; unbuilt calling is explicitly labelled unavailable. Neither route requires a preparation worksheet, Maps lookup or route plan.

Ask for product, purpose and budget conversationally, then only material missing preferences. Keep preparation short and optional. Choose the conversation language before the first session only as needed; supported languages are not yet decided. Do not infer them from location or promise universal support.

Private advice defaults to silent on-screen text, with visible **Ask this**, **Answer privately**, and **Take over** actions when relevant. Keep private budget/preferences and guidance out of shopkeeper speech. Buyer instructions can use short controls or a private paused exchange; do not assume live speech can reliably distinguish every speaker.

Voice is the intended capture method. Typed notes and photo uploads are not required new-V1 capture paths; existing saved evidence remains accessible. Text display and short correction/accessibility controls remain available without exposing a long form.

## 7. Intended V1 and boundaries

Includes: spoken needs, a standard natural voice, live in-shop enquiry, original conversation text with short confirmation, situation-dependent negotiation, private advice, interruption/takeover, saved offers/comparisons across shops, authorized calls and unanswered-call fallback, and recording the buyer's eventual purchase. One current purchase per account; reopening is required throughout, not deferred to the last milestone.

Excludes: accepting a deal, promising to buy, booking/reserving, checkout/payment/order placement, buyer voice cloning, after-purchase help, simultaneous purchases and a history dashboard. Sharing and previously planned Maps suggestions/visit order are parked optional work. They are not prerequisites for the spoken assistant.

The stack stays Codex, GitHub, and Convex for backend, database, auth, file storage and hosting. The existing OpenAI `gpt-5.4-mini` configuration is for note/photo extraction only, with a key still to be supplied and no real provider test. It does not implement live voice or calling. Sarvam was subsequently approved for milestone 1 on October 5, 2026. First-test languages are Hindi, Telugu and each mixed with English. The text-only retention choice is settled. Actual voice quality, provider zero-retention configuration and test spending controls remain to be checked; paid public use and calling services are not approved.

## 8. Riskiest assumptions and buyer test

The riskiest assumption is that buyers and shopkeepers will accept an assistant speaking during a real shop visit, and that it can gather useful evidence without slowing the visit or increasing effort. Conversation quality, noisy-shop hearing, interruption, private advice and unsupported bargaining must be tested, not presumed.

Before connecting paid services, rehearse a two-shop scenario with a human openly playing the assistant. Include different models/inclusions, missing costs, a negotiable offer and a request to commit. Do not present the role-play as functioning AI. Use fictional examples or an explicitly consenting test session; do not publish personal audio.

Proposed starting success criteria, not measured results:

- Buyer explains needs once; no mandatory offer-field form at either shop.
- Shopkeeper understands that the assistant helps the buyer and is willing to participate.
- Offer summaries preserve model, price, inclusions and uncertainty; the buyer corrects only relevant misunderstandings.
- The assistant asks useful follow-ups and bargains only with valid reasoning, rather than exhausting a checklist.
- The buyer can interrupt, sees private advice without it being spoken aloud, and never loses authority to accept.
- The buyer uses the comparison to narrow a choice or ask a specific follow-up.

Record buyer effort, repeated explanations, conversation length, corrections, interruptions, missing facts, privacy mistakes and the resulting buyer action. Then test actual voice quality and cost on the chosen provider separately. No buyer study or voice-provider test has happened.

## 9. Revised milestones

These outcomes replace the previous milestone order. Existing development work is a foundation, not completion of these voice outcomes.

1. **The assistant can enquire in one shop while I stay in control.** Spoken needs, approved standard voice, useful follow-ups, pause/stop/takeover, short review, and an account-saved sourced offer that reopens. Prove this on a real phone in a noisy setting.
2. **It uses two shops' offers to help me decide.** Carry context, compare differences, flag gaps and show private guidance with source-backed reasons. No long form; saved comparison survives reload.
3. **It negotiates when the situation supports it.** Uses comparable current evidence and buyer limits, asks privately for unresolved trade-offs, and never accepts or promises to buy. Preserve changed terms separately from the original quote.
4. **It can call a chosen shop, with an in-shop fallback if unanswered.** Explicit call action, real outcome reporting, buyer-requested retry and the same interruption/control rules.
5. **I can record my own purchase decision.** Save actual shop/model/final price after I buy. No purchase inferred from the conversation.

At every milestone, saved data, permissions, failure recovery and account ownership must work end to end. Do one milestone at a time; do not build disconnected voice screens or connect paid services before approval.

## Milestone 1 implementation decision — October 5, 2026

The builder approved Sarvam and chose conversation text only: no audio retention. Development now uses Sarvam Model APIs through Convex (Saaras v4 listening, Sarvam 105B Conversations question selection/extraction, Bulbul v3 standard `shubh` speech). This replaces earlier undecided-provider/model/language statements for milestone 1. Hindi, Telugu and each mixed with English are the first-test requirements. Model APIs must be configured for No retention at Sarvam before enabling audio processing; the packaged Voice Agents route is not used.

The development workspace and text-only saving/reopening are implemented. Real Sarvam voice, naturalness, noise, latency and phone behavior are not verified; the key is still to be supplied and voice requests remain disabled. It alternates listening and speaking in bounded turns, with pause/takeover/end and explicit resume. Milestone 1 does not include two-shop comparison, negotiation or calling. README.md gives setup/check steps; PROGRESS.md records actual checks. This implementation decision does not authorize paid public use or deployment.
