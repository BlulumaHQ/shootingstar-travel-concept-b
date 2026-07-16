/**
 * Centralized Rezdy language + URL handling.
 *
 * Rezdy's hosted booking pages (`https://<company>.rezdy.com/...`) and
 * embeddable Calendar / Booking / Product-List widgets do NOT expose a
 * publicly documented URL parameter for language selection. The plugin JS
 * (`/pluginJs`) and calendar widget iframe both render in the language
 * configured on the Rezdy account; end customers can change language via
 * Rezdy's own in-widget selector.
 *
 * Per project rules we must NOT invent an undocumented `lang=` /
 * `locale=` parameter — a wrong query string is silently ignored today
 * but could break checkout the day Rezdy starts validating it.
 *
 * This module is the ONE place that maps a website locale to a Rezdy URL.
 * The moment Rezdy publishes an official language-control method, wire it
 * in here and every Book Now button / iframe picks it up automatically.
 */
import type { Locale } from "@/i18n/locale";

/**
 * Locale → Rezdy language code (kept for future use; currently unused
 * because no official public URL parameter exists).
 */
export const REZDY_LANG_BY_LOCALE: Record<Locale, string> = {
  en: "en",
  zh: "zh",
  ko: "ko",
};

export type RezdyLanguageStatus = {
  /** Final URL to open / embed. Guaranteed to be a working booking URL. */
  url: string;
  /** Rezdy language actually requested via a supported method (null = no supported method exists). */
  appliedLanguage: string | null;
  /** True when we successfully applied a supported Rezdy language method. */
  supported: boolean;
  /** True when we fell back to Rezdy's configured default language. */
  fallback: boolean;
};

/**
 * Build a Rezdy URL for the given website locale.
 *
 * Today: no supported public method → returns the original URL untouched
 * (`supported: false`, `fallback: true`). If the original URL is falsy /
 * malformed we still return it as-is so the caller's own guards apply.
 */
export function buildRezdyUrl(originalUrl: string, locale: Locale): RezdyLanguageStatus {
  const result: RezdyLanguageStatus = {
    url: originalUrl,
    appliedLanguage: null,
    supported: false,
    fallback: true,
  };

  // Dev-only diagnostic. Never surfaced in production UI.
  if (import.meta.env.DEV && typeof console !== "undefined") {
    console.debug("[rezdy-lang]", {
      websiteLocale: locale,
      requestedRezdyLanguage: REZDY_LANG_BY_LOCALE[locale],
      originalUrl,
      finalUrl: result.url,
      supportedMethodFound: result.supported,
      fallbackUsed: result.fallback,
    });
  }

  return result;
}
