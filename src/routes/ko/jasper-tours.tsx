import { createFileRoute } from "@tanstack/react-router";
import heroImg from "@/assets/dest-jasper.jpg";
import { RegionToursLanding, REGION_LANDING_CONTENT } from "@/components/site/RegionToursLanding";
import { hreflangLinks } from "@/i18n/locale";

const c = REGION_LANDING_CONTENT.jasper.ko;

export const Route = createFileRoute("/ko/jasper-tours")({
  head: () => ({
    meta: [
      { title: "재스퍼 데이 투어 & 셔틀 — Shooting Star Travel" },
      { name: "description", content: "재스퍼 출발 소그룹 데이 투어와 재스퍼–밴프 아이스필즈 파크웨이 셔틀: 말린 호수, 스피릿 아일랜드." },
      { property: "og:title", content: "재스퍼 데이 투어 & 셔틀 — Shooting Star Travel" },
      { property: "og:description", content: "재스퍼 출발 소그룹 데이 투어와 재스퍼–밴프 셔틀." },
      { property: "og:image", content: heroImg },
      { property: "og:locale", content: "ko_KR" },
    ],
    links: hreflangLinks("/jasper-tours", "ko"),
  }),
  component: () => <RegionToursLanding region="jasper" heroImg={heroImg} content={c} />,
});
