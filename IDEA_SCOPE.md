# IDEA LOCK · Build Sprint

## The idea

A buying companion for one offline purchase: prepare the buyer with the questions that matter, capture notes from each shop, and compare the options against the buyer's needs.

The direction changed because shopkeepers would not quote on the phone. The buyer visits shops themselves; v1 does not call shops.

Why me: Praveen has experience asking relevant questions when buying products and can use a real kitchen-chimney purchase to test the flow.

## GOAL

Help the buyer make an informed choice without forgetting important questions or losing track of what each shop offered.

The improvement: Before a visit, the buyer knows the three or four things that matter for their situation. During visits, they capture comparable details quickly. Afterwards, they can see differences and missing information in one place.

The product helps with preparation and comparison. It does not remove the need to visit shops.

## USER

The first user is Praveen, comparing kitchen chimneys. The flow can support other household appliances, with one item type per purchase.

The trigger: The buyer is about to visit shops for a purchase and needs to understand what to ask, what is included in each price, and which option fits their budget and situation.

Today's path: Ask different questions at different shops, keep scattered notes or photos, and try to remember the details when deciding.

Who they trust: Their own shop notes and photos, a clear comparison, and an explanation that shows its evidence and uncertainty.

Willingness to pay: Not validated for this revised idea. The earlier ₹500 estimate applied to the calling concept and is not an agreed price for this v1.

## PRODUCT

### Before the shop

The user enters the item, budget, and situation, such as intended use, space constraints, and priorities.

AI lists the three or four things that matter most, explains them in plain words, and gives a short set of questions to ask every shop.

### In the shop

The user adds a quick note per shop with:
- Shop name
- Model
- Price
- Warranty
- What is included
- Answers about the important buying factors and any known extra costs

The user can type details or attach a price-tag photo. Details read from a photo must be shown for confirmation or correction. Keep the original photo available for checking.

Incomplete notes can be saved and edited later.

### After the visits

Show a side-by-side comparison table with one column per shop option. Compare model, price, warranty, inclusions, known extra costs, and the buying factors relevant to the user.

Explain which option fits the user's budget and situation, using the recorded details. If missing information could change the choice, give a conditional assessment and explain what to ask next.

Coming back: The buyer can reopen the same purchase, add or correct shop details, and refresh the comparison.

The AI part: Prepare the checklist, read confirmed details from photos, and explain the comparison. Shop information comes from the user's notes and photos.

## TRUST RULES

- Missing information is flagged, never guessed.
- Show **Not provided** for missing details and **Needs checking** for unclear or conflicting details.
- Distinguish general AI advice from recorded shop information.
- Keep shop claims labelled as claims, rather than verified facts.
- Do not treat a listed price as a complete total when inclusions or extra costs are unknown.
- Do not invent unreadable photo details or silently overwrite conflicting notes.
- Explain recommendations using the buyer's stated needs and available evidence.

## V1 BOUNDARIES

V1 covers one purchase: preparation, typed or photo-based shop notes, a comparison table, and an explanation of fit. The experience must work comfortably on a phone during visits.

Shop calling, voice agents, shop discovery, negotiation, WhatsApp catalog requests, checkout, and purchasing are outside v1. A separate history dashboard and managing several purchases at once are also outside this first build.

## VALIDATION

Test the complete flow with Praveen's real kitchen-chimney purchase.

Check whether the checklist helps him ask useful, consistent questions; whether notes are quick enough to capture in a shop; and whether the comparison helps him decide while exposing gaps.

Other testers, willingness to pay, and demand for this revised idea remain unvalidated. Existing alternatives include paper notes, phone notes, photos, spreadsheets, and general AI chat; no competitor research has been completed for this revised idea.

## BUILD CONSTRAINTS

Use Codex for code, GitHub for source control, and Convex for the database, backend, sign-in, photo storage, and static hosting. Any additional service needed for AI or photo reading requires the user's approval before use.

PLAN.md gives the numbered milestones for building this scope.
