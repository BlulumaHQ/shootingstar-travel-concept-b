import { createFileRoute } from "@tanstack/react-router";
import { AboutPage } from "../about";
import { hreflangLinks } from "@/i18n/locale";

export const Route = createFileRoute("/zh/about")({
  head: () => ({
    meta: [
      { title: "關於我們 | Shootingstar Travel" },
      { name: "description", content: "Shootingstar Travel 是加拿大在地小團旅遊品牌，專為中文、韓文與英文旅客設計安心、舒適、有溫度的行程。" },
      { property: "og:title", content: "關於我們 | Shootingstar Travel" },
      { property: "og:locale", content: "zh_Hant" },
    ],
    links: hreflangLinks("/about", "zh"),
  }),
  component: AboutPage,
});
