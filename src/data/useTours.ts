import { getRouteApi } from "@tanstack/react-router";
import { useLocale } from "@/i18n/locale";
import { tours as toursZh, getTour as getTourZh } from "./tours.zh";
import { tours as toursKo, getTour as getTourKo } from "./tours.ko";
import type { Tour } from "./tours";

const rootApi = getRouteApi("__root__");

// Fields that come from the English/Supabase source of truth and must be
// merged into localized Tour objects so booking works in every locale.
const BOOKING_FIELDS = ["rezdyProductCode", "price"] as const;

function mergeBooking(localized: Tour | undefined, en: Tour | undefined): Tour | undefined {
  if (!localized) return undefined;
  if (!en) return localized;
  const merged: Tour = { ...localized };
  for (const k of BOOKING_FIELDS) {
    const v = (en as Tour)[k];
    if (v !== undefined && v !== null && v !== "") {
      (merged as Record<string, unknown>)[k] = v;
    }
  }
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
