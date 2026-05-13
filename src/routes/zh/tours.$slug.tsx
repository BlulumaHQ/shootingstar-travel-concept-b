import { createFileRoute } from "@tanstack/react-router";
import { TourDetailPage } from "../tours.$slug";
import { hreflangLinks } from "@/i18n/locale";

export const Route = createFileRoute("/zh/tours/$slug")({
  head: ({ params }) => ({
    meta: [
      { property: "og:locale", content: "zh_Hant" },
    ],
    links: hreflangLinks(`/tours/${params.slug}`, "zh"),
  }),
  component: TourDetailPage,
});
