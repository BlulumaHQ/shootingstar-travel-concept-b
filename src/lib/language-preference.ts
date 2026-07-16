/**
 * Client-side language preference persistence.
 *
 * - Saves the visitor's manual language selection in localStorage.
 * - On first visit (no saved value), detects browser language and picks
 *   Traditional Chinese for `zh-*`, English for everything else.
 * - After a manual choice, always respects the saved value.
 *
 * The website's routing already encodes locale in the URL prefix
 * (`/`, `/en/*`, `/ko/*`), so this hook only redirects when the URL
 * doesn't match the saved preference — never on every navigation.
 */
import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "@tanstack/react-router";
import { localeFromPath, stripLocale, withLocale, type Locale, locales } from "@/i18n/locale";

const STORAGE_KEY = "sst.lang";

export function getSavedLocale(): Locale | null {
  if (typeof window === "undefined") return null;
  try {
    const v = window.localStorage.getItem(STORAGE_KEY);
    if (v && (locales as string[]).includes(v)) return v as Locale;
  } catch {
    // ignore quota / privacy-mode errors
  }
  return null;
}

export function setSavedLocale(locale: Locale): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, locale);
  } catch {
    // ignore
  }
}

/**
 * Detect the first-visit locale from the browser's language settings.
 * Returns `zh` for any `zh-*` browser, `en` for anything else.
 * Korean is intentionally NOT auto-selected: the spec only lists zh vs en
 * for first-visit fallback. Visitors who want Korean use the switcher.
 */
export function detectBrowserLocale(): Locale {
  if (typeof navigator === "undefined") return "zh";
  const langs: string[] = [];
  if (Array.isArray(navigator.languages)) langs.push(...navigator.languages);
  if (navigator.language) langs.push(navigator.language);
  for (const raw of langs) {
    const l = raw.toLowerCase();
    if (l.startsWith("zh")) return "zh";
  }
  return "en";
}

/**
 * Hook: keep the URL locale prefix in sync with the visitor's saved
 * preference. Runs once per navigation. Never fights a user click —
 * the switcher writes to localStorage BEFORE navigating.
 */
export function useLanguagePreferenceSync(): void {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const initializedRef = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    // Only run this reconciliation ONCE per full page load. After the
    // initial mount we trust the URL — internal Links are locale-aware,
    // and the switcher writes localStorage BEFORE navigating.
    if (initializedRef.current) return;
    initializedRef.current = true;

    const currentUrlLocale = localeFromPath(pathname);

    // Priority:
    //   1. Manually saved localStorage value (if valid).
    //   2. Browser Preferred Language — first visit only.
    //   3. English fallback (handled inside detectBrowserLocale).
    let saved = getSavedLocale();
    if (!saved) {
      saved = detectBrowserLocale();
      setSavedLocale(saved);
    }

    if (saved !== currentUrlLocale) {
      const target = withLocale(stripLocale(pathname), saved);
      if (target !== pathname) navigate({ to: target as never, replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
