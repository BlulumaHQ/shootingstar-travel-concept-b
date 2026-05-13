import { createFileRoute } from "@tanstack/react-router";
import { FaqPage } from "../faq";
import { hreflangLinks } from "@/i18n/locale";

export const Route = createFileRoute("/zh/faq")({
  head: () => ({
    meta: [
      { title: "常見問題 FAQ | Shootingstar Travel" },
      { name: "description", content: "Shootingstar Travel 加拿大旅遊常見問題：報名、付款、行程、取消改期、語言團別與出發前準備。" },
      { property: "og:locale", content: "zh_Hant" },
    ],
    links: hreflangLinks("/faq", "zh"),
  }),
  component: FaqPage,
});
