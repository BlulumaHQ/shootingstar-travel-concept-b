import { Link } from "@tanstack/react-router";
import { Clock } from "lucide-react";
import type { Tour } from "@/data/tours";
import { withLocale, type Locale } from "@/i18n/locale";
import { SalePrice } from "@/components/site/SalePrice";
import { PromotionBadge } from "@/components/site/PromotionBadge";

const LABELS: Record<Locale, { bookNow: string }> = {
  en: { bookNow: "Book Now" },
  zh: { bookNow: "立即預訂" },
  ko: { bookNow: "지금 예약" },
};

/**
 * Season badge — optional. Currently no `season` field exists on Tour,
 * so this is a no-op placeholder that automatically hides itself. When a
 * `season` field is added upstream, this component will render it at the
 * top-right of the card image, visually balanced with the promotion badge.
 */
function SeasonBadge({ season }: { season?: string | null }) {
  if (!season) return null;
  return (
    <span className="absolute top-2 right-2 z-10 inline-flex items-center rounded-full bg-cream/90 px-2.5 py-1 text-[10px] font-medium tracking-[0.16em] uppercase text-ink/75 backdrop-blur-sm">
      {season}
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
  const L = LABELS[locale];
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
          <Link
            to={href as never}
            className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-[12px] font-medium tracking-[0.14em] uppercase text-primary-foreground transition hover:bg-primary/90"
          >
            {L.bookNow}
          </Link>
        </div>
      </div>
    </article>
  );
}
