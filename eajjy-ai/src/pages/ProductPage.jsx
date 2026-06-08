import React from "react";
import PageHero from "../components/PageHero.jsx";
import ClosingCTA from "../sections/ClosingCTA.jsx";

export default function ProductPage() {
  return (
    <>
      <PageHero eyebrow="Product" title="One Platform for Your Automation Stack" lead="A unified view of every workflow, agent, and integration running across your firm." />
      <section className="sec wrap">
        <div className="prob-card reveal" style={{ maxWidth: 720 }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12 }}>This page is ready for your content.</h3>
          <p style={{ color: "var(--gray)", fontSize: 15, lineHeight: 1.6 }}>Drop in product screenshots, feature highlights, and pricing once available. The layout, background, and motion are already wired up.</p>
        </div>
      </section>
      <ClosingCTA />
    </>
  );
}
