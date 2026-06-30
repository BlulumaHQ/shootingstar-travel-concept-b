import { useLocation } from "@tanstack/react-router";

export type Locale = "en" | "zh" | "ko";
export const locales: Locale[] = ["zh", "en", "ko"];

export const localeLabels: Record<Locale, string> = {
  en: "EN",
  zh: "中文",
  ko: "한국어",
};

export const localeHtmlLang: Record<Locale, string> = {
  en: "en",
  zh: "zh-Hant",
  ko: "ko",
};

export const SITE_URL = "https://www.shootingstartravel.ca";

/**
 * Detect locale from any pathname.
 * - `/en` or `/en/...` -> "en"
 * - `/ko` or `/ko/...` -> "ko"
 * - `/zh` or `/zh/...` -> "zh" (legacy alias; same content as bare)
 * - everything else (the bare path, e.g. `/`, `/about`, `/tours/...`) -> "zh" (default)
 */
export function localeFromPath(pathname: string): Locale {
  if (pathname === "/en" || pathname.startsWith("/en/")) return "en";
  if (pathname === "/ko" || pathname.startsWith("/ko/")) return "ko";
  if (pathname === "/zh" || pathname.startsWith("/zh/")) return "zh";
  return "zh";
}

/** Hook: read locale from current URL. */
export function useLocale(): Locale {
  const { pathname } = useLocation();
  return localeFromPath(pathname);
}

/**
 * Strip locale prefix.
 * - `/en/about` -> `/about`, `/en` -> `/`
 * - `/zh/about` -> `/about`, `/zh` -> `/`
 * - `/ko/about` -> `/about`, `/ko` -> `/`
 * - `/about` -> `/about`
 */
export function stripLocale(pathname: string): string {
  if (pathname === "/en" || pathname === "/zh" || pathname === "/ko") return "/";
  if (pathname.startsWith("/en/")) return pathname.slice(3);
  if (pathname.startsWith("/zh/")) return pathname.slice(3);
  if (pathname.startsWith("/ko/")) return pathname.slice(3);
  return pathname;
}

/**
 * Build path with locale prefix.
 * - zh (default) -> bare path
 * - en -> `/en/...`
 * - ko -> `/ko/...`
 */
export function withLocale(pathname: string, locale: Locale): string {
  const bare = stripLocale(pathname);
  if (locale === "zh") return bare;
  if (bare === "/") return `/${locale}`;
  return `/${locale}${bare}`;
}

/** Build a locale-aware href for the same logical page across locales. */
export function alternateUrls(pathname: string): Record<Locale, string> {
  return {
    en: `${SITE_URL}${withLocale(pathname, "en")}`,
    zh: `${SITE_URL}${withLocale(pathname, "zh")}`,
    ko: `${SITE_URL}${withLocale(pathname, "ko")}`,
  };
}

/**
 * Build hreflang + canonical link entries for head().links.
 * - canonical points to the URL for the CURRENT locale
 * - hreflang alternates point at each locale's URL
 * - x-default points at the Chinese (bare) URL, which is the site default
 */
export function hreflangLinks(pathname: string, currentLocale: Locale) {
  const alts = alternateUrls(pathname);
  return [
    { rel: "canonical", href: alts[currentLocale] },
    { rel: "alternate", hrefLang: "en", href: alts.en },
    { rel: "alternate", hrefLang: "zh-Hant", href: alts.zh },
    { rel: "alternate", hrefLang: "ko", href: alts.ko },
    { rel: "alternate", hrefLang: "x-default", href: alts.zh },
  ];
}
