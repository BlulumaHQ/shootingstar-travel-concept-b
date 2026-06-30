import { createFileRoute } from "@tanstack/react-router";
import { TermsPage } from "../terms";
import { hreflangLinks } from "@/i18n/locale";

export const Route = createFileRoute("/en/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Use — Shooting Star Travel" },
      { name: "description", content: "Shooting Star Travel terms of use: bookings, payment, cancellations, and liability." },
      { property: "og:title", content: "Terms of Use — Shooting Star Travel" },
      { property: "og:locale", content: "en_US" },
    ],
    links: hreflangLinks("/terms", "en"),
  }),
  component: TermsPage,
});
