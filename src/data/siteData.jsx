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
    title: "Business Process Automation",
    to: "/services/business-process-automation",
    desc: "Complete workflow transformation using AI-powered automation to eliminate manual, repetitive tasks across your entire operation.",
    chips: ["Onboarding workflows", "Document processing", "Intelligent routing", "Reporting automation"],
    impact: "Take on 30–40% more clients without hiring additional staff.",
    icon: <path d="M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z" />,
  },
  {
    title: "AI Product Development",
    to: "/services/ai-product-development",
    desc: "Custom AI solutions built for your business model, from intelligent chatbots and recommendation engines to predictive analytics that give you a competitive edge.",
    chips: ["Custom AI models", "Client-facing tools", "Predictive analytics", "NLP & document analysis"],
    impact: "Launch AI-enhanced offerings that command premium pricing.",
    icon: (<><circle cx="12" cy="12" r="3" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M5 19l2-2M17 7l2-2" /></>),
  },
  {
    title: "Vibe Coding",
    to: "/services/vibe-coding",
    desc: "Rapid custom development that brings ideas to life fast, using no-code/low-code plus traditional development to ship in weeks, not months.",
    chips: ["2–4 week deploys", "Web apps", "Client portals", "Integration hubs"],
    impact: "Stop forcing your processes into off-the-shelf software.",
    icon: <path d="M8 6l-6 6 6 6M16 6l6 6-6 6" />,
  },
  {
    title: "N8n Automation",
    to: "/services/n8n-automation",
    desc: "Enterprise-grade workflow automation with N8n that connects your tools, moves data automatically, and eliminates repetitive tasks without code.",
    chips: ["Custom workflows", "Multi-platform", "Data sync", "Error handling"],
    impact: "Data flows automatically. Nothing falls through the cracks.",
    icon: (<><circle cx="6" cy="6" r="2" /><circle cx="18" cy="6" r="2" /><circle cx="6" cy="18" r="2" /><circle cx="18" cy="18" r="2" /><path d="M8 6h8M6 8v8M18 8v8M8 18h8" /></>),
  },
  {
    title: "AI Automation Consultancy",
    to: "/services/ai-automation-consultancy",
    desc: "Strategic guidance to identify your highest-impact automation opportunities, design your roadmap, and ensure successful implementation aligned with your business goals.",
    chips: ["Operations audit", "ROI analysis", "Automation roadmap", "Tech stack recommendations", "Team training"],
    impact: "Achieve measurable results in 90 days or less, without costly mistakes or vendor lock-in.",
    icon: <path d="M12 2l3 7h7l-5.5 4 2 7L12 17l-6.5 5 2-7L2 9h7z" />,
  },
  {
    title: "LLM & RAG Solutions",
    to: "/services/llm-rag-solutions",
    desc: "Language AI grounded in your own data using retrieval-augmented generation, delivering accurate, cited answers from the knowledge you already have.",
    chips: ["Knowledge assistants", "RAG pipelines", "Document Q&A", "Semantic search"],
    impact: "Trustworthy AI answers sourced from your data, not the open web.",
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
  ["We're already using tools like Zapier. Isn't that enough?", "Basic automation tools are great starting points, but they hit limits fast. Professional services firms have complex workflows that need sophisticated logic, error handling, and custom integrations. We build enterprise-grade systems that scale with your growth and handle the complexity basic tools can't."],
  ["How do I know this will work for our specific situation?", "That's exactly why we start with a comprehensive audit. We don't propose solutions until we deeply understand your operations. Our discovery process ensures we're solving your actual problems, not selling pre-packaged products. You see the roadmap and expected results before you commit to implementation."],
  ["What if our team resists the change?", "We've implemented automation across dozens of ecommerce brands. Change management is built into our methodology. We involve your team early, design solutions that make their jobs easier (not obsolete), and provide comprehensive training. When people see automation eliminating their most frustrating manual tasks, adoption happens naturally."],
  ["Isn't custom AI development expensive and time-consuming?", "Traditional AI projects can be. Our approach is different. We use proven frameworks, pre-trained models, and rapid development techniques to deliver custom solutions in weeks, at a fraction of traditional costs. You get enterprise-level capabilities without enterprise-level budgets or timelines."],
  ["How quickly will we see ROI?", "Most clients see measurable time savings within 30 days of deployment. Full ROI typically happens within 3–6 months, depending on scope. During discovery we calculate expected ROI based on your specific costs and opportunities, so you know exactly what to expect."],
  ["How much does this cost?", "Pricing depends on scope: a single workflow automation is very different from a full operations overhaul. Most engagements are quoted after the discovery audit, once we know exactly what needs to be built. We'll always give you a clear number before any work begins, no surprise invoices."],
  ["What's the difference between the free audit and the paid expert consultation?", "The free audit is a self-serve questionnaire that instantly estimates your time and cost savings and recommends a starting service, no call required. The paid 90-minute expert consultation is a deeper 1:1 session where we map your actual workflows live, answer detailed technical questions, and leave you with a concrete automation roadmap."],
  ["Will automation replace our employees?", "No. Our goal is to remove repetitive, low-value work so your team can focus on client relationships, strategy, and the parts of the job that actually need a human. Most clients use the freed-up time to take on more clients rather than reduce headcount."],
  ["Is our data secure during this process?", "Yes. We follow least-privilege access practices, use secure authenticated connections for every integration, and never store more data than a workflow needs to function. Specific security requirements (NDAs, data residency, compliance frameworks) can be discussed and agreed upon before any access is granted."],
  ["Do you only work with large firms?", "No. We work with firms of all sizes, from solo practitioners to multi-partner firms. The audit and roadmap scale to your size. Many of our highest-ROI projects have been for small teams drowning in manual admin work."],
  ["What happens after the automation is built? Do you just disappear?", "No. Every project includes documentation and team training so you're never locked in or dependent on us to make basic changes. We also offer ongoing support and retainer options if you'd like us to monitor, maintain, and extend the system over time."],
  ["Can you work with our existing tech stack, or do we need to switch tools?", "In almost every case we build on top of what you already use. Switching platforms is rarely necessary and adds cost and disruption without improving the outcome. If a tool genuinely is a bottleneck, we'll tell you plainly, and explain why, before recommending a change."],
  ["How is this different from hiring an in-house automation person?", "An in-house hire is one person with one skill set, fully loaded cost included. We bring a full team's worth of automation, AI, and integration expertise on demand, only when you need it, without the overhead of a full-time salary, benefits, or ramp-up time."],
];

export const CMP = [
  ["Client Onboarding", "4–6 hours of manual data entry, document collection, and system setup per client", "20 minutes. Automated forms, instant data sync, and system provisioning"],
  ["Reporting", "8–10 hrs/week manually compiling data from multiple sources into client reports", "30 min/week. Auto-generated reports pulling real-time data from all platforms"],
  ["Email Management", "2–3 hrs/day sorting, responding, and routing emails to the right people", "AI sorts, prioritizes, and drafts responses. Your team handles only what needs human input"],
  ["Document Processing", "Hours scanning invoices, contracts, and forms, manually entering data", "AI extracts, categorizes, and routes all data instantly with 99% accuracy"],
  ["Lead Qualification", "Sales team spends hours manually reviewing and scoring every lead", "AI instantly scores and routes qualified leads to the right person"],
  ["Data Entry", "Team members spend 5–10 hrs/week copying data between systems", "Zero manual entry. Data flows automatically between all your tools"],
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
