import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "../index";
import { seoHead } from "@/i18n/seo";

export const Route = createFileRoute("/ko/")({
  head: () => ({
    ...seoHead({
      path: "/",
      locale: "ko",
      title: "Shootingstar Travel｜캐나다·미국 서부 프리미엄 부티크 투어",
      description: "캐나다와 미국 서부 프리미엄 소그룹 투어. 캐나디안 록키, 밴프, 밴쿠버, 빅토리아, 시애틀, 라스베이거스, 그랜드 캐니언까지 — 한국어·영어·중국어 가이드와 함께하는 편안하고 품격 있는 여행.",
    }),
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "TravelAgency",
          name: "Shootingstar Travel",
          url: "https://shootingstar-travel-concept-b.lovable.app/ko",
          areaServed: ["Canada", "United States"],
          knowsLanguage: ["ko", "en", "zh"],
        }),
      },
    ],
  }),
  component: HomePage,
});
