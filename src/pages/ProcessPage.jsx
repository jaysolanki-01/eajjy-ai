import React from "react";
import useSEO from "../hooks/useSEO.js";
import useTranslation from "../hooks/useTranslation.js";
import PageHero from "../components/PageHero.jsx";
import Process from "../sections/Process.jsx";
import Faq from "../sections/Faq.jsx";
import ClosingCTA from "../sections/ClosingCTA.jsx";

export default function ProcessPage() {
  const t = useTranslation();
  useSEO({ title: t.pages.process.metaTitle, description: t.pages.process.metaDesc, canonical: "https://www.eajjy.com/process" });
  return (
    <>
      <PageHero eyebrow={t.pages.process.eyebrow} title={t.pages.process.headline} lead={t.pages.process.lead} />
      <Process />
      <div className="divider" />
      <Faq />
      <ClosingCTA />
    </>
  );
}
