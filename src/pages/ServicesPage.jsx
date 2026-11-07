import React from "react";
import useSEO from "../hooks/useSEO.js";
import useTranslation from "../hooks/useTranslation.js";
import PageHero from "../components/PageHero.jsx";
import Services from "../sections/Services.jsx";
import Integrations from "../sections/Integrations.jsx";
import ClosingCTA from "../sections/ClosingCTA.jsx";

export default function ServicesPage() {
  const t = useTranslation();
  useSEO({ title: t.pages.services.metaTitle, description: t.pages.services.metaDesc, canonical: "https://www.eajjy.com/services" });
  return (
    <>
      <PageHero
        eyebrow={t.pages.services.eyebrow}
        title={t.pages.services.headline}
        lead={t.pages.services.lead}
      />
      <Services />
      <div className="divider" />
      <Integrations />
      <ClosingCTA />
    </>
  );
}
