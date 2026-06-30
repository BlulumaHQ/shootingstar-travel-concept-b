import { createFileRoute } from "@tanstack/react-router";
import { IcefieldsShuttlePage } from "../icefields-parkway-jasper-banff-shuttle-tours";
import { hreflangLinks } from "@/i18n/locale";

export const Route = createFileRoute("/en/icefields-parkway-jasper-banff-shuttle-tours")({
  head: () => ({
    meta: [
      { title: "Icefields Parkway, Jasper & Banff Shuttle Tours | Shooting Star Travel" },
      { name: "description", content: "Flexible shuttle sightseeing between Banff, Jasper, Hinton, Columbia Icefield, Medicine Lake and Maligne Lake — with optional attraction tickets." },
      { property: "og:locale", content: "en_US" },
    ],
    links: hreflangLinks("/icefields-parkway-jasper-banff-shuttle-tours", "en"),
  }),
  component: IcefieldsShuttlePage,
});
