import { createFileRoute } from "@tanstack/react-router";
import { DestPage } from "../destinations";

export const Route = createFileRoute("/zh/destinations")({
  head: () => ({
    meta: [
      { title: "目的地 | Shootingstar Travel" },
      { property: "og:locale", content: "zh_Hant" },
    ],
    links: [
      { rel: "canonical", href: "https://shootingstar-travel-concept-b.lovable.app/zh/destinations" },
      { rel: "alternate", hrefLang: "en", href: "https://shootingstar-travel-concept-b.lovable.app/destinations" },
      { rel: "alternate", hrefLang: "zh-Hant", href: "https://shootingstar-travel-concept-b.lovable.app/zh/destinations" },
    ],
  }),
  component: DestPage,
});
