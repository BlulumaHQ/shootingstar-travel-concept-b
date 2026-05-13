import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "../index";

export const Route = createFileRoute("/ko/")({
  head: () => ({
    meta: [
      { title: "Shootingstar Travel | 캐나다 부티크 소그룹 투어" },
      { name: "description", content: "캐나다 전역의 부티크 소그룹 여행 — 로키 마운틴, 밴프, 오로라, 밴쿠버. 정성껏 큐레이팅한 여정." },
      { property: "og:title", content: "Shootingstar Travel | 캐나다 부티크 소그룹 투어" },
      { property: "og:locale", content: "ko_KR" },
    ],
    links: [
      { rel: "canonical", href: "https://shootingstar-travel-concept-b.lovable.app/ko" },
      { rel: "alternate", hrefLang: "en", href: "https://shootingstar-travel-concept-b.lovable.app/" },
      { rel: "alternate", hrefLang: "zh-Hant", href: "https://shootingstar-travel-concept-b.lovable.app/zh" },
      { rel: "alternate", hrefLang: "ko", href: "https://shootingstar-travel-concept-b.lovable.app/ko" },
      { rel: "alternate", hrefLang: "x-default", href: "https://shootingstar-travel-concept-b.lovable.app/" },
    ],
  }),
  component: HomePage,
});
