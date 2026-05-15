import { createFileRoute } from "@tanstack/react-router";
import bgLake from "@/assets/bg-lake-louise.webp";
import { LakeToursLanding } from "@/components/site/LakeToursLanding";
import { LAKE_TOURS_KO } from "@/content/lake-tours";
import { hreflangLinks } from "@/i18n/locale";

export const Route = createFileRoute("/ko/rocky-mountain-lake-tours")({
  head: () => ({
    meta: [
      { title: LAKE_TOURS_KO.meta.title },
      { name: "description", content: LAKE_TOURS_KO.meta.description },
      { property: "og:title", content: LAKE_TOURS_KO.meta.ogTitle },
      { property: "og:description", content: LAKE_TOURS_KO.meta.ogDescription },
      { property: "og:image", content: bgLake },
    ],
    links: hreflangLinks("/rocky-mountain-lake-tours", "ko"),
  }),
  component: () => <LakeToursLanding content={LAKE_TOURS_KO} />,
});
