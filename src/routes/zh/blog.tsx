import { createFileRoute } from "@tanstack/react-router";
import { BlogPage } from "../blog";

export const Route = createFileRoute("/zh/blog")({
  head: () => ({
    meta: [
      { title: "旅行日誌 | Shootingstar Travel" },
      { property: "og:locale", content: "zh_Hant" },
    ],
    links: [
      { rel: "canonical", href: "https://shootingstar-travel-concept-b.lovable.app/zh/blog" },
      { rel: "alternate", hrefLang: "en", href: "https://shootingstar-travel-concept-b.lovable.app/blog" },
      { rel: "alternate", hrefLang: "zh-Hant", href: "https://shootingstar-travel-concept-b.lovable.app/zh/blog" },
    ],
  }),
  component: BlogPage,
});
