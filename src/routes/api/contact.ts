import { createFileRoute } from "@tanstack/react-router";

/**
 * Contact form → Resend.
 *
 * Required Worker secrets (see docs/secrets.md):
 *   RESEND_API_KEY      Resend API key (client's own Resend account)
 *   CONTACT_TO_EMAIL    Where enquiries go (e.g. info@shootingstartravel.ca)
 *   CONTACT_FROM_EMAIL  Verified sender, e.g. "Shooting Star Travel <noreply@send.shootingstartravel.ca>"
 *
 * If any secret is missing the endpoint returns 503 so the page shows an
 * error with direct contact options — it never pretends the message was sent.
 */

const MAX = { name: 120, email: 200, tour: 200, language: 40, message: 5000 } as const;

function clean(v: unknown, max: number): string {
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const json = (body: unknown, status = 200) => Response.json(body, { status });

export const Route = createFileRoute("/api/contact")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const apiKey = process.env.RESEND_API_KEY;
        const to = process.env.CONTACT_TO_EMAIL;
        const from = process.env.CONTACT_FROM_EMAIL;
        if (!apiKey || !to || !from) {
          console.error("[contact] missing RESEND_API_KEY / CONTACT_TO_EMAIL / CONTACT_FROM_EMAIL");
          return json({ success: false, message: "Contact form is not configured." }, 503);
        }

        let body: Record<string, unknown>;
        try {
          body = (await request.json()) as Record<string, unknown>;
        } catch {
          return json({ success: false, message: "Invalid request." }, 400);
        }

        // Honeypot: real visitors never fill this hidden field.
        if (clean(body.company, 200)) return json({ success: true });

        const name = clean(body.name, MAX.name);
        const email = clean(body.email, MAX.email);
        const tour = clean(body.tour, MAX.tour);
        const language = clean(body.primaryLanguage, MAX.language);
        const message = clean(body.message, MAX.message);
        const page = clean(body.page, 300);

        if (!name || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
          return json({ success: false, message: "Please fill in your name, a valid email and a message." }, 400);
        }

        const rows: [string, string][] = [
          ["Name", name],
          ["Email", email],
          ["Tour / dates", tour || "—"],
          ["Preferred language", language || "—"],
          ["Page", page || "—"],
        ];
        const html = `
          <h2 style="font-family:sans-serif">New website enquiry</h2>
          <table style="font-family:sans-serif;font-size:14px;border-collapse:collapse">
            ${rows.map(([k, v]) => `<tr><td style="padding:4px 12px 4px 0;color:#666">${k}</td><td style="padding:4px 0">${esc(v)}</td></tr>`).join("")}
          </table>
          <p style="font-family:sans-serif;font-size:14px;white-space:pre-wrap;margin-top:16px">${esc(message)}</p>`;
        const text = `${rows.map(([k, v]) => `${k}: ${v}`).join("\n")}\n\n${message}`;

        try {
          const res = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
            body: JSON.stringify({
              from,
              to: to.split(",").map((s) => s.trim()).filter(Boolean),
              reply_to: email,
              subject: `Website enquiry — ${name}${tour ? ` (${tour})` : ""}`,
              html,
              text,
            }),
          });
          if (!res.ok) {
            const detail = await res.text().catch(() => "");
            console.error("[contact] resend failed", res.status, detail.slice(0, 300));
            return json({ success: false, message: "Could not send your message." }, 502);
          }
          return json({ success: true });
        } catch (err) {
          console.error("[contact] resend error", err);
          return json({ success: false, message: "Could not send your message." }, 502);
        }
      },
    },
  },
});
