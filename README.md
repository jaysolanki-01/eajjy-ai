<div align="center">

<img src="./public/logo.png" alt="EAJJY AI logo" width="120" />

# EAJJY AI — Marketing Website

**AI & automation agency site for professional services firms — consulting, legal, accounting, real estate, and healthcare practices.**

[![Website](https://img.shields.io/badge/website-eajjy.com-0A84FF?style=flat-square)](https://www.eajjy.com/)
[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![React Router](https://img.shields.io/badge/React_Router-6.26-CA4245?style=flat-square&logo=reactrouter&logoColor=white)](https://reactrouter.com/)
[![License](https://img.shields.io/badge/license-Proprietary-lightgrey?style=flat-square)](#license)

[Live Site](https://www.eajjy.com/) · [Services](https://www.eajjy.com/services) · [Work](https://www.eajjy.com/work) · [Blog](https://www.eajjy.com/blog) · [Book a Call](https://www.eajjy.com/book)

</div>

<br />

<div align="center">
<img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1400&q=60" alt="Dark, data-driven interface — representative of the site's Neo Cyber Minimal aesthetic" width="100%" style="border-radius: 12px;" />
<sub>Representative imagery — not an actual product screenshot.</sub>
</div>

<br />

## Overview

**EAJJY AI** builds AI and automation systems for professional services firms — eliminating repetitive manual work, integrating existing tools, and helping firms scale revenue without scaling headcount. This repository is the source for the company's public marketing website, **[eajjy.com](https://www.eajjy.com/)**.

The site is a fast, statically-deployable **single-page application** built with React and Vite, styled in a dark-mode **"Neo Cyber Minimal"** design language, with a self-contained Markdown-powered blog and Cal.com-based booking flow.

<br />

## Table of Contents

- [Design Language](#design-language)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Routes / Sitemap](#routes--sitemap)
- [Content Management](#content-management)
- [Blog System](#blog-system)
- [SEO & AI Discoverability](#seo--ai-discoverability)
- [Deployment](#deployment)
- [Utility Scripts](#utility-scripts)
- [Contributing Notes](#contributing-notes)
- [License](#license)

<br />

## Design Language

| Element | Choice |
|---|---|
| Theme | Dark-mode, high-contrast, glow accents |
| Display font | [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk) |
| Body font | [Inter](https://fonts.google.com/specimen/Inter) |
| Motion | Scroll-reveal via `IntersectionObserver`, animated neural-network canvas background, trailing custom cursor |
| Accessibility | Full `prefers-reduced-motion` support throughout |

<br />

## Tech Stack

<div align="center">

| Layer | Technology |
|---|---|
| Framework | [React 18](https://react.dev/) |
| Build tool | [Vite 5](https://vitejs.dev/) |
| Routing | [React Router 6](https://reactrouter.com/) |
| Markdown rendering | [react-markdown](https://github.com/remarkjs/react-markdown) + [remark-gfm](https://github.com/remarkjs/remark-gfm) |
| Scheduling | [Cal.com Embed React](https://cal.com/) |
| SEO | [vite-plugin-sitemap](https://www.npmjs.com/package/vite-plugin-sitemap) |
| Hosting target | [Vercel](https://vercel.com/) (SPA rewrites configured) |

</div>

<br />

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18+
- npm

### Installation

```bash
git clone https://github.com/<your-org>/eajjy-ai.git
cd eajjy-ai
npm install
```

### Development

```bash
npm run dev
```

Starts the Vite dev server at `http://localhost:3000`.

### Production build

```bash
npm run build
```

Outputs a static, deployable bundle to `dist/`.

### Preview a production build locally

```bash
npm run preview
```

<br />

## Project Structure

```
eajjy-ai/
├─ index.html                    Vite HTML entry point (mounts #root)
├─ vite.config.js                Dev server, sitemap generation, blog route discovery
├─ vercel.json                   SPA rewrite rules for Vercel hosting
├─ package.json
│
├─ public/                       Static assets served as-is
│  ├─ logo.png, favicons, manifest
│  ├─ clients/                   Client/partner logos
│  ├─ integrations/              Integration marketplace icons (n8n, OpenAI, Zapier, ...)
│  ├─ generated/                 Generated placeholder imagery (blog covers, hero art)
│  ├─ llms.txt / llms-full.txt   Machine-readable site summary for AI assistants
│
├─ scripts/                      Build & asset utility scripts (see below)
│
└─ src/
   ├─ main.jsx                   App bootstrap + BrowserRouter
   ├─ App.jsx                    Route table
   ├─ styles.css                 Design system: tokens, layout, animation
   │
   ├─ data/
   │  └─ siteData.js             Centralized copy: services, steps, FAQs, etc.
   │
   ├─ content/
   │  └─ blog/                   Blog posts, authored in Markdown
   │
   ├─ i18n/
   │  └─ en.json                 Localization strings
   │
   ├─ lib/
   │  └─ blog.js                 Markdown loading/parsing helpers
   │
   ├─ hooks/
   │  └─ useScrollReveal.js      IntersectionObserver reveal-on-scroll
   │
   ├─ components/                Shared across every page
   │  ├─ Layout.jsx               Background + Cursor + Navbar + Footer + <Outlet/>
   │  ├─ Background.jsx           Neural-network canvas + glow/noise/vignette
   │  ├─ CustomCursor.jsx         Trailing dot + ring
   │  ├─ Navbar.jsx / MobileMenu.jsx
   │  ├─ Footer.jsx
   │  ├─ PageHero.jsx             Compact hero for inner pages
   │  ├─ Logo.jsx
   │  ├─ BookButton.jsx / BookInline.jsx   Cal.com booking triggers
   │  ├─ ExpertCallFloat.jsx
   │  └─ WhatsAppButton.jsx
   │
   ├─ sections/                  Homepage building blocks (reused across pages)
   │  ├─ Hero.jsx
   │  ├─ ClientLogos.jsx
   │  ├─ Problem.jsx
   │  ├─ Comparison.jsx
   │  ├─ Services.jsx
   │  ├─ Integrations.jsx
   │  ├─ Process.jsx
   │  ├─ Faq.jsx
   │  └─ ClosingCTA.jsx
   │
   └─ pages/                     One file per sitemap page
      ├─ Home.jsx
      ├─ ServicesPage.jsx  +  6 service detail pages (BPA, AI Product, Vibe Coding, N8n, Consultancy, LLM/RAG)
      ├─ UseCasesPage.jsx
      ├─ ProcessPage.jsx
      ├─ FaqPage.jsx
      ├─ ProductPage.jsx, Work.jsx, HirePage.jsx, ContactPage.jsx
      ├─ BlogPage.jsx  +  BlogPostPage.jsx
      ├─ BookPage.jsx
      └─ ThankYouPage.jsx
```

<br />

## Routes / Sitemap

| Path | Page |
|---|---|
| `/` | Home |
| `/services` | Services overview |
| `/services/business-process-automation` | Business Process Automation |
| `/services/ai-product-development` | AI Product Development |
| `/services/vibe-coding` | Vibe Coding |
| `/services/n8n-automation` | N8n Automation |
| `/services/ai-automation-consultancy` | AI Automation Consultancy |
| `/services/llm-rag-solutions` | LLM & RAG Solutions |
| `/use-cases` | Use Cases |
| `/work` | Case Studies / Work |
| `/process` | Our Process |
| `/faq` | FAQ |
| `/blog` | Blog index |
| `/blog/:slug` | Individual blog post |
| `/hire-ai-automation-expert` | Hire an AI & Automation Expert |
| `/contact` | Free Automation Audit |
| `/book` | Book a Free Consultation (Cal.com) |
| `/thank-you` | Post-submission confirmation |

All routes are pre-registered in `vite.config.js` for sitemap generation, including blog slugs discovered automatically from `src/content/blog/`.

<br />

## Content Management

All structural copy (services, process steps, FAQs, comparisons, testimonials) lives in a single source of truth:

```
src/data/siteData.js
```

Edit that file and every page consuming it updates automatically — no need to touch individual page components for copy changes.

Localization strings are kept separately in `src/i18n/en.json`.

<br />

## Blog System

Blog posts are authored as plain **Markdown** files in `src/content/blog/`, parsed with `react-markdown` and `remark-gfm` (GitHub-Flavored Markdown: tables, task lists, strikethrough, etc.).

```
src/content/blog/
├─ 5-workflows-to-automate-first.md
├─ agentic-ai-readiness-assessment.md
├─ rag-vs-fine-tuning.md
├─ reporting-9-hours-to-12-minutes.md
├─ setup-n8n-azure-docker.md
├─ top-10-n8n-agencies-germany.md
└─ what-is-agentic-ai.md
```

`src/lib/blog.js` handles loading and parsing. New posts are picked up automatically by both the blog index and the sitemap generator in `vite.config.js` — just drop a new `.md` file into the folder.

<br />

## SEO & AI Discoverability

The site ships machine-readable summaries alongside standard SEO assets, so both search engines and AI assistants/agents can accurately index and cite it:

- `public/sitemap.xml` — auto-generated at build time via `vite-plugin-sitemap`
- `public/robots.txt`
- `public/llms.txt` / `public/llms-full.txt` — a structured, plain-language summary of the company, services, and key pages, following the emerging [llms.txt convention](https://llmstxt.org/) for AI-assistant discoverability

<br />

## Deployment

The project is configured for **Vercel**:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

This ensures all client-side routes resolve correctly on a static host. Any static host that supports SPA rewrites (Netlify, Cloudflare Pages, S3 + CloudFront, etc.) works equally well — just replicate the same catch-all rewrite rule and serve the contents of `dist/`.

<br />

## Utility Scripts

Located in `scripts/`:

| Script | Purpose |
|---|---|
| `generate_placeholders.py` | Generates placeholder imagery for blog covers, hero art, and team/case-study thumbnails |
| `remove-logo-bg.py` | Strips the background from the logo source image |
| `verify_generated.py` | Validates that all referenced generated assets exist on disk |

<br />

## Contributing Notes

- The integration tiles in `sections/Integrations.jsx` use **brand-colored monogram marks**, not the partners' official trademarked logos. To display real vendor logos, replace the `<span>` inside each `.mark` with the vendor's official SVG (subject to that vendor's brand guidelines).
- Keep new pages consistent with the existing dark, glow-accented "Neo Cyber Minimal" system defined in `src/styles.css`.
- Respect `prefers-reduced-motion` in any new animated component — existing components already handle this and can be used as a reference.
- New blog posts only require a Markdown file in `src/content/blog/`; routing and sitemap entries are generated automatically.

<br />

## License

This repository contains proprietary source code for the **EAJJY AI** marketing website. All rights reserved © EAJJY AI. Not licensed for reuse, redistribution, or derivative works without written permission.

<br />

<div align="center">
<sub>Built and maintained by <a href="https://www.eajjy.com/">EAJJY AI</a> — Ahmedabad, India.</sub>
</div>
