import { createFileRoute } from "@tanstack/react-router";
import { FaqPage } from "../faq";
import { hreflangLinks } from "@/i18n/locale";

export const Route = createFileRoute("/ko/faq")({
  head: () => ({
    meta: [
      { title: "자주 묻는 질문 | Shootingstar Travel" },
      { name: "description", content: "예약, 결제, 일정, 한국어 가이드 등 가장 많이 받는 질문에 대한 답변." },
      { property: "og:title", content: "자주 묻는 질문 | Shootingstar Travel" },
      { property: "og:locale", content: "ko_KR" },
    ],
    links: hreflangLinks("/faq", "ko"),
  }),
  component: FaqPage,
});
