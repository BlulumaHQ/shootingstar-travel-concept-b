import type { Locale } from "./locale";

/* ------------------------------------------------------------------ */
/* 1. Price string formatter                                           */
/* ------------------------------------------------------------------ */
// Parses strings like "From $990 CAD / person" or "From $170 CAD / adult"
// and reformats by locale. Returns the input unchanged when the pattern
// does not match. Never mutates the stored value.

const PRICE_RE = /^\s*From\s+\$([\d,]+(?:\.\d+)?)\s*([A-Z]{3})\s*\/\s*(person|adult|child|guest)\s*$/i;

const UNIT_ZH: Record<string, string> = {
  person: "每位",
  guest: "每位",
  adult: "成人",
  child: "兒童",
};
const UNIT_KO: Record<string, string> = {
  person: "1인",
  guest: "1인",
  adult: "성인",
  child: "아동",
};

export function formatPrice(price: string | undefined | null, locale: Locale): string {
  if (!price) return "";
  if (locale === "en") return price;
  const m = PRICE_RE.exec(price);
  if (!m) return price;
  const [, amount, currency, unitRaw] = m;
  const unit = unitRaw.toLowerCase();
  if (locale === "zh") {
    const u = UNIT_ZH[unit] ?? unit;
    return `$${amount} ${currency} 起 / ${u}`;
  }
  // ko
  const u = UNIT_KO[unit] ?? unit;
  return `$${amount} ${currency}부터 / ${u}`;
}

/* ------------------------------------------------------------------ */
/* 2. Internal dev note filter                                         */
/* ------------------------------------------------------------------ */
const INTERNAL_NOTE_MARKERS = [
  "CSV",
  "Kim",
  "Rezdy publication",
  "confirmed before",
  "did not provide",
  "placeholder",
];

export function isInternalDevNote(text: string): boolean {
  if (!text) return false;
  return INTERNAL_NOTE_MARKERS.some((m) => text.includes(m));
}

/* ------------------------------------------------------------------ */
/* 3. Included / Not-included dictionary                               */
/* ------------------------------------------------------------------ */
type Tr = { zh: string; ko: string };

const INCLUDED_DICT: Record<string, Tr> = {
  "Comfortable transportation": { zh: "舒適交通", ko: "편안한 차량" },
  "Transportation": { zh: "交通", ko: "차량" },
  "Car": { zh: "車輛", ko: "차량" },
  "Bus": { zh: "巴士", ko: "버스" },
  "Driver": { zh: "司機", ko: "기사" },
  "Guide": { zh: "導遊", ko: "가이드" },
  "Driver / tour guide": { zh: "司機／導遊", ko: "기사/가이드" },
  "Parking": { zh: "停車費", ko: "주차" },
  "Scheduled pickup/drop-off": { zh: "定點接送", ko: "지정 픽업/드롭오프" },
  "Banff pickup": { zh: "班佛接送", ko: "밴프 픽업" },
  "Moraine Lake visit": { zh: "夢蓮湖參觀", ko: "모레인 호수 방문" },
  "Lake Louise visit": { zh: "露易絲湖參觀", ko: "레이크 루이스 방문" },
};

const NOT_INCLUDED_DICT: Record<string, Tr> = {
  "GST": { zh: "5% 消費稅 (GST)", ko: "5% 부가세 (GST)" },
  "Personal expenses": { zh: "個人消費", ko: "개인 경비" },
  "Meals": { zh: "餐食", ko: "식사" },
  "Meals and drinks": { zh: "餐食與飲料", ko: "식사 및 음료" },
  "Suggested guide gratuity": { zh: "建議導遊小費", ko: "권장 가이드 팁" },
  "Suggested gratuity": { zh: "建議小費", ko: "권장 팁" },
  "Tip $20": { zh: "小費 $20", ko: "팁 $20" },
  "Admission": { zh: "門票", ko: "입장료" },
  "Canoe rental": { zh: "獨木舟租借", ko: "카누 대여" },
  "Optional hikes": { zh: "自選健行", ko: "선택 하이킹" },
  "Optional self-guided hikes": { zh: "自選自助健行", ko: "선택 자유 하이킹" },
  "Optional add-ons": { zh: "自選加購項目", ko: "선택 추가 옵션" },
  "Optional attraction tickets": { zh: "自選景點門票", ko: "선택 입장권" },
  "U-pick cost": { zh: "採果費用", ko: "과일 따기 비용" },
  "Fishing license": { zh: "釣魚證", ko: "낚시 면허" },
};

function lookup(dict: Record<string, Tr>, text: string, locale: Locale): string {
  if (locale === "en") return text;
  const entry = dict[text.trim()];
  if (!entry) return text;
  return locale === "zh" ? entry.zh : entry.ko;
}

export function translateIncludedItem(text: string, locale: Locale): string {
  return lookup(INCLUDED_DICT, text, locale);
}

export function translateNotIncludedItem(text: string, locale: Locale): string {
  return lookup(NOT_INCLUDED_DICT, text, locale);
}
