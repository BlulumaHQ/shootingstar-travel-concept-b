import { createFileRoute } from "@tanstack/react-router";
import { PrivacyPage } from "../privacy";
import { hreflangLinks } from "@/i18n/locale";

export const Route = createFileRoute("/zh/privacy")({
  head: () => ({
    meta: [
      { title: "隱私權政策 | Shootingstar Travel" },
      { property: "og:locale", content: "zh_Hant" },
    ],
    links: hreflangLinks("/privacy", "zh"),
  }),
  component: PrivacyPage,
});
