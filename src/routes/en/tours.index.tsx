import { createFileRoute } from "@tanstack/react-router";
import { ToursIndexPage } from "../tours.index";
import { hreflangLinks } from "@/i18n/locale";

export const Route = createFileRoute("/en/tours/")({
  head: () => ({
    meta: [
      { title: "Tours — Shooting Star Travel" },
      { name: "description", content: "Browse Shooting Star Travel's curated small-group journeys across Canada and the USA." },
      { property: "og:title", content: "Tours — Shooting Star Travel" },
      { property: "og:locale", content: "en_US" },
    ],
    links: hreflangLinks("/tours", "en"),
  }),
  component: ToursIndexPage,
});
