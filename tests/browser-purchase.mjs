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
async function reload() {
  const loaded = new Promise(resolve => {
    const handler = event => { if (JSON.parse(event.data).method === "Page.loadEventFired") { ws.removeEventListener("message", handler); resolve(); } };
    ws.addEventListener("message", handler);
  });
  await send("Page.reload"); await loaded;
}
async function screenshot(name) {
  const { data } = await send("Page.captureScreenshot", { format: "png" });
  await writeFile(`/tmp/${name}.png`, Buffer.from(data, "base64"));
}
const email = `sprint-${randomUUID()}@example.test`;
const password = randomUUID();
try {
  for (const path of ["/.env.local", "/.git/config", "/convex/schema.ts"]) assert.equal((await fetch(new URL(path, url))).status, 404);
  await send("Page.enable"); await send("Runtime.enable");
  await send("Emulation.setDeviceMetricsOverride", { width: 390, height: 844, deviceScaleFactor: 1, mobile: true });
  await click("Sign in");
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
  // The milestone's core action: two confirmed offers and a saved comparison.
  await click("Add shop 1");
  await fill("shop", "Example shop A"); await fill("note", "Fictional note: Brand A model C60, price Rs 22000. Installation not provided.");
  // Upload a tiny fictional image to check actual Convex file storage.
  const photoPath = "/tmp/buying-companion-fictional-photo.png";
  const fictionalImage = await evaluate("(() => { const c=document.createElement('canvas'); c.width=512; c.height=256; const x=c.getContext('2d'); x.fillStyle='white'; x.fillRect(0,0,512,256); x.fillStyle='black'; x.font='24px Arial'; x.fillText('Fictional test photo — model C60',20,60); x.fillText('Quoted price Rs 22000',20,110); return c.toDataURL('image/png').split(',')[1]; })()");
  await writeFile(photoPath, Buffer.from(fictionalImage, "base64"));
  await send("DOM.enable");
  const { root } = await send("DOM.getDocument");
  const { nodeId } = await send("DOM.querySelector", { nodeId: root.nodeId, selector: "#photo" });
  const invalidPhotoPath = "/tmp/buying-companion-unreadable-photo.png";
  await writeFile(invalidPhotoPath, "fictional invalid photo bytes");
  await send("DOM.setFileInputFiles", { nodeId, files: [invalidPhotoPath] });
  await click("Retry / upload buying-companion-unreadable-photo.png");
  await waitFor("document.body.innerText.includes('Select a different JPEG or PNG and retry')");
  assert.equal(await evaluate("(document.querySelector('#note')?.value || document.querySelector('pre')?.textContent || '').includes('Fictional note: Brand A model C60')"), true);
  await send("DOM.setFileInputFiles", { nodeId, files: [photoPath] });
  await waitFor("Array.from(document.querySelectorAll('button')).some(b=>b.textContent.includes('Retry / upload'))");
  await click("Retry / upload buying-companion-fictional-photo.png");
  await waitFor("document.body.innerText.includes('Photo saved; offer not saved yet')");
  await click("Read sources with AI");
  await waitFor("document.body.innerText.includes('AI reading is not set up yet') || document.body.innerText.includes('AI reading is paused')");
  await waitFor("document.querySelector('#model')");
  assert.equal(await evaluate("document.querySelector('#shop').value"), "Example shop A");
  await fill("brand", "Brand A"); await fill("model", "C60"); await fill("price", 22000);
  await fill("specifications", "60 cm width"); await fill("inclusions", "Product only");
  await fill("quoteDate", new Date().toISOString().slice(0,10));
  await evaluate("document.querySelector('input[type=checkbox]').click()");
  await click("Confirm and save offer");
  await waitFor("document.body.innerText.includes('Buyer-confirmed transcription') && !document.querySelector('#shop')");
  await click("Add shop 2"); await fill("shop", "Example shop B"); await fill("note", "Fictional note: Brand B model W90, price Rs 26000; delivery Rs 500.");
  await click("Enter / review details"); await waitFor("document.querySelector('#model')");
  await fill("brand", "Brand B"); await fill("model", "W90"); await fill("price", 26000); await fill("deliveryCost", 500);
  await fill("specifications", "90 cm width"); await fill("inclusions", "Product only");
  await fill("quoteDate", new Date().toISOString().slice(0,10));
  await evaluate("document.querySelector('input[type=checkbox]').click()"); await click("Confirm and save offer");
  await waitFor("!document.querySelector('#shop') && document.body.innerText.includes('Example shop B')");
  await click("Compare offers"); await waitFor("document.querySelector('table')");
  assert.equal(await evaluate("document.body.innerText.includes('Needs checking — incomplete costs')"), true);
  assert.equal(await evaluate("document.body.innerText.includes('Critical gaps block a final recommendation')"), true);
  assert.equal(await evaluate("document.documentElement.scrollWidth > innerWidth"), false);
  const scroll = await evaluate("document.querySelector('.table-scroll').scrollWidth > document.querySelector('.table-scroll').clientWidth");
  assert.equal(scroll, true);
  await evaluate("document.querySelector('.comparison').scrollIntoView({block:'start'})");
  await screenshot("offers-mobile-comparison");
  await reload();
  await waitFor("document.querySelector('table') && document.body.innerText.includes('Example shop A')");
  assert.equal(await evaluate("document.querySelectorAll('table thead th').length"), 3);
  const photoUrl = await evaluate("Array.from(document.querySelectorAll('a')).find(a=>a.textContent.includes('fictional-photo'))?.href");
  assert.equal((await fetch(photoUrl)).status,200);

  await click("Correct shop 1 details"); await waitFor("document.querySelector('#price')");
  await fill("price", 21000);
  await reload(); await waitFor("document.body.innerText.includes('Example shop A')");
  await click("Correct shop 1 details"); await waitFor("document.querySelector('#price')");
  assert.equal(await evaluate("document.querySelector('#price').value"), "21000");
  await send("Network.enable"); await send("Network.emulateNetworkConditions", { offline:true, latency:0, downloadThroughput:0, uploadThroughput:0 });
  await evaluate("document.querySelector('input[type=checkbox]').click()");
  // Convex queues mutations while offline, keeping the form in Saving… until reconnect.
  await click("Confirm and save offer"); await waitFor("document.body.innerText.includes('Saving…')");
  assert.equal(await evaluate("document.querySelector('#price').value"), "21000");
  await send("Network.emulateNetworkConditions", { offline:false, latency:0, downloadThroughput:-1, uploadThroughput:-1 });
  await waitFor("!document.querySelector('#price') && document.body.innerText.includes('Out of date')");
  await click("Update comparison"); await waitFor("!document.body.innerText.includes('Out of date')");
  await click("Edit purchase"); await waitFor("document.querySelector('#budget')"); await fill("budget",20000); await click("Save changes");
  await waitFor("document.body.innerText.includes('Out of date')"); await click("Update comparison");
  await waitFor("document.body.innerText.includes('No offer fits your stated needs')");
  await click("Edit purchase"); await waitFor("document.querySelector('#budget')"); await fill("budget",28000); await click("Save changes");
  await waitFor("document.querySelector('#saved-title')");
  await click("Sign out"); await waitFor("document.querySelector('#start-item') || document.querySelector('#email')"); if (await evaluate("!!document.querySelector('#start-item')")) await click("Sign in"); await waitFor("document.querySelector('#email')");
  await fill("email", email); await fill("password", password); await click("Sign in");
  await waitFor("document.querySelector('.price')?.textContent.includes('28,000')");
  await send("Emulation.setDeviceMetricsOverride", { width: 1440, height: 1000, deviceScaleFactor: 1, mobile: false });
  await waitFor("document.querySelector('table')");
  await evaluate("document.querySelector('.comparison').scrollIntoView({block:'start'})");
  await screenshot("purchase-desktop-saved");
  assert.equal(await evaluate("document.documentElement.scrollWidth > innerWidth"), false);
  await click("Sign out"); await waitFor("document.querySelector('#start-item') || document.querySelector('#email')"); if (await evaluate("!!document.querySelector('#start-item')")) await click("Sign in"); await waitFor("document.querySelector('#email')");
  await click("Create account"); await fill("email", `other-${randomUUID()}@example.test`); await fill("password", randomUUID()); await click("Create account");
  await waitFor("document.querySelector('#item')");
  assert.equal(await evaluate("document.querySelector('#item').value"), "");
  assert.equal(await evaluate("document.body.innerText.includes('Small kitchen.')"), false);
  await click("Sign out"); await waitFor("document.querySelector('#start-item') || document.querySelector('#email')"); if (await evaluate("!!document.querySelector('#start-item')")) await click("Sign in"); await waitFor("document.querySelector('#email')");
  console.log("Passed: sign-up, purchase save/reload/edit, two offers, AI unavailable recovery, confirmation, comparison reload, draft recovery, offline save/reconnect, stale comparison, no offer fits, mobile scrolling, sign-out/sign-in and second-account privacy.");
} finally { ws.close(); await browserSend("Target.disposeBrowserContext", { browserContextId }); browser.close(); }
