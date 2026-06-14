import { getRouteApi } from "@tanstack/react-router";
import { useLocale } from "@/i18n/locale";
import { tours as toursZh, getTour as getTourZh } from "./tours.zh";
import { tours as toursKo, getTour as getTourKo } from "./tours.ko";
import type { Tour } from "./tours";

const rootApi = getRouteApi("__root__");

// Text fields that should come from the localized static file when present.
// Everything else (img, gallery, price, rezdyProductCode, href, etc.) stays
// from the English Supabase-sourced tour so cards, galleries, prices, and the
// Rezdy booking widget match the English page exactly.
const TEXT_KEYS = [
  "title",
  "desc",
  "intro",
  "duration",
  "language",
  "pickup",
  "itinerary",
  "roomOptions",
  "roomNote",
  "gratuity",
  "included",
  "notIncluded",
  "optional",
  "notes",
  "bookingCta",
] as const;

function overlayText(en: Tour, localized: Tour | undefined): Tour {
  if (!localized) return en;
  const out: Tour = { ...en };
  for (const k of TEXT_KEYS) {
    const v = (localized as any)[k];
    if (v !== undefined && v !== null && !(Array.isArray(v) && v.length === 0)) {
      (out as any)[k] = v;
    }
  }
  return out;
}

export function useTours(): Tour[] {
  const l = useLocale();
  const { toursEn } = rootApi.useLoaderData() as { toursEn: Tour[] };
  if (l === "en") return toursEn;
  const localized = l === "zh" ? toursZh : toursKo;
  const locBySlug = new Map(localized.map((t) => [t.slug, t]));
  return toursEn.map((en) => overlayText(en, locBySlug.get(en.slug)));
}

export function useGetTour() {
  const l = useLocale();
  const { toursEn } = rootApi.useLoaderData() as { toursEn: Tour[] };
  if (l === "en") {
    return (slug: string): Tour | undefined => toursEn.find((t) => t.slug === slug);
  }
  const localizedGetter = l === "zh" ? getTourZh : getTourKo;
  return (slug: string): Tour | undefined => {
    const en = toursEn.find((t) => t.slug === slug);
    if (!en) return undefined;
    return overlayText(en, localizedGetter(slug));
  };
}
