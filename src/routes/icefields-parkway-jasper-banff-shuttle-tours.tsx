import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SiteLayout } from "@/components/site/Layout";
import { TourRouteSection } from "@/components/site/TourRouteSection";
import heroIcefield from "@/assets/tour-icefield.webp";
import bgMoraine from "@/assets/hero-bg-moraine.webp";
import destJasper from "@/assets/dest-jasper.jpg";
import heroBanff from "@/assets/hero-banff.jpg";
import heroMountains from "@/assets/hero-mountains.jpg";
import tourRockies from "@/assets/tour-rockies.webp";
import { useLocale } from "@/i18n/locale";
import {
  getIcefieldsContent,
  type IcefieldsContent,
  type ProductId,
  type AddOnId,
  type Weekday,
} from "@/content/icefields-i18n";

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
 * Constants (locale-independent)
 * ------------------------------------------------------------------ */

const PRODUCTS_BY_DAY: Record<Weekday, ProductId[]> = {
  Mon: ["P1"],
  Tue: ["P2A", "P2B", "P3A", "P3B"],
  Wed: ["P4"],
  Thu: [],
  Fri: ["P1"],
  Sat: ["P2A", "P2B", "P3A", "P3B"],
  Sun: ["P4"],
};

const WEEKEND: Weekday[] = ["Fri", "Sat", "Sun"];
const SELECTABLE_DAYS: Weekday[] = ["Mon", "Tue", "Wed", "Fri", "Sat", "Sun"];

function weekdayFromISO(iso: string): Weekday | null {
  if (!iso) return null;
  const d = new Date(iso + "T00:00:00");
  if (isNaN(d.getTime())) return null;
  const map: Weekday[] = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return map[d.getDay()];
}

const fmt = (n: number) => `$${n.toFixed(2)}`;

/* ------------------------------------------------------------------
 * Page
 * ------------------------------------------------------------------ */

export function IcefieldsShuttlePage() {
  const locale = useLocale();
  const c = getIcefieldsContent(locale);
  const [selectedProduct, setSelectedProduct] = useState<ProductId>("P1");

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  const selectAndScroll = (pid: ProductId) => {
    setSelectedProduct(pid);
    // Defer to next frame so the timeline re-renders before we scroll.
    requestAnimationFrame(() => scrollTo("detailed-route"));
  };

  return (
    <SiteLayout>
      <Hero c={c} scrollTo={scrollTo} />
      <QuickRouteFinder
        c={c}
        selectedProduct={selectedProduct}
        onSelect={selectAndScroll}
      />
      <WhyDifferent c={c} />
      <RouteOverview c={c} />
      <DetailedRoutes c={c} selectedProduct={selectedProduct} />
      <BookingEstimator c={c} />
      <ComparisonTable c={c} />
      <AddOnsSection c={c} />
      <PickupNotes c={c} />
      <IncludedSection c={c} />
      <TravelNotes c={c} />
      <BookingTerms c={c} />
      <FinalCTA c={c} scrollTo={scrollTo} />
    </SiteLayout>
  );
}

/* ------------------------------------------------------------------
 * Hero
 * ------------------------------------------------------------------ */

function Hero({ c, scrollTo }: { c: IcefieldsContent; scrollTo: (id: string) => void }) {
  return (
    <section className="relative overflow-hidden bg-ink">
      <img
        src={heroIcefield}
        alt="Icefields Parkway and the Canadian Rockies"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/75 via-ink/35 to-ink/10" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-ink/40" />

      <div className="relative mx-auto max-w-[1240px] px-5 md:px-10 py-20 md:py-28 grid lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-7 text-cream [text-shadow:0_2px_22px_rgba(0,0,0,0.85),_0_1px_3px_rgba(0,0,0,0.6)]">
          <p className="font-marker text-cream text-[13px] tracking-[0.3em] uppercase">
            {c.hero.eyebrow}
          </p>
          <h1 className="mt-4 font-serif text-cream text-[36px] md:text-[54px] leading-[1.05] font-semibold">
            {c.hero.h1}
          </h1>
          <p className="mt-5 max-w-xl text-cream/95 text-[15.5px] leading-[1.95]">{c.hero.sub}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <button
              onClick={() => scrollTo("reserve")}
              className="rounded-full bg-cream text-ink px-7 py-3.5 text-[14px] tracking-wide hover:bg-cream/90 transition shadow-[0_10px_30px_-10px_rgba(0,0,0,0.4)]"
            >
              {c.hero.ctaReserve}
            </button>
            <button
              onClick={() => scrollTo("compare")}
              className="rounded-full border border-cream/70 text-cream px-7 py-3.5 text-[14px] tracking-wide hover:bg-cream/15 transition backdrop-blur-sm"
            >
              {c.hero.ctaCompare}
            </button>
          </div>
          <div className="mt-9 flex flex-wrap gap-x-5 gap-y-2 text-[12px] text-cream/90 tracking-[0.15em] uppercase">
            {c.hero.badges.map((b) => (
              <span key={b} className="inline-flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-cream/80" /> {b}
              </span>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="rounded-2xl bg-cream/95 backdrop-blur p-6 md:p-7 border border-cream/40 shadow-[0_30px_70px_-20px_rgba(0,0,0,0.45)]">
            <p className="font-marker text-primary text-[12px] tracking-[0.25em] uppercase">
              {c.hero.sideEyebrow}
            </p>
            <h3 className="mt-2 font-serif text-[22px] text-ink font-semibold">{c.hero.sideTitle}</h3>
            <div className="mt-4 space-y-2">
              {c.hero.cards.map((card) => (
                <button
                  key={card.day}
                  onClick={() => scrollTo("finder")}
                  className="w-full text-left rounded-xl border border-border bg-cream hover:border-primary/40 px-4 py-3 transition"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-[11px] tracking-[0.2em] uppercase text-ink/55">{card.day}</p>
                      <p className="mt-0.5 font-serif text-[15px] text-ink font-semibold">{card.title}</p>
                    </div>
                    <DayDot accent={card.accent} />
                  </div>
                  <p className="mt-1 text-[12.5px] text-ink/65">{card.from}</p>
                </button>
              ))}
            </div>
            <button
              onClick={() => scrollTo("reserve")}
              className="mt-5 w-full rounded-full bg-primary text-primary-foreground py-3 text-[14px] tracking-wide hover:bg-primary/90 transition"
            >
              {c.hero.sideCtaContinue}
            </button>
            <p className="mt-3 text-[11px] text-ink/55 text-center leading-relaxed">{c.hero.weekendNote}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function DayDot({ accent }: { accent: "north" | "split" | "south" }) {
  const cls =
    accent === "north" ? "bg-emerald-500" : accent === "south" ? "bg-amber-500" : "bg-sky-500";
  return <span className={`h-2.5 w-2.5 rounded-full ${cls}`} aria-hidden />;
}

function AccentBadge({ accent, children }: { accent: "north" | "split" | "south"; children: React.ReactNode }) {
  const cls =
    accent === "north"
      ? "bg-emerald-50 text-emerald-800 border-emerald-200"
      : accent === "south"
        ? "bg-amber-50 text-amber-800 border-amber-200"
        : "bg-sky-50 text-sky-800 border-sky-200";
  return (
    <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] tracking-[0.18em] uppercase ${cls}`}>
      <DayDot accent={accent} />
      {children}
    </span>
  );
}

/* ------------------------------------------------------------------
 * Quick Route Finder
 * ------------------------------------------------------------------ */

function QuickRouteFinder({ c }: { c: IcefieldsContent }) {
  const [day, setDay] = useState<Weekday>("Mon");
  const productIds = PRODUCTS_BY_DAY[day];

  return (
    <section id="finder" className="py-20 md:py-24 bg-paper/50">
      <div className="mx-auto max-w-[1200px] px-5 md:px-10">
        <p className="font-marker text-primary/80 text-sm tracking-[0.25em] uppercase">{c.finder.eyebrow}</p>
        <h2 className="mt-3 font-serif text-3xl md:text-[40px] text-ink font-semibold">
          {c.finder.heading}
        </h2>

        <div className="mt-8 flex flex-wrap gap-2">
          {SELECTABLE_DAYS.map((d) => (
            <button
              key={d}
              onClick={() => setDay(d)}
              className={`rounded-full px-5 py-2.5 text-[13px] tracking-wide transition border ${
                day === d
                  ? "bg-ink text-cream border-ink"
                  : "bg-cream text-ink/70 border-border hover:border-primary/40"
              }`}
            >
              {c.weekdayLabel[d]}
            </button>
          ))}
          <button
            onClick={() => setDay("Thu")}
            className={`rounded-full px-5 py-2.5 text-[13px] tracking-wide transition border ${
              day === "Thu"
                ? "bg-ink text-cream border-ink"
                : "bg-cream text-ink/45 border-dashed border-border hover:border-primary/30"
            }`}
          >
            {c.weekdayLabel.Thu}
          </button>
        </div>

        <div className="mt-8">
          {productIds.length === 0 ? (
            <div className="rounded-2xl border border-border/70 bg-cream p-6 text-ink/70 text-[14.5px] leading-[1.9]">
              {c.finder.thursdayEmpty}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {productIds.map((pid) => {
                const p = c.products[pid];
                return (
                  <article key={pid} className="rounded-2xl border border-border/70 bg-cream p-6 flex flex-col">
                    <AccentBadge accent={p.accent}>{p.daysLabel}</AccentBadge>
                    <h3 className="mt-3 font-serif text-[19px] text-ink font-semibold leading-snug">
                      {p.name}
                    </h3>
                    <p className="mt-2 text-[13.5px] text-ink/65 leading-[1.85]">{p.short}</p>

                    <dl className="mt-4 space-y-2 text-[13px] text-ink/75 border-t border-border/60 pt-4">
                      <Row k={c.detailed.direction} v={p.direction} />
                      <Row k={c.detailed.time} v={p.time} />
                      <Row k={c.detailed.duration} v={p.durationHrs} />
                      <Row
                        k={c.detailed.baseFare}
                        v={p.childAvailable ? `$${p.adult} / $${p.child}` : `$${p.adult} ${c.compare.pp}`}
                      />
                    </dl>

                    {p.addOns.length > 0 && (
                      <div className="mt-4 text-[12px] text-ink/55 tracking-[0.15em] uppercase">
                        {c.finder.optional}&nbsp;
                        <span className="text-ink/70 normal-case tracking-normal">
                          {Array.from(
                            new Set(
                              p.addOns.map((a) =>
                                a === "HINTON_ONE" || a === "HINTON_ROUND" ? c.finder.hintonExt : c.addOns[a].name,
                              ),
                            ),
                          ).join(" · ")}
                        </span>
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-ink/55">{k}</dt>
      <dd className="text-right">{v}</dd>
    </div>
  );
}

/* ------------------------------------------------------------------
 * Why / Overview / Detailed
 * ------------------------------------------------------------------ */

function WhyDifferent({ c }: { c: IcefieldsContent }) {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-[1100px] px-5 md:px-10">
        <p className="font-marker text-primary/80 text-sm tracking-[0.25em] uppercase">{c.why.eyebrow}</p>
        <h2 className="mt-3 font-serif text-3xl md:text-[40px] text-ink font-semibold leading-[1.15] max-w-3xl">
          {c.why.heading}
        </h2>
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {c.why.items.map((f, i) => (
            <div key={f.t} className="rounded-2xl border border-border/70 bg-cream p-6 hover:border-primary/40 transition">
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

function RouteOverview({ c }: { c: IcefieldsContent }) {
  const images = [heroBanff, destJasper, bgMoraine];
  return (
    <section className="py-20 md:py-24 bg-paper/40">
      <div className="mx-auto max-w-[1240px] px-5 md:px-10">
        <p className="font-marker text-primary/80 text-sm tracking-[0.25em] uppercase">{c.overview.eyebrow}</p>
        <h2 className="mt-3 font-serif text-3xl md:text-[40px] text-ink font-semibold">{c.overview.heading}</h2>
        <div className="mt-10 grid lg:grid-cols-3 gap-6">
          {c.overview.groups.map((g, i) => (
            <article key={g.title} className="flex flex-col rounded-2xl border border-border/70 bg-cream overflow-hidden shadow-[0_20px_50px_-30px_rgba(60,80,70,0.35)]">
              <div className="relative h-48 overflow-hidden">
                <img src={images[i]} alt={g.title} className="absolute inset-0 h-full w-full object-cover" />
                <div className="absolute top-4 left-4">
                  <AccentBadge accent={g.accent}>{g.day}</AccentBadge>
                </div>
              </div>
              <div className="flex flex-col flex-1 p-6">
                <h3 className="font-serif text-[20px] text-ink font-semibold leading-snug">{g.title}</h3>
                <p className="mt-1 text-[12px] tracking-[0.2em] uppercase text-ink/55">{g.dur}</p>
                <p className="mt-3 text-[14px] text-ink/70 leading-[1.85]">{g.bestFor}</p>
                <dl className="mt-5 space-y-2 text-[13px] text-ink/75 border-t border-border/60 pt-4">
                  {g.lines.map(([k, v]) => (
                    <div key={k} className="flex justify-between gap-3">
                      <dt className="text-ink/55 shrink-0 max-w-[45%]">{k}</dt>
                      <dd className="text-right">{v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function DetailedRoutes({ c }: { c: IcefieldsContent }) {
  const ids: ProductId[] = ["P1", "P2A", "P2B", "P3A", "P3B", "P4"];

  const parseStop = (line: string) => {
    // Split on common dash separators used across EN/ZH/KO content.
    const m = line.match(/^\s*([^—\-–]+?)\s*[—\-–]\s*(.+)$/);
    if (m) {
      const left = m[1].trim();
      const right = m[2].trim();
      // Treat left as time if it contains digits or a colon/dash range.
      const looksLikeTime = /\d/.test(left);
      return looksLikeTime
        ? { time: left, name: right }
        : { time: undefined, name: line.trim() };
    }
    return { time: undefined, name: line.trim() };
  };

  const days = ids.map((pid) => {
    const p = c.products[pid];
    return {
      dayLabel: p.daysLabel,
      title: p.name,
      description: p.bestFor,
      accent: p.accent,
      stops: p.schedule.map((s, i) => {
        const { time, name } = parseStop(s);
        return {
          sequence: String(i + 1),
          time,
          name,
        };
      }),
    };
  });

  return (
    <TourRouteSection
      id="detailed-route"
      copy={c.routeSection}
      days={days}
      highlights={c.routeSection.highlights}
    />
  );
}


/* ------------------------------------------------------------------
 * Booking Estimator
 * ------------------------------------------------------------------ */

type Selection = { productId: ProductId; addOns: Partial<Record<AddOnId, boolean>> };

function BookingEstimator({ c }: { c: IcefieldsContent }) {
  const [date, setDate] = useState<string>("");
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [pickup, setPickup] = useState(c.pickups[0]);
  const [dropoff, setDropoff] = useState(c.dropoffs[0]);
  const [selections, setSelections] = useState<Record<ProductId, Selection | undefined>>({} as any);

  const weekday = weekdayFromISO(date);
  const availableIds = weekday ? PRODUCTS_BY_DAY[weekday] : [];
  const allowMulti = weekday === "Tue" || weekday === "Sat";
  const isWeekend = weekday ? WEEKEND.includes(weekday) : false;

  const selectedList = availableIds.map((id) => selections[id]).filter((s): s is Selection => !!s);

  const directionalWarning = useMemo(() => {
    const dirs = selectedList.map((s) => c.products[s.productId].direction);
    const hasNorth = dirs.some((d) => /Banff\s*→|밴프\s*→|班夫\s*→/.test(d));
    const hasSouth = dirs.some((d) => /Jasper\s*→\s*Banff|재스퍼\s*→\s*밴프|賈斯珀\s*→\s*班夫/.test(d));
    return hasNorth && hasSouth;
  }, [selectedList, c.products]);

  const comboLabel = useMemo(() => {
    const ids = selectedList.map((s) => s.productId).sort();
    if (ids.length === 2 && ids.includes("P2A") && ids.includes("P2B")) return c.reserve.combo2;
    if (ids.length === 2 && ids.includes("P3A") && ids.includes("P3B")) return c.reserve.combo3;
    return null;
  }, [selectedList, c.reserve.combo2, c.reserve.combo3]);

  const toggleProduct = (id: ProductId) => {
    setSelections((prev) => {
      const exists = !!prev[id];
      if (exists) {
        const next = { ...prev };
        delete next[id];
        return next;
      }
      if (!allowMulti) {
        const next: Record<ProductId, Selection | undefined> = {} as any;
        next[id] = { productId: id, addOns: {} };
        return next;
      }
      return { ...prev, [id]: { productId: id, addOns: {} } };
    });
  };

  const toggleAddOn = (pid: ProductId, aid: AddOnId) => {
    setSelections((prev) => {
      const sel = prev[pid];
      if (!sel) return prev;
      const cur = !!sel.addOns[aid];
      const nextAdds = { ...sel.addOns, [aid]: !cur };
      if (!cur && aid === "HINTON_ONE") nextAdds.HINTON_ROUND = false;
      if (!cur && aid === "HINTON_ROUND") nextAdds.HINTON_ONE = false;
      return { ...prev, [pid]: { ...sel, addOns: nextAdds } };
    });
  };

  const lineItems: { label: string; amount: number }[] = [];
  let subtotal = 0;

  selectedList.forEach((s) => {
    const p = c.products[s.productId];
    const adultBase = p.adult * adults;
    const childBase = p.childAvailable ? p.child * children : p.adult * children;
    const baseTotal = adultBase + childBase;
    lineItems.push({
      label: `${p.name} — ${c.reserve.baseSuffix} (${adults} ${c.reserve.adults}${children ? `, ${children} ${c.reserve.children}` : ""})`,
      amount: baseTotal,
    });
    subtotal += baseTotal;

    if (isWeekend) {
      const surcharge = 20 * (adults + children);
      lineItems.push({ label: `${p.name} — ${c.reserve.weekendSurcharge}`, amount: surcharge });
      subtotal += surcharge;
    }

    p.addOns.forEach((aid) => {
      if (!s.addOns[aid]) return;
      const a = c.addOns[aid];
      const amount = a.perPerson ? a.adult * (adults + children) : a.adult * adults + a.child * children;
      lineItems.push({ label: `${p.name} — ${a.name}`, amount });
      subtotal += amount;
    });
  });

  const gst = +(subtotal * 0.05).toFixed(2);
  const total = +(subtotal + gst).toFixed(2);

  return (
    <section id="reserve" className="py-20 md:py-28 bg-paper/50">
      <div className="mx-auto max-w-[1240px] px-5 md:px-10">
        <p className="font-marker text-primary/80 text-sm tracking-[0.25em] uppercase">{c.reserve.eyebrow}</p>
        <h2 className="mt-3 font-serif text-3xl md:text-[40px] text-ink font-semibold">{c.reserve.heading}</h2>
        <p className="mt-4 max-w-2xl text-ink/70 text-[15px] leading-[1.95]">{c.reserve.intro}</p>

        <div className="mt-10 grid lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3 rounded-2xl bg-cream border border-border/70 p-6 md:p-8 space-y-6">
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label={c.reserve.departureDate}>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => {
                    setDate(e.target.value);
                    setSelections({} as any);
                  }}
                  className="w-full rounded-md border border-border bg-cream px-3 py-2.5 text-[14px] text-ink"
                />
                {weekday && (
                  <p className="mt-1.5 text-[12px] text-ink/55">
                    {c.reserve.detected} {c.weekdayLabel[weekday]}
                    {isWeekend ? c.reserve.weekendApplies : ""}
                  </p>
                )}
              </Field>
              <Field label={c.reserve.guests}>
                <div className="flex gap-3">
                  <CounterInput label={c.reserve.adults} value={adults} setValue={setAdults} min={1} />
                  <CounterInput label={c.reserve.children} value={children} setValue={setChildren} min={0} />
                </div>
              </Field>
              <Field label={c.reserve.pickupLoc}>
                <select
                  value={pickup}
                  onChange={(e) => setPickup(e.target.value)}
                  className="w-full rounded-md border border-border bg-cream px-3 py-2.5 text-[14px] text-ink"
                >
                  {c.pickups.map((p) => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </Field>
              <Field label={c.reserve.dropoffLoc}>
                <select
                  value={dropoff}
                  onChange={(e) => setDropoff(e.target.value)}
                  className="w-full rounded-md border border-border bg-cream px-3 py-2.5 text-[14px] text-ink"
                >
                  {c.dropoffs.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </Field>
            </div>

            <div>
              <p className="text-[11px] tracking-[0.2em] uppercase text-ink/55">{c.reserve.availableProducts}</p>
              {!date && (
                <div className="mt-3 rounded-xl border border-dashed border-border bg-paper/40 p-5 text-[14px] text-ink/60">
                  {c.reserve.pickDate}
                </div>
              )}
              {date && weekday === "Thu" && (
                <div className="mt-3 rounded-xl border border-amber-200 bg-amber-50 p-5 text-[14px] text-amber-900 leading-[1.8]">
                  {c.reserve.thursdayWarn}
                </div>
              )}
              {date && availableIds.length > 0 && (
                <div className="mt-3 space-y-3">
                  {availableIds.map((pid) => {
                    const p = c.products[pid];
                    const sel = selections[pid];
                    return (
                      <div key={pid} className={`rounded-xl border p-4 transition ${sel ? "border-primary bg-primary/5" : "border-border bg-cream"}`}>
                        <label className="flex items-start gap-3 cursor-pointer">
                          <input type="checkbox" checked={!!sel} onChange={() => toggleProduct(pid)} className="mt-1" />
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="font-serif text-[15px] text-ink font-semibold">{p.name}</span>
                              <AccentBadge accent={p.accent}>{p.daysLabel}</AccentBadge>
                            </div>
                            <p className="mt-1 text-[12.5px] text-ink/60">
                              {p.direction} · {p.time} ·{" "}
                              {p.childAvailable ? `$${p.adult} / $${p.child}` : `$${p.adult} ${c.reserve.perPerson}`}
                            </p>
                          </div>
                        </label>

                        {sel && p.addOns.length > 0 && (
                          <div className="mt-4 ml-7 space-y-2">
                            <p className="text-[11px] tracking-[0.2em] uppercase text-ink/55">{c.reserve.addOnsLabel}</p>
                            {p.addOns.map((aid) => {
                              const a = c.addOns[aid];
                              return (
                                <label key={aid} className="flex items-center gap-2 text-[13.5px] text-ink/75">
                                  <input type="checkbox" checked={!!sel.addOns[aid]} onChange={() => toggleAddOn(pid, aid)} />
                                  <span>{a.name}</span>
                                  <span className="text-ink/50">— {a.label}</span>
                                </label>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                  {!allowMulti && availableIds.length > 1 && (
                    <p className="text-[12px] text-ink/55">{c.reserve.singlePerBooking}</p>
                  )}
                  {allowMulti && <p className="text-[12px] text-ink/55">{c.reserve.multiAllowed}</p>}
                </div>
              )}
            </div>

            {comboLabel && (
              <div className="rounded-xl border border-primary/30 bg-primary/5 p-4 text-[13.5px] text-ink/80">{comboLabel}</div>
            )}
            {directionalWarning && (
              <div className="rounded-xl border border-amber-300 bg-amber-50 p-4 text-[13.5px] text-amber-900">{c.reserve.directionWarn}</div>
            )}
          </div>

          <div className="lg:col-span-2">
            <div className="lg:sticky lg:top-6 rounded-2xl bg-ink text-cream p-6 md:p-7 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.45)]">
              <p className="font-marker text-cream/70 text-[11px] tracking-[0.25em] uppercase">{c.reserve.estimatedTotal}</p>
              <h3 className="mt-2 font-serif text-cream text-[22px] font-semibold">{c.reserve.orderSummary}</h3>

              <dl className="mt-5 space-y-2 text-[13px] text-cream/85 border-t border-cream/15 pt-4">
                <Row2 k={c.reserve.date} v={date || "—"} />
                <Row2 k={c.reserve.day} v={weekday ? c.weekdayLabel[weekday] : "—"} />
                <Row2 k={c.reserve.adults} v={String(adults)} />
                <Row2 k={c.reserve.children} v={String(children)} />
                <Row2 k={c.reserve.pickup} v={pickup} />
                <Row2 k={c.reserve.dropoff} v={dropoff} />
              </dl>

              <div className="mt-5 border-t border-cream/15 pt-4 space-y-2 text-[13px]">
                {lineItems.length === 0 ? (
                  <p className="text-cream/60">{c.reserve.noSelection}</p>
                ) : (
                  lineItems.map((li, i) => (
                    <div key={i} className="flex justify-between gap-3">
                      <span className="text-cream/80">{li.label}</span>
                      <span className="font-medium">{fmt(li.amount)}</span>
                    </div>
                  ))
                )}
              </div>

              <div className="mt-5 border-t border-cream/15 pt-4 space-y-1.5 text-[14px]">
                <div className="flex justify-between">
                  <span className="text-cream/70">{c.reserve.subtotal}</span>
                  <span>{fmt(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-cream/70">{c.reserve.gst}</span>
                  <span>{fmt(gst)}</span>
                </div>
                <div className="flex justify-between font-serif text-[20px] font-semibold pt-2">
                  <span>{c.reserve.estimatedTotalRow}</span>
                  <span>{fmt(total)}</span>
                </div>
              </div>

              <button
                disabled={selectedList.length === 0 || !date}
                className="mt-6 w-full rounded-full bg-cream text-ink py-3 text-[14px] tracking-wide hover:bg-cream/90 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {c.reserve.continueToBooking}
              </button>
              <p className="mt-3 text-[11.5px] text-cream/60 leading-relaxed">{c.reserve.finalNote}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-[11px] tracking-[0.2em] uppercase text-ink/55">{label}</span>
      <div className="mt-1.5">{children}</div>
    </label>
  );
}

function CounterInput({ label, value, setValue, min }: { label: string; value: number; setValue: (n: number) => void; min: number }) {
  return (
    <div className="flex-1 rounded-md border border-border bg-cream px-3 py-2 flex items-center justify-between">
      <span className="text-[12px] text-ink/60">{label}</span>
      <div className="flex items-center gap-2">
        <button type="button" onClick={() => setValue(Math.max(min, value - 1))} className="h-6 w-6 rounded-full border border-border text-ink/70 leading-none">−</button>
        <span className="w-5 text-center text-[14px]">{value}</span>
        <button type="button" onClick={() => setValue(value + 1)} className="h-6 w-6 rounded-full border border-border text-ink/70 leading-none">+</button>
      </div>
    </div>
  );
}

function Row2({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between gap-3">
      <dt className="text-cream/60">{k}</dt>
      <dd className="text-right text-cream/95 truncate max-w-[60%]">{v}</dd>
    </div>
  );
}

/* ------------------------------------------------------------------
 * Comparison Table
 * ------------------------------------------------------------------ */

function ComparisonTable({ c }: { c: IcefieldsContent }) {
  return (
    <section id="compare" className="py-20 md:py-24">
      <div className="mx-auto max-w-[1240px] px-5 md:px-10">
        <p className="font-marker text-primary/80 text-sm tracking-[0.25em] uppercase">{c.compare.eyebrow}</p>
        <h2 className="mt-3 font-serif text-3xl md:text-[40px] text-ink font-semibold">{c.compare.heading}</h2>

        <div className="mt-10 hidden md:block overflow-hidden rounded-2xl border border-border/70 bg-cream">
          <table className="w-full text-[13.5px] text-ink/80">
            <thead className="bg-paper/60 text-[11.5px] tracking-[0.18em] uppercase text-ink/60">
              <tr>
                {c.compare.headers.map((h) => (
                  <th key={h} className="text-left px-4 py-4 font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {c.compare.rows.map(({ id, addons }, i) => {
                const p = c.products[id];
                return (
                  <tr key={id} className={i % 2 ? "bg-paper/30" : ""}>
                    <td className="px-4 py-4 font-serif text-ink font-semibold align-top max-w-[220px]">{p.name}</td>
                    <td className="px-4 py-4 align-top">{p.daysLabel}</td>
                    <td className="px-4 py-4 align-top">{p.direction}</td>
                    <td className="px-4 py-4 align-top">{p.time}</td>
                    <td className="px-4 py-4 align-top text-primary font-semibold">
                      {p.childAvailable ? `$${p.adult} / $${p.child}` : `$${p.adult} ${c.compare.pp}`}
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
                  <span className="text-ink/55">{c.detailed.direction}</span><span>{p.direction}</span>
                  <span className="text-ink/55">{c.detailed.time}</span><span>{p.time}</span>
                  <span className="text-ink/55">{c.detailed.baseFare}</span>
                  <span className="text-primary font-semibold">
                    {p.childAvailable ? `$${p.adult} / $${p.child}` : `$${p.adult} ${c.compare.pp}`}
                  </span>
                  <span className="text-ink/55">{c.detailed.addOnsLabel}</span><span>{addons}</span>
                  <span className="text-ink/55">{c.compare.headers[6]}</span><span>{p.bestFor}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------
 * Add-ons / Pickup Notes / Included
 * ------------------------------------------------------------------ */

function AddOnsSection({ c }: { c: IcefieldsContent }) {
  return (
    <section className="py-20 md:py-24 bg-paper/40">
      <div className="mx-auto max-w-[1100px] px-5 md:px-10">
        <p className="font-marker text-primary/80 text-sm tracking-[0.25em] uppercase">{c.addonsSection.eyebrow}</p>
        <h2 className="mt-3 font-serif text-3xl md:text-[40px] text-ink font-semibold">{c.addonsSection.heading}</h2>

        <div className="mt-10 grid md:grid-cols-3 gap-5">
          {c.addonsSection.cards.map((card) => (
            <div key={card.t} className="rounded-2xl border border-border/70 bg-cream p-6">
              <h3 className="font-serif text-[18px] text-ink font-semibold">{card.t}</h3>
              <p className="mt-2 text-[13px] text-ink/60">{card.on}</p>
              <p className="mt-4 font-serif text-primary text-[18px] font-semibold">{card.price}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 text-[13px] text-ink/55 italic">{c.addonsSection.note}</p>
      </div>
    </section>
  );
}

function PickupNotes({ c }: { c: IcefieldsContent }) {
  return (
    <section className="py-20 md:py-24">
      <div className="mx-auto max-w-[1100px] px-5 md:px-10">
        <p className="font-marker text-primary/80 text-sm tracking-[0.25em] uppercase">{c.pickupNotes.eyebrow}</p>
        <h2 className="mt-3 font-serif text-3xl md:text-[40px] text-ink font-semibold">{c.pickupNotes.heading}</h2>
        <div className="mt-10 grid sm:grid-cols-2 gap-5">
          {c.pickupNotes.cards.map((card) => (
            <div key={card.t} className="rounded-2xl border border-border/70 bg-cream p-6">
              <h3 className="font-serif text-[17px] text-ink font-semibold">{card.t}</h3>
              <ul className="mt-3 space-y-1.5 text-[13.5px] text-ink/70 leading-[1.85]">
                {card.lines.map((l) => (
                  <li key={l} className="pl-3 relative before:content-['·'] before:absolute before:left-0 before:text-primary">
                    {l}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function IncludedSection({ c }: { c: IcefieldsContent }) {
  return (
    <section className="py-20 md:py-24 bg-paper/40">
      <div className="mx-auto max-w-[1100px] px-5 md:px-10">
        <p className="font-marker text-primary/80 text-sm tracking-[0.25em] uppercase">{c.included.eyebrow}</p>
        <h2 className="mt-3 font-serif text-3xl md:text-[40px] text-ink font-semibold">{c.included.heading}</h2>

        <div className="mt-10 grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-border/70 bg-cream p-6">
            <h3 className="font-serif text-[18px] text-ink font-semibold">{c.included.includedTitle}</h3>
            <ul className="mt-4 space-y-2 text-[14px] text-ink/75 leading-[1.85]">
              {c.included.included.map((i) => (
                <li key={i} className="pl-5 relative before:content-['✓'] before:absolute before:left-0 before:text-emerald-600">
                  {i}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-border/70 bg-cream p-6">
            <h3 className="font-serif text-[18px] text-ink font-semibold">{c.included.notIncludedTitle}</h3>
            <ul className="mt-4 space-y-2 text-[14px] text-ink/75 leading-[1.85]">
              {c.included.notIncluded.map((i) => (
                <li key={i} className="pl-5 relative before:content-['×'] before:absolute before:left-0 before:text-ink/40">
                  {i}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function TravelNotes({ c }: { c: IcefieldsContent }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="py-20 md:py-24">
      <div className="mx-auto max-w-[900px] px-5 md:px-10">
        <p className="font-marker text-primary/80 text-sm tracking-[0.25em] uppercase">{c.faq.eyebrow}</p>
        <h2 className="mt-3 font-serif text-3xl md:text-[40px] text-ink font-semibold">{c.faq.heading}</h2>
        <div className="mt-10 space-y-2">
          {c.faq.items.map((it, i) => (
            <div key={it.q} className="rounded-xl border border-border/70 bg-cream overflow-hidden">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
              >
                <span className="font-serif text-[15.5px] text-ink font-semibold">{it.q}</span>
                <span className="text-ink/50 text-xl shrink-0">{open === i ? "−" : "+"}</span>
              </button>
              {open === i && (
                <div className="px-5 pb-5 text-[14px] text-ink/70 leading-[1.9] border-t border-border/60 pt-3">
                  {it.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BookingTerms({ c }: { c: IcefieldsContent }) {
  return (
    <section className="py-20 md:py-24 bg-paper/40">
      <div className="mx-auto max-w-[1100px] px-5 md:px-10">
        <p className="font-marker text-primary/80 text-sm tracking-[0.25em] uppercase">{c.terms.eyebrow}</p>
        <h2 className="mt-3 font-serif text-3xl md:text-[40px] text-ink font-semibold">{c.terms.heading}</h2>
        <div className="mt-10 grid md:grid-cols-2 gap-5">
          {c.terms.blocks.map((b) => (
            <div key={b.t} className="rounded-2xl border border-border/70 bg-cream p-6">
              <h3 className="font-serif text-[17px] text-ink font-semibold">{b.t}</h3>
              <p className="mt-2 text-[14px] text-ink/70 leading-[1.9]">{b.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCTA({ c, scrollTo }: { c: IcefieldsContent; scrollTo: (id: string) => void }) {
  return (
    <section className="relative overflow-hidden bg-ink">
      <img src={heroMountains} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <img src={tourRockies} alt="" aria-hidden className="hidden" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/55 to-ink/30" />
      <div className="relative mx-auto max-w-[1100px] px-5 md:px-10 py-20 md:py-28 text-cream [text-shadow:0_2px_22px_rgba(0,0,0,0.85),_0_1px_3px_rgba(0,0,0,0.6)]">
        <p className="font-marker text-cream/80 text-[12px] tracking-[0.3em] uppercase">{c.finalCta.eyebrow}</p>
        <h2 className="mt-3 font-serif text-cream text-3xl md:text-[44px] font-semibold leading-[1.15] max-w-3xl">
          {c.finalCta.h2}
        </h2>
        <p className="mt-5 max-w-2xl text-cream/90 text-[15.5px] leading-[1.95]">{c.finalCta.sub}</p>
        <div className="mt-7 flex flex-wrap gap-3">
          <button
            onClick={() => scrollTo("reserve")}
            className="rounded-full bg-cream text-ink px-7 py-3.5 text-[14px] tracking-wide hover:bg-cream/90 transition"
          >
            {c.finalCta.ctaReserve}
          </button>
          <button
            onClick={() => scrollTo("compare")}
            className="rounded-full border border-cream/70 text-cream px-7 py-3.5 text-[14px] tracking-wide hover:bg-cream/15 transition"
          >
            {c.finalCta.ctaCompare}
          </button>
        </div>
      </div>
    </section>
  );
}
