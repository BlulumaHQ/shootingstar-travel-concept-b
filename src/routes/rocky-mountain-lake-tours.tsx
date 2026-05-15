import { createFileRoute } from "@tanstack/react-router";
import bgLake from "@/assets/bg-lake-louise.webp";
import { LakeToursLanding } from "@/components/site/LakeToursLanding";
import { LAKE_TOURS_EN } from "@/content/lake-tours";
import { hreflangLinks } from "@/i18n/locale";

export const Route = createFileRoute("/rocky-mountain-lake-tours")({
  head: () => ({
    meta: [
      { title: LAKE_TOURS_EN.meta.title },
      { name: "description", content: LAKE_TOURS_EN.meta.description },
      { property: "og:title", content: LAKE_TOURS_EN.meta.ogTitle },
      { property: "og:description", content: LAKE_TOURS_EN.meta.ogDescription },
      { property: "og:image", content: bgLake },
    ],
    links: hreflangLinks("/rocky-mountain-lake-tours", "en"),
  }),
  component: () => <LakeToursLanding content={LAKE_TOURS_EN} />,
});
