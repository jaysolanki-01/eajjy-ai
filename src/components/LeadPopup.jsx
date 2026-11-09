import React, { useEffect, useState, useRef } from "react";
import Arrow from "./Arrow.jsx";

const COOKIE_KEY = "eajjy_lead_popup";
const SHOW_AFTER_MS = 15000;
const SUPPRESS_DAYS = 30;

function setCookie(name, days) {
  const exp = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=1; expires=${exp}; path=/; SameSite=Lax`;
}

function hasCookie(name) {
  return document.cookie.split("; ").some((c) => c.startsWith(name + "="));
}

export default function LeadPopup() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState("idle"); // idle | sending | done | error
  const [form, setForm] = useState({ name: "", email: "", company: "" });
  const timerRef = useRef(null);

  useEffect(() => {
    if (hasCookie(COOKIE_KEY)) return;
    timerRef.current = setTimeout(() => setOpen(true), SHOW_AFTER_MS);
    return () => clearTimeout(timerRef.current);
  }, []);

  const close = () => {
    setOpen(false);
    setCookie(COOKIE_KEY, SUPPRESS_DAYS);
  };

  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));
  const canSubmit = form.name.trim() && /\S+@\S+\.\S+/.test(form.email);

  const submit = async (e) => {
    e.preventDefault();
    if (!canSubmit) return;
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, leadSource: "Popup Form" }),
      });
      if (!res.ok) throw new Error("failed");
      setStatus("done");
      setCookie(COOKIE_KEY, 365);
    } catch {
      setStatus("error");
    }
  };

  if (!open) return null;

  return (
    <>
      <div className="lp-overlay" onClick={close} />
      <div className="lp-modal" role="dialog" aria-modal="true" aria-label="Quick contact form">
        <button className="lp-close" onClick={close} aria-label="Close">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>

        {status === "done" ? (
          <div className="lp-done">
            <div className="lp-done-icon">✓</div>
            <h3>You're on the list!</h3>
            <p>We'll be in touch shortly. In the meantime, book a free consultation below.</p>
            <a href="/contact" className="btn btn-primary" style={{ marginTop: 18, display: "inline-flex" }}>
              Get Your Free Audit <Arrow />
            </a>
          </div>
        ) : (
          <>
            <div className="lp-badge">Free Consultation</div>
            <h2 className="lp-title">Save 10+ Hours a Week</h2>
            <p className="lp-sub">Tell us who you are and we'll show you exactly where automation can unlock time and revenue for your business.</p>

            <form onSubmit={submit} noValidate>
              <div className="lp-fields">
                <label className="lp-field">
                  <span>Your name *</span>
                  <input value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="Jane Doe" required />
                </label>
                <label className="lp-field">
                  <span>Work email *</span>
                  <input value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="jane@company.com" type="email" required />
                </label>
                <label className="lp-field" style={{ gridColumn: "1 / -1" }}>
                  <span>Company</span>
                  <input value={form.company} onChange={(e) => set("company", e.target.value)} placeholder="Company name" />
                </label>
              </div>

              {status === "error" && (
                <p style={{ color: "var(--red-hover)", fontSize: 13, marginTop: 8 }}>Something went wrong — please try again.</p>
              )}

              <button type="submit" className="btn btn-primary lp-submit" disabled={!canSubmit || status === "sending"}>
                {status === "sending" ? "Sending…" : <>Get My Free Audit <Arrow /></>}
              </button>
            </form>

            <p className="lp-privacy">No spam. Unsubscribe any time.</p>
          </>
        )}
      </div>

      <style>{CSS}</style>
    </>
  );
}

const CSS = `
  .lp-overlay{position:fixed;inset:0;z-index:900;background:rgba(0,0,0,.65);backdrop-filter:blur(4px);animation:lpFade .3s ease}
  .lp-modal{position:fixed;z-index:901;top:50%;left:50%;transform:translate(-50%,-50%);
    width:min(520px,calc(100vw - 32px));background:#111;border:1px solid var(--border);
    border-radius:22px;padding:clamp(24px,4vw,40px);animation:lpSlide .35s var(--ease)}
  .lp-close{position:absolute;top:16px;right:16px;background:none;border:none;cursor:pointer;
    color:#71717a;padding:6px;border-radius:8px;display:flex;transition:.2s}
  .lp-close:hover{color:#fff;background:rgba(255,255,255,.07)}
  .lp-close svg{width:18px;height:18px}
  .lp-badge{display:inline-block;font-size:11.5px;font-weight:600;letter-spacing:.07em;text-transform:uppercase;
    color:var(--red-hover);border:1px solid rgba(255,43,43,.35);border-radius:999px;padding:5px 13px;margin-bottom:14px;
    background:rgba(255,43,43,.08)}
  .lp-title{font-family:"Space Grotesk";font-weight:700;font-size:clamp(22px,4vw,30px);letter-spacing:-.02em;margin-bottom:10px}
  .lp-sub{font-size:14.5px;color:var(--gray);line-height:1.6;margin-bottom:22px}
  .lp-fields{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:16px}
  .lp-field{display:flex;flex-direction:column;gap:6px}
  .lp-field span{font-size:12.5px;color:var(--gray);font-weight:500}
  .lp-field input{font-family:inherit;font-size:15px;color:#fff;background:#1a1a1a;
    border:1px solid var(--border);border-radius:11px;padding:12px 14px;width:100%;transition:.25s}
  .lp-field input:focus{outline:none;border-color:var(--red);box-shadow:0 0 0 3px rgba(255,43,43,.15)}
  .lp-field input::placeholder{color:#52525b}
  .lp-submit{width:100%;justify-content:center;margin-top:4px}
  .lp-privacy{font-size:11.5px;color:#52525b;text-align:center;margin-top:12px}
  .lp-done{text-align:center;padding:16px 0}
  .lp-done-icon{width:56px;height:56px;border-radius:50%;background:rgba(255,43,43,.12);border:1px solid rgba(255,43,43,.4);
    display:flex;align-items:center;justify-content:center;font-size:24px;color:var(--red-hover);margin:0 auto 18px}
  .lp-done h3{font-family:"Space Grotesk";font-weight:700;font-size:22px;margin-bottom:8px}
  .lp-done p{font-size:14.5px;color:var(--gray);line-height:1.6}
  @keyframes lpFade{from{opacity:0}to{opacity:1}}
  @keyframes lpSlide{from{opacity:0;transform:translate(-50%,-46%)}to{opacity:1;transform:translate(-50%,-50%)}}
  @media(max-width:480px){.lp-fields{grid-template-columns:1fr}}
`;
