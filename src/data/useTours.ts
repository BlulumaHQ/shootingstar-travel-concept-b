import { getRouteApi } from "@tanstack/react-router";
import { useLocale } from "@/i18n/locale";
import type { Tour } from "./tours";

const rootApi = getRouteApi("__root__");

type LoaderData = { toursEn: Tour[]; toursZh: Tour[]; toursKo: Tour[] };

function pickTours(data: LoaderData, locale: string): Tour[] {
  if (locale === "zh") return data.toursZh;
  if (locale === "ko") return data.toursKo;
  return data.toursEn;
}

export function useTours(): Tour[] {
  const l = useLocale();
  const data = rootApi.useLoaderData() as LoaderData;
  return pickTours(data, l);
}

export function useGetTour() {
  const l = useLocale();
  const data = rootApi.useLoaderData() as LoaderData;
  const list = pickTours(data, l);
  return (slug: string): Tour | undefined => list.find((t) => t.slug === slug);
}
