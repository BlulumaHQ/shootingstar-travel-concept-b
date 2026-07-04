import { createFileRoute } from "@tanstack/react-router";
import heroImg from "@/assets/dest-jasper.jpg";
import { RegionToursLanding, REGION_LANDING_CONTENT } from "@/components/site/RegionToursLanding";
import { hreflangLinks } from "@/i18n/locale";

const c = REGION_LANDING_CONTENT.jasper.zh;

export const Route = createFileRoute("/jasper-tours")({
  head: () => ({
    meta: [
      { title: "賈斯珀一日遊 & 接駁行程 — Shooting Star Travel" },
      { name: "description", content: "賈斯珀出發的小團一日遊與冰原大道班夫–賈斯珀接駁行程：瑪琳湖、精靈島等。" },
      { property: "og:title", content: "賈斯珀一日遊 & 接駁行程 — Shooting Star Travel" },
      { property: "og:description", content: "賈斯珀出發的小團一日遊與冰原大道班夫–賈斯珀接駁行程。" },
      { property: "og:image", content: heroImg },
    ],
    links: hreflangLinks("/jasper-tours", "zh"),
  }),
  component: () => <RegionToursLanding region="jasper" heroImg={heroImg} content={c} />,
});
