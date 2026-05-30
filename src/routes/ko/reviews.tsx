import { createFileRoute } from "@tanstack/react-router";
import { ReviewsPage } from "../reviews";
import { hreflangLinks } from "@/i18n/locale";

export const Route = createFileRoute("/ko/reviews")({
  head: () => ({
    meta: [
      { title: "여행자 이야기 | Shootingstar Travel" },
      { name: "description", content: "Shooting Star Travel과 함께한 여행자들이 남긴 소중한 기억들." },
      { property: "og:title", content: "여행자 이야기 | Shootingstar Travel" },
      { property: "og:locale", content: "ko_KR" },
    ],
    links: hreflangLinks("/reviews", "ko"),
  }),
  component: ReviewsPage,
});
