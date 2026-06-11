# EAJJY AI — Website

A premium dark-mode marketing site for an AI & automation agency, in the **Neo Cyber Minimal** style.
Built with **React + Vite + React Router**. Fonts: Space Grotesk (display) + Inter (body).

## Run it

```bash
npm install
npm run dev      # start dev server
npm run build    # production build -> dist/
npm run preview  # preview the build
```

## Project structure

```
eajjy-ai/
├─ index.html                 Vite HTML entry (mounts #root)
├─ package.json
├─ vite.config.js
└─ src/
   ├─ main.jsx                App bootstrap + BrowserRouter
   ├─ App.jsx                 Route table (one route per page)
   ├─ styles.css              Full design system (tokens, layout, animations)
   ├─ data/
   │   └─ siteData.js         All copy/content (services, steps, FAQs, etc.)
   ├─ hooks/
   │   └─ useScrollReveal.js  IntersectionObserver reveal-on-scroll
   ├─ components/             Shared, reused on every page
   │   ├─ Layout.jsx          Background + Cursor + Navbar + Footer + <Outlet/>
   │   ├─ Background.jsx       Neural-network canvas + glow/noise/vignette
   │   ├─ CustomCursor.jsx     Trailing dot + ring
   │   ├─ Navbar.jsx
   │   ├─ MobileMenu.jsx
   │   ├─ Footer.jsx
   │   ├─ PageHero.jsx         Compact hero for inner pages
   │   └─ Arrow.jsx
   ├─ sections/               Homepage building blocks (also reused on pages)
   │   ├─ Hero.jsx
   │   ├─ ClientLogos.jsx
   │   ├─ Problem.jsx
   │   ├─ Comparison.jsx
   │   ├─ Services.jsx
   │   ├─ Integrations.jsx
   │   ├─ Process.jsx
   │   ├─ Faq.jsx
   │   └─ ClosingCTA.jsx
   └─ pages/                  One file per sitemap page
       ├─ Home.jsx
       ├─ ServicesPage.jsx
       ├─ UseCasesPage.jsx
       ├─ ProcessPage.jsx
       ├─ FaqPage.jsx
       ├─ ProductPage.jsx     (placeholder, ready for content)
       ├─ WorkPage.jsx        (placeholder)
       ├─ HirePage.jsx        (placeholder)
       └─ ContactPage.jsx     (placeholder)
```

## Routes

| Path          | Page            |
|---------------|-----------------|
| `/`           | Home            |
| `/services`   | Services        |
| `/use-cases`  | Use Cases       |
| `/process`    | Our Process     |
| `/faq`        | FAQ             |
| `/product`    | Product *(stub)*|
| `/work`       | Work *(stub)*   |
| `/hire`       | Hire a Developer *(stub)* |
| `/contact`    | Contact / Audit *(stub)*  |

## Editing content

All text lives in `src/data/siteData.js`. Edit there and every page updates.

## Notes

- The integration tiles use brand-colored monogram marks, **not** the companies'
  official trademarked logos. To use real logos, replace the `<span>` inside each
  `.mark` in `sections/Integrations.jsx` with the vendor's official SVG.
- Everything respects `prefers-reduced-motion`.
