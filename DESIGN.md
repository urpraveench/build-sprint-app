---
name: Buying companion
description: Keep shop offers together, compare them against your needs, and prepare to bargain.
colors:
  ink: "#142433"
  ink-soft: "#506273"
  cobalt: "#155bd7"
  cobalt-deep: "#0a3991"
  paper: "#f1f5f9"
  white: "#ffffff"
  sun: "#ffcc4a"
  mint: "#c9f0df"
  line: "#ccd7e2"
  missing-soft: "#fff0ec"
  missing-ink: "#a43c24"
typography:
  family: "Arial, sans-serif"
  headline: {fontSize: "32px", fontWeight: 700, lineHeight: 1.2}
  title: {fontSize: "24px", fontWeight: 700, lineHeight: 1.3}
  body: {fontSize: "16px", fontWeight: 400, lineHeight: 1.5}
  label: {fontSize: "14px", fontWeight: 700, lineHeight: 1.5}
rounded:
  status: "6px"
  action: "12px"
  note: "14px"
  surface: "16px"
  board: "28px"
spacing:
  xs: "8px"
  sm: "12px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  section: "76px"
components:
  button-primary:
    backgroundColor: "{colors.cobalt}"
    textColor: "{colors.white}"
    rounded: "{rounded.action}"
    padding: "0 24px"
    height: "52px"
  comparison-table:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.surface}"
---

# Design system: Buying companion

## Overview and locked scope

A buyer visits shops, gathers offers, and decides what to buy. The companion keeps those details together, shows how each product fits the buyer's needs and budget, highlights unanswered questions, and helps the buyer prepare to bargain. The comparison is the core working screen.

Use PRODUCT.md as the detailed locked scope and IDEA_SCOPE.md as the original idea. PLAN.md contains older exclusions that conflict with PRODUCT.md; they must not remove the locked voice capture, shop suggestions, visit order, or bargaining guidance from this design. This document describes the intended V1; it does not claim those screens have been built.

Support two equal entry paths: prepare before visiting shops, or compare offers already collected. Include relevant guidance and questions, Google Maps shop suggestions and suggested visit order, typed notes, voice notes, photos/screenshots, buyer confirmation, comparison, supported bargaining guidance, and recording the purchase. Save and reopen the current purchase. Keep one current purchase per account.

The buyer asks questions, checks products physically, contacts shops, bargains, and buys. The app does not call shops, negotiate on the buyer's behalf, process purchases, or provide after-purchase help. Shop listings do not establish stock or prices. Do not promise a discount, latest models, or live market prices. Sharing and a history dashboard remain outside required V1.

## First screen: exact words and availability

- Name: **Buying companion**.
- Outcome headline: **Choose a product that fits your needs and budget.**
- Supporting words: **Keep shop offers together, see what needs checking, and prepare to bargain before you buy.**
- Entry actions: **Prepare for shop visits** and **Compare existing offers**. Show equally prominent white choice panels with clear labels. Neither entry path is selected initially; the buyer chooses one, revealing one cobalt **Continue** button. Each panel labels a real native radio input in a shared group, with a fieldset and visible legend. Keep the radio controls accessible beneath the panel styling: Tab reaches the group, arrow keys change the choice, and screen readers announce each label and selected state. Do not replace the inputs with clickable containers or hide them with `display: none`.
- Returning-buyer action: **Reopen my purchase**; secondary account link: **Sign in**.
- Boundary note: **You visit the shops and buy directly. Your companion helps you prepare and compare.**

The delivery format is a phone-friendly website. No store-download button or “Get the mobile app” wording. README.md records only account creation and saving/editing one purchase as implemented, with no production publication of that milestone. Until both entry flows work at the deployed destination, the public landing page shows **Preview the buying companion**, leading to a clearly labelled **Design preview — fictional offers; these flows are not available yet**. Preview choices must never imply a working service. A real entry action is enabled only when its destination works. Do not invent a waitlist or download availability.

If illustrating the product, use a straight, readable comparison preview with two fictional offers and a visible unanswered question. Label it **Example comparison — fictional data**. No call progress, approved-shop language, waveforms, simulated outreach, or future-dashboard framing.

## Visual direction

A clear buying worksheet: cool paper, dark text, cobalt actions, yellow buyer requirements, and white evidence rows. Keep prices, inclusions, source references, and missing answers near one another. The interface should be comfortable to scan while standing in a shop. Decoration must not compete with an offer or its caveats.

Use Arial throughout, with the generic sans-serif fallback only if unavailable. No second family for headings, numbers, controls, or previews. The hierarchy is 32px headline, 24px screen/section title, 16px body/inputs, and 14px labels/metadata. Weights are 400 and 700. Use tabular numerals for prices. Do not shrink essential warnings below 14px.

### Colour meanings and evidence labels

- Ink and white/paper: primary text and ordinary evidence surfaces. Quiet Ink: supporting text.
- Cobalt: actions, selected controls, and keyboard focus; it does not indicate trust or active contact with a shop. Deep Cobalt: hover.
- Yellow: buyer-entered needs/budget and unresolved review prompts; always include explanatory text.
- Mint: a limited suitability highlight, accompanied by **Fits your stated needs** and the reasons. It never means a claim was verified or a saving is guaranteed.
- Missing Answer Wash/Ink: **Not provided** for absent data; **Needs checking** for unclear or conflicting data. These are distinct labels even if they share a colour.
- Ledger Line: row/group boundaries, not small-text colour.

Keep three independent facts visible, including on comparison cells:

| Meaning | Exact label | Presentation |
| --- | --- | --- |
| Buyer checked what the app captured | **Buyer-confirmed transcription** | Neutral outlined label, beside the source and confirmation time. Confirms the capture matches the buyer's account, not the truth of a claim. |
| Shop statement lacks independent evidence | **Shopkeeper said; not verified** | Neutral text label beside the relevant statement, even after buyer confirmation. |
| Product suitability | **Fits your stated needs**, **Does not fit your stated needs**, or **Fit needs checking** | Mint only for the first; plain text or missing-answer wash for the others, with reasons and unresolved conditions. |

External product facts require an identifiable source and date. A source link is not a blanket verification badge. Show quote date and validity separately; no validity date means **Validity not provided**. Never substitute colour, a tick, “approved,” or “best deal” for evidence. The same offer can have buyer-confirmed transcription, unverified claims, and uncertain fit at once.

## Layout, spacing, and interaction

Desktop frame: maximum 1240px, with a 1176px inner measure. Forms and confirmation content: maximum 640px. Comparison can use the full inner width. Below 900px, stack columns. Below 600px, use 20px page gutters and full-width primary actions.

Use the 8, 12, 16, 24, and 32px spacing scale. Landing-page sections use exactly 76px vertical padding on desktop and 32px below 600px. Working screens use 32px between major groups, 24px surface padding (16px on phones), 16px between fields, and 8px between a label and its help. There is no 110–120px section rule.

Actions are at least 52px high, radius 12px, and horizontal padding 24px. Primary actions use white on cobalt; secondary actions use ink on white with a visible border. Hover darkens the primary; focus uses a 3px cobalt outline with a white separation so it remains visible on blue surfaces. Do not move buttons on hover. Other touch targets are at least 44px.

Use 16px surface, 14px note, 6px status, and 28px preview-board radii. The preview board is optional and never replaces the real comparison. Thin rules group rows. No rotated evidence sheets, decorative sun, or layered call-board metaphor. A single soft surface shadow is enough: `0 12px 28px -20px rgba(20,36,51,0.3)`.

Navigation names the current purchase, offers a back action, and shows **Save status** and account access. Keep these available on phones. No history dashboard. A comparison table has row/column headers, ₹ amounts and units, a caption, and a labelled horizontal scroll region on phones: **Swipe sideways to compare offers**. Keep the specification column visible while scrolling; source details remain accessible per cell.

Motion is brief feedback for selection, upload, or save. Show real progress only when measurable; otherwise name the operation. Respect reduced motion. Announce loading, errors, and save outcomes to screen readers. Put errors beside fields and in a linked error summary. Support keyboard use, 200% zoom, and readable text contrast. Do not use colour alone for any state.

## Screens and states

### Paths

**Prepare:** Entry → Needs and budget → Guidance and questions → Optional shops and visit order → Capture → Confirm → Compare → Bargaining guidance → Record purchase.

**Existing offers:** Entry → Needs and budget → Capture → Confirm → Compare → Bargaining guidance → Record purchase. Skip education, location, and route planning. Add each shop directly.

Both paths repeat Capture → Confirm for additional shops. Sign in/create account when saving the first shop's information, after useful guidance where applicable. Saved current-purchase information is available through **Reopen my purchase**. The following are required behaviours for implementation, not assertions about today's app.

| Screen | Empty / first use | Loading | Error / recovery | Done / next action | What survives failure |
| --- | --- | --- | --- | --- | --- |
| Entry / reopen | Show the exact promise and two initially unselected path choices; the buyer selects one, then **Continue**. | **Opening your purchase…** when reopening. | **Couldn't open your purchase. Try again.** Offer **Retry**; do not replace the saved purchase with a blank one. | Open the chosen path or last saved purchase; show where to resume. | Existing saved purchase and chosen path. |
| Needs and budget, both paths | Label product, purpose/situation, budget in ₹, and requirements. Example text is a placeholder, not an answer. Action: **Continue**. | **Preparing your questions…** on the prepare path; **Opening offer capture…** on the existing-offer path. | Explain the specific invalid field or generation failure. **Try again** keeps answers editable. | Prepare path: **Review questions**. Existing-offer path: **Add first shop**. | Entered needs, budget, requirements, and path. |
| Guidance and questions, prepare only | If no guidance yet, explain that questions will use the stated needs; **Prepare questions**. | **Preparing questions for your shop visits…**; show needs, not fabricated questions. | **Couldn't prepare your questions.** Offer **Retry** and keep buyer-written questions. | Show relevant specifications, sourced guidance, a consistent question list, and **Add a question**. Next: **Plan visits** or **Add a shop directly**. | Needs and all buyer-added or previously generated questions. |
| Shops and visit order, optional prepare step | Ask for PIN code/location only here. **Find shops**; **Skip and add a shop** remains visible. | **Finding shops…** or **Planning visit order…**; retain selections. | **Couldn't load shop suggestions.** Retry or add a shop manually. No results is a separate state: change location or add a shop. | Show Google Maps source, selected shops and suggested order, with **Listings do not confirm stock or prices**. Next: **Add an offer**. | Location input, selected shops, manual shop details, and last successful order. |
| Capture, both paths | Choose/add shop with optional contact number. Offer **Write a note**, **Add voice note**, **Add photo or screenshot**; show unanswered checklist items. | Each file has its own upload/processing state. **Reading your note…** must not imply it is confirmed. | Failed upload: **Retry upload**. Unreadable file: **Replace file** or **Write a note**. Permission denied: explain how to use another capture method. | Show original sources and **Review captured details**; keep additional attachments available. | Typed notes, completed uploads, and saved offers. Keep failed file selection in the current session when possible; say when it must be reselected after reload. |
| Sign in / create account, at first shop save | **Save your shop information to reopen it later.** Email/password fields; switch between **Create account** and **Sign in**. | **Signing in…**; prevent duplicate submission. | Show an actionable account error; **Try again**. Never clear offer drafts on auth failure. | Return to the interrupted confirmation/save step. | Notes and upload references in the draft; never store passwords. Account failure does not erase earlier saved data. |
| Confirm captured details, each shop | If nothing readable, **Add a clearer source** or **Enter details**. Otherwise review model, specifications, price, quote date, validity and included costs beside their sources. | **Preparing details for review…**; source remains readable. | Flag individual unclear/conflicting fields **Needs checking**; allow edits or **Mark unknown**. A save failure offers **Retry save**. | **Confirm and save offer** adds buyer-confirmation labels. Next: **Add another shop** or **Compare offers**. Unsupported claims stay unverified. | Original sources, buyer edits, unknown markers, and previously saved offers. |
| Comparison, core product | No offers: **Add first shop**. One offer: show fit/gaps and **Add another shop**; no invented second offer. | **Updating your comparison…**; keep previous result visible and labelled **Updating — earlier comparison**. | **Couldn't update the comparison.** Retry; previous comparison stays labelled as earlier. Missing critical data: **Check these details** before final recommendation. | Compare brands/models, specs, total-cost components, quote dates, warranty, installation, service, availability and fit. Explain differences. Next: **Check missing details**, **Add another shop**, or **Review bargaining guidance** when supported. If none fit: **No offer fits your stated needs** and **Add another shop**. | Confirmed offers, sources, requirements, and last successful comparison. |
| Bargaining guidance | Without sufficient comparable, current evidence: **Not enough evidence to suggest a bargaining price.** List missing costs/specs or expired/undated validity; **Check quote details**. | **Preparing bargaining guidance…**; show supporting offers. | **Couldn't prepare bargaining guidance.** Retry or return to comparison. Never fill in a target as a fallback. | Give a suggested target only when justified, its supporting comparable offers, assumptions and suggested questions. **A suggested price is not a guaranteed discount.** Next: **Record purchase** after the buyer buys, or **Back to comparison**. | Offers and last successful guidance; label stale guidance after inputs change. |
| Record purchase | Ask what was bought, shop, exact model and final price paid; no purchase inferred from a recommendation. **Save purchase details**. | **Saving purchase details…**; disable duplicate saves. | **Couldn't save purchase details. Your changes are still here.** **Retry save**. | **Purchase details saved.** Show the buyer's recorded choice and price. Next: **Reopen my purchase** or edit a recording mistake. | Entered purchase details in the draft and last saved record; no checkout or after-purchase workflow. |
| Current purchase / save and reopen | With no saved data, **Start a purchase**. Do not show an empty screen while saved data is loading. | **Loading saved information…** or **Saving changes…**. | **Changes not saved** or **Couldn't load saved information**. **Retry**; retain edits and show last successful save time. | **Saved** only after server confirmation. Resume questions, capture, comparison or recorded purchase at the last saved step; **Edit purchase** updates this one purchase. | Server-saved needs, shops, source attachments, confirmed offers and purchase record. Unsaved edits stay clearly marked. |

### Save and recovery rules

Show **Not saved yet**, **Saving…**, **Saved**, or **Changes not saved** as text. A loading animation or successful upload is not proof the whole offer was saved. Display the last successful save time.

Keep a local recoverable draft of non-password inputs before first save and during failed saves; disclose **Draft on this device; not saved to your account**. Local drafts do not imply cross-device recovery. Browser-selected files and unuploaded recordings are not guaranteed to survive closing the browser: warn before leaving when relevant and explain what needs adding again. Completed sources and confirmed offers belong to the account once the server confirms saving. Keep original sources attached when correcting captured details.

Retry only failed items; do not duplicate successful offers or attachments. Never clear stored information because a load failed. After changed needs/offers, label earlier comparisons and guidance as out of date until recomputed. Critical missing details block a final recommendation, but buyers can still read collected information and add/check another offer.

## Component references

These linked references specify behaviour and structure to borrow. Keep this document's palette, Arial, sizing and radii rather than copying a reference site's identity. No new component library is required.

| Key component | Reference | Take exactly | Ignore exactly |
| --- | --- | --- | --- |
| Entry path choices | [GOV.UK radios](https://design-system.service.gov.uk/components/radios/) | Visible group label and persistent help for each path. No initial selection: the buyer chooses one. Retain real native radio inputs in a shared group beneath the touchable panel styling, with keyboard navigation and screen-reader labels and selected states. | Government wording, font and radio dimensions; use large touchable choice panels. |
| Buttons | [GOV.UK button](https://design-system.service.gov.uk/components/button/) | Action-specific labels, primary/secondary hierarchy and duplicate-submit prevention. | Green palette, square silhouette and reference heights; use 52px/cobalt/12px here. |
| Needs form and confirmation rows | [GOV.UK summary list](https://design-system.service.gov.uk/components/summary-list/) | Aligned label/value rows with explicit change actions. Add source and uncertainty directly beneath each captured value. | Long administrative layouts and treating every row as settled fact. |
| Question list and visit-order list | [GOV.UK task list](https://design-system.service.gov.uk/components/task-list/) | Scanable rows, named next action and visible text state. | “Completed” as a proxy for verified claims or shop approval. Number visit order without implying stock. |
| Capture/upload control | [GOV.UK file upload](https://design-system.service.gov.uk/components/file-upload/) | Labelled file picker and adjacent help/error; preserve keyboard access. Add per-file status and retry. | Desktop-only drop-area emphasis and implying upload equals successful extraction. Voice capture uses explicit start/stop controls and text duration, never call waveforms. |
| Evidence and status labels | [GOV.UK tag](https://design-system.service.gov.uk/components/tag/) | Short readable text states with consistent styling. | Reference colour meanings and badge-only communication; retain the three independent meanings above. |
| Comparison | [GOV.UK table](https://design-system.service.gov.uk/components/table/) | Caption, real header relationships, row rules and aligned numeric amounts. | Narrow simple-table assumption; retain full comparison width, phone scrolling, source access and visible gaps. |
| Recommendation, bargaining and saved-record surface | [GOV.UK summary list](https://design-system.service.gov.uk/components/summary-list/) | Separate named facts and change actions; use distinct rows for reasons, supporting quotes, limitations and price. | A generic success panel that makes uncertain guidance appear approved. |
| Errors and recovery | [GOV.UK error summary](https://design-system.service.gov.uk/components/error-summary/) | Linked error summary plus field-level messages and focus on the error after failed submission. | Generic error wording and clearing entered data. |
| Purchase navigation | [GOV.UK task list](https://design-system.service.gov.uk/components/task-list/) | Labelled stages and readable progress with a clear resume action. | Mandatory linear completion: existing-offer buyers bypass preparation and routing. |

## Review before implementing

Check both entry paths reach capture, confirmation and the same real comparison. Check one offer, missing inclusions, unreadable upload, conflicting model details, expired quotes, no suitable product, failed sign-in, failed save, failed reload and adding another shop. In every case the next action and retained information must be visible.

Use fictional sample data only under an explicit example label. A recommendation must explain fit, not crown the lowest quoted price. Compare known total costs only when inclusions are known; unknown installation or delivery cannot become ₹0. Bargaining guidance must not equate different models merely because some specifications match.

This revision changes the design instructions only. Browser checks and deployment belong to the implementation step; current screens are not evidence that this full design already works.
