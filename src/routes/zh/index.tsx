import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "../index";
import { seoHead } from "@/i18n/seo";

export const Route = createFileRoute("/zh/")({
  head: () => ({
    ...seoHead({
      path: "/",
      locale: "zh",
      title: "Shootingstar Travel｜加拿大與美西精品旅遊・洛磯山脈・西雅圖・拉斯維加斯",
      description: "加拿大與美國西部精品小團旅遊。洛磯山脈、班夫、溫哥華、維多利亞、西雅圖、拉斯維加斯與大峽谷，提供中文、韓文、英文貼心嚮導，為您客製安心、有溫度的旅程。",
    }),
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "TravelAgency",
          name: "Shootingstar Travel",
          url: "https://shootingstar-travel-concept-b.lovable.app/zh",
          areaServed: ["Canada", "United States"],
          knowsLanguage: ["zh", "en", "ko"],
        }),
      },
    ],
  }),
  component: HomePage,
});
