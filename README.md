# Buying companion

Milestone 1 at `/app.html` lets a buyer enter needs/budget, keep two shops' original notes and photos, confirm offer details, and save a side-by-side comparison. Needs, sources, confirmed offers, and the comparison are stored in the buyer's Convex account and survive reload/sign-out. One current purchase per account; two offers for this milestone.

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

## OpenAI setup — key added later

The backend uses `gpt-5.4-mini` through the OpenAI Responses API for a bounded extraction job. It receives only the selected shop's notes and processing photos, not account credentials or the whole purchase. It does not receive tools or permission to act on the buyer's behalf. Notes/images are treated as evidence, not instructions.

Official model documentation checked October 5, 2026: [GPT-5.4 mini](https://developers.openai.com/api/docs/models/gpt-5.4-mini). It supports text/image inputs and structured output; listed rates are $0.75 per million input tokens and $4.50 per million output tokens. Actual image usage/cost must be measured after adding a key. Voice is not part of this milestone or this model connection.

In the [development Convex dashboard](https://dashboard.convex.dev/t/praveen-cherukuru/build-sprint-app/effervescent-kingfisher-446), open **Settings → Environment Variables**:

- Add `OPENAI_API_KEY` there, never in chat, browser code, or a committed file.
- Set `AI_READING_ENABLED` to `true` for development testing when ready. Missing key/disabled reading produces a recovery message and preserves saved sources and editable details.

The provider has not been called with a real key. Paid public use is not enabled or approved. Before production AI use, confirm the monthly amount with the builder, provider spending controls, and measured extraction quality/cost. The documented $100 proposed budget is not a proven provider-enforced cap. Dev and production have separate keys/settings; production must remain disabled until that work is approved.

Limits: notes 6,000 characters; two offers; two JPEG/PNG photos per offer, original at most 5 MB and processing copy at most 1 MB; one provider attempt per click; 45-second timeout; backend limits 100 attempts per fixed UTC hour across the app and 10 per account. No automatic provider retries. Output is capped at 1,800 tokens rather than 500 because fourteen fields each carry evidence/source references; completeness is checked and incomplete/refused/invalid replies never become confirmed offers. Measure/tune after the key is supplied. Logs record model, token totals and estimated cost/status only, not private source text or returned details.

The backend checks returned field types, amount formats, source indices and exact note evidence quotes. Image evidence still requires buyer inspection. Confirmation does not independently verify claims. Fit reasons are the buyer's explicit assessment; backend rules compare confirmed costs against budget and flag missing/expired evidence, without inventing product facts or a bargaining target.

## Verification and status

`npm test` runs backend ownership/validation/comparison/rate-limit checks, existing navigation checks, backend types, and frontend build.

`node tests/browser-purchase.mjs` uses Chrome's existing browser-control connection at http://127.0.0.1:9223 and the local app. It creates fictional test accounts/sources in the development deployment and checks sign-up, needs saving/reopening/editing, two offers, photo upload/reopening, AI-unavailable recovery, confirmation, saved comparison/reload, draft recovery, offline saving/reconnection, stale results, no-fit results, phone/desktop layout, and second-account privacy. `APP_TEST_URL` selects another frontend; `CHROME_DEBUG_URL` selects another Chrome connection. Screenshots are written under `/tmp`.

The app was checked against development `effervescent-kingfisher-446`. Production has not been published or checked. AI extraction quality remains untested until a real key is added. The manual buyer test in PRODUCT.md has not been performed.

Existing Convex Auth needs `JWT_PRIVATE_KEY` and `JWKS` on each deployment; development already has them. Email verification/password recovery are not configured. No email service was added. Deployment remains `npm run deploy` with Convex static hosting after the builder confirms the milestone and authorizes shipping. GitHub push does not deploy.
