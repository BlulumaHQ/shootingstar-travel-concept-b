import { createFileRoute } from "@tanstack/react-router";
import heroImg from "@/assets/dest-jasper.jpg";
import { RegionToursLanding, REGION_LANDING_CONTENT } from "@/components/site/RegionToursLanding";
import { hreflangLinks } from "@/i18n/locale";

const c = REGION_LANDING_CONTENT.jasper.en;

export const Route = createFileRoute("/en/jasper-tours")({
  head: () => ({
    meta: [
      { title: "Jasper Day Tours & Shuttles — Shooting Star Travel" },
      { name: "description", content: "Small-group Jasper day tours and Icefields Parkway shuttles between Jasper and Banff: Maligne Lake, Spirit Island and more." },
      { property: "og:title", content: "Jasper Day Tours & Shuttles — Shooting Star Travel" },
      { property: "og:description", content: "Small-group Jasper day tours and Icefields Parkway shuttles." },
      { property: "og:image", content: heroImg },
      { property: "og:locale", content: "en_US" },
    ],
    links: hreflangLinks("/jasper-tours", "en"),
  }),
  component: () => <RegionToursLanding region="jasper" heroImg={heroImg} content={c} />,
});
