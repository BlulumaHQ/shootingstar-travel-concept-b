import { createFileRoute } from "@tanstack/react-router";
import { AboutPage } from "../about";
import { hreflangLinks } from "@/i18n/locale";

export const Route = createFileRoute("/ko/about")({
  head: () => ({
    meta: [
      { title: "회사 소개 | Shootingstar Travel" },
      { name: "description", content: "Shootingstar Travel은 캐나다와 미국 서부 전역의 소그룹 부티크 투어 브랜드로, 한국어·중국어·영어 여행자를 위한 유성처럼 빛나는 잊지 못할 여정을 디자인합니다." },
      { property: "og:title", content: "회사 소개 | Shootingstar Travel" },
      { property: "og:locale", content: "ko_KR" },
    ],
    links: hreflangLinks("/about", "ko"),
  }),
  component: AboutPage,
});
