import React from "react";
import useSEO from "../hooks/useSEO.js";
import PageHero from "../components/PageHero.jsx";
import Process from "../sections/Process.jsx";
import Faq from "../sections/Faq.jsx";
import ClosingCTA from "../sections/ClosingCTA.jsx";

export default function ProcessPage() {
  useSEO({ title: "Our Process – How We Work", description: "Four-stage engagement: Discovery & Audit, Strategy & Design, Build & Integrate, Deploy & Optimize. Measurable results within 90 days." });
  return (
    <>
      <PageHero
        eyebrow="Our Process"
        title="From Chaos to Automated in 90 Days"
        lead="A proven, low-lift methodology that ships measurable results without disrupting your team."
      />
      <Process />
      <div className="divider" />
      <Faq />
      <ClosingCTA />
    </>
  );
}
