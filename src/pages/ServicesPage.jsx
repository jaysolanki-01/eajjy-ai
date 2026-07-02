import React from "react";
import useSEO from "../hooks/useSEO.js";
import PageHero from "../components/PageHero.jsx";
import Services from "../sections/Services.jsx";
import Integrations from "../sections/Integrations.jsx";
import ClosingCTA from "../sections/ClosingCTA.jsx";

export default function ServicesPage() {
  useSEO({ title: "AI & Automation Services", description: "Six specialist services: Business Process Automation, AI Product Development, Vibe Coding, N8n Automation, AI Consultancy, and LLM & RAG Solutions." });
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="AI & Automation, Built for the Way You Work"
        lead="From full process redesign to targeted automation, choose the engagement that matches where you are today."
      />
      <Services />
      <div className="divider" />
      <Integrations />
      <ClosingCTA />
    </>
  );
}
