import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SiteLayout } from "@/components/site/Layout";
import heroIcefield from "@/assets/tour-icefield.webp";
import bgMoraine from "@/assets/hero-bg-moraine.webp";
import destJasper from "@/assets/dest-jasper.jpg";
import heroBanff from "@/assets/hero-banff.jpg";
import heroMountains from "@/assets/hero-mountains.jpg";
import tourRockies from "@/assets/tour-rockies.webp";

export const Route = createFileRoute("/icefields-parkway-jasper-banff-shuttle-tours")({
  head: () => ({
    meta: [
      { title: "Icefields Parkway, Jasper, Banff & Maligne Lake Shuttle Tours — Shooting Star Travel" },
      {
        name: "description",
        content:
          "Flexible sightseeing shuttles between Banff, Jasper, Hinton, the Columbia Icefield, Medicine Lake, and Maligne Lake. Weekday-based routes, optional attraction tickets, and clear pickup options.",
      },
      { property: "og:title", content: "Icefields Parkway, Jasper, Banff & Maligne Lake Shuttle Tours" },
      {
        property: "og:description",
        content:
          "Weekday-based Rockies shuttles between Banff, Jasper, Hinton, Columbia Icefield and Maligne Lake — with optional add-ons and a clear estimated total before you book.",
      },
      { property: "og:image", content: heroIcefield },
    ],
  }),
  component: IcefieldsShuttlePage,
});

/* ------------------------------------------------------------------
 * Data
 * ------------------------------------------------------------------ */

type ProductId = "P1" | "P2A" | "P2B" | "P3A" | "P3B" | "P4";
type AddOnId = "CBI" | "CRUISE" | "HINTON_ONE" | "HINTON_ROUND";
type Weekday = "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" | "Sun";

const WEEKDAY_LABEL: Record<Weekday, string> = {
  Mon: "Monday",
  Tue: "Tuesday",
  Wed: "Wednesday",
  Thu: "Thursday",
  Fri: "Friday",
  Sat: "Saturday",
  Sun: "Sunday",
};

const PRODUCTS: Record<
  ProductId,
  {
    id: ProductId;
    name: string;
    short: string;
    days: Weekday[];
    direction: string;
    time: string;
    durationHrs: string;
    adult: number;
    child: number;
    childAvailable: boolean;
    addOns: AddOnId[];
    bestFor: string;
    schedule: string[];
    daysLabel: string;
    accent: "north" | "split" | "south";
  }
> = {
  P1: {
    id: "P1",
    name: "Banff to Jasper Sightseeing Shuttle",
    short: "Northbound full-day sightseeing along the Icefields Parkway.",
    days: ["Mon", "Fri"],
    daysLabel: "Mon / Fri",
    direction: "Banff → Jasper",
    time: "08:00 – 17:10 (18:30 with Hinton)",
    durationHrs: "~9 hours",
    adult: 200,
    child: 140,
    childAvailable: true,
    addOns: ["CBI", "HINTON_ONE", "HINTON_ROUND"],
    bestFor: "Sightseeing transfer from Banff to Jasper",
    schedule: [
      "08:00 — Moxy Banff Hotel pickup",
      "08:03 — Best Western pickup",
      "08:10 — Mountain Royal pickup",
      "17:10 — Jasper Train Station drop-off",
      "18:30 — Hinton drop-off (with extension)",
    ],
    accent: "north",
  },
  P2A: {
    id: "P2A",
    name: "Jasper & Maligne Lake Spirit Island Day Tour",
    short: "Jasper-based day tour to Medicine Lake and Maligne Lake.",
    days: ["Tue", "Sat"],
    daysLabel: "Tue / Sat",
    direction: "Hinton / Jasper → Maligne Lake → Jasper",
    time: "09:20 – 16:40",
    durationHrs: "~5 hours",
    adult: 160,
    child: 160,
    childAvailable: false,
    addOns: ["CRUISE"],
    bestFor: "Jasper and Spirit Island day tour",
    schedule: [
      "09:20 — Hinton pickup",
      "10:30 – 11:20 — Jasper Town / Pyramid Lake",
      "11:40 — Jasper Station pickup",
      "12:20 – 12:50 — Medicine Lake stop",
      "13:20 – 15:30 — Maligne Lake / Spirit Island core experience",
      "16:40 — Jasper Station drop-off",
    ],
    accent: "split",
  },
  P2B: {
    id: "P2B",
    name: "Jasper to Banff Express Shuttle",
    short: "Evening southbound express shuttle, no sightseeing stops.",
    days: ["Tue", "Sat"],
    daysLabel: "Tue / Sat",
    direction: "Jasper → Banff",
    time: "17:00 – 22:00",
    durationHrs: "~5 hours",
    adult: 130,
    child: 130,
    childAvailable: false,
    addOns: [],
    bestFor: "Evening Jasper to Banff transfer",
    schedule: [
      "16:40 — Jasper Station boarding / connection",
      "17:00 — Depart Jasper",
      "Mid-route restroom stop only (no pickup/drop-off)",
      "21:30 — Mountain Royal Hotel or selected Banff town hotel drop-off",
      "22:00 — Estimated final route completion",
    ],
    accent: "split",
  },
  P3A: {
    id: "P3A",
    name: "Banff to Jasper Express Shuttle",
    short: "Morning northbound express shuttle, restroom stop only.",
    days: ["Tue", "Sat"],
    daysLabel: "Tue / Sat",
    direction: "Banff → Jasper",
    time: "08:00 – 13:00",
    durationHrs: "~5 hours",
    adult: 130,
    child: 130,
    childAvailable: false,
    addOns: ["HINTON_ONE", "HINTON_ROUND"],
    bestFor: "Fast Banff to Jasper transfer",
    schedule: [
      "08:00 — Moxy Banff Hotel pickup",
      "08:03 — Best Western pickup",
      "08:10 — Mountain Royal pickup",
      "Mid-route restroom stop only",
      "13:00 — Jasper Station drop-off",
    ],
    accent: "split",
  },
  P3B: {
    id: "P3B",
    name: "Jasper Medicine Lake & Maligne Lake Half-Day Tour",
    short: "Afternoon Jasper-based half-day lake sightseeing.",
    days: ["Tue", "Sat"],
    daysLabel: "Tue / Sat",
    direction: "Jasper → Medicine Lake → Maligne Lake → Jasper",
    time: "13:00 – 18:00",
    durationHrs: "~5 hours",
    adult: 160,
    child: 160,
    childAvailable: false,
    addOns: ["CRUISE", "HINTON_ONE", "HINTON_ROUND"],
    bestFor: "Half-day lake sightseeing",
    schedule: [
      "13:00 — Jasper Station pickup",
      "13:30 – 14:30 — Medicine Lake stop",
      "15:00 – 17:00 — Maligne Lake cruise / core lake experience",
      "18:00 — Jasper Station drop-off",
    ],
    accent: "split",
  },
  P4: {
    id: "P4",
    name: "Icefields Parkway Southbound Sightseeing Shuttle",
    short: "Southbound full-day sightseeing along the Icefields Parkway.",
    days: ["Wed", "Sun"],
    daysLabel: "Wed / Sun",
    direction: "Jasper → Banff",
    time: "09:00 – 18:50",
    durationHrs: "~10 hours",
    adult: 220,
    child: 160,
    childAvailable: true,
    addOns: ["CBI", "HINTON_ONE", "HINTON_ROUND"],
    bestFor: "Southbound Icefields Parkway sightseeing",
    schedule: [
      "07:50 — Hinton pickup (with add-on)",
      "09:00 — Jasper Station pickup",
      "09:30 – 10:10 — Athabasca Falls",
      "11:10 – 14:40 — Columbia Icefield Centre",
      "15:40 – 17:00 — Peyto Lake",
      "17:10 – 17:40 — Bow Lake",
      "18:50 — Mountain Royal Hotel or selected Banff town hotel drop-off",
    ],
    accent: "south",
  },
};

const ADDONS: Record<
  AddOnId,
  { id: AddOnId; name: string; adult: number; child: number; perPerson: boolean; label: string }
> = {
  CBI: { id: "CBI", name: "Columbia Icefield Ice Explorer", adult: 90, child: 60, perPerson: false, label: "Adult +$90 / Child +$60" },
  CRUISE: { id: "CRUISE", name: "Maligne Lake Cruise", adult: 100, child: 70, perPerson: false, label: "Adult +$100 / Child +$70" },
  HINTON_ONE: { id: "HINTON_ONE", name: "Hinton Extension — One-way", adult: 20, child: 20, perPerson: true, label: "+$20 per person" },
  HINTON_ROUND: { id: "HINTON_ROUND", name: "Hinton Extension — Round-trip", adult: 35, child: 35, perPerson: true, label: "+$35 per person" },
};

const PICKUPS = [
  "Moxy Banff Hotel (08:00)",
  "Best Western Banff (08:03)",
  "Mountain Royal Banff (08:10)",
  "Jasper Train Station",
  "Hinton (add-on required)",
];

const DROPOFFS = [
  "Jasper Train Station",
  "Mountain Royal Banff",
  "Selected Banff town hotel",
  "Hinton (add-on required)",
];

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

/* ------------------------------------------------------------------
 * Helpers
 * ------------------------------------------------------------------ */

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

function IcefieldsShuttlePage() {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <SiteLayout>
      <Hero scrollTo={scrollTo} />
      <QuickRouteFinder />
      <WhyDifferent />
      <RouteOverview />
      <DetailedRoutes />
      <BookingEstimator />
      <ComparisonTable />
      <AddOnsSection />
      <PickupNotes />
      <IncludedSection />
      <TravelNotes />
      <BookingTerms />
      <FinalCTA scrollTo={scrollTo} />
    </SiteLayout>
  );
}

/* ------------------------------------------------------------------
 * Hero
 * ------------------------------------------------------------------ */

function Hero({ scrollTo }: { scrollTo: (id: string) => void }) {
  const badges = [
    "Banff ⇄ Jasper Routes",
    "Columbia Icefield Option",
    "Maligne Lake Cruise Option",
    "Hinton Extension Available",
    "Weekday-Based Departures",
  ];

  const cards = [
    {
      day: "Mon / Fri",
      title: "Banff → Jasper sightseeing shuttle",
      from: "From $200 adult / $140 child",
      accent: "north" as const,
    },
    {
      day: "Tue / Sat",
      title: "Split-segment Jasper, Maligne Lake & Banff routes",
      from: "From $130 per segment",
      accent: "split" as const,
    },
    {
      day: "Wed / Sun",
      title: "Jasper → Banff sightseeing shuttle",
      from: "From $220 adult / $160 child",
      accent: "south" as const,
    },
  ];

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
        <div className="lg:col-span-7 text-cream [text-shadow:0_2px_22px_rgba(0,0,0,0.85)]">
          <p className="font-marker text-cream text-[13px] tracking-[0.3em] uppercase">
            — Canadian Rockies · Shuttle &amp; Sightseeing
          </p>
          <h1 className="mt-4 font-serif text-[36px] md:text-[54px] leading-[1.05] font-semibold">
            Icefields Parkway, Jasper, Banff &amp; Maligne Lake Shuttle Tours
          </h1>
          <p className="mt-5 max-w-xl text-cream/95 text-[15.5px] leading-[1.95]">
            Flexible sightseeing shuttles between Banff, Jasper, Hinton, the Columbia Icefield,
            Medicine Lake, and Maligne Lake — with weekday-based routes, optional attraction
            tickets, and clear pickup and drop-off options.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <button
              onClick={() => scrollTo("reserve")}
              className="rounded-full bg-cream text-ink px-7 py-3.5 text-[14px] tracking-wide hover:bg-cream/90 transition shadow-[0_10px_30px_-10px_rgba(0,0,0,0.4)]"
            >
              Reserve Your Route →
            </button>
            <button
              onClick={() => scrollTo("compare")}
              className="rounded-full border border-cream/70 text-cream px-7 py-3.5 text-[14px] tracking-wide hover:bg-cream/15 transition backdrop-blur-sm"
            >
              Compare Route Options
            </button>
          </div>
          <div className="mt-9 flex flex-wrap gap-x-5 gap-y-2 text-[12px] text-cream/90 tracking-[0.15em] uppercase">
            {badges.map((b) => (
              <span key={b} className="inline-flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-cream/80" /> {b}
              </span>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="rounded-2xl bg-cream/95 backdrop-blur p-6 md:p-7 border border-cream/40 shadow-[0_30px_70px_-20px_rgba(0,0,0,0.45)]">
            <p className="font-marker text-primary text-[12px] tracking-[0.25em] uppercase">
              — Choose by Travel Day
            </p>
            <h3 className="mt-2 font-serif text-[22px] text-ink font-semibold">
              Pick your travel day
            </h3>
            <div className="mt-4 space-y-2">
              {cards.map((c) => (
                <button
                  key={c.day}
                  onClick={() => scrollTo("finder")}
                  className="w-full text-left rounded-xl border border-border bg-cream hover:border-primary/40 px-4 py-3 transition"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-[11px] tracking-[0.2em] uppercase text-ink/55">
                        {c.day}
                      </p>
                      <p className="mt-0.5 font-serif text-[15px] text-ink font-semibold">
                        {c.title}
                      </p>
                    </div>
                    <DayDot accent={c.accent} />
                  </div>
                  <p className="mt-1 text-[12.5px] text-ink/65">{c.from}</p>
                </button>
              ))}
            </div>
            <button
              onClick={() => scrollTo("reserve")}
              className="mt-5 w-full rounded-full bg-primary text-primary-foreground py-3 text-[14px] tracking-wide hover:bg-primary/90 transition"
            >
              Continue to Booking →
            </button>
            <p className="mt-3 text-[11px] text-ink/55 text-center leading-relaxed">
              Weekend surcharge: base fares automatically add $20 per person on Friday, Saturday,
              and Sunday.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function DayDot({ accent }: { accent: "north" | "split" | "south" }) {
  const cls =
    accent === "north"
      ? "bg-emerald-500"
      : accent === "south"
        ? "bg-amber-500"
        : "bg-sky-500";
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

function QuickRouteFinder() {
  const [day, setDay] = useState<Weekday>("Mon");
  const productIds = PRODUCTS_BY_DAY[day];

  return (
    <section id="finder" className="py-20 md:py-24 bg-paper/50">
      <div className="mx-auto max-w-[1200px] px-5 md:px-10">
        <p className="font-marker text-primary/80 text-sm tracking-[0.25em] uppercase">— Quick Route Finder</p>
        <h2 className="mt-3 font-serif text-3xl md:text-[40px] text-ink font-semibold">
          Find the Right Route by Your Travel Day
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
              {WEEKDAY_LABEL[d]}
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
            Thursday
          </button>
        </div>

        <div className="mt-8">
          {productIds.length === 0 ? (
            <div className="rounded-2xl border border-border/70 bg-cream p-6 text-ink/70 text-[14.5px] leading-[1.9]">
              No scheduled route is currently available for Thursday. Please choose Monday, Tuesday,
              Wednesday, Friday, Saturday, or Sunday.
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {productIds.map((pid) => {
                const p = PRODUCTS[pid];
                return (
                  <article
                    key={pid}
                    className="rounded-2xl border border-border/70 bg-cream p-6 flex flex-col"
                  >
                    <AccentBadge accent={p.accent}>{p.daysLabel}</AccentBadge>
                    <h3 className="mt-3 font-serif text-[19px] text-ink font-semibold leading-snug">
                      {p.name}
                    </h3>
                    <p className="mt-2 text-[13.5px] text-ink/65 leading-[1.85]">{p.short}</p>

                    <dl className="mt-4 space-y-2 text-[13px] text-ink/75 border-t border-border/60 pt-4">
                      <Row k="Direction" v={p.direction} />
                      <Row k="Time" v={p.time} />
                      <Row k="Duration" v={p.durationHrs} />
                      <Row
                        k="From"
                        v={
                          p.childAvailable
                            ? `$${p.adult} adult / $${p.child} child`
                            : `$${p.adult} per person`
                        }
                      />
                    </dl>

                    {p.addOns.length > 0 && (
                      <div className="mt-4 text-[12px] text-ink/55 tracking-[0.15em] uppercase">
                        Optional:&nbsp;
                        <span className="text-ink/70 normal-case tracking-normal">
                          {Array.from(
                            new Set(
                              p.addOns.map((a) =>
                                a === "HINTON_ONE" || a === "HINTON_ROUND"
                                  ? "Hinton extension"
                                  : ADDONS[a].name,
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
 * Why
 * ------------------------------------------------------------------ */

function WhyDifferent() {
  const items = [
    {
      t: "Weekday-Based Routes",
      d: "Different routes operate on different days, so guests can choose the schedule that matches their travel plan.",
    },
    {
      t: "Shuttle + Sightseeing Options",
      d: "Some products are direct transfers while others include major scenic stops like the Columbia Icefield, Medicine Lake, Peyto Lake, Bow Lake, and Maligne Lake.",
    },
    {
      t: "Flexible Segment Booking",
      d: "Tuesday and Saturday products can be booked as single segments or combined into a full-day travel plan.",
    },
    {
      t: "Optional Attraction Tickets",
      d: "Guests can add Columbia Icefield Ice Explorer or Maligne Lake Cruise tickets directly in the booking estimate.",
    },
  ];
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-[1100px] px-5 md:px-10">
        <p className="font-marker text-primary/80 text-sm tracking-[0.25em] uppercase">— Why this route is different</p>
        <h2 className="mt-3 font-serif text-3xl md:text-[40px] text-ink font-semibold leading-[1.15] max-w-3xl">
          A Smarter Way to Travel Between Banff, Jasper, Hinton &amp; the Icefields Parkway
        </h2>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map((f, i) => (
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
 * Route Overview
 * ------------------------------------------------------------------ */

function RouteOverview() {
  const groups = [
    {
      img: heroBanff,
      accent: "north" as const,
      day: "Mon / Fri",
      title: "Banff → Jasper Sightseeing Shuttle",
      dur: "Approx. 9 hours",
      bestFor:
        "Travelers moving from Banff to Jasper who want scenic sightseeing stops and an optional Columbia Icefield experience.",
      lines: [
        ["Base Fare", "Adult $200 / Child $140"],
        ["CBI Ice Explorer", "Adult +$90 / Child +$60"],
        ["Hinton Extension", "One-way +$20 / Round-trip +$35"],
        ["Pickup", "08:00 Moxy Banff · 08:03 Best Western · 08:10 Mountain Royal"],
        ["Drop-off", "17:10 Jasper Station · 18:30 Hinton (with extension)"],
      ],
    },
    {
      img: destJasper,
      accent: "split" as const,
      day: "Tue / Sat",
      title: "Split-Segment Products",
      dur: "Flexible 5-hour segments",
      bestFor:
        "Travelers who need flexible Jasper, Banff, Hinton, and Maligne Lake combinations across the day.",
      lines: [
        ["2A — Jasper / Maligne Lake Day Tour", "09:20 – 16:40 · $160 / person · Cruise +$100/$70"],
        ["2B — Jasper → Banff Express", "17:00 – 22:00 · $130 / person"],
        ["3A — Banff → Jasper Express", "08:00 – 13:00 · $130 / person · Hinton +$20/$35"],
        ["3B — Medicine Lake & Maligne Half-Day", "13:00 – 18:00 · $160 / person · Cruise +$100/$70"],
      ],
    },
    {
      img: bgMoraine,
      accent: "south" as const,
      day: "Wed / Sun",
      title: "Jasper → Banff Southbound Sightseeing",
      dur: "Approx. 10 hours",
      bestFor:
        "Travelers moving from Jasper to Banff with the major Icefields Parkway sightseeing stops.",
      lines: [
        ["Base Fare", "Adult $220 / Child $160"],
        ["CBI Ice Explorer", "Adult +$90 / Child +$60"],
        ["Hinton Pickup", "One-way +$20 / Round-trip +$35"],
        ["Pickup", "07:50 Hinton (add-on) · 09:00 Jasper Station"],
        ["Drop-off", "18:50 Mountain Royal or selected Banff town hotel"],
      ],
    },
  ];

  return (
    <section className="py-20 md:py-24 bg-paper/40">
      <div className="mx-auto max-w-[1240px] px-5 md:px-10">
        <p className="font-marker text-primary/80 text-sm tracking-[0.25em] uppercase">— Route overview</p>
        <h2 className="mt-3 font-serif text-3xl md:text-[40px] text-ink font-semibold">
          Route Overview by Departure Day
        </h2>

        <div className="mt-10 grid lg:grid-cols-3 gap-6">
          {groups.map((g) => (
            <article
              key={g.title}
              className="flex flex-col rounded-2xl border border-border/70 bg-cream overflow-hidden shadow-[0_20px_50px_-30px_rgba(60,80,70,0.35)]"
            >
              <div className="relative h-48 overflow-hidden">
                <img src={g.img} alt={g.title} className="absolute inset-0 h-full w-full object-cover" />
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

/* ------------------------------------------------------------------
 * Detailed Routes (accordion)
 * ------------------------------------------------------------------ */

function DetailedRoutes() {
  const [open, setOpen] = useState<ProductId>("P1");
  const ids: ProductId[] = ["P1", "P2A", "P2B", "P3A", "P3B", "P4"];

  return (
    <section className="py-20 md:py-24">
      <div className="mx-auto max-w-[1100px] px-5 md:px-10">
        <p className="font-marker text-primary/80 text-sm tracking-[0.25em] uppercase">— Detailed itinerary</p>
        <h2 className="mt-3 font-serif text-3xl md:text-[40px] text-ink font-semibold">
          Detailed Route Sections
        </h2>

        <div className="mt-10 space-y-3">
          {ids.map((pid) => {
            const p = PRODUCTS[pid];
            const isOpen = open === pid;
            return (
              <div key={pid} className="rounded-2xl border border-border/70 bg-cream overflow-hidden">
                <button
                  onClick={() => setOpen(isOpen ? ("" as ProductId) : pid)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <div className="flex items-center gap-3 flex-wrap">
                    <AccentBadge accent={p.accent}>{p.daysLabel}</AccentBadge>
                    <span className="font-serif text-[17px] text-ink font-semibold">{p.name}</span>
                  </div>
                  <span className="text-ink/50 text-xl shrink-0">{isOpen ? "−" : "+"}</span>
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 pt-0 grid md:grid-cols-2 gap-6 border-t border-border/60">
                    <div>
                      <p className="text-[11px] tracking-[0.2em] uppercase text-ink/55">Schedule</p>
                      <ul className="mt-2 space-y-1.5 text-[13.5px] text-ink/75 leading-[1.85]">
                        {p.schedule.map((s) => (
                          <li
                            key={s}
                            className="pl-3 relative before:content-['·'] before:absolute before:left-0 before:text-primary"
                          >
                            {s}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-[11px] tracking-[0.2em] uppercase text-ink/55">Pricing</p>
                      <ul className="mt-2 space-y-1.5 text-[13.5px] text-ink/75 leading-[1.85]">
                        <li>Direction: {p.direction}</li>
                        <li>Time: {p.time}</li>
                        <li>Duration: {p.durationHrs}</li>
                        <li>
                          Base fare:&nbsp;
                          {p.childAvailable ? `Adult $${p.adult} / Child $${p.child}` : `$${p.adult} per person`}
                        </li>
                        {p.addOns.length > 0 && (
                          <li>
                            Add-ons:&nbsp;
                            {Array.from(
                              new Set(
                                p.addOns.map((a) =>
                                  a === "HINTON_ONE" || a === "HINTON_ROUND"
                                    ? "Hinton extension (+$20 one-way / +$35 round-trip)"
                                    : `${ADDONS[a].name} (${ADDONS[a].label})`,
                                ),
                              ),
                            ).join(" · ")}
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------
 * Booking Estimator
 * ------------------------------------------------------------------ */

type Selection = {
  productId: ProductId;
  addOns: Partial<Record<AddOnId, boolean>>;
};

function BookingEstimator() {
  const [date, setDate] = useState<string>("");
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [pickup, setPickup] = useState(PICKUPS[0]);
  const [dropoff, setDropoff] = useState(DROPOFFS[0]);
  const [selections, setSelections] = useState<Record<ProductId, Selection | undefined>>({} as any);

  const weekday = weekdayFromISO(date);
  const availableIds = weekday ? PRODUCTS_BY_DAY[weekday] : [];
  const allowMulti = weekday === "Tue" || weekday === "Sat";
  const isWeekend = weekday ? WEEKEND.includes(weekday) : false;

  const selectedList = availableIds
    .map((id) => selections[id])
    .filter((s): s is Selection => !!s);

  const directionalWarning = useMemo(() => {
    const dirs = selectedList.map((s) => PRODUCTS[s.productId].direction);
    const hasNorth = dirs.some((d) => d.startsWith("Banff →"));
    const hasSouth = dirs.some((d) => d.startsWith("Jasper → Banff"));
    return hasNorth && hasSouth;
  }, [selectedList]);

  const comboLabel = useMemo(() => {
    const ids = selectedList.map((s) => s.productId).sort();
    if (ids.length === 2 && ids.includes("P2A") && ids.includes("P2B"))
      return "Full Day Jasper / Maligne Lake / Banff Combination";
    if (ids.length === 2 && ids.includes("P3A") && ids.includes("P3B"))
      return "Full Day Banff / Jasper / Maligne Lake Combination";
    return null;
  }, [selectedList]);

  const toggleProduct = (id: ProductId) => {
    setSelections((prev) => {
      const exists = !!prev[id];
      if (exists) {
        const next = { ...prev };
        delete next[id];
        return next;
      }
      if (!allowMulti) {
        // single-select on non-Tue/Sat
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
      // One-way and Round-trip Hinton are mutually exclusive
      if (!cur && aid === "HINTON_ONE") nextAdds.HINTON_ROUND = false;
      if (!cur && aid === "HINTON_ROUND") nextAdds.HINTON_ONE = false;
      return { ...prev, [pid]: { ...sel, addOns: nextAdds } };
    });
  };

  // Pricing
  const lineItems: { label: string; amount: number }[] = [];
  let subtotal = 0;

  selectedList.forEach((s) => {
    const p = PRODUCTS[s.productId];
    const adultBase = p.adult * adults;
    const childBase = p.childAvailable ? p.child * children : p.adult * children;
    const baseTotal = adultBase + childBase;
    lineItems.push({
      label: `${p.name} — base (${adults} adult${adults !== 1 ? "s" : ""}${children ? `, ${children} child${children !== 1 ? "ren" : ""}` : ""})`,
      amount: baseTotal,
    });
    subtotal += baseTotal;

    if (isWeekend) {
      const surcharge = 20 * (adults + children);
      lineItems.push({ label: `${p.name} — weekend surcharge (+$20/person)`, amount: surcharge });
      subtotal += surcharge;
    }

    p.addOns.forEach((aid) => {
      if (!s.addOns[aid]) return;
      const a = ADDONS[aid];
      const amount = a.perPerson
        ? (a.adult) * (adults + children)
        : a.adult * adults + a.child * children;
      lineItems.push({ label: `${p.name} — ${a.name}`, amount });
      subtotal += amount;
    });
  });

  const gst = +(subtotal * 0.05).toFixed(2);
  const total = +(subtotal + gst).toFixed(2);

  return (
    <section id="reserve" className="py-20 md:py-28 bg-paper/50">
      <div className="mx-auto max-w-[1240px] px-5 md:px-10">
        <p className="font-marker text-primary/80 text-sm tracking-[0.25em] uppercase">— Reserve</p>
        <h2 className="mt-3 font-serif text-3xl md:text-[40px] text-ink font-semibold">
          Reserve Your Route
        </h2>
        <p className="mt-4 max-w-2xl text-ink/70 text-[15px] leading-[1.95]">
          Select your travel date, guests, route, and any add-ons. We will calculate an estimated
          total. Final availability, pickup timing, attraction ticket availability, and payment
          will be confirmed by Shooting Star Travel.
        </p>

        <div className="mt-10 grid lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3 rounded-2xl bg-cream border border-border/70 p-6 md:p-8 space-y-6">
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Departure Date">
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
                    Detected: {WEEKDAY_LABEL[weekday]}
                    {isWeekend ? " · weekend surcharge applies" : ""}
                  </p>
                )}
              </Field>
              <Field label="Guests">
                <div className="flex gap-3">
                  <CounterInput label="Adults" value={adults} setValue={setAdults} min={1} />
                  <CounterInput label="Children" value={children} setValue={setChildren} min={0} />
                </div>
              </Field>
              <Field label="Pickup Location">
                <select
                  value={pickup}
                  onChange={(e) => setPickup(e.target.value)}
                  className="w-full rounded-md border border-border bg-cream px-3 py-2.5 text-[14px] text-ink"
                >
                  {PICKUPS.map((p) => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </Field>
              <Field label="Drop-off Location">
                <select
                  value={dropoff}
                  onChange={(e) => setDropoff(e.target.value)}
                  className="w-full rounded-md border border-border bg-cream px-3 py-2.5 text-[14px] text-ink"
                >
                  {DROPOFFS.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </Field>
            </div>

            <div>
              <p className="text-[11px] tracking-[0.2em] uppercase text-ink/55">Available products</p>
              {!date && (
                <div className="mt-3 rounded-xl border border-dashed border-border bg-paper/40 p-5 text-[14px] text-ink/60">
                  Select a departure date to see available routes.
                </div>
              )}
              {date && weekday === "Thu" && (
                <div className="mt-3 rounded-xl border border-amber-200 bg-amber-50 p-5 text-[14px] text-amber-900 leading-[1.8]">
                  No scheduled route is currently available for Thursday. Please choose Monday,
                  Tuesday, Wednesday, Friday, Saturday, or Sunday.
                </div>
              )}
              {date && availableIds.length > 0 && (
                <div className="mt-3 space-y-3">
                  {availableIds.map((pid) => {
                    const p = PRODUCTS[pid];
                    const sel = selections[pid];
                    return (
                      <div
                        key={pid}
                        className={`rounded-xl border p-4 transition ${
                          sel ? "border-primary bg-primary/5" : "border-border bg-cream"
                        }`}
                      >
                        <label className="flex items-start gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={!!sel}
                            onChange={() => toggleProduct(pid)}
                            className="mt-1"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="font-serif text-[15px] text-ink font-semibold">
                                {p.name}
                              </span>
                              <AccentBadge accent={p.accent}>{p.daysLabel}</AccentBadge>
                            </div>
                            <p className="mt-1 text-[12.5px] text-ink/60">
                              {p.direction} · {p.time} ·{" "}
                              {p.childAvailable
                                ? `Adult $${p.adult} / Child $${p.child}`
                                : `$${p.adult} per person`}
                            </p>
                          </div>
                        </label>

                        {sel && p.addOns.length > 0 && (
                          <div className="mt-4 ml-7 space-y-2">
                            <p className="text-[11px] tracking-[0.2em] uppercase text-ink/55">Add-ons</p>
                            {p.addOns.map((aid) => {
                              const a = ADDONS[aid];
                              return (
                                <label key={aid} className="flex items-center gap-2 text-[13.5px] text-ink/75">
                                  <input
                                    type="checkbox"
                                    checked={!!sel.addOns[aid]}
                                    onChange={() => toggleAddOn(pid, aid)}
                                  />
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
                    <p className="text-[12px] text-ink/55">Single product per booking on this day.</p>
                  )}
                  {allowMulti && (
                    <p className="text-[12px] text-ink/55">
                      Tuesday and Saturday allow combining segments (e.g. 2A + 2B or 3A + 3B).
                    </p>
                  )}
                </div>
              )}
            </div>

            {comboLabel && (
              <div className="rounded-xl border border-primary/30 bg-primary/5 p-4 text-[13.5px] text-ink/80">
                {comboLabel}
              </div>
            )}
            {directionalWarning && (
              <div className="rounded-xl border border-amber-300 bg-amber-50 p-4 text-[13.5px] text-amber-900">
                Please confirm your travel direction. Some selected segments may overlap or conflict.
              </div>
            )}
          </div>

          {/* Summary */}
          <div className="lg:col-span-2">
            <div className="lg:sticky lg:top-6 rounded-2xl bg-ink text-cream p-6 md:p-7 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.45)]">
              <p className="font-marker text-cream/70 text-[11px] tracking-[0.25em] uppercase">
                — Estimated Total
              </p>
              <h3 className="mt-2 font-serif text-[22px] font-semibold">Order Summary</h3>

              <dl className="mt-5 space-y-2 text-[13px] text-cream/85 border-t border-cream/15 pt-4">
                <Row2 k="Date" v={date || "—"} />
                <Row2 k="Day" v={weekday ? WEEKDAY_LABEL[weekday] : "—"} />
                <Row2 k="Adults" v={String(adults)} />
                <Row2 k="Children" v={String(children)} />
                <Row2 k="Pickup" v={pickup} />
                <Row2 k="Drop-off" v={dropoff} />
              </dl>

              <div className="mt-5 border-t border-cream/15 pt-4 space-y-2 text-[13px]">
                {lineItems.length === 0 ? (
                  <p className="text-cream/60">No products selected yet.</p>
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
                  <span className="text-cream/70">Subtotal</span>
                  <span>{fmt(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-cream/70">GST (5%)</span>
                  <span>{fmt(gst)}</span>
                </div>
                <div className="flex justify-between font-serif text-[20px] font-semibold pt-2">
                  <span>Estimated Total</span>
                  <span>{fmt(total)}</span>
                </div>
              </div>

              <button
                disabled={selectedList.length === 0 || !date}
                className="mt-6 w-full rounded-full bg-cream text-ink py-3 text-[14px] tracking-wide hover:bg-cream/90 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue to Booking →
              </button>
              <p className="mt-3 text-[11.5px] text-cream/60 leading-relaxed">
                Final availability, pickup timing, attraction ticket availability, and payment will
                be confirmed by Shooting Star Travel.
              </p>
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

function CounterInput({
  label,
  value,
  setValue,
  min,
}: {
  label: string;
  value: number;
  setValue: (n: number) => void;
  min: number;
}) {
  return (
    <div className="flex-1 rounded-md border border-border bg-cream px-3 py-2 flex items-center justify-between">
      <span className="text-[12px] text-ink/60">{label}</span>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setValue(Math.max(min, value - 1))}
          className="h-6 w-6 rounded-full border border-border text-ink/70 leading-none"
        >
          −
        </button>
        <span className="w-5 text-center text-[14px]">{value}</span>
        <button
          type="button"
          onClick={() => setValue(value + 1)}
          className="h-6 w-6 rounded-full border border-border text-ink/70 leading-none"
        >
          +
        </button>
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

function ComparisonTable() {
  const rows: { id: ProductId; addons: string }[] = [
    { id: "P1", addons: "CBI · Hinton" },
    { id: "P2A", addons: "Maligne Lake Cruise" },
    { id: "P2B", addons: "None" },
    { id: "P3A", addons: "Hinton extension" },
    { id: "P3B", addons: "Cruise · Hinton" },
    { id: "P4", addons: "CBI · Hinton pickup" },
  ];

  return (
    <section id="compare" className="py-20 md:py-24">
      <div className="mx-auto max-w-[1240px] px-5 md:px-10">
        <p className="font-marker text-primary/80 text-sm tracking-[0.25em] uppercase">— Compare</p>
        <h2 className="mt-3 font-serif text-3xl md:text-[40px] text-ink font-semibold">
          Side-by-Side Comparison
        </h2>

        <div className="mt-10 hidden md:block overflow-hidden rounded-2xl border border-border/70 bg-cream">
          <table className="w-full text-[13.5px] text-ink/80">
            <thead className="bg-paper/60 text-[11.5px] tracking-[0.18em] uppercase text-ink/60">
              <tr>
                {["Product", "Days", "Direction", "Time", "Base Fare", "Add-ons", "Best For"].map((h) => (
                  <th key={h} className="text-left px-4 py-4 font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map(({ id, addons }, i) => {
                const p = PRODUCTS[id];
                return (
                  <tr key={id} className={i % 2 ? "bg-paper/30" : ""}>
                    <td className="px-4 py-4 font-serif text-ink font-semibold align-top max-w-[220px]">{p.name}</td>
                    <td className="px-4 py-4 align-top">{p.daysLabel}</td>
                    <td className="px-4 py-4 align-top">{p.direction}</td>
                    <td className="px-4 py-4 align-top">{p.time}</td>
                    <td className="px-4 py-4 align-top text-primary font-semibold">
                      {p.childAvailable ? `$${p.adult} / $${p.child}` : `$${p.adult} pp`}
                    </td>
                    <td className="px-4 py-4 align-top">{addons}</td>
                    <td className="px-4 py-4 align-top">{p.bestFor}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="mt-8 grid gap-4 md:hidden">
          {rows.map(({ id, addons }) => {
            const p = PRODUCTS[id];
            return (
              <div key={id} className="rounded-2xl border border-border/70 bg-cream p-5">
                <AccentBadge accent={p.accent}>{p.daysLabel}</AccentBadge>
                <h3 className="mt-2 font-serif text-[16px] text-ink font-semibold">{p.name}</h3>
                <div className="mt-3 grid grid-cols-2 gap-y-2 text-[13px] text-ink/75">
                  <span className="text-ink/55">Direction</span><span>{p.direction}</span>
                  <span className="text-ink/55">Time</span><span>{p.time}</span>
                  <span className="text-ink/55">Base Fare</span>
                  <span className="text-primary font-semibold">
                    {p.childAvailable ? `$${p.adult} / $${p.child}` : `$${p.adult} pp`}
                  </span>
                  <span className="text-ink/55">Add-ons</span><span>{addons}</span>
                  <span className="text-ink/55">Best For</span><span>{p.bestFor}</span>
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
 * Add-ons
 * ------------------------------------------------------------------ */

function AddOnsSection() {
  const cards = [
    {
      t: "Columbia Icefield Ice Explorer",
      on: "Available on Product 1 and Product 4",
      price: "Adult +$90 / Child +$60",
    },
    {
      t: "Maligne Lake Cruise",
      on: "Available on Product 2A and Product 3B",
      price: "Adult +$100 / Child +$70",
    },
    {
      t: "Hinton Extension",
      on: "Available on Product 1, 3A, 3B, and 4",
      price: "One-way +$20 / Round-trip +$35 per person",
    },
  ];
  return (
    <section className="py-20 md:py-24 bg-paper/40">
      <div className="mx-auto max-w-[1100px] px-5 md:px-10">
        <p className="font-marker text-primary/80 text-sm tracking-[0.25em] uppercase">— Optional add-ons</p>
        <h2 className="mt-3 font-serif text-3xl md:text-[40px] text-ink font-semibold">
          Optional Add-ons &amp; Pricing Rules
        </h2>

        <div className="mt-10 grid md:grid-cols-3 gap-5">
          {cards.map((c) => (
            <div key={c.t} className="rounded-2xl border border-border/70 bg-cream p-6">
              <h3 className="font-serif text-[18px] text-ink font-semibold">{c.t}</h3>
              <p className="mt-2 text-[13px] text-ink/60">{c.on}</p>
              <p className="mt-4 font-serif text-primary text-[18px] font-semibold">{c.price}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 text-[13px] text-ink/55 italic">
          Add-ons are calculated per guest and follow adult / child pricing where applicable.
        </p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------
 * Pickup notes
 * ------------------------------------------------------------------ */

function PickupNotes() {
  const cards = [
    {
      t: "Banff Pickup",
      lines: [
        "08:00 Moxy Banff Hotel",
        "08:03 Best Western",
        "08:10 Mountain Royal",
        "Mountain Royal or selected Banff town hotels may be used for final drop-off.",
      ],
    },
    {
      t: "Jasper Pickup / Drop-off",
      lines: ["Jasper Station is the main Jasper transfer point for most routes."],
    },
    {
      t: "Hinton",
      lines: [
        "Available only when selected as an add-on.",
        "Some Hinton service may require earlier pickup or later drop-off due to distance.",
      ],
    },
    {
      t: "Restroom Stops",
      lines: [
        "Express shuttle segments may include restroom stops only. These are not sightseeing stops and do not allow passenger pickup or drop-off.",
      ],
    },
  ];
  return (
    <section className="py-20 md:py-24">
      <div className="mx-auto max-w-[1100px] px-5 md:px-10">
        <p className="font-marker text-primary/80 text-sm tracking-[0.25em] uppercase">— Pickup &amp; drop-off</p>
        <h2 className="mt-3 font-serif text-3xl md:text-[40px] text-ink font-semibold">
          Pickup &amp; Drop-off Notes
        </h2>
        <div className="mt-10 grid sm:grid-cols-2 gap-5">
          {cards.map((c) => (
            <div key={c.t} className="rounded-2xl border border-border/70 bg-cream p-6">
              <h3 className="font-serif text-[17px] text-ink font-semibold">{c.t}</h3>
              <ul className="mt-3 space-y-1.5 text-[13.5px] text-ink/70 leading-[1.85]">
                {c.lines.map((l) => (
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

/* ------------------------------------------------------------------
 * Included
 * ------------------------------------------------------------------ */

function IncludedSection() {
  const included = [
    "Comfortable transportation",
    "Scheduled pickup and drop-off based on selected route",
    "Scenic highway transfer",
    "Planned sightseeing stops for sightseeing routes",
    "Route coordination between Banff, Jasper, Hinton, Icefields Parkway, Medicine Lake, and Maligne Lake",
    "Booking support from Shooting Star Travel",
  ];
  const notIncluded = [
    "5% GST",
    "Meals and drinks",
    "Personal expenses",
    "Guide gratuity",
    "Parks Canada Discovery Pass",
    "Optional attraction tickets unless selected as add-ons",
    "Travel insurance",
    "Hotel accommodation",
  ];

  return (
    <section className="py-20 md:py-24 bg-paper/40">
      <div className="mx-auto max-w-[1100px] px-5 md:px-10">
        <p className="font-marker text-primary/80 text-sm tracking-[0.25em] uppercase">— What's included</p>
        <h2 className="mt-3 font-serif text-3xl md:text-[40px] text-ink font-semibold">
          What's Included &amp; Not Included
        </h2>

        <div className="mt-10 grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-border/70 bg-cream p-6">
            <h3 className="font-serif text-[18px] text-ink font-semibold">Included</h3>
            <ul className="mt-4 space-y-2 text-[14px] text-ink/75 leading-[1.85]">
              {included.map((i) => (
                <li key={i} className="pl-5 relative before:content-['✓'] before:absolute before:left-0 before:text-emerald-600">
                  {i}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-border/70 bg-cream p-6">
            <h3 className="font-serif text-[18px] text-ink font-semibold">Not Included</h3>
            <ul className="mt-4 space-y-2 text-[14px] text-ink/75 leading-[1.85]">
              {notIncluded.map((i) => (
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

/* ------------------------------------------------------------------
 * FAQ
 * ------------------------------------------------------------------ */

function TravelNotes() {
  const items = [
    {
      q: "Do I need a Parks Canada Discovery Pass?",
      a: "Yes. Guests entering Banff or Jasper National Park may need a valid Parks Canada pass. The pass is not included in the listed tour fare unless specifically stated.",
    },
    {
      q: "Are Columbia Icefield and Maligne Lake Cruise tickets included?",
      a: "No. They are optional add-ons. Columbia Icefield Ice Explorer and Maligne Lake Cruise tickets are only included if selected during booking and confirmed by Shooting Star Travel.",
    },
    {
      q: "Can I book only one segment on Tuesday or Saturday?",
      a: "Yes. Tuesday and Saturday routes are split into independent segments. You can book one segment only or combine compatible segments for a full-day travel plan.",
    },
    {
      q: "Why do Friday, Saturday, and Sunday cost more?",
      a: "A $20 per person weekend surcharge is automatically added to base fares on Friday, Saturday, and Sunday. The surcharge applies to the selected route or segment base fare only.",
    },
    {
      q: "Are times guaranteed?",
      a: "Times are planned estimates. Mountain weather, road conditions, traffic, attraction schedules, and operational needs may affect timing.",
    },
    {
      q: "Can I choose a custom hotel pickup?",
      a: "Some routes use fixed pickup points. Banff and Jasper hotel pickup may be limited. Final pickup details will be confirmed after booking.",
    },
    {
      q: "Is this a guided hiking tour?",
      a: "No. This is a sightseeing shuttle and transfer product. Guests may have free time at selected stops, but hiking guidance is not included.",
    },
  ];
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="py-20 md:py-24">
      <div className="mx-auto max-w-[900px] px-5 md:px-10">
        <p className="font-marker text-primary/80 text-sm tracking-[0.25em] uppercase">— Travel notes</p>
        <h2 className="mt-3 font-serif text-3xl md:text-[40px] text-ink font-semibold">
          Important Travel Notes
        </h2>
        <div className="mt-10 space-y-2">
          {items.map((it, i) => (
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

/* ------------------------------------------------------------------
 * Booking Terms
 * ------------------------------------------------------------------ */

function BookingTerms() {
  const blocks = [
    {
      t: "Booking & Payment",
      d: "Final seat availability, route availability, attraction ticket availability, and payment instructions will be confirmed by Shooting Star Travel.",
    },
    {
      t: "Cancellation",
      d: "Cancellation and refund terms are subject to Shooting Star Travel's official booking policy. Guests should confirm all details before payment.",
    },
    {
      t: "Itinerary Adjustment",
      d: "Shooting Star Travel may adjust pickup time, routing, stop order, or sightseeing time due to weather, road conditions, attraction schedules, traffic, or safety concerns.",
    },
    {
      t: "Travel Responsibility",
      d: "Guests are responsible for arriving at pickup points on time, bringing appropriate clothing, purchasing required park passes, and carrying personal travel insurance.",
    },
  ];
  return (
    <section className="py-20 md:py-24 bg-paper/40">
      <div className="mx-auto max-w-[1100px] px-5 md:px-10">
        <p className="font-marker text-primary/80 text-sm tracking-[0.25em] uppercase">— Booking terms</p>
        <h2 className="mt-3 font-serif text-3xl md:text-[40px] text-ink font-semibold">Booking Terms</h2>
        <div className="mt-10 grid md:grid-cols-2 gap-5">
          {blocks.map((b) => (
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

/* ------------------------------------------------------------------
 * Final CTA
 * ------------------------------------------------------------------ */

function FinalCTA({ scrollTo }: { scrollTo: (id: string) => void }) {
  return (
    <section className="relative overflow-hidden bg-ink">
      <img
        src={heroMountains}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
      <img
        src={tourRockies}
        alt=""
        aria-hidden
        className="hidden"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/55 to-ink/30" />
      <div className="relative mx-auto max-w-[1100px] px-5 md:px-10 py-20 md:py-28 text-cream">
        <p className="font-marker text-cream/80 text-[12px] tracking-[0.3em] uppercase">
          — Ready when you are
        </p>
        <h2 className="mt-3 font-serif text-3xl md:text-[44px] font-semibold leading-[1.15] max-w-3xl">
          Travel Between Banff, Jasper, Hinton &amp; the Icefields Parkway Without the Planning
          Stress
        </h2>
        <p className="mt-5 max-w-2xl text-cream/90 text-[15.5px] leading-[1.95]">
          Choose your travel day, select the right route or segment, add optional attraction
          tickets, and get a clear estimated total before booking.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <button
            onClick={() => scrollTo("reserve")}
            className="rounded-full bg-cream text-ink px-7 py-3.5 text-[14px] tracking-wide hover:bg-cream/90 transition"
          >
            Reserve Your Route →
          </button>
          <button
            onClick={() => scrollTo("compare")}
            className="rounded-full border border-cream/70 text-cream px-7 py-3.5 text-[14px] tracking-wide hover:bg-cream/15 transition"
          >
            Compare Route Options
          </button>
        </div>
      </div>
    </section>
  );
}
