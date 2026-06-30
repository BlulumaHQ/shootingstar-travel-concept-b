import { createFileRoute } from "@tanstack/react-router";
import { PrivacyPage } from "../privacy";
import { hreflangLinks } from "@/i18n/locale";

export const Route = createFileRoute("/en/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Shootingstar Travel" },
      { name: "description", content: "Shootingstar Travel privacy policy: how we collect, use, and protect your personal information." },
      { property: "og:title", content: "Privacy Policy — Shootingstar Travel" },
      { property: "og:locale", content: "en_US" },
    ],
    links: hreflangLinks("/privacy", "en"),
  }),
  component: PrivacyPage,
});
