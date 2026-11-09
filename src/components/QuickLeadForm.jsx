import React, { useState } from "react";
import Arrow from "./Arrow.jsx";

/**
 * Drop <QuickLeadForm /> anywhere — blog posts, service pages, footer CTAs.
 * Props:
 *   heading  – override the heading text
 *   subtext  – override the sub-text
 *   source   – label sent to Brevo as LEAD_SOURCE (default "Inline Form")
 */
export default function QuickLeadForm({
  heading = "Get a Free Automation Audit",
  subtext = "Tell us about your business and we'll show you where automation can save you time and money.",
  source = "Inline Form",
}) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState("idle");
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "" });

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
        body: JSON.stringify({ ...form, leadSource: source }),
      });
      if (!res.ok) throw new Error();
      setStatus("done");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="qlf-wrap">
      {!open ? (
        <button className="qlf-trigger btn btn-primary" onClick={() => setOpen(true)}>
          {heading} <Arrow />
        </button>
      ) : status === "done" ? (
        <div className="qlf-card qlf-done">
          <div className="qlf-check">✓</div>
          <h3>Got it — we'll be in touch!</h3>
          <p>Check your inbox. While you wait, explore our services or book a call directly.</p>
          <a href="/contact" className="btn btn-ghost" style={{ marginTop: 14, display: "inline-flex" }}>
            Full Audit Wizard <Arrow />
          </a>
        </div>
      ) : (
        <div className="qlf-card">
          <div className="qlf-card-head">
            <div>
              <h3 className="qlf-title">{heading}</h3>
              <p className="qlf-sub">{subtext}</p>
            </div>
            <button className="qlf-x" onClick={() => setOpen(false)} aria-label="Close">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form onSubmit={submit} noValidate className="qlf-form">
            <div className="qlf-row">
              <label className="qlf-field">
                <span>Name *</span>
                <input value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="Jane Doe" required />
              </label>
              <label className="qlf-field">
                <span>Work email *</span>
                <input value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="jane@company.com" type="email" required />
              </label>
            </div>
            <label className="qlf-field">
              <span>Company</span>
              <input value={form.company} onChange={(e) => set("company", e.target.value)} placeholder="Company name" />
            </label>
            <label className="qlf-field">
              <span>What's your biggest challenge?</span>
              <textarea value={form.message} onChange={(e) => set("message", e.target.value)} placeholder="e.g. We spend 10+ hours a week on manual reports…" rows={3} />
            </label>

            {status === "error" && (
              <p style={{ color: "var(--red-hover)", fontSize: 13 }}>Something went wrong — please try again.</p>
            )}

            <button type="submit" className="btn btn-primary qlf-submit" disabled={!canSubmit || status === "sending"}>
              {status === "sending" ? "Sending…" : <>Send My Details <Arrow /></>}
            </button>
          </form>
        </div>
      )}

      <style>{CSS}</style>
    </div>
  );
}

const CSS = `
  .qlf-wrap{width:100%}
  .qlf-trigger{display:inline-flex}
  .qlf-card{border:1px solid var(--border);border-radius:20px;background:var(--glass);
    backdrop-filter:blur(22px);padding:clamp(20px,3vw,32px);animation:qlfIn .3s var(--ease)}
  .qlf-card-head{display:flex;justify-content:space-between;align-items:flex-start;gap:12px;margin-bottom:20px}
  .qlf-title{font-family:"Space Grotesk";font-weight:700;font-size:clamp(18px,2.5vw,22px);letter-spacing:-.02em;margin-bottom:6px}
  .qlf-sub{font-size:13.5px;color:var(--gray);line-height:1.55;max-width:480px}
  .qlf-x{background:none;border:none;cursor:pointer;color:#71717a;padding:4px;border-radius:6px;display:flex;transition:.2s;flex-shrink:0}
  .qlf-x:hover{color:#fff;background:rgba(255,255,255,.07)}
  .qlf-x svg{width:18px;height:18px}
  .qlf-form{display:flex;flex-direction:column;gap:14px}
  .qlf-row{display:grid;grid-template-columns:1fr 1fr;gap:14px}
  .qlf-field{display:flex;flex-direction:column;gap:6px}
  .qlf-field span{font-size:12.5px;color:var(--gray);font-weight:500}
  .qlf-field input,.qlf-field textarea{font-family:inherit;font-size:15px;color:#fff;
    background:#1a1a1a;border:1px solid var(--border);border-radius:11px;padding:12px 14px;
    width:100%;resize:vertical;transition:.25s}
  .qlf-field input:focus,.qlf-field textarea:focus{outline:none;border-color:var(--red);box-shadow:0 0 0 3px rgba(255,43,43,.15)}
  .qlf-field input::placeholder,.qlf-field textarea::placeholder{color:#52525b}
  .qlf-submit{width:100%;justify-content:center}
  .qlf-done{text-align:center;padding:12px 0}
  .qlf-check{width:52px;height:52px;border-radius:50%;background:rgba(255,43,43,.1);
    border:1px solid rgba(255,43,43,.4);display:flex;align-items:center;justify-content:center;
    font-size:22px;color:var(--red-hover);margin:0 auto 16px}
  .qlf-done h3{font-family:"Space Grotesk";font-weight:700;font-size:20px;margin-bottom:8px}
  .qlf-done p{font-size:14px;color:var(--gray);line-height:1.6;max-width:400px;margin:0 auto}
  @keyframes qlfIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
  @media(max-width:520px){.qlf-row{grid-template-columns:1fr}}
`;
