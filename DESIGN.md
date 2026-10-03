---
name: Shop calls, sorted.
description: A buyer's comparison brief brought to life through a clear cobalt call board.
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
  display:
    fontFamily: "Georgia, Times New Roman, serif"
    fontSize: "clamp(3.4rem, 5.7vw, 5.8rem)"
    fontWeight: 700
    lineHeight: 0.98
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Georgia, Times New Roman, serif"
    fontSize: "clamp(2.4rem, 4vw, 4.3rem)"
    fontWeight: 700
    lineHeight: 1.06
    letterSpacing: "-0.035em"
  title:
    fontFamily: "Avenir Next, Avenir, Segoe UI, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 700
    lineHeight: 1.55
    letterSpacing: "-0.015em"
  body:
    fontFamily: "Avenir Next, Avenir, Segoe UI, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: "normal"
  label:
    fontFamily: "Avenir Next, Avenir, Segoe UI, sans-serif"
    fontSize: "0.74rem"
    fontWeight: 750
    lineHeight: 1.5
    letterSpacing: "0.04em"
rounded:
  status: "6px"
  action: "12px"
  note: "14px"
  surface: "16px"
  board: "28px"
  pill: "999px"
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
    typography: "{typography.body}"
    rounded: "{rounded.action}"
    padding: "0 24px"
    height: "52px"
  button-primary-hover:
    backgroundColor: "{colors.cobalt-deep}"
    textColor: "{colors.white}"
    rounded: "{rounded.action}"
    padding: "0 24px"
    height: "52px"
  button-light:
    backgroundColor: "{colors.sun}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.action}"
    padding: "0 24px"
    height: "52px"
  call-board:
    backgroundColor: "{colors.cobalt}"
    textColor: "{colors.white}"
    rounded: "{rounded.board}"
    padding: "34px"
  comparison-table:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.surface}"
---

# Design System: Shop calls, sorted.

## Overview

**Creative North Star: "The Cobalt Call Board"**

The interface turns a buyer's comparison brief into something visible and active. It pairs an editorial, trustworthy reading voice with practical controls and structured data, so the experience feels like a clear consumer guide that has begun doing the legwork itself.

The cobalt call board is the signature expression: a saturated working surface holding a slightly rotated yellow buying brief, an orderly white shop list, and a mint result card. Away from that board, generous paper space, thin rules, and crisp tables keep the product calm, factual, and easy to audit.

**Key Characteristics:**
- Editorial headlines paired with direct, compact interface text.
- Cobalt work surfaces with yellow input notes and mint confirmed outcomes.
- Open page rhythm that tightens only where comparison requires density.
- Realistic sample data, visible gaps, and plain labels that preserve buyer control.
- Motion reserved for the active call waveform and small interaction feedback.

## Colors

The palette feels like a useful consumer brief: dark ink and cool paper establish trust, while cobalt signals active work, yellow marks the buyer's input, and mint marks confirmed value.

### Primary
- **Working Cobalt** (`cobalt`): Main actions, active calling states, the call board, and the closing action panel.
- **Deep Cobalt** (`cobalt-deep`): Hovered primary actions and small supporting accents that need stronger contrast.

### Secondary
- **Brief Yellow** (`sun`): The buyer's request note, keyboard focus, text selection, and the light call-to-action button.
- **Result Mint** (`mint`): Confirmed outcomes, favorable comparison cells, and agreed catalog states.

### Neutral
- **Buyer Ink** (`ink`): Primary text, strong borders, and the comparison table header.
- **Quiet Ink** (`ink-soft`): Explanations, metadata, secondary navigation, and supporting table text.
- **Cool Paper** (`paper`): The main page canvas.
- **Reading White** (`white`): Content surfaces, the shop list, and the comparison table.
- **Ledger Line** (`line`): Structural dividers that explain sequences, rows, and groups.
- **Missing Answer Wash** (`missing-soft`): Background for unavailable information.
- **Missing Answer Ink** (`missing-ink`): Text for unavailable information.

### Named Rules

**The Working Blue Rule.** Cobalt belongs to work in progress and strong actions; it should remain concentrated enough that the call board is the first screen's visual anchor.

**The Evidence Color Rule.** Yellow identifies what the buyer supplied, mint identifies a confirmed or favorable result, and the missing-answer pair identifies a gap. Do not swap these meanings for decoration.

## Typography

**Display Font:** Georgia (with Times New Roman and serif fallbacks)  
**Body Font:** Avenir Next (with Avenir, Segoe UI, and sans-serif fallbacks)

**Character:** Georgia gives promises and section headings the familiar authority of a buying guide. Avenir Next keeps controls, explanations, shop states, and comparison data contemporary and quick to scan.

### Hierarchy
- **Display** (700, fluid display scale, 0.98 line-height): Reserved for the first-screen promise, with tight tracking and compact line spacing.
- **Headline** (700, fluid section scale, 1.06 line-height): Used for major section statements and the closing message.
- **Title** (700, compact title scale, 1.55 line-height): Used for process steps and similarly weighted subheads.
- **Body** (400, base scale, 1.55 line-height): Used for explanations and comparison content; lead paragraphs may loosen to 1.7.
- **Label** (750, compact label scale, 0.04em tracking): Used for board labels, statuses, and compact metadata.

### Named Rules

**The Two-Voice Rule.** Georgia makes the promise; the sans-serif system voice explains the mechanism and records the evidence.

## Layout

The page uses a centered desktop frame up to 1240px, with most content aligned to a 1176px inner measure. The first screen is a two-column composition: the promise occupies the slightly narrower left column and the call board occupies the right. Later sections alternate between broad reading space and denser evidence, culminating in a full comparison table.

Section spacing is generous, generally around 110-120px on desktop. Thin horizontal rules organize steps and control points without turning them into detached cards. At 900px the hero and control sections become single-column layouts. At 600px, outer gutters reduce to 20px, actions become full width, the call board recomposes its layers, and the comparison table keeps its useful width inside a clearly labelled horizontal scroller.

**The Brief-to-Ledger Rule.** Start spacious while explaining the request and process, then tighten the layout when offers need row-by-row comparison.

## Elevation & Depth

The system is flat by default and introduces depth only where it explains a working layer. The call board, request note, shop list, result card, primary action, and comparison table use soft, low-spread shadows. Rotation on the yellow request and mint result adds a physical-note quality without making the page playful or messy.

### Shadow Vocabulary
- **Board lift** (`0 24px 55px -30px rgba(20, 36, 51, 0.45)`): Raises the complete call workflow above the paper canvas.
- **Action lift** (`0 12px 24px -14px rgba(21, 91, 215, 0.85)`): Gives the primary action a compact cobalt glow; hover increases the lift.
- **Paper lift** (`0 14px 28px -20px rgba(0, 0, 0, 0.5)`): Separates the buyer's brief from the board beneath it.
- **Table lift** (`0 24px 54px -36px rgba(20, 36, 51, 0.55)`): Keeps the dense comparison readable as one contained object.

**The Layer-With-Meaning Rule.** Use shadow or rotation only for a sheet, board, or action that sits above another surface in the user's mental model.

## Shapes

Large working panels use generous 28px corners, ordinary containers use 14-16px corners, actions use 12px corners, and compact statuses use 6px corners. Pills are reserved for small standalone labels and the outlined header action. Circular forms identify step numbers, waiting states, and the board's oversized decorative sun.

Borders are thin and structural. They divide rows, sequences, and actions; they are not ornamental frames. The two slightly rotated evidence notes are the only deliberately irregular silhouettes.

## Components

### Buttons
- **Shape:** Firm, gently rounded actions using the action radius and a minimum height of 52px.
- **Primary:** White text on Working Cobalt with horizontal action padding and a compact blue lift.
- **Hover / Focus:** Hover deepens the cobalt, raises the action by 2px, and increases its shadow. Keyboard focus uses a 3px Brief Yellow outline with a 4px offset.
- **Light:** Buyer Ink on Brief Yellow, used only against a cobalt panel; hover lightens the yellow.
- **Header action:** A compact outlined pill that fills with Buyer Ink on hover.

### Chips
- **Style:** Small pills or compact rounded labels with dense sans-serif text. Outlined pills label sample data; filled mint and missing-answer chips carry semantic status.
- **State:** Status colors keep their fixed meanings from the Evidence Color Rule.

### Cards / Containers
- **Corner Style:** Large for the cobalt board, medium for its internal evidence sheets and list.
- **Background:** Cobalt for active work, yellow for the request, white for shop answers, and mint for confirmed value.
- **Shadow Strategy:** Each nested layer receives less visual weight than the board that contains it.
- **Border:** Internal shop rows use quiet dividers instead of individual card outlines.
- **Internal Padding:** 34px on the desktop call board, reducing to 20px on small screens; inner sheets use 16-22px.

### Navigation
- **Style:** A three-part desktop header balances the wordmark, two quiet anchor links, and an outlined action. Navigation text uses compact, semibold sans-serif type; hover changes the links to cobalt.
- **Mobile:** The middle navigation links disappear below 900px, leaving the brand and action visible.

### Call Board

The signature call board shows one request becoming comparable shop answers. Keep the buyer's brief, shop progress, and early result visibly connected inside one cobalt field. Only the active shop row animates, using four short waveform bars; reduced-motion settings collapse that animation.

### Comparison Table

The table uses an ink header, a white body, tabular price numerals, and thin row rules. Favorable results may receive a pale mint cell and a mint chip. Missing information must appear as a warm missing-answer label reading “Not provided”; never fill or visually hide an absent answer.

## Do's and Don'ts

### Do:
- **Do** make the cobalt call board the memorable mechanism when showing how a request moves through approved shops.
- **Do** keep sample content realistic and visibly labelled as illustrative or fictional.
- **Do** use spacing and thin rules to show relationships before adding another container.
- **Do** keep approval, missing information, units, and price inclusions visible beside the relevant evidence.
- **Do** preserve a useful table width on mobile and explain that it scrolls sideways.

### Don't:
- **Don't** use yellow, mint, or missing-answer colors as interchangeable decoration; each color has a fixed information role.
- **Don't** turn every section or process step into a floating card.
- **Don't** add continuous ambient motion; motion belongs to the active call waveform and brief interaction feedback.
- **Don't** invent a missing shop answer or imply that the assistant made the buying decision.

## Mobile-app landing-page update

Preserve cobalt, yellow, mint, and editorial typography. Replace the desktop call board with an accessible HTML phone preview, explicitly labelled as a concept with fictional data. The primary action is Get the mobile app, leading to the availability section. Keep the comparison table as the example of a planned companion dashboard.
