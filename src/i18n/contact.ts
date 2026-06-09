import type { Locale } from "./locale";

/**
 * Locale-aware default phone (used where only ONE number is shown).
 * Korean locale defaults to the Korean line; others default to the
 * Chinese / English line.
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

/**
 * Both support lines — shown together on Contact page and in Footer
 * so guests can self-select the right team.
 */
export type SupportLine = {
  key: "cn-en" | "ko-en";
  display: string;
  tel: string;
  wa: string;
  /** Localized label, e.g. "Chinese & English Support". */
  label: string;
};

export function getSupportLines(locale: Locale): SupportLine[] {
  const labels = {
    en: {
      cn: "Chinese & English Support",
      ko: "Korean & English Support",
    },
    zh: {
      cn: "中文 / 英文 客服專線",
      ko: "韓文 / 英文 客服專線",
    },
    ko: {
      cn: "중국어 / 영어 상담",
      ko: "한국어 / 영어 상담",
    },
  } as const;
  const L = labels[locale];
  return [
    {
      key: "cn-en",
      display: "604-765-7765",
      tel: "tel:6047657765",
      wa: "https://wa.me/16047657765",
      label: L.cn,
    },
    {
      key: "ko-en",
      display: "778-288-7524",
      tel: "tel:7782887524",
      wa: "https://wa.me/17782887524",
      label: L.ko,
    },
  ];
}
