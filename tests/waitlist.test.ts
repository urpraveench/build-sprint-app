import { convexTest } from "convex-test";
import { makeFunctionReference } from "convex/server";
import { expect, test } from "vitest";
import schema from "../convex/schema";

const modules = import.meta.glob("../convex/**/*.*s");
const join = makeFunctionReference<"mutation", { email: string }, null>("waitlist:join");

test("visitors can join the waitlist; duplicate and invalid emails do not add entries", async () => {
  const t = convexTest(schema, modules);
  await t.mutation(join, { email: " Buyer@Example.test " });
  await t.mutation(join, { email: "buyer@example.test" });
  await expect(t.mutation(join, { email: "invalid" })).rejects.toThrow("valid email");
  const entries = await t.run(ctx => ctx.db.query("waitlist")
    .withIndex("by_email", q => q.eq("email", "buyer@example.test")).take(2));
  expect(entries).toHaveLength(1);
  expect(entries[0].email).toBe("buyer@example.test");
});
