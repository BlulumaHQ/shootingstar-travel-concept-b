import { createFileRoute } from "@tanstack/react-router";
import { TermsPage } from "../terms";
import { hreflangLinks } from "@/i18n/locale";

export const Route = createFileRoute("/zh/terms")({
  head: () => ({
    meta: [
      { title: "服務條款 | Shootingstar Travel" },
      { property: "og:locale", content: "zh_Hant" },
    ],
    links: hreflangLinks("/terms", "zh"),
  }),
  component: TermsPage,
});
