import { createFileRoute } from "@tanstack/react-router";
import { DestPage } from "../destinations";
import { hreflangLinks } from "@/i18n/locale";

export const Route = createFileRoute("/en/destinations")({
  head: () => ({
    meta: [
      { title: "Destinations — Shooting Star Travel" },
      { name: "description", content: "From Banff to the aurora — explore the Canadian destinations most worth keeping." },
      { property: "og:title", content: "Destinations — Shooting Star Travel" },
      { property: "og:locale", content: "en_US" },
    ],
    links: hreflangLinks("/destinations", "en"),
  }),
  component: DestPage,
});
