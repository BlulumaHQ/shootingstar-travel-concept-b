import { createFileRoute } from "@tanstack/react-router";
import { ContactPage } from "../contact";

export const Route = createFileRoute("/zh/contact")({
  head: () => ({
    meta: [
      { title: "聯絡我們 | Shootingstar Travel" },
      { name: "description", content: "預約諮詢、客製行程、團體報價。透過 WhatsApp、KakaoTalk、WeChat 或 Email 與 Shootingstar Travel 聯繫。" },
      { property: "og:locale", content: "zh_Hant" },
    ],
    links: [
      { rel: "canonical", href: "https://shootingstar-travel-concept-b.lovable.app/zh/contact" },
      { rel: "alternate", hrefLang: "en", href: "https://shootingstar-travel-concept-b.lovable.app/contact" },
      { rel: "alternate", hrefLang: "zh-Hant", href: "https://shootingstar-travel-concept-b.lovable.app/zh/contact" },
    ],
  }),
  component: ContactPage,
});
