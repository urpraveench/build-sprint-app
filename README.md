# Buying companion

Milestone 1 is available at `/app.html`: email/password sign-up and sign-in, one saved purchase per account, and editing/reopening that purchase. Checklist generation, shop notes, photos, and comparison are later milestones.

## Run locally

From `/Users/praveen/build-sprint-app`:

```sh
npm install
npx convex dev --once
npm run dev
```

Open http://127.0.0.1:5173/app.html. The existing landing page remains at `/`.

The frontend reads `CONVEX_URL` from the ignored `.env.local` file. Deployment builds use the production URL supplied by Convex static hosting. The development backend has Convex Auth keys configured; another deployment needs its own `JWT_PRIVATE_KEY` and `JWKS` before sign-in will work. Never commit keys or environment files.

## Check milestone 1

1. Choose **Create account** and enter an email and a password of at least eight characters.
2. Enter an item, budget, and situation, then choose **Save purchase**.
3. Reload the page and confirm the saved details are present.
4. Choose **Edit purchase**, change the budget or situation, and save.
5. Sign out, then sign back in. Confirm your changes remain.
6. Sign out and create a different account. It should open an empty purchase form.

## Verification

`npm test` checks purchase ownership and validation, existing landing-page keyboard navigation, backend types, and the frontend build.

`node tests/browser-purchase.mjs` checks the actual sign-up/save/reopen/edit flow and second-account privacy in isolated browser sessions. It needs Chrome running with a debug port at `http://127.0.0.1:9223` and the local app running. It creates clearly named test accounts in the development deployment. Set `APP_TEST_URL` to test a different frontend connected to a suitably configured backend.

## Current decisions and limits

- Phone-friendly website and email/password sign-in were confirmed by the builder.
- Budgets use Indian rupees, matching the first buyer and scope examples.
- Each account has one saved purchase; editing updates that purchase.
- Item, positive budget, and situation are required. Situation is one text field covering use, constraints, and priorities.
- Email verification and password recovery are not configured. No email service has been added.
- There is no AI advice in milestone 1, so no follow-up questions are generated yet.
- The backend is on the existing development Convex deployment. This milestone has not been published to the production website.

## Milestone 1 visual brief

The purchase screen is a task-focused extension of the existing visual system: white form on Cool Paper, Buyer Ink text, Working Cobalt actions, Georgia headings, and Avenir/system sans for fields. Labels and fields stack on phones; the desktop form stays narrow. The key states are sign-in, first purchase, saving, saved purchase, editing, and errors. DESIGN.md and the original landing-page design remain unchanged.
