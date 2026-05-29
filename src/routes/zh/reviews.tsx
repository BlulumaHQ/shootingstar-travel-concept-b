import { createFileRoute } from "@tanstack/react-router";
import { ReviewsPage } from "../reviews";
import { hreflangLinks } from "@/i18n/locale";

export const Route = createFileRoute("/zh/reviews")({
  head: () => ({
    meta: [
      { title: "旅程分享 | Shootingstar Travel" },
      { name: "description", content: "來自旅程現場與旅客回憶的真實分享。" },
      { property: "og:title", content: "旅程分享 | Shootingstar Travel" },
      { property: "og:locale", content: "zh_Hant" },
    ],
    links: hreflangLinks("/reviews", "zh"),
  }),
  component: ReviewsPage,
});
