import { hreflangLinks, alternateUrls, type Locale, SITE_URL, withLocale } from "./locale";
import ogHomeEn from "@/assets/og-home-en.jpg";
import ogHomeZh from "@/assets/og-home-zh.jpg";
import ogHomeKo from "@/assets/og-home-ko.jpg";

export const ogBrandImage: Record<Locale, string> = {
  en: ogHomeEn,
  zh: ogHomeZh,
  ko: ogHomeKo,
};

const ogLocaleTag: Record<Locale, string> = {
  en: "en_US",
  zh: "zh_TW",
  ko: "ko_KR",
};

const siteName: Record<Locale, string> = {
  en: "Shootingstar Travel",
  zh: "Shootingstar Travel · 流星旅遊",
  ko: "Shootingstar Travel · 슈팅스타 트래블",
};

type SeoInput = {
  /** Locale-agnostic path, e.g. "/about" or "/tours/banff-day". */
  path: string;
  locale: Locale;
  title: string;
  description: string;
  /** Optional: full URL to OG image. Defaults to brand OG for that locale. */
  image?: string;
  /** "website" (default) or "article". */
  type?: "website" | "article";
};

/** Returns full meta + canonical + hreflang + Twitter card for a route head(). */
export function seoHead({ path, locale, title, description, image, type = "website" }: SeoInput) {
  const url = `${SITE_URL}${withLocale(path, locale)}`;
  const ogImage = image ?? ogBrandImage[locale];
  const absoluteImage = ogImage.startsWith("http") ? ogImage : `${SITE_URL}${ogImage}`;

  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:site_name", content: siteName[locale] },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: type },
      { property: "og:url", content: url },
      { property: "og:image", content: absoluteImage },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:locale", content: ogLocaleTag[locale] },
      { property: "og:locale:alternate", content: ogLocaleTag[locale === "en" ? "zh" : "en"] },
      { property: "og:locale:alternate", content: ogLocaleTag[locale === "ko" ? "zh" : "ko"] },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: absoluteImage },
    ],
    links: hreflangLinks(path, locale),
  };
}

export { alternateUrls };
