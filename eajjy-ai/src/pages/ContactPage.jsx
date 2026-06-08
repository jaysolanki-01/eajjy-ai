import React from "react";
import PageHero from "../components/PageHero.jsx";
import ClosingCTA from "../sections/ClosingCTA.jsx";

export default function ContactPage() {
  return (
    <>
      <PageHero eyebrow="Contact" title="Get Your Free Automation Audit" lead="Tell us where time is leaking and we'll map your highest-ROI automation opportunities." />
      <section className="sec wrap">
        <div className="prob-card reveal" style={{ maxWidth: 720 }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12 }}>This page is ready for your content.</h3>
          <p style={{ color: "var(--gray)", fontSize: 15, lineHeight: 1.6 }}>Drop your contact form or scheduling embed here. Style inputs with border var(--border), background var(--charcoal), and the red accent on focus.</p>
        </div>
      </section>
      <ClosingCTA />
    </>
  );
}
