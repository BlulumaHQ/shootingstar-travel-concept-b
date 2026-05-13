import { useLocale } from "@/i18n/locale";
import { tours as toursEn, getTour as getTourEn, type Tour } from "./tours";
import { tours as toursZh, getTour as getTourZh } from "./tours.zh";
import { tours as toursKo, getTour as getTourKo } from "./tours.ko";

export function useTours(): Tour[] {
  const l = useLocale();
  return l === "zh" ? toursZh : l === "ko" ? toursKo : toursEn;
}

export function useGetTour() {
  const l = useLocale();
  return l === "zh" ? getTourZh : l === "ko" ? getTourKo : getTourEn;
}
