import { createFileRoute } from "@tanstack/react-router";
import { TermsPage } from "../terms";
import { hreflangLinks } from "@/i18n/locale";

export const Route = createFileRoute("/ko/terms")({
  head: () => ({
    meta: [
      { title: "이용 약관 | Shootingstar Travel" },
      { property: "og:locale", content: "ko_KR" },
    ],
    links: hreflangLinks("/terms", "ko"),
  }),
  component: TermsPage,
});
