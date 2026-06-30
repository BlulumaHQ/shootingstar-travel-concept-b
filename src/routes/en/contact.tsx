import { createFileRoute } from "@tanstack/react-router";
import { ContactPage } from "../contact";
import { hreflangLinks } from "@/i18n/locale";

export const Route = createFileRoute("/en/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Shooting Star Travel" },
      { name: "description", content: "Book a consultation, request a custom itinerary, or get a group quote. Reach Shooting Star Travel via WhatsApp, KakaoTalk, WeChat or email." },
      { property: "og:title", content: "Contact — Shooting Star Travel" },
      { property: "og:locale", content: "en_US" },
    ],
    links: hreflangLinks("/contact", "en"),
  }),
  component: ContactPage,
});
