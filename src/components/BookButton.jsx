import React from "react";
import { Link } from "react-router-dom";
import Arrow from "./Arrow.jsx";

/* "Book a Free Consultation" — sends visitors to the inline /book calendar. */
export default function BookButton({
  children = "Book a Free Consultation",
  className = "btn btn-primary",
  arrow = true,
  to = "/book",
}) {
  return (
    <Link to={to} className={className}>
      {children}{arrow && <Arrow />}
    </Link>
  );
}
