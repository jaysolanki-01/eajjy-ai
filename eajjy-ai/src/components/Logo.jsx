import React from "react";
import { Link } from "react-router-dom";

const HEIGHTS = { sm: 24, md: 28, lg: 34, xl: 40 };

export default function Logo({ size = "md", link = true, className = "", onClick }) {
  const height = HEIGHTS[size] ?? HEIGHTS.md;
  const img = (
    <img
      src="/logo.png"
      alt="EAJJY AI"
      className={`logo-img logo-${size}`}
      height={height}
      width="auto"
      decoding="async"
    />
  );

  const wrapClass = `brand logo-brand logo-${size} ${className}`.trim();

  if (!link) {
    return (
      <span className={wrapClass} onClick={onClick}>
        {img}
      </span>
    );
  }

  return (
    <Link to="/" className={wrapClass} onClick={onClick}>
      {img}
    </Link>
  );
}
