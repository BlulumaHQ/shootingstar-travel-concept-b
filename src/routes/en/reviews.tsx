import { createFileRoute } from "@tanstack/react-router";
import { ReviewsPage } from "../reviews";
import { hreflangLinks } from "@/i18n/locale";

export const Route = createFileRoute("/en/reviews")({
  head: () => ({
    meta: [
      { title: "Traveler Stories — Shooting Star Travel" },
      { name: "description", content: "Real stories from travellers with Shooting Star Travel — share your own journey." },
      { property: "og:title", content: "Traveler Stories — Shooting Star Travel" },
      { property: "og:locale", content: "en_US" },
    ],
    links: hreflangLinks("/reviews", "en"),
  }),
  component: ReviewsPage,
});
