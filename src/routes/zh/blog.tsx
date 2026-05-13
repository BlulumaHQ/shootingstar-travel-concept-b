import { createFileRoute } from "@tanstack/react-router";
import { BlogPage } from "../blog";
import { hreflangLinks } from "@/i18n/locale";

export const Route = createFileRoute("/zh/blog")({
  head: () => ({
    meta: [
      { title: "旅行日誌 | Shootingstar Travel" },
      { property: "og:locale", content: "zh_Hant" },
    ],
    links: hreflangLinks("/blog", "zh"),
  }),
  component: BlogPage,
});
