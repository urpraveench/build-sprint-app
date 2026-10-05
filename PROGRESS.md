# Progress

## Milestone 1 — two saved offers and comparison

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

Next: builder checks the milestone on their phone, then adds the development OpenAI key so we can test source reading on clear, blurry, conflicting, incomplete, and irrelevant examples before shipping.
