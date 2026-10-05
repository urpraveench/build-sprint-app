# Progress

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
