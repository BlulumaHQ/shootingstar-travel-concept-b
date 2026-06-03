import { useEffect, useState } from "react";
import { SiteLayout } from "@/components/site/Layout";
import { useLocale } from "@/i18n/locale";
import lake009 from "@/assets/lake-tours/lake-009.webp";
import lake010 from "@/assets/lake-tours/lake-010.webp";
import lake011 from "@/assets/lake-tours/lake-011.webp";
import lake013 from "@/assets/lake-tours/lake-013.webp";
import lake014 from "@/assets/lake-tours/lake-014.webp";
import lake015 from "@/assets/lake-tours/lake-015.webp";
import lake052 from "@/assets/lake-tours/lake-052.webp";
import lake055 from "@/assets/lake-tours/lake-055.webp";
import lake057 from "@/assets/lake-tours/lake-057.webp";
import type { LakeToursContent, TourKey } from "@/content/lake-tours";

// Page-only image set (shared across en / zh / ko routes)
const HERO_IMAGE = lake009;
const PAINTING_BG = lake010; // calm reflection, used as faint painterly backdrop
const FINAL_CTA_BG = lake011;
const TOUR_IMAGES: Record<TourKey, [string, string]> = {
  halfday: [lake057, lake014],
  sunrise: [lake011, lake052],
  extended: [lake055, lake015],
};


export function LakeToursLanding({ content }: { content: LakeToursContent }) {
  const locale = useLocale();
  const TOURS = content.tours;
  const TOUR_LIST = [TOURS.halfday, TOURS.sunrise, TOURS.extended];

  const [selected, setSelected] = useState<TourKey>("halfday");
  const [date, setDate] = useState<string>("");
  const [pickup, setPickup] = useState<string>(TOURS.halfday.pickupOptions[0]);
  const [time, setTime] = useState<string>(TOURS.halfday.times[0]);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  const tour = TOURS[selected];
  const guests = adults + children;
  const subtotal = tour.price * guests;
  const gst = +(subtotal * 0.05).toFixed(2);
  const total = +(subtotal + gst).toFixed(2);

  const handleSelectTour = (key: TourKey) => {
    setSelected(key);
    setPickup(TOURS[key].pickupOptions[0]);
    setTime(TOURS[key].times[0]);
    document.getElementById("reserve")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const c = content;
  const guestsLabel = `${c.reserve.summary.adultUnit(adults)}${
    children ? `, ${c.reserve.summary.childUnit(children)}` : ""
  }`;

  return (
    <SiteLayout>
      {/* HERO */}
      <section className="relative overflow-hidden bg-ink">
        <img
          src={HERO_IMAGE}
          alt="Moraine Lake / 모레인 호수 / 夢蓮湖"
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Soft scrim — keeps the lake visible, just a touch of contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-ink/70 via-ink/25 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-ink/40" />

        <div className="relative mx-auto max-w-[1240px] px-5 md:px-10 py-20 md:py-32 grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 text-cream [text-shadow:0_2px_22px_rgba(0,0,0,0.85),_0_1px_3px_rgba(0,0,0,0.6)]">
            <p className="font-marker text-cream text-[13px] tracking-[0.3em] uppercase">
              {c.hero.eyebrow}
            </p>
            <h1 className="mt-4 font-serif text-[40px] md:text-[58px] leading-[1.05] font-semibold text-cream">
              {c.hero.h1Line1}
              <br /> {c.hero.h1Line2}
            </h1>
            <p className="mt-5 max-w-xl text-cream/95 text-[15.5px] leading-[1.95]">
              {c.hero.sub}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <button
                onClick={() => scrollTo("reserve")}
                className="rounded-full bg-cream text-ink px-7 py-3.5 text-[14px] tracking-wide hover:bg-cream/90 transition shadow-[0_10px_30px_-10px_rgba(0,0,0,0.4)]"
              >
                {c.hero.ctaBook}
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

          {/* Quick reserve card */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl bg-cream/95 backdrop-blur p-6 md:p-7 border border-cream/40 shadow-[0_30px_70px_-20px_rgba(0,0,0,0.45)]">
              <p className="font-marker text-primary text-[12px] tracking-[0.25em] uppercase">
                {c.quickReserve.eyebrow}
              </p>
              <h3 className="mt-2 font-serif text-[22px] text-ink font-semibold">
                {c.quickReserve.title}
              </h3>
              <div className="mt-4 space-y-2">
                {TOUR_LIST.map((t) => (
                  <button
                    key={t.key}
                    onClick={() => handleSelectTour(t.key)}
                    className={`w-full text-left rounded-xl border px-4 py-3 transition ${
                      selected === t.key
                        ? "border-primary bg-primary/5"
                        : "border-border bg-cream hover:border-primary/40"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="min-w-0">
                        <p className="text-[11px] tracking-[0.2em] uppercase text-ink/55">
                          {t.tag}
                        </p>
                        <p className="mt-0.5 font-serif text-[15px] text-ink font-semibold truncate">
                          {t.name}
                        </p>
                      </div>
                      <span className="font-serif text-primary text-[15px] font-semibold whitespace-nowrap">
                        ${t.price}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
              <button
                onClick={() => scrollTo("reserve")}
                className="mt-5 w-full rounded-full bg-primary text-primary-foreground py-3 text-[14px] tracking-wide hover:bg-primary/90 transition"
              >
                {c.quickReserve.continueCta}
              </button>
              <p className="mt-3 text-[11px] text-ink/50 text-center">
                {c.quickReserve.footnote}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WHY */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-[1100px] px-5 md:px-10">
          <p className="font-marker text-primary/80 text-sm tracking-[0.25em] uppercase">{c.why.eyebrow}</p>
          <h2 className="mt-3 font-serif text-3xl md:text-[40px] text-ink font-semibold leading-[1.15] max-w-3xl">
            {c.why.h2}
          </h2>
          <div className="mt-6 max-w-3xl space-y-5 text-ink/75 text-[15.5px] leading-[1.95]">
            <p>{c.why.p1}</p>
            <p>{c.why.p2}</p>
          </div>

          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {c.why.features.map((f, i) => (
              <div
                key={f.t}
                className="rounded-2xl border border-border/70 bg-cream p-6 hover:border-primary/40 transition"
              >
                <p className="font-marker text-primary/70 text-[12px] tracking-[0.2em]">
                  0{i + 1}
                </p>
                <h3 className="mt-2 font-serif text-[18px] text-ink font-semibold">{f.t}</h3>
                <p className="mt-2 text-[14px] text-ink/65 leading-[1.85]">{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OPTIONS */}
      <section className="py-16 md:py-24 bg-paper/60">
        <div className="mx-auto max-w-[1240px] px-5 md:px-10">
          <p className="font-marker text-primary/80 text-sm tracking-[0.25em] uppercase">{c.options.eyebrow}</p>
          <h2 className="mt-3 font-serif text-3xl md:text-[40px] text-ink font-semibold">
            {c.options.h2}
          </h2>

          <div className="mt-10 grid lg:grid-cols-3 gap-6">
            {TOUR_LIST.map((t) => (
              <article
                key={t.key}
                className="flex flex-col rounded-2xl border border-border/70 bg-cream overflow-hidden shadow-[0_20px_50px_-30px_rgba(60,80,70,0.35)]"
              >
                <div className="relative h-52 overflow-hidden">
                  <TourSlides images={TOUR_IMAGES[t.key]} alt={t.name} />
                  <span className="absolute top-4 left-4 z-10 rounded-full bg-cream/95 text-ink px-3 py-1 text-[11px] tracking-[0.2em] uppercase">
                    {t.tag}
                  </span>
                </div>

                <div className="flex flex-col flex-1 p-6">
                  <h3 className="font-serif text-[20px] text-ink font-semibold leading-snug">
                    {t.name}
                  </h3>
                  <p className="mt-3 text-[14px] text-ink/70 leading-[1.85]">{t.short}</p>

                  <dl className="mt-5 space-y-2 text-[13px] text-ink/75 border-t border-border/60 pt-4">
                    <div className="flex justify-between gap-4">
                      <dt className="text-ink/55">{c.options.labels.pickup}</dt>
                      <dd className="text-right">{t.pickup}</dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt className="text-ink/55">{c.options.labels.moraine}</dt>
                      <dd>{t.moraineTime}</dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt className="text-ink/55">{c.options.labels.louise}</dt>
                      <dd>{t.louiseTime}</dd>
                    </div>
                  </dl>

                  <div className="mt-5 text-[12.5px] text-ink/70 leading-[1.85] space-y-1.5">
                    <p className="text-[11px] tracking-[0.2em] uppercase text-ink/55">{c.options.labels.departures}</p>
                    {t.departures.map((d) => (
                      <p key={d.day}>
                        <span className="text-ink">{d.day}: </span>
                        {d.times.join(", ")}
                      </p>
                    ))}
                  </div>

                  {t.itinerary && (
                    <div className="mt-5">
                      <p className="text-[11px] tracking-[0.2em] uppercase text-ink/55">
                        {c.options.labels.itinerary}
                      </p>
                      <ul className="mt-2 space-y-1.5 text-[13px] text-ink/70 leading-[1.8]">
                        {t.itinerary.slice(0, 3).map((i) => (
                          <li
                            key={i}
                            className="pl-3 relative before:content-['·'] before:absolute before:left-0 before:text-primary"
                          >
                            {i}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="mt-auto pt-6 flex flex-col gap-4 border-t border-border/60">
                    <div className="flex items-baseline justify-between">
                      <span className="text-[13px] text-ink/55">{c.options.labels.price}</span>
                      <span className="font-serif text-[24px] text-primary font-bold tracking-tight">{t.priceLabel}</span>
                    </div>

                    <p className="text-[12px] text-ink/55 italic leading-relaxed">
                      {c.options.labels.gratuityNote}
                    </p>

                    <button
                      onClick={() => handleSelectTour(t.key)}
                      className="w-full rounded-full bg-primary text-primary-foreground py-3 text-[13.5px] tracking-wide hover:bg-primary/90 transition"
                    >
                      {t.cta} →
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* PAINTERLY BAND — calm reflection sits behind a soft cream wash so it reads like a painting */}
      <section aria-hidden className="relative h-[42vh] min-h-[320px] md:h-[58vh] overflow-hidden">
        <img
          src={PAINTING_BG}
          alt=""
          className="absolute inset-0 h-full w-full object-cover scale-105"
          style={{ filter: "saturate(0.85) contrast(0.95)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-cream/55 via-cream/20 to-cream/70 mix-blend-soft-light" />
        <div className="absolute inset-0 bg-gradient-to-b from-paper/30 via-transparent to-paper/40" />
        <div className="relative h-full mx-auto max-w-[1100px] px-5 md:px-10 flex items-end pb-10 md:pb-14">
          <p className="font-marker text-ink/70 text-[12px] md:text-[13px] tracking-[0.3em] uppercase">
            Banff · Moraine · Lake Louise
          </p>
        </div>
      </section>

      {/* COMPARE */}

      <section id="compare" className="py-20 md:py-28">
        <div className="mx-auto max-w-[1240px] px-5 md:px-10">
          <p className="font-marker text-primary/80 text-sm tracking-[0.25em] uppercase">{c.compare.eyebrow}</p>
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
                {TOUR_LIST.map((t, i) => (
                  <tr key={t.key} className={i % 2 ? "bg-paper/30" : ""}>
                    <td className="px-5 py-5 font-serif text-ink font-semibold align-top max-w-[220px]">
                      {t.name}
                    </td>
                    <td className="px-5 py-5 align-top">{t.bestFor}</td>
                    <td className="px-5 py-5 align-top text-primary font-semibold">
                      ${t.price}{c.compare.priceSuffix}
                    </td>
                    <td className="px-5 py-5 align-top">{t.pickup}</td>
                    <td className="px-5 py-5 align-top">
                      {t.departures.map((d) => (
                        <div key={d.day} className="leading-tight mb-1">
                          <span className="text-ink/55">{d.day}: </span>
                          {d.times.join(", ")}
                        </div>
                      ))}
                    </td>
                    <td className="px-5 py-5 align-top">{t.moraineTime}</td>
                    <td className="px-5 py-5 align-top">{t.louiseTime}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="mt-8 grid gap-4 md:hidden">
            {TOUR_LIST.map((t) => (
              <div key={t.key} className="rounded-2xl border border-border/70 bg-cream p-5">
                <p className="text-[11px] tracking-[0.2em] uppercase text-ink/55">{t.bestFor}</p>
                <h3 className="mt-1 font-serif text-[17px] text-ink font-semibold">{t.name}</h3>
                <div className="mt-3 grid grid-cols-2 gap-y-2 text-[13px] text-ink/75">
                  <span className="text-ink/55">{c.compare.mobileLabels.price}</span>
                  <span className="text-primary font-semibold">${t.price}{c.compare.priceSuffix}</span>
                  <span className="text-ink/55">{c.compare.mobileLabels.pickup}</span>
                  <span>{t.pickup}</span>
                  <span className="text-ink/55">{c.compare.mobileLabels.moraine}</span>
                  <span>{t.moraineTime}</span>
                  <span className="text-ink/55">{c.compare.mobileLabels.louise}</span>
                  <span>{t.louiseTime}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RESERVE */}
      <section id="reserve" className="py-20 md:py-28 bg-paper/50">
        <div className="mx-auto max-w-[1100px] px-5 md:px-10">
          <p className="font-marker text-primary/80 text-sm tracking-[0.25em] uppercase">{c.reserve.eyebrow}</p>
          <h2 className="mt-3 font-serif text-3xl md:text-[40px] text-ink font-semibold">
            {c.reserve.h2}
          </h2>
          <p className="mt-4 max-w-2xl text-ink/70 text-[15px] leading-[1.95]">
            {c.reserve.intro}
          </p>

          <div className="mt-10 grid lg:grid-cols-5 gap-6">
            <div className="lg:col-span-3 rounded-2xl bg-cream border border-border/70 p-6 md:p-8 space-y-6 shadow-[0_20px_50px_-30px_rgba(60,80,70,0.35)]">
              <Field label={c.reserve.fields.tour}>
                <select
                  value={selected}
                  onChange={(e) => {
                    const k = e.target.value as TourKey;
                    setSelected(k);
                    setPickup(TOURS[k].pickupOptions[0]);
                    setTime(TOURS[k].times[0]);
                  }}
                  className="w-full rounded-md border border-border bg-cream px-3 py-3 text-[14px]"
                >
                  {TOUR_LIST.map((t) => (
                    <option key={t.key} value={t.key}>
                      {t.name} — {t.priceLabel}
                    </option>
                  ))}
                </select>
              </Field>

              <Field label={c.reserve.fields.date}>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full rounded-md border border-border bg-cream px-3 py-3 text-[14px]"
                />
              </Field>

              <div className="grid sm:grid-cols-2 gap-5">
                <Field label={c.reserve.fields.pickup}>
                  <select
                    value={pickup}
                    onChange={(e) => setPickup(e.target.value)}
                    className="w-full rounded-md border border-border bg-cream px-3 py-3 text-[14px]"
                  >
                    {tour.pickupOptions.map((p) => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </Field>
                <Field label={c.reserve.fields.time}>
                  <select
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full rounded-md border border-border bg-cream px-3 py-3 text-[14px]"
                  >
                    {tour.times.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </Field>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <Stepper label={c.reserve.fields.adults} value={adults} setValue={setAdults} min={1} />
                <Stepper label={c.reserve.fields.children} value={children} setValue={setChildren} min={0} />
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="sticky top-28 rounded-2xl bg-cream border-2 border-primary/30 p-6 shadow-[0_20px_50px_-30px_rgba(60,80,70,0.4)]">
                <p className="font-marker text-primary text-[12px] tracking-[0.25em] uppercase">
                  {c.reserve.summary.eyebrow}
                </p>
                <h3 className="mt-2 font-serif text-[20px] text-ink font-semibold">
                  {tour.name}
                </h3>
                <div className="mt-4 space-y-2 text-[13.5px] text-ink/75">
                  <Row label={c.reserve.summary.date} value={date || "—"} />
                  <Row label={c.reserve.summary.pickup} value={pickup} />
                  <Row label={c.reserve.summary.time} value={time} />
                  <Row label={c.reserve.summary.guests} value={guestsLabel} />
                </div>

                <div className="mt-5 border-t border-border pt-4 space-y-2 text-[14px]">
                  <Row label={c.reserve.summary.tourUnit(guests)} value={`$${subtotal.toFixed(2)} CAD`} />
                  <Row label={c.reserve.summary.gst} value={`$${gst.toFixed(2)} CAD`} />
                  <div className="flex justify-between items-end pt-2 border-t border-border/60">
                    <span className="text-ink/55 text-[12px] tracking-[0.18em] uppercase">
                      {c.reserve.summary.total}
                    </span>
                    <span className="font-serif text-primary text-[24px] font-semibold">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                  <p className="text-[11.5px] text-ink/55 italic pt-1">
                    {c.reserve.summary.gratuityNote}
                  </p>
                </div>

                <button
                  onClick={() => setModalOpen(true)}
                  className="mt-6 w-full rounded-full bg-primary text-primary-foreground py-3.5 text-[14px] tracking-wide hover:bg-primary/90 transition"
                >
                  {c.reserve.summary.continueCta}
                </button>
                <p className="mt-3 text-[11.5px] text-ink/50 text-center leading-[1.7]">
                  {c.reserve.summary.footnote}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INCLUDED */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-[1100px] px-5 md:px-10">
          <p className="font-marker text-primary/80 text-sm tracking-[0.25em] uppercase">{c.included.eyebrow}</p>
          <h2 className="mt-3 font-serif text-3xl md:text-[40px] text-ink font-semibold">
            {c.included.h2}
          </h2>
          <div className="mt-10 grid md:grid-cols-2 gap-8">
            <IncludeBlock title={c.included.includedTitle} tone="primary" items={c.included.includedItems} />
            <IncludeBlock title={c.included.notIncludedTitle} tone="muted" items={c.included.notIncludedItems} />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 md:py-28 bg-paper/50">
        <div className="mx-auto max-w-[1100px] px-5 md:px-10">
          <p className="font-marker text-primary/80 text-sm tracking-[0.25em] uppercase">{c.faq.eyebrow}</p>
          <h2 className="mt-3 font-serif text-3xl md:text-[40px] text-ink font-semibold">
            {c.faq.h2}
          </h2>

          <div className="mt-10 grid md:grid-cols-2 gap-4">
            {/* Left column — first half */}
            <div className="space-y-3">
              {c.faq.items.slice(0, Math.ceil(c.faq.items.length / 2)).map((f, i) => (
                <FaqItem key={i} q={f.q} a={f.a} defaultOpen={i === 0} />
              ))}
            </div>
            {/* Right column — second half */}
            <div className="space-y-3">
              {c.faq.items.slice(Math.ceil(c.faq.items.length / 2)).map((f, i) => (
                <FaqItem key={i} q={f.q} a={f.a} defaultOpen={i === 0} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TRAVEL NOTES & BOOKING TERMS */}
      <TravelTermsSection locale={locale} />



      {/* FINAL CTA */}
      <section className="relative overflow-hidden py-24 md:py-32 bg-ink text-cream">
        <img src={FINAL_CTA_BG} alt="" className="absolute inset-0 h-full w-full object-cover opacity-55" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/55 to-ink/75" />
        <div className="relative mx-auto max-w-[900px] px-5 md:px-10 text-center [text-shadow:0_2px_18px_rgba(0,0,0,0.6)]">
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
            <button
              onClick={() => scrollTo("reserve")}
              className="rounded-full bg-cream text-ink px-7 py-3.5 text-[14px] tracking-wide hover:bg-cream/90 transition"
            >
              {c.finalCta.ctaReserve}
            </button>
            <button
              onClick={() => scrollTo("compare")}
              className="rounded-full border border-cream/60 text-cream px-7 py-3.5 text-[14px] tracking-wide hover:bg-cream/10 transition"
            >
              {c.finalCta.ctaCompare}
            </button>
          </div>
        </div>
      </section>

      {/* Sticky mobile CTA */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-cream/95 backdrop-blur border-t border-border px-4 py-3 flex items-center gap-3 shadow-[0_-10px_30px_-10px_rgba(0,0,0,0.15)]">
        <div className="flex-1 min-w-0">
          <p className="text-[10.5px] tracking-[0.18em] uppercase text-ink/55 truncate">
            {tour.tag}
          </p>
          <p className="text-primary font-serif text-[15px] font-semibold truncate">
            {c.sticky.fromLabel(tour.price)}
          </p>
        </div>
        <button
          onClick={() => scrollTo("reserve")}
          className="rounded-full bg-primary text-primary-foreground px-5 py-3 text-[13px] tracking-wide whitespace-nowrap"
        >
          {c.sticky.cta}
        </button>
      </div>
      <div className="lg:hidden h-20" aria-hidden />

      {modalOpen && (
        <div
          className="fixed inset-0 z-[60] bg-ink/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-4"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="w-full max-w-md rounded-2xl bg-cream p-7 shadow-[0_30px_70px_-20px_rgba(0,0,0,0.5)]"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="font-marker text-primary text-[12px] tracking-[0.25em] uppercase">
              {c.modal.eyebrow}
            </p>
            <h3 className="mt-2 font-serif text-[24px] text-ink font-semibold leading-snug">
              {c.modal.title}
            </h3>
            <p className="mt-3 text-[14.5px] text-ink/70 leading-[1.9]">
              {c.modal.body}
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <a
                href="/contact"
                className="flex-1 rounded-full bg-primary text-primary-foreground py-3 text-[14px] tracking-wide text-center hover:bg-primary/90 transition"
              >
                {c.modal.contactCta}
              </a>
              <button
                onClick={() => setModalOpen(false)}
                className="rounded-full border border-border text-ink/70 px-5 py-3 text-[13px] hover:bg-paper transition"
              >
                {c.modal.close}
              </button>
            </div>
          </div>
        </div>
      )}
    </SiteLayout>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-[11px] tracking-[0.2em] uppercase text-ink/55 mb-2">
        {label}
      </span>
      {children}
    </label>
  );
}

function Stepper({
  label,
  value,
  setValue,
  min = 0,
}: {
  label: string;
  value: number;
  setValue: (n: number) => void;
  min?: number;
}) {
  return (
    <div>
      <span className="block text-[11px] tracking-[0.2em] uppercase text-ink/55 mb-2">
        {label}
      </span>
      <div className="inline-flex items-center rounded-full border border-border bg-cream">
        <button
          type="button"
          onClick={() => setValue(Math.max(min, value - 1))}
          className="px-4 py-2.5 text-ink/70 hover:text-primary"
          aria-label={`− ${label}`}
        >
          −
        </button>
        <span className="w-10 text-center text-[15px] font-serif">{value}</span>
        <button
          type="button"
          onClick={() => setValue(Math.min(20, value + 1))}
          className="px-4 py-2.5 text-ink/70 hover:text-primary"
          aria-label={`+ ${label}`}
        >
          +
        </button>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4">
      <span className="text-ink/55">{label}</span>
      <span className="text-right text-ink truncate max-w-[60%]">{value}</span>
    </div>
  );
}

function IncludeBlock({
  title,
  items,
  tone,
}: {
  title: string;
  items: (string | { text: string; href?: string })[];
  tone: "primary" | "muted";
}) {
  return (
    <div className="rounded-2xl border border-border/70 bg-cream p-6 md:p-8">
      <h3 className="font-serif text-[20px] text-ink font-semibold">{title}</h3>
      <div className={`mt-3 h-px w-10 ${tone === "primary" ? "bg-primary/60" : "bg-ink/30"}`} />
      <ul className="mt-5 space-y-2.5 text-[14px] text-ink/75 leading-[1.9]">
        {items.map((it, idx) => {
          const isObj = typeof it === "object";
          const text = isObj ? it.text : it;
          const href = isObj ? it.href : undefined;
          return (
            <li
              key={typeof it === "string" ? it : `${it.text}-${idx}`}
              className={`pl-5 relative ${
                tone === "primary"
                  ? "before:content-['✓'] before:absolute before:left-0 before:text-primary"
                  : "before:content-['×'] before:absolute before:left-0 before:text-ink/40"
              }`}
            >
              {href ? (
                <>
                  {text}{" "}
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary underline underline-offset-2 hover:text-primary/80"
                  >
                    parkscanadashop.ca
                  </a>
                </>
              ) : (
                text
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}


function FaqItem({ q, a, defaultOpen = false }: { q: string; a: string; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="rounded-xl border border-border/70 bg-cream overflow-hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-4 text-left px-5 py-4 hover:bg-paper/40 transition"
      >
        <span className="font-serif text-[16px] text-ink font-semibold">{q}</span>
        <span className={`text-primary text-xl transition-transform ${open ? "rotate-45" : ""}`}>
          +
        </span>
      </button>
      {open && (
        <div className="px-5 pb-5 -mt-1 text-[14px] text-ink/70 leading-[1.95]">{a}</div>
      )}
    </div>
  );
}

function TourSlides({ images, alt }: { images: [string, string]; alt: string }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % images.length), 4200);
    return () => clearInterval(id);
  }, [images.length]);
  return (
    <div className="absolute inset-0">
      {images.map((src, idx) => (
        <img
          key={src}
          src={src}
          alt={idx === 0 ? alt : ""}
          className="absolute inset-0 h-full w-full object-cover transition-opacity duration-[1200ms] ease-out"
          style={{ opacity: i === idx ? 1 : 0 }}
        />
      ))}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
        {images.map((_, idx) => (
          <span
            key={idx}
            className={`h-1 rounded-full transition-all ${
              i === idx ? "w-5 bg-cream" : "w-1.5 bg-cream/60"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

