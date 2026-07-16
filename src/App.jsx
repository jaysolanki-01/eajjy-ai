import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Home from "./pages/Home.jsx";
import ServicesPage from "./pages/ServicesPage.jsx";
import UseCasesPage from "./pages/UseCasesPage.jsx";
import ProcessPage from "./pages/ProcessPage.jsx";
import FaqPage from "./pages/FaqPage.jsx";
import ProductPage from "./pages/ProductPage.jsx";
import WorkPage from "./pages/Work.jsx";
import HirePage from "./pages/HirePage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import BPAPage from "./pages/BPAPage.jsx";
import AIProductPage from "./pages/AIProductPage.jsx";
import VibeCodingPage from "./pages/VibeCodingPage.jsx";
import N8nPage from "./pages/N8nPage.jsx";
import ConsultancyPage from "./pages/ConsultancyPage.jsx";
import LLMRagPage from "./pages/LLMRagPage.jsx";
import BlogPage from "./pages/BlogPage.jsx";
import BlogPostPage from "./pages/BlogPostPage.jsx";
import BookPage from "./pages/BookPage.jsx";
import ThankYouPage from "./pages/ThankYouPage.jsx";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/use-cases" element={<UseCasesPage />} />
        <Route path="/process" element={<ProcessPage />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/work" element={<WorkPage />} />
        <Route path="/hire-ai-automation-expert" element={<HirePage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/services/business-process-automation" element={<BPAPage />} />
        <Route path="/services/ai-product-development" element={<AIProductPage />} />
        <Route path="/services/vibe-coding" element={<VibeCodingPage />} />
        <Route path="/services/n8n-automation" element={<N8nPage />} />
        <Route path="/services/ai-automation-consultancy" element={<ConsultancyPage />} />
        <Route path="/services/llm-rag-solutions" element={<LLMRagPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />
        <Route path="/book-free-consultation" element={<BookPage />} />
        <Route path="/book" element={<BookPage />} />{/* redirect legacy URL */}
        <Route path="/thank-you" element={<ThankYouPage />} />

        {/* German /de/* routes — same components, useTranslation hook returns de.json */}
        <Route path="/de" element={<Home />} />
        <Route path="/de/services" element={<ServicesPage />} />
        <Route path="/de/use-cases" element={<UseCasesPage />} />
        <Route path="/de/process" element={<ProcessPage />} />
        <Route path="/de/faq" element={<FaqPage />} />
        <Route path="/de/product" element={<ProductPage />} />
        <Route path="/de/work" element={<WorkPage />} />
        <Route path="/de/hire-ai-automation-expert" element={<HirePage />} />
        <Route path="/de/contact" element={<ContactPage />} />
        <Route path="/de/services/business-process-automation" element={<BPAPage />} />
        <Route path="/de/services/ai-product-development" element={<AIProductPage />} />
        <Route path="/de/services/vibe-coding" element={<VibeCodingPage />} />
        <Route path="/de/services/n8n-automation" element={<N8nPage />} />
        <Route path="/de/services/ai-automation-consultancy" element={<ConsultancyPage />} />
        <Route path="/de/services/llm-rag-solutions" element={<LLMRagPage />} />
        <Route path="/de/blog" element={<BlogPage />} />
        <Route path="/de/blog/:slug" element={<BlogPostPage />} />
        <Route path="/de/book-free-consultation" element={<BookPage />} />
        <Route path="/de/book" element={<BookPage />} />
        <Route path="/de/thank-you" element={<ThankYouPage />} />
        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  );
}
