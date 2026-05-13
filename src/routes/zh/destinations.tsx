import { createFileRoute } from "@tanstack/react-router";
import { DestPage } from "../destinations";
import { hreflangLinks } from "@/i18n/locale";

export const Route = createFileRoute("/zh/destinations")({
  head: () => ({
    meta: [
      { title: "目的地 | Shootingstar Travel" },
      { property: "og:locale", content: "zh_Hant" },
    ],
    links: hreflangLinks("/destinations", "zh"),
  }),
  component: DestPage,
});
