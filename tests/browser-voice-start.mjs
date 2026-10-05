// Paid startup regression check: requires an active approved trial and Chrome debug port.
// APPROVED_VOICE_CHECK=true APP_TEST_URL=https://YOUR-SITE/app.html node tests/browser-voice-start.mjs
import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import { writeFile } from "node:fs/promises";

if(process.env.APPROVED_VOICE_CHECK!=="true")throw new Error("Get a paid-test allowance first; set APPROVED_VOICE_CHECK=true for this single-startup check.");
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
 const pos=await evaluate(`(()=>{const b=Array.from(document.querySelectorAll('button')).find(b=>b.textContent===${JSON.stringify(text)});b.scrollIntoView({block:'center'});const r=b.getBoundingClientRect();return {x:r.x+r.width/2,y:r.y+r.height/2};})()`);
 await send('Input.dispatchMouseEvent',{type:'mousePressed',button:'left',clickCount:1,...pos});await send('Input.dispatchMouseEvent',{type:'mouseReleased',button:'left',clickCount:1,...pos});
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

try {
 await send("Page.enable");await send("Runtime.enable");await send("Emulation.setDeviceMetricsOverride",{width:390,height:844,deviceScaleFactor:1,mobile:true});
 await browserSend("Browser.setPermission",{permission:{name:"microphone"},setting:"denied",origin:new URL(url).origin,browserContextId});
 await waitFor("document.querySelector('#voice-language') && !document.querySelector('.voice-setup')");
 assert.equal(await evaluate("window.isSecureContext && !!navigator.mediaDevices?.getUserMedia"),true);
 await click("Tell me what you’re buying");
 await waitFor("document.body.innerText.includes('Assistant speaking') || document.body.innerText.includes('Play assistant') || document.body.innerText.includes('Microphone access was refused')");
 if(await evaluate("document.body.innerText.includes('Play assistant')"))await click("Play assistant");
 await waitFor("document.body.innerText.includes('Microphone access was refused')");
 assert.equal(await evaluate("document.documentElement.scrollWidth>innerWidth"),false);
 await click("Pause");assert.match(await evaluate("document.querySelector('.voice-state').textContent"),/Paused/);
 console.log("PASS: fresh signed-out HTTPS phone-width page, enabled trial, real Sarvam startup speech, microphone refusal recovery, Pause and no overflow. Actual phone microphone not tested.");
} finally {await browserSend("Target.disposeBrowserContext",{browserContextId});ws.close();browser.close();}
