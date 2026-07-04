import { createFileRoute } from "@tanstack/react-router";
import heroImg from "@/assets/tour-banff.webp";
import { RegionToursLanding, REGION_LANDING_CONTENT } from "@/components/site/RegionToursLanding";
import { hreflangLinks } from "@/i18n/locale";

const c = REGION_LANDING_CONTENT.banff.en;

export const Route = createFileRoute("/en/banff-tours")({
  head: () => ({
    meta: [
      { title: "Banff Day Tours & Shuttles — Shooting Star Travel" },
      { name: "description", content: "Small-group Banff day tours and Banff–Jasper shuttles: Lake Louise, Moraine Lake, Icefields Parkway and more." },
      { property: "og:title", content: "Banff Day Tours & Shuttles — Shooting Star Travel" },
      { property: "og:description", content: "Small-group Banff day tours and Banff–Jasper shuttles." },
      { property: "og:image", content: heroImg },
      { property: "og:locale", content: "en_US" },
    ],
    links: hreflangLinks("/banff-tours", "en"),
  }),
  component: () => <RegionToursLanding region="banff" heroImg={heroImg} content={c} />,
});
