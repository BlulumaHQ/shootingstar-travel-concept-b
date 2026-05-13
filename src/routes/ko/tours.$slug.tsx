import { createFileRoute } from "@tanstack/react-router";
import { TourDetailPage } from "../tours.$slug";
import { hreflangLinks } from "@/i18n/locale";

export const Route = createFileRoute("/ko/tours/$slug")({
  head: ({ params }) => ({
    meta: [
      { property: "og:locale", content: "ko_KR" },
    ],
    links: hreflangLinks(`/tours/${params.slug}`, "ko"),
  }),
  component: TourDetailPage,
});
