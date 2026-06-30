import { createFileRoute } from "@tanstack/react-router";
import { FaqPage } from "../faq";
import { hreflangLinks } from "@/i18n/locale";

export const Route = createFileRoute("/en/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — Shooting Star Travel" },
      { name: "description", content: "Frequently asked questions about Shooting Star Travel: booking, payment, itineraries, cancellations, language groups, and pre-trip preparation." },
      { property: "og:title", content: "FAQ — Shooting Star Travel" },
      { property: "og:locale", content: "en_US" },
    ],
    links: hreflangLinks("/faq", "en"),
  }),
  component: FaqPage,
});
