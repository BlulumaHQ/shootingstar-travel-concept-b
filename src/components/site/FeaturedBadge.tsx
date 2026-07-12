import { useLocale } from "@/i18n/locale";
import { FEATURED_TOUR_SLUG } from "@/data/sortTours";

const LABELS: Record<string, string> = {
  en: "Editor's Pick",
  zh: "編輯精選",
  ko: "특별 추천",
};

/**
 * Small badge overlaid on tour card imagery to flag the site-wide featured tour.
 * Uses the brand's lavender accent (against warm forest-green primary) so it
 * reads as "special" without shouting.
 */
export function FeaturedBadge({ slug, className = "" }: { slug: string; className?: string }) {
  const locale = useLocale();
  if (slug !== FEATURED_TOUR_SLUG) return null;
  const label = LABELS[locale] ?? LABELS.en;
  return (
    <span
      className={
        "absolute top-2 left-2 z-10 inline-flex items-center gap-1.5 rounded-full bg-accent px-2.5 py-1 text-[10px] font-medium tracking-[0.18em] uppercase text-accent-foreground shadow-[0_4px_10px_-4px_rgba(70,80,75,0.35)] " +
        className
      }
    >
      <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent-foreground/85" />
      {label}
    </span>
  );
}
