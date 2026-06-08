import type { Locale } from "./locale";

/**
 * Locale-aware phone numbers.
 * - English & Chinese audiences → 604-765-7765
 * - Korean audience           → 778-288-7524
 */
export function getPhone(locale: Locale): { display: string; tel: string; wa: string } {
  if (locale === "ko") {
    return {
      display: "778-288-7524",
      tel: "tel:7782887524",
      wa: "https://wa.me/17782887524",
    };
  }
  return {
    display: "604-765-7765",
    tel: "tel:6047657765",
    wa: "https://wa.me/16047657765",
  };
}
