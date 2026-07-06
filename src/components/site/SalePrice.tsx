import type { Locale } from "@/i18n/locale";
import { formatPrice } from "@/i18n/tourText";

export type SaleInfo = {
  sale: string; // e.g. "$115"
  original: string; // e.g. "$144"
  currency: string; // e.g. "CAD"
  percent: string; // e.g. "20"
};

/**
 * Detect the "20% OFF" sale price pattern used on select tours.
 * Recognized shapes (all locales, first `$` = sale, second `$` = original):
 *   en: "From $115 CAD / person (was $144) · 20% OFF"
 *   zh: "特價 $115 CAD 起 / 每位（原價 $144）· 20% OFF"
 *   ko: "특가 $115 CAD 부터 / 1인 (정가 $144) · 20% OFF"
 */
export function parseSalePrice(price?: string | null): SaleInfo | null {
  if (!price) return null;
  const pctMatch = price.match(/(\d+)\s*%\s*OFF/i);
  if (!pctMatch) return null;
  const dollars = [...price.matchAll(/\$([\d,]+(?:\.\d+)?)/g)].map((m) => m[1]);
  if (dollars.length < 2) return null;
  const currency = price.match(/\b([A-Z]{3})\b/)?.[1] ?? "CAD";
  return {
    sale: `$${dollars[0]}`,
    original: `$${dollars[1]}`,
    currency,
    percent: pctMatch[1],
  };
}

function saleBadgeLabel(percent: string, locale: Locale): string {
  if (locale === "zh") return `${percent}% 折扣`;
  if (locale === "ko") return `${percent}% 할인`;
  return `${percent}% OFF`;
}

function perPersonLabel(locale: Locale): string {
  if (locale === "zh") return "每位";
  if (locale === "ko") return "1인";
  return "per person";
}

type Size = "sm" | "md" | "lg";

const SIZE: Record<Size, {
  sale: string;
  currency: string;
  original: string;
  perPerson: string;
  badge: string;
  gap: string;
}> = {
  sm: {
    sale: "font-serif text-primary text-[15px] font-semibold leading-none",
    currency: "text-primary/80 text-[10.5px] font-medium ml-1",
    original: "text-ink/45 line-through text-[11.5px]",
    perPerson: "text-ink/50 text-[10.5px]",
    badge: "text-[9.5px] tracking-[0.08em] px-1.5 py-0.5",
    gap: "gap-x-1.5 gap-y-0.5",
  },
  md: {
    sale: "font-serif text-primary text-[18px] font-semibold leading-none",
    currency: "text-primary/80 text-[11px] font-medium ml-1",
    original: "text-ink/45 line-through text-[12.5px]",
    perPerson: "text-ink/50 text-[11px]",
    badge: "text-[10px] tracking-[0.08em] px-2 py-0.5",
    gap: "gap-x-2 gap-y-0.5",
  },
  lg: {
    sale: "font-serif text-primary text-[26px] font-semibold leading-none",
    currency: "text-primary/80 text-[12px] font-medium ml-1",
    original: "text-ink/45 line-through text-[13px]",
    perPerson: "text-ink/55 text-[11px]",
    badge: "text-[10.5px] tracking-[0.08em] px-2 py-0.5",
    gap: "gap-x-2.5 gap-y-1",
  },
};

/**
 * SalePrice — renders the sale treatment when `price` contains "N% OFF".
 * Otherwise falls back to the standard `formatPrice(price, locale)` string,
 * matching the caller's existing typography via `fallbackClassName`.
 */
export function SalePrice({
  price,
  locale,
  size = "md",
  showPerPerson = false,
  fallbackClassName,
  className = "",
}: {
  price?: string | null;
  locale: Locale;
  size?: Size;
  showPerPerson?: boolean;
  fallbackClassName?: string;
  className?: string;
}) {
  const info = parseSalePrice(price);
  if (!info) {
    return <span className={fallbackClassName}>{formatPrice(price ?? "", locale)}</span>;
  }
  const s = SIZE[size];
  return (
    <span className={`inline-flex flex-wrap items-baseline ${s.gap} ${className}`}>
      <span className="inline-flex items-baseline">
        <span className={s.sale}>{info.sale}</span>
        <span className={s.currency}>{info.currency}</span>
      </span>
      <span className={s.original}>{info.original}</span>
      <span
        className={`inline-flex items-center rounded-full bg-primary text-primary-foreground font-medium uppercase ${s.badge}`}
      >
        {saleBadgeLabel(info.percent, locale)}
      </span>
      {showPerPerson && <span className={s.perPerson}>/ {perPersonLabel(locale)}</span>}
    </span>
  );
}
