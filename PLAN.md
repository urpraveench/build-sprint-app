# V1 Plan: Household Appliance Comparison Assistant

## First user and purpose

The first user is Praveen, comparing kitchen chimneys before purchasing. The product saves the time spent visiting or calling shops and collecting information by gathering comparable answers in one place.

V1 also supports household electronic appliances needed for a new house, including refrigerators and washing machines. Each comparison covers one appliance type.

## First screen and user flow

The first screen is a chat window with the question:

> What do you want to buy?

A text box lets the user type the product and their details.

The chat collects the user's area and product requirements, asking for missing details as needed. It also asks for the WhatsApp number where shops should send catalogs.

The assistant finds nearby shops and presents their names and phone numbers. The user approves up to five shops before any calls begin.

The voice agent calls the approved shops one by one, asks the five questions below, and follows up on missing details. The user receives call results and a comparison table.

## Five questions asked of every shop

1. **Models, features, and catalog:** What are your latest models and their features? Can you send the product catalog or specification sheet to the user's provided WhatsApp number?
2. **Warranty and service:** What warranty and service does each model include?
3. **Maintenance and running details:** Which model needs the least maintenance, and what are its noise level in decibels and power consumption?
4. **Installation or delivery:** What does installation cost, and what is the earliest installation date? Where installation does not apply, ask about delivery cost and date.
5. **Final offer:** What is your final offer, including the product and installation or delivery?

Adapt the wording to the appliance while keeping the same five comparison categories. Ask follow-up questions when a shop leaves a detail unanswered. Record maintenance claims as shop claims rather than treating them as verified facts.

## Catalogs through WhatsApp

The agent requests that shops send catalogs directly to the WhatsApp number supplied by the user. Record whether each shop agreed to send one.

Catalogs help the user check model names, features, and specifications against the call answers. An agreement to send a catalog does not mean it has been received.

Automatic WhatsApp receipt, catalog reading, and attachment handling are not yet agreed implementation requirements. The agreed v1 requirement is to request catalogs and record the shop's response.

## Comparison table

Show one row for each model offered by each shop, with these columns:

- Shop name and phone number
- Model
- Features
- Warranty and service
- Maintenance requirements
- Noise level in decibels
- Power consumption
- Installation or delivery cost
- Earliest installation or delivery date
- Final total price, including installation or delivery
- Catalog request status

Show **Not provided** for missing answers. Flag unclear answers for checking and never invent values. Keep units and price inclusions visible so the user can compare accurately.

## Call failures and saved results

Check phone numbers before calling. Show the outcome of each call, including unanswered or failed calls, and let the user retry failed calls.

Save completed results so a later failed call does not erase earlier answers. Keep partial results visible with missing details marked.

## V1 boundaries

V1 covers collecting requirements, finding and approving shops, calling them, requesting catalogs, and comparing their offers.

Negotiation and purchasing are outside v1. The first user makes the purchase decision using the comparison and catalogs.

## Before building

Praveen will run a 30-minute test with a real shop to check whether shopkeepers will answer these questions from an AI assistant. Include the request to send a catalog through WhatsApp.

The main assumption to test is that shops will participate and provide enough comparable details to save the user time.

## Open details

- The first three testers beyond Praveen have not been selected.
- The starting area and languages for calls have not been selected.
- The calling service and the method for finding shops require investigation before implementation.
- Automatic use of WhatsApp catalogs, if wanted, needs a separate decision.

## Build constraints

No code was written during this planning session. Future implementation uses the project's fixed stack: Codex for code, GitHub for source control, and Convex for the database, backend, sign-in, and static hosting. Any additional service needed for calls, shop discovery, or WhatsApp requires the user's approval before use.
