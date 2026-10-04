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

## 7. Milestones

Each checkpoint has a result that can be demonstrated in about ten seconds. The manual buyer test stays in section 6.

1. I can add two shop offers and compare them. I enter needs and budget, upload existing notes or photos, confirm captured details, and see a comparison with sources and missing information marked.
2. I can add another shop. Its offer updates the comparison without losing earlier information.
3. I can prepare for shop visits. I receive guidance and consistent questions, and can add my own.
4. I can select shops and see a suggested visit order. Suggestions come from Google Maps near my chosen location.
5. I can get bargaining guidance. It uses comparable quotes and says when evidence is insufficient to suggest a price.
6. I can record my purchase. I save what I bought and what I paid.
7. I can reopen the app and find my saved information.

## Outside v1

Shop calling, voice agents, shop discovery, negotiation, WhatsApp catalog requests, checkout, and purchasing are outside v1. A separate history dashboard and managing several purchases at once are also outside this first build.

## Build constraints

Use Codex for code, GitHub for source control, and Convex for the database, backend, sign-in, photo storage, and static hosting. Any additional service needed for AI or photo reading requires the user's approval before use.

This planning change writes no application code and does not deploy the page.
