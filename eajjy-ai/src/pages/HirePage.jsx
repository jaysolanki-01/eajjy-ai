import React from "react";
import PageHero from "../components/PageHero.jsx";
import ClosingCTA from "../sections/ClosingCTA.jsx";

export default function HirePage() {
  return (
    <>
      <PageHero eyebrow="Hire" title="Hire an AI Automation Developer" lead="Embed senior automation talent directly into your team, on flexible terms." />
      <section className="sec wrap">
        <div className="prob-card reveal" style={{ maxWidth: 720 }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12 }}>This page is ready for your content.</h3>
          <p style={{ color: "var(--gray)", fontSize: 15, lineHeight: 1.6 }}>Add engagement models, availability, and a booking form here. Connect the CTA buttons to your scheduling tool.</p>
        </div>
      </section>
      <ClosingCTA />
    </>
  );
}
