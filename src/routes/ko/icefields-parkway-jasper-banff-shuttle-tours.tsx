import { createFileRoute } from "@tanstack/react-router";
import { IcefieldsShuttlePage } from "../icefields-parkway-jasper-banff-shuttle-tours";
import { hreflangLinks } from "@/i18n/locale";

export const Route = createFileRoute("/ko/icefields-parkway-jasper-banff-shuttle-tours")({
  head: () => ({
    meta: [
      { title: "아이스필드 파크웨이, 재스퍼, 밴프 셔틀 투어 | Shooting Star Travel" },
      { name: "description", content: "밴프, 재스퍼, Hinton, 컬럼비아 아이스필드, Medicine Lake, Maligne Lake를 연결하는 유연한 셔틀 관광 — 요일별 운행 및 옵션 입장권." },
      { property: "og:locale", content: "ko_KR" },
    ],
    links: hreflangLinks("/icefields-parkway-jasper-banff-shuttle-tours", "ko"),
  }),
  component: IcefieldsShuttlePage,
});
