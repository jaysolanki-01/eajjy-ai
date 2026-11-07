export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "Brevo API key not configured" });
  }

  const { name, email, company, role, industry, teamSize, tasks, tools, toolsOther, goals, timeline, hourlyRate, message, leadSource } = req.body;

  if (!email || !/\S+@\S+\.\S+/.test(email)) {
    return res.status(400).json({ error: "Valid email is required" });
  }

  const [firstName, ...rest] = (name || "").trim().split(" ");
  const lastName = rest.join(" ");

  const payload = {
    email,
    attributes: {
      FIRSTNAME: firstName || "",
      LASTNAME: lastName || "",
      COMPANY: company || "",
      JOB_TITLE: role || "",
      INDUSTRY: industry || "",
      TEAM_SIZE: teamSize || "",
      MANUAL_TASKS: Array.isArray(tasks) ? tasks.join(", ") : tasks || "",
      TOOLS: [
        ...(Array.isArray(tools) ? tools : []),
        ...(toolsOther ? [toolsOther] : []),
      ].join(", "),
      GOALS: Array.isArray(goals) ? goals.join(", ") : goals || "",
      TIMELINE: timeline || "",
      HOURLY_RATE: hourlyRate || "",
      MESSAGE: message || "",
      LEAD_SOURCE: leadSource || "Contact Page Audit",
    },
    updateEnabled: true,
    listIds: [6],
  };

  const brevoRes = await fetch("https://api.brevo.com/v3/contacts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api-key": apiKey,
    },
    body: JSON.stringify(payload),
  });

  if (!brevoRes.ok) {
    const err = await brevoRes.json().catch(() => ({}));
    console.error("Brevo error:", err);
    return res.status(502).json({ error: "Failed to add contact to Brevo", details: err });
  }

  // Send email notification to the team
  const toolsList = [
    ...(Array.isArray(tools) ? tools : []),
    ...(toolsOther ? [toolsOther] : []),
  ].join(", ") || "—";

  const emailPayload = {
    sender: { name: "EAJJY AI Leads", email: "jay@sarvopaya.com" },
    to: [{ email: "jay@sarvopaya.com", name: "Jay" }],
    subject: `New Lead: ${name || email}${company ? " — " + company : ""}`,
    htmlContent: `
      <div style="font-family:-apple-system,Segoe UI,Roboto,sans-serif;background:#0d0d0d;color:#fff;padding:40px;max-width:600px;margin:0 auto;border-radius:16px">
        <div style="margin-bottom:24px">
          <span style="font-size:20px;font-weight:700;letter-spacing:-.02em">EAJJY<span style="color:#FF2B2B">AI</span></span>
          <span style="margin-left:12px;font-size:12px;color:#71717a;text-transform:uppercase;letter-spacing:.06em">New Lead</span>
        </div>

        <h2 style="font-size:22px;font-weight:700;margin:0 0 6px">New lead just came in</h2>
        <p style="color:#a1a1aa;font-size:14px;margin:0 0 28px">Source: <strong style="color:#fff">${leadSource || "Contact Page Audit"}</strong></p>

        <table style="width:100%;border-collapse:collapse">
          ${row("Name", name || "—")}
          ${row("Email", `<a href="mailto:${email}" style="color:#FF4D4D">${email}</a>`)}
          ${row("Company", company || "—")}
          ${row("Role", role || "—")}
          ${row("Industry", industry || "—")}
          ${row("Team size", teamSize || "—")}
          ${row("Timeline", timeline || "—")}
          ${row("Tools", toolsList || "—")}
          ${row("Goals", Array.isArray(goals) ? goals.join(", ") : goals || "—")}
          ${row("Manual tasks", Array.isArray(tasks) ? tasks.join(", ") : tasks || "—")}
          ${row("Hourly rate", hourlyRate ? "$" + hourlyRate : "—")}
          ${message ? row("Message", message) : ""}
        </table>

        <div style="margin-top:28px;padding:18px;background:rgba(255,43,43,.08);border:1px solid rgba(255,43,43,.3);border-radius:12px">
          <a href="mailto:${email}?subject=Re: Your EAJJY AI Automation Audit" style="display:inline-block;background:#FF2B2B;color:#fff;font-weight:600;font-size:14px;padding:11px 22px;border-radius:8px;text-decoration:none">Reply to ${name || email}</a>
        </div>

        <p style="margin-top:24px;font-size:12px;color:#52525b">This notification was sent by EAJJY AI's lead capture system.</p>
      </div>
    `,
  };

  await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: { "Content-Type": "application/json", "api-key": apiKey },
    body: JSON.stringify(emailPayload),
  }).catch((e) => console.error("Email notification error:", e));

  return res.status(200).json({ ok: true });
}

function row(label, value) {
  return `
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid #1f1f1f;font-size:13px;color:#71717a;width:140px;vertical-align:top">${label}</td>
      <td style="padding:10px 0;border-bottom:1px solid #1f1f1f;font-size:13.5px;color:#e4e4e7;vertical-align:top">${value}</td>
    </tr>`;
}
