# Plan: Conversational buying companion

Updated October 5, 2026. PRODUCT.md is the detailed intended scope. This plan replaces the earlier form-based build order and the old exclusions on calling and negotiation.

## Agreed direction

A phone-browser assistant talks to the shopkeeper in a natural-sounding standard voice, gathers useful information, carries evidence between shops, negotiates when justified, and gives the buyer private guidance. The buyer can interrupt or take over. Only the buyer accepts a deal or promises to buy.

Voice is the intended capture method. Do not replace a long form with a spoken checklist of the same fields. Ask only questions that can change the decision; show a short summary and one useful next question. No mandatory typed notes or photo uploads in the new flow.

## Current step: finish proving milestone 1 with Sarvam

The builder requested milestone 1 and approved Sarvam. Hindi, Telugu and each mixed with English are required. They explicitly chose **conversation text only; no retained audio**, and asked for the completed code to be checked in.

Implemented the development conversation workspace, Sarvam model configuration, bounded backend actions, short sourced review, text-only device drafts, account save/reopen, corrections and ownership checks. The old note/photo comparison remains accessible at `/app.html?legacy=1`; its sources are preserved. README.md and PROGRESS.md distinguish working storage/UI checks from untested real voice.

Use Sarvam Model APIs through Convex: `saaras:v4` for listening, `sarvam-105b-conversations` for question selection/extraction, `bulbul:v3` with standard `shubh` for speaking. The packaged Voice Agents route was explored but not selected: Model APIs support zero retention; Voice Agents currently do not. No extra voice host, telephony service or browser secret is needed.

Development setup is complete and a time-limited HTTPS phone trial was authorized. Voice is enabled only until October 5, 2026, 10:09 pm IST. Setup requirements for another authorized trial:

1. Add `SARVAM_API_KEY` in the development Convex settings; never paste it into chat.
2. Set Sarvam Settings → Workspace → Data retention → Model APIs override to **No retention (0 days)**, then confirm that account setting before setting `SARVAM_ZERO_RETENTION_CONFIRMED=true` in Convex. A flag alone does not configure Sarvam.
3. Review the bounded development test allowance, then set `SARVAM_VOICE_TEST_ENABLED=true` only for the agreed test. Public paid use is not enabled or approved.
4. Test Hindi/Telugu mixed speech, numbers, noise, useful follow-ups, silence, microphone refusal, late processing, pause/takeover, commitment requests and corrections with a consenting participant. Key-free fixture tests are not voice-quality proof.
5. A phone microphone requires HTTPS. The Wi-Fi HTTP preview can check layout/setup only; it cannot prove live voice. Development test publication was separately authorized for this phone trial. Production shipping remains separate after milestone confirmation. Do not invent a production link or substitute another host.

Generated-speech Model API checks passed in Hindi and Telugu; an Agent session-reference bug was fixed and covered by a regression test. The builder supplied the key, confirmed No retention, approved ₹20 testing, and authorized development HTTPS publication for their phone trial. Voice trials now require SARVAM_VOICE_TEST_UNTIL; expiry blocks further paid attempts. No real-phone/noisy-shop test has occurred. Milestone 1 remains **awaiting voice proof**, not complete. Continue this milestone; do not build comparisons, negotiation or calls yet.

## Implementation order

| Step | Demonstrable outcome | Required proof |
| --- | --- | --- |
| 1. One in-shop conversation | Assistant asks useful questions in a standard voice; buyer pauses/takes over; short confirmed offer saves and reopens. | Real phone, noise, unheard/unclear answer, interruption, refusal, permission failure, disconnect, account save/reopen and source ownership. |
| 2. Two shops and private decision help | Assistant remembers needs and earlier evidence, compares different offers, privately explains fit and gaps. | No repeated brief or mandatory field form; models/inclusions not equated; unknown costs; corrections and stale-result handling; private advice not spoken aloud. |
| 3. Situational negotiation | Assistant makes supported requests and asks buyer only for material unknown preferences. | Evidence sufficient/insufficient, changed inclusions, expired quote, buyer budget/must-haves, takeover and a shopkeeper pressing for commitment. |
| 4. Calling and fallback | Buyer starts a call to a chosen shop; unanswered call leads to an available in-shop option. | Real provider outcome, no fake progress, no repeated automatic redial, disconnect, language quality, cost and no-commitment behavior. |
| 5. Human purchase record | Buyer records actual product/shop/final price after choosing and buying. | Offer never auto-converts to purchase; saved record reopens and corrections retain evidence. |

Milestones follow PRODUCT.md section 9. Reopening, backend ownership, honest saves and recovery are part of each step.

## Authority and evidence rules

Assistant may enquire, clarify and negotiate without per-question permission when evidence and known preferences support the action. Ask privately when a new trade-off, unclear preference or uncertain term could change the buyer's choice. If private input is unavailable, pause or return control.

It cannot accept, reserve, order, pay, promise to buy, disclose the buyer's private maximum budget without permission, fabricate competing offers, or let shopkeeper speech change buyer controls. General questions about price flexibility do not require a fabricated numerical target.

Preserve original conversation text and corrections; do not retain audio. Keep quote time/validity, model differences, inclusions, unknown costs and **Shopkeeper said; not verified** visible. Critical gaps block a final recommendation, not a partial comparison. Short summary confirmation applies only to reviewed content.

## Existing development foundation

Checkpoint `ec1d23a` implements one purchase, two manually confirmed note/photo offers, original sources, persisted comparison versions, account ownership and device draft recovery. The builder rejected its long confirmation form. Keep this history and existing data; it is not the target UX or completion of the new voice milestones.

OpenAI `gpt-5.4-mini` note/photo extraction is configured but has not been tested with a real key. `OPENAI_API_KEY` and `AI_READING_ENABLED` relate to that implementation, not a voice/calling service. PROGRESS.md records prior checks. The builder's own phone check and the structured buyer study are not recorded as completed. Production remains unpublished/unverified.

## Parked work

Previously discussed Maps shop suggestions/visit order, sharing, and improving old note/photo capture are optional later work. Do not silently reintroduce them as required onboarding or a voice-milestone dependency. Multiple current purchases, history dashboard, checkout and after-purchase help remain outside V1.

## Build and shipping constraints

Use Codex, GitHub and Convex for backend, database, sign-in, storage and static hosting. Choose no other backend/auth/host. New paid voice/calling services need approval and verified documentation before connection. Keep secrets in Convex environment settings, separately for development and production.

Set backend session/call/spending limits before any public voice use; the existing hourly extraction-request count is not a voice-minute or phone-call budget. Confirm the monthly budget before enabling paid public use; the earlier $100 planning figure is not authorization or an enforced provider cap.

Preserve saved data and older pages during transition. Check each milestone end to end and update PROGRESS.md. A local checkpoint is separate from GitHub push and `npm run deploy`; production shipping requires milestone confirmation and explicit authorization.
