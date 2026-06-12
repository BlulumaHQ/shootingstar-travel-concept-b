import { getRouteApi } from "@tanstack/react-router";
import { useLocale } from "@/i18n/locale";
import { tours as toursZh, getTour as getTourZh } from "./tours.zh";
import { tours as toursKo, getTour as getTourKo } from "./tours.ko";
import type { Tour } from "./tours";

const rootApi = getRouteApi("__root__");

export function useTours(): Tour[] {
  const l = useLocale();
  const { toursEn } = rootApi.useLoaderData() as { toursEn: Tour[] };
  return l === "zh" ? toursZh : l === "ko" ? toursKo : toursEn;
}

export function useGetTour() {
  const l = useLocale();
  const { toursEn } = rootApi.useLoaderData() as { toursEn: Tour[] };
  if (l === "zh") return getTourZh;
  if (l === "ko") return getTourKo;
  return (slug: string): Tour | undefined => toursEn.find((t) => t.slug === slug);
}
