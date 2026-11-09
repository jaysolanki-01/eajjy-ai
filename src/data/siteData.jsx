import React from "react";

export const NAV = [
  { label: "Product", to: "/product" },
  { label: "Work", to: "/work" },
  { label: "Use Cases", to: "/use-cases" },
  { label: "Blog", to: "/blog" },
  { label: "Our Process", to: "/process" },
  { label: "FAQ", to: "/faq" },
];

export const SERVICES = [
  {
    title: "Ecommerce Process Automation",
    to: "/services/business-process-automation",
    desc: "End-to-end operations automation for your store — order processing, inventory management, fulfilment routing, returns handling, and reporting, all running without manual intervention so your team can focus on growth.",
    chips: ["Order routing", "Inventory sync", "Returns automation", "Fulfilment workflows", "Reporting automation"],
    impact: "Process 30–40% more orders without adding headcount.",
    icon: <path d="M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z" />,
  },
  {
    title: "AI Product Development",
    to: "/services/ai-product-development",
    desc: "Custom AI built for ecommerce — product recommendation engines, demand forecasting models, personalisation systems, and predictive analytics that increase AOV and drive repeat purchases.",
    chips: ["Product recommendations", "Demand forecasting", "Personalisation AI", "Predictive analytics"],
    impact: "Launch AI-powered features that increase AOV and repeat purchase rates.",
    icon: (<><circle cx="12" cy="12" r="3" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M5 19l2-2M17 7l2-2" /></>),
  },
  {
    title: "Custom Integration Development",
    to: "/services/vibe-coding",
    desc: "Bespoke connectors, dashboards, and internal tools built in weeks — bridging your ecommerce platform, 3PL, marketplaces, and ERP without forcing your operations into off-the-shelf software.",
    chips: ["Shopify integrations", "3PL connectors", "Marketplace sync", "Custom dashboards", "ERP bridges"],
    impact: "Stop the copy-paste. Data flows exactly where it needs to go.",
    icon: <path d="M8 6l-6 6 6 6M16 6l6 6-6 6" />,
  },
  {
    title: "N8n Automation",
    to: "/services/n8n-automation",
    desc: "Enterprise-grade workflow automation that connects Shopify, WooCommerce, marketplaces, 3PLs, Klaviyo, and every tool in your stack — moving data automatically without code.",
    chips: ["Order workflows", "Inventory triggers", "Customer journeys", "Multi-platform sync", "Error handling"],
    impact: "Every order, inventory update, and customer event flows automatically.",
    icon: (<><circle cx="6" cy="6" r="2" /><circle cx="18" cy="6" r="2" /><circle cx="6" cy="18" r="2" /><circle cx="18" cy="18" r="2" /><path d="M8 6h8M6 8v8M18 8v8M8 18h8" /></>),
  },
  {
    title: "Ecommerce Automation Consultancy",
    to: "/services/ai-automation-consultancy",
    desc: "Strategic guidance to identify your highest-impact automation opportunities, design your roadmap, and ensure implementation delivers measurable results aligned with your ecommerce growth goals.",
    chips: ["Operations audit", "ROI analysis", "Automation roadmap", "Stack recommendations", "Team training"],
    impact: "Achieve measurable ROI in 90 days without costly mistakes or vendor lock-in.",
    icon: <path d="M12 2l3 7h7l-5.5 4 2 7L12 17l-6.5 5 2-7L2 9h7z" />,
  },
  {
    title: "LLM & AI Solutions",
    to: "/services/llm-rag-solutions",
    desc: "AI grounded in your own catalogue and customer data — intelligent product search, automated support, content generation, and AI-powered merchandising decisions that reduce manual content work.",
    chips: ["AI product search", "Support automation", "Content generation", "AI merchandising", "Semantic search"],
    impact: "Faster answers, smarter recommendations, less manual content work.",
    icon: (<><path d="M4 5h16v11H8l-4 4z" /><path d="M8 9h8M8 12h5" /></>),
  },
];

export const STEPS = [
  { n: "01", t: "Discovery & Audit", w: "We analyze operations, interview key team members, map workflows, and identify automation opportunities with the highest ROI.", meta: "Your time · 3–4 hrs / 2 weeks", out: "A detailed audit report prioritized by business impact." },
  { n: "02", t: "Strategy & Design", w: "We design your custom solution, create technical specs, and present a clear implementation roadmap with timelines and results.", meta: "Your time · 2–3 hrs review", out: "A complete blueprint with milestones and success metrics." },
  { n: "03", t: "Build & Integrate", w: "We build, test, and integrate with your existing systems, handling all technical complexity while keeping you updated.", meta: "Your time · weekly 30-min check-ins", out: "A fully functional, tested, documented system." },
  { n: "04", t: "Deploy & Optimize", w: "We launch, train your team, monitor performance, and continuously optimize based on real-world results.", meta: "Your time · training + support", out: "Measurable improvements within the first month." },
];

export const FAQS = [
  ["We already use Shopify automations and Zapier. Isn't that enough?", "Shopify Flow and basic automation tools are great starting points, but they hit limits fast. Ecommerce operations have complex workflows that need sophisticated logic, error handling, multi-system orchestration, and custom integrations with 3PLs, marketplaces, and ERPs. We build enterprise-grade systems that scale with your order volume and handle the complexity basic tools can't."],
  ["How do I know this will work for our specific store?", "That's exactly why we start with a comprehensive audit. We don't propose solutions until we deeply understand your operations, your stack, and your biggest bottlenecks. Our discovery process ensures we're solving your actual problems. You see the roadmap and expected results before you commit to any implementation."],
  ["What if our team resists the change?", "We've implemented automation across dozens of ecommerce brands. Change management is built into our methodology. We involve your team early, design solutions that make their jobs easier rather than threatening them, and provide comprehensive training. When people see automation eliminating their most frustrating manual tasks, adoption happens naturally."],
  ["Isn't custom automation expensive and time-consuming?", "Traditional automation projects can be. Our approach is different. We use proven frameworks, pre-built integrations, and rapid development techniques to deliver custom systems in weeks, at a fraction of traditional costs. You get enterprise-level automation without enterprise-level budgets or timelines."],
  ["How quickly will we see ROI?", "Most clients see measurable time savings within 30 days of deployment. Full ROI typically happens within 3–6 months, depending on scope and order volume. During discovery we calculate expected ROI based on your specific costs and opportunities, so you know exactly what to expect before work begins."],
  ["How much does this cost?", "Pricing depends on scope: automating a single workflow like abandoned cart recovery is very different from a full operations overhaul. Most engagements are quoted after the discovery audit, once we know exactly what needs to be built. We'll always give you a clear fixed price before any work begins — no surprise invoices."],
  ["What's the difference between the free audit and the paid expert consultation?", "The free audit is a self-serve questionnaire that instantly estimates your time and cost savings and recommends a starting service, no call required. The paid 90-minute expert consultation is a deeper 1:1 session where we map your actual ecommerce workflows live, answer detailed technical questions, and leave you with a concrete automation roadmap."],
  ["Will automation replace our team?", "No. Our goal is to remove the repetitive, low-value ops work so your team can focus on the parts of the job that require real judgement — customer relationships, buying decisions, brand strategy. Most clients use the freed-up capacity to handle higher order volumes or launch new channels rather than reduce headcount."],
  ["Is our data secure during this process?", "Yes. We follow least-privilege access practices, use secure authenticated connections for every integration, and never store more data than a workflow needs to function. Specific security requirements can be discussed and agreed upon before any access is granted."],
  ["Do you only work with large ecommerce brands?", "No. We work with brands of all sizes, from founder-led DTC stores to multi-brand ecommerce operations. The audit and roadmap scale to your current order volume and complexity."],
  ["What happens after the automation is built?", "Every project includes documentation and team training so you're never locked in. We also offer ongoing support and retainer options if you'd like us to monitor, maintain, and extend the system as your store grows."],
  ["Can you work with our existing ecommerce tech stack?", "In almost every case, yes. Whether you're on Shopify, WooCommerce, BigCommerce, or a custom setup — with Klaviyo, Gorgias, a 3PL, multiple marketplaces, or your own ERP — we build on top of what you already have. Switching platforms is rarely necessary and adds cost and disruption without improving the outcome."],
  ["How is this different from hiring an in-house automation person?", "An in-house hire is one person with one skill set. We bring a full team's worth of ecommerce automation, AI, and integration expertise on demand — without the overhead of a full-time salary, benefits, or ramp-up time. And when your needs change, our engagement scales with them."],
];

export const CMP = [
  ["Order Processing", "Staff manually check, sort, and route each order to fulfilment — 5–10 min per order at volume", "Orders are automatically verified, tagged, and routed to the right 3PL in under 60 seconds"],
  ["Inventory Sync", "Overselling happens because stock levels are updated manually across channels once or twice a day", "Inventory syncs in real time across Shopify, Amazon, and your 3PL — zero manual updates, zero oversells"],
  ["Abandoned Cart Recovery", "Carts are abandoned and revenue is lost — no systematic follow-up beyond a single email", "Multi-step SMS and email sequences fire automatically, recovering 10–15% of abandoned revenue"],
  ["Customer Support", "Team spends hours answering the same shipping, return, and product questions every day", "AI handles common queries instantly from your knowledge base. Staff only handle complex escalations"],
  ["Returns Processing", "Returns are logged manually, labels issued one by one, refunds processed days later", "Self-serve returns portal issues labels automatically, updates inventory, and triggers refunds on receipt"],
  ["Revenue Reporting", "P&L and channel performance reports compiled manually from multiple exports — weekly or monthly", "Live dashboards pull from all platforms automatically. Reports are always up to date, zero effort"],
];

export const TOOLS = [
  ["Slack", "#611F69", "S"], ["HubSpot", "#FF7A59", "H"], ["Notion", "#000000", "N"],
  ["Google Workspace", "#1A73E8", "G"], ["Salesforce", "#00A1E0", "S"], ["Airtable", "#18BFFF", "A"],
  ["QuickBooks", "#2CA01C", "Q"], ["Zapier", "#FF4F00", "Z"], ["Microsoft 365", "#D83B01", "M"],
  ["Stripe", "#635BFF", "S"], ["Asana", "#F06A6A", "A"], ["Zendesk", "#03363D", "Z"],
];

// Integration logos — images live in /public/integrations/
// { name, src }
export const LOGOS = [
  { name: "OpenAI", src: "/integrations/openai.png" },
  { name: "Gemini", src: "/integrations/gemini.png" },
  { name: "n8n", src: "/integrations/n8n.png" },
  { name: "Zapier", src: "/integrations/zapier.png" },
  { name: "HubSpot", src: "/integrations/hubspot.png" },
  { name: "Salesforce", src: "/integrations/salesforce.png" },
  { name: "Notion", src: "/integrations/notion.png" },
  { name: "Klaviyo", src: "/integrations/klaviyo.png" },
  { name: "Shopify", src: "/integrations/shopify.png" },
  { name: "WordPress", src: "/integrations/wordpress.png" },
  { name: "WhatsApp", src: "/integrations/whatsapp.png" },
  { name: "Facebook", src: "/integrations/facebook.png" },
  { name: "GitHub", src: "/integrations/github.png" },
  { name: "RSS", src: "/integrations/rss.png" },
  { name: "Growth", src: "/integrations/growth.png" },
  { name: "Parrot", src: "/integrations/parrot.png" },
  { name: "Burst", src: "/integrations/burst.png" },
  { name: "Abstract", src: "/integrations/abstract.png" },
];
