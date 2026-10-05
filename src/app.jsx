import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { ConvexReactClient, useConvexAuth, useMutation, useQuery } from "convex/react";
import { ConvexAuthProvider, useAuthActions } from "@convex-dev/auth/react";
import Offers, { readDraft } from "./offers";
import { api } from "../convex/_generated/api";

const client = new ConvexReactClient(CONVEX_URL);
const money = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 2 });

function Account() {
  const { signIn } = useAuthActions();
  const [flow, setFlow] = useState("signIn");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const heading = useRef(null);
  async function submit(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setBusy(true); setError("");
    try {
      await signIn("password", { email: String(form.get("email")).trim().toLowerCase(), password: String(form.get("password")), flow });
    } catch {
      setError(flow === "signIn" ? "Could not sign in. Check your email and password, then try again." : "Could not create your account. If you already have an account, choose Sign in; otherwise try again.");
    } finally { setBusy(false); }
  }
  return <section className="sheet" aria-labelledby="account-title">
    <h1 id="account-title" ref={heading} tabIndex={-1}>{flow === "signIn" ? "Welcome back." : "Keep your purchase with you."}</h1>
    <p className="intro">{flow === "signIn" ? "Sign in to reopen your budget and buying needs." : "Create an account to save your buying needs and return to them later."}</p>
    <form onSubmit={submit}>
      <label htmlFor="email">Email</label>
      <input id="email" name="email" type="email" autoComplete="email" required maxLength={254} disabled={busy} />
      <label htmlFor="password">Password</label>
      <input id="password" name="password" type="password" autoComplete={flow === "signIn" ? "current-password" : "new-password"} minLength={flow === "signUp" ? 8 : 1} required disabled={busy} aria-describedby={flow === "signUp" ? "password-help" : undefined} />
      {flow === "signUp" && <p className="hint" id="password-help">Use at least 8 characters.</p>}
      {error && <p className="error" role="alert">{error}</p>}
      <button className="primary" disabled={busy}>{busy ? "Please wait…" : flow === "signIn" ? "Sign in" : "Create account"}</button>
    </form>
    <p className="account-switch">{flow === "signIn" ? "First time here?" : "Already have an account?"} <button className="text-button" disabled={busy} onClick={() => { setFlow(flow === "signIn" ? "signUp" : "signIn"); setError(""); heading.current?.focus(); }}>{flow === "signIn" ? "Create account" : "Sign in"}</button></p>
  </section>;
}

function PurchaseForm({ purchase, onDone }) {
  const save = useMutation(api.purchases.save);
  const draftKey = `needs-draft:${purchase?._id || "new"}`;
  const draft = readDraft(draftKey) || (!purchase && readDraft("first-shop-draft")) || {};
  const [busy, setBusy] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    const guard = e => { if (dirty) { e.preventDefault(); e.returnValue = ""; } };
    window.addEventListener("beforeunload", guard);
    return () => window.removeEventListener("beforeunload", guard);
  }, [dirty]);
  async function submit(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setBusy(true); setError("");
    try {
      await save({ item: String(form.get("item")), budget: Number(form.get("budget")), situation: String(form.get("situation")) });
      localStorage.removeItem(draftKey); setDirty(false); onDone();
    } catch (e) {
      setError(typeof e.data === "string" ? e.data : "Your purchase was not saved. Check your connection and try again; your entries are still here.");
    } finally { setBusy(false); }
  }
  return <section className="sheet" aria-labelledby="purchase-title">
    <h1 id="purchase-title">{purchase ? "Edit your buying needs." : "What are you buying?"}</h1>
    <p className="intro">Start with one purchase. Save your budget and the things that matter to you.</p>
    <form onSubmit={submit} onChange={e => { setDirty(true); const values = new FormData(e.currentTarget); try { localStorage.setItem(draftKey, JSON.stringify(Object.fromEntries(values))); } catch {} }}>
      <label htmlFor="item">Item</label>
      <input id="item" name="item" placeholder="For example, a kitchen chimney" required maxLength={120} defaultValue={draft.item ?? purchase?.item ?? ""} disabled={busy} />
      <label htmlFor="budget">Budget (₹)</label>
      <input id="budget" name="budget" type="number" inputMode="decimal" min="0.01" max="100000000" step="0.01" required defaultValue={draft.budget ?? purchase?.budget ?? ""} disabled={busy} aria-describedby="budget-help" />
      <p id="budget-help" className="hint">The most you want to spend on this purchase.</p>
      <label htmlFor="situation">Your situation</label>
      <textarea id="situation" name="situation" rows={5} required maxLength={3000} defaultValue={draft.situation ?? purchase?.situation ?? ""} disabled={busy} placeholder="How will you use it? What space do you have? What matters most to you?" aria-describedby="situation-help" />
      <p id="situation-help" className="hint">Include intended use, space limits, and priorities you already know.</p>
      {error && <p className="error" role="alert">{error}</p>}
      <div className="actions"><button className="primary" disabled={busy}>{busy ? "Saving…" : purchase ? "Save changes" : "Save purchase"}</button>
      {purchase && <button type="button" className="secondary" disabled={busy} onClick={() => { if (!dirty || window.confirm("Discard your unsaved changes?")) onDone(false); }}>Cancel</button>}</div>
    </form>
    <p className="footnote" role="status">{busy ? "Saving…" : dirty ? "Changes not saved" : "Not saved yet"}. Draft on this device; not saved to your account.</p>
  </section>;
}

function Purchase() {
  const purchase = useQuery(api.purchases.current);
  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);
  const title = useRef(null);
  useEffect(() => { if (saved) title.current?.focus(); }, [saved, purchase]);
  if (purchase === undefined) return <Loading text="Opening your purchase…" />;
  if (!purchase || editing) return <PurchaseForm purchase={purchase} onDone={(didSave = true) => { setEditing(false); setSaved(didSave); }} />;
  return <><section className="sheet" aria-labelledby="saved-title">
    {saved && <p className="success" role="status">Your purchase is saved.</p>}
    <h1 id="saved-title" ref={title} tabIndex={-1}>{purchase.item}</h1>
    <p className="intro">Your buying needs, ready to reopen whenever you need them.</p>
    <dl className="purchase-details"><div><dt>Budget</dt><dd className="price">{money.format(purchase.budget)}</dd></div><div><dt>Your situation</dt><dd className="situation">{purchase.situation}</dd></div></dl>
    <button className="primary" onClick={() => { setSaved(false); setEditing(true); }}>Edit purchase</button>
    <p className="footnote">Save status: Saved · Last saved {new Date(purchase.updatedAt).toLocaleString("en-IN")}</p>
  </section><Offers purchase={purchase}/></>;
}

function Loading({ text }) { return <section className="sheet" aria-busy="true"><p role="status">{text}</p><div className="loading-line" /><div className="loading-line short" /></section>; }

class ErrorBoundary extends React.Component {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? <section className="sheet"><h1>Could not open your purchase.</h1><p>Check your connection, then reload to try again.</p><button className="primary" onClick={() => location.reload()}>Reload</button></section> : this.props.children; }
}

function Start({ onAccount }) {
  const [draft, setDraft] = useState(() => readDraft("first-shop-draft") || { item: "", budget: "", situation: "", notes: "" });
  const change = (key, value) => { const next = { ...draft, [key]: value }; setDraft(next); try { localStorage.setItem("first-shop-draft", JSON.stringify(next)); } catch {} };
  return <section className="sheet"><h1>Compare existing offers</h1><p>Choose a product that fits your needs and budget. Start with your needs and the first shop’s note; add photos after signing in to save them.</p><form onSubmit={e => {e.preventDefault(); onAccount();}}>
    <label htmlFor="start-item">Product</label><input id="start-item" required maxLength={120} value={draft.item} onChange={e=>change("item",e.target.value)}/>
    <label htmlFor="start-budget">Budget (₹)</label><input id="start-budget" type="number" min="0.01" step="0.01" max="100000000" required value={draft.budget} onChange={e=>change("budget",e.target.value)}/>
    <label htmlFor="start-situation">Purpose and requirements</label><textarea id="start-situation" required maxLength={3000} value={draft.situation} onChange={e=>change("situation",e.target.value)}/>
    <label htmlFor="start-note">First shop’s original note (optional if adding photos)</label><textarea id="start-note" maxLength={6000} value={draft.notes} onChange={e=>change("notes",e.target.value)}/>
    <p className="hint">Draft on this device; not saved to your account.</p><button className="primary">Save first shop’s information</button></form><p>Already saved a purchase? <button className="text-button" onClick={onAccount}>Sign in</button></p></section>;
}

function App() {
  const { isLoading, isAuthenticated } = useConvexAuth();
  const { signOut } = useAuthActions();
  const [error, setError] = useState("");
  const [signingOut, setSigningOut] = useState(false);
  const [account, setAccount] = useState(false);
  return <><header className="app-header"><span className="wordmark">Buying companion</span>{isAuthenticated && <button className="text-button" disabled={signingOut} onClick={async () => { if (!window.confirm("Sign out? Any unsaved changes will be discarded.")) return; setSigningOut(true); try { await signOut(); } catch { setError("Could not sign out. Try again."); } finally { setSigningOut(false); } }}>{signingOut ? "Signing out…" : "Sign out"}</button>}</header>
    <main id="main" tabIndex={-1}>{error && <p className="error" role="alert">{error}</p>}<ErrorBoundary>{isLoading ? <Loading text="Checking your sign-in…" /> : isAuthenticated ? <Purchase /> : account ? <><button className="text-button" onClick={() => setAccount(false)}>Back to needs and note</button><Account /></> : <Start onAccount={() => setAccount(true)} />}</ErrorBoundary></main>
    <footer>One purchase. Your budget. Your priorities.</footer></>;
}

createRoot(document.getElementById("root")).render(<ConvexAuthProvider client={client}><App /></ConvexAuthProvider>);
