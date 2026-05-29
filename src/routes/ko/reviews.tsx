import { createFileRoute } from "@tanstack/react-router";
import { ReviewsPage } from "../reviews";
import { hreflangLinks } from "@/i18n/locale";

export const Route = createFileRoute("/ko/reviews")({
  head: () => ({
    meta: [
      { title: "여행 이야기 | Shootingstar Travel" },
      { name: "description", content: "투어 현장과 여행자들이 남긴 실제 여행 순간들입니다." },
      { property: "og:title", content: "여행 이야기 | Shootingstar Travel" },
      { property: "og:locale", content: "ko_KR" },
    ],
    links: hreflangLinks("/reviews", "ko"),
  }),
  component: ReviewsPage,
});
