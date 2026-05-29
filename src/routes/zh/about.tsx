import { createFileRoute } from "@tanstack/react-router";
import { AboutPage } from "../about";
import { hreflangLinks } from "@/i18n/locale";

export const Route = createFileRoute("/zh/about")({
  head: () => ({
    meta: [
      { title: "關於我們 | Shootingstar Travel" },
      { name: "description", content: "Shootingstar Travel 是專注於加拿大與美國西部的小團精品旅遊品牌，為中文、韓文與英文旅人設計珍貴、難忘、如流星般閃耀的旅程。" },
      { property: "og:title", content: "關於我們 | Shootingstar Travel" },
      { property: "og:locale", content: "zh_Hant" },
    ],
    links: hreflangLinks("/about", "zh"),
  }),
  component: AboutPage,
});
