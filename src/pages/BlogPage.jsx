import React from "react";
import { Link } from "react-router-dom";
import useSEO from "../hooks/useSEO.js";
import useTranslation from "../hooks/useTranslation.js";
import PageHero from "../components/PageHero.jsx";
import ClosingCTA from "../sections/ClosingCTA.jsx";
import Arrow from "../components/Arrow.jsx";
import { posts, formatDate } from "../lib/blog.js";

const COVER_MAP = {
  "what-is-agentic-ai": "/generated/blog-what-is-agentic-ai.png",
  "agentic-ai-readiness-assessment": "/generated/blog-agentic-ai-readiness.png",
  "rag-vs-fine-tuning": "/generated/blog-rag-vs-fine-tuning.png",
  "top-10-n8n-agencies-germany": "/generated/blog-n8n-germany.png",
  "setup-n8n-azure-docker": "/generated/blog-n8n-azure-docker.png",
  "reporting-9-hours-to-12-minutes": "/generated/blog-reporting-automation.png",
  "5-workflows-to-automate-first": "/generated/blog-placeholder.png",
  "ecommerce-automation": "/generated/blog-placeholder.png",
};

function coverFor(post) {
  return COVER_MAP[post.slug] || post.cover || "/generated/blog-placeholder.png";
}

function PostMeta({ post }) {
  return (
    <div className="bl-meta">
      <span className="bl-meta-author">{post.author || "Divyesh Solanki"}</span>
      {post.date && <span className="bl-dot">·</span>}
      {post.date && <span>{formatDate(post.date)}</span>}
      {post.read && <span className="bl-dot">·</span>}
      {post.read && <span>{post.read}</span>}
    </div>
  );
}

export default function BlogPage() {
  const t = useTranslation();
  useSEO({ title: t.pages.blog.metaTitle, description: t.pages.blog.metaDesc, canonical: "https://www.eajjy.com/blog" });
  const [featured, ...rest] = posts;

  return (
    <>
      <PageHero eyebrow={t.pages.blog.eyebrow} title={t.pages.blog.headline} lead={t.pages.blog.lead} />

      <section className="sec wrap">
        {posts.length === 0 ? (
          <div className="prob-card" style={{ maxWidth: 620 }}>
            <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 10 }}>No posts yet</h3>
            <p style={{ color: "var(--gray)", fontSize: 15, lineHeight: 1.6 }}>New articles will appear here automatically as they're published.</p>
          </div>
        ) : (
          <>
            {/* Featured (most recent) */}
            <Link to={`/blog/${featured.slug}`} className="bl-featured reveal">
              <div className="bl-featured-body">
                <div className="bl-tags">{featured.tags.slice(0, 3).map((t) => <span key={t} className="bl-tag">{t}</span>)}</div>
                <h2>{featured.title}</h2>
                <p>{featured.excerpt}</p>
                <PostMeta post={featured} />
                <span className="bl-read">Read article <Arrow /></span>
              </div>
              <div className="bl-featured-art" aria-hidden="true">
                 <img src={coverFor(featured)} alt="" loading="lazy" decoding="async" />
               </div>
            </Link>

            {/* Grid of the rest */}
            {rest.length > 0 && (
              <div className="bl-grid stagger">
                {rest.map((post) => (
                  <Link key={post.slug} to={`/blog/${post.slug}`} className="bl-card">
                    <div className="bl-card-art" aria-hidden="true">
                      <img src={coverFor(post)} alt="" loading="lazy" decoding="async" />
                    </div>
                    <div className="bl-card-body">
                      <div className="bl-tags">{post.tags.slice(0, 3).map((t) => <span key={t} className="bl-tag">{t}</span>)}</div>
                      <h3>{post.title}</h3>
                      <p>{post.excerpt}</p>
                      <PostMeta post={post} />
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </>
        )}
      </section>

      <ClosingCTA />
      <style>{BLOG_CSS}</style>
    </>
  );
}

const BLOG_CSS = `
  .bl-featured{display:grid;grid-template-columns:1.5fr 1fr;gap:0;border:1px solid var(--border);
    border-radius:22px;overflow:hidden;background:var(--glass);backdrop-filter:blur(20px);
    transition:.45s var(--ease);margin-bottom:28px}
  .bl-featured:hover{border-color:rgba(255,43,43,.4);transform:translateY(-4px)}
  .bl-featured-body{padding:clamp(28px,4vw,44px);display:flex;flex-direction:column;align-items:flex-start}
  .bl-featured h2{font-size:clamp(24px,3vw,34px);margin:14px 0 14px;max-width:18ch}
  .bl-featured p{color:var(--gray);font-size:16px;line-height:1.6;margin-bottom:20px;max-width:48ch}
  .bl-featured-art,.bl-card-art{position:relative;background:
      radial-gradient(120% 120% at 80% 0%,rgba(255,43,43,.28),transparent 60%),
      linear-gradient(160deg,#1a1a1a,#0a0a0a);display:block;overflow:hidden}
  .bl-featured-art img,.bl-card-art img{width:100%;height:100%;object-fit:cover;display:block}
  .bl-featured-art{min-height:240px}
  .bl-card-art{height:150px}
  .bl-featured-art::after,.bl-card-art::after{content:"";position:absolute;inset:0;
    background-image:radial-gradient(rgba(255,255,255,.05) 1px,transparent 1px);background-size:18px 18px;
    pointer-events:none}

  .bl-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;margin-top:4px}
  .bl-card{display:flex;flex-direction:column;border:1px solid var(--border);border-radius:18px;
    overflow:hidden;background:var(--glass);backdrop-filter:blur(20px);transition:.4s var(--ease)}
  .bl-card:hover{border-color:rgba(255,43,43,.4);transform:translateY(-5px)}
  .bl-card-art{height:150px}
  .bl-card-art span{font-size:64px}
  .bl-card-body{padding:22px;display:flex;flex-direction:column;flex:1}
  .bl-card h3{font-family:"Space Grotesk";font-weight:600;font-size:18px;line-height:1.3;margin:12px 0 10px}
  .bl-card p{color:var(--gray);font-size:14px;line-height:1.55;margin-bottom:16px;flex:1}

  .bl-tags{display:flex;flex-wrap:wrap;gap:7px}
  .bl-tag{font-size:11px;font-weight:600;letter-spacing:.03em;text-transform:uppercase;
    color:var(--red-hover);background:rgba(255,43,43,.1);border:1px solid rgba(255,43,43,.22);
    padding:4px 9px;border-radius:7px}
  .bl-meta{display:flex;align-items:center;gap:8px;font-size:12.5px;color:var(--gray);margin-top:auto;flex-wrap:wrap}
  .bl-meta-author{color:#e4e4e7;font-weight:500}
  .bl-dot{opacity:.5}
  .bl-read{display:inline-flex;align-items:center;gap:8px;margin-top:18px;font-family:"Space Grotesk";
    font-weight:600;font-size:14px;color:var(--red-hover)}
  .bl-read svg{transition:transform .4s var(--ease)}
  .bl-featured:hover .bl-read svg{transform:translateX(4px)}

  @media(max-width:860px){
    .bl-featured{grid-template-columns:1fr}
    .bl-featured-art{min-height:160px;order:-1}
    .bl-grid{grid-template-columns:1fr 1fr}
  }
  @media(max-width:560px){
    .bl-grid{grid-template-columns:1fr}
  }
`;
