import React from "react";
import useSEO from "../hooks/useSEO.js";
import useTranslation from "../hooks/useTranslation.js";
import PageHero from "../components/PageHero.jsx";
import BookInline from "../components/BookInline.jsx";

export default function BookPage() {
  const t = useTranslation();
  useSEO({ title: t.pages.book.metaTitle, description: t.pages.book.metaDesc, canonical: "https://www.eajjy.com/book-free-consultation" });
  return (
    <>
      <PageHero eyebrow={t.pages.book.eyebrow} title={t.pages.book.headline} lead={t.pages.book.lead} />
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
