import { createFileRoute } from "@tanstack/react-router";
import { TourDetailPage } from "../tours.$slug";

export const Route = createFileRoute("/zh/tours/$slug")({
  head: ({ params }) => ({
    meta: [
      { property: "og:locale", content: "zh_Hant" },
    ],
    links: [
      { rel: "canonical", href: `https://shootingstar-travel-concept-b.lovable.app/zh/tours/${params.slug}` },
      { rel: "alternate", hrefLang: "en", href: `https://shootingstar-travel-concept-b.lovable.app/tours/${params.slug}` },
      { rel: "alternate", hrefLang: "zh-Hant", href: `https://shootingstar-travel-concept-b.lovable.app/zh/tours/${params.slug}` },
    ],
  }),
  component: TourDetailPage,
});
