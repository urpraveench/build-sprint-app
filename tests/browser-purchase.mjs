// Run against the local app with Chrome's debug port open:
// node tests/browser-purchase.mjs
import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import { writeFile } from "node:fs/promises";

const url = process.env.APP_TEST_URL || "http://127.0.0.1:5173/app.html";
const debug = process.env.CHROME_DEBUG_URL || "http://127.0.0.1:9223";
const version = await fetch(`${debug}/json/version`).then(r => r.json());
const browser = new WebSocket(version.webSocketDebuggerUrl);
await new Promise(resolve => browser.addEventListener("open", resolve, { once: true }));
let browserId = 0;
const browserPending = new Map();
browser.addEventListener("message", event => { const m = JSON.parse(event.data); if (m.id) { browserPending.get(m.id)?.(m.result); browserPending.delete(m.id); } });
const browserSend = (method, params = {}) => new Promise(resolve => { const id = ++browserId; browserPending.set(id, resolve); browser.send(JSON.stringify({ id, method, params })); });
const { browserContextId } = await browserSend("Target.createBrowserContext");
const { targetId } = await browserSend("Target.createTarget", { url, browserContextId });
const tab = (await fetch(`${debug}/json/list`).then(r => r.json())).find(t => t.id === targetId);
const ws = new WebSocket(tab.webSocketDebuggerUrl);
await new Promise(resolve => ws.addEventListener("open", resolve, { once: true }));
let nextId = 0;
const pending = new Map();
ws.addEventListener("message", event => {
  const message = JSON.parse(event.data);
  if (message.id) { pending.get(message.id)?.(message); pending.delete(message.id); }
  if (message.method === "Page.javascriptDialogOpening") send("Page.handleJavaScriptDialog", { accept: true });
});
const send = (method, params = {}) => new Promise((resolve, reject) => {
  const id = ++nextId;
  pending.set(id, message => message.error ? reject(new Error(message.error.message)) : resolve(message.result));
  ws.send(JSON.stringify({ id, method, params }));
});
const evaluate = async expression => {
  const result = await send("Runtime.evaluate", { expression, returnByValue: true, awaitPromise: true });
  if (result.exceptionDetails) throw new Error(result.exceptionDetails.text);
  return result.result.value;
};
async function waitFor(expression) {
  const deadline = Date.now() + 20000;
  while (Date.now() < deadline) {
    if (await evaluate(`Boolean(${expression})`)) return;
    await new Promise(resolve => setTimeout(resolve, 150));
  }
  throw new Error(`Timed out: ${expression}; screen: ${await evaluate("document.body.innerText")}`);
}
async function click(text) {
  await waitFor(`Array.from(document.querySelectorAll('button')).some(b => b.textContent === ${JSON.stringify(text)} && !b.disabled)`);
  await evaluate(`Array.from(document.querySelectorAll('button')).find(b => b.textContent === ${JSON.stringify(text)}).click()`);
}
async function fill(id, value) {
  await evaluate(`document.getElementById(${JSON.stringify(id)}).focus(); document.getElementById(${JSON.stringify(id)}).value = '';`);
  await send("Input.insertText", { text: String(value) });
}
async function screenshot(name) {
  const { data } = await send("Page.captureScreenshot", { format: "png" });
  await writeFile(`/tmp/${name}.png`, Buffer.from(data, "base64"));
}
const email = `sprint-${randomUUID()}@example.test`;
const password = randomUUID();
try {
  await send("Page.enable"); await send("Runtime.enable");
  await send("Emulation.setDeviceMetricsOverride", { width: 390, height: 844, deviceScaleFactor: 1, mobile: true });
  await waitFor("document.querySelector('#email')");
  await click("Create account");
  await fill("email", email); await fill("password", password); await click("Create account");
  await waitFor("document.querySelector('#item')");
  await fill("item", "Kitchen chimney"); await fill("budget", 25000); await fill("situation", "Small kitchen. Quiet operation and easy cleaning matter most.");
  await screenshot("purchase-mobile-form");
  await click("Save purchase");
  await waitFor("document.querySelector('#saved-title')?.textContent === 'Kitchen chimney'");
  assert.equal(await evaluate("document.body.innerText.includes('25,000')"), true);
  assert.equal(await evaluate("document.documentElement.scrollWidth > innerWidth"), false);
  const loaded = new Promise(resolve => {
    const handler = event => { if (JSON.parse(event.data).method === "Page.loadEventFired") { ws.removeEventListener("message", handler); resolve(); } };
    ws.addEventListener("message", handler);
  });
  await send("Page.reload"); await loaded;
  await waitFor("document.querySelector('#saved-title')?.textContent === 'Kitchen chimney'");
  await click("Edit purchase"); await waitFor("document.querySelector('#budget')");
  await fill("budget", 28000); await click("Save changes");
  await waitFor("document.querySelector('.price')?.textContent.includes('28,000')");
  await click("Sign out"); await waitFor("document.querySelector('#email')");
  await fill("email", email); await fill("password", password); await click("Sign in");
  await waitFor("document.querySelector('.price')?.textContent.includes('28,000')");
  await send("Emulation.setDeviceMetricsOverride", { width: 1440, height: 1000, deviceScaleFactor: 1, mobile: false });
  await screenshot("purchase-desktop-saved");
  assert.equal(await evaluate("document.documentElement.scrollWidth > innerWidth"), false);
  await click("Sign out"); await waitFor("document.querySelector('#email')");
  await click("Create account"); await fill("email", `other-${randomUUID()}@example.test`); await fill("password", randomUUID()); await click("Create account");
  await waitFor("document.querySelector('#item')");
  assert.equal(await evaluate("document.querySelector('#item').value"), "");
  assert.equal(await evaluate("document.body.innerText.includes('Small kitchen.')"), false);
  await click("Sign out"); await waitFor("document.querySelector('#email')");
  console.log("Passed: sign-up, save, reload, edit, sign-out/sign-in, mobile/desktop layout, and second-account privacy.");
} finally { ws.close(); await browserSend("Target.disposeBrowserContext", { browserContextId }); browser.close(); }
