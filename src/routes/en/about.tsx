import { createFileRoute } from "@tanstack/react-router";
import { AboutPage } from "../about";
import { hreflangLinks } from "@/i18n/locale";

export const Route = createFileRoute("/en/about")({
  head: () => ({
    meta: [
      { title: "About — Shooting Star Travel" },
      { name: "description", content: "Shooting Star Travel crafts thoughtfully designed small-group tours across Canada and the Western United States — rare, memorable journeys for travellers of every language and background." },
      { property: "og:title", content: "About — Shooting Star Travel" },
      { property: "og:description", content: "Small-group journeys across Canada and the Western United States — rare, memorable, and made to be kept." },
      { property: "og:locale", content: "en_US" },
    ],
    links: hreflangLinks("/about", "en"),
  }),
  component: AboutPage,
});
