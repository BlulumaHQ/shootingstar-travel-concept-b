import { createFileRoute } from "@tanstack/react-router";
import { ReviewsPage } from "../reviews";
import { hreflangLinks } from "@/i18n/locale";

export const Route = createFileRoute("/zh/reviews")({
  head: () => ({
    meta: [
      { title: "旅客分享 | Shootingstar Travel" },
      { name: "description", content: "看看旅客們與 Shooting Star Travel 一起留下的美好回憶。" },
      { property: "og:title", content: "旅客分享 | Shootingstar Travel" },
      { property: "og:locale", content: "zh_Hant" },
    ],
    links: hreflangLinks("/reviews", "zh"),
  }),
  component: ReviewsPage,
});
