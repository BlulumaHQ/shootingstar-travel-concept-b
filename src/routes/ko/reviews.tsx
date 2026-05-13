import { createFileRoute } from "@tanstack/react-router";
import { ReviewsPage } from "../reviews";
import { hreflangLinks } from "@/i18n/locale";

export const Route = createFileRoute("/ko/reviews")({
  head: () => ({
    meta: [
      { title: "여행 후기 | Shootingstar Travel" },
      { name: "description", content: "Shootingstar Travel 소그룹 투어를 다녀온 한국, 중국, 영어권 여행자들의 진솔한 후기." },
      { property: "og:title", content: "여행 후기 | Shootingstar Travel" },
      { property: "og:locale", content: "ko_KR" },
    ],
    links: hreflangLinks("/reviews", "ko"),
  }),
  component: ReviewsPage,
});
