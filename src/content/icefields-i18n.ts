import type { Locale } from "@/i18n/locale";

export type ProductId = "P1" | "P2A" | "P2B" | "P3A" | "P3B" | "P4";
export type AddOnId = "CBI" | "CRUISE" | "HINTON_ONE" | "HINTON_ROUND";
export type Weekday = "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" | "Sun";

type Product = {
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
};

type AddOn = {
  id: AddOnId;
  name: string;
  adult: number;
  child: number;
  perPerson: boolean;
  label: string;
};

type RouteOverviewGroup = {
  day: string;
  title: string;
  dur: string;
  bestFor: string;
  lines: [string, string][];
  accent: "north" | "split" | "south";
};

export type IcefieldsContent = {
  weekdayLabel: Record<Weekday, string>;
  weekdayShort: Record<Weekday, string>;
  products: Record<ProductId, Product>;
  addOns: Record<AddOnId, AddOn>;
  pickups: string[];
  dropoffs: string[];
  meta: {
    title: string;
    description: string;
    ogTitle: string;
    ogDescription: string;
  };
  hero: {
    eyebrow: string;
    h1: string;
    sub: string;
    ctaReserve: string;
    ctaCompare: string;
    badges: string[];
    sideEyebrow: string;
    sideTitle: string;
    sideCtaContinue: string;
    weekendNote: string;
    cards: { day: string; title: string; from: string; accent: "north" | "split" | "south" }[];
  };
  finder: {
    eyebrow: string;
    heading: string;
    thursdayEmpty: string;
    optional: string;
    hintonExt: string;
  };
  why: { eyebrow: string; heading: string; items: { t: string; d: string }[] };
  overview: { eyebrow: string; heading: string; groups: RouteOverviewGroup[] };
  detailed: {
    eyebrow: string;
    heading: string;
    schedule: string;
    pricing: string;
    direction: string;
    time: string;
    duration: string;
    baseFare: string;
    addOnsLabel: string;
    hintonExtFull: string;
  };
  reserve: {
    eyebrow: string;
    heading: string;
    intro: string;
    departureDate: string;
    guests: string;
    adults: string;
    children: string;
    pickupLoc: string;
    dropoffLoc: string;
    detected: string;
    weekendApplies: string;
    availableProducts: string;
    pickDate: string;
    thursdayWarn: string;
    addOnsLabel: string;
    singlePerBooking: string;
    multiAllowed: string;
    combo2: string;
    combo3: string;
    directionWarn: string;
    estimatedTotal: string;
    orderSummary: string;
    date: string;
    day: string;
    pickup: string;
    dropoff: string;
    noSelection: string;
    subtotal: string;
    gst: string;
    estimatedTotalRow: string;
    continueToBooking: string;
    finalNote: string;
    baseSuffix: string;
    weekendSurcharge: string;
    perPerson: string;
  };
  compare: {
    eyebrow: string;
    heading: string;
    headers: string[];
    rows: { id: ProductId; addons: string }[];
    pp: string;
  };
  addonsSection: {
    eyebrow: string;
    heading: string;
    cards: { t: string; on: string; price: string }[];
    note: string;
  };
  pickupNotes: {
    eyebrow: string;
    heading: string;
    cards: { t: string; lines: string[] }[];
  };
  included: {
    eyebrow: string;
    heading: string;
    includedTitle: string;
    notIncludedTitle: string;
    included: string[];
    notIncluded: string[];
  };
  faq: {
    eyebrow: string;
    heading: string;
    items: { q: string; a: string }[];
  };
  terms: {
    eyebrow: string;
    heading: string;
    blocks: { t: string; d: string }[];
  };
  finalCta: {
    eyebrow: string;
    h2: string;
    sub: string;
    ctaReserve: string;
    ctaCompare: string;
  };
  routeSection: {
    mapEyebrow: string;
    mapTitle: string;
    mapComingSoon: string;
    mapCaption: string;
    timelineEyebrow: string;
    timelineHeading: string;
    stopLabel: string;
    highlightsEyebrow: string;
    highlightsHeading: string;
    highlightImageSoon: string;
    highlights: { name: string; desc: string }[];
  };
  finderV2: {
    eyebrow: string;
    heading: string;
    intro: string;
    groupLabels: { monFri: string; tueSat: string; wedSun: string };
    ctaSelect: string;
    ctaSelected: string;
    bestForLabel: string;
    durationLabel: string;
    addOnsLabel: string;
    segmentTitles: { morning: string; midday: string; evening: string };
    tueSatSummaryTitle: string;
    tueSatSummaryDesc: string;
    selectedTimelineHeading: string;
    showingPrefix: string;
    routeSuffix: string;
    placeholderTitle: string;
    placeholderBody: string;
  };
  bundles: {
    eyebrow: string;
    heading: string;
    intro: string;
    adCopy: string;
    contactCta: string;
    items: { name: string; flow: string[]; tagline: string }[];
  };
};

const WEEKDAY_EN: Record<Weekday, string> = {
  Mon: "Monday", Tue: "Tuesday", Wed: "Wednesday", Thu: "Thursday",
  Fri: "Friday", Sat: "Saturday", Sun: "Sunday",
};
const WEEKDAY_ZH: Record<Weekday, string> = {
  Mon: "週一", Tue: "週二", Wed: "週三", Thu: "週四",
  Fri: "週五", Sat: "週六", Sun: "週日",
};
const WEEKDAY_KO: Record<Weekday, string> = {
  Mon: "월요일", Tue: "화요일", Wed: "수요일", Thu: "목요일",
  Fri: "금요일", Sat: "토요일", Sun: "일요일",
};

const SHORT_EN: Record<Weekday, string> = {
  Mon: "Mon", Tue: "Tue", Wed: "Wed", Thu: "Thu", Fri: "Fri", Sat: "Sat", Sun: "Sun",
};
const SHORT_ZH: Record<Weekday, string> = {
  Mon: "一", Tue: "二", Wed: "三", Thu: "四", Fri: "五", Sat: "六", Sun: "日",
};
const SHORT_KO: Record<Weekday, string> = {
  Mon: "월", Tue: "화", Wed: "수", Thu: "목", Fri: "금", Sat: "토", Sun: "일",
};

const EN: IcefieldsContent = {
  weekdayLabel: WEEKDAY_EN,
  weekdayShort: SHORT_EN,
  products: {
    P1: { id: "P1", name: "Banff to Jasper Sightseeing Shuttle", short: "Northbound full-day sightseeing along the Icefields Parkway.", days: ["Mon", "Fri"], daysLabel: "Mon / Fri", direction: "Banff → Jasper", time: "08:00 – 17:10 (18:30 with Hinton)", durationHrs: "~9 hours", adult: 200, child: 140, childAvailable: true, addOns: ["CBI", "HINTON_ONE", "HINTON_ROUND"], bestFor: "Sightseeing transfer from Banff to Jasper", schedule: ["08:00 — Moxy Banff Hotel pickup","08:03 — Best Western pickup","08:10 — Mountain Royal pickup","17:10 — Jasper Train Station drop-off","18:30 — Hinton drop-off (with extension)"], accent: "north" },
    P2A: { id: "P2A", name: "Jasper & Maligne Lake Spirit Island Day Tour", short: "Jasper-based day tour to Medicine Lake and Maligne Lake.", days: ["Tue", "Sat"], daysLabel: "Tue / Sat", direction: "Hinton / Jasper → Maligne Lake → Jasper", time: "09:20 – 16:40", durationHrs: "~5 hours", adult: 160, child: 160, childAvailable: false, addOns: ["CRUISE"], bestFor: "Jasper and Spirit Island day tour", schedule: ["09:20 — Hinton pickup","10:30 – 11:20 — Jasper Town / Pyramid Lake","11:40 — Jasper Station pickup","12:20 – 12:50 — Medicine Lake stop","13:20 – 15:30 — Maligne Lake / Spirit Island core experience","16:40 — Jasper Station drop-off"], accent: "split" },
    P2B: { id: "P2B", name: "Jasper to Banff Express Shuttle", short: "Evening southbound express shuttle, no sightseeing stops.", days: ["Tue", "Sat"], daysLabel: "Tue / Sat", direction: "Jasper → Banff", time: "17:00 – 22:00", durationHrs: "~5 hours", adult: 130, child: 130, childAvailable: false, addOns: [], bestFor: "Evening Jasper to Banff transfer", schedule: ["16:40 — Jasper Station boarding / connection","17:00 — Depart Jasper","Mid-route restroom stop only (no pickup/drop-off)","21:30 — Mountain Royal Hotel or selected Banff town hotel drop-off","22:00 — Estimated final route completion"], accent: "split" },
    P3A: { id: "P3A", name: "Banff to Jasper Express Shuttle", short: "Morning northbound express shuttle, restroom stop only.", days: ["Tue", "Sat"], daysLabel: "Tue / Sat", direction: "Banff → Jasper", time: "08:00 – 13:00", durationHrs: "~5 hours", adult: 130, child: 130, childAvailable: false, addOns: ["HINTON_ONE", "HINTON_ROUND"], bestFor: "Fast Banff to Jasper transfer", schedule: ["08:00 — Moxy Banff Hotel pickup","08:03 — Best Western pickup","08:10 — Mountain Royal pickup","Mid-route restroom stop only","13:00 — Jasper Station drop-off"], accent: "split" },
    P3B: { id: "P3B", name: "Jasper Medicine Lake & Maligne Lake Half-Day Tour", short: "Afternoon Jasper-based half-day lake sightseeing.", days: ["Tue", "Sat"], daysLabel: "Tue / Sat", direction: "Jasper → Medicine Lake → Maligne Lake → Jasper", time: "13:00 – 18:00", durationHrs: "~5 hours", adult: 160, child: 160, childAvailable: false, addOns: ["CRUISE", "HINTON_ONE", "HINTON_ROUND"], bestFor: "Half-day lake sightseeing", schedule: ["13:00 — Jasper Station pickup","13:30 – 14:30 — Medicine Lake stop","15:00 – 17:00 — Maligne Lake cruise / core lake experience","18:00 — Jasper Station drop-off"], accent: "split" },
    P4: { id: "P4", name: "Icefields Parkway Southbound Sightseeing Shuttle", short: "Southbound full-day sightseeing along the Icefields Parkway.", days: ["Wed", "Sun"], daysLabel: "Wed / Sun", direction: "Jasper → Banff", time: "09:00 – 18:50", durationHrs: "~10 hours", adult: 220, child: 160, childAvailable: true, addOns: ["CBI", "HINTON_ONE", "HINTON_ROUND"], bestFor: "Southbound Icefields Parkway sightseeing", schedule: ["07:50 — Hinton pickup (with add-on)","09:00 — Jasper Station pickup","09:30 – 10:10 — Athabasca Falls","11:10 – 14:40 — Columbia Icefield Centre","15:40 – 17:00 — Peyto Lake","17:10 – 17:40 — Bow Lake","18:50 — Mountain Royal Hotel or selected Banff town hotel drop-off"], accent: "south" },
  },
  addOns: {
    CBI: { id: "CBI", name: "Columbia Icefield Ice Explorer", adult: 90, child: 60, perPerson: false, label: "Adult +$90 / Child +$60" },
    CRUISE: { id: "CRUISE", name: "Maligne Lake Cruise", adult: 100, child: 70, perPerson: false, label: "Adult +$100 / Child +$70" },
    HINTON_ONE: { id: "HINTON_ONE", name: "Hinton Extension — One-way", adult: 20, child: 20, perPerson: true, label: "+$20 per person" },
    HINTON_ROUND: { id: "HINTON_ROUND", name: "Hinton Extension — Round-trip", adult: 35, child: 35, perPerson: true, label: "+$35 per person" },
  },
  pickups: ["Moxy Banff Hotel (08:00)","Best Western Banff (08:03)","Mountain Royal Banff (08:10)","Jasper Train Station","Hinton (add-on required)"],
  dropoffs: ["Jasper Train Station","Mountain Royal Banff","Selected Banff town hotel","Hinton (add-on required)"],
  meta: {
    title: "Icefields Parkway, Jasper, Banff & Maligne Lake Shuttle Tours — Shooting Star Travel",
    description: "Flexible sightseeing shuttles between Banff, Jasper, Hinton, the Columbia Icefield, Medicine Lake, and Maligne Lake. Weekday-based routes, optional attraction tickets, and clear pickup options.",
    ogTitle: "Icefields Parkway, Jasper, Banff & Maligne Lake Shuttle Tours",
    ogDescription: "Weekday-based Rockies shuttles between Banff, Jasper, Hinton, Columbia Icefield and Maligne Lake — with optional add-ons and a clear estimated total before you book.",
  },
  hero: {
    eyebrow: "— Canadian Rockies · Shuttle & Sightseeing",
    h1: "Icefields Parkway, Jasper, Banff & Maligne Lake Shuttle Tours",
    sub: "Flexible sightseeing shuttles between Banff, Jasper, Hinton, the Columbia Icefield, Medicine Lake, and Maligne Lake — with weekday-based routes, optional attraction tickets, and clear pickup and drop-off options.",
    ctaReserve: "Reserve Your Route →",
    ctaCompare: "Compare Route Options",
    badges: ["Banff ⇄ Jasper Routes","Columbia Icefield Option","Maligne Lake Cruise Option","Hinton Extension Available","Weekday-Based Departures"],
    sideEyebrow: "— Choose by Travel Day",
    sideTitle: "Pick your travel day",
    sideCtaContinue: "Continue to Booking →",
    weekendNote: "Weekend surcharge: base fares automatically add $20 per person on Friday, Saturday, and Sunday.",
    cards: [
      { day: "Mon / Fri", title: "Banff → Jasper sightseeing shuttle", from: "From $200 adult / $140 child", accent: "north" },
      { day: "Tue / Sat", title: "Split-segment Jasper, Maligne Lake & Banff routes", from: "From $130 per segment", accent: "split" },
      { day: "Wed / Sun", title: "Jasper → Banff sightseeing shuttle", from: "From $220 adult / $160 child", accent: "south" },
    ],
  },
  finder: {
    eyebrow: "— Quick Route Finder",
    heading: "Find the Right Route by Your Travel Day",
    thursdayEmpty: "No scheduled route is currently available for Thursday. Please choose Monday, Tuesday, Wednesday, Friday, Saturday, or Sunday.",
    optional: "Optional:",
    hintonExt: "Hinton extension",
  },
  why: {
    eyebrow: "— Why this route is different",
    heading: "A Smarter Way to Travel Between Banff, Jasper, Hinton & the Icefields Parkway",
    items: [
      { t: "Weekday-Based Routes", d: "Different routes operate on different days, so guests can choose the schedule that matches their travel plan." },
      { t: "Shuttle + Sightseeing Options", d: "Some products are direct transfers while others include major scenic stops like the Columbia Icefield, Medicine Lake, Peyto Lake, Bow Lake, and Maligne Lake." },
      { t: "Flexible Segment Booking", d: "Tuesday and Saturday products can be booked as single segments or combined into a full-day travel plan." },
      { t: "Optional Attraction Tickets", d: "Guests can add Columbia Icefield Ice Explorer or Maligne Lake Cruise tickets directly in the booking estimate." },
    ],
  },
  overview: {
    eyebrow: "— Route overview",
    heading: "Route Overview by Departure Day",
    groups: [
      { day: "Mon / Fri", title: "Banff → Jasper Sightseeing Shuttle", dur: "Approx. 9 hours", bestFor: "Travelers moving from Banff to Jasper who want scenic sightseeing stops and an optional Columbia Icefield experience.", accent: "north",
        lines: [["Base Fare","Adult $200 / Child $140"],["Columbia Icefield Ice Explorer","Adult +$90 / Child +$60"],["Hinton Extension","One-way +$20 / Round-trip +$35"],["Pickup","08:00 Moxy Banff · 08:03 Best Western · 08:10 Mountain Royal"],["Drop-off","17:10 Jasper Station · 18:30 Hinton (with extension)"]] },
      { day: "Tue / Sat", title: "Split-Segment Products", dur: "Flexible 5-hour segments", bestFor: "Travelers who need flexible Jasper, Banff, Hinton, and Maligne Lake combinations across the day.", accent: "split",
        lines: [["2A — Jasper / Maligne Lake Day Tour","09:20 – 16:40 · $160 / person · Cruise +$100/$70"],["2B — Jasper → Banff Express","17:00 – 22:00 · $130 / person"],["3A — Banff → Jasper Express","08:00 – 13:00 · $130 / person · Hinton +$20/$35"],["3B — Medicine Lake & Maligne Half-Day","13:00 – 18:00 · $160 / person · Cruise +$100/$70"]] },
      { day: "Wed / Sun", title: "Jasper → Banff Southbound Sightseeing", dur: "Approx. 10 hours", bestFor: "Travelers moving from Jasper to Banff with the major Icefields Parkway sightseeing stops.", accent: "south",
        lines: [["Base Fare","Adult $220 / Child $160"],["Columbia Icefield Ice Explorer","Adult +$90 / Child +$60"],["Hinton Pickup","One-way +$20 / Round-trip +$35"],["Pickup","07:50 Hinton (add-on) · 09:00 Jasper Station"],["Drop-off","18:50 Mountain Royal or selected Banff town hotel"]] },
    ],
  },
  detailed: {
    eyebrow: "— Detailed itinerary",
    heading: "Detailed Route Sections",
    schedule: "Schedule",
    pricing: "Pricing",
    direction: "Direction",
    time: "Time",
    duration: "Duration",
    baseFare: "Base fare",
    addOnsLabel: "Add-ons",
    hintonExtFull: "Hinton extension (+$20 one-way / +$35 round-trip)",
  },
  reserve: {
    eyebrow: "— Reserve",
    heading: "Reserve Your Route",
    intro: "Select your travel date, guests, route, and any add-ons. We will calculate an estimated total. Final availability, pickup timing, attraction ticket availability, and payment will be confirmed by Shooting Star Travel.",
    departureDate: "Departure Date",
    guests: "Guests",
    adults: "Adults",
    children: "Children",
    pickupLoc: "Pickup Location",
    dropoffLoc: "Drop-off Location",
    detected: "Detected:",
    weekendApplies: " · weekend surcharge applies",
    availableProducts: "Available products",
    pickDate: "Select a departure date to see available routes.",
    thursdayWarn: "No scheduled route is currently available for Thursday. Please choose Monday, Tuesday, Wednesday, Friday, Saturday, or Sunday.",
    addOnsLabel: "Add-ons",
    singlePerBooking: "Single product per booking on this day.",
    multiAllowed: "Tuesday and Saturday allow combining segments (e.g. 2A + 2B or 3A + 3B).",
    combo2: "Full Day Jasper / Maligne Lake / Banff Combination",
    combo3: "Full Day Banff / Jasper / Maligne Lake Combination",
    directionWarn: "Please confirm your travel direction. Some selected segments may overlap or conflict.",
    estimatedTotal: "— Estimated Total",
    orderSummary: "Order Summary",
    date: "Date",
    day: "Day",
    pickup: "Pickup",
    dropoff: "Drop-off",
    noSelection: "No products selected yet.",
    subtotal: "Subtotal",
    gst: "GST (5%)",
    estimatedTotalRow: "Estimated Total",
    continueToBooking: "Continue to Booking →",
    finalNote: "Final availability, pickup timing, attraction ticket availability, and payment will be confirmed by Shooting Star Travel.",
    baseSuffix: "base",
    weekendSurcharge: "weekend surcharge (+$20/person)",
    perPerson: "per person",
  },
  compare: {
    eyebrow: "— Compare",
    heading: "Side-by-Side Comparison",
    headers: ["Product","Days","Direction","Time","Base Fare","Add-ons","Best For"],
    rows: [
      { id: "P1", addons: "Columbia Icefield · Hinton" },
      { id: "P2A", addons: "Maligne Lake Cruise" },
      { id: "P2B", addons: "None" },
      { id: "P3A", addons: "Hinton extension" },
      { id: "P3B", addons: "Cruise · Hinton" },
      { id: "P4", addons: "Columbia Icefield · Hinton pickup" },
    ],
    pp: "pp",
  },
  addonsSection: {
    eyebrow: "— Optional add-ons",
    heading: "Optional Add-ons & Pricing Rules",
    cards: [
      { t: "Columbia Icefield Ice Explorer", on: "Available on Product 1 and Product 4", price: "Adult +$90 / Child +$60" },
      { t: "Maligne Lake Cruise", on: "Available on Product 2A and Product 3B", price: "Adult +$100 / Child +$70" },
      { t: "Hinton Extension", on: "Available on Product 1, 3A, 3B, and 4", price: "One-way +$20 / Round-trip +$35 per person" },
    ],
    note: "Add-ons are calculated per guest and follow adult / child pricing where applicable.",
  },
  pickupNotes: {
    eyebrow: "— Pickup & drop-off",
    heading: "Pickup & Drop-off Notes",
    cards: [
      { t: "Banff Pickup", lines: ["08:00 Moxy Banff Hotel","08:03 Best Western","08:10 Mountain Royal","Mountain Royal or selected Banff town hotels may be used for final drop-off."] },
      { t: "Jasper Pickup / Drop-off", lines: ["Jasper Station is the main Jasper transfer point for most routes."] },
      { t: "Hinton", lines: ["Available only when selected as an add-on.","Some Hinton service may require earlier pickup or later drop-off due to distance."] },
      { t: "Restroom Stops", lines: ["Express shuttle segments may include restroom stops only. These are not sightseeing stops and do not allow passenger pickup or drop-off."] },
    ],
  },
  included: {
    eyebrow: "— What's included",
    heading: "What's Included & Not Included",
    includedTitle: "Included",
    notIncludedTitle: "Not Included",
    included: ["Comfortable transportation","Scheduled pickup and drop-off based on selected route","Scenic highway transfer","Planned sightseeing stops for sightseeing routes","Route coordination between Banff, Jasper, Hinton, Icefields Parkway, Medicine Lake, and Maligne Lake","Booking support from Shooting Star Travel"],
    notIncluded: ["5% GST","Meals and drinks","Personal expenses","Guide gratuity","Parks Canada Discovery Pass","Optional attraction tickets unless selected as add-ons","Travel insurance","Hotel accommodation"],
  },
  faq: {
    eyebrow: "— Travel notes",
    heading: "Important Travel Notes",
    items: [
      { q: "Do I need a Parks Canada Discovery Pass?", a: "Yes. Guests entering Banff or Jasper National Park may need a valid Parks Canada pass. The pass is not included in the listed tour fare unless specifically stated." },
      { q: "Are Columbia Icefield and Maligne Lake Cruise tickets included?", a: "No. They are optional add-ons. Columbia Icefield Ice Explorer and Maligne Lake Cruise tickets are only included if selected during booking and confirmed by Shooting Star Travel." },
      { q: "Can I book only one segment on Tuesday or Saturday?", a: "Yes. Tuesday and Saturday routes are split into independent segments. You can book one segment only or combine compatible segments for a full-day travel plan." },
      { q: "Why do Friday, Saturday, and Sunday cost more?", a: "A $20 per person weekend surcharge is automatically added to base fares on Friday, Saturday, and Sunday. The surcharge applies to the selected route or segment base fare only." },
      { q: "Are times guaranteed?", a: "Times are planned estimates. Mountain weather, road conditions, traffic, attraction schedules, and operational needs may affect timing." },
      { q: "Can I choose a custom hotel pickup?", a: "Some routes use fixed pickup points. Banff and Jasper hotel pickup may be limited. Final pickup details will be confirmed after booking." },
      { q: "Is this a guided hiking tour?", a: "No. This is a sightseeing shuttle and transfer product. Guests may have free time at selected stops, but hiking guidance is not included." },
    ],
  },
  terms: {
    eyebrow: "— Booking terms",
    heading: "Booking Terms",
    blocks: [
      { t: "Booking & Payment", d: "Final seat availability, route availability, attraction ticket availability, and payment instructions will be confirmed by Shooting Star Travel." },
      { t: "Cancellation", d: "Cancellation and refund terms are subject to Shooting Star Travel's official booking policy. Guests should confirm all details before payment." },
      { t: "Itinerary Adjustment", d: "Shooting Star Travel may adjust pickup time, routing, stop order, or sightseeing time due to weather, road conditions, attraction schedules, traffic, or safety concerns." },
      { t: "Travel Responsibility", d: "Guests are responsible for arriving at pickup points on time, bringing appropriate clothing, purchasing required park passes, and carrying personal travel insurance." },
    ],
  },
  finalCta: {
    eyebrow: "— Ready when you are",
    h2: "Travel Between Banff, Jasper, Hinton & the Icefields Parkway Without the Planning Stress",
    sub: "Choose your travel day, select the right route or segment, add optional attraction tickets, and get a clear estimated total before booking.",
    ctaReserve: "Reserve Your Route →",
    ctaCompare: "Compare Route Options",
  },
  routeSection: {
    mapEyebrow: "— Route map",
    mapTitle: "Illustrated Jasper Route Map",
    mapComingSoon: "Illustrated Jasper Route Map Coming Soon",
    mapCaption: "A custom illustrated map of every stop along the Icefields Parkway is on the way.",
    timelineEyebrow: "— Day-by-day itinerary",
    timelineHeading: "Follow the Route, Stop by Stop",
    stopLabel: "Stop",
    highlightsEyebrow: "— Highlights along the way",
    highlightsHeading: "Key Attractions on This Route",
    highlightImageSoon: "Photo coming soon",
    highlights: [
      { name: "Columbia Icefield", desc: "Step onto the Athabasca Glacier with the Ice Explorer experience on northbound and southbound sightseeing days." },
      { name: "Maligne Lake & Spirit Island", desc: "The iconic turquoise lake and its hidden island, reached by an optional scenic cruise." },
      { name: "Athabasca Falls", desc: "A short walk leads to a powerful canyon waterfall just south of Jasper townsite." },
      { name: "Peyto Lake", desc: "The classic wolf-shaped viewpoint over a brilliant glacial-blue lake along the Icefields Parkway." },
      { name: "Bow Lake", desc: "A serene reflective lake at the foot of the Crowfoot Glacier — a favorite roadside stop." },
      { name: "Medicine Lake", desc: "A geological wonder that drains and refills with the seasons, framed by quiet Jasper peaks." },
    ],
  },
  finderV2: {
    eyebrow: "— Route Finder",
    heading: "Find Available Routes by Travel Day",
    intro: "Select your travel day to see which route or segment is available. Some days offer one full-day route, while Tuesday and Saturday offer multiple flexible segments that can be booked separately or combined.",
    groupLabels: { monFri: "Monday / Friday", tueSat: "Tuesday / Saturday", wedSun: "Wednesday / Sunday" },
    ctaSelect: "Select This Route",
    ctaSelected: "Selected — see timeline below",
    bestForLabel: "Best for",
    durationLabel: "Duration",
    addOnsLabel: "Add-ons",
    segmentTitles: { morning: "Morning Segment", midday: "Midday / Afternoon Segment", evening: "Evening Segment" },
    tueSatSummaryTitle: "Tuesday / Saturday: Flexible Segment Day",
    tueSatSummaryDesc: "Book one segment only, or combine morning, afternoon, and evening segments depending on your travel plan.",
    selectedTimelineHeading: "Your selected route — stop by stop",
    showingPrefix: "Showing:",
    routeSuffix: " Route",
    placeholderTitle: "No route selected yet",
    placeholderBody: "Select a travel day above to view the route map and detailed itinerary.",
  },
  bundles: {
    eyebrow: "— Suggested Combinations",
    heading: "Plan Your Full Icefields Journey",
    intro:
      "Combine these shuttles with our Banff lake tours into a complete multi-day Rockies journey and receive a special bundle discount. Contact us and we'll tailor the perfect itinerary for you.",
    adCopy:
      "Picture yourself gliding the Icefields Parkway, glacier-fed lakes mirroring the peaks the whole way north.",
    contactCta: "Contact us to plan this →",
    items: [
      {
        name: "The Postcards from Rockies",
        flow: ["Icefields Parkway Shuttles (F+G+H)", "Moraine & Lake Louise"],
        tagline:
          "The full Icefields Parkway plus the trio of iconic turquoise lakes across Jasper and Banff.",
      },
      {
        name: "Rockies Grand Slam",
        flow: [
          "Icefields Parkway Shuttles (F+G+H)",
          "Moraine & Lake Louise",
          "JET — Johnston Canyon, Emerald & Takakkaw",
        ],
        tagline:
          "Complete all three national parks — Banff, Jasper and Yoho — the ultimate Rockies conquest.",
      },
    ],
  },
};


const ZH: IcefieldsContent = {
  weekdayLabel: WEEKDAY_ZH,
  weekdayShort: SHORT_ZH,
  products: {
    P1: { id: "P1", name: "班夫前往賈斯伯觀光接駁", short: "沿冰原大道北上的全日觀光接駁。", days: ["Mon","Fri"], daysLabel: "週一 / 週五", direction: "班夫 → 賈斯伯", time: "08:00 – 17:10（含 Hinton 至 18:30）", durationHrs: "約 9 小時", adult: 200, child: 140, childAvailable: true, addOns: ["CBI","HINTON_ONE","HINTON_ROUND"], bestFor: "從班夫前往賈斯伯的觀光接駁", schedule: ["08:00 — Moxy Banff 飯店接送","08:03 — Best Western 接送","08:10 — Mountain Royal 接送","17:10 — 賈斯伯火車站下車","18:30 — Hinton 下車（含延伸）"], accent: "north" },
    P2A: { id: "P2A", name: "賈斯伯 & 瑪琳湖精靈島一日遊", short: "以賈斯伯為基地，前往藥湖與瑪琳湖。", days: ["Tue","Sat"], daysLabel: "週二 / 週六", direction: "Hinton / 賈斯伯 → 瑪琳湖 → 賈斯伯", time: "09:20 – 16:40", durationHrs: "約 5 小時", adult: 160, child: 160, childAvailable: false, addOns: ["CRUISE"], bestFor: "賈斯伯與精靈島一日遊", schedule: ["09:20 — Hinton 接送","10:30 – 11:20 — 賈斯伯小鎮 / 金字塔湖","11:40 — 賈斯伯車站接送","12:20 – 12:50 — 藥湖停靠","13:20 – 15:30 — 瑪琳湖 / 精靈島核心體驗","16:40 — 賈斯伯車站下車"], accent: "split" },
    P2B: { id: "P2B", name: "賈斯伯往班夫快速接駁", short: "傍晚南下快速接駁,無觀光停點。", days: ["Tue","Sat"], daysLabel: "週二 / 週六", direction: "賈斯伯 → 班夫", time: "17:00 – 22:00", durationHrs: "約 5 小時", adult: 130, child: 130, childAvailable: false, addOns: [], bestFor: "傍晚從賈斯伯回到班夫的接駁", schedule: ["16:40 — 賈斯伯車站登車 / 轉乘","17:00 — 賈斯伯出發","中途僅停靠洗手間（不接送）","21:30 — Mountain Royal 飯店或班夫鎮指定飯店下車","22:00 — 預計抵達終點"], accent: "split" },
    P3A: { id: "P3A", name: "班夫往賈斯伯快速接駁", short: "上午北上快速接駁,僅停靠洗手間。", days: ["Tue","Sat"], daysLabel: "週二 / 週六", direction: "班夫 → 賈斯伯", time: "08:00 – 13:00", durationHrs: "約 5 小時", adult: 130, child: 130, childAvailable: false, addOns: ["HINTON_ONE","HINTON_ROUND"], bestFor: "從班夫快速前往賈斯伯的接駁", schedule: ["08:00 — Moxy Banff 飯店接送","08:03 — Best Western 接送","08:10 — Mountain Royal 接送","中途僅停靠洗手間","13:00 — 賈斯伯車站下車"], accent: "split" },
    P3B: { id: "P3B", name: "賈斯伯藥湖 & 瑪琳湖半日遊", short: "下午以賈斯伯為基地的湖區半日觀光。", days: ["Tue","Sat"], daysLabel: "週二 / 週六", direction: "賈斯伯 → 藥湖 → 瑪琳湖 → 賈斯伯", time: "13:00 – 18:00", durationHrs: "約 5 小時", adult: 160, child: 160, childAvailable: false, addOns: ["CRUISE","HINTON_ONE","HINTON_ROUND"], bestFor: "賈斯伯湖區半日觀光", schedule: ["13:00 — 賈斯伯車站接送","13:30 – 14:30 — 藥湖停靠","15:00 – 17:00 — 瑪琳湖遊船 / 核心湖區體驗","18:00 — 賈斯伯車站下車"], accent: "split" },
    P4: { id: "P4", name: "冰原大道南下觀光接駁", short: "沿冰原大道南下的全日觀光接駁。", days: ["Wed","Sun"], daysLabel: "週三 / 週日", direction: "賈斯伯 → 班夫", time: "09:00 – 18:50", durationHrs: "約 10 小時", adult: 220, child: 160, childAvailable: true, addOns: ["CBI","HINTON_ONE","HINTON_ROUND"], bestFor: "南下冰原大道全日觀光", schedule: ["07:50 — Hinton 接送（加購)","09:00 — 賈斯伯車站接送","09:30 – 10:10 — 阿薩巴斯卡瀑布","11:10 – 14:40 — 哥倫比亞冰原中心","15:40 – 17:00 — 佩托湖","17:10 – 17:40 — 弓湖","18:50 — Mountain Royal 飯店或班夫鎮指定飯店下車"], accent: "south" },
  },
  addOns: {
    CBI: { id: "CBI", name: "哥倫比亞冰原雪車", adult: 90, child: 60, perPerson: false, label: "成人 +$90 / 兒童 +$60" },
    CRUISE: { id: "CRUISE", name: "瑪琳湖遊船", adult: 100, child: 70, perPerson: false, label: "成人 +$100 / 兒童 +$70" },
    HINTON_ONE: { id: "HINTON_ONE", name: "Hinton 延伸（單程）", adult: 20, child: 20, perPerson: true, label: "每人 +$20" },
    HINTON_ROUND: { id: "HINTON_ROUND", name: "Hinton 延伸（來回）", adult: 35, child: 35, perPerson: true, label: "每人 +$35" },
  },
  pickups: ["Moxy Banff 飯店 (08:00)","Best Western Banff (08:03)","Mountain Royal Banff (08:10)","賈斯伯火車站","Hinton（需加購)"],
  dropoffs: ["賈斯伯火車站","Mountain Royal Banff","班夫鎮指定飯店","Hinton（需加購)"],
  meta: {
    title: "冰原大道、賈斯伯、班夫與瑪琳湖接駁觀光｜流星雨假期",
    description: "靈活的洛磯山觀光接駁,串聯班夫、賈斯伯、Hinton、哥倫比亞冰原、藥湖與瑪琳湖。依星期安排的路線、可加購的景點門票與清楚的接送地點。",
    ogTitle: "冰原大道、賈斯伯、班夫與瑪琳湖接駁觀光",
    ogDescription: "以星期為基準的洛磯山接駁,班夫、賈斯伯、Hinton、哥倫比亞冰原與瑪琳湖,加購選項與清楚的預估金額。",
  },
  hero: {
    eyebrow: "— 加拿大洛磯山 · 接駁與觀光",
    h1: "冰原大道、賈斯伯、班夫 & 瑪琳湖接駁觀光",
    sub: "串聯班夫、賈斯伯、Hinton、哥倫比亞冰原、藥湖與瑪琳湖的彈性觀光接駁,依星期安排路線,可加購景點門票,接送地點清楚明確。",
    ctaReserve: "預約路線 →",
    ctaCompare: "比較路線選項",
    badges: ["班夫 ⇄ 賈斯伯路線","可加購哥倫比亞冰原","可加購瑪琳湖遊船","可加購 Hinton 延伸","依星期出發"],
    sideEyebrow: "— 依出遊日選擇",
    sideTitle: "選擇你的出遊日",
    sideCtaContinue: "前往預訂 →",
    weekendNote: "週末加價:週五、週六、週日的基本票價將自動加收每人 $20。",
    cards: [
      { day: "週一 / 週五", title: "班夫 → 賈斯伯觀光接駁", from: "成人 $200 起 / 兒童 $140 起", accent: "north" },
      { day: "週二 / 週六", title: "賈斯伯、瑪琳湖、班夫分段組合", from: "每段 $130 起", accent: "split" },
      { day: "週三 / 週日", title: "賈斯伯 → 班夫觀光接駁", from: "成人 $220 起 / 兒童 $160 起", accent: "south" },
    ],
  },
  finder: {
    eyebrow: "— 快速路線搜尋",
    heading: "依出遊日找到合適的路線",
    thursdayEmpty: "目前週四沒有排定路線。請選擇週一、週二、週三、週五、週六或週日。",
    optional: "可加購:",
    hintonExt: "Hinton 延伸",
  },
  why: {
    eyebrow: "— 為什麼這條路線不一樣",
    heading: "在班夫、賈斯伯、Hinton 與冰原大道之間更聰明的旅行方式",
    items: [
      { t: "依星期安排的路線", d: "不同的星期提供不同的路線,旅客可以挑選最符合行程的日期。" },
      { t: "接駁 + 觀光雙選", d: "部分產品為直達接駁,部分則包含哥倫比亞冰原、藥湖、佩托湖、弓湖與瑪琳湖等主要觀光停點。" },
      { t: "彈性分段預訂", d: "週二與週六的產品可單段預訂,也可組合為一整天的行程。" },
      { t: "景點門票可加購", d: "可在預訂試算中直接加購哥倫比亞冰原雪車或瑪琳湖遊船門票。" },
    ],
  },
  overview: {
    eyebrow: "— 路線總覽",
    heading: "依出發日整理的路線總覽",
    groups: [
      { day: "週一 / 週五", title: "班夫 → 賈斯伯觀光接駁", dur: "約 9 小時", bestFor: "從班夫前往賈斯伯,想要沿途觀光並可加購哥倫比亞冰原體驗的旅客。", accent: "north",
        lines: [["基本票價","成人 $200 / 兒童 $140"],["哥倫比亞冰原雪車","成人 +$90 / 兒童 +$60"],["Hinton 延伸","單程 +$20 / 來回 +$35"],["接送","08:00 Moxy Banff · 08:03 Best Western · 08:10 Mountain Royal"],["下車","17:10 賈斯伯車站 · 18:30 Hinton(含延伸)"]] },
      { day: "週二 / 週六", title: "分段產品", dur: "彈性 5 小時分段", bestFor: "需要在一日內彈性組合賈斯伯、班夫、Hinton 與瑪琳湖的旅客。", accent: "split",
        lines: [["2A — 賈斯伯 / 瑪琳湖一日","09:20 – 16:40 · $160 / 人 · 遊船 +$100/$70"],["2B — 賈斯伯 → 班夫快速","17:00 – 22:00 · $130 / 人"],["3A — 班夫 → 賈斯伯快速","08:00 – 13:00 · $130 / 人 · Hinton +$20/$35"],["3B — 藥湖 & 瑪琳湖半日","13:00 – 18:00 · $160 / 人 · 遊船 +$100/$70"]] },
      { day: "週三 / 週日", title: "賈斯伯 → 班夫南下觀光", dur: "約 10 小時", bestFor: "從賈斯伯回到班夫,沿冰原大道完整觀光的旅客。", accent: "south",
        lines: [["基本票價","成人 $220 / 兒童 $160"],["哥倫比亞冰原雪車","成人 +$90 / 兒童 +$60"],["Hinton 接送","單程 +$20 / 來回 +$35"],["接送","07:50 Hinton(加購) · 09:00 賈斯伯車站"],["下車","18:50 Mountain Royal 或班夫鎮指定飯店"]] },
    ],
  },
  detailed: {
    eyebrow: "— 詳細行程",
    heading: "各路線詳細內容",
    schedule: "行程時間",
    pricing: "價格",
    direction: "方向",
    time: "時間",
    duration: "時長",
    baseFare: "基本票價",
    addOnsLabel: "加購",
    hintonExtFull: "Hinton 延伸（單程 +$20 / 來回 +$35）",
  },
  reserve: {
    eyebrow: "— 預約",
    heading: "預約你的路線",
    intro: "選擇出遊日期、人數、路線與加購項目,我們會計算預估總額。最終座位、接送時間、門票供應與付款方式皆以流星雨假期確認為準。",
    departureDate: "出發日期",
    guests: "人數",
    adults: "成人",
    children: "兒童",
    pickupLoc: "上車地點",
    dropoffLoc: "下車地點",
    detected: "偵測到:",
    weekendApplies: " · 適用週末加價",
    availableProducts: "可選產品",
    pickDate: "請先選擇出發日期以查看可選路線。",
    thursdayWarn: "目前週四沒有排定路線。請選擇週一、週二、週三、週五、週六或週日。",
    addOnsLabel: "加購",
    singlePerBooking: "此日每筆預訂僅限一項產品。",
    multiAllowed: "週二與週六可組合分段(例如 2A + 2B 或 3A + 3B)。",
    combo2: "全日:賈斯伯 / 瑪琳湖 / 班夫組合",
    combo3: "全日:班夫 / 賈斯伯 / 瑪琳湖組合",
    directionWarn: "請確認旅行方向。所選分段可能重複或衝突。",
    estimatedTotal: "— 預估總額",
    orderSummary: "訂單摘要",
    date: "日期",
    day: "星期",
    pickup: "上車",
    dropoff: "下車",
    noSelection: "尚未選擇任何產品。",
    subtotal: "小計",
    gst: "GST(5%)",
    estimatedTotalRow: "預估總額",
    continueToBooking: "前往預訂 →",
    finalNote: "最終座位、接送時間、門票供應與付款方式皆以流星雨假期確認為準。",
    baseSuffix: "基本",
    weekendSurcharge: "週末加價(每人 +$20)",
    perPerson: "每人",
  },
  compare: {
    eyebrow: "— 比較",
    heading: "並列比較",
    headers: ["產品","出發日","方向","時間","基本票價","加購","最適合"],
    rows: [
      { id: "P1", addons: "哥倫比亞冰川 · Hinton" },
      { id: "P2A", addons: "瑪琳湖遊船" },
      { id: "P2B", addons: "無" },
      { id: "P3A", addons: "Hinton 延伸" },
      { id: "P3B", addons: "遊船 · Hinton" },
      { id: "P4", addons: "哥倫比亞冰川 · Hinton 接送" },
    ],
    pp: "/人",
  },
  addonsSection: {
    eyebrow: "— 加購選項",
    heading: "加購項目與計價方式",
    cards: [
      { t: "哥倫比亞冰原雪車", on: "適用於產品 1 與產品 4", price: "成人 +$90 / 兒童 +$60" },
      { t: "瑪琳湖遊船", on: "適用於產品 2A 與產品 3B", price: "成人 +$100 / 兒童 +$70" },
      { t: "Hinton 延伸", on: "適用於產品 1、3A、3B 與 4", price: "單程 +$20 / 來回 +$35,每人計價" },
    ],
    note: "加購項目以每位旅客計價,適用成人 / 兒童價格區分。",
  },
  pickupNotes: {
    eyebrow: "— 接送說明",
    heading: "上下車地點說明",
    cards: [
      { t: "班夫接送", lines: ["08:00 Moxy Banff 飯店","08:03 Best Western","08:10 Mountain Royal","回程下車地點可能為 Mountain Royal 或班夫鎮指定飯店。"] },
      { t: "賈斯伯接送", lines: ["賈斯伯車站為大部分路線的主要接送點。"] },
      { t: "Hinton", lines: ["僅在加購時提供。","部分 Hinton 接送可能因距離需要提早或延後。"] },
      { t: "洗手間停靠", lines: ["快速接駁路段僅停靠洗手間,並非觀光停點,亦不接送旅客。"] },
    ],
  },
  included: {
    eyebrow: "— 費用包含",
    heading: "費用包含與不包含",
    includedTitle: "費用包含",
    notIncludedTitle: "費用不包含",
    included: ["舒適的交通車輛","依路線安排的上下車服務","沿途景觀公路交通","觀光路線的計畫停點","串聯班夫、賈斯伯、Hinton、冰原大道、藥湖與瑪琳湖的路線安排","流星雨假期的訂單支援"],
    notIncluded: ["5% GST","餐飲與飲料","個人消費","司導小費","加拿大國家公園通行證","未加購的景點門票","旅遊保險","住宿"],
  },
  faq: {
    eyebrow: "— 旅遊提醒",
    heading: "重要旅遊資訊",
    items: [
      { q: "需要加拿大國家公園通行證嗎？", a: "需要。進入班夫或賈斯伯國家公園的旅客可能需要有效的 Parks Canada 通行證,除非另有說明,通行證並不包含於團費內。" },
      { q: "哥倫比亞冰原與瑪琳湖遊船門票包含嗎？", a: "不包含。皆為加購項目,僅在預訂時選擇且由流星雨假期確認後才會包含。" },
      { q: "週二或週六可以只訂單段嗎？", a: "可以。週二與週六的路線為獨立分段,可單段預訂,也可組合為全日行程。" },
      { q: "為什麼週五、週六、週日比較貴？", a: "週末基本票價將自動加收每人 $20,僅適用於該路線或分段的基本票價。" },
      { q: "時間能保證嗎？", a: "所有時間皆為預估。山區天候、路況、交通、景點時刻與營運需求可能影響實際時間。" },
      { q: "可以自選飯店接送嗎？", a: "部分路線使用固定接送點。班夫與賈斯伯的飯店接送可能有限制,最終接送細節將於預訂後確認。" },
      { q: "這是健行導覽行程嗎？", a: "不是。此為觀光接駁產品,部分停點可自由活動,但不含健行導覽。" },
    ],
  },
  terms: {
    eyebrow: "— 預訂條款",
    heading: "預訂條款",
    blocks: [
      { t: "預訂與付款", d: "最終座位、路線、門票供應與付款方式皆以流星雨假期確認為準。" },
      { t: "取消", d: "取消與退款依流星雨假期官方政策辦理,旅客付款前請確認所有細節。" },
      { t: "行程調整", d: "因天氣、路況、景點時刻、交通或安全考量,流星雨假期得調整接送時間、路線、停點順序與觀光時間。" },
      { t: "旅客責任", d: "旅客需準時抵達上車地點、攜帶合適衣物、自行購買國家公園通行證,並建議自備個人旅遊保險。" },
    ],
  },
  finalCta: {
    eyebrow: "— 隨時為你準備好",
    h2: "輕鬆穿梭班夫、賈斯伯、Hinton 與冰原大道",
    sub: "選擇出遊日、挑選路線或分段、加購想要的景點門票,即可在預訂前看到清楚的預估金額。",
    ctaReserve: "預約路線 →",
    ctaCompare: "比較路線選項",
  },
  routeSection: {
    mapEyebrow: "— 路線地圖",
    mapTitle: "賈斯伯路線手繪地圖",
    mapComingSoon: "賈斯伯路線手繪地圖即將上線",
    mapCaption: "我們正在製作一張涵蓋冰原大道沿線每個停點的客製化插畫地圖。",
    timelineEyebrow: "— 每日行程",
    timelineHeading: "依序了解整條路線的每個停點",
    stopLabel: "停點",
    highlightsEyebrow: "— 沿途亮點",
    highlightsHeading: "本路線的主要景點",
    highlightImageSoon: "照片即將上線",
    highlights: [
      { name: "哥倫比亞冰川", desc: "在北上與南下觀光日,搭乘冰原雪車踏上阿薩巴斯卡冰川。" },
      { name: "瑪琳湖 & 精靈島", desc: "標誌性的綠松石湖泊與隱藏的小島,可加購遊船前往。" },
      { name: "阿薩巴斯卡瀑布", desc: "賈斯伯以南短程步行即可抵達的氣勢峽谷瀑布。" },
      { name: "佩托湖", desc: "冰原大道上經典的狼形觀景點,俯瞰冰川藍的湖泊。" },
      { name: "弓湖", desc: "Crowfoot 冰川腳下寧靜的倒影湖,是最受歡迎的路邊停點之一。" },
      { name: "藥湖", desc: "隨季節漲退的地質奇觀,被寧靜的賈斯伯群山環抱。" },
    ],
  },
  finderV2: {
    eyebrow: "— 路線搜尋",
    heading: "依出遊日查看可預訂路線",
    intro: "選擇你的出遊日,即可看到當天可預訂的路線或分段。部分日期提供一條全日路線,週二與週六則提供多個彈性分段,可單獨預訂或組合搭配。",
    groupLabels: { monFri: "週一 / 週五", tueSat: "週二 / 週六", wedSun: "週三 / 週日" },
    ctaSelect: "選擇此路線",
    ctaSelected: "已選擇 — 請見下方行程",
    bestForLabel: "最適合",
    durationLabel: "時長",
    addOnsLabel: "加購",
    segmentTitles: { morning: "上午分段", midday: "中午 / 下午分段", evening: "傍晚分段" },
    tueSatSummaryTitle: "週二 / 週六:彈性分段日",
    tueSatSummaryDesc: "可只預訂一段,也可依行程組合上午、下午與傍晚分段。",
    selectedTimelineHeading: "你選擇的路線 — 逐站行程",
    showingPrefix: "目前顯示:",
    routeSuffix: " 路線",
    placeholderTitle: "尚未選擇路線",
    placeholderBody: "請在上方選擇出遊日,即可查看路線地圖與詳細行程。",
  },
  bundles: {
    eyebrow: "— 推薦組合",
    heading: "規劃你的完整冰原大道之旅",
    intro:
      "將這些接駁與我們的班夫湖區行程組合成多日洛磯山旅程，即可享有專屬組合優惠。聯絡我們，為你量身安排最適合的行程。",
    adCopy: "想像自己沿著冰原大道一路向北，冰川孕育的湖泊一座接一座，把整片山影都映入水中。",
    contactCta: "聯絡我們規劃這個組合 →",
    items: [
      {
        name: "洛磯明信片之旅",
        flow: ["冰原大道接駁（F+G+H）", "夢蓮湖 & 露易絲湖"],
        tagline: "完整走完冰原大道，再加上跨越 Jasper 與 Banff 的三大經典綠松石湖。",
      },
      {
        name: "洛磯大滿貫",
        flow: [
          "冰原大道接駁（F+G+H）",
          "夢蓮湖 & 露易絲湖",
          "JET — 強斯頓峽谷、翡翠湖、塔卡考瀑布",
        ],
        tagline: "一次集齊三大國家公園 — Banff、Jasper、Yoho，終極洛磯山征服之旅。",
      },
    ],
  },
};


const KO: IcefieldsContent = {
  weekdayLabel: WEEKDAY_KO,
  weekdayShort: SHORT_KO,
  products: {
    P1: { id: "P1", name: "밴프 → 재스퍼 관광 셔틀", short: "아이스필드 파크웨이를 따라 북쪽으로 가는 전일 관광 셔틀.", days: ["Mon","Fri"], daysLabel: "월 / 금", direction: "밴프 → 재스퍼", time: "08:00 – 17:10 (힌튼 포함 시 18:30)", durationHrs: "약 9시간", adult: 200, child: 140, childAvailable: true, addOns: ["CBI","HINTON_ONE","HINTON_ROUND"], bestFor: "밴프에서 재스퍼로 가는 관광 셔틀", schedule: ["08:00 — Moxy Banff 호텔 픽업","08:03 — Best Western 픽업","08:10 — Mountain Royal 픽업","17:10 — 재스퍼 기차역 하차","18:30 — 힌튼 하차 (연장 옵션)"], accent: "north" },
    P2A: { id: "P2A", name: "재스퍼 & 말린 호수 스피릿 아일랜드 일일 투어", short: "재스퍼 기반의 메디슨 호수와 말린 호수 일일 투어.", days: ["Tue","Sat"], daysLabel: "화 / 토", direction: "힌튼 / 재스퍼 → 말린 호수 → 재스퍼", time: "09:20 – 16:40", durationHrs: "약 5시간", adult: 160, child: 160, childAvailable: false, addOns: ["CRUISE"], bestFor: "재스퍼와 스피릿 아일랜드 일일 투어", schedule: ["09:20 — 힌튼 픽업","10:30 – 11:20 — 재스퍼 타운 / 피라미드 호수","11:40 — 재스퍼역 픽업","12:20 – 12:50 — 메디슨 호수 정차","13:20 – 15:30 — 말린 호수 / 스피릿 아일랜드 핵심 체험","16:40 — 재스퍼역 하차"], accent: "split" },
    P2B: { id: "P2B", name: "재스퍼 → 밴프 익스프레스 셔틀", short: "관광 정차 없는 저녁 남행 익스프레스 셔틀.", days: ["Tue","Sat"], daysLabel: "화 / 토", direction: "재스퍼 → 밴프", time: "17:00 – 22:00", durationHrs: "약 5시간", adult: 130, child: 130, childAvailable: false, addOns: [], bestFor: "저녁에 재스퍼에서 밴프로 이동", schedule: ["16:40 — 재스퍼역 탑승 / 환승","17:00 — 재스퍼 출발","중간 화장실 정차만 (승하차 불가)","21:30 — Mountain Royal 호텔 또는 지정 밴프 호텔 하차","22:00 — 도착 예정"], accent: "split" },
    P3A: { id: "P3A", name: "밴프 → 재스퍼 익스프레스 셔틀", short: "오전 북행 익스프레스, 화장실 정차만.", days: ["Tue","Sat"], daysLabel: "화 / 토", direction: "밴프 → 재스퍼", time: "08:00 – 13:00", durationHrs: "약 5시간", adult: 130, child: 130, childAvailable: false, addOns: ["HINTON_ONE","HINTON_ROUND"], bestFor: "밴프에서 재스퍼까지 빠른 이동", schedule: ["08:00 — Moxy Banff 호텔 픽업","08:03 — Best Western 픽업","08:10 — Mountain Royal 픽업","중간 화장실 정차만","13:00 — 재스퍼역 하차"], accent: "split" },
    P3B: { id: "P3B", name: "재스퍼 메디슨 호수 & 말린 호수 반일 투어", short: "오후 재스퍼 기반의 호수 관광.", days: ["Tue","Sat"], daysLabel: "화 / 토", direction: "재스퍼 → 메디슨 호수 → 말린 호수 → 재스퍼", time: "13:00 – 18:00", durationHrs: "약 5시간", adult: 160, child: 160, childAvailable: false, addOns: ["CRUISE","HINTON_ONE","HINTON_ROUND"], bestFor: "반일 호수 관광", schedule: ["13:00 — 재스퍼역 픽업","13:30 – 14:30 — 메디슨 호수 정차","15:00 – 17:00 — 말린 호수 크루즈 / 핵심 체험","18:00 — 재스퍼역 하차"], accent: "split" },
    P4: { id: "P4", name: "아이스필드 파크웨이 남행 관광 셔틀", short: "아이스필드 파크웨이를 따라 남쪽으로 가는 전일 관광.", days: ["Wed","Sun"], daysLabel: "수 / 일", direction: "재스퍼 → 밴프", time: "09:00 – 18:50", durationHrs: "약 10시간", adult: 220, child: 160, childAvailable: true, addOns: ["CBI","HINTON_ONE","HINTON_ROUND"], bestFor: "남행 아이스필드 파크웨이 관광", schedule: ["07:50 — 힌튼 픽업 (옵션)","09:00 — 재스퍼역 픽업","09:30 – 10:10 — 아타바스카 폭포","11:10 – 14:40 — 컬럼비아 아이스필드 센터","15:40 – 17:00 — 페이토 호수","17:10 – 17:40 — 보우 호수","18:50 — Mountain Royal 호텔 또는 지정 밴프 호텔 하차"], accent: "south" },
  },
  addOns: {
    CBI: { id: "CBI", name: "컬럼비아 아이스필드 아이스 익스플로러", adult: 90, child: 60, perPerson: false, label: "성인 +$90 / 어린이 +$60" },
    CRUISE: { id: "CRUISE", name: "말린 호수 크루즈", adult: 100, child: 70, perPerson: false, label: "성인 +$100 / 어린이 +$70" },
    HINTON_ONE: { id: "HINTON_ONE", name: "힌튼 연장 — 편도", adult: 20, child: 20, perPerson: true, label: "1인당 +$20" },
    HINTON_ROUND: { id: "HINTON_ROUND", name: "힌튼 연장 — 왕복", adult: 35, child: 35, perPerson: true, label: "1인당 +$35" },
  },
  pickups: ["Moxy Banff 호텔 (08:00)","Best Western Banff (08:03)","Mountain Royal Banff (08:10)","재스퍼 기차역","힌튼 (옵션 필요)"],
  dropoffs: ["재스퍼 기차역","Mountain Royal Banff","지정 밴프 타운 호텔","힌튼 (옵션 필요)"],
  meta: {
    title: "아이스필드 파크웨이, 재스퍼, 밴프 & 말린 호수 셔틀 투어｜Shooting Star Travel",
    description: "밴프, 재스퍼, 힌튼, 컬럼비아 아이스필드, 메디슨 호수, 말린 호수를 잇는 유연한 셔틀 관광. 요일 기반 노선, 옵션 입장권, 명확한 픽업 정보.",
    ogTitle: "아이스필드 파크웨이, 재스퍼, 밴프 & 말린 호수 셔틀 투어",
    ogDescription: "요일 기반 로키 셔틀 — 밴프, 재스퍼, 힌튼, 컬럼비아 아이스필드, 말린 호수. 옵션 추가와 명확한 예상 금액.",
  },
  hero: {
    eyebrow: "— 캐나다 로키 · 셔틀과 관광",
    h1: "아이스필드 파크웨이, 재스퍼, 밴프 & 말린 호수 셔틀 투어",
    sub: "밴프, 재스퍼, 힌튼, 컬럼비아 아이스필드, 메디슨 호수, 말린 호수를 잇는 유연한 관광 셔틀 — 요일 기반 노선, 옵션 입장권, 명확한 픽업/하차 정보.",
    ctaReserve: "노선 예약하기 →",
    ctaCompare: "노선 비교",
    badges: ["밴프 ⇄ 재스퍼 노선","컬럼비아 아이스필드 옵션","말린 호수 크루즈 옵션","힌튼 연장 가능","요일 기반 출발"],
    sideEyebrow: "— 여행 요일로 선택",
    sideTitle: "여행 요일을 선택하세요",
    sideCtaContinue: "예약으로 이동 →",
    weekendNote: "주말 추가요금: 금/토/일에는 기본 요금에 1인당 $20이 자동 추가됩니다.",
    cards: [
      { day: "월 / 금", title: "밴프 → 재스퍼 관광 셔틀", from: "성인 $200부터 / 어린이 $140부터", accent: "north" },
      { day: "화 / 토", title: "재스퍼, 말린 호수, 밴프 분할 노선", from: "구간당 $130부터", accent: "split" },
      { day: "수 / 일", title: "재스퍼 → 밴프 관광 셔틀", from: "성인 $220부터 / 어린이 $160부터", accent: "south" },
    ],
  },
  finder: {
    eyebrow: "— 빠른 노선 찾기",
    heading: "여행 요일로 적합한 노선 찾기",
    thursdayEmpty: "목요일에는 운행 노선이 없습니다. 월, 화, 수, 금, 토, 일 중에서 선택해 주세요.",
    optional: "옵션:",
    hintonExt: "힌튼 연장",
  },
  why: {
    eyebrow: "— 이 노선이 다른 이유",
    heading: "밴프, 재스퍼, 힌튼, 아이스필드 파크웨이를 더 스마트하게 이동하기",
    items: [
      { t: "요일 기반 노선", d: "요일마다 다른 노선이 운행되어 여행 일정에 맞춰 선택할 수 있습니다." },
      { t: "셔틀 + 관광 옵션", d: "직행 셔틀과, 컬럼비아 아이스필드·메디슨 호수·페이토 호수·보우 호수·말린 호수 등 주요 관광 정차를 포함하는 노선이 있습니다." },
      { t: "유연한 구간 예약", d: "화요일과 토요일 노선은 단일 구간 예약 또는 전일 일정 조합이 가능합니다." },
      { t: "옵션 입장권", d: "예약 견적에서 컬럼비아 아이스필드 아이스 익스플로러나 말린 호수 크루즈 티켓을 바로 추가할 수 있습니다." },
    ],
  },
  overview: {
    eyebrow: "— 노선 개요",
    heading: "출발 요일별 노선 개요",
    groups: [
      { day: "월 / 금", title: "밴프 → 재스퍼 관광 셔틀", dur: "약 9시간", bestFor: "밴프에서 재스퍼로 이동하며 관광 정차와 옵션 컬럼비아 아이스필드 체험을 원하는 여행자.", accent: "north",
        lines: [["기본 요금","성인 $200 / 어린이 $140"],["컬럼비아 아이스 익스플로러","성인 +$90 / 어린이 +$60"],["힌튼 연장","편도 +$20 / 왕복 +$35"],["픽업","08:00 Moxy Banff · 08:03 Best Western · 08:10 Mountain Royal"],["하차","17:10 재스퍼역 · 18:30 힌튼 (연장 시)"]] },
      { day: "화 / 토", title: "분할 구간 상품", dur: "유연한 5시간 구간", bestFor: "재스퍼, 밴프, 힌튼, 말린 호수를 하루 동안 유연하게 조합하고 싶은 여행자.", accent: "split",
        lines: [["2A — 재스퍼 / 말린 호수 일일","09:20 – 16:40 · $160 / 인 · 크루즈 +$100/$70"],["2B — 재스퍼 → 밴프 익스프레스","17:00 – 22:00 · $130 / 인"],["3A — 밴프 → 재스퍼 익스프레스","08:00 – 13:00 · $130 / 인 · 힌튼 +$20/$35"],["3B — 메디슨 & 말린 호수 반일","13:00 – 18:00 · $160 / 인 · 크루즈 +$100/$70"]] },
      { day: "수 / 일", title: "재스퍼 → 밴프 남행 관광", dur: "약 10시간", bestFor: "재스퍼에서 밴프로 이동하며 아이스필드 파크웨이의 주요 관광지를 돌아보는 여행자.", accent: "south",
        lines: [["기본 요금","성인 $220 / 어린이 $160"],["컬럼비아 아이스 익스플로러","성인 +$90 / 어린이 +$60"],["힌튼 픽업","편도 +$20 / 왕복 +$35"],["픽업","07:50 힌튼 (옵션) · 09:00 재스퍼역"],["하차","18:50 Mountain Royal 또는 지정 밴프 호텔"]] },
    ],
  },
  detailed: {
    eyebrow: "— 상세 일정",
    heading: "노선별 상세 내용",
    schedule: "일정",
    pricing: "요금",
    direction: "방향",
    time: "시간",
    duration: "소요시간",
    baseFare: "기본 요금",
    addOnsLabel: "옵션",
    hintonExtFull: "힌튼 연장 (편도 +$20 / 왕복 +$35)",
  },
  reserve: {
    eyebrow: "— 예약",
    heading: "노선 예약",
    intro: "여행 날짜, 인원, 노선, 옵션을 선택하면 예상 총액을 계산해 드립니다. 최종 좌석, 픽업 시간, 입장권 재고 및 결제는 Shooting Star Travel이 확정합니다.",
    departureDate: "출발 날짜",
    guests: "인원",
    adults: "성인",
    children: "어린이",
    pickupLoc: "픽업 장소",
    dropoffLoc: "하차 장소",
    detected: "감지됨:",
    weekendApplies: " · 주말 추가요금 적용",
    availableProducts: "예약 가능 상품",
    pickDate: "출발 날짜를 선택하면 가능한 노선이 표시됩니다.",
    thursdayWarn: "목요일에는 운행 노선이 없습니다. 월, 화, 수, 금, 토, 일 중에서 선택해 주세요.",
    addOnsLabel: "옵션",
    singlePerBooking: "이 요일은 예약당 한 가지 상품만 가능합니다.",
    multiAllowed: "화요일과 토요일은 구간 조합이 가능합니다 (예: 2A + 2B 또는 3A + 3B).",
    combo2: "전일: 재스퍼 / 말린 호수 / 밴프 조합",
    combo3: "전일: 밴프 / 재스퍼 / 말린 호수 조합",
    directionWarn: "여행 방향을 확인해 주세요. 선택한 구간이 중복되거나 충돌할 수 있습니다.",
    estimatedTotal: "— 예상 총액",
    orderSummary: "주문 요약",
    date: "날짜",
    day: "요일",
    pickup: "픽업",
    dropoff: "하차",
    noSelection: "선택된 상품이 없습니다.",
    subtotal: "소계",
    gst: "GST (5%)",
    estimatedTotalRow: "예상 총액",
    continueToBooking: "예약으로 이동 →",
    finalNote: "최종 좌석, 픽업 시간, 입장권 재고 및 결제는 Shooting Star Travel이 확정합니다.",
    baseSuffix: "기본",
    weekendSurcharge: "주말 추가요금 (1인 +$20)",
    perPerson: "1인",
  },
  compare: {
    eyebrow: "— 비교",
    heading: "한눈에 비교",
    headers: ["상품","요일","방향","시간","기본 요금","옵션","적합한 대상"],
    rows: [
      { id: "P1", addons: "Columbia Icefield · 힌튼" },
      { id: "P2A", addons: "말린 호수 크루즈" },
      { id: "P2B", addons: "없음" },
      { id: "P3A", addons: "힌튼 연장" },
      { id: "P3B", addons: "크루즈 · 힌튼" },
      { id: "P4", addons: "Columbia Icefield · 힌튼 픽업" },
    ],
    pp: "/인",
  },
  addonsSection: {
    eyebrow: "— 옵션 추가",
    heading: "옵션 항목 및 가격 규칙",
    cards: [
      { t: "컬럼비아 아이스필드 아이스 익스플로러", on: "상품 1, 4에서 가능", price: "성인 +$90 / 어린이 +$60" },
      { t: "말린 호수 크루즈", on: "상품 2A, 3B에서 가능", price: "성인 +$100 / 어린이 +$70" },
      { t: "힌튼 연장", on: "상품 1, 3A, 3B, 4에서 가능", price: "편도 +$20 / 왕복 +$35, 1인 기준" },
    ],
    note: "옵션은 1인 단위로 계산되며 성인/어린이 가격이 적용됩니다.",
  },
  pickupNotes: {
    eyebrow: "— 픽업과 하차",
    heading: "픽업 및 하차 안내",
    cards: [
      { t: "밴프 픽업", lines: ["08:00 Moxy Banff 호텔","08:03 Best Western","08:10 Mountain Royal","최종 하차는 Mountain Royal 또는 지정 밴프 호텔에서 진행될 수 있습니다."] },
      { t: "재스퍼 픽업 / 하차", lines: ["대부분 노선의 주요 환승 지점은 재스퍼역입니다."] },
      { t: "힌튼", lines: ["옵션으로 선택했을 때만 가능합니다.","거리에 따라 더 이른 픽업 또는 늦은 하차가 필요할 수 있습니다."] },
      { t: "화장실 정차", lines: ["익스프레스 구간은 화장실 정차만 포함되며, 관광 정차나 승하차는 불가합니다."] },
    ],
  },
  included: {
    eyebrow: "— 포함 사항",
    heading: "포함 사항과 불포함 사항",
    includedTitle: "포함",
    notIncludedTitle: "불포함",
    included: ["편안한 교통 수단","선택한 노선에 따른 예정된 픽업 및 하차","경치 좋은 고속도로 이동","관광 노선의 계획된 정차","밴프, 재스퍼, 힌튼, 아이스필드 파크웨이, 메디슨 호수, 말린 호수를 잇는 노선 운영","Shooting Star Travel 예약 지원"],
    notIncluded: ["5% GST","식음료","개인 비용","가이드 팁","Parks Canada Discovery Pass","옵션으로 추가하지 않은 입장권","여행자 보험","호텔 숙박"],
  },
  faq: {
    eyebrow: "— 여행 안내",
    heading: "중요 여행 안내",
    items: [
      { q: "Parks Canada Discovery Pass가 필요한가요?", a: "네. 밴프 또는 재스퍼 국립공원에 진입하는 여행자는 유효한 Parks Canada 패스가 필요할 수 있습니다. 별도 명시가 없는 한 요금에 포함되지 않습니다." },
      { q: "컬럼비아 아이스필드와 말린 호수 크루즈 티켓이 포함되나요?", a: "아니요. 옵션 항목입니다. 예약 시 선택하고 Shooting Star Travel이 확정한 경우에만 포함됩니다." },
      { q: "화요일이나 토요일에 한 구간만 예약할 수 있나요?", a: "네. 화요일과 토요일 노선은 독립 구간이므로 단일 구간 예약이나 호환되는 구간을 조합한 전일 일정이 가능합니다." },
      { q: "금/토/일은 왜 더 비싼가요?", a: "금/토/일에는 기본 요금에 1인당 $20의 주말 추가요금이 자동 적용됩니다. 해당 노선/구간의 기본 요금에만 적용됩니다." },
      { q: "시간이 보장되나요?", a: "모든 시간은 예상치입니다. 산악 기상, 도로 상태, 교통, 관광지 일정, 운영 사정에 따라 달라질 수 있습니다." },
      { q: "맞춤 호텔 픽업이 가능한가요?", a: "일부 노선은 고정 픽업 지점을 사용합니다. 밴프와 재스퍼의 호텔 픽업은 제한될 수 있으며, 최종 픽업 세부 사항은 예약 후 확정됩니다." },
      { q: "가이드 하이킹 투어인가요?", a: "아니요. 본 상품은 관광 셔틀 및 이동 상품입니다. 정차 지점에서 자유 시간이 있을 수 있으나 하이킹 가이드는 포함되지 않습니다." },
    ],
  },
  terms: {
    eyebrow: "— 예약 약관",
    heading: "예약 약관",
    blocks: [
      { t: "예약 및 결제", d: "최종 좌석, 노선, 입장권 재고, 결제 안내는 Shooting Star Travel이 확정합니다." },
      { t: "취소", d: "취소 및 환불은 Shooting Star Travel 공식 예약 정책을 따릅니다. 결제 전 모든 사항을 확인해 주세요." },
      { t: "일정 조정", d: "기상, 도로 상태, 관광지 일정, 교통, 안전상의 이유로 픽업 시간, 노선, 정차 순서, 관광 시간이 조정될 수 있습니다." },
      { t: "여행자 책임", d: "여행자는 픽업 장소에 정시 도착, 적절한 복장 준비, 필요한 공원 패스 구매, 개인 여행자 보험 가입에 대한 책임이 있습니다." },
    ],
  },
  finalCta: {
    eyebrow: "— 언제든 준비됩니다",
    h2: "복잡한 계획 없이 밴프, 재스퍼, 힌튼, 아이스필드 파크웨이를 여행하세요",
    sub: "여행 요일을 고르고, 노선이나 구간을 선택하고, 옵션 입장권을 추가하면 예약 전에 명확한 예상 총액을 확인할 수 있습니다.",
    ctaReserve: "노선 예약하기 →",
    ctaCompare: "노선 비교",
  },
  routeSection: {
    mapEyebrow: "— 노선 지도",
    mapTitle: "재스퍼 일러스트 노선 지도",
    mapComingSoon: "재스퍼 일러스트 노선 지도 곧 공개",
    mapCaption: "아이스필드 파크웨이의 모든 정차 지점을 담은 맞춤 일러스트 지도를 준비 중입니다.",
    timelineEyebrow: "— 일별 일정",
    timelineHeading: "정차 지점별로 노선을 따라가 보세요",
    stopLabel: "정차",
    highlightsEyebrow: "— 노선의 하이라이트",
    highlightsHeading: "이 노선의 주요 관광지",
    highlightImageSoon: "사진 준비 중",
    highlights: [
      { name: "컬럼비아 아이스필드", desc: "북행과 남행 관광일에 아이스 익스플로러를 타고 아타바스카 빙하에 발을 디뎌 보세요." },
      { name: "말린 호수 & 스피릿 아일랜드", desc: "상징적인 청록색 호수와 숨겨진 작은 섬, 옵션 크루즈로 만날 수 있습니다." },
      { name: "아타바스카 폭포", desc: "재스퍼 남쪽에서 짧은 산책으로 만날 수 있는 박력 있는 협곡 폭포." },
      { name: "페이토 호수", desc: "아이스필드 파크웨이에서 빙하 푸른빛 호수를 내려다보는 늑대 모양의 명소." },
      { name: "보우 호수", desc: "크로풋 빙하 아래의 잔잔한 반영 호수, 인기 있는 드라이브 정차 지점." },
      { name: "메디슨 호수", desc: "계절에 따라 물이 차고 빠지는 지질학적 경이, 고요한 재스퍼 산봉우리에 둘러싸여 있습니다." },
    ],
  },
  finderV2: {
    eyebrow: "— 노선 찾기",
    heading: "여행 요일별 운행 노선 확인",
    intro: "여행 요일을 선택하면 해당 요일에 운행되는 노선이나 구간이 표시됩니다. 일부 요일은 하나의 전일 노선만 운행되고, 화요일과 토요일에는 별도 예약하거나 조합할 수 있는 여러 유연한 구간이 운행됩니다.",
    groupLabels: { monFri: "월요일 / 금요일", tueSat: "화요일 / 토요일", wedSun: "수요일 / 일요일" },
    ctaSelect: "이 노선 선택",
    ctaSelected: "선택됨 — 아래 일정 확인",
    bestForLabel: "추천 대상",
    durationLabel: "소요시간",
    addOnsLabel: "옵션",
    segmentTitles: { morning: "오전 구간", midday: "낮 / 오후 구간", evening: "저녁 구간" },
    tueSatSummaryTitle: "화요일 / 토요일: 유연한 구간 운행일",
    tueSatSummaryDesc: "한 구간만 예약하거나 일정에 따라 오전, 오후, 저녁 구간을 조합해 예약할 수 있습니다.",
    selectedTimelineHeading: "선택한 노선 — 정차별 일정",
    showingPrefix: "현재 표시:",
    routeSuffix: " 노선",
    placeholderTitle: "선택된 노선이 없습니다",
    placeholderBody: "위에서 여행 요일을 선택하면 노선 지도와 상세 일정을 확인할 수 있습니다.",
  },
  bundles: {
    eyebrow: "— 추천 조합",
    heading: "완벽한 아이스필드 여정을 설계하세요",
    intro:
      "이 셔틀들과 밴프 호수 투어를 자유롭게 조합해 멀티데이 로키 여정으로 만드시면 특별 번들 할인이 적용됩니다. 문의 주시면 맞춤 일정으로 안내해 드립니다.",
    adCopy: "아이스필드 파크웨이를 따라 북쪽으로, 빙하가 빚어낸 호수들이 산 그림자를 차례차례 비추는 풍경을 상상해 보세요.",
    contactCta: "이 조합으로 문의하기 →",
    items: [
      {
        name: "로키 포스트카드 여정",
        flow: ["아이스필드 파크웨이 셔틀 (F+G+H)", "모레인 & 루이스 호수"],
        tagline: "아이스필드 파크웨이를 완주하고 재스퍼와 밴프의 3대 청록 호수까지 한 번에.",
      },
      {
        name: "로키 그랜드 슬램",
        flow: [
          "아이스필드 파크웨이 셔틀 (F+G+H)",
          "모레인 & 루이스 호수",
          "JET — 존스턴 캐년, 에메랄드 & 타카카우",
        ],
        tagline: "밴프, 재스퍼, 요호 — 세 국립공원을 모두 정복하는 최종 로키 여정.",
      },
    ],
  },
};


const ALL: Record<Locale, IcefieldsContent> = { en: EN, zh: ZH, ko: KO };

export function getIcefieldsContent(locale: Locale): IcefieldsContent {
  return ALL[locale] ?? EN;
}
