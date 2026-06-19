import React, { useEffect } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Logo from "../components/Logo.jsx";
import ClosingCTA from "../sections/ClosingCTA.jsx";
import Arrow from "../components/Arrow.jsx";
import BookButton from "../components/BookButton.jsx";
import { getPost, formatDate } from "../lib/blog.js";

const SCRIPT_ID = "bl-faq-schema";

export default function BlogPostPage() {
  const { slug } = useParams();
  const post = getPost(slug);

  // Inject FAQPage + Article structured data (JSON-LD) for SEO rich results.
  // Only runs when the post has parsed FAQ items; cleans up on unmount/navigation.
  useEffect(() => {
    if (!post) return;

    const graph = [
      {
        "@type": "Article",
        headline: post.title,
        description: post.excerpt,
        author: { "@type": "Person", name: "Divyesh Solanki" },
        publisher: { "@type": "Organization", name: "EAJJY AI" },
        datePublished: post.date || undefined,
        url: typeof window !== "undefined" ? window.location.href : undefined,
      },
    ];

    if (post.faq.length > 0) {
      graph.push({
        "@type": "FAQPage",
        mainEntity: post.faq.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      });
    }

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = SCRIPT_ID;
    script.text = JSON.stringify({ "@context": "https://schema.org", "@graph": graph });
    document.head.appendChild(script);

    const prevTitle = document.title;
    document.title = `${post.title} | EAJJY AI Blog`;

    return () => {
      document.getElementById(SCRIPT_ID)?.remove();
      document.title = prevTitle;
    };
  }, [post]);

  // Unknown slug -> back to the blog index
  if (!post) return <Navigate to="/blog" replace />;

  return (
    <>
      <article className="wrap bl-post">
        <div className="bl-post-head reveal">
          <Logo size="sm" className="page-hero-logo" />
          <Link to="/blog" className="bl-back">← All articles</Link>
          <div className="bl-tags" style={{ marginTop: 18 }}>{post.tags.map((t) => <span key={t} className="bl-tag">{t}</span>)}</div>
          <h1 className="head" style={{ fontSize: "clamp(30px,4.4vw,56px)", maxWidth: "20ch", margin: "16px 0 16px" }}>{post.title}</h1>
          <div className="bl-meta">
            <span className="bl-meta-author">{post.author || "Divyesh Solanki"}</span>
            {post.date && <span className="bl-dot">·</span>}
            {post.date && <span>{formatDate(post.date)}</span>}
            {post.read && <span className="bl-dot">·</span>}
            {post.read && <span>{post.read}</span>}
          </div>
        </div>

        <div className="prose reveal">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
        </div>

        {post.faq.length > 0 && (
          <div className="bl-faq reveal">
            <h2>Frequently Asked Questions</h2>
            <div className="faq" style={{ marginTop: 18 }}>
              {post.faq.map((item, i) => (
                <details key={i}>
                  <summary>
                    <span>{item.q}</span>
                    <span className="pm"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg></span>
                  </summary>
                  <p>{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        )}

        <div className="bl-author reveal">
          <span className="bl-author-avatar">DS</span>
          <div className="bl-author-info">
            <span className="bl-author-name">Divyesh Solanki</span>
            <span className="bl-author-role">AI &amp; Automation Expert</span>
          </div>
          <BookButton className="btn btn-primary bl-author-cta">Get a Consultation</BookButton>
        </div>

        <div className="bl-post-foot">
          <Link to="/blog" className="btn btn-ghost">← Back to all articles</Link>
        </div>
      </article>

      <ClosingCTA />
      <style>{POST_CSS}</style>
    </>
  );
}

const POST_CSS = `
  .bl-post{padding-top:clamp(50px,8vh,90px);max-width:820px}
  .bl-post-head{margin-bottom:38px;padding-bottom:30px;border-bottom:1px solid var(--border)}
  .bl-meta-author{color:#e4e4e7;font-weight:500}
  .bl-back{font-size:13.5px;color:var(--gray);transition:color .3s}
  .bl-back:hover{color:var(--red-hover)}

  /* markdown prose */
  .prose{font-size:17px;line-height:1.75;color:#d4d4d8;max-width:720px}
  .prose > *:first-child{margin-top:0}
  .prose h2{font-family:"Space Grotesk";font-weight:600;font-size:clamp(22px,2.6vw,30px);
    color:#fff;letter-spacing:-.02em;margin:42px 0 16px;line-height:1.2}
  .prose h3{font-family:"Space Grotesk";font-weight:600;font-size:20px;color:#fff;margin:32px 0 12px}
  .prose p{margin:0 0 20px}
  .prose a{color:var(--red-hover);text-decoration:underline;text-underline-offset:3px;transition:color .25s}
  .prose a:hover{color:var(--red)}
  .prose strong{color:#fff;font-weight:600}
  .prose ul,.prose ol{margin:0 0 22px;padding-left:24px}
  .prose li{margin-bottom:10px;padding-left:4px}
  .prose ul li::marker{color:var(--red)}
  .prose ol li::marker{color:var(--red-hover);font-family:"Space Grotesk";font-weight:600}
  .prose blockquote{margin:26px 0;padding:4px 0 4px 22px;border-left:3px solid var(--red);
    color:#fff;font-size:19px;font-style:italic;line-height:1.6}
  .prose code{font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:14px;
    background:var(--charcoal);border:1px solid var(--border);border-radius:6px;padding:2px 6px;color:#ffb4b4}
  .prose pre{background:var(--charcoal);border:1px solid var(--border);border-radius:14px;
    padding:20px;overflow-x:auto;margin:0 0 22px}
  .prose pre code{background:none;border:none;padding:0;color:#e4e4e7;font-size:13.5px;line-height:1.6}
  .prose img{max-width:100%;border-radius:14px;border:1px solid var(--border);margin:8px 0 22px}
  .prose hr{border:none;height:1px;background:linear-gradient(90deg,transparent,var(--border),transparent);margin:38px 0}
  .prose table{width:100%;border-collapse:collapse;margin:0 0 24px;font-size:15px}
  .prose th,.prose td{border:1px solid var(--border);padding:11px 14px;text-align:left}
  .prose th{background:rgba(255,43,43,.07);color:#fff;font-weight:600}
  .prose td{color:var(--gray)}

  .bl-post-foot{margin-top:40px;padding-top:30px;border-top:1px solid var(--border)}

  .bl-faq{margin-top:44px;padding-top:36px;border-top:1px solid var(--border)}
  .bl-faq h2{font-family:"Space Grotesk";font-weight:600;font-size:clamp(20px,2.4vw,26px);letter-spacing:-.02em}
  .bl-faq .faq{margin-top:0;max-width:100%}
  .bl-faq summary{font-size:15.5px;padding:18px 0}
  .bl-faq details p{font-size:14.5px}

  .bl-author{display:flex;align-items:center;gap:16px;flex-wrap:wrap;margin-top:44px;
    border:1px solid var(--border);border-radius:18px;background:var(--glass);backdrop-filter:blur(18px);
    padding:22px 24px}
  .bl-author-avatar{flex-shrink:0;width:50px;height:50px;border-radius:50%;display:grid;place-items:center;
    font-family:"Space Grotesk";font-weight:600;font-size:16px;color:#fff;
    background:linear-gradient(145deg,var(--red),var(--red-hover));box-shadow:0 8px 20px -8px rgba(255,43,43,.6)}
  .bl-author-info{display:flex;flex-direction:column;gap:3px;flex:1;min-width:160px}
  .bl-author-name{font-family:"Space Grotesk";font-weight:600;font-size:15.5px;color:#fff}
  .bl-author-role{font-size:13px;color:var(--gray)}
  .bl-author-cta{padding:10px 18px;font-size:13.5px;white-space:nowrap}

  @media(max-width:560px){
    .bl-author{flex-direction:column;align-items:flex-start}
    .bl-author-cta{width:100%;justify-content:center}
  }
`;
