# Development status: one-shop voice enquiry

The milestone 1 interface and text-only account storage are built. **Live voice is awaiting a Sarvam key and real-phone proof; the milestone is not complete.** No paid provider request or app deployment has occurred.

Open `/app.html` for the new conversation workspace. The earlier form-based foundation remains at `/app.html?legacy=1`, with existing data preserved. The original setup and test notes below remain useful for that foundation.

# Buying companion

## Current app and revised direction

The builder rejected the long offer form on October 5, 2026. PRODUCT.md, IDEA_SCOPE.md, PLAN.md and DESIGN.md now specify a spoken assistant: in-shop enquiry, private decision help, situational negotiation, and later authorized calling with an unanswered-call fallback. Only the buyer accepts or promises to buy. This documentation revision does not change application code or connect a service.

The instructions below describe the existing development foundation, not the new conversational experience. These earlier checks cover note/photo capture only. The new voice configuration and interface are described above and below; real voice remains untested, and negotiation/calling are unbuilt. Existing saved notes/photos/offers remain intact.

The earlier milestone 1 at `/app.html` lets a buyer enter needs/budget, keep two shops' original notes and photos, confirm offer details, and save a side-by-side comparison. Needs, sources, confirmed offers, and the comparison are stored in the buyer's Convex account and survive reload/sign-out. One current purchase per account; two offers for this milestone.

## Run and check on a phone

From `/Users/praveen/build-sprint-app`:

```sh
npm install
npx convex dev --once
npm run dev
```

On the computer open http://127.0.0.1:5173/app.html. To open from your phone on the same Wi-Fi, run `HOST=0.0.0.0 PORT=5174 node scripts/serve.mjs` after building, then open `http://YOUR-COMPUTER-LAN-IP:5174/app.html`. Keep the computer and server running. This is a local development preview, not a production publication; mobile data cannot reach it. The preview serves only the built `dist/` website files, not local settings or source code.

1. Enter product, budget, purpose/requirements, and optionally the first shop note. Choose **Save first shop’s information** and create an account or sign in. Drafts survive account failures; passwords are never stored in drafts.
2. Save the needs and budget, then choose **Add shop 1**. Enter shop name and original note, or select a JPEG/PNG under 5 MB and use **Retry / upload …**. Two photos per shop. The original is stored; a processing copy is reduced to at most 1024 pixels on its longest side.
3. Choose **Enter / review details**, or **Read sources with AI** after AI setup below. Enter/check model, specifications, price, quote date, validity, inclusions, extra costs, warranty, installation, local service, availability, and fit reasons. Blank costs stay unknown; zero requires explicitly included/free costs. Unclear text can be **Needs checking**.
4. Check the confirmation box and choose **Confirm and save offer**. Repeat for shop 2 with a different model/price.
5. Choose **Compare offers**. Swipe the table sideways on a phone. Open original sources beside any recorded detail. Confirmed capture is separate from unverified shop statements. Critical gaps block a final recommendation; incomplete total costs stay unknown.
6. Reload. Both offers, their original sources, and the saved comparison should remain. Sign out/sign back in to check account reopening.
7. Change budget or correct an offer. The comparison becomes **Out of date** until **Update comparison** is used. Lower the budget below both quoted prices to see **No offer fits your stated needs**.

Drafts are device-only recovery and are separate from account saves. Unuploaded files must be reselected after reload. Original saved notes are immutable; corrections change captured fields while keeping the original evidence. The landing page `/` remains the explicitly labelled fictional design preview; preparation and other milestones are not enabled.

## Existing extraction setup — not a voice service

The backend uses `gpt-5.4-mini` through the OpenAI Responses API for a bounded extraction job. It receives only the selected shop's notes and processing photos, not account credentials or the whole purchase. It does not receive tools or permission to act on the buyer's behalf. Notes/images are treated as evidence, not instructions.

Official model documentation checked October 5, 2026: [GPT-5.4 mini](https://developers.openai.com/api/docs/models/gpt-5.4-mini). It supports text/image inputs and structured output; listed rates are $0.75 per million input tokens and $4.50 per million output tokens. Actual image usage/cost must be measured after adding a key. Voice is not part of this milestone or this model connection.

These settings enable only the old note/photo extraction path, not voice/calling. Sarvam is approved for the new voice build; this older extraction configuration does not enable it or approve paid public use.

In the [development Convex dashboard](https://dashboard.convex.dev/t/praveen-cherukuru/build-sprint-app/effervescent-kingfisher-446), open **Settings → Environment Variables**:

- Add `OPENAI_API_KEY` there, never in chat, browser code, or a committed file.
- Set `AI_READING_ENABLED` to `true` for development testing when ready. Missing key/disabled reading produces a recovery message and preserves saved sources and editable details.

The provider has not been called with a real key. Paid public use is not enabled or approved. Before production AI use, confirm the monthly amount with the builder, provider spending controls, and measured extraction quality/cost. The documented $100 proposed budget is not a proven provider-enforced cap. Dev and production have separate keys/settings; production must remain disabled until that work is approved.

Limits: notes 6,000 characters; two offers; two JPEG/PNG photos per offer, original at most 5 MB and processing copy at most 1 MB; one provider attempt per click; 45-second timeout; backend limits 100 attempts per fixed UTC hour across the app and 10 per account. No automatic provider retries. Output is capped at 1,800 tokens rather than 500 because fourteen fields each carry evidence/source references; completeness is checked and incomplete/refused/invalid replies never become confirmed offers. Measure/tune after the key is supplied. Logs record model, token totals and estimated cost/status only, not private source text or returned details.

The backend checks returned field types, amount formats, source indices and exact note evidence quotes. Image evidence still requires buyer inspection. Confirmation does not independently verify claims. Fit reasons are the buyer's explicit assessment; backend rules compare confirmed costs against budget and flag missing/expired evidence, without inventing product facts or a bargaining target.

## Verification and status

`npm test` runs backend ownership/validation/comparison/rate-limit checks, existing navigation checks, backend types, and frontend build.

`node tests/browser-purchase.mjs` uses Chrome's existing browser-control connection at http://127.0.0.1:9223 and the local app. It creates fictional test accounts/sources in the development deployment and checks sign-up, needs saving/reopening/editing, two offers, photo upload/reopening, AI-unavailable recovery, confirmation, saved comparison/reload, draft recovery, offline saving/reconnection, stale results, no-fit results, phone/desktop layout, and second-account privacy. `APP_TEST_URL` selects another frontend; `CHROME_DEBUG_URL` selects another Chrome connection. Screenshots are written under `/tmp`.

The app was checked against development `effervescent-kingfisher-446`. Production has not been published or checked. AI extraction quality remains untested until a real key is added. The revised conversational buyer test in PRODUCT.md has not been performed. Earlier browser checks do not establish voice quality, safe negotiation or conversational usability.

Existing Convex Auth needs `JWT_PRIVATE_KEY` and `JWKS` on each deployment; development already has them. Email verification/password recovery are not configured. No email service was added. Deployment remains `npm run deploy` with Convex static hosting after the builder confirms the milestone and authorizes shipping. GitHub push does not deploy.

## Sarvam voice build status

Sarvam is approved for milestone 1; Hindi, Telugu and mixed-English conversations are required. The development conversational workspace and model actions are implemented, but no real voice call has been tested. Only text is retained. The selected route uses Model APIs, not the packaged Voice Agents service; a Sarvam model API key is needed in Convex. Voice remains disabled. See PLAN.md for the current step.

Official references: [models](https://docs.sarvam.ai/api/getting-started/models), [Indian-language guidance](https://docs.sarvam.ai/api/getting-started/building-for-india), [component API pricing](https://docs.sarvam.ai/api/getting-started/pricing), [browser connection and key protection](https://docs.sarvam.ai/conversations/deploy/sdks/web). Component API prices are not an all-in Voice Agents quote.

## Configure the first voice test

All secrets stay in Convex development environment settings, not a browser variable or a repository file. Deployment tested: `effervescent-kingfisher-446`.

- `SARVAM_API_KEY`: obtain from your Sarvam account and enter directly in Convex settings. Never send its value in chat.
- `SARVAM_ZERO_RETENTION_CONFIRMED`: leave unset until Sarvam **Settings → Workspace → Data retention → Model APIs** is saved as **No retention (0 days)**. Then set `true` after confirming that setting for the key’s workspace. This flag does not set retention at Sarvam.
- `SARVAM_VOICE_TEST_ENABLED`: leave unset until the bounded development test is ready; `true` enables the test. No public paid-use approval is implied.

The [provider retention instructions](https://docs.sarvam.ai/api/platform/data-retention) support zero retention for Model APIs, not Voice Agents. No setting has been verified on the builder’s account.

Models: Saaras v4 listening, Sarvam 105B Conversations decision/extraction, Bulbul v3 standard `shubh` speech. The Convex agent component handles the bounded model call with message storage disabled; the offer save stores only account-owned text/facts/corrections. No gateway/provider substitution, phone-calling platform or additional host was selected.

Each spoken turn is processed after a pause, then the assistant speaks; listening resumes after playback. Pause/takeover stop microphone and playback. Closing while a turn is not yet transcribed may require repeating that turn; completed text drafts survive reload when browser storage is available. This turn-based implementation still needs latency, silence detection and interruption checks on actual phones. No promise of fully simultaneous speaking/listening is made.

Backend limits: 10-minute session; maximum 24-second 16kHz mono WAV input; bounded 60-turn / 24,000-character text; 1,600 output tokens; 48 reserved provider attempts/session; 6 sessions and 120 reserved attempts/day across the app; single active turn; no automatic retry. These caps do not constitute a monetary hard limit or approval of public spending.

## Check on a phone

For the current interface preview, keep the computer running and connect your phone to the same Wi-Fi. Open `http://192.168.29.142:5174/app.html`, select Hindi/Hinglish or Telugu/English, and tap **Tell me what you’re buying**. With the key absent, the page must explain that voice setup is waiting; it must not pretend to listen. You can use **Sign in to reopen my offer** for an offer already saved to your account. Browser test accounts are fictional and are not your account.

This HTTP link cannot use the phone microphone. After key/privacy configuration and authorized HTTPS hosting, test the complete flow: speak needs; check short brief; identify shop; introduce assistant; confirm shopkeeper agreement; answer enquiry; test Pause/Take over/Resume; end; correct one detail if needed; Looks right → sign in → save; reload and confirm the offer/text reopens. Check that unknown extra costs remain unknown and hidden facts are unreviewed. The secure production URL has not been published or verified.

## Verification of the new flow

`npm test` checks source matching, private-question restrictions, bounded audio, ownership, short confirmation, original-text preservation, retry identity, saved corrections, missing key/retention gates and provider-failure recovery. `node tests/browser-voice.mjs` runs real Chrome against the local development app and real Convex account storage, with an explicitly fictional local transcript fixture. It does not call Sarvam or certify audio quality. Run the earlier browser check with `APP_TEST_URL='http://127.0.0.1:5173/app.html?legacy=1' node tests/browser-purchase.mjs`.
