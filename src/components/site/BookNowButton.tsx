import { Link } from "@tanstack/react-router";
import { useLocale, type Locale } from "@/i18n/locale";

/**
 * BookNowButton — the single, canonical Primary CTA used on every Tour Card
 * across the site (Homepage Featured Tours, All Tours, Region pages, Search
 * results, Related Tours, and any future Tour Card component).
 *
 * Variants:
 *  - "default" → Brand Green (bg-primary)
 *  - "promo"   → Red (bg-destructive) when the tour has a promotion badge or
 *                discount percentage. Callers decide via `variant`.
 *
 * Do NOT re-style Book Now inline anywhere else. Import this component and
 * use it as-is so width, height, radius, typography, hover and disabled
 * state stay identical everywhere.
 */

const LABELS: Record<Locale, string> = {
  en: "Book Now",
  zh: "立即預訂",
  ko: "지금 예약",
};

const BOOK_NOW_BASE =
  "inline-flex items-center justify-center whitespace-nowrap " +
  "h-10 min-w-[112px] px-5 " +
  "rounded-full " +
  "text-[12px] font-medium tracking-[0.14em] uppercase leading-none " +
  "transition-colors duration-200 " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-card " +
  "disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50";

const VARIANT_CLASSES: Record<"default" | "promo", string> = {
  default:
    "bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:ring-primary/40",
  promo:
    "bg-destructive text-destructive-foreground hover:bg-destructive/90 focus-visible:ring-destructive/40",
};

type Props = {
  to?: string;
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
  label?: string;
  ariaLabel?: string;
  className?: string;
  variant?: "default" | "promo";
};

export function BookNowButton({
  to,
  href,
  onClick,
  disabled,
  label,
  ariaLabel,
  className = "",
  variant = "default",
}: Props) {
  const locale = useLocale();
  const text = label ?? LABELS[locale];
  const classes = `${BOOK_NOW_BASE} ${VARIANT_CLASSES[variant]} ${className}`.trim();

  if (disabled) {
    return (
      <button type="button" className={classes} disabled aria-label={ariaLabel}>
        {text}
      </button>
    );
  }

  if (to) {
    return (
      <Link to={to as never} className={classes} aria-label={ariaLabel}>
        {text}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes} aria-label={ariaLabel}>
        {text}
      </a>
    );
  }

  return (
    <button type="button" className={classes} onClick={onClick} aria-label={ariaLabel}>
      {text}
    </button>
  );
}
