## Authorized HTTPS phone trial — October 5, 2026

The builder chose a phone test and explicitly authorized publishing the development page and enabling voice within the ₹20 test allowance. Published the built app through Convex static hosting to https://effervescent-kingfisher-446.convex.site/app.html, using the development backend effervescent-kingfisher-446. This is internet-accessible development hosting; production and GitHub push were not authorized or performed.

Added SARVAM_VOICE_TEST_UNTIL=1791218341950 (October 5, 2026, 10:09 pm IST) and enabled the development trial. Both the enabled flag and a future expiry are required. Expiry blocks new sessions and further provider reservations; saved text can still be reviewed and saved. Six sessions are allowed per explicitly configured trial window, with the existing 120/day global provider-attempt cap and 48/session cap retained. This separates the buyer's trial session quota from earlier setup sessions. Monetary billing is still not a hard app-enforced cap.

The live phone-width browser storage flow passed: fictional source, real account creation/save/reload, correction preserving original text, unreviewed hidden details, sign-out and second-account privacy. Live startup then exposed a cleanup bug: clearing a finished Audio source emitted a false media error and stopped microphone transition. Fixed by removing completion/error callbacks before pausing and removing the source. A regression test checks that source removal cannot trigger the stale error callback. npm test passed: 17 tests plus navigation, backend types and build. Re-published corrected assets and pushed development backend cleanly. The fresh signed-out live browser then passed real startup speech, denied microphone recovery, Pause and no horizontal overflow; the saved paid startup regression script uses a real click and the browser microphone permission. Real buyer phone speech and noisy-shop behavior are still pending.

Next: the buyer opens the HTTPS link in Chrome/Android or Safari/iPhone, allows the microphone, speaks needs, uses a consenting friend as a fictional shopkeeper, tests pause/takeover, saves one offer and reloads. When finished, pause the enabled flag; the trial also expires automatically. Do not mark milestone 1 complete until those phone checks are reported and issues fixed.

## Live Sarvam development checks — October 5, 2026

The builder added the replacement key directly to development Convex, confirmed Sarvam Model APIs No retention, and approved ₹20 for initial tests. Recorded SARVAM_ZERO_RETENTION_CONFIRMED=true. Temporarily enabled SARVAM_VOICE_TEST_ENABLED for this batch, then set it false after checks; this was not authorization for ongoing paid public use.

Two first Hindi attempts successfully synthesized and transcribed speech but failed before calling the conversation model: the Convex Agent required a user or thread reference. Fixed this with an opaque session-scoped reference, no history lookup and saveMessages:none. A regression check now exercises the actual Agent with a fabricated compatible API reply rather than mocking Agent.generateText. No audio or private provider response is logged; diagnostics include stage, error class and HTTP status only.

The fixed real Model API pipeline passed Hindi/Hinglish and Telugu mixed with English using generated price questions held in memory. Returned transcripts and next-question audio, with no invented offer facts. Measured full round trips: Hindi 5.6 seconds; Telugu 3.6 seconds. Telugu transcribed “quoted” as “coated”: these checks do not establish real buyer speech accuracy, naturalness, microphone quality or noise robustness. No audio was written to disk or Convex storage. This batch made six speech-synthesis requests, four transcription requests and two conversation requests; exact provider billing was not retrieved. Calls were bounded well below the approved ₹20 based on published unit rates, not a rupee hard cap.

npm test passed: 15 tests plus navigation, backend types and build. Browser at 390px confirmed configured/paused state and no page overflow. Development backend updated only; no GitHub push or app deployment. Builder Pulse flush delivered one event with no local backlog; token fields and GrowthX aggregate totals were not independently verified.

Next: a separately enabled, supervised real microphone session and secure phone test, including interruption, refusal, mixed speech and saving/reopening. Milestone 1 remains awaiting those checks.

# Progress

## Local interface simplification — October 5, 2026

The builder found the conversation buttons confusing before local testing. Shortened the opening screen, made titles describe the current step, and moved voice/privacy explanations and earlier notes behind expandable links. During conversation, Pause changes to Resume after stopping; Answer finished appears only while listening, and Take over remains available in the shop. Brief review and offer review no longer show unrelated conversation controls. Returning to the shop is available under a clearly labelled expandable option. No provider, backend, saved-data format, calling or negotiation changes.

Checks: npm test passed (17 tests, navigation, backend types and build). Chrome at 390px and 1440px checked the layout; the existing browser flow passed a fictional text draft, short correction, real development-account creation/save/reload, original source preservation, hidden facts remaining unreviewed, sign-out and second-account privacy. Opening button is visible without scrolling at 390 × 844; review has no Pause/Take over controls. No paid voice requests or real microphone checks were made in this pass. Local server is running at http://127.0.0.1:5173/app.html. Not deployed or pushed.

Next: builder tries the simpler local screen and reports any remaining confusing step; real-phone speech proof remains pending.

## Milestone 1 development implementation — October 5, 2026

The builder chose Sarvam and explicitly instructed text-only retention with no saved audio. They asked to check in the code after completing changes. `/app.html` now opens the conversational workspace; `/app.html?legacy=1` preserves the earlier note/photo offers and comparisons.

Built: Hindi/Hinglish and Telugu/English starting-language controls; spoken brief and standard-voice enquiry configuration; participant agreement before shop capture; pause/takeover/end/manual resume; a four-detail review with one-detail corrections; original text kept separately from corrections; reviewed visible facts distinguished from hidden unreviewed facts; account-owned Convex save/reopen and correction; device-only text drafts; honest missing-key, permission/network/provider and limit states.

Sarvam Model APIs run in Convex actions (`saaras:v4`, `sarvam-105b-conversations`, `bulbul:v3`, standard `shubh`). Only predefined enquiry questions and handoff speech can be spoken; the model selects useful questions and extracts literal source facts. No buying/accepting/booking tool, negotiation or calling was added. Speech and listening alternate; automatic listening stops after silence or 23 seconds, with an Answer finished control. A pause stops app playback and microphone capture; a late completed transcript may still be preserved without resuming speech. Actual timing and voice quality remain untested.

Audio stays in memory for processing and is not saved to Convex storage, device drafts, source files or an AI trace. AI component message storage is disabled for these bounded calls; account saves contain text only. Sarvam Model APIs zero-retention must be configured in the provider workspace and confirmed separately before capture is enabled. Its packaged Voice Agents route was inspected and declined because zero retention is not currently supported there.

Checks: `npm test` passed (14 tests plus navigation check, backend types and build); development Convex functions pushed cleanly to `effervescent-kingfisher-446`; dependency audit found no vulnerabilities. Chrome at 390px and 1440px verified honest missing-key state, a disclosed fictional transcript draft, pause/takeover states, short correction, real signup/account save, reload, saved correction with original text retained, hidden facts staying unreviewed, and second-account privacy. The old two-offer workflow also passed its browser check through the legacy route. Fictional transcript fixtures and a mocked provider failure tested storage/recovery; neither represents a live Sarvam call.

Limits implemented on the server: 10-minute session authorization, 24-second mono 16kHz WAV input maximum, 60/24,000-character bounded conversation, 1,600 model output tokens, no automatic paid retries, 48 reserved provider attempts per session, 6 sessions and 120 reserved provider attempts per UTC day globally, concurrent-turn lock. Reservations are conservative allowances, not measured billing or a rupee hard cap. No public voice rollout is authorized.

Remaining: user-supplied Sarvam key, verified provider No retention setting, agreed test activation, real speech/mixed-language/noise/interrupt/permission/refusal tests, secure phone test and separate deployment approval. No phone microphone works on the current LAN HTTP preview. No push or app deployment occurred. Milestone 1 is **awaiting live voice proof**.

Next: add the development Sarvam key and configure Model APIs No retention; then run the bounded voice test. Earlier provider-selection/rehearsal notes below are historical.

## Sarvam approved — milestone 1 started, October 5, 2026

The builder approved Sarvam for the conversational milestone. Required languages are Hindi, Telugu and each mixed with English. Researched official model, language, pricing and browser Voice Agents documentation. No key was supplied, no provider call occurred, and paid public use remains unauthorized.

The browser route needs a configured Sarvam agent and identifiers in addition to its credential. Temporarily installed its browser package to inspect the secure connection and stop controls; removed it after inspection. The dependency audit is clean again. No application code or database shape changed.

Pending product choice: retain conversation text and offer only, or also audio. Capture/storage and recovery depend on this answer. Milestone 1 is not complete; no phone voice test, noisy-shop test, push or deployment occurred. PLAN.md now records this as the current build step, replacing the documentation-only/rehearsal step below.

## Direction changed — October 5, 2026

The builder rejected the long capture/confirmation form as recreating information fatigue. Agreed direction: a phone-browser assistant with a natural-sounding standard voice that enquires with shopkeepers, remembers offers, privately helps the buyer decide and negotiates when the situation supports it. It asks privately for material unknown preferences. The buyer can interrupt/take over; only the human accepts a deal or promises to buy. Intended calls to chosen shops include an unanswered-call in-shop fallback. Voice is the intended capture method; new typed-note/photo/form capture is not required.

Updated IDEA_SCOPE.md, PRODUCT.md, PLAN.md, DESIGN.md, AGENTS.md and README.md to reflect this direction. This revision changes documentation only. No application changes, provider connections, voice/calling tests, production deployment or completed buyer study are implied. The previously verified development foundation and its saved data remain as recorded below.

Voice/calling provider/model/languages/costs, recording consent/retention/deletion and unsaved-audio recovery are unresolved. The existing gpt-5.4-mini configuration applies only to note/photo extraction. No real key/provider test is recorded. The old checkpoint ec1d23a is not completion or approval of the new voice milestones.

Documentation checks passed for formatting, local links, scope consistency, revised milestone coverage and separation of planned versus implemented work. Only the seven project documentation files changed; no runtime tests were needed for this documentation-only revision.

Current next step: rehearse one disclosed two-shop conversation with enquiry, private guidance, supported bargaining, interruption and a refusal to make commitments; then settle provider dependencies before coding. PLAN.md and PRODUCT.md contain the revised milestone order.

## Earlier development milestone — two saved offers and comparison

Implemented in the development app at `/app.html`:

- Needs/budget and initial note draft before sign-in; existing Convex email/password account flow at first source save.
- One current purchase and exactly two offer slots per account.
- Original typed notes and up to two JPEG/PNG photos per shop in Convex file storage, with a reduced processing copy; source access requires account ownership.
- Manual detail entry and buyer confirmation; correction preserves original sources. Unknown extra costs remain unknown, separate from explicit zero.
- Persisted Convex comparison of specifications, quoted/extra costs, warranty, installation, service, availability, dates/validity, fit reasons, and gaps. The saved comparison keeps the offers and budget used to calculate it, so later edits cannot mix old results with new inputs. Changes make it out of date. Critical gaps block final recommendation; both over-budget offers produce no-fit wording.
- Local non-password drafts, upload/save retry behavior, account privacy checks, save status and last successful save times.
- OpenAI `gpt-5.4-mini` configured in backend code for notes/photos only. The builder will add `OPENAI_API_KEY` later in Convex; `AI_READING_ENABLED=true` is also required for development calls. No real provider call occurred and production AI remains disabled.

## Verified

`npm test` passed (backend ownership/amount validation, two-offer limit, immutable notes, idempotent offer/source saves, persisted comparison, staleness, unknown costs, quote validity, evidence validation, and account AI call limit; navigation, types, build).

The same flow also passed through the local Wi-Fi preview address (rather than localhost). Chrome was walked at 390px phone width and 1440px desktop width against development `effervescent-kingfisher-446`. Verified account creation, needs save/reload/edit, two offers, unreadable-photo recovery without losing the original note, actual PNG upload and original reopening, AI missing-key recovery, confirmation, comparison reopening, unsaved offer draft recovery, offline saving and reconnect, staleness after budget/offer changes, no-fit result, horizontal table scrolling without page overflow, sign-out/sign-in, and a second account with no access to the first account's saved offers.

## Assumptions and remaining limits

- INR; one current purchase; two shop offers; text and JPEG/PNG capture only for milestone 1.
- Sign-in happens before uploading/saving source files, so sources can belong to the account. Initial needs/note can be entered beforehand.
- Fit reasons are buyer-entered checks; AI transcribes source details and does not produce an unsupported product recommendation. Comparison runs with explicit backend rules.
- Original notes are locked at first source save; later corrections are to the captured fields, preserving evidence.
- AI accuracy, refusal/incomplete response behavior against a real provider, token consumption, and actual cost still need testing after the key is added. Automated evidence-validation tests and missing-key browser recovery are not proof of model quality.
- 1,800 output tokens accommodates fourteen fields plus evidence; it needs measurement/tuning after key setup. Proposed monthly AI budget remains subject to approval before paid public use.
- Local phone preview requires the same Wi-Fi and the computer running. No production deployment or production browser check occurred.
- Landing page remains a fictional design preview. Preparation, Maps, voice, third-shop addition, bargaining, and purchase recording are later milestones.
- Email verification and password recovery remain unconfigured. Manual buyer test has not happened.

The local Wi-Fi server serves only `dist/`; requests for environment files, repository settings, backend code and project notes return 404.

Previous next step was the builder’s phone check and real-key note/photo extraction testing. Neither is recorded as completed; they no longer define the next conversational build milestone. See the direction change above.
