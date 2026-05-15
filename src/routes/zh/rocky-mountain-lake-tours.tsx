import { createFileRoute } from "@tanstack/react-router";
import bgLake from "@/assets/bg-lake-louise.webp";
import { LakeToursLanding } from "@/components/site/LakeToursLanding";
import { LAKE_TOURS_ZH } from "@/content/lake-tours";
import { hreflangLinks } from "@/i18n/locale";

export const Route = createFileRoute("/zh/rocky-mountain-lake-tours")({
  head: () => ({
    meta: [
      { title: LAKE_TOURS_ZH.meta.title },
      { name: "description", content: LAKE_TOURS_ZH.meta.description },
      { property: "og:title", content: LAKE_TOURS_ZH.meta.ogTitle },
      { property: "og:description", content: LAKE_TOURS_ZH.meta.ogDescription },
      { property: "og:image", content: bgLake },
    ],
    links: hreflangLinks("/rocky-mountain-lake-tours", "zh"),
  }),
  component: () => <LakeToursLanding content={LAKE_TOURS_ZH} />,
});
