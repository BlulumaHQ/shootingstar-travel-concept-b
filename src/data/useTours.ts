import { getRouteApi } from "@tanstack/react-router";
import { useLocale } from "@/i18n/locale";
import { tours as toursZh, getTour as getTourZh } from "./tours.zh";
import { tours as toursKo, getTour as getTourKo } from "./tours.ko";
import type { Tour } from "./tours";

const rootApi = getRouteApi("__root__");

// Localized tour files don't carry booking-only fields (rezdyProductCode).
// Merge them from the English source of truth so booking works in every locale.
// Keep localized title/intro/price untouched.
function mergeBooking(localized: Tour | undefined, en: Tour | undefined): Tour | undefined {
  if (!localized) return undefined;
  if (!en) return localized;
  const merged: Tour = { ...localized };
  if (en.rezdyProductCode && !merged.rezdyProductCode) {
    merged.rezdyProductCode = en.rezdyProductCode;
  }
  // Fall back to EN price only if the localized one is missing.
  if (en.price && !merged.price) merged.price = en.price;
  return merged;
}

export function useTours(): Tour[] {
  const l = useLocale();
  const { toursEn } = rootApi.useLoaderData() as { toursEn: Tour[] };
  if (l === "en") return toursEn;
  const base = l === "zh" ? toursZh : toursKo;
  const enBySlug = new Map(toursEn.map((t) => [t.slug, t]));
  return base.map((t) => mergeBooking(t, enBySlug.get(t.slug))!);
}

export function useGetTour() {
  const l = useLocale();
  const { toursEn } = rootApi.useLoaderData() as { toursEn: Tour[] };
  if (l === "en") {
    return (slug: string): Tour | undefined => toursEn.find((t) => t.slug === slug);
  }
  const localizedGetter = l === "zh" ? getTourZh : getTourKo;
  return (slug: string): Tour | undefined =>
    mergeBooking(localizedGetter(slug), toursEn.find((t) => t.slug === slug));
}
