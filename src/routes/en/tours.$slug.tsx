import { createFileRoute } from "@tanstack/react-router";
import { TourDetailPage } from "../tours.$slug";
import { hreflangLinks } from "@/i18n/locale";

export const Route = createFileRoute("/en/tours/$slug")({
  head: ({ params }) => ({
    meta: [
      { property: "og:locale", content: "en_US" },
    ],
    links: hreflangLinks(`/tours/${params.slug}`, "en"),
  }),
  component: TourDetailPage,
});
