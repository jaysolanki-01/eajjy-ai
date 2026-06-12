import React from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Logo from "../components/Logo.jsx";
import ClosingCTA from "../sections/ClosingCTA.jsx";
import Arrow from "../components/Arrow.jsx";
import { getPost, formatDate } from "../lib/blog.js";

export default function BlogPostPage() {
  const { slug } = useParams();
  const post = getPost(slug);

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
            <span>{post.author}</span>
            {post.date && <span className="bl-dot">·</span>}
            {post.date && <span>{formatDate(post.date)}</span>}
            {post.read && <span className="bl-dot">·</span>}
            {post.read && <span>{post.read}</span>}
          </div>
        </div>

        <div className="prose reveal">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
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
`;
