import React from "react";
import useSEO from "../hooks/useSEO.js";
import useTranslation from "../hooks/useTranslation.js";
import Hero from "../sections/Hero.jsx";
import ClientLogos from "../sections/ClientLogos.jsx";
import Problem from "../sections/Problem.jsx";
import Comparison from "../sections/Comparison.jsx";
import Services from "../sections/Services.jsx";
import Integrations from "../sections/Integrations.jsx";
import Process from "../sections/Process.jsx";
import Faq from "../sections/Faq.jsx";
import ClosingCTA from "../sections/ClosingCTA.jsx";

const Divider = () => <div className="divider" />;

export default function Home() {
  const t = useTranslation();
  useSEO({
    title: t.pages.home.metaTitle,
    description: t.pages.home.metaDesc,
    canonical: "https://www.eajjy.com/",
  });

  return (
    <>
      <Hero />
      <ClientLogos />
      <Problem />
      <Divider />
      <Comparison />
      <Divider />
      <Services />
      <Divider />
      <Integrations />
      <Divider />
      <Process />
      <Divider />
      <Faq />
      <ClosingCTA />
    </>
  );
}
