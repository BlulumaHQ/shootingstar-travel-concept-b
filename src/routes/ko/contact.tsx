import { createFileRoute } from "@tanstack/react-router";
import { ContactPage } from "../contact";
import { hreflangLinks } from "@/i18n/locale";

export const Route = createFileRoute("/ko/contact")({
  head: () => ({
    meta: [
      { title: "문의하기 | Shootingstar Travel" },
      { name: "description", content: "투어 예약, 맞춤형 일정, 단체 여행에 대해 한국어로 편하게 문의해 주세요." },
      { property: "og:title", content: "문의하기 | Shootingstar Travel" },
      { property: "og:locale", content: "ko_KR" },
    ],
    links: hreflangLinks("/contact", "ko"),
  }),
  component: ContactPage,
});
