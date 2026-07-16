import React from "react";
import useSEO from "../hooks/useSEO.js";
import PageHero from "../components/PageHero.jsx";
import BookInline from "../components/BookInline.jsx";

export default function BookPage() {
  useSEO({ title: "Book a Free Consultation", description: "Schedule a free call with EAJJY AI. We will discuss where automation can save your team the most time and map your highest-ROI opportunities.", canonical: "https://www.eajjy.com/book" });
  return (
    <>
      <PageHero
        eyebrow="Book a Call"
        title="Book a Free Consultation"
        lead="Pick a time that works for you. We'll discuss where automation can save your team the most time, no pressure, no commitment."
      />
      <section className="sec wrap" style={{ paddingTop: 24 }}>
        <div className="book-wrap reveal">
          <BookInline />
        </div>
      </section>
      <style>{`
        .book-wrap{border:1px solid var(--border);border-radius:22px;background:var(--glass);
          backdrop-filter:blur(20px);padding:clamp(10px,2vw,20px);min-height:680px}
        .book-inline{width:100%;height:100%;min-height:640px}
      `}</style>
    </>
  );
}
