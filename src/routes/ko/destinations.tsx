import { createFileRoute } from "@tanstack/react-router";
import { DestPage } from "../destinations";
import { hreflangLinks } from "@/i18n/locale";

export const Route = createFileRoute("/ko/destinations")({
  head: () => ({
    meta: [
      { title: "여행지 | Shootingstar Travel" },
      { name: "description", content: "로키 마운틴, 밴프, 오로라, 밴쿠버, 빅토리아 — 캐나다 대표 여행지를 한눈에." },
      { property: "og:title", content: "여행지 | Shootingstar Travel" },
      { property: "og:locale", content: "ko_KR" },
    ],
    links: hreflangLinks("/destinations", "ko"),
  }),
  component: DestinationsPage,
});
