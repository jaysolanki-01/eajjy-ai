import React from "react";
import useSEO from "../hooks/useSEO.js";
import PageHero from "../components/PageHero.jsx";
import Faq from "../sections/Faq.jsx";
import ClosingCTA from "../sections/ClosingCTA.jsx";

export default function FaqPage() {
  useSEO({ title: "Frequently Asked Questions", description: "Answers to common questions about working with EAJJY AI — pricing, process, data security, timeline, tool compatibility, and more." });
  return (
    <>
      <PageHero eyebrow="FAQ" title="Questions, Answered" lead="The things professional services leaders ask us most before getting started." />
      <Faq />
      <ClosingCTA />
    </>
  );
}
