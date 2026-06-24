import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout } from "@/components/site/Layout";
import heroIcefield from "@/assets/tour-icefield.webp";
import bgMoraine from "@/assets/hero-bg-moraine.webp";
import destJasper from "@/assets/dest-jasper.jpg";
import heroBanff from "@/assets/hero-banff.jpg";
import heroMountains from "@/assets/hero-mountains.jpg";
import tourRockies from "@/assets/tour-rockies.webp";
import { useLocale, withLocale, type Locale } from "@/i18n/locale";
import { ChatSupportNote } from "@/components/site/ChatSupport";
import {
  getIcefieldsContent,
  type IcefieldsContent,
  type ProductId,
} from "@/content/icefields-i18n";

// ------------------------------------------------------------------
// Slugs + per-product hero images (route-overview card style)
// ------------------------------------------------------------------
const PRODUCT_TO_SLUG: Record<ProductId, string> = {
  P1: "banff-to-jasper-sightseeing-shuttle",
  P2A: "jasper-maligne-lake-spirit-island-day-tour",
  P2B: "jasper-to-banff-express-shuttle",
  P3A: "banff-to-jasper-express-shuttle",
  P3B: "jasper-medicine-lake-maligne-lake-half-day-tour",
  P4: "icefields-parkway-southbound-sightseeing-shuttle",
};

const PRODUCT_IMG: Record<ProductId, string> = {
  P1: heroBanff,
  P2A: bgMoraine,
  P2B: destJasper,
  P3A: heroMountains,
  P3B: tourRockies,
  P4: heroIcefield,
};

const productHref = (pid: ProductId, locale: Locale) =>
  withLocale(`/tours/${PRODUCT_TO_SLUG[pid]}`, locale);

// ------------------------------------------------------------------
// Which product runs on which day group
// ------------------------------------------------------------------
const FILTER_GROUPS: { key: FilterKey; labelKey: FilterLabelKey; ids: ProductId[] }[] = [
  { key: "all", labelKey: "all", ids: ["P1", "P3A", "P2A", "P3B", "P2B", "P4"] },
  { key: "mon-fri", labelKey: "monFri", ids: ["P1"] },
  { key: "tue-sat", labelKey: "tueSat", ids: ["P3A", "P2A", "P3B", "P2B"] },
  { key: "wed-sun", labelKey: "wedSun", ids: ["P4"] },
];

type FilterKey = "all" | "mon-fri" | "tue-sat" | "wed-sun";
type FilterLabelKey = "all" | "monFri" | "tueSat" | "wedSun";

// Locale labels for new copy introduced by the redesign
const I18N = {
  exploreCta: { en: "Explore the routes ↓", zh: "查看路線 ↓", ko: "노선 보기 ↓" } as Record<Locale, string>,
  viewAndBook: {
    en: "View route & book →",
    zh: "查看路線並預訂 →",
    ko: "노선 보기 & 예약 →",
  } as Record<Locale, string>,
  browseAll: {
    en: "Browse all tours",
    zh: "瀏覽所有行程",
    ko: "전체 투어 보기",
  } as Record<Locale, string>,
  addonsContact: {
    en: "Add-ons can be arranged when you book — contact us to add them to your reservation.",
    zh: "加購項目可於預訂時安排 — 歡迎聯絡我們將其加入您的訂單。",
    ko: "옵션은 예약 시 함께 진행할 수 있습니다 — 추가가 필요하시면 문의해 주세요.",
  } as Record<Locale, string>,
  overviewEyebrow: {
    en: "— Route overview",
    zh: "— 路線總覽",
    ko: "— 노선 개요",
  } as Record<Locale, string>,
  overviewHeading: {
    en: "All Shuttle Routes",
    zh: "所有接駁路線",
    ko: "전체 셔틀 노선",
  } as Record<Locale, string>,
  overviewIntro: {
    en: "Six routes across the Icefields Parkway corridor between Banff, Jasper and Maligne Lake. Pick the one that matches your travel day, then click through to the booking page.",
    zh: "班夫、賈斯珀與瑪琳湖之間共六條冰原大道路線。依出遊日挑選最合適的一條,點入即可前往預訂頁。",
    ko: "밴프, 재스퍼, 말린 호수를 잇는 6개 아이스필드 파크웨이 노선. 여행 요일에 맞는 노선을 선택해 예약 페이지로 이동하세요.",
  } as Record<Locale, string>,
} as const;

const tx = (key: keyof typeof I18N, locale: Locale) => I18N[key][locale] ?? I18N[key].en;

export const Route = createFileRoute("/icefields-parkway-jasper-banff-shuttle-tours")({
  head: () => {
    const c = getIcefieldsContent("en");
    return {
      meta: [
        { title: c.meta.title },
        { name: "description", content: c.meta.description },
        { property: "og:title", content: c.meta.ogTitle },
        { property: "og:description", content: c.meta.ogDescription },
        { property: "og:image", content: heroIcefield },
      ],
    };
  },
  component: IcefieldsShuttlePage,
});

/* ------------------------------------------------------------------
 * Page
 * ------------------------------------------------------------------ */
export function IcefieldsShuttlePage() {
  const locale = useLocale();
  const c = getIcefieldsContent(locale);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <SiteLayout>
      <Hero c={c} locale={locale} scrollTo={scrollTo} />
      <WhyDifferent c={c} />
      <AllRoutesOverview c={c} locale={locale} />
      <ComparisonTable c={c} locale={locale} />
      <AddOnsSummary c={c} locale={locale} />
      <BundlesSection c={c} locale={locale} />
      <FinalCTA c={c} locale={locale} />
      <section className="bg-paper/50 py-12">
        <div className="mx-auto max-w-[1240px] px-5 md:px-10">
          <ChatSupportNote />
        </div>
      </section>
    </SiteLayout>
  );
}

/* ------------------------------------------------------------------
 * Hero — full-width image, single CTA
 * ------------------------------------------------------------------ */
function Hero({
  c,
  locale,
  scrollTo,
}: {
  c: IcefieldsContent;
  locale: Locale;
  scrollTo: (id: string) => void;
}) {
  return (
    <section className="relative overflow-hidden bg-ink">
      <img
        src={heroIcefield}
        alt="Icefields Parkway and the Canadian Rockies"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/60 via-ink/35 to-ink/75" />
      <div className="relative mx-auto max-w-[1100px] px-5 md:px-10 py-28 md:py-40 text-center text-cream [text-shadow:0_2px_22px_rgba(0,0,0,0.7)]">
        <p className="font-marker text-cream/90 text-[13px] tracking-[0.3em] uppercase">
          {c.hero.eyebrow}
        </p>
        <h1 className="mt-5 font-serif text-cream text-[40px] md:text-[64px] leading-[1.05] font-semibold">
          {c.hero.h1}
        </h1>
        <p className="mt-7 mx-auto max-w-2xl text-cream/95 text-[15.5px] md:text-[17px] leading-[1.9]">
          {c.hero.sub}
        </p>
        <div className="mt-10">
          <button
            onClick={() => scrollTo("routes")}
            className="rounded-full bg-cream text-ink px-8 py-4 text-[14px] tracking-wide hover:bg-cream/90 transition shadow-[0_14px_38px_-12px_rgba(0,0,0,0.55)]"
          >
            {tx("exploreCta", locale)}
          </button>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------
 * Day Accent Badge
 * ------------------------------------------------------------------ */
function AccentBadge({
  accent,
  children,
}: {
  accent: "north" | "split" | "south";
  children: React.ReactNode;
}) {
  const cls =
    accent === "north"
      ? "bg-emerald-50 text-emerald-800 border-emerald-200"
      : accent === "south"
        ? "bg-amber-50 text-amber-800 border-amber-200"
        : "bg-sky-50 text-sky-800 border-sky-200";
  const dot =
    accent === "north" ? "bg-emerald-500" : accent === "south" ? "bg-amber-500" : "bg-sky-500";
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] tracking-[0.18em] uppercase ${cls}`}
    >
      <span className={`h-2 w-2 rounded-full ${dot}`} aria-hidden />
      {children}
    </span>
  );
}

/* ------------------------------------------------------------------
 * Shared Route Overview-style product card
 * ------------------------------------------------------------------ */
function ProductRouteCard({
  c,
  pid,
  locale,
}: {
  c: IcefieldsContent;
  pid: ProductId;
  locale: Locale;
}) {
  const p = c.products[pid];
  const f = c.finderV2;
  const priceText = p.childAvailable
    ? `$${p.adult} / $${p.child}`
    : `$${p.adult} ${c.compare.pp}`;
  return (
    <article className="flex flex-col rounded-2xl border border-border/70 bg-cream overflow-hidden shadow-[0_20px_50px_-30px_rgba(60,80,70,0.35)] hover:border-primary/40 hover:shadow-[0_24px_60px_-25px_rgba(60,80,70,0.45)] transition">
      <div className="relative h-48 overflow-hidden">
        <img src={PRODUCT_IMG[pid]} alt={p.name} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute top-4 left-4">
          <AccentBadge accent={p.accent}>{p.daysLabel}</AccentBadge>
        </div>
      </div>
      <div className="flex flex-col flex-1 p-6">
        <h3 className="font-serif text-[19px] text-ink font-semibold leading-snug">{p.name}</h3>
        <p className="mt-1 text-[12px] tracking-[0.2em] uppercase text-ink/55">{p.durationHrs}</p>
        <p className="mt-3 text-[14px] text-ink/70 leading-[1.85]">{p.bestFor}</p>
        <dl className="mt-5 space-y-2 text-[13px] text-ink/75 border-t border-border/60 pt-4">
          <Row k={c.detailed.direction} v={p.direction} />
          <Row k={c.detailed.time} v={p.time} />
          <Row k={f.durationLabel} v={p.durationHrs} />
          <Row k={c.detailed.baseFare} v={priceText} />
        </dl>
        <Link
          to={productHref(pid, locale) as never}
          className="mt-auto pt-6 w-full block text-center rounded-full bg-primary text-primary-foreground px-5 py-3 text-[13.5px] tracking-wide hover:bg-primary/90 transition"
        >
          {tx("viewAndBook", locale)}
        </Link>
      </div>
    </article>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between gap-3">
      <dt className="text-ink/55 shrink-0 max-w-[45%]">{k}</dt>
      <dd className="text-right">{v}</dd>
    </div>
  );
}

/* ------------------------------------------------------------------
 * Why This Route Is Different
 * ------------------------------------------------------------------ */
function WhyDifferent({ c }: { c: IcefieldsContent }) {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-[1100px] px-5 md:px-10">
        <p className="font-marker text-primary/80 text-sm tracking-[0.25em] uppercase">
          {c.why.eyebrow}
        </p>
        <h2 className="mt-3 font-serif text-3xl md:text-[40px] text-ink font-semibold leading-[1.15] max-w-3xl">
          {c.why.heading}
        </h2>
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {c.why.items.map((f, i) => (
            <div
              key={f.t}
              className="rounded-2xl border border-border/70 bg-cream p-6 hover:border-primary/40 transition"
            >
              <p className="font-marker text-primary/70 text-[12px] tracking-[0.2em]">0{i + 1}</p>
              <h3 className="mt-2 font-serif text-[18px] text-ink font-semibold">{f.t}</h3>
              <p className="mt-2 text-[14px] text-ink/65 leading-[1.85]">{f.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------
 * All Routes Overview — six cards + pill filter bar
 * ------------------------------------------------------------------ */
function AllRoutesOverview({ c, locale }: { c: IcefieldsContent; locale: Locale }) {
  const [activeFilter, setActiveFilter] = useState<FilterKey>("all");

  // Build filter label text using existing translations where available
  const filterLabel = (labelKey: FilterLabelKey) => {
    if (labelKey === "all") {
      return ({ en: "All", zh: "全部", ko: "전체" } as Record<Locale, string>)[locale] ?? "All";
    }
    return c.finderV2.groupLabels[labelKey];
  };

  const visibleIds = FILTER_GROUPS.find((g) => g.key === activeFilter)!.ids;

  return (
    <section id="routes" className="py-20 md:py-24 bg-paper/40">
      <div className="mx-auto max-w-[1240px] px-5 md:px-10">
        <p className="font-marker text-primary/80 text-sm tracking-[0.25em] uppercase">
          {tx("overviewEyebrow", locale)}
        </p>
        <h2 className="mt-3 font-serif text-3xl md:text-[40px] text-ink font-semibold">
          {tx("overviewHeading", locale)}
        </h2>
        <p className="mt-4 max-w-3xl text-[15px] text-ink/70 leading-[1.9]">
          {tx("overviewIntro", locale)}
        </p>

        <div className="mt-8 flex flex-wrap gap-2">
          {FILTER_GROUPS.map((g) => {
            const active = g.key === activeFilter;
            return (
              <button
                key={g.key}
                onClick={() => setActiveFilter(g.key)}
                className={`rounded-full px-5 py-2.5 text-[13px] tracking-wide transition border ${
                  active
                    ? "bg-ink text-cream border-ink"
                    : "bg-cream text-ink/70 border-border hover:border-primary/40"
                }`}
              >
                {filterLabel(g.labelKey)}
              </button>
            );
          })}
        </div>

        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleIds.map((pid) => (
            <ProductRouteCard key={pid} c={c} pid={pid} locale={locale} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------
 * Comparison Table
 * ------------------------------------------------------------------ */
function ComparisonTable({ c, locale }: { c: IcefieldsContent; locale: Locale }) {
  const bookLabel = tx("viewAndBook", locale);
  return (
    <section id="compare" className="py-20 md:py-24">
      <div className="mx-auto max-w-[1240px] px-5 md:px-10">
        <p className="font-marker text-primary/80 text-sm tracking-[0.25em] uppercase">
          {c.compare.eyebrow}
        </p>
        <h2 className="mt-3 font-serif text-3xl md:text-[40px] text-ink font-semibold">
          {c.compare.heading}
        </h2>

        <div className="mt-10 hidden md:block overflow-hidden rounded-2xl border border-border/70 bg-cream">
          <table className="w-full text-[13.5px] text-ink/80">
            <thead className="bg-paper/60 text-[11.5px] tracking-[0.18em] uppercase text-ink/60">
              <tr>
                {c.compare.headers.map((h) => (
                  <th key={h} className="text-left px-4 py-4 font-medium">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {c.compare.rows.map(({ id, addons }, i) => {
                const p = c.products[id];
                return (
                  <tr key={id} className={i % 2 ? "bg-paper/30" : ""}>
                    <td className="px-4 py-4 font-serif text-ink font-semibold align-top max-w-[220px]">
                      <div>{p.name}</div>
                      <Link
                        to={productHref(id, locale) as never}
                        className="mt-2 inline-block text-[12px] text-primary hover:text-primary/80 underline underline-offset-2 font-sans font-normal"
                      >
                        {bookLabel}
                      </Link>
                    </td>
                    <td className="px-4 py-4 align-top">{p.daysLabel}</td>
                    <td className="px-4 py-4 align-top">{p.direction}</td>
                    <td className="px-4 py-4 align-top">{p.time}</td>
                    <td className="px-4 py-4 align-top text-primary font-semibold">
                      {p.childAvailable
                        ? `$${p.adult} / $${p.child}`
                        : `$${p.adult} ${c.compare.pp}`}
                    </td>
                    <td className="px-4 py-4 align-top">{addons}</td>
                    <td className="px-4 py-4 align-top">{p.bestFor}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="mt-8 grid gap-4 md:hidden">
          {c.compare.rows.map(({ id, addons }) => {
            const p = c.products[id];
            return (
              <div key={id} className="rounded-2xl border border-border/70 bg-cream p-5">
                <AccentBadge accent={p.accent}>{p.daysLabel}</AccentBadge>
                <h3 className="mt-2 font-serif text-[16px] text-ink font-semibold">{p.name}</h3>
                <div className="mt-3 grid grid-cols-2 gap-y-2 text-[13px] text-ink/75">
                  <span className="text-ink/55">{c.detailed.direction}</span>
                  <span>{p.direction}</span>
                  <span className="text-ink/55">{c.detailed.time}</span>
                  <span>{p.time}</span>
                  <span className="text-ink/55">{c.detailed.baseFare}</span>
                  <span className="text-primary font-semibold">
                    {p.childAvailable
                      ? `$${p.adult} / $${p.child}`
                      : `$${p.adult} ${c.compare.pp}`}
                  </span>
                  <span className="text-ink/55">{c.detailed.addOnsLabel}</span>
                  <span>{addons}</span>
                  <span className="text-ink/55">{c.compare.headers[6]}</span>
                  <span>{p.bestFor}</span>
                </div>
                <Link
                  to={productHref(id, locale) as never}
                  className="mt-4 w-full block text-center rounded-full bg-primary text-primary-foreground py-2.5 text-[13px] tracking-wide hover:bg-primary/90 transition"
                >
                  {bookLabel}
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------
 * Add-ons summary
 * ------------------------------------------------------------------ */
function AddOnsSummary({ c, locale }: { c: IcefieldsContent; locale: Locale }) {
  return (
    <section className="py-20 md:py-24 bg-paper/40">
      <div className="mx-auto max-w-[1100px] px-5 md:px-10">
        <p className="font-marker text-primary/80 text-sm tracking-[0.25em] uppercase">
          {c.addonsSection.eyebrow}
        </p>
        <h2 className="mt-3 font-serif text-3xl md:text-[40px] text-ink font-semibold">
          {c.addonsSection.heading}
        </h2>
        <div className="mt-10 grid md:grid-cols-3 gap-5">
          {c.addonsSection.cards.map((card) => (
            <div key={card.t} className="rounded-2xl border border-border/70 bg-cream p-6">
              <h3 className="font-serif text-[18px] text-ink font-semibold">{card.t}</h3>
              <p className="mt-2 text-[13px] text-ink/60">{card.on}</p>
              <p className="mt-4 font-serif text-primary text-[18px] font-semibold">{card.price}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 text-[14px] text-ink/70 italic leading-[1.85]">
          {tx("addonsContact", locale)}
        </p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------
 * Suggested Combinations
 * ------------------------------------------------------------------ */
function BundlesSection({ c, locale }: { c: IcefieldsContent; locale: Locale }) {
  return (
    <section id="bundles" className="py-20 md:py-28">
      <div className="mx-auto max-w-[1240px] px-5 md:px-10">
        <p className="font-marker text-primary/80 text-sm tracking-[0.25em] uppercase">
          {c.bundles.eyebrow}
        </p>
        <h2 className="mt-3 font-serif text-3xl md:text-[40px] text-ink font-semibold">
          {c.bundles.heading}
        </h2>
        <p className="mt-4 max-w-2xl text-ink/70 text-[15px] leading-[1.95]">{c.bundles.intro}</p>

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
                to={withLocale("/contact", locale) as never}
                className="mt-6 self-start inline-flex items-center rounded-full border border-primary/30 text-primary px-5 py-2.5 text-[13.5px] tracking-wide hover:bg-primary/5 transition"
              >
                {c.bundles.contactCta}
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------
 * Final CTA → Browse all tours
 * ------------------------------------------------------------------ */
function FinalCTA({ c, locale }: { c: IcefieldsContent; locale: Locale }) {
  return (
    <section className="relative overflow-hidden bg-ink">
      <img src={heroMountains} alt="" className="absolute inset-0 h-full w-full object-cover opacity-50" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/65 to-ink/40" />
      <div className="relative mx-auto max-w-[1100px] px-5 md:px-10 py-20 md:py-28 text-cream [text-shadow:0_2px_22px_rgba(0,0,0,0.7)]">
        <p className="font-marker text-cream/80 text-[12px] tracking-[0.3em] uppercase">
          {c.finalCta.eyebrow}
        </p>
        <h2 className="mt-3 font-serif text-cream text-3xl md:text-[44px] font-semibold leading-[1.15] max-w-3xl">
          {c.finalCta.h2}
        </h2>
        <p className="mt-5 max-w-2xl text-cream/90 text-[15.5px] leading-[1.95]">
          {c.finalCta.sub}
        </p>
        <div className="mt-7">
          <Link
            to={withLocale("/tours", locale) as never}
            className="inline-flex items-center rounded-full bg-cream text-ink px-7 py-3.5 text-[14px] tracking-wide hover:bg-cream/90 transition"
          >
            {tx("browseAll", locale)}
          </Link>
        </div>
      </div>
    </section>
  );
}
