import { createFileRoute } from "@tanstack/react-router";
import { ToursIndexPage } from "../tours.index";
import { hreflangLinks } from "@/i18n/locale";

export const Route = createFileRoute("/ko/tours/")({
  head: () => ({
    meta: [
      { title: "투어 소개 | Shootingstar Travel" },
      { name: "description", content: "Shootingstar Travel의 캐나다 소그룹 투어 — 로키 마운틴, 밴프, 오로라, 밴쿠버, 빅토리아, 프라이빗 투어." },
      { property: "og:locale", content: "ko_KR" },
    ],
    links: hreflangLinks("/tours", "ko"),
  }),
  component: ToursIndexPage,
});
