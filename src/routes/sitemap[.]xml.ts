import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { tours } from "@/data/tours";

const BASE_URL = "https://shootingstar-travel-concept-b.lovable.app";
const LOCALES = ["", "/zh", "/ko"] as const;
const PAGES = ["/", "/about", "/tours", "/reviews", "/blog", "/faq", "/contact", "/destinations", "/privacy", "/terms"];

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
          const alts = LOCALES.map((l) => {
            const stripped = e.path.replace(/^\/(zh|ko)/, "") || "/";
            const href = `${BASE_URL}${l}${stripped === "/" ? "" : stripped}` || `${BASE_URL}/`;
            const hreflang = l === "" ? "en" : l === "/zh" ? "zh-Hant" : "ko";
            return `    <xhtml:link rel="alternate" hreflang="${hreflang}" href="${href || BASE_URL + "/"}"/>`;
          }).join("\n");
          return [
            `  <url>`,
            `    <loc>${BASE_URL}${e.path}</loc>`,
            `    <changefreq>weekly</changefreq>`,
            `    <priority>${e.priority}</priority>`,
            alts,
            `    <xhtml:link rel="alternate" hreflang="x-default" href="${BASE_URL}${e.path.replace(/^\/(zh|ko)/, "") || "/"}"/>`,
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
