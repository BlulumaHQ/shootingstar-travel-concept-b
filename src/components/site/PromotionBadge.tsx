import { useLocale } from "@/i18n/locale";
import type { Tour } from "@/data/tours";
import { FEATURED_TOUR_SLUG } from "@/data/sortTours";

const LABELS: Record<string, string> = {
  en: "Special Offer",
  zh: "特價活動",
  ko: "특별 할인",
};

const BASE_CLASSES =
  "absolute top-2 left-2 z-10 inline-flex items-center gap-1.5 rounded-full bg-destructive px-2.5 py-1 text-[10px] font-medium tracking-[0.18em] uppercase text-destructive-foreground shadow-[0_4px_10px_-4px_rgba(70,80,75,0.35)]";

/**
 * Promotional badge for tour cards.
 *
 * Renders an explicit `tour.promotion` label when present (e.g. "45% OFF",
 * "Summer Sale", "Limited Time", "Early Bird", "Best Value"). Falls back to a
 * "Special Offer" callout for the site-wide featured tour. Hidden entirely when
 * no promotion applies.
 */
export function PromotionBadge({
  tour,
  className = "",
}: {
  tour: Tour;
  className?: string;
}) {
  const locale = useLocale();
  const promotion = (tour as Tour & { promotion?: string | null }).promotion;

  const label = promotion ?? (tour.slug === FEATURED_TOUR_SLUG ? LABELS[locale] ?? LABELS.en : null);
  if (!label) return null;

  return (
    <span className={`${BASE_CLASSES} ${className}`}>
      <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-destructive-foreground/85" />
      {label}
    </span>
  );
}
