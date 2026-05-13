import { createFileRoute } from "@tanstack/react-router";
import { AboutPage } from "../about";
import { hreflangLinks } from "@/i18n/locale";

export const Route = createFileRoute("/ko/about")({
  head: () => ({
    meta: [
      { title: "회사 소개 | Shootingstar Travel" },
      { name: "description", content: "Shootingstar Travel은 캐나다 현지 소그룹 여행 브랜드로, 한국어·중국어·영어 여행자를 위한 따뜻하고 편안한 여정을 디자인합니다." },
      { property: "og:title", content: "회사 소개 | Shootingstar Travel" },
      { property: "og:locale", content: "ko_KR" },
    ],
    links: hreflangLinks("/about", "ko"),
  }),
  component: AboutPage,
});
