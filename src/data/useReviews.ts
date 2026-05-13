import { useLocale } from "@/i18n/locale";
import { reviews as reviewsEn } from "./reviews";
import { reviews as reviewsZh } from "./reviews.zh";
import { reviews as reviewsKo } from "./reviews.ko";

export function useReviews() {
  const l = useLocale();
  return l === "zh" ? reviewsZh : l === "ko" ? reviewsKo : reviewsEn;
}
