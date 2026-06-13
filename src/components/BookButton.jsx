import React from "react";
import Arrow from "./Arrow.jsx";

/* Cal.com booking button — opens the booking modal on click.
   The Cal embed API is initialized once in Layout.jsx.
   Reads these data attributes globally to open the popup. */
export default function BookButton({
  children = "Book a Free Consultation",
  className = "btn btn-primary",
  arrow = true,
}) {
  return (
    <button
      type="button"
      className={className}
      data-cal-namespace="ai-expert"
      data-cal-link="jay-solanki/ai-expert"
      data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true","theme":"auto"}'
    >
      {children}{arrow && <Arrow />}
    </button>
  );
}
