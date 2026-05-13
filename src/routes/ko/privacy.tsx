import { createFileRoute } from "@tanstack/react-router";
import { PrivacyPage } from "../privacy";
import { hreflangLinks } from "@/i18n/locale";

export const Route = createFileRoute("/ko/privacy")({
  head: () => ({
    meta: [
      { title: "개인정보 처리방침 | Shootingstar Travel" },
      { property: "og:locale", content: "ko_KR" },
    ],
    links: hreflangLinks("/privacy", "ko"),
  }),
  component: PrivacyPage,
});
