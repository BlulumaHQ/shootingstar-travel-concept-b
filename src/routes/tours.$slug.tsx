import { createFileRoute, Link, notFound, useParams } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { TourGallery } from "@/components/site/TourGallery";
import { getTour, type Tour } from "@/data/tours";
import { useGetTour } from "@/data/useTours";
import { useLocale, withLocale, hreflangLinks, type Locale } from "@/i18n/locale";
import { useState } from "react";

const LABELS: Record<Locale, {
  allTours: string; duration: string; language: string; price: string;
  itineraryEyebrow: string; itinerary: string;
  pricingEyebrow: string; pricing: string; tourRate: string; gratuity: string;
  galleryEyebrow: string; gallery: string;
  included: string; notIncluded: string; optional: string;
  notesEyebrow: string; notes: string; faq: string;
}> = {
  en: {
    allTours: "← All tours", duration: "Duration", language: "Language", price: "Price",
    itineraryEyebrow: "itinerary", itinerary: "Itinerary",
    pricingEyebrow: "pricing", pricing: "Pricing", tourRate: "Tour Rate", gratuity: "Suggested Guide Gratuity",
    galleryEyebrow: "gallery", gallery: "Trip gallery",
    included: "Included", notIncluded: "Not Included", optional: "Optional Experiences",
    notesEyebrow: "travel notes", notes: "Travel Notes", faq: "Frequently asked",
  },
  zh: {
    allTours: "← 所有行程", duration: "天數", language: "語言", price: "費用",
    itineraryEyebrow: "行程", itinerary: "行程安排",
    pricingEyebrow: "費用", pricing: "費用說明", tourRate: "行程費用", gratuity: "建議導遊小費",
    galleryEyebrow: "相簿", gallery: "旅程相簿",
    included: "費用包含", notIncluded: "費用不含", optional: "選購體驗",
    notesEyebrow: "旅行須知", notes: "旅行須知", faq: "常見問題",
  },
  ko: {
    allTours: "← 전체 투어", duration: "기간", language: "언어", price: "요금",
    itineraryEyebrow: "일정", itinerary: "일정",
    pricingEyebrow: "요금", pricing: "요금 안내", tourRate: "투어 요금", gratuity: "권장 가이드 팁",
    galleryEyebrow: "갤러리", gallery: "투어 갤러리",
    included: "포함 사항", notIncluded: "불포함 사항", optional: "선택 옵션",
    notesEyebrow: "여행 안내", notes: "여행 안내", faq: "자주 묻는 질문",
  },
};

export const Route = createFileRoute("/tours/$slug")({
  loader: ({ params }) => {
    const tour = getTour(params.slug);
    if (!tour) throw notFound();
    return { tour };
  },
  head: ({ params, loaderData }) => {
    const t = loaderData?.tour;
    return {
      meta: [
        { title: `${t?.title ?? "Tour"} — Shooting Star Travel` },
        { name: "description", content: t?.intro ?? "" },
        { property: "og:title", content: t?.title ?? "" },
        { property: "og:description", content: t?.intro ?? "" },
        ...(t?.img ? [{ property: "og:image", content: t.img }] : []),
      ],
      links: hreflangLinks(`/tours/${params.slug}`, "en"),
    };
  },
  notFoundComponent: () => (
    <SiteLayout>
      <section className="mx-auto max-w-3xl px-6 py-32 text-center">
        <h1 className="font-serif text-3xl text-ink">Tour not found</h1>
        <Link to="/tours" className="mt-6 inline-flex text-primary underline underline-offset-4">Back to all tours</Link>
      </section>
    </SiteLayout>
  ),
  errorComponent: ({ error }) => (
    <SiteLayout>
      <section className="mx-auto max-w-3xl px-6 py-32 text-center">
        <p className="text-ink/70">{error.message}</p>
      </section>
    </SiteLayout>
  ),
  component: TourDetailPage,
});

export function BookingWidget({ tour, idPrefix = "" }: { tour: ReturnType<typeof getTour>; idPrefix?: string }) {
  const departures = tour?.departures ?? [
    { date: "Jul 12", seats: 8 },
    { date: "Jul 18", seats: 4 },
    { date: "Jul 26", seats: 12 },
    { date: "Aug 09", seats: 6 },
  ];
  const packages = tour?.packages ?? ["English", "Mandarin", "Korean"];

  const [dateIdx, setDateIdx] = useState(0);
  const [pkg, setPkg] = useState(packages[0]);
  const [guests, setGuests] = useState(2);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [stage, setStage] = useState<"form" | "loading" | "done">("form");

  const dep = departures[dateIdx];

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setStage("loading");
    setTimeout(() => setStage("done"), 1200);
  };

  if (stage === "loading") {
    return (
      <div className="rounded-2xl bg-cream p-10 border border-border shadow-[0_20px_50px_-30px_rgba(60,80,70,0.4)] text-center">
        <div className="mx-auto h-10 w-10 rounded-full border-2 border-primary/20 border-t-primary animate-spin" />
        <p className="mt-5 font-marker text-primary text-[13px] tracking-[0.25em] uppercase">— processing</p>
        <p className="mt-2 text-ink/65 text-[14px]">Holding your seat…</p>
      </div>
    );
  }

  if (stage === "done") {
    return (
      <div className="rounded-2xl bg-cream p-7 border border-border shadow-[0_20px_50px_-30px_rgba(60,80,70,0.4)]">
        <p className="font-marker text-primary text-[13px] tracking-[0.25em] uppercase">— demo confirmation</p>
        <h3 className="font-serif text-2xl text-ink mt-3 font-semibold">Booking demo complete ✦</h3>
        <div className="mt-5 rounded-xl bg-[var(--sand)] p-4 text-[13px] text-ink/75 leading-[1.95] space-y-1">
          <p>Tour: {tour?.title}</p>
          <p>Departure: {dep.date} · {pkg}</p>
          <p>Guests: {guests} · Contact: {name || "—"}</p>
        </div>
        <p className="mt-5 text-ink/65 leading-[2] text-[13px]">
          This is a preview of the booking flow — the live site will integrate a third-party booking system.
        </p>
        <button onClick={() => setStage("form")} className="mt-5 text-primary text-sm underline underline-offset-4">Start over</button>
      </div>
    );
  }

  return (
    <form
      id={`${idPrefix}booking-form`}
      onSubmit={submit}
      className="rounded-2xl bg-cream p-6 border-2 border-accent/40 shadow-[0_20px_50px_-30px_rgba(60,80,70,0.45)] space-y-5"
    >
      <div className="flex items-center justify-between border-b border-border/60 pb-4">
        <div>
          <p className="font-marker text-primary/80 text-[12px] tracking-[0.25em] uppercase">— booking</p>
          <h3 className="font-serif text-xl text-ink mt-1 font-semibold">Book this tour</h3>
        </div>
        <span className="text-[11px] text-ink/55">from <span className="text-primary font-serif text-[15px] font-semibold">{tour?.price}</span></span>
      </div>

      <div>
        <label className="block text-[11px] tracking-[0.2em] uppercase text-ink/55 mb-2">Choose a date</label>
        <div className="flex flex-wrap gap-1.5">
          {departures.map((d, i) => (
            <button
              type="button" key={d.date}
              onClick={() => setDateIdx(i)}
              className={`rounded-full px-3 py-1.5 text-[12px] border transition ${
                i === dateIdx ? "bg-primary text-primary-foreground border-primary" : "border-border text-ink/70 hover:border-primary/50"
              }`}
            >{d.date}</button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-[11px] tracking-[0.2em] uppercase text-ink/55 mb-2">Choose a group</label>
        <div className="flex flex-wrap gap-1.5">
          {packages.map((p) => (
            <button
              type="button" key={p}
              onClick={() => setPkg(p)}
              className={`rounded-full px-3 py-1.5 text-[12px] border transition ${
                p === pkg ? "bg-primary text-primary-foreground border-primary" : "border-border text-ink/70 hover:border-primary/50"
              }`}
            >{p}</button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-[11px] tracking-[0.2em] uppercase text-ink/55 mb-2">Travellers</label>
          <div className="inline-flex items-center rounded-full border border-border bg-cream">
            <button type="button" onClick={() => setGuests(Math.max(1, guests - 1))} className="px-3 py-1.5 text-ink/70">−</button>
            <span className="w-8 text-center text-sm">{guests}</span>
            <button type="button" onClick={() => setGuests(Math.min(dep.seats, guests + 1))} className="px-3 py-1.5 text-ink/70">+</button>
          </div>
        </div>
        <div>
          <label className="block text-[11px] tracking-[0.2em] uppercase text-ink/55 mb-2">Seats left</label>
          <p className="pt-1.5 text-primary font-serif text-lg font-semibold">{dep.seats} <span className="text-[11px] text-ink/55 font-sans">seats</span></p>
        </div>
      </div>

      <div className="space-y-2.5 pt-1">
        <input required value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" className="w-full rounded-md border border-border bg-cream px-3 py-2.5 text-sm" />
        <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full rounded-md border border-border bg-cream px-3 py-2.5 text-sm" />
        <input required value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone" className="w-full rounded-md border border-border bg-cream px-3 py-2.5 text-sm" />
      </div>

      <button type="submit" className="w-full rounded-full bg-primary text-primary-foreground py-3 text-[14.5px] tracking-wide hover:bg-primary/90 transition shadow-[0_10px_24px_-12px_oklch(0.585_0.04_155/0.7)]">
        Continue to checkout →
      </button>
      <p className="text-[10.5px] text-ink/45 text-center">* Demo only — payment will run through a third-party system on the live site.</p>
    </form>
  );
}

export function TourDetailPage() {
  const params = useParams({ strict: false }) as { slug?: string };
  const slug = params.slug ?? "";
  const getLocalizedTour = useGetTour();
  const locale = useLocale();
  const tour = getLocalizedTour(slug) as Tour | undefined;

  if (!tour) {
    return (
      <SiteLayout>
        <section className="mx-auto max-w-3xl px-6 py-32 text-center">
          <h1 className="font-serif text-3xl text-ink">Tour not found</h1>
          <Link to={withLocale("/tours", locale) as never} className="mt-6 inline-flex text-primary underline underline-offset-4">Back to all tours</Link>
        </section>
      </SiteLayout>
    );
  }

  const toursHref = withLocale("/tours", locale);
  const T = LABELS[locale];

  return (
    <SiteLayout>
      {/* Compact hero band */}
      <section className="relative bg-cream">
        <div className="relative h-[34vh] md:h-[42vh] min-h-[240px] max-h-[420px] overflow-hidden">
          <img src={tour.img} alt={tour.title} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/10 via-transparent to-cream" />
        </div>
      </section>

      {/* Main two-column layout */}
      <div className="mx-auto max-w-[1240px] px-5 md:px-10 -mt-10 md:-mt-16 relative pb-24">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10">
          {/* LEFT — content (~65%) */}
          <div className="lg:col-span-8 space-y-12">
            {/* Title block */}
            <header className="bg-cream rounded-[8px] p-7 md:p-9 border border-border/60 shadow-[0_30px_60px_-30px_rgba(60,80,70,0.35)]">
              <Link to={toursHref as never} className="text-[12px] text-ink/60 tracking-[0.2em] uppercase hover:text-primary">{T.allTours}</Link>
              <h1 className="font-serif text-3xl md:text-[42px] text-ink mt-3 font-semibold leading-[1.2]">{tour.title}</h1>
              <p className="mt-4 text-ink/70 leading-[1.95] text-[15px]">{tour.intro}</p>
              <div className="mt-5 flex flex-wrap gap-x-7 gap-y-2 text-[13px]">
                <div><span className="text-ink/50">{T.duration} </span><span className="text-ink">{tour.duration}</span></div>
                <div><span className="text-ink/50">{T.price} </span><span className="text-primary font-semibold">{tour.price}</span></div>
              </div>
              {tour.language && (
                <div className="mt-4 rounded-[4px] bg-[var(--sand)]/60 px-4 py-3 border-l-2 border-primary/40">
                  <p className="text-[10.5px] tracking-[0.3em] uppercase text-ink/55 mb-1.5">{T.language}</p>
                  <p className="text-[13px] text-ink/75 leading-[1.85]">{tour.language}</p>
                </div>
              )}
              {tour.pickup && (
                <p className="mt-4 text-[13px] text-ink/70 leading-[1.85] border-l-2 border-primary/40 pl-3">{tour.pickup}</p>
              )}
            </header>

            {/* Mobile booking panel */}
            <div className="lg:hidden">
              <BookingWidget tour={tour} idPrefix="m-" />
            </div>

            {/* ITINERARY */}
            <section>
              <p className="font-marker text-primary/80 text-sm tracking-[0.25em] uppercase">— {T.itineraryEyebrow}</p>
              <h2 className="font-serif text-3xl text-ink mt-3 font-semibold">{T.itinerary}</h2>
              <ol className="mt-7 relative border-l border-primary/30 pl-6 space-y-7">
                {tour.itinerary.map((it, i) => (
                  <li key={i} className="relative">
                    <span className="absolute -left-[31px] top-1 grid h-4 w-4 place-items-center rounded-full bg-primary text-[10px] text-primary-foreground">●</span>
                    <p className="font-marker text-primary text-sm tracking-[0.2em] uppercase">{it.stop}</p>
                    <h3 className="font-serif text-lg text-ink mt-1 font-semibold">{it.title}</h3>
                    <p className="mt-2 text-ink/65 leading-[1.95] text-[14px]">{it.body}</p>
                  </li>
                ))}
              </ol>
            </section>

            {/* PRICING */}
            <section>
              <p className="font-marker text-primary/80 text-sm tracking-[0.25em] uppercase">— {T.pricingEyebrow}</p>
              <h2 className="font-serif text-3xl text-ink mt-3 font-semibold">{T.pricing}</h2>
              {tour.roomOptions && tour.roomOptions.length > 0 ? (
                <>
                  <div className="mt-6 grid sm:grid-cols-3 gap-4">
                    {tour.roomOptions.map((r) => (
                      <div key={r.label} className="rounded-[6px] border border-border/70 bg-cream p-5">
                        <p className="text-[11px] tracking-[0.2em] uppercase text-ink/55">{r.guests}</p>
                        <h4 className="font-serif text-[16px] text-ink mt-1 font-semibold leading-snug">{r.label}</h4>
                        <p className="mt-3 font-serif text-primary text-[17px] font-semibold">{r.price}</p>
                      </div>
                    ))}
                  </div>
                  {tour.roomNote && (
                    <p className="mt-4 text-[13px] text-ink/65 leading-[1.95] italic">{tour.roomNote}</p>
                  )}
                </>
              ) : (
                <div className="mt-6 rounded-[6px] border border-border/70 bg-cream p-5">
                  <p className="text-[11px] tracking-[0.2em] uppercase text-ink/55">{T.tourRate}</p>
                  <p className="mt-1 font-serif text-primary text-[20px] font-semibold">{tour.price}</p>
                </div>
              )}
              {tour.gratuity && (
                <p className="mt-4 text-[13px] text-ink/70">
                  <span className="text-ink/55">{T.gratuity}: </span>
                  <span className="text-ink">{tour.gratuity}</span>
                </p>
              )}
            </section>

            {tour.gallery && tour.gallery.length > 0 && (
              <section>
                <p className="font-marker text-primary/80 text-sm tracking-[0.25em] uppercase">— {T.galleryEyebrow}</p>
                <h2 className="font-serif text-3xl text-ink mt-3 font-semibold">{T.gallery}</h2>
                <div className="mt-7">
                  <TourGallery images={tour.gallery} title={tour.title} />
                </div>
              </section>
            )}

            <section className="grid md:grid-cols-3 gap-8">
              {[
                { t: T.included, items: tour.included },
                { t: T.notIncluded, items: tour.notIncluded ?? [] },
                { t: T.optional, items: tour.optional ?? [] },
              ].filter((b) => b.items.length > 0).map((b) => (
                <div key={b.t}>
                  <h3 className="font-serif text-lg text-ink font-semibold">{b.t}</h3>
                  <div className="mt-3 h-px w-8 bg-primary/40" />
                  <ul className="mt-4 space-y-2.5 text-[13.5px] text-ink/70 leading-[1.85]">
                    {b.items.map((x) => <li key={x} className="pl-4 relative before:content-['·'] before:absolute before:left-0 before:text-primary">{x}</li>)}
                  </ul>
                </div>
              ))}
            </section>

            {tour.notes.length > 0 && (
              <section>
                <p className="font-marker text-primary/80 text-sm tracking-[0.25em] uppercase">— {T.notesEyebrow}</p>
                <h2 className="font-serif text-3xl text-ink mt-3 font-semibold">{T.notes}</h2>
                <ul className="mt-5 space-y-3 text-[14px] text-ink/70 leading-[1.95]">
                  {tour.notes.map((n) => (
                    <li key={n} className="pl-4 relative before:content-['·'] before:absolute before:left-0 before:text-primary">{n}</li>
                  ))}
                </ul>
              </section>
            )}

            {tour.faq && tour.faq.length > 0 && (
              <section>
                <p className="font-marker text-primary/80 text-sm tracking-[0.25em] uppercase">— faq</p>
                <h2 className="font-serif text-3xl text-ink mt-3 font-semibold">{T.faq}</h2>
                <div className="mt-6 space-y-3">
                  {tour.faq.map((f) => (
                    <details key={f.q} className="group rounded-2xl bg-[var(--sand)] px-6 py-4 open:bg-cream open:shadow-[0_10px_30px_-18px_rgba(60,80,70,0.3)] border border-border/60">
                      <summary className="flex items-center justify-between cursor-pointer list-none gap-6">
                        <span className="font-serif text-[15.5px] text-ink">{f.q}</span>
                        <span className="text-primary text-xl group-open:rotate-45 transition shrink-0">+</span>
                      </summary>
                      <p className="mt-3 text-ink/65 leading-[1.95] text-[14px]">{f.a}</p>
                    </details>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* RIGHT — sticky booking */}
          <aside className="hidden lg:block lg:col-span-4">
            <div className="sticky top-[110px]">
              <BookingWidget tour={tour} />
            </div>
          </aside>
        </div>
      </div>

      {/* Mobile sticky bottom CTA */}
      <div className="lg:hidden sticky bottom-0 z-40 bg-cream/95 backdrop-blur border-t border-border px-5 py-3 flex items-center justify-between gap-3 shadow-[0_-10px_30px_-15px_rgba(60,80,70,0.3)]">
        <div>
          <p className="text-[10.5px] text-ink/55 tracking-[0.2em] uppercase">From</p>
          <p className="font-serif text-primary text-lg font-semibold leading-tight">{tour.price}</p>
        </div>
        <a
          href="#m-booking-form"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById("m-booking-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
          }}
          className="flex-1 text-center rounded-full bg-primary text-primary-foreground py-3 text-[14px] tracking-wide"
        >
          Book now →
        </a>
      </div>
    </SiteLayout>
  );
}
