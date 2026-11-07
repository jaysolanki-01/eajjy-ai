import React, { useEffect } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";

/* Inline Cal.com booking calendar (no popup, no OAuth needed).
   Renders the booker directly on the page. */
export default function BookInline() {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: "consult" });
      cal("ui", {
        cssVarsPerTheme: { light: { "cal-brand": "#FF2B2B" }, dark: { "cal-brand": "#FF2B2B" } },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
  }, []);

  return (
    <div className="book-inline">
      <Cal
        namespace="consult"
        calLink="jay-solanki/ai-expert"
        style={{ width: "100%", height: "100%", overflow: "scroll" }}
        config={{ layout: "month_view", theme: "dark" }}
      />
    </div>
  );
}
