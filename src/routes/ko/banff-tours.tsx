import { createFileRoute } from "@tanstack/react-router";
import heroImg from "@/assets/tour-banff.webp";
import { RegionToursLanding, REGION_LANDING_CONTENT } from "@/components/site/RegionToursLanding";
import { hreflangLinks } from "@/i18n/locale";

const c = REGION_LANDING_CONTENT.banff.ko;

export const Route = createFileRoute("/ko/banff-tours")({
  head: () => ({
    meta: [
      { title: "밴프 데이 투어 & 셔틀 — Shooting Star Travel" },
      { name: "description", content: "밴프 출발 소그룹 데이 투어와 밴프–재스퍼 셔틀: 레이크 루이스, 모레인 호수, 아이스필즈 파크웨이." },
      { property: "og:title", content: "밴프 데이 투어 & 셔틀 — Shooting Star Travel" },
      { property: "og:description", content: "밴프 출발 소그룹 데이 투어와 밴프–재스퍼 셔틀." },
      { property: "og:image", content: heroImg },
      { property: "og:locale", content: "ko_KR" },
    ],
    links: hreflangLinks("/banff-tours", "ko"),
  }),
  component: () => <RegionToursLanding region="banff" heroImg={heroImg} content={c} />,
});
