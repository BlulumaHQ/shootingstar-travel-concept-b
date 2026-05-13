import { createFileRoute } from "@tanstack/react-router";
import { ContactPage } from "../contact";
import { hreflangLinks } from "@/i18n/locale";

export const Route = createFileRoute("/zh/contact")({
  head: () => ({
    meta: [
      { title: "聯絡我們 | Shootingstar Travel" },
      { name: "description", content: "預約諮詢、客製行程、團體報價。透過 WhatsApp、KakaoTalk、WeChat 或 Email 與 Shootingstar Travel 聯繫。" },
      { property: "og:locale", content: "zh_Hant" },
    ],
    links: hreflangLinks("/contact", "zh"),
  }),
  component: ContactPage,
});
