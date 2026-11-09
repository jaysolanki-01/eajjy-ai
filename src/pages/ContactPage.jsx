import React, { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import useSEO from "../hooks/useSEO.js";
import PageHero from "../components/PageHero.jsx";
import Arrow from "../components/Arrow.jsx";
import BookButton from "../components/BookButton.jsx";

/* ================================================================== *
 * CONFIG — edit these
 * ================================================================== */
// Where audit submissions should go. Used by the "Email my audit" button.
const EAJJY_EMAIL = "sales@eajjy.com";
// Optional: paste a form backend endpoint (Formspree / Web3Forms / Getform)
// to capture submissions automatically. Left empty = mailto fallback only.
const FORM_ENDPOINT = "";

/* ================================================================== *
 * Data + scoring model
 * ================================================================== */
const INDUSTRIES = ["Ecommerce / D2C Brand", "Marketplace Seller", "Marketing / Creative Agency", "Consulting / Professional Services", "Other"];
const TEAM_SIZES = ["Just me", "2–10", "11–25", "26–50", "50+"];

// Each manual area: weekly team hours (mid estimate) + which services it maps to
const TASK_AREAS = [
  { id: "dataentry", label: "Data entry & transfer", hrs: 6, svc: ["bpa", "n8n"] },
  { id: "email", label: "Email management", hrs: 8, svc: ["bpa"] },
  { id: "reporting", label: "Report generation", hrs: 5, svc: ["bpa"] },
  { id: "onboarding", label: "Client onboarding", hrs: 4, svc: ["bpa"] },
  { id: "invoicing", label: "Invoicing & payments", hrs: 3, svc: ["bpa"] },
  { id: "scheduling", label: "Meeting scheduling", hrs: 2, svc: ["n8n"] },
  { id: "leads", label: "Lead follow-up & qualification", hrs: 4, svc: ["bpa", "aipd"] },
  { id: "documents", label: "Document processing", hrs: 4, svc: ["bpa", "rag"] },
  { id: "status", label: "Status updates & tracking", hrs: 3, svc: ["n8n"] },
  { id: "support", label: "Customer / client support", hrs: 6, svc: ["rag", "aipd"] },
];

const TOOLS = ["HubSpot", "Google Workspace", "Slack", "Notion", "Airtable", "Salesforce", "QuickBooks", "Zapier", "Make", "Asana", "Monday.com", "Microsoft 365"];

const GOALS = [
  { id: "scale", label: "Scale without hiring", svc: ["bpa"] },
  { id: "errors", label: "Reduce errors", svc: ["bpa"] },
  { id: "faster", label: "Faster turnaround", svc: ["n8n"] },
  { id: "aiproduct", label: "Launch an AI product", svc: ["aipd"] },
  { id: "customtool", label: "Build a custom tool", svc: ["vibe"] },
  { id: "notsure", label: "Not sure where to start", svc: ["cons"] },
];

const TIMELINES = ["ASAP", "1–3 months", "3–6 months", "Just exploring"];

const SERVICE_META = {
  bpa: { name: "Business Process Automation", to: "/services/business-process-automation" },
  aipd: { name: "AI Product Development", to: "/services/ai-product-development" },
  vibe: { name: "Vibe Coding", to: "/services/vibe-coding" },
  n8n: { name: "N8n Automation", to: "/services/n8n-automation" },
  cons: { name: "AI Automation Consultancy", to: "/services/ai-automation-consultancy" },
  rag: { name: "LLM & RAG Solutions", to: "/services/llm-rag-solutions" },
};

const RECOVERY = 0.75; // automation typically recovers ~75% of manual time
const WEEKS = 50;

/* ================================================================== *
 * Helpers
 * ================================================================== */
function computeAudit(a) {
  const areas = TASK_AREAS.filter((t) => a.tasks.includes(t.id));
  const weeklyLost = areas.reduce((s, t) => s + t.hrs, 0);
  const weeklyRecovered = Math.round(weeklyLost * RECOVERY);
  const annualHours = weeklyRecovered * WEEKS;
  const rate = Number(a.hourlyRate) > 0 ? Number(a.hourlyRate) : 35;
  const annualCost = annualHours * rate;

  // rank services by how often they map to selected areas + goals
  const tally = {};
  const bump = (k) => (tally[k] = (tally[k] || 0) + 1);
  areas.forEach((t) => t.svc.forEach(bump));
  GOALS.filter((g) => a.goals.includes(g.id)).forEach((g) => g.svc.forEach(bump));
  const ranked = Object.keys(tally).sort((x, y) => tally[y] - tally[x]).slice(0, 3);

  return { weeklyLost, weeklyRecovered, annualHours, annualCost, rate, services: ranked, areas };
}

function buildReportHTML(a, r) {
  const today = new Date().toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });
  const money = (n) => "$" + n.toLocaleString();
  const svcList = r.services.map((s) => `<li><b>${SERVICE_META[s].name}</b></li>`).join("");
  const areaList = r.areas.map((t) => `<tr><td>${t.label}</td><td style="text-align:right">~${t.hrs} hrs/wk</td></tr>`).join("");
  const toolList = a.tools.length ? a.tools.join(", ") + (a.toolsOther ? ", " + a.toolsOther : "") : (a.toolsOther || "Not specified");
  const goalList = GOALS.filter((g) => a.goals.includes(g.id)).map((g) => g.label).join(", ") || "Not specified";

  return `<!doctype html><html><head><meta charset="utf-8"><title>Automation Audit — ${a.company || "Your Business"}</title>
<style>
  *{margin:0;padding:0;box-sizing:border-box}
  body{font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;background:#050505;color:#fff;padding:48px;line-height:1.6}
  .wrap{max-width:760px;margin:0 auto}
  .top{display:flex;justify-content:space-between;align-items:baseline;border-bottom:1px solid #262626;padding-bottom:20px;margin-bottom:32px}
  .brand{font-size:22px;font-weight:700;letter-spacing:-.02em}.brand span{color:#FF2B2B}
  .date{color:#A1A1AA;font-size:13px}
  h1{font-size:28px;letter-spacing:-.02em;margin-bottom:8px}
  h2{font-size:14px;text-transform:uppercase;letter-spacing:.08em;color:#FF4D4D;margin:36px 0 14px}
  p{color:#d4d4d8}
  .lead{color:#A1A1AA;margin-bottom:8px}
  .stats{display:flex;gap:14px;margin-top:8px;flex-wrap:wrap}
  .stat{flex:1;min-width:150px;border:1px solid #262626;border-radius:14px;padding:20px;background:#0d0d0d}
  .stat b{display:block;font-size:30px;letter-spacing:-.02em;color:#FF4D4D}
  .stat span{font-size:12px;color:#A1A1AA}
  table{width:100%;border-collapse:collapse;margin-top:6px}
  td{padding:10px 0;border-bottom:1px solid #1a1a1a;color:#d4d4d8;font-size:14px}
  ul{list-style:none;margin-top:6px}
  ul li{padding:10px 14px;border:1px solid #262626;border-radius:10px;margin-bottom:8px;background:#0d0d0d}
  .meta{font-size:14px;color:#d4d4d8;margin:4px 0}
  .meta b{color:#fff}
  .cta{margin-top:36px;border:1px solid rgba(255,43,43,.4);border-radius:16px;padding:24px;background:rgba(255,43,43,.06)}
  .foot{margin-top:40px;border-top:1px solid #262626;padding-top:18px;color:#71717a;font-size:12px}
  .disclaim{color:#71717a;font-size:12px;margin-top:10px}
</style></head><body><div class="wrap">
  <div class="top"><div class="brand">EAJJY<span>AI</span></div><div class="date">${today}</div></div>
  <h1>Automation Audit Report</h1>
  <p class="lead">Prepared for ${a.name ? a.name + (a.company ? ", " + a.company : "") : (a.company || "your business")}.</p>

  <h2>The Opportunity</h2>
  <div class="stats">
    <div class="stat"><b>~${r.weeklyLost}</b><span>hours/week on manual work today</span></div>
    <div class="stat"><b>~${r.weeklyRecovered}</b><span>hours/week recoverable</span></div>
    <div class="stat"><b>${money(r.annualCost)}</b><span>est. annual cost recovered*</span></div>
  </div>

  <h2>Where Time Is Leaking</h2>
  <table><tbody>${areaList || '<tr><td>No areas selected</td><td></td></tr>'}</tbody></table>

  <h2>Recommended Starting Points</h2>
  <ul>${svcList || "<li>Book a free consultation to map your best options.</li>"}</ul>

  <h2>Your Inputs</h2>
  <p class="meta"><b>Industry:</b> ${a.industry || "Not specified"}</p>
  <p class="meta"><b>Team size:</b> ${a.teamSize || "Not specified"}</p>
  <p class="meta"><b>Current tools:</b> ${toolList}</p>
  <p class="meta"><b>Goals:</b> ${goalList}</p>
  <p class="meta"><b>Timeline:</b> ${a.timeline || "Not specified"}</p>

  <div class="cta">
    <p style="font-weight:600;margin-bottom:6px">Next step: a free consultation</p>
    <p style="color:#A1A1AA;font-size:14px">We'll validate these numbers against your real workflows and map a prioritized automation roadmap. No commitment, no pressure.</p>
  </div>

  <p class="disclaim">*Estimates assume automation recovers ~${Math.round(RECOVERY * 100)}% of identified manual time at $${r.rate}/hour across ${WEEKS} working weeks. Figures are directional and refined during a full audit.</p>
  <div class="foot">© ${new Date().getFullYear()} EAJJY AI · Ecommerce automation agency</div>
</div></body></html>`;
}

function downloadReport(a, r) {
  const html = buildReportHTML(a, r);
  const blob = new Blob([html], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  const safe = (a.company || "your-business").replace(/[^a-z0-9]+/gi, "-").toLowerCase();
  link.href = url;
  link.download = `EAJJY-AI-Automation-Audit-${safe}.html`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function emailAudit(a, r) {
  const lines = [
    `New automation audit request`,
    ``,
    `Name: ${a.name}`,
    `Email: ${a.email}`,
    `Company: ${a.company}`,
    `Role: ${a.role}`,
    `Industry: ${a.industry}`,
    `Team size: ${a.teamSize}`,
    `Manual areas: ${r.areas.map((t) => t.label).join(", ")}`,
    `Tools: ${a.tools.join(", ")}${a.toolsOther ? ", " + a.toolsOther : ""}`,
    `Goals: ${GOALS.filter((g) => a.goals.includes(g.id)).map((g) => g.label).join(", ")}`,
    `Timeline: ${a.timeline}`,
    ``,
    `Est. weekly hours lost: ~${r.weeklyLost}`,
    `Est. annual cost recovered: $${r.annualCost.toLocaleString()}`,
    `Recommended: ${r.services.map((s) => SERVICE_META[s].name).join(", ")}`,
  ].join("\n");
  window.location.href = `mailto:${EAJJY_EMAIL}?subject=${encodeURIComponent("Automation Audit — " + (a.company || a.name))}&body=${encodeURIComponent(lines)}`;
}

/* ================================================================== *
 * Reusable chip
 * ================================================================== */
function Chip({ active, onClick, children }) {
  return (
    <button type="button" className={"ca-chip" + (active ? " on" : "")} onClick={onClick}>
      {active && <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.6" strokeLinecap="round" style={{ stroke: "currentColor", width: 14, height: 14 }}><path d="M5 12l5 5L20 7" /></svg>}
      {children}
    </button>
  );
}

/* ================================================================== *
 * Page
 * ================================================================== */
const STEP_TITLES = ["About you", "Your business", "Where time goes", "Your tools", "Your goals"];

export default function ContactPage() {
  useSEO({ title: "Free Automation Audit", description: "Get an instant estimate of the time and money your firm could recover through automation. Complete our 2-minute workflow audit — no commitment needed.", canonical: "https://www.eajjy.com/contact" });
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [a, setA] = useState({
    name: "", email: "", company: "", role: "",
    industry: "", teamSize: "",
    tasks: [], tools: [], toolsOther: "",
    goals: [], timeline: "", hourlyRate: "35",
  });

  const set = (k, v) => setA((p) => ({ ...p, [k]: v }));
  const toggle = (k, v) => setA((p) => ({ ...p, [k]: p[k].includes(v) ? p[k].filter((x) => x !== v) : [...p[k], v] }));

  const liveHours = useMemo(() => TASK_AREAS.filter((t) => a.tasks.includes(t.id)).reduce((s, t) => s + t.hrs, 0), [a.tasks]);
  const audit = useMemo(() => computeAudit(a), [a]);

  const canContinue = () => {
    if (step === 0) return a.name.trim() && /\S+@\S+\.\S+/.test(a.email) && a.company.trim();
    if (step === 1) return a.industry && a.teamSize;
    if (step === 2) return a.tasks.length > 0;
    return true;
  };

  const next = () => { if (step < STEP_TITLES.length - 1) setStep(step + 1); else { if (FORM_ENDPOINT) { try { fetch(FORM_ENDPOINT, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(a) }); } catch (e) {} navigate("/thank-you"); return; } setDone(true); } };
  const back = () => setStep(Math.max(0, step - 1));

  const money = (n) => "$" + n.toLocaleString();
  const pct = ((step + 1) / STEP_TITLES.length) * 100;

  return (
    <>
      <PageHero
        eyebrow="Free Automation Audit"
        title="Get Your Workflow Audit in 2 Minutes"
        lead="Answer a few questions and we'll instantly estimate the time and money you could recover, recommend where to start, and generate an audit report you can download."
      />

      <section className="sec wrap">
        {!done ? (
          <div className="ca-wizard">
            {/* progress */}
            <div className="ca-prog-row">
              <div className="ca-prog-label">Step {step + 1} of {STEP_TITLES.length} · {STEP_TITLES[step]}</div>
              {liveHours > 0 && <div className="ca-live">~{liveHours} hrs/week flagged</div>}
            </div>
            <div className="ca-prog"><span style={{ width: pct + "%" }} /></div>

            {/* STEP 0 — contact */}
            {step === 0 && (
              <div className="ca-step">
                <div className="ca-fields">
                  <label className="ca-field"><span>Your name *</span>
                    <input value={a.name} onChange={(e) => set("name", e.target.value)} placeholder="Jane Doe" /></label>
                  <label className="ca-field"><span>Work email *</span>
                    <input value={a.email} onChange={(e) => set("email", e.target.value)} placeholder="jane@company.com" type="email" /></label>
                  <label className="ca-field"><span>Company *</span>
                    <input value={a.company} onChange={(e) => set("company", e.target.value)} placeholder="Company name" /></label>
                  <label className="ca-field"><span>Your role</span>
                    <input value={a.role} onChange={(e) => set("role", e.target.value)} placeholder="Founder, Ops Lead..." /></label>
                </div>
              </div>
            )}

            {/* STEP 1 — business */}
            {step === 1 && (
              <div className="ca-step">
                <div className="ca-q">What industry are you in?</div>
                <div className="ca-chips">{INDUSTRIES.map((i) => <Chip key={i} active={a.industry === i} onClick={() => set("industry", i)}>{i}</Chip>)}</div>
                <div className="ca-q" style={{ marginTop: 28 }}>How big is your team?</div>
                <div className="ca-chips">{TEAM_SIZES.map((t) => <Chip key={t} active={a.teamSize === t} onClick={() => set("teamSize", t)}>{t}</Chip>)}</div>
              </div>
            )}

            {/* STEP 2 — tasks */}
            {step === 2 && (
              <div className="ca-step">
                <div className="ca-q">Where does your team lose the most time? <span className="ca-q-hint">Select all that apply</span></div>
                <div className="ca-chips">{TASK_AREAS.map((t) => <Chip key={t.id} active={a.tasks.includes(t.id)} onClick={() => toggle("tasks", t.id)}>{t.label}</Chip>)}</div>
              </div>
            )}

            {/* STEP 3 — tools */}
            {step === 3 && (
              <div className="ca-step">
                <div className="ca-q">Which tools do you use? <span className="ca-q-hint">Select all that apply</span></div>
                <div className="ca-chips">{TOOLS.map((t) => <Chip key={t} active={a.tools.includes(t)} onClick={() => toggle("tools", t)}>{t}</Chip>)}</div>
                <label className="ca-field" style={{ marginTop: 22, maxWidth: 420 }}><span>Anything else?</span>
                  <input value={a.toolsOther} onChange={(e) => set("toolsOther", e.target.value)} placeholder="Other tools, separated by commas" /></label>
              </div>
            )}

            {/* STEP 4 — goals */}
            {step === 4 && (
              <div className="ca-step">
                <div className="ca-q">What are you hoping to achieve? <span className="ca-q-hint">Select all that apply</span></div>
                <div className="ca-chips">{GOALS.map((g) => <Chip key={g.id} active={a.goals.includes(g.id)} onClick={() => toggle("goals", g.id)}>{g.label}</Chip>)}</div>
                <div className="ca-q" style={{ marginTop: 28 }}>Timeline?</div>
                <div className="ca-chips">{TIMELINES.map((t) => <Chip key={t} active={a.timeline === t} onClick={() => set("timeline", t)}>{t}</Chip>)}</div>
                <label className="ca-field" style={{ marginTop: 22, maxWidth: 260 }}><span>Avg. hourly cost of staff time ($)</span>
                  <input value={a.hourlyRate} onChange={(e) => set("hourlyRate", e.target.value.replace(/[^0-9]/g, ""))} placeholder="35" inputMode="numeric" /></label>
                <p className="ca-note">Used only to estimate savings in your report.</p>
              </div>
            )}

            {/* nav */}
            <div className="ca-nav">
              {step > 0 && <button type="button" className="btn btn-ghost" onClick={back}>Back</button>}
              <button type="button" className="btn btn-primary" disabled={!canContinue()} onClick={next} style={{ marginLeft: "auto" }}>
                {step < STEP_TITLES.length - 1 ? "Continue" : "Generate My Audit"} <Arrow />
              </button>
            </div>
          </div>
        ) : (
          /* ===================== RESULT ===================== */
          <div className="ca-result">
            <div className="ca-result-head reveal">
              <span className="eyebrow">Your Instant Audit</span>
              <h2>Here's What Automation Could Recover</h2>
              <p className="lead">Based on your answers, {a.company || "your business"} is leaving meaningful time and money on the table. Here's the directional picture.</p>
            </div>

            <div className="ca-stats">
              <div className="ca-stat"><b>~{audit.weeklyLost}</b><span>hours/week on manual work</span></div>
              <div className="ca-stat"><b>~{audit.weeklyRecovered}</b><span>hours/week recoverable</span></div>
              <div className="ca-stat hot"><b>{money(audit.annualCost)}</b><span>est. annual cost recovered</span></div>
            </div>

            <div className="ca-recs">
              <h3>Recommended starting points</h3>
              <div className="ca-rec-grid">
                {audit.services.map((s) => (
                  <Link key={s} to={SERVICE_META[s].to} className="ca-rec">
                    <span>{SERVICE_META[s].name}</span>
                    <Arrow />
                  </Link>
                ))}
              </div>
            </div>

            <div className="ca-actions">
              <button type="button" className="btn btn-primary" onClick={() => downloadReport(a, audit)}>Download Audit Report <Arrow /></button>
              <button type="button" className="btn btn-ghost" onClick={() => { emailAudit(a, audit); setTimeout(() => navigate("/thank-you"), 600); }}>Email My Audit to EAJJY AI</button>
            </div>

            <p className="ca-note" style={{ textAlign: "center", marginTop: 18 }}>
              Estimates assume automation recovers ~{Math.round(RECOVERY * 100)}% of flagged manual time at ${audit.rate}/hour across {WEEKS} weeks. We refine these in a full audit.
            </p>

            <div className="ca-cta-final">
              <div>
                <h3>Want the real thing?</h3>
                <p>Book a free consultation and we'll validate these numbers against your actual workflows.</p>
              </div>
              <BookButton>Book a Free Consultation</BookButton>
            </div>
          </div>
        )}
      </section>

      <style>{CONTACT_CSS}</style>
    </>
  );
}

const CONTACT_CSS = `
  .ca-wizard{max-width:760px;border:1px solid var(--border);border-radius:22px;background:var(--glass);backdrop-filter:blur(22px);padding:clamp(22px,3vw,38px)}
  .ca-prog-row{display:flex;justify-content:space-between;align-items:center;gap:12px;margin-bottom:12px}
  .ca-prog-label{font-size:12.5px;font-weight:600;letter-spacing:.03em;text-transform:uppercase;color:var(--red-hover)}
  .ca-live{font-size:12px;color:var(--gray);border:1px solid var(--border);border-radius:999px;padding:5px 12px;white-space:nowrap}
  .ca-prog{height:5px;border-radius:999px;background:rgba(255,255,255,.08);overflow:hidden;margin-bottom:30px}
  .ca-prog span{display:block;height:100%;background:linear-gradient(90deg,var(--red),var(--red-hover));border-radius:999px;transition:width .5s var(--ease)}
  .ca-step{min-height:230px}
  .ca-q{font-family:"Space Grotesk";font-weight:600;font-size:clamp(17px,2vw,21px);margin-bottom:16px;letter-spacing:-.01em}
  .ca-q-hint{font-family:"Inter";font-weight:500;font-size:12.5px;color:var(--gray);margin-left:8px}
  .ca-chips{display:flex;flex-wrap:wrap;gap:10px}
  .ca-chip{display:inline-flex;align-items:center;gap:7px;font-family:inherit;font-size:14px;color:#d4d4d8;cursor:pointer;
    border:1px solid var(--border);border-radius:999px;background:var(--charcoal);padding:11px 17px;transition:.25s var(--ease)}
  .ca-chip:hover{border-color:rgba(255,43,43,.4);color:#fff}
  .ca-chip.on{border-color:var(--red);background:rgba(255,43,43,.12);color:#fff}
  .ca-fields{display:grid;grid-template-columns:1fr 1fr;gap:16px}
  .ca-field{display:flex;flex-direction:column;gap:7px}
  .ca-field span{font-size:13px;color:var(--gray);font-weight:500}
  .ca-field input{font-family:inherit;font-size:15px;color:#fff;background:var(--charcoal);border:1px solid var(--border);border-radius:11px;padding:13px 15px;transition:.25s var(--ease);width:100%}
  .ca-field input:focus{outline:none;border-color:var(--red);box-shadow:0 0 0 3px rgba(255,43,43,.15)}
  .ca-field input::placeholder{color:#52525b}
  .ca-note{font-size:12px;color:#71717a;margin-top:10px}
  .ca-nav{display:flex;gap:12px;align-items:center;margin-top:32px;padding-top:24px;border-top:1px solid var(--border)}
  .btn:disabled{opacity:.4;cursor:not-allowed}

  .ca-result{max-width:820px}
  .ca-result-head{margin-bottom:30px}
  .ca-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}
  .ca-stat{border:1px solid var(--border);border-radius:16px;background:var(--glass);backdrop-filter:blur(18px);padding:26px 22px;transition:.4s var(--ease)}
  .ca-stat:hover{transform:translateY(-3px);border-color:rgba(255,43,43,.3)}
  .ca-stat b{display:block;font-family:"Space Grotesk";font-weight:600;font-size:clamp(28px,4vw,40px);letter-spacing:-.02em;line-height:1;color:#fff}
  .ca-stat span{display:block;font-size:12.5px;color:var(--gray);margin-top:10px}
  .ca-stat.hot b{color:var(--red-hover)}
  .ca-stat.hot{border-color:rgba(255,43,43,.35);box-shadow:0 26px 60px -30px rgba(255,43,43,.4)}

  .ca-recs{margin-top:38px}
  .ca-recs h3{font-family:"Space Grotesk";font-weight:600;font-size:18px;margin-bottom:16px}
  .ca-rec-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}
  .ca-rec{display:flex;align-items:center;justify-content:space-between;gap:10px;border:1px solid var(--border);border-radius:14px;background:var(--glass);backdrop-filter:blur(18px);padding:18px 20px;font-family:"Space Grotesk";font-weight:600;font-size:14.5px;color:#fff;text-decoration:none;transition:.35s var(--ease)}
  .ca-rec:hover{border-color:rgba(255,43,43,.4);transform:translateY(-3px);background:rgba(255,43,43,.06)}
  .ca-rec svg{flex-shrink:0;color:var(--red-hover)}

  .ca-actions{display:flex;flex-wrap:wrap;gap:12px;margin-top:36px}
  .ca-cta-final{display:flex;align-items:center;justify-content:space-between;gap:24px;flex-wrap:wrap;margin-top:36px;border:1px solid rgba(255,43,43,.35);border-radius:18px;background:rgba(255,43,43,.06);padding:28px}
  .ca-cta-final h3{font-family:"Space Grotesk";font-weight:600;font-size:19px;margin-bottom:4px}
  .ca-cta-final p{font-size:14px;color:var(--gray);line-height:1.55;max-width:440px}

  @media(max-width:680px){
    .ca-fields{grid-template-columns:1fr}
    .ca-stats,.ca-rec-grid{grid-template-columns:1fr}
    .ca-cta-final{flex-direction:column;align-items:flex-start}
  }
`;
