import { createFileRoute } from "@tanstack/react-router";
import { ReviewsPage } from "../reviews";

export const Route = createFileRoute("/zh/reviews")({
  head: () => ({
    meta: [
      { title: "旅客分享 | Shootingstar Travel" },
      { property: "og:locale", content: "zh_Hant" },
    ],
    links: [
      { rel: "canonical", href: "https://shootingstar-travel-concept-b.lovable.app/zh/reviews" },
      { rel: "alternate", hrefLang: "en", href: "https://shootingstar-travel-concept-b.lovable.app/reviews" },
      { rel: "alternate", hrefLang: "zh-Hant", href: "https://shootingstar-travel-concept-b.lovable.app/zh/reviews" },
    ],
  }),
  component: ReviewsPage,
});
