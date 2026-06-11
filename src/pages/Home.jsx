import React from "react";
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
