import React, { useState } from "react";
import { Link } from "react-router-dom";
import useSEO from "../hooks/useSEO.js";
import PageHero from "../components/PageHero.jsx";
import ClosingCTA from "../sections/ClosingCTA.jsx";
import Arrow from "../components/Arrow.jsx";

/* ------------------------------------------------------------------ *
 * Ecommerce automation case studies
 * ------------------------------------------------------------------ */
const CASES = [
  {
    id: "order-automation",
    title: "Multi-Channel Order Processing Automation",
    client: "Fashion D2C Brand",
    category: "Order Processing & Fulfilment",
    challenge:
      "A fast-growing fashion brand was processing 500+ daily orders manually across Shopify, Amazon, and their own website. Each order needed manual checking, routing to the right 3PL, and customer notification — a 3-hour daily bottleneck that caused delays and frequent fulfilment errors at peak volume.",
    steps: [
      { title: "Order Aggregation Pipeline", detail: "Built a unified order ingestion workflow that pulls from Shopify, Amazon, and the brand's own site into a single processing queue in real time." },
      { title: "Automated Inventory Verification", detail: "Each order triggers an instant stock check across the warehouse and 3PL, flagging splits and backorders before they become customer complaints." },
      { title: "Intelligent 3PL Routing", detail: "Orders are automatically routed to the correct fulfilment centre based on SKU, delivery zone, carrier SLA, and stock location — no manual decision required." },
      { title: "Customer Notification Triggers", detail: "Confirmation, dispatch, and tracking emails fire automatically via Klaviyo at each fulfilment milestone, eliminating manual sends." },
    ],
    tech: ["n8n Workflow Automation", "Shopify API", "Amazon SP-API", "3PL Webhooks", "Klaviyo API"],
    results: [
      { value: "<2 min", label: "Avg order processing" },
      { value: "40%", label: "More orders, same team" },
      { value: "Zero", label: "Manual routing steps" },
      { value: "99.4%", label: "Fulfilment accuracy" },
    ],
  },
  {
    id: "cart-recovery",
    title: "Abandoned Cart Recovery Engine",
    client: "Homeware Ecommerce Brand",
    category: "Customer Lifecycle & Retention",
    challenge:
      "The brand had a 68% cart abandonment rate and was relying on a single generic recovery email sent 24 hours after abandonment. With no segmentation, no SMS, and no dynamic offers, the majority of recoverable revenue was simply being left on the table.",
    steps: [
      { title: "Real-Time Cart Event Capture", detail: "Shopify webhooks feed abandoned cart events into the automation instantly — no delays, no polling, no missed carts." },
      { title: "Customer Segmentation Logic", detail: "Each abandonment is classified by cart value, purchase history, and customer segment to determine which recovery sequence and offer tier applies." },
      { title: "Multi-Step SMS & Email Sequences", detail: "A three-touch sequence fires over 48 hours — a reminder email at 1hr, a personalised SMS at 6hrs, and a final discount email at 24hrs — with each message customised to the cart contents." },
      { title: "Dynamic Discount & Conversion Tracking", detail: "Discount codes are generated and injected per customer, with full attribution tracking to measure revenue recovered per sequence step." },
    ],
    tech: ["n8n Workflow Automation", "Shopify Webhooks", "Klaviyo API", "Twilio SMS", "OpenAI API"],
    results: [
      { value: "14%", label: "Cart recovery rate" },
      { value: "£42k", label: "Recovered in 60 days" },
      { value: "24/7", label: "Automated sequences" },
      { value: "3x", label: "vs single-email baseline" },
    ],
  },
  {
    id: "inventory-sync",
    title: "Real-Time Inventory Sync Across 4 Channels",
    client: "Electronics Reseller",
    category: "Inventory Management",
    challenge:
      "Selling the same SKUs across Shopify, Amazon, eBay, and a wholesale portal with manual inventory updates twice a day was causing regular oversells, strained supplier relationships, and hours of daily admin. A single viral product moment could wipe out the team for a full day.",
    steps: [
      { title: "Webhook-Driven Inventory Engine", detail: "Every sale, return, or stock adjustment on any channel fires a webhook that updates the central inventory ledger within seconds." },
      { title: "Bi-Directional Channel Sync", detail: "The updated inventory count is immediately pushed to all other channels — Shopify, Amazon, eBay, and the wholesale portal — in a single automated cascade." },
      { title: "Low-Stock Threshold Alerts & Auto-PO", detail: "When a SKU drops below its reorder threshold, the system drafts a purchase order and emails it to the relevant supplier for one-click approval." },
      { title: "Supplier Communication Automation", detail: "PO confirmations, delivery ETAs, and lead-time updates are exchanged with suppliers automatically, logged in a central tracker." },
    ],
    tech: ["n8n Workflow Automation", "Shopify API", "Amazon SP-API", "eBay API", "Google Sheets API"],
    results: [
      { value: "Zero", label: "Oversells since launch" },
      { value: "8 hrs", label: "Admin saved per week" },
      { value: "4", label: "Channels synced live" },
      { value: "2 days", label: "Faster reorder cycle" },
    ],
  },
  {
    id: "support-returns",
    title: "AI Customer Support & Returns Automation",
    client: "Sportswear Brand",
    category: "Returns & Customer Support",
    challenge:
      "200+ daily support tickets, 80% asking the same questions about shipping, returns, and sizing. A team of three was spending entire days inside Gorgias handling queries that rarely needed a human — leaving no time for the complex cases that actually did.",
    steps: [
      { title: "AI Ticket Classification", detail: "Incoming Gorgias tickets are instantly classified by intent — shipping query, return request, sizing question, complaint, or escalation — using an OpenAI classifier trained on historical tickets." },
      { title: "Automated FAQ Resolution", detail: "Common queries are answered automatically from the brand's knowledge base with personalised, on-brand responses. No human needed for the 80% of tickets that follow predictable patterns." },
      { title: "Self-Serve Returns Portal", detail: "Return requests trigger a branded portal link. Customers select their reason, the system generates a prepaid label, updates inventory, and queues the refund or exchange automatically." },
      { title: "Smart Escalation Routing", detail: "Anything outside the classifier's confidence threshold, or flagged as a complaint, is routed to the right agent with full context — so the team only handles what genuinely needs them." },
    ],
    tech: ["OpenAI API", "Gorgias API", "Shopify API", "n8n Workflow Automation", "Returns Portal"],
    results: [
      { value: "73%", label: "Tickets auto-resolved" },
      { value: "2 hrs", label: "Freed per agent daily" },
      { value: "4 min", label: "Avg returns processing" },
      { value: "Higher", label: "CSAT score" },
    ],
  },
  {
    id: "analytics-pipeline",
    title: "Automated Ecommerce Analytics Pipeline",
    client: "Health & Beauty Brand",
    category: "Financial Operations & Reporting",
    challenge:
      "The founder was spending six hours every Monday pulling numbers from Shopify, Meta Ads, Google Ads, and Klaviyo manually into a spreadsheet. By the time the report was ready, the data was days old, and decisions were being made on last week's picture — not today's.",
    steps: [
      { title: "Multi-Source API Data Extraction", detail: "Automated pipelines pull daily data from Shopify, Meta Ads, Google Ads, and Klaviyo at 6am every morning — no manual exports." },
      { title: "Data Normalisation & Mapping", detail: "Raw API data is cleaned, normalised across different schemas, and mapped to a unified format for consistent cross-channel reporting." },
      { title: "Live Dashboard Compilation", detail: "Processed data populates a live Looker Studio dashboard — revenue by channel, ROAS, CAC, returning customer rate, and margin — updated daily before the team starts work." },
      { title: "Anomaly Alerts & Weekly Digest", detail: "Significant deviations from the 7-day average trigger instant Slack alerts. A formatted weekly summary is delivered to the founder every Monday morning automatically." },
    ],
    tech: ["n8n Workflow Automation", "Shopify API", "Meta Marketing API", "Google Ads API", "Klaviyo API", "Looker Studio"],
    results: [
      { value: "6 hrs", label: "Saved every Monday" },
      { value: "Daily", label: "Live dashboard refresh" },
      { value: "Instant", label: "Anomaly alerts" },
      { value: "Same-day", label: "Decision making" },
    ],
  },
];

const STATS = [
  { value: "5", label: "Ecommerce systems shipped" },
  { value: "30+ hrs", label: "Saved weekly, combined" },
  { value: "£42k", label: "Revenue recovered in 60 days" },
  { value: "Zero", label: "Oversells after inventory sync" },
];

/* ------------------------------------------------------------------ *
 * Sub-components
 * ------------------------------------------------------------------ */
function CaseCard({ c, index }) {
  const [open, setOpen] = useState(index === 0);

  return (
    <article className={"case" + (open ? " open" : "")}>
      <div className="case-glow" />

      {/* Header — always visible, toggles the body */}
      <button className="case-head" onClick={() => setOpen((v) => !v)} aria-expanded={open}>
        <span className="case-index">{String(index + 1).padStart(2, "0")}</span>
        <div className="case-headings">
          <div className="case-cat">{c.category}</div>
          <h3 className="case-title">{c.title}</h3>
          <div className="case-client">
            <span className="case-check">&#10003;</span> {c.client} &middot; Completed Project
          </div>
        </div>
        <span className="case-toggle" aria-hidden="true">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </span>
      </button>

      {/* Results — always visible strip */}
      <div className="case-results">
        {c.results.map((r) => (
          <div className="case-result" key={r.label}>
            <div className="cr-value">{r.value}</div>
            <div className="cr-label">{r.label}</div>
          </div>
        ))}
      </div>

      {/* Expandable body */}
      <div className="case-body">
        <div className="case-body-inner">
          <div className="case-cols">
            <div className="case-col">
              <div className="case-sub">The Challenge</div>
              <p className="case-text">{c.challenge}</p>

              <div className="case-sub" style={{ marginTop: 22 }}>Technologies Used</div>
              <div className="chips">
                {c.tech.map((t) => (<span className="chip" key={t}>{t}</span>))}
              </div>
            </div>

            <div className="case-col">
              <div className="case-sub">How We Solved It</div>
              <ol className="case-steps">
                {c.steps.map((s, i) => (
                  <li key={s.title}>
                    <span className="cs-num">{i + 1}</span>
                    <div>
                      <div className="cs-title">{s.title}</div>
                      <div className="cs-detail">{s.detail}</div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

/* ------------------------------------------------------------------ *
 * Page
 * ------------------------------------------------------------------ */
export default function Work() {
  useSEO({ title: "Our Work – Ecommerce Automation Case Studies", description: "Real automation systems we have shipped for ecommerce brands: order processing, inventory sync, abandoned cart recovery, AI support, and analytics pipelines.", canonical: "https://www.eajjy.com/work" });
  return (
    <>
      <PageHero
        eyebrow="Work"
        title="Ecommerce Automation in Action"
        lead="Real systems we've built for real stores. Each project replaced hours of manual ops work with autonomous, measurable automation."
      />

      {/* Stats band */}
      <section className="sec wrap" style={{ paddingTop: 0 }}>
        <div className="work-stats stagger">
          {STATS.map((s) => (
            <div className="work-stat" key={s.label}>
              <div className="ws-value">{s.value}</div>
              <div className="ws-label">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Case studies */}
      <section className="sec wrap" id="cases" style={{ paddingTop: 0 }}>
        <div className="reveal">
          <span className="eyebrow">Case Studies</span>
          <h2>Selected Client Work</h2>
          <p className="lead">Tap any project to explore the challenge, our implementation, and the technologies behind it.</p>
        </div>

        <div className="case-list stagger">
          {CASES.map((c, i) => (<CaseCard key={c.id} c={c} index={i} />))}
        </div>

        <div className="reveal" style={{ marginTop: 44 }}>
          <Link to="/contact" className="btn btn-primary">Start Your Project <Arrow /></Link>
        </div>
      </section>

      {/* Page-scoped styles */}
      <style>{CASE_CSS}</style>

      <ClosingCTA />
    </>
  );
}

/* ------------------------------------------------------------------ *
 * Styles (scoped to the Work page; uses global design tokens)
 * ------------------------------------------------------------------ */
const CASE_CSS = `
  .work-stats{display:grid;grid-template-columns:repeat(4,1fr);gap:16px}
  .work-stat{border:1px solid var(--border);border-radius:16px;background:var(--glass);
    backdrop-filter:blur(20px);padding:24px 18px;text-align:center;transition:.4s var(--ease)}
  .work-stat:hover{border-color:rgba(255,43,43,.4);transform:translateY(-4px)}
  .ws-value{font-family:"Space Grotesk";font-weight:600;font-size:clamp(24px,2.8vw,38px);letter-spacing:-.02em}
  .ws-label{font-size:12.5px;color:var(--gray);margin-top:6px}

  .case-list{display:flex;flex-direction:column;gap:16px;margin-top:46px}
  .case{position:relative;border:1px solid var(--border);border-radius:20px;overflow:hidden;
    background:var(--glass);backdrop-filter:blur(22px);transition:.45s var(--ease)}
  .case::before{content:"";position:absolute;inset:0;border-radius:20px;padding:1px;
    background:linear-gradient(160deg,rgba(255,255,255,.09),transparent 42%);
    -webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);
    -webkit-mask-composite:xor;mask-composite:exclude;pointer-events:none}
  .case.open{border-color:rgba(255,43,43,.35);box-shadow:0 30px 70px -30px rgba(255,43,43,.4)}
  .case-glow{position:absolute;top:-50px;right:-30px;width:200px;height:200px;border-radius:50%;
    background:radial-gradient(circle,rgba(255,43,43,.22),transparent 70%);filter:blur(24px);
    opacity:0;transition:.5s}
  .case.open .case-glow,.case:hover .case-glow{opacity:1}

  .case-head{display:flex;align-items:center;gap:20px;width:100%;text-align:left;cursor:pointer;
    background:none;border:none;color:inherit;font-family:inherit;padding:26px 28px}
  .case-index{font-family:"Space Grotesk";font-weight:600;font-size:18px;color:var(--red);
    width:46px;height:46px;flex-shrink:0;border:1px solid rgba(255,43,43,.3);border-radius:12px;
    display:grid;place-items:center}
  .case-headings{flex:1;min-width:0}
  .case-cat{font-size:11.5px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;color:var(--red-hover);margin-bottom:6px}
  .case-title{font-family:"Space Grotesk";font-weight:600;font-size:clamp(18px,2vw,24px);letter-spacing:-.01em;line-height:1.15}
  .case-client{font-size:12.5px;color:var(--gray);margin-top:7px}
  .case-check{color:#2ee27a}
  .case-toggle{flex-shrink:0;width:38px;height:38px;border:1px solid var(--border);border-radius:10px;
    display:grid;place-items:center;color:var(--red-hover);transition:.4s var(--ease)}
  .case.open .case-toggle{transform:rotate(180deg);background:rgba(255,43,43,.1);border-color:rgba(255,43,43,.3)}

  .case-results{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:var(--border);
    border-top:1px solid var(--border)}
  .case-result{background:var(--charcoal);padding:16px 18px;transition:.35s}
  .case:hover .case-result{background:#141414}
  .cr-value{font-family:"Space Grotesk";font-weight:600;font-size:clamp(17px,1.7vw,22px);letter-spacing:-.01em;color:#fff}
  .cr-label{font-size:11.5px;color:var(--gray);margin-top:3px}

  .case-body{display:grid;grid-template-rows:0fr;transition:grid-template-rows .55s var(--ease)}
  .case.open .case-body{grid-template-rows:1fr;border-top:1px solid var(--border)}
  .case-body-inner{overflow:hidden}
  .case-cols{display:grid;grid-template-columns:1fr 1fr;gap:40px;padding:30px 28px 32px}
  .case-sub{font-size:11.5px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;color:var(--red-hover);margin-bottom:12px}
  .case-text{font-size:14.5px;color:var(--gray);line-height:1.65}

  .case-steps{list-style:none;display:flex;flex-direction:column;gap:14px}
  .case-steps li{display:flex;gap:13px}
  .cs-num{flex-shrink:0;width:26px;height:26px;border-radius:8px;display:grid;place-items:center;
    font-family:"Space Grotesk";font-weight:600;font-size:12.5px;color:var(--red-hover);
    background:rgba(255,43,43,.1);border:1px solid rgba(255,43,43,.2)}
  .cs-title{font-size:14px;font-weight:600;margin-bottom:3px}
  .cs-detail{font-size:13px;color:var(--gray);line-height:1.5}

  @media(max-width:820px){
    .work-stats{grid-template-columns:repeat(2,1fr)}
    .case-cols{grid-template-columns:1fr;gap:26px;padding:26px 22px 28px}
  }
  @media(max-width:560px){
    .case-results{grid-template-columns:repeat(2,1fr)}
    .case-head{gap:14px;padding:22px 18px}
    .case-index{width:40px;height:40px;font-size:15px}
  }
`;
