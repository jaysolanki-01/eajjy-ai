import React from "react";
import PageHero from "../components/PageHero.jsx";
import Faq from "../sections/Faq.jsx";
import ClosingCTA from "../sections/ClosingCTA.jsx";

export default function FaqPage() {
  return (
    <>
      <PageHero eyebrow="FAQ" title="Questions, Answered" lead="The things professional services leaders ask us most before getting started." />
      <Faq />
      <ClosingCTA />
    </>
  );
}
