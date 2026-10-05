---
name: Buying companion
description: A spoken shopping assistant that gathers offers, negotiates when useful, and privately helps you decide.
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

## 1. Intended experience and scope

Updated October 5, 2026. Design the spoken assistant described in PRODUCT.md, not a form that requires the buyer to document a shopkeeper's answers. IDEA_SCOPE.md explains the idea, PLAN.md sets build order, and README.md / PROGRESS.md record the older development implementation. This is an intended design specification, not a claim that voice, calling or negotiation works today.

The assistant uses a natural-sounding standard voice to ask useful questions and negotiate when appropriate. The buyer listens, inspects the product, can interrupt/take over, and receives private on-screen guidance. Only the buyer accepts or promises to buy. Introduce the assistant's role; no human impersonation or buyer voice cloning.

The interface supports the conversation and the buying decision. The main screen is a compact conversation workspace with immediate control and a short offer/decision summary. The full comparison is a secondary evidence view, not a mandatory worksheet.

## 2. First screen and spoken brief

- Name: **Buying companion**.
- Headline: **Choose a product that fits your needs and budget.**
- Supporting words: **Let your companion ask the shopkeeper, keep the answers together, and help you decide.**
- Main action: **Talk in this shop**. Calling action: **Call a shop**, available only when the calling milestone works. Show **Calling isn't available yet** while unbuilt; do not substitute a fake call.
- Returning action: **Reopen my purchase**; account action: **Sign in**.
- Boundary note: **Your companion can ask and negotiate. Only you can accept a deal or promise to buy.**

The intended entry options are in-person conversation or an explicitly started call, not a required choice between preparation and existing-offer paperwork. Calling can be added after the in-shop milestone without blocking it. Optional preparation, Maps and visit planning do not appear as mandatory stages.

Begin with **Tell me what you're buying**. Collect product, purpose and budget in a short spoken exchange, then ask only material missing preferences, one at a time. Show an editable needs summary; short text corrections are allowed. No long list of specifications, guided spoken checklist, compulsory profile or onboarding tour.

This is a phone-browser website, not a store-download app. Public actions must lead to working destinations. The current landing page is still a design preview; future conversational examples must say **Design preview — fictional conversation; voice and calling are not available yet**. A demo cannot imply a real shop has been contacted or a deal negotiated. Keep README.md's actual implementation status separate from intended copy.

## 3. Visual system

Keep the established Arial, colour palette, spacing and control shapes from the frontmatter. Change the interaction structure, not the visual identity.

Cool Paper `#f1f5f9`, white evidence surfaces and Ink `#142433` make the conversation easy to scan in a shop. Cobalt `#155bd7` marks actions and focus, Yellow `#ffcc4a` marks buyer needs or a private question, and Mint `#c9f0df` marks supported suitability with reasons. Quiet Ink `#506273` is supporting text; Ledger Line `#ccd7e2` separates rows. Missing-answer colours `#fff0ec` / `#a43c24` accompany explicit uncertainty text.

Use Arial throughout: 32px headline, 24px section title, 16px body/input, 14px metadata; weights 400 and 700. Prices use tabular numerals. No essential warning below 14px. No waveform, animated avatar, decorative microphone or colour alone as proof of listening, saving, trust or a discount. Brief motion can reflect actual state changes and respects reduced motion.

Working-screen spacing: 32px between major groups, 24px surface padding (16px on phones), and the 8/12/16/24/32px scale. Desktop frame is at most 1240px with 1176px inner width; brief/correction content at most 640px. Below 900px stack columns; below 600px use 20px gutters and full-width primary actions. Landing sections retain 76px vertical padding on desktop and 32px on phones.

Actions are at least 52px high, radius 12px and 24px horizontal padding. Other touch targets are at least 44px. White text on Cobalt is primary; ink on bordered white is secondary; hover uses Deep Cobalt `#0a3991`. Focus is a 3px cobalt outline with white separation. Keep 16px surface, 14px note, 6px status and 28px optional preview-board radii. One optional soft shadow: `0 12px 28px -20px rgba(20,36,51,0.3)`.

## 4. Conversation workspace

Keep these four groups clear on a phone:

1. **Purchase and shop:** short product/shop identity, current budget summary, account/save access. Expanding shows the full buyer brief.
2. **Real conversation state:** plain text such as **Ready**, **Listening to the shopkeeper**, **Assistant speaking**, **Paused — you have control**, or **Connection lost — assistant stopped**. Show a readable transcript with speaker labels; uncertain attribution says **Speaker needs checking**.
3. **Current offer summary:** model, quoted price, known inclusions and the most important unresolved point. Fill progressively from evidence; **Not provided** until known. Show fuller facts and source excerpts only when expanded.
4. **Persistent controls:** **Pause**, **Take over** and **End conversation**, reachable while scrolling or when a private answer control has focus. Resuming requires the buyer's action. A call also has **End call**.

Use a visible **Listening/recording** distinction. Recording requires the agreed consent/retention behavior before a voice pilot. Starting the session must not imply every sound will be saved forever. Stop/mute indicators must describe actual audio behavior; pausing speech alone must not falsely claim the microphone stopped.

The workspace is for buying a specific product, not an open-ended chat page. Do not make the buyer read a full transcript, maintain a chat history dashboard, or type every shop response to proceed. The conversation should gather relevant facts without asking every possible field.

Private buyer guidance has its own clearly labelled **Only for you** area. It is silent on-screen by default and never part of shopkeeper speech. Example: **The earlier offer may fit better. This model's installation cost is still unclear.** Give the reason and an actionable next step. Avoid unsupported “best deal” language.

When a buyer answer is necessary, show one short question and specific choices, with **I don't know** or **Take over** when applicable. Pause shop-facing speech before a private exchange; do not read private choices or maximum budget aloud. No response does not grant permission. If the buyer cannot privately answer, pause or hand control back.

The intended voice is natural and standard, not an imitation of the buyer. The exact voice and supported languages are not selected; do not invent a voice picker or language catalogue. Text transcripts, short text corrections, visible controls and screen-reader access complement the voice experience without reintroducing a large capture form. If spoken output is unavailable, show an honest failure/takeover state rather than a simulated negotiation.

## 5. Short review and decision help

After a session, lead with a compact offer summary and **Looks right**, **Correct something**, **I don't know**. Show one decision-critical ambiguity at a time. Expand a selected fact only when the buyer chooses to correct or inspect it; edits can be spoken or short text inputs. Never open all specification fields by default.

**Looks right** confirms only the displayed/reviewed content. Hidden details remain unreviewed and visibly distinguishable when expanded. Do not badge an entire offer or transcript as confirmed from one tap on a partial summary.

After two offers, show a short private decision summary: which option may fit, why, what differs, and the most important unanswered question. Suggest checking or returning to a previous shop when supported. If facts are insufficient, explain what prevents a final recommendation while letting the buyer read the partial comparison and continue.

Negotiation is part of the live conversation when useful, not a compulsory next screen. Show its actual reason, for example **Asking about installation because the other quote includes it** only when that evidence exists. No scripted rule that shop one only enquires and shop two always bargains. The assistant can ask about price flexibility without claiming an unsupported target.

Keep original quoted terms and negotiated changes separately visible, with time/source references. Do not display an achieved discount or an accepted deal merely because a new price was mentioned. No **Accept deal**, **Book**, **Buy now**, checkout or automated commitment action. If the shopkeeper asks to finalize, show **Your decision — the assistant cannot accept for you** and return control.

The optional full comparison retains real table row/column headers, caption, ₹ amounts and units, quote dates/validity and source access per cell. On phones label the scroll region **Swipe sideways to compare offers**, keep the detail column visible, and prevent page-wide overflow. Save the budget/offer versions used for the result. An earlier result uses those earlier inputs and is labelled **Out of date** after changes.

## 6. Evidence, colour meanings and saves

| Meaning | Exact label | Behavior |
| --- | --- | --- |
| Fact not present | **Not provided** | Never fill it from guesswork; unknown costs never become zero. |
| Conflicting or unclear fact | **Needs checking** | Link the uncertainty to the source and one useful follow-up. |
| Buyer reviewed particular captured details | **Buyer-confirmed transcription** | Neutral label by those facts, with time/source; unreviewed facts do not inherit it. |
| Unsupported shop statement | **Shopkeeper said; not verified** | Remains visible after confirmation and negotiation. |
| Product suitability | **Fits your stated needs**, **Does not fit your stated needs**, **Fit needs checking** | Reasons are required; Mint only for supported fit, not verification or a guaranteed saving. |
| No supported numerical bargaining target | **Not enough evidence to suggest a bargaining price** | Do not prevent ordinary questions about price flexibility or inclusions. |
| Missing quote expiry | **Validity not provided** | Keep session/quote time separate; do not infer validity. |

External product facts need an identifiable source and date. Keep original permitted audio/transcript references and buyer corrections. Allow access to existing saved notes/photos during migration; do not require new uploads or erase old offers.

Show **Not saved yet**, **Saving…**, **Saved**, or **Changes not saved** and the last successful save time. **Saved** requires Convex confirmation; a completed conversation, a transcript or a successful audio upload alone is not a saved offer. Device drafts say **Draft on this device; not saved to your account**. Never store passwords in them.

Sign in at the first account save during a natural pause, retaining the draft and returning to the interrupted review. Do not interpose account forms while the shopkeeper is answering. Unsaved audio recovery, retention and deletion are unresolved product/provider dependencies; explain what is actually retained and what may need repeating before a pilot. Never claim unsent audio survives closing the browser unless verified.

Retry only failed work without duplicate calls, sessions, sources or offers. Never erase saved information because loading failed. Changed needs/terms/corrections invalidate earlier private guidance, comparisons and numerical targets.

## 7. States and recovery

| State | What the buyer sees / does | What remains |
| --- | --- | --- |
| No microphone permission | Explain why it is needed; offer permission retry or buyer takeover. Do not fake a listening state. | Buyer brief and saved purchase. |
| Shopkeeper declines participation | Stop the assistant session; explain that the buyer can conduct the conversation themselves. Do not covertly capture audio. | Existing offers; any permitted earlier evidence. |
| Unclear audio / speaker | **I couldn't hear that clearly** or **Speaker needs checking**; one repeat/clarification request or buyer correction. | Original permitted source and already understood facts; uncertainty stays visible. |
| Buyer interruption | Stop shop-facing speech promptly; **Paused — you have control**; **Resume assistant** only on buyer action. | Captured information and current negotiation terms. |
| Private answer needed | One **Only for you** question; explicit pause/answer/takeover controls. | Shop context and previous offers; no private text spoken aloud. |
| Connection/provider failure | **Connection lost — assistant stopped** or specific reading/speech failure; offer **Retry** or **Take over**. No automatic resumption, fake reply or assumed call outcome. | Earlier saved evidence and supported recovery draft. |
| Session limit reached | Explain which session stopped and offer takeover. No invented completion or silent new paid session. | Captured/saved data; actual state. |
| Sign-in/save failure | **Your offer isn't saved yet**; retry at the review screen. | Non-password draft and existing saved data. |
| Partial offer | Save a short summary with missing facts; ask only useful follow-ups. | Evidence and unanswered details; no blocked “complete all fields” gate. |
| Comparison updating/failed | Keep the previous result with its earlier inputs, marked **Updating — earlier comparison** or **Out of date**; retry. | Offers and last successful comparison. |
| Neither offer fits | **No offer fits your stated needs** with reasons; continue to another shop or check a material gap. | Both offers; no invented winner. |
| Call unanswered | **No answer**; **Talk in this shop** and buyer-requested **Try call again** only when real calling exists. | Buyer brief and shop contact; no fictional offer or automatic redial. |
| Reopen fails | **Couldn't load saved information** and **Retry**. | Saved purchase; no replacement blank purchase. |
| Human purchase record | Brief confirmation of actual model/shop/final price after the buyer buys; retry failed save. | Previous offers and last saved record; no inferred acceptance. |

## 8. Accessibility and verification

All controls have visible labels, keyboard access and clear focus. Announce state changes/errors/saves without making a screen reader broadcast private advice during shop-facing speech. Provide text equivalents and a controlled way to review privately. Support 200% zoom, contrast, reduced motion and one-handed use. Use linked error summaries and field messages for the few correction inputs, not a full-form validation wall.

Before claiming the conversational milestone works, check an actual phone for microphone/speaker behavior, noise, interruptions, private advice leakage, permission refusal, shopkeeper refusal, call no-answer/disconnect, unclear or conflicting models, unknown costs, stale quotes, failed save/reopen and account privacy. Verify that **Looks right** does not confirm hidden details, that negotiation never creates acceptance, and that the buyer does not have to fill a form to continue.

These are design requirements for future implementation. This revision changes documentation only; it does not certify browser voice support, pick a provider, add screens or publish the app.
