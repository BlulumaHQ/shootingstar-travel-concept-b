import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "../index";
import { seoHead } from "@/i18n/seo";

export const Route = createFileRoute("/en/")({
  head: () => ({
    ...seoHead({
      path: "/",
      locale: "en",
      title: "Shootingstar Travel — Boutique Canadian Rockies, Banff & Western US Tours",
      description: "Boutique small-group tours across Canada and the Western United States — the Canadian Rockies, Banff, Vancouver, Victoria, Seattle, Las Vegas and beyond. Slow travel, considered detail.",
    }),
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "TravelAgency",
          name: "Shootingstar Travel",
          url: "https://www.shootingstartravel.ca/en",
          areaServed: ["Canada", "British Columbia", "Alberta", "Yukon", "United States", "Washington", "Oregon", "California", "Nevada"],
          knowsLanguage: ["en", "zh", "ko"],
          sameAs: [],
          address: { "@type": "PostalAddress", addressLocality: "Vancouver", addressRegion: "BC", addressCountry: "CA" },
        }),
      },
    ],
  }),
  component: HomePage,
});
