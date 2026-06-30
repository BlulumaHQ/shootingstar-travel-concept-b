import { createFileRoute } from "@tanstack/react-router";
import { BlogPage } from "../blog";
import { hreflangLinks } from "@/i18n/locale";

export const Route = createFileRoute("/en/blog")({
  head: () => ({
    meta: [
      { title: "Journal — Shooting Star Travel" },
      { name: "description", content: "Canada travel guides, seasonal advice and local notes — to help you plan your next journey." },
      { property: "og:title", content: "Journal — Shooting Star Travel" },
      { property: "og:locale", content: "en_US" },
    ],
    links: hreflangLinks("/blog", "en"),
  }),
  component: BlogPage,
});
