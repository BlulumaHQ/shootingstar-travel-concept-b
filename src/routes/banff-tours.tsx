import { createFileRoute } from "@tanstack/react-router";
import heroImg from "@/assets/tour-banff.webp";
import { RegionToursLanding, REGION_LANDING_CONTENT } from "@/components/site/RegionToursLanding";
import { hreflangLinks } from "@/i18n/locale";

const c = REGION_LANDING_CONTENT.banff.zh;

export const Route = createFileRoute("/banff-tours")({
  head: () => ({
    meta: [
      { title: "班夫一日遊 & 接駁行程 — Shooting Star Travel" },
      { name: "description", content: "從班夫出發的小團一日遊與班夫–賈斯伯接駁行程：露易絲湖、夢蓮湖、冰原大道等。" },
      { property: "og:title", content: "班夫一日遊 & 接駁行程 — Shooting Star Travel" },
      { property: "og:description", content: "從班夫出發的小團一日遊與班夫–賈斯伯接駁行程。" },
      { property: "og:image", content: heroImg },
    ],
    links: hreflangLinks("/banff-tours", "zh"),
  }),
  component: () => <RegionToursLanding region="banff" heroImg={heroImg} content={c} />,
});
