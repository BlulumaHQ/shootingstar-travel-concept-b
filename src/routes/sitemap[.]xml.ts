import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { tours } from "@/data/tours";

const BASE_URL = "https://www.shootingstartravel.ca";
// "" = bare (zh, default), "/en" = English, "/ko" = Korean.
// /zh URLs are intentionally omitted (they're a legacy alias of bare).
const LOCALES = ["", "/en", "/ko"] as const;
const PAGES = ["/", "/about", "/tours", "/reviews", "/blog", "/faq", "/contact", "/destinations", "/privacy", "/terms"];

function hreflangFor(loc: string): "zh-Hant" | "en" | "ko" {
  if (loc === "/en") return "en";
  if (loc === "/ko") return "ko";
  return "zh-Hant";
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries: { path: string; priority: string }[] = [];
        for (const loc of LOCALES) {
          for (const p of PAGES) {
            const path = p === "/" ? (loc || "/") : `${loc}${p}`;
            entries.push({ path, priority: p === "/" ? "1.0" : "0.7" });
          }
          for (const t of tours) {
            entries.push({ path: `${loc}/tours/${t.slug}`, priority: "0.8" });
          }
        }
        const urls = entries.map((e) => {
          // Strip any locale prefix to get the bare (default/zh) path.
          const stripped = e.path.replace(/^\/(en|ko)/, "") || "/";
          const alts = LOCALES.map((l) => {
            const href = `${BASE_URL}${l}${stripped === "/" ? "" : stripped}` || `${BASE_URL}/`;
            return `    <xhtml:link rel="alternate" hreflang="${hreflangFor(l)}" href="${href || BASE_URL + "/"}"/>`;
          }).join("\n");
          // x-default = bare (zh) URL
          const xDefault = `${BASE_URL}${stripped === "/" ? "/" : stripped}`;
          return [
            `  <url>`,
            `    <loc>${BASE_URL}${e.path}</loc>`,
            `    <changefreq>weekly</changefreq>`,
            `    <priority>${e.priority}</priority>`,
            alts,
            `    <xhtml:link rel="alternate" hreflang="x-default" href="${xDefault}"/>`,
            `  </url>`,
          ].join("\n");
        });
        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">`,
          ...urls,
          `</urlset>`,
        ].join("\n");
        return new Response(xml, {
          headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" },
        });
      },
    },
  },
});
