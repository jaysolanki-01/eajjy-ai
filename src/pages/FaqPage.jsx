import React, { useEffect } from "react";
import useSEO from "../hooks/useSEO.js";
import useTranslation from "../hooks/useTranslation.js";
import PageHero from "../components/PageHero.jsx";
import Faq from "../sections/Faq.jsx";
import ClosingCTA from "../sections/ClosingCTA.jsx";
import { FAQS } from "../data/siteData.jsx";

const SCHEMA_ID = "faq-page-schema";

export default function FaqPage() {
  const t = useTranslation();
  useSEO({
    title: t.pages.faq.metaTitle,
    description: t.pages.faq.metaDesc,
    canonical: "https://www.eajjy.com/faq",
  });

  useEffect(() => {
    const schema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: FAQS.map(([q, a]) => ({
        "@type": "Question",
        name: q,
        acceptedAnswer: {
          "@type": "Answer",
          text: a,
        },
      })),
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = SCHEMA_ID;
    script.text = JSON.stringify(schema);
    document.head.appendChild(script);

    return () => {
      document.getElementById(SCHEMA_ID)?.remove();
    };
  }, []);

  return (
    <>
      <PageHero eyebrow={t.pages.faq.eyebrow} title={t.pages.faq.headline} lead={t.pages.faq.lead} />
      <Faq />
      <ClosingCTA />
    </>
  );
}
