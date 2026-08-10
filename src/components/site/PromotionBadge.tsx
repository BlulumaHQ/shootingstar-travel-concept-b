import { useLocale } from "@/i18n/locale";
import type { Tour } from "@/data/tours";

const BASE_CLASSES =
  "absolute top-2 left-2 z-10 inline-flex items-center gap-1.5 rounded-full bg-destructive px-2.5 py-1 text-[10px] font-medium tracking-[0.18em] uppercase text-destructive-foreground shadow-[0_4px_10px_-4px_rgba(70,80,75,0.35)]";

/**
 * Promotional badge for tour cards.
 *
 * Renders an explicit `tour.promotion` or `tour.promotionBadge` label when present
 * (e.g. "45% OFF", "Summer Sale", "Limited Time", "Early Bird", "Best Value"),
 * or a "N% OFF" chip when `tour.discountPercent` is set. Hidden entirely when no
 * promotion applies.
 */
export function PromotionBadge({
  tour,
  className = "",
}: {
  tour: Tour;
  className?: string;
}) {
  const locale = useLocale();
  const t = tour as Tour & {
    promotion?: string | null;
    promotionBadge?: string | null;
    discountPercent?: number | null;
  };
  const explicit = t.promotionBadge ?? t.promotion;
  const pct = typeof t.discountPercent === "number" ? `${t.discountPercent}% OFF` : null;

  const label = explicit ?? pct;
  if (!label) return null;

  return (
    <span className={`${BASE_CLASSES} ${className}`}>
      <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-destructive-foreground/85" />
      {label}
    </span>
  );
}
