import React, { useState } from "react";
import useSEO from "../hooks/useSEO.js";
import PageHero from "../components/PageHero.jsx";
import Comparison from "../sections/Comparison.jsx";
import ClosingCTA from "../sections/ClosingCTA.jsx";

/* ------------------------------------------------------------------ *
 * Ecommerce use case categories
 * ------------------------------------------------------------------ */
const INDUSTRIES = [
  {
    id: "orders",
    name: "Order Processing & Fulfilment",
    icon: (<><path d="M20 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" /><path d="M16 3H8l-2 4h12z" /></>),
    line: "Process 30–40% more orders without adding headcount.",
    cases: [
      ["Automated order routing", "New orders are instantly checked, tagged, and routed to the right 3PL, warehouse, or fulfilment partner — no manual sorting."],
      ["Fulfilment status updates", "Customers receive real-time shipping notifications triggered by carrier events, eliminating inbound 'where is my order?' queries."],
      ["Backorder & out-of-stock handling", "When stock runs out, customers are automatically notified, waitlisted, and messaged when items are back — keeping demand alive."],
      ["Cross-channel order aggregation", "Orders from Shopify, Amazon, eBay, and your own site flow into one queue automatically, with no manual consolidation."],
    ],
  },
  {
    id: "inventory",
    name: "Inventory Management",
    icon: (<><rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" /><path d="M7 8h10M7 12h6" /></>),
    line: "Stock levels that update themselves across every channel.",
    cases: [
      ["Multi-channel inventory sync", "Shopify, WooCommerce, Amazon, and your 3PL stay in agreement in real time — no overselling, no manual updates."],
      ["Low-stock alerts & auto-reorder", "When stock dips below your threshold, suppliers are automatically notified and purchase orders are drafted for review."],
      ["Demand forecasting", "AI analyses sales velocity, seasonality, and trend data to surface which SKUs need topping up before they run out."],
      ["Supplier communication automation", "PO confirmations, delivery ETAs, and lead-time updates are exchanged with suppliers automatically, reducing back-and-forth."],
    ],
  },
  {
    id: "lifecycle",
    name: "Customer Lifecycle & Retention",
    icon: (<><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></>),
    line: "Recover abandoned carts and reduce churn automatically.",
    cases: [
      ["Abandoned cart recovery", "Multi-step SMS and email sequences fire automatically when a cart is abandoned — recovering 10–15% of lost revenue on autopilot."],
      ["Post-purchase flows", "Review requests, upsell recommendations, loyalty point notifications, and repeat-purchase nudges trigger based on order behaviour."],
      ["Win-back campaigns", "Customers who haven't purchased in 60–90 days enter a personalised re-engagement flow with tailored offers and messaging."],
      ["VIP and loyalty tier management", "High-value customers are identified and moved into VIP tiers automatically, with perks and communications triggered by spend milestones."],
    ],
  },
  {
    id: "returns",
    name: "Returns & Customer Support",
    icon: (<><polyline points="1 4 1 10 7 10" /><path d="M3.51 15a9 9 0 1 0 .49-3.51" /></>),
    line: "Handle returns in minutes, not hours.",
    cases: [
      ["Automated returns processing", "Customers submit returns via a self-serve portal; labels are generated, inventory updated, and refunds or exchanges initiated automatically."],
      ["Support ticket triage & routing", "Incoming tickets are classified by intent (return, complaint, tracking, product query) and routed to the right queue instantly."],
      ["AI-powered FAQ responses", "Common queries about shipping times, sizing, and policies are answered automatically from your knowledge base — 24/7."],
      ["Refund & exchange workflows", "Once a return is received and scanned, refunds are triggered and exchange orders created without any manual steps."],
    ],
  },
  {
    id: "marketing",
    name: "Marketing & Channel Automation",
    icon: (<><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" /></>),
    line: "Launch campaigns and sync channels without the manual work.",
    cases: [
      ["Behavioural email & SMS triggers", "Flows fire based on browse behaviour, purchase history, and predictive models — the right message to the right customer at the right moment."],
      ["Product feed updates to marketplaces", "New products, price changes, and stock updates sync to Amazon, eBay, Google Shopping, and other channels automatically."],
      ["Review requests & social proof collection", "Post-delivery review requests go out at the optimal time, with follow-up reminders, to maximise review volume."],
      ["Affiliate & influencer tracking", "Commission tracking, link generation, and payment workflows run automatically — giving partners a smooth experience without manual admin."],
    ],
  },
  {
    id: "finance",
    name: "Financial Operations & Reporting",
    icon: (<><path d="M3 6h18v12H3z" /><path d="M3 10h18M7 14h4" /></>),
    line: "Reconcile payments and report revenue without spreadsheets.",
    cases: [
      ["Payment gateway reconciliation", "Stripe, PayPal, and Shopify Payments receipts are automatically matched against orders, with discrepancies flagged for review."],
      ["Marketplace settlement reports", "Amazon and eBay settlement data is pulled automatically and mapped to your accounting system with no manual exports."],
      ["Revenue & margin dashboards", "Live P&L, channel performance, and margin data are compiled automatically and refreshed daily — no manual report building."],
      ["Supplier invoice processing", "Incoming invoices are read, categorised, matched to POs, and queued for approval without manual data entry."],
    ],
  },
];

function IndustryCard({ ind, open, onToggle }) {
  return (
    <article className={"ind-card" + (open ? " open" : "")}>
      <button className="ind-head" onClick={onToggle} aria-expanded={open}>
        <span className="ind-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{ind.icon}</svg>
        </span>
        <span className="ind-head-text">
          <h3 className="ind-name">{ind.name}</h3>
          <span className="ind-line">{ind.line}</span>
        </span>
        <span className="ind-toggle" aria-hidden="true">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M6 9l6 6 6-6" /></svg>
        </span>
      </button>
      <div className="ind-body">
        <div className="ind-body-inner">
          <ul className="ind-cases">
            {ind.cases.map(([t, d]) => (
              <li key={t}>
                <span className="ind-case-t">{t}</span>
                <span className="ind-case-d">{d}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}

export default function UseCasesPage() {
  useSEO({ title: "Ecommerce Automation Use Cases", description: "Before-and-after automation examples for ecommerce brands: order processing, inventory management, customer lifecycle, returns, support triage, and reporting.", canonical: "https://www.eajjy.com/use-cases" });
  const [openId, setOpenId] = useState(null);
  return (
    <>
      <PageHero
        eyebrow="Use Cases"
        title="What Changes When Operations Run Themselves"
        lead="A side-by-side look at the everyday tasks we automate for ecommerce brands."
      />

      <Comparison />

      <div className="divider" />

      {/* Industry-specific use cases */}
      <section className="sec wrap" id="industries">
        <div className="glow-spot" style={{ width: 480, height: 480, background: "rgba(255,43,43,.08)", top: 0, right: -160 }} />
        <div className="reveal">
          <span className="eyebrow">By Use Case</span>
          <h2>Where Automation Makes the Biggest Difference</h2>
          <p className="lead">Every ecommerce operation has the same bottlenecks in different proportions. Here's where we automate most often — and what changes when we do. Tap any to expand.</p>
        </div>
        <div className="ind-grid stagger">
          {INDUSTRIES.map((ind) => (
            <IndustryCard
              key={ind.id}
              ind={ind}
              open={openId === ind.id}
              onToggle={() => setOpenId((cur) => (cur === ind.id ? null : ind.id))}
            />
          ))}
        </div>
      </section>

      <ClosingCTA />

      <style>{INDUSTRY_CSS}</style>
    </>
  );
}

const INDUSTRY_CSS = `
  .ind-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-top:42px;align-items:start}
  .ind-card{border:1px solid var(--border);border-radius:18px;overflow:hidden;background:var(--glass);backdrop-filter:blur(22px);transition:.4s var(--ease)}
  .ind-card.open{border-color:rgba(255,43,43,.35);box-shadow:0 26px 60px -28px rgba(255,43,43,.4)}
  .ind-head{display:flex;align-items:center;gap:16px;width:100%;text-align:left;cursor:pointer;background:none;border:none;color:inherit;font-family:inherit;padding:22px 24px}
  .ind-icon{flex-shrink:0;width:46px;height:46px;border:1px solid rgba(255,43,43,.3);border-radius:12px;display:grid;place-items:center;color:var(--red-hover)}
  .ind-icon svg{width:22px;height:22px}
  .ind-head-text{flex:1;display:flex;flex-direction:column;gap:3px}
  .ind-name{font-family:"Space Grotesk";font-weight:600;font-size:clamp(15px,1.6vw,18px);letter-spacing:-.01em}
  .ind-line{font-size:13px;color:var(--gray);line-height:1.4}
  .ind-toggle{flex-shrink:0;width:34px;height:34px;border:1px solid var(--border);border-radius:10px;display:grid;place-items:center;color:var(--red-hover);transition:.4s var(--ease)}
  .ind-card.open .ind-toggle{transform:rotate(180deg);background:rgba(255,43,43,.1)}
  .ind-body{display:grid;grid-template-rows:0fr;transition:grid-template-rows .5s var(--ease)}
  .ind-card.open .ind-body{grid-template-rows:1fr;border-top:1px solid var(--border)}
  .ind-body-inner{overflow:hidden}
  .ind-cases{list-style:none;display:flex;flex-direction:column;gap:14px;padding:22px 24px}
  .ind-cases li{display:flex;flex-direction:column;gap:3px;padding-left:16px;position:relative}
  .ind-cases li::before{content:"";position:absolute;left:0;top:7px;width:6px;height:6px;border-radius:50%;background:var(--red)}
  .ind-case-t{font-family:"Space Grotesk";font-weight:600;font-size:14px;color:#e4e4e7}
  .ind-case-d{font-size:13px;color:var(--gray);line-height:1.5}

  @media(max-width:760px){
    .ind-grid{grid-template-columns:1fr}
  }
`;
