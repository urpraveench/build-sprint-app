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

const email = `voice-${randomUUID()}@example.test`, password=randomUUID();
const fixture={requestId:randomUUID(),language:"te-IN",shop:"Fictional shop A",brief:{item:"Chimney",budget:25000,situation:"Small kitchen"},stage:"review",consented:true,reviewedKeys:[],corrections:[],turns:[{speaker:"buyer",text:"Chimney for small kitchen, budget 25000",at:1},{speaker:"assistant",text:"Which model?",at:2},{speaker:"shop",text:"Model C60, price 22000, product only. Warranty one year.",at:3}],facts:[{key:"model",value:"C60",turn:2,quote:"Model C60"},{key:"price",value:"22000",turn:2,quote:"price 22000"},{key:"inclusions",value:"product only",turn:2,quote:"product only"},{key:"warranty",value:"one year",turn:2,quote:"Warranty one year"}]};
try{
 await send("Page.enable");await send("Runtime.enable");await send("Emulation.setDeviceMetricsOverride",{width:390,height:844,deviceScaleFactor:1,mobile:true});
 await waitFor("document.querySelector('#voice-language')");assert.equal(await evaluate("document.querySelectorAll('input,textarea').length"),0);
 await waitFor("document.querySelector('.voice-setup')");await click("Tell me what you’re buying");await waitFor("document.querySelector('[role=alert]')");assert.match(await evaluate("document.querySelector('[role=alert]').textContent"),/Sarvam key|paused/);
 await screenshot("voice-mobile-start");
 // A disclosed fictional captured-text fixture: this checks real auth/storage, not Sarvam listening.
 await evaluate(`localStorage.setItem('voice-offer-draft:v1',${JSON.stringify(JSON.stringify(fixture))})`);await reload();
 await waitFor("document.body.innerText.includes('Fictional shop A')");assert.equal(await evaluate("document.documentElement.scrollWidth>innerWidth"),false);
 await click("Pause");assert.match(await evaluate("document.querySelector('.voice-state').textContent"),/Paused/);
 await click("Take over");assert.match(await evaluate("document.querySelector('.voice-state').textContent"),/You have control/);
 await click("Correct something");await fill("correct-value","C60 revised by buyer");await click("Keep correction");
 await click("Looks right — save offer");await waitFor("document.querySelector('#email')");
 await click("Create account");await fill("email",email);await fill("password",password);await click("Create account");
 await waitFor("!document.querySelector('#email') && document.body.innerText.includes('Sign out')");
 await click("Looks right — save offer");await waitFor("document.querySelector('#voice-title')?.textContent === 'Your first shop offer.'");
 assert.equal(await evaluate("localStorage.getItem('voice-offer-draft:v1')"),null);
 await reload();await waitFor("document.querySelector('#voice-title')?.textContent === 'Your first shop offer.'");
 assert.match(await evaluate("document.body.innerText"),/C60 revised by buyer/);assert.match(await evaluate("document.body.innerText"),/Extra costs\nNot provided/);
 const hiddenConfirm=await evaluate("Array.from(document.querySelectorAll('details')).find(d=>d.textContent.includes('Warranty / service'))?.textContent");assert.equal(hiddenConfirm.includes("Buyer-confirmed"),false);
 await evaluate("Array.from(document.querySelectorAll('summary')).find(s=>s.textContent.startsWith('Read conversation')).click()");assert.match(await evaluate("document.querySelector('.voice-transcript').textContent"),/Model C60, price 22000/);
 await click("Correct a saved detail");await fill("correct-value","C60 saved correction");await click("Save correction");await waitFor("!document.querySelector('#correct-value') && document.body.innerText.includes('C60 saved correction')");await reload();await waitFor("document.body.innerText.includes('C60 saved correction')");
 await evaluate("Array.from(document.querySelectorAll('summary')).find(s=>s.textContent.startsWith('Read conversation')).click()");assert.match(await evaluate("document.querySelector('.voice-transcript').textContent"),/Model C60, price 22000/);
 await screenshot("voice-mobile-saved");await send("Emulation.setDeviceMetricsOverride",{width:1440,height:1000,deviceScaleFactor:1,mobile:false});await screenshot("voice-desktop-saved");
 await click("Sign out");await waitFor("document.querySelector('#voice-language') && !document.body.innerText.includes('Signing out')");assert.equal(await evaluate("document.body.innerText.includes('Fictional shop A')"),false);
 await click("Sign in to reopen my offer");await waitFor("document.querySelector('#email')");await click("Create account");await fill("email",`voice-other-${randomUUID()}@example.test`);await fill("password",randomUUID());await click("Create account");
 await waitFor("document.body.innerText.includes('Sign out') && !document.querySelector('#email')");assert.equal(await evaluate("document.body.innerText.includes('Fictional shop A')"),false);
 assert.equal(await evaluate("document.querySelectorAll('input,textarea').length"),0);
 console.log("PASS: phone/desktop UI, honest missing-key state, disclosed fictional text draft, pause/takeover UI, one-detail correction, real account save/reload, original text, unreviewed hidden details, cleared draft and second-account privacy. No real voice call tested.");
}finally{await browserSend("Target.disposeBrowserContext",{browserContextId});ws.close();browser.close();}
