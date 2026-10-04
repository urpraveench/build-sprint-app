# V1 Plan: Buying Companion for One Purchase

## Purpose

Help a buyer prepare for shop visits, collect comparable notes, and choose an option that fits their budget and situation.

The first user is Praveen, comparing kitchen chimneys. The flow can support other household appliances, but each purchase compares one item type. The user visits shops and asks the questions themselves.

This plan replaces the calling-based v1 and follows the updated buying companion scope in IDEA_SCOPE.md.

## Core flow

Before the shop, the user enters the item, budget, and situation. AI lists the three or four things that matter most and the questions to ask every shop.

In the shop, the user adds a quick note per shop with price, model, warranty, and what is included, either typed or from a price-tag photo.

After the visits, a side-by-side table flags missing information and explains which option fits what the user asked for.

## Rules throughout v1

- Missing information is flagged, never guessed. Show **Not provided** for absent details and **Needs checking** for unclear or conflicting details.
- Keep notes and photos as the source of shop information. Distinguish AI buying advice from recorded shop details.
- A listed price is not a final total unless its inclusions are known. Keep currency, units, and known extra costs visible.
- Explain recommendations using the user's needs and recorded details. If essential information is missing, explain what needs checking before choosing.
- Make the experience comfortable to use on a phone during a shop visit.

## Numbered milestones in build order

### 1. Create and save one purchase

**Status:** Built and checked locally against the development Convex backend. See README.md for the checking steps. Production publishing remains a later milestone.

Build the opening screen for item, budget, and situation, including intended use, constraints, and priorities. Ask a short follow-up only when needed for useful advice.

Save the purchase in Convex so the user can return to it. Use Convex Auth for sign-in so saved purchases, notes, and photos belong to the buyer and are accessible only to them.

**Done when:** A user can create, reopen, and edit a purchase without losing it; another user cannot access it.

### 2. Prepare the shop checklist

Use AI to identify three or four important buying factors for the item and situation. Explain them in plain words and give a short set of questions to ask every shop, including model, price, warranty, and what the price includes.

Save the checklist with the purchase so each visit follows the same questions. General advice must not claim facts about a particular shop or model.

**Done when:** A kitchen-chimney buyer receives a short, relevant checklist they can use on their phone across shops.

### 3. Capture typed shop notes

Add a quick form for shop name, model, price, warranty, and what is included. Allow notes for the checklist's buying factors and any extra costs mentioned by the shop.

Allow incomplete notes, adding another shop, and editing earlier entries. Missing details must not block saving.

**Done when:** Notes from multiple shops can be saved and reopened; an unknown warranty or installation cost stays missing.

### 4. Capture a price-tag photo

Let the user attach a price-tag photo to a shop note, stored privately in Convex. AI extracts only readable details and shows them for the user to confirm or correct before adding them to the note.

Keep the original photo available. Flag unreadable text and conflicts with existing notes rather than silently overwriting them. If extraction fails, retain the photo and allow typed entry.

**Done when:** A clear photo supplies confirmed details; a blurry or incomplete photo produces visible gaps instead of invented values.

### 5. Build the side-by-side comparison table

Show one column per shop option and rows for model, price, warranty, inclusions, known extra costs, and the three or four buying factors. Keep the user's budget and priorities visible.

Flag missing information, unclear inclusions, and conflicting details. Calculate a total only when all required costs are known; otherwise label it incomplete. Make the table usable on a phone and link each option to its note and photo.

**Done when:** Two or more options can be compared side by side, with every unknown visible.

### 6. Explain which option fits

Add a short AI assessment tied to the user's budget, situation, and priorities. Explain each option's relevant strengths and tradeoffs using saved information.

When the evidence supports a preferred option, explain why it fits. When missing details could change the choice, give a conditional assessment and list what to ask next. Let the user update notes and refresh the comparison.

**Done when:** The assessment explains a fit without inventing specifications, treating shop claims as verified facts, or hiding uncertainty.

### 7. Check the whole flow and publish

Walk through one real purchase: enter requirements, use the checklist, record multiple shops, confirm a photo, and review the table and assessment. Check incomplete notes, unreadable photos, failed AI requests, saving and reopening, and access to another user's data.

Update the landing page to explain the buying companion and remove calling promises. Describe availability accurately. Save working milestones in git, publish through Convex static hosting using `npm run deploy`, and check the live page on a phone-sized screen.

**Done when:** The complete flow works with real shop notes, missing information stays flagged, and the published page describes the actual product.

## Outside v1

Shop calling, voice agents, shop discovery, negotiation, WhatsApp catalog requests, checkout, and purchasing are outside v1. A separate history dashboard and managing several purchases at once are also outside this first build.

## Build constraints

Use Codex for code, GitHub for source control, and Convex for the database, backend, sign-in, photo storage, and static hosting. Any additional service needed for AI or photo reading requires the user's approval before use.

This planning change writes no application code and does not deploy the page.
