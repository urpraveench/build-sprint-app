# Idea scope: Buying companion

Updated October 5, 2026 from the builder's agreed conversational direction. PRODUCT.md owns detailed scope, DESIGN.md owns intended interaction, PLAN.md owns build order, and PROGRESS.md / README.md describe what exists today.

## The idea

A spoken buying assistant for offline shopping that asks shopkeepers useful questions, remembers their offers, negotiates when appropriate, and privately helps the buyer decide. It speaks through the buyer's phone in the shop, using a natural-sounding standard voice. Intended shop calling comes later in the build order; an unanswered call offers the in-shop conversation as a fallback.

The assistant gathers information and negotiates. Only the buyer accepts a deal or promises to buy.

## The person and the problem

The first buyer is Praveen shopping for a kitchen chimney. Buyers comparing costly household products across offline shops must ask unfamiliar questions, remember changing terms, and decide between different models and inclusions.

The builder's original experience: collecting photos and highlighted notes still left too little comparable information. The builder rejected the current long confirmation form because it transfers the information work back to the buyer. This is product feedback, not a measured buyer study.

The job: help me get reliable-enough information to decide what suits my needs, without making me conduct and document every enquiry myself. Saving time or money is a hoped-for result, not a guaranteed outcome.

## The experience

1. Tell the assistant what I want, my budget, and what matters. It asks one necessary question at a time.
2. Let it talk to the shopkeeper while I listen and inspect the product. I can interrupt, pause, stop, or take over.
3. Let it remember the offer and its original conversation evidence. Review a short summary; correct only a misunderstood or important detail.
4. At another shop, let it use earlier evidence to ask better questions, compare differences, and negotiate when justified.
5. Get private on-screen guidance about fit, costs, trade-offs, missing facts, and whether an earlier shop may be preferable.
6. Choose myself. The assistant never accepts, reserves, orders, pays, or promises to buy.

A first shop may need information gathering only. A later shop may need questions, bargaining, or a private check with me. Shop number never decides the behavior.

## Voice and control

Voice is the intended information-capture method; typed notes, photo uploads, and a specification form are not required steps in the new V1. Short on-screen controls, corrections and a text equivalent for access needs do not turn it back into a form. Existing notes/photos and saved offers remain accessible during any future transition.

Use a standard voice that sounds natural; do not clone the buyer's voice or pretend to be a human buyer. Introduce the assistant's role to the shopkeeper. Private buyer advice must not be spoken to the shopkeeper.

The assistant may negotiate without another approval when comparable current evidence and known buyer preferences support it. It asks the buyer privately if preferences or uncertain terms could change the decision. No invented comparison price, fabricated competing offer, or commitment.

## Scope and what is not decided

Intended V1 includes in-shop spoken enquiry, voice capture, short confirmation, saved offers/comparisons, situational negotiation, private advice, buyer takeover, authorized calls to chosen shops with an unanswered-call fallback, and recording the buyer's eventual purchase. One current purchase per account.

Checkout, buying through the app, accepting deals, voice cloning, after-purchase help, simultaneous purchases, and a history dashboard remain outside V1. Sharing and previously discussed Maps/visit planning are parked optional work, not requirements for the first conversation milestone.

The website, GitHub source control, and Convex backend/auth/storage/hosting remain fixed. Voice/calling providers, voice model, language support, recording retention and paid-service costs have not been selected or approved. The existing OpenAI note/photo extraction model is not evidence of a working voice assistant.

## Evidence and the next test

No structured buyer test has happened. Willingness to pay, the earlier 10% savings illustration, market size and competitor distinctions were hypotheses; do not use them as validated claims.

Next, rehearse one two-shop conversation with clearly disclosed human role-play. Check whether questions produce enough evidence, private advice helps a decision, and the buyer can interrupt without filling a form. PRODUCT.md specifies the test and the boundaries. This documentation update does not build or publish the new experience.
