import { useLocation } from "@tanstack/react-router";

export type Locale = "en" | "zh" | "ko";
export const locales: Locale[] = ["en", "ko", "zh"];

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

/** Detect locale from any pathname. /zh/... -> zh, /ko/... -> ko, else en. */
export function localeFromPath(pathname: string): Locale {
  if (pathname === "/zh" || pathname.startsWith("/zh/")) return "zh";
  if (pathname === "/ko" || pathname.startsWith("/ko/")) return "ko";
  return "en";
}

/** Hook: read locale from current URL. */
export function useLocale(): Locale {
  const { pathname } = useLocation();
  return localeFromPath(pathname);
}

/** Strip locale prefix. /zh/about -> /about, /ko -> /, /about -> /about */
export function stripLocale(pathname: string): string {
  if (pathname === "/zh" || pathname === "/ko") return "/";
  if (pathname.startsWith("/zh/")) return pathname.slice(3);
  if (pathname.startsWith("/ko/")) return pathname.slice(3);
  return pathname;
}

/** Build path with locale prefix. en stays bare; zh/ko prefixed. */
export function withLocale(pathname: string, locale: Locale): string {
  const bare = stripLocale(pathname);
  if (locale === "en") return bare;
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

/** Build hreflang + canonical link entries for head().links */
export function hreflangLinks(pathname: string, currentLocale: Locale) {
  const alts = alternateUrls(pathname);
  return [
    { rel: "canonical", href: alts[currentLocale] },
    { rel: "alternate", hrefLang: "en", href: alts.en },
    { rel: "alternate", hrefLang: "zh-Hant", href: alts.zh },
    { rel: "alternate", hrefLang: "ko", href: alts.ko },
    { rel: "alternate", hrefLang: "x-default", href: alts.en },
  ];
}
