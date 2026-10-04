import { convexTest } from "convex-test";
import { expect, test } from "vitest";
import schema from "../convex/schema";
import { api } from "../convex/_generated/api";
const modules = import.meta.glob("../convex/**/*.*s");

test("buyers can save and edit one purchase; other buyers and signed-out visitors cannot access it", async () => {
  const t = convexTest(schema, modules);
  const [aliceId, bobId] = await t.run(async ctx => Promise.all([
    ctx.db.insert("users", { email: "alice@example.test" }),
    ctx.db.insert("users", { email: "bob@example.test" }),
  ]));
  const alice = t.withIdentity({ subject: `${aliceId}|session-a` });
  const bob = t.withIdentity({ subject: `${bobId}|session-b` });
  const id = await alice.mutation(api.purchases.save, { item: " Chimney ", budget: 25000, situation: " Small kitchen " });
  expect(await alice.query(api.purchases.current)).toMatchObject({ _id: id, item: "Chimney", budget: 25000, situation: "Small kitchen" });
  expect(await bob.query(api.purchases.current)).toBeNull();
  expect(await t.query(api.purchases.current)).toBeNull();
  await expect(t.mutation(api.purchases.save, { item: "Chimney", budget: 1, situation: "Kitchen" })).rejects.toThrow("Sign in");
  const updated = await alice.mutation(api.purchases.save, { item: "Chimney", budget: 28000, situation: "Prefer quiet operation" });
  expect(updated).toBe(id);
  expect(await alice.query(api.purchases.current)).toMatchObject({ budget: 28000, situation: "Prefer quiet operation" });
  await bob.mutation(api.purchases.save, { item: "Fridge", budget: 30000, situation: "Family kitchen" });
  expect(await alice.query(api.purchases.current)).toMatchObject({ item: "Chimney", budget: 28000 });
  expect(await bob.query(api.purchases.current)).toMatchObject({ item: "Fridge" });
});

test("invalid or missing requirements cannot overwrite saved details", async () => {
  const t = convexTest(schema, modules);
  const userId = await t.run(ctx => ctx.db.insert("users", { email: "buyer@example.test" }));
  const buyer = t.withIdentity({ subject: `${userId}|session` });
  const valid = { item: "Chimney", budget: 25000, situation: "Small kitchen" };
  await buyer.mutation(api.purchases.save, valid);
  for (const invalid of [{ item: " " }, { budget: 0 }, { budget: -1 }, { budget: 1.234 }, { situation: " " }]) {
    await expect(buyer.mutation(api.purchases.save, { ...valid, ...invalid })).rejects.toThrow();
  }
  expect(await buyer.query(api.purchases.current)).toMatchObject(valid);
});
