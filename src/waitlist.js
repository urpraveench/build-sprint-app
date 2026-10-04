import { ConvexHttpClient } from "convex/browser";
import { makeFunctionReference } from "convex/server";

const client = new ConvexHttpClient(CONVEX_URL);
const form = document.getElementById("waitlist-form");
const status = document.getElementById("waitlist-status");
const button = form.querySelector("button");
form.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!form.reportValidity() || button.disabled) return;
  button.disabled = true;
  status.hidden = true;
  try {
    await client.mutation(makeFunctionReference("waitlist:join"), {
      email: form.elements.email.value,
    });
    form.hidden = true;
    status.textContent = "You're on the list";
  } catch {
    status.textContent = "Couldn't save your email. Please try again.";
    button.disabled = false;
  }
  status.hidden = false;
});
