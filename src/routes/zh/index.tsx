import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "../index";

export const Route = createFileRoute("/zh/")({
  head: () => ({
    meta: [
      { title: "Shootingstar Travel | 加拿大旅行團與深度旅遊體驗" },
      { name: "description", content: "探索加拿大最值得收藏的旅程。Shootingstar Travel 提供小團旅行、洛磯山、班夫、極光與溫哥華深度旅遊體驗。" },
      { property: "og:title", content: "Shootingstar Travel | 加拿大旅行團與深度旅遊體驗" },
      { property: "og:description", content: "加拿大小團精緻旅遊・洛磯山・班夫・極光・溫哥華深度體驗。" },
      { property: "og:locale", content: "zh_Hant" },
    ],
    links: [
      { rel: "canonical", href: "https://shootingstar-travel-concept-b.lovable.app/zh" },
      { rel: "alternate", hrefLang: "en", href: "https://shootingstar-travel-concept-b.lovable.app/" },
      { rel: "alternate", hrefLang: "zh-Hant", href: "https://shootingstar-travel-concept-b.lovable.app/zh" },
      { rel: "alternate", hrefLang: "ko", href: "https://shootingstar-travel-concept-b.lovable.app/ko" },
      { rel: "alternate", hrefLang: "x-default", href: "https://shootingstar-travel-concept-b.lovable.app/" },
    ],
  }),
  component: HomePage,
});
