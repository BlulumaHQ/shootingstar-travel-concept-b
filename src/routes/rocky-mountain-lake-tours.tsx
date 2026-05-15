import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { useMemo, useState } from "react";
import bgLake from "@/assets/bg-lake-louise.webp";
import tourRockies from "@/assets/tour-rockies.webp";
import tourBanff from "@/assets/tour-banff.webp";
import heroBanff from "@/assets/hero-banff.jpg";

export const Route = createFileRoute("/rocky-mountain-lake-tours")({
  head: () => ({
    meta: [
      { title: "Moraine Lake & Lake Louise Tours from Banff — Shootingstar Travel" },
      {
        name: "description",
        content:
          "Skip the parking stress. Visit Moraine Lake and Lake Louise with a comfortable guided lake tour from Banff — sunrise, half-day, or extended options.",
      },
      { property: "og:title", content: "Moraine Lake & Lake Louise Tours from Banff" },
      {
        property: "og:description",
        content:
          "Choose from sunrise, half-day, or extended lake tours from Banff. No parking stress. Real lake time.",
      },
      { property: "og:image", content: bgLake },
    ],
  }),
  component: LakeToursLandingPage,
});

type TourKey = "halfday" | "sunrise" | "extended";

type TourOption = {
  key: TourKey;
  name: string;
  tag: string;
  short: string;
  price: number; // CAD per person, before GST
  priceLabel: string;
  pickup: string;
  route: string;
  moraineTime: string;
  louiseTime: string;
  departures: { day: string; times: string[] }[];
  times: string[]; // for booking dropdown
  pickupOptions: string[];
  highlights?: string;
  itinerary?: string[];
  bestFor: string;
  img: string;
  cta: string;
};

const TOURS: Record<TourKey, TourOption> = {
  halfday: {
    key: "halfday",
    name: "Rocky Mountains Two Lakes Half-Day Tour",
    tag: "Best for Easy Lake Access",
    short:
      "A simple and scenic half-day tour from Banff to Moraine Lake and Lake Louise, perfect for travelers who want a comfortable lake experience without a full-day commitment.",
    price: 155,
    priceLabel: "$155 CAD + GST / person",
    pickup: "Banff — Mount Royal Hotel parking lot",
    route: "Banff pickup → Moraine Lake → Lake Louise → Return to Banff",
    moraineTime: "2 hours",
    louiseTime: "1 hour",
    departures: [
      { day: "Tuesday & Wednesday", times: ["8:00 AM", "2:00 PM"] },
      { day: "Mon, Thu, Fri, Sat, Sun", times: ["8:00 AM", "9:00 AM", "2:00 PM", "3:00 PM"] },
    ],
    times: ["8:00 AM", "9:00 AM", "2:00 PM", "3:00 PM"],
    pickupOptions: ["Banff — Mount Royal Hotel Parking Lot"],
    bestFor: "Best for simple lake access",
    img: tourBanff,
    cta: "Select Half-Day Tour",
  },
  sunrise: {
    key: "sunrise",
    name: "Moraine Lake Sunrise Tour",
    tag: "Best for Sunrise Photography",
    short:
      "A classic early-morning Rockies experience for travelers who want to catch the first light at Moraine Lake and enjoy extended free time at Lake Louise.",
    price: 225,
    priceLabel: "$225 CAD + GST / person",
    pickup: "Canmore 2:45 AM · Banff 3:15 AM",
    route: "Canmore / Banff pickup → Moraine Lake (sunrise) → Lake Louise → Return",
    moraineTime: "Sunrise — 8:00 AM",
    louiseTime: "3 hours",
    departures: [{ day: "Every Thursday", times: ["Canmore 2:45 AM", "Banff 3:15 AM"] }],
    times: ["Canmore 2:45 AM", "Banff 3:15 AM"],
    pickupOptions: ["Canmore — Sunrise Tour Only", "Banff — Mount Royal Hotel Parking Lot"],
    highlights:
      "Arrive early at Moraine Lake to secure a beautiful sunrise viewing experience over the Valley of the Ten Peaks.",
    itinerary: [
      "Arrive at Moraine Lake and wait for sunrise.",
      "Depart Moraine Lake at 8:00 AM.",
      "Continue to Lake Louise for 3 hours of free time.",
      "Walk along the lakeshore or, if physically able, explore short self-guided trails such as Fairview Lookout.",
      "Depart Lake Louise at 11:00 AM and return to Banff.",
    ],
    bestFor: "Best for sunrise photography",
    img: heroBanff,
    cta: "Select Sunrise Tour",
  },
  extended: {
    key: "extended",
    name: "Two Lakes Extended Exploration Tour",
    tag: "Best for Longer Free Time",
    short:
      "A deeper lake experience with longer free time at both Moraine Lake and Lake Louise — ideal for guests who want to explore, walk, hike, and take photos at a slower pace.",
    price: 200,
    priceLabel: "$200 CAD + GST / person",
    pickup: "Banff — Mount Royal Hotel parking lot",
    route: "Banff pickup → Moraine Lake (3.5h) → Lake Louise (4h) → Return",
    moraineTime: "3.5 hours",
    louiseTime: "4 hours",
    departures: [{ day: "Every Tuesday", times: ["6:30 AM"] }],
    times: ["Banff 6:30 AM"],
    pickupOptions: ["Banff — Mount Royal Hotel Parking Lot"],
    highlights: "Avoid peak crowds and enjoy extended time at both lakes.",
    itinerary: [
      "Moraine Lake: stay 3.5 hours. Depart at 11:00 AM for Lake Louise.",
      "Free time options at Moraine: lakeside views, photography, canoe rental, or self-guided routes such as Consolation Lakes if physically able.",
      "Lake Louise: stay 4 hours.",
      "Free time options at Lake Louise: lakeshore walk, relax near the water, or a self-guided trail such as Lake Agnes Tea House if physically able.",
    ],
    bestFor: "Best for deeper exploration",
    img: tourRockies,
    cta: "Select Extended Tour",
  },
};

const TOUR_LIST: TourOption[] = [TOURS.halfday, TOURS.sunrise, TOURS.extended];

function LakeToursLandingPage() {
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

  return (
    <SiteLayout>
      {/* HERO */}
      <section className="relative overflow-hidden bg-ink">
        <img
          src={bgLake}
          alt="Moraine Lake in the Canadian Rockies"
          className="absolute inset-0 h-full w-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-ink/30 to-ink/60" />
        <div className="relative mx-auto max-w-[1240px] px-5 md:px-10 py-20 md:py-32 grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 text-cream">
            <p className="font-marker text-cream/85 text-[13px] tracking-[0.3em] uppercase">
              — Banff · Lake Tours
            </p>
            <h1 className="mt-4 font-serif text-[40px] md:text-[58px] leading-[1.05] font-semibold">
              Moraine Lake & Lake Louise,
              <br /> Made Easy
            </h1>
            <p className="mt-5 max-w-xl text-cream/85 text-[15.5px] leading-[1.95]">
              Choose from sunrise, half-day, or extended lake tours designed for travelers who
              want the beauty of the Rockies without the stress of driving, parking, or shuttle
              planning.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <button
                onClick={() => scrollTo("reserve")}
                className="rounded-full bg-cream text-ink px-7 py-3.5 text-[14px] tracking-wide hover:bg-cream/90 transition shadow-[0_10px_30px_-10px_rgba(0,0,0,0.4)]"
              >
                Book Your Lake Tour →
              </button>
              <button
                onClick={() => scrollTo("compare")}
                className="rounded-full border border-cream/60 text-cream px-7 py-3.5 text-[14px] tracking-wide hover:bg-cream/10 transition"
              >
                Compare Tour Options
              </button>
            </div>
            <div className="mt-9 flex flex-wrap gap-x-5 gap-y-2 text-[12px] text-cream/80 tracking-[0.15em] uppercase">
              {[
                "Banff Pickup Available",
                "Moraine Lake Access",
                "Lake Louise Included",
                "Small-Group Style Tour",
              ].map((b) => (
                <span key={b} className="inline-flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-cream/70" /> {b}
                </span>
              ))}
            </div>
          </div>

          {/* Hero booking card preview */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl bg-cream/95 backdrop-blur p-6 md:p-7 border border-cream/40 shadow-[0_30px_70px_-20px_rgba(0,0,0,0.45)]">
              <p className="font-marker text-primary text-[12px] tracking-[0.25em] uppercase">
                — Quick Reserve
              </p>
              <h3 className="mt-2 font-serif text-[22px] text-ink font-semibold">
                Pick your lake tour
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
                Continue to Booking →
              </button>
              <p className="mt-3 text-[11px] text-ink/50 text-center">
                * Online booking integration coming soon.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 1 — WHY */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-[1100px] px-5 md:px-10">
          <p className="font-marker text-primary/80 text-sm tracking-[0.25em] uppercase">— why book this tour</p>
          <h2 className="mt-3 font-serif text-3xl md:text-[40px] text-ink font-semibold leading-[1.15] max-w-3xl">
            The Rockies Are Beautiful. Getting There Can Be Complicated.
          </h2>
          <div className="mt-6 max-w-3xl space-y-5 text-ink/75 text-[15.5px] leading-[1.95]">
            <p>
              Moraine Lake and Lake Louise are two of the most famous destinations in the Canadian
              Rockies, but parking, shuttle access, early morning traffic, and changing seasonal
              rules can make planning stressful.
            </p>
            <p>
              Our lake tours are designed to make the experience simple. Choose your preferred
              schedule, meet at the pickup point, and enjoy a comfortable ride to the lakes with
              time to explore at your own pace.
            </p>
          </div>

          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                t: "No Parking Stress",
                d: "Avoid the hassle of finding parking near the lakes.",
              },
              {
                t: "Banff Pickup",
                d: "Convenient pickup from Banff at the Mount Royal Hotel parking area.",
              },
              {
                t: "Flexible Tour Styles",
                d: "Choose from a half-day lake visit, sunrise tour, or extended lake exploration.",
              },
              {
                t: "More Time at the Lakes",
                d: "Enjoy meaningful free time instead of rushing through a quick photo stop.",
              },
            ].map((f, i) => (
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

      {/* SECTION 2 — TOUR OPTIONS */}
      <section className="py-16 md:py-24 bg-paper/60">
        <div className="mx-auto max-w-[1240px] px-5 md:px-10">
          <p className="font-marker text-primary/80 text-sm tracking-[0.25em] uppercase">— tour options</p>
          <h2 className="mt-3 font-serif text-3xl md:text-[40px] text-ink font-semibold">
            Choose Your Lake Day
          </h2>

          <div className="mt-10 grid lg:grid-cols-3 gap-6">
            {TOUR_LIST.map((t) => (
              <article
                key={t.key}
                className="flex flex-col rounded-2xl border border-border/70 bg-cream overflow-hidden shadow-[0_20px_50px_-30px_rgba(60,80,70,0.35)]"
              >
                <div className="relative h-52 overflow-hidden">
                  <img src={t.img} alt={t.name} className="h-full w-full object-cover" />
                  <span className="absolute top-4 left-4 rounded-full bg-cream/95 text-ink px-3 py-1 text-[11px] tracking-[0.2em] uppercase">
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
                      <dt className="text-ink/55">Price</dt>
                      <dd className="text-primary font-serif font-semibold">{t.priceLabel}</dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt className="text-ink/55">Pickup</dt>
                      <dd className="text-right">{t.pickup}</dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt className="text-ink/55">Moraine Lake</dt>
                      <dd>{t.moraineTime}</dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt className="text-ink/55">Lake Louise</dt>
                      <dd>{t.louiseTime}</dd>
                    </div>
                  </dl>

                  <div className="mt-5 text-[12.5px] text-ink/70 leading-[1.85] space-y-1.5">
                    <p className="text-[11px] tracking-[0.2em] uppercase text-ink/55">Departures</p>
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
                        Itinerary
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

                  <p className="mt-5 text-[12px] text-ink/55 italic">
                    Suggested guide gratuity: $15 CAD / person
                  </p>

                  <button
                    onClick={() => handleSelectTour(t.key)}
                    className="mt-6 w-full rounded-full bg-primary text-primary-foreground py-3 text-[13.5px] tracking-wide hover:bg-primary/90 transition"
                  >
                    {t.cta} →
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3 — COMPARISON */}
      <section id="compare" className="py-20 md:py-28">
        <div className="mx-auto max-w-[1240px] px-5 md:px-10">
          <p className="font-marker text-primary/80 text-sm tracking-[0.25em] uppercase">— compare</p>
          <h2 className="mt-3 font-serif text-3xl md:text-[40px] text-ink font-semibold">
            Side-by-Side Comparison
          </h2>

          {/* Desktop table */}
          <div className="mt-10 hidden md:block overflow-hidden rounded-2xl border border-border/70 bg-cream">
            <table className="w-full text-[13.5px] text-ink/80">
              <thead className="bg-paper/60 text-[11.5px] tracking-[0.18em] uppercase text-ink/60">
                <tr>
                  {[
                    "Tour",
                    "Best For",
                    "Price",
                    "Pickup",
                    "Departure",
                    "Moraine Lake",
                    "Lake Louise",
                  ].map((h) => (
                    <th key={h} className="text-left px-5 py-4 font-medium">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {TOUR_LIST.map((t, i) => (
                  <tr
                    key={t.key}
                    className={i % 2 ? "bg-paper/30" : ""}
                  >
                    <td className="px-5 py-5 font-serif text-ink font-semibold align-top max-w-[220px]">
                      {t.name}
                    </td>
                    <td className="px-5 py-5 align-top">{t.bestFor}</td>
                    <td className="px-5 py-5 align-top text-primary font-semibold">
                      ${t.price} CAD + GST
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
                  <span className="text-ink/55">Price</span>
                  <span className="text-primary font-semibold">${t.price} CAD + GST</span>
                  <span className="text-ink/55">Pickup</span>
                  <span>{t.pickup}</span>
                  <span className="text-ink/55">Moraine</span>
                  <span>{t.moraineTime}</span>
                  <span className="text-ink/55">Lake Louise</span>
                  <span>{t.louiseTime}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4 — FAKE BOOKING / CHECKOUT */}
      <section id="reserve" className="py-20 md:py-28 bg-paper/50">
        <div className="mx-auto max-w-[1100px] px-5 md:px-10">
          <p className="font-marker text-primary/80 text-sm tracking-[0.25em] uppercase">— reserve</p>
          <h2 className="mt-3 font-serif text-3xl md:text-[40px] text-ink font-semibold">
            Reserve Your Lake Tour
          </h2>
          <p className="mt-4 max-w-2xl text-ink/70 text-[15px] leading-[1.95]">
            Select your tour option, pickup location, departure time, and number of guests. Online
            booking integration will be connected soon.
          </p>

          <div className="mt-10 grid lg:grid-cols-5 gap-6">
            {/* Form */}
            <div className="lg:col-span-3 rounded-2xl bg-cream border border-border/70 p-6 md:p-8 space-y-6 shadow-[0_20px_50px_-30px_rgba(60,80,70,0.35)]">
              <Field label="Select Tour">
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

              <Field label="Select Date">
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full rounded-md border border-border bg-cream px-3 py-3 text-[14px]"
                />
              </Field>

              <div className="grid sm:grid-cols-2 gap-5">
                <Field label="Pickup Location">
                  <select
                    value={pickup}
                    onChange={(e) => setPickup(e.target.value)}
                    className="w-full rounded-md border border-border bg-cream px-3 py-3 text-[14px]"
                  >
                    {tour.pickupOptions.map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label="Departure Time">
                  <select
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full rounded-md border border-border bg-cream px-3 py-3 text-[14px]"
                  >
                    {tour.times.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </Field>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <Stepper label="Adults" value={adults} setValue={setAdults} min={1} />
                <Stepper label="Children" value={children} setValue={setChildren} min={0} />
              </div>
            </div>

            {/* Summary */}
            <div className="lg:col-span-2">
              <div className="sticky top-28 rounded-2xl bg-cream border-2 border-primary/30 p-6 shadow-[0_20px_50px_-30px_rgba(60,80,70,0.4)]">
                <p className="font-marker text-primary text-[12px] tracking-[0.25em] uppercase">
                  — order summary
                </p>
                <h3 className="mt-2 font-serif text-[20px] text-ink font-semibold">
                  {tour.name}
                </h3>
                <div className="mt-4 space-y-2 text-[13.5px] text-ink/75">
                  <Row label="Date" value={date || "—"} />
                  <Row label="Pickup" value={pickup} />
                  <Row label="Time" value={time} />
                  <Row label="Guests" value={`${adults} adult${adults !== 1 ? "s" : ""}${children ? `, ${children} child${children !== 1 ? "ren" : ""}` : ""}`} />
                </div>

                <div className="mt-5 border-t border-border pt-4 space-y-2 text-[14px]">
                  <Row
                    label={`Tour × ${guests}`}
                    value={`$${subtotal.toFixed(2)} CAD`}
                  />
                  <Row label="GST (5%)" value={`$${gst.toFixed(2)} CAD`} />
                  <div className="flex justify-between items-end pt-2 border-t border-border/60">
                    <span className="text-ink/55 text-[12px] tracking-[0.18em] uppercase">
                      Estimated Total
                    </span>
                    <span className="font-serif text-primary text-[24px] font-semibold">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                  <p className="text-[11.5px] text-ink/55 italic pt-1">
                    Suggested guide gratuity of $15 CAD / person not included.
                  </p>
                </div>

                <button
                  onClick={() => setModalOpen(true)}
                  className="mt-6 w-full rounded-full bg-primary text-primary-foreground py-3.5 text-[14px] tracking-wide hover:bg-primary/90 transition"
                >
                  Continue to Booking →
                </button>
                <p className="mt-3 text-[11.5px] text-ink/50 text-center leading-[1.7]">
                  Final availability and payment will be confirmed through our official booking
                  system.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5 — INCLUDED / NOT INCLUDED */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-[1100px] px-5 md:px-10">
          <p className="font-marker text-primary/80 text-sm tracking-[0.25em] uppercase">— what's included</p>
          <h2 className="mt-3 font-serif text-3xl md:text-[40px] text-ink font-semibold">
            What's Included
          </h2>
          <div className="mt-10 grid md:grid-cols-2 gap-8">
            <IncludeBlock
              title="Included"
              tone="primary"
              items={[
                "Comfortable transportation",
                "Banff pickup for selected tours",
                "Canmore pickup for sunrise tour",
                "Moraine Lake visit",
                "Lake Louise visit",
                "Planned lake access schedule",
                "Free time at selected stops",
              ]}
            />
            <IncludeBlock
              title="Not Included"
              tone="muted"
              items={[
                "5% GST",
                "Meals and drinks",
                "Personal expenses",
                "Canoe rental",
                "Optional self-guided hikes",
                "Suggested guide gratuity of $15 CAD / person",
              ]}
            />
          </div>
        </div>
      </section>

      {/* SECTION 6 — FAQ */}
      <section className="py-20 md:py-28 bg-paper/50">
        <div className="mx-auto max-w-[900px] px-5 md:px-10">
          <p className="font-marker text-primary/80 text-sm tracking-[0.25em] uppercase">— travel notes</p>
          <h2 className="mt-3 font-serif text-3xl md:text-[40px] text-ink font-semibold">
            Important Travel Notes
          </h2>
          <div className="mt-10 space-y-3">
            {FAQS.map((f, i) => (
              <FaqItem key={i} q={f.q} a={f.a} />
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7 — FINAL CTA */}
      <section className="relative overflow-hidden py-24 md:py-32 bg-ink text-cream">
        <img
          src={bgLake}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-30"
        />
        <div className="relative mx-auto max-w-[900px] px-5 md:px-10 text-center">
          <p className="font-marker text-cream/80 text-[13px] tracking-[0.3em] uppercase">
            — ready when you are
          </p>
          <h2 className="mt-4 font-serif text-3xl md:text-[44px] font-semibold leading-[1.15]">
            See Moraine Lake & Lake Louise Without the Stress
          </h2>
          <p className="mt-5 text-cream/80 text-[15.5px] leading-[1.95] max-w-2xl mx-auto">
            Choose the tour style that fits your travel pace, from a simple half-day visit to a
            sunrise experience or a longer lake exploration day.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 justify-center">
            <button
              onClick={() => scrollTo("reserve")}
              className="rounded-full bg-cream text-ink px-7 py-3.5 text-[14px] tracking-wide hover:bg-cream/90 transition"
            >
              Reserve Your Lake Tour →
            </button>
            <button
              onClick={() => scrollTo("compare")}
              className="rounded-full border border-cream/60 text-cream px-7 py-3.5 text-[14px] tracking-wide hover:bg-cream/10 transition"
            >
              Compare Tour Options
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
            From ${tour.price} CAD
          </p>
        </div>
        <button
          onClick={() => scrollTo("reserve")}
          className="rounded-full bg-primary text-primary-foreground px-5 py-3 text-[13px] tracking-wide whitespace-nowrap"
        >
          Book Lake Tour →
        </button>
      </div>
      <div className="lg:hidden h-20" aria-hidden />

      {/* Coming-soon modal */}
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
              — booking system
            </p>
            <h3 className="mt-2 font-serif text-[24px] text-ink font-semibold leading-snug">
              Booking system coming soon.
            </h3>
            <p className="mt-3 text-[14.5px] text-ink/70 leading-[1.9]">
              Please contact Shooting Star Travel to reserve this tour. Our team will confirm
              availability and walk you through the booking.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <a
                href="/contact"
                className="flex-1 rounded-full bg-primary text-primary-foreground py-3 text-[14px] tracking-wide text-center hover:bg-primary/90 transition"
              >
                Contact Us to Book →
              </a>
              <button
                onClick={() => setModalOpen(false)}
                className="rounded-full border border-border text-ink/70 px-5 py-3 text-[13px] hover:bg-paper transition"
              >
                Close
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
          aria-label={`Decrease ${label}`}
        >
          −
        </button>
        <span className="w-10 text-center text-[15px] font-serif">{value}</span>
        <button
          type="button"
          onClick={() => setValue(Math.min(20, value + 1))}
          className="px-4 py-2.5 text-ink/70 hover:text-primary"
          aria-label={`Increase ${label}`}
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
  items: string[];
  tone: "primary" | "muted";
}) {
  return (
    <div className="rounded-2xl border border-border/70 bg-cream p-6 md:p-8">
      <h3 className="font-serif text-[20px] text-ink font-semibold">{title}</h3>
      <div
        className={`mt-3 h-px w-10 ${tone === "primary" ? "bg-primary/60" : "bg-ink/30"}`}
      />
      <ul className="mt-5 space-y-2.5 text-[14px] text-ink/75 leading-[1.9]">
        {items.map((it) => (
          <li
            key={it}
            className={`pl-5 relative ${
              tone === "primary"
                ? "before:content-['✓'] before:absolute before:left-0 before:text-primary"
                : "before:content-['×'] before:absolute before:left-0 before:text-ink/40"
            }`}
          >
            {it}
          </li>
        ))}
      </ul>
    </div>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-xl border border-border/70 bg-cream overflow-hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-4 text-left px-5 py-4 hover:bg-paper/40 transition"
      >
        <span className="font-serif text-[16px] text-ink font-semibold">{q}</span>
        <span
          className={`text-primary text-xl transition-transform ${open ? "rotate-45" : ""}`}
        >
          +
        </span>
      </button>
      {open && (
        <div className="px-5 pb-5 -mt-1 text-[14px] text-ink/70 leading-[1.95]">{a}</div>
      )}
    </div>
  );
}

const FAQS = [
  {
    q: "Is Moraine Lake access guaranteed?",
    a: "Moraine Lake access is subject to seasonal road rules, park regulations, weather, and operational conditions. The tour is designed to follow the available access schedule as closely as possible.",
  },
  {
    q: "Where is the Banff pickup point?",
    a: "The Banff pickup point is the Mount Royal Hotel parking lot.",
  },
  {
    q: "Is this a guided hiking tour?",
    a: "No. This is a lake access and sightseeing tour. Guests will have free time at the lakes. Any walking or hiking activities are self-guided and optional.",
  },
  {
    q: "Can I hike during the free time?",
    a: "Yes, guests who are physically able may choose to explore nearby self-guided routes during free time. Suggested routes include Fairview Lookout, Consolation Lakes, or Lake Agnes Tea House depending on the selected tour and available time. Guests are responsible for returning to the pickup point on time.",
  },
  {
    q: "Are meals included?",
    a: "No. Meals and drinks are not included. Guests should bring snacks, water, and any food needed during the tour.",
  },
  {
    q: "What should I bring?",
    a: "Bring layered clothing, comfortable walking shoes, water, snacks, a camera, sun protection, and a warm jacket for early morning departures.",
  },
  {
    q: "Is the sunrise tour very early?",
    a: "Yes. The sunrise tour departs early in order to reach Moraine Lake before sunrise and give guests the best chance to enjoy the morning light over the Valley of the Ten Peaks.",
  },
  {
    q: "Is gratuity included?",
    a: "No. Suggested guide gratuity is $15 CAD per person.",
  },
];
