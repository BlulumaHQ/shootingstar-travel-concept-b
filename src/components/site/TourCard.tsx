import { Link } from "@tanstack/react-router";
import { Clock } from "lucide-react";
import type { Tour } from "@/data/tours";
import { useLocale, withLocale, type Locale } from "@/i18n/locale";
import { SalePrice } from "@/components/site/SalePrice";
import { PromotionBadge } from "@/components/site/PromotionBadge";
import { BookNowButton } from "@/components/site/BookNowButton";

type SeasonKey = "spring" | "summer" | "fall" | "winter" | "all_season";

const SEASON_LABELS: Record<SeasonKey, Record<Locale, string>> = {
  spring: { en: "Spring", zh: "春季", ko: "봄" },
  summer: { en: "Summer", zh: "夏季", ko: "여름" },
  fall: { en: "Fall", zh: "秋季", ko: "가을" },
  winter: { en: "Winter", zh: "冬季", ko: "겨울" },
  all_season: { en: "All Season", zh: "全年", ko: "연중" },
};

// Elegant, low-saturation season palette — background + text pairs chosen to
// stay consistent with the site's soft cream/ink branding.
const SEASON_COLORS: Record<SeasonKey, string> = {
  spring: "bg-[oklch(0.92_0.06_150)] text-[oklch(0.35_0.09_150)]",
  summer: "bg-[oklch(0.94_0.08_90)] text-[oklch(0.40_0.10_75)]",
  fall: "bg-[oklch(0.90_0.09_55)] text-[oklch(0.40_0.13_45)]",
  winter: "bg-[oklch(0.92_0.05_235)] text-[oklch(0.38_0.10_235)]",
  all_season: "bg-[oklch(0.91_0.06_195)] text-[oklch(0.36_0.08_200)]",
};

/**
 * Season badge — renders the localized season label at the top-right of the
 * card image. Hidden when the tour has no `season` value or the value is not
 * one of the supported database keys. Colored per-season with an elegant,
 * low-saturation palette.
 */
function SeasonBadge({ season }: { season?: string | null }) {
  const locale = useLocale();
  if (!season) return null;

  const key = season.toLowerCase() as SeasonKey;
  const label = SEASON_LABELS[key]?.[locale];
  if (!label) return null;
  const color = SEASON_COLORS[key] ?? "bg-cream/90 text-ink/75";

  return (
    <span
      className={`absolute top-2 right-2 z-10 inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-medium tracking-[0.16em] uppercase backdrop-blur-sm shadow-[0_2px_6px_-2px_rgba(70,80,75,0.25)] ${color}`}
    >
      {label}
    </span>
  );
}

export function TourCard({
  tour,
  locale,
  className = "",
}: {
  tour: Tour;
  locale: Locale;
  className?: string;
}) {
  const href = withLocale(tour.href ?? `/tours/${tour.slug}`, locale);
  const season = (tour as Tour & { season?: string }).season;

  return (
    <article
      className={
        "group relative flex h-full flex-col overflow-hidden rounded-2xl bg-card shadow-[0_1px_2px_-1px_rgba(70,80,75,0.06),0_20px_40px_-24px_rgba(70,80,75,0.22)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_2px_6px_-2px_rgba(70,80,75,0.08),0_32px_60px_-24px_rgba(70,80,75,0.32)] " +
        className
      }
    >
      <Link
        to={href as never}
        aria-label={tour.title}
        className="relative block aspect-[5/4] overflow-hidden"
      >
        <img
          src={tour.img}
          alt={tour.title}
          loading="lazy"
          className="h-full w-full object-cover transition duration-[1200ms] group-hover:scale-[1.06]"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/25 via-transparent to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
        <PromotionBadge tour={tour} />
        <SeasonBadge season={season} />
      </Link>

      <div className="flex flex-1 flex-col p-5 md:p-6">
        <Link to={href as never} className="block">
          <h3 className="tour-title font-serif text-[17px] md:text-[18px] font-semibold leading-snug text-ink transition-colors group-hover:text-primary">
            {tour.title}
          </h3>
        </Link>

        {tour.desc && (
          <p className="mt-2 line-clamp-2 text-[13px] leading-[1.7] text-ink/60">
            {tour.desc}
          </p>
        )}

        {tour.duration && (
          <div className="mt-4 flex items-center gap-2 border-t border-ink/8 pt-4">
            <span className="inline-flex items-center gap-1.5 text-[11.5px] tracking-[0.14em] uppercase text-ink/55">
              <Clock size={13} strokeWidth={1.8} className="text-primary/70" />
              {tour.duration}
            </span>
          </div>
        )}

        <div className="mt-auto pt-5 flex items-center justify-between gap-3">
          {tour.price ? (
            <SalePrice
              price={tour.price}
              locale={locale}
              size="sm"
              fallbackClassName="font-serif text-[15px] font-semibold text-primary"
            />
          ) : (
            <span />
          )}
          <BookNowButton
            to={href}
            ariaLabel={tour.title}
            variant={
              (tour as Tour & { promotionBadge?: string | null; discountPercent?: number | null }).promotionBadge ||
              typeof (tour as Tour & { discountPercent?: number | null }).discountPercent === "number"
                ? "promo"
                : "default"
            }
          />

        </div>
      </div>
    </article>
  );
}
