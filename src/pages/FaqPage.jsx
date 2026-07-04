import React, { useEffect } from "react";
import useSEO from "../hooks/useSEO.js";
import PageHero from "../components/PageHero.jsx";
import Faq from "../sections/Faq.jsx";
import ClosingCTA from "../sections/ClosingCTA.jsx";
import { FAQS } from "../data/siteData.jsx";

const SCHEMA_ID = "faq-page-schema";

export default function FaqPage() {
  useSEO({
    title: "Frequently Asked Questions",
    description: "Answers to common questions about working with EAJJY AI — pricing, process, data security, timeline, tool compatibility, and more.",
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
      <PageHero
        eyebrow="FAQ"
        title="Questions, Answered"
        lead="The things professional services leaders ask us most before getting started."
      />
      <Faq />
      <ClosingCTA />
    </>
  );
}
