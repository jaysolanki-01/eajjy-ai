import React from "react";
import PageHero from "../components/PageHero.jsx";
import Comparison from "../sections/Comparison.jsx";
import ClosingCTA from "../sections/ClosingCTA.jsx";

export default function UseCasesPage() {
  return (
    <>
      <PageHero
        eyebrow="Use Cases"
        title="What Changes When Operations Run Themselves"
        lead="A side-by-side look at the everyday tasks we automate for professional services firms."
      />
      <Comparison />
      <ClosingCTA />
    </>
  );
}
