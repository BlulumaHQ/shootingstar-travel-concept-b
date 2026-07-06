import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { useLocale, withLocale, type Locale } from "@/i18n/locale";
import { formatPrice } from "@/i18n/tourText";
import { SalePrice, parseSalePrice } from "@/components/site/SalePrice";
import type { LakeToursContent } from "@/content/lake-tours";
import { LAKE_TOURS_HERO_IMG } from "@/content/lake-tours";
import type { Tour } from "@/data/tours";
import calgaryStampede from "@/assets/calgary-stampede.webp";

const STAMPEDE_SLUG = "moraine-lake-lake-louise-calgary-departure";

const STAMPEDE_PROMO: Record<Locale, {
  badge: string;
  headline: string;
  subheadline: string;
  cta: string;
  secondary: string;
}> = {
  en: {
    badge: "🔥 Limited Time Only",
    headline: "Calgary Stampede Special",
    subheadline: "Save 20% on our Calgary Departure Tours",
    cta: "Book Now",
    secondary:
      "Experience the world-famous Calgary Stampede together with Moraine Lake, Lake Louise and Banff in one unforgettable Rocky Mountain adventure.",
  },
  zh: {
    badge: "🔥 限時優惠",
    headline: "卡加立牛仔節限定特惠",
    subheadline: "卡加立出發行程即刻享 20% 折扣",
    cta: "立即預訂",
    secondary:
      "世界聞名的卡加立牛仔節，加上夢蓮湖、露易絲湖與班夫 —— 一趟難忘的洛磯山脈盛夏之旅。",
  },
  ko: {
    badge: "🔥 한정 프로모션",
    headline: "캘거리 스탬피드 스페셜",
    subheadline: "캘거리 출발 투어를 20% 할인가로 만나보세요",
    cta: "지금 예약",
    secondary:
      "세계적으로 유명한 캘거리 스탬피드와 함께 모레인 호수, 레이크 루이스, 밴프까지 잊지 못할 로키 마운틴 여정.",
  },
};

/**
 * Rocky Mountain Lake Tours — landing page.
 * One clean premium page: hero → 5 tour cards → comparison table →
 * suggested combinations → final CTA. Everything else has been
 * deliberately moved to the individual tour detail pages.
 */
export function LakeToursLanding({ content }: { content: LakeToursContent }) {
  const locale = useLocale();
  const c = content;

  // Pull live image + price from Supabase tours data (matches the regular Tours page).
  const [liveBySlug, setLiveBySlug] = useState<Record<string, Pick<Tour, "img" | "price">>>({});
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { fetchTourBySlugEn } = await import("@/data/toursSource");
      const entries = await Promise.all(
        c.tours.map(async (t) => {
          try {
            const live = await fetchTourBySlugEn(t.slug);
            if (!live) return null;
            return [t.slug, { img: live.img, price: live.price }] as const;
          } catch {
            return null;
          }
        }),
      );
      if (cancelled) return;
      const next: Record<string, Pick<Tour, "img" | "price">> = {};
      for (const e of entries) if (e) next[e[0]] = e[1];
      setLiveBySlug(next);
    })();
    return () => {
      cancelled = true;
    };
  }, [c.tours]);

  const tourHref = (slug: string) => withLocale(`/tours/${slug}`, locale);
  const contactHref = withLocale("/contact", locale);
  const toursIndexHref = withLocale("/tours", locale);


  const promo = STAMPEDE_PROMO[locale];
  const stampedeHref = withLocale(`/tours/${STAMPEDE_SLUG}`, locale);

  return (
    <SiteLayout>
      {/* ============ HERO — Calgary Stampede Special ============ */}
      <section className="relative overflow-hidden bg-ink">
        <img
          src={calgaryStampede}
          alt="Calgary Stampede rodeo action"
          className="absolute inset-0 h-full w-full object-cover object-[70%_center] md:object-center"
        />
        {/* Dark gradient for legibility while keeping the photo visible */}
        <div className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/55 to-ink/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-[1240px] px-5 md:px-10 py-24 md:py-36 text-cream [text-shadow:0_2px_22px_rgba(0,0,0,0.75)]">
          <div className="max-w-2xl">
            <span className="inline-flex items-center rounded-full bg-cream/95 text-ink px-4 py-1.5 text-[11px] md:text-[12px] font-semibold tracking-[0.22em] uppercase shadow-[0_8px_24px_-8px_rgba(0,0,0,0.55)] [text-shadow:none]">
              {promo.badge}
            </span>
            <h1 className="mt-6 font-serif text-[38px] sm:text-[48px] md:text-[68px] leading-[1.05] font-semibold text-cream">
              {promo.headline}
            </h1>
            <p className="mt-5 font-serif italic text-cream/95 text-[18px] md:text-[22px] leading-snug">
              {promo.subheadline}
            </p>
            <p className="mt-6 max-w-xl text-cream/90 text-[14.5px] md:text-[16px] leading-[1.9]">
              {promo.secondary}
            </p>
            <div className="mt-9">
              <Link
                to={stampedeHref as never}
                className="inline-flex items-center gap-2 rounded-full bg-cream text-ink px-8 py-4 text-[14px] font-semibold tracking-wide hover:bg-cream/90 transition shadow-[0_14px_38px_-12px_rgba(0,0,0,0.6)] [text-shadow:none]"
              >
                {promo.cta} <span aria-hidden>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============ TOUR CARDS ============ */}
      <section id="tour-cards" className="py-20 md:py-28">
        <div className="mx-auto max-w-[1240px] px-5 md:px-10">
          <p className="font-marker text-primary/80 text-sm tracking-[0.25em] uppercase">

            {c.cards.eyebrow}
          </p>
          <h2 className="mt-3 font-serif text-3xl md:text-[40px] text-ink font-semibold">
            {c.cards.h2}
          </h2>
          <p className="mt-4 max-w-2xl text-ink/70 text-[15px] leading-[1.95]">{c.cards.intro}</p>

          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {c.tours.map((t) => {
              const live = liveBySlug[t.slug];
              const img = live?.img ?? t.fallbackImg;
              const rawPrice =
                typeof live?.price === "string" && live.price ? live.price : t.priceFromLabel;
              const isSale = !!parseSalePrice(rawPrice);
              const priceLine = formatPrice(rawPrice, locale);
              return (
                <article
                  key={t.slug}
                  className="flex flex-col rounded-2xl border border-border/70 bg-cream overflow-hidden shadow-[0_20px_50px_-30px_rgba(60,80,70,0.35)] hover:border-primary/40 hover:shadow-[0_24px_60px_-25px_rgba(60,80,70,0.45)] transition"
                >
                  <div className="relative h-52 overflow-hidden">
                    <img src={img} alt={t.name} className="h-full w-full object-cover" />
                    <span className="absolute top-4 left-4 z-10 inline-flex items-center justify-center h-8 w-8 rounded-full bg-cream/95 text-primary font-serif text-[14px] font-semibold">
                      {t.letter}
                    </span>
                  </div>
                  <div className="flex flex-col flex-1 p-6">
                    <h3 className="font-serif text-[19px] text-ink font-semibold leading-snug">
                      {t.name}
                    </h3>
                    <p className="mt-3 text-[14px] text-ink/70 leading-[1.85] flex-1">{t.short}</p>
                    <div className="mt-5 pt-5 border-t border-border/60 flex items-baseline justify-between">
                      {isSale ? (
                        <SalePrice price={rawPrice} locale={locale} size="md" />
                      ) : (
                        <span className="font-serif text-primary text-[18px] font-semibold">
                          {priceLine}
                        </span>
                      )}
                    </div>
                    <Link
                      to={tourHref(t.slug) as never}
                      className="mt-4 w-full block text-center rounded-full bg-primary text-primary-foreground py-3 text-[13.5px] tracking-wide hover:bg-primary/90 transition"
                    >
                      {c.cards.bookCta}
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ COMPARE ============ */}
      <section id="compare" className="py-20 md:py-28 bg-paper/50">
        <div className="mx-auto max-w-[1240px] px-5 md:px-10">
          <p className="font-marker text-primary/80 text-sm tracking-[0.25em] uppercase">
            {c.compare.eyebrow}
          </p>
          <h2 className="mt-3 font-serif text-3xl md:text-[40px] text-ink font-semibold">
            {c.compare.h2}
          </h2>

          {/* Desktop table */}
          <div className="mt-10 hidden md:block overflow-hidden rounded-2xl border border-border/70 bg-cream">
            <table className="w-full text-[13.5px] text-ink/80">
              <thead className="bg-paper/60 text-[11.5px] tracking-[0.18em] uppercase text-ink/60">
                <tr>
                  {c.compare.headers.map((h) => (
                    <th key={h} className="text-left px-5 py-4 font-medium">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {c.tours.map((t, i) => (
                  <tr key={t.slug} className={i % 2 ? "bg-paper/30" : ""}>
                    <td className="px-5 py-5 font-serif text-ink font-semibold align-top max-w-[260px]">
                      <Link
                        to={tourHref(t.slug) as never}
                        className="hover:text-primary transition"
                      >
                        <span className="text-primary mr-1">{t.letter}.</span>
                        {t.name}
                      </Link>
                    </td>
                    <td className="px-5 py-5 align-top">{t.duration}</td>
                    <td className="px-5 py-5 align-top">{t.departure}</td>
                    <td className="px-5 py-5 align-top">{t.highlights}</td>
                    <td className="px-5 py-5 align-top text-primary font-semibold whitespace-nowrap">
                      {formatPrice(t.priceFromLabel, locale)}
                    </td>
                    <td className="px-5 py-5 align-top">{t.bestFor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="mt-8 grid gap-4 md:hidden">
            {c.tours.map((t) => (
              <Link
                key={t.slug}
                to={tourHref(t.slug) as never}
                className="block rounded-2xl border border-border/70 bg-cream p-5 hover:border-primary/40 transition"
              >
                <h3 className="font-serif text-[17px] text-ink font-semibold">
                  <span className="text-primary mr-1">{t.letter}.</span>
                  {t.name}
                </h3>
                <dl className="mt-3 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 text-[13px]">
                  <dt className="text-ink/55">{c.compare.mobileLabels.duration}</dt>
                  <dd className="text-ink/80">{t.duration}</dd>
                  <dt className="text-ink/55">{c.compare.mobileLabels.departure}</dt>
                  <dd className="text-ink/80">{t.departure}</dd>
                  <dt className="text-ink/55">{c.compare.mobileLabels.highlights}</dt>
                  <dd className="text-ink/80">{t.highlights}</dd>
                  <dt className="text-ink/55">{c.compare.mobileLabels.price}</dt>
                  <dd className="text-primary font-semibold">{formatPrice(t.priceFromLabel, locale)}</dd>
                  <dt className="text-ink/55">{c.compare.mobileLabels.bestFor}</dt>
                  <dd className="text-ink/80">{t.bestFor}</dd>
                </dl>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============ SUGGESTED COMBINATIONS ============ */}
      <section id="bundles" className="py-20 md:py-28">
        <div className="mx-auto max-w-[1240px] px-5 md:px-10">
          <p className="font-marker text-primary/80 text-sm tracking-[0.25em] uppercase">
            {c.bundles.eyebrow}
          </p>
          <h2 className="mt-3 font-serif text-3xl md:text-[40px] text-ink font-semibold">
            {c.bundles.h2}
          </h2>
          <p className="mt-4 max-w-2xl text-ink/70 text-[15px] leading-[1.95]">
            {c.bundles.intro}
          </p>

          <div className="mt-6 max-w-3xl rounded-2xl border border-primary/20 bg-cream/70 px-6 py-5">
            <p className="font-serif italic text-ink/80 text-[15.5px] leading-[1.85]">
              "{c.bundles.adCopy}"
            </p>
          </div>

          <div className="mt-10 grid md:grid-cols-2 gap-5">
            {c.bundles.items.map((b) => (
              <article
                key={b.name}
                className="flex flex-col rounded-2xl border border-border/70 bg-cream p-6 md:p-7 hover:border-primary/40 hover:shadow-[0_20px_50px_-30px_rgba(60,80,70,0.4)] transition"
              >
                <h3 className="font-serif text-[20px] text-ink font-semibold">{b.name}</h3>
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  {b.flow.map((step, i) => (
                    <span key={`${b.name}-${i}`} className="inline-flex items-center gap-2">
                      <span className="rounded-full bg-primary/10 border border-primary/25 text-primary px-3 py-1.5 text-[12px] tracking-wide whitespace-nowrap">
                        {step}
                      </span>
                      {i < b.flow.length - 1 && (
                        <span className="text-primary/60 text-lg" aria-hidden>
                          →
                        </span>
                      )}
                    </span>
                  ))}
                </div>
                <p className="mt-5 text-[14px] text-ink/70 leading-[1.9] flex-1">{b.tagline}</p>
                <Link
                  to={contactHref as never}
                  className="mt-6 self-start inline-flex items-center rounded-full border border-primary/30 text-primary px-5 py-2.5 text-[13.5px] tracking-wide hover:bg-primary/5 transition"
                >
                  {c.bundles.contactCta}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FINAL CTA ============ */}
      <section className="relative overflow-hidden py-24 md:py-32 bg-ink text-cream">
        <img
          src={LAKE_TOURS_HERO_IMG}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/75 via-ink/60 to-ink/80" />
        <div className="relative mx-auto max-w-[820px] px-5 md:px-10 text-center [text-shadow:0_2px_18px_rgba(0,0,0,0.6)]">
          <p className="font-marker text-cream text-[13px] tracking-[0.3em] uppercase">
            {c.finalCta.eyebrow}
          </p>
          <h2 className="mt-4 font-serif text-3xl md:text-[44px] font-semibold leading-[1.15] text-cream">
            {c.finalCta.h2}
          </h2>
          <p className="mt-5 text-cream/95 text-[15.5px] leading-[1.95] max-w-2xl mx-auto">
            {c.finalCta.p}
          </p>
          <div className="mt-8 flex flex-wrap gap-3 justify-center">
            <Link
              to={toursIndexHref as never}
              className="rounded-full bg-cream text-ink px-8 py-4 text-[14px] tracking-wide hover:bg-cream/90 transition"
            >
              {c.finalCta.browseCta}
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
