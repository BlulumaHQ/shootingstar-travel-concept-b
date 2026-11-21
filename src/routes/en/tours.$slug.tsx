import { createFileRoute, notFound } from "@tanstack/react-router";
import { TourDetailPage, TourUnavailable } from "../tours.$slug";
import { hreflangLinks } from "@/i18n/locale";

export const Route = createFileRoute("/en/tours/$slug")({
  loader: async ({ params }) => {
    const { fetchTourBySlugByLocale } = await import("@/data/toursSource");
    const tour = await fetchTourBySlugByLocale("en", params.slug);
    if (!tour) throw notFound();
    return { tour };
  },
  head: ({ params, loaderData }) => {
    const t = loaderData?.tour;
    return {
      meta: [
        { title: `${t?.title ?? "Tour"} — Shooting Star Travel` },
        { name: "description", content: t?.intro ?? "" },
        { property: "og:title", content: t?.title ?? "" },
        { property: "og:description", content: t?.intro ?? "" },
        ...(t?.img ? [{ property: "og:image", content: t.img }] : []),
        { property: "og:locale", content: "en_US" },
      ],
      links: hreflangLinks(`/tours/${params.slug}`, "en"),
    };
  },
  notFoundComponent: () => <TourUnavailable />,
  component: TourDetailPage,
});
