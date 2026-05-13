import tourBanff from "@/assets/tour-banff.webp";
import tourRockies from "@/assets/tour-rockies.webp";
import tourAurora from "@/assets/tour-aurora.webp";
import tourVancouver from "@/assets/tour-vancouver.webp";
import tourVictoria from "@/assets/tour-victoria.webp";
import tourPrivate from "@/assets/tour-private.webp";
import tourIcefield from "@/assets/tour-icefield.webp";
import tourToronto from "@/assets/tour-toronto.jpg";

export type Tour = {
  slug: string;
  img: string;
  gallery?: string[];
  title: string;
  desc: string;
  intro: string;
  duration: string;
  group: string;
  language: string;
  price: string;
  itinerary: { stop: string; title: string; body: string }[];
  included: string[];
  bring: string[];
  notes: string[];
  faq: { q: string; a: string }[];
  departures?: { date: string; seats: number }[];
  packages?: string[];
};

export const tours: Tour[] = [
  {
    slug: "rocky-mountain-classic",
    img: tourRockies,
    gallery: [tourRockies, tourBanff, tourIcefield],
    title: "Rocky Mountain Classic — 5 Days, 4 Nights",
    desc: "Banff · Lake Louise · Icefields Parkway",
    intro: "Departing from Calgary, journey deep into Canada's most majestic mountain range and collect every alpine sunrise and starlit night.",
    duration: "5 days, 4 nights",
    group: "Small group of 8–14",
    language: "English / Mandarin / Korean",
    price: "From CAD $1,280",
    itinerary: [
      { stop: "Day 1", title: "Calgary → Banff", body: "Arrive in Banff in the afternoon, take in Sulphur Mountain gondola views, and enjoy dinner in the hot-spring town." },
      { stop: "Day 2", title: "Moraine Lake & Lake Louise", body: "Catch the morning light over the Valley of the Ten Peaks, then a slow afternoon by Lake Louise." },
      { stop: "Day 3", title: "Icefields Parkway", body: "Pass Bow Lake and Crowfoot Glacier on the way to the Columbia Icefield Snowcoach and Skywalk." },
      { stop: "Day 4", title: "Jasper National Park", body: "Cruise to Spirit Island on Maligne Lake; return to Banff for an evening in the village." },
      { stop: "Day 5", title: "Return to Calgary", body: "Stop in Canmore on the way back, ending the journey at the airport in the afternoon." },
    ],
    included: ["Professional English / Mandarin / Korean guide", "4 nights in 3-star+ hotels", "Daily breakfast plus 4 meals", "All transportation and entrance fees", "Travel insurance"],
    bring: ["Warm jacket (even in summer)", "Comfortable non-slip walking shoes", "Reusable water bottle and sunscreen", "Personal medication", "Camera"],
    notes: [
      "Mountain weather is changeable — please allow flexibility.",
      "Full refund available 30+ days before departure.",
      "Not suitable for children under 6.",
    ],
    faq: [
      { q: "Are flights included?", a: "No. We recommend flying into Calgary (YYC); we can arrange airport transfers." },
      { q: "Do I need a visa?", a: "Please apply for an eTA or Canadian visa according to your passport nationality." },
      { q: "Are single rooms available?", a: "Yes, a single-room upgrade is available for an extra fee — please request at booking." },
    ],
  },
  {
    slug: "banff-day",
    img: tourBanff,
    gallery: [tourBanff, tourRockies],
    title: "Banff National Park — One Day",
    desc: "Moraine Lake · Lake Louise · Bow Falls",
    intro: "A curated single-day journey from Banff covering the three iconic Rockies lakes at an easy pace.",
    duration: "1 day (approx. 9 hours)",
    group: "Small group of 6–12",
    language: "English / Mandarin",
    price: "From CAD $179",
    itinerary: [
      { stop: "08:00", title: "Departure from Banff", body: "Meet at the designated point; guide briefing." },
      { stop: "09:30", title: "Moraine Lake", body: "Climb the rockpile viewpoint and take in the Valley of the Ten Peaks." },
      { stop: "12:00", title: "Lunch at Lake Louise", body: "Free time and lunch lakeside (own expense)." },
      { stop: "15:00", title: "Bow Falls", body: "Short walk to the falls and views of the Banff Springs Hotel." },
      { stop: "17:30", title: "Return to Banff", body: "End of day." },
    ],
    included: ["Professional guide", "All transportation", "National Park entrance fees"],
    bring: ["Lunch on own", "Warm layers", "Comfortable walking shoes"],
    notes: ["Moraine Lake has summer access restrictions; the order may change."],
    faq: [
      { q: "Can I bring children?", a: "Yes, suitable for ages 4 and up." },
      { q: "Is lunch included?", a: "No. There are several restaurants to choose from at Lake Louise." },
    ],
  },
  {
    slug: "aurora-chase",
    img: tourAurora,
    gallery: [tourAurora],
    title: "Aurora Chase Journey",
    desc: "Yellowknife · Aurora cabin · pro photography",
    intro: "Wait beneath the aurora belt in Yellowknife as the green light gently descends.",
    duration: "5 days, 4 nights",
    group: "Small group of 6–10",
    language: "English / Mandarin",
    price: "From CAD $229 (per chase night)",
    itinerary: [
      { stop: "Day 1", title: "Arrive in Yellowknife", body: "Airport pickup, hotel check-in, evening orientation." },
      { stop: "Day 2–4", title: "Aurora chase", body: "Depart for the aurora cabin at 22:00, returning around 02:00." },
      { stop: "Day 5", title: "Departure", body: "Airport drop-off; until next time." },
    ],
    included: ["Aurora cabin access", "Arctic-grade clothing rental", "Hot drinks and snacks", "Photography guidance"],
    bring: ["Passport", "Personal thermal base layers", "Spare camera batteries"],
    notes: ["Auroras are a natural phenomenon — sightings are not guaranteed."],
    faq: [
      { q: "Best season?", a: "November through April is the prime viewing window." },
      { q: "Do I need my own camera?", a: "Recommended; the guide can help with settings." },
    ],
  },
  {
    slug: "vancouver-city",
    img: tourToronto,
    gallery: [tourToronto, tourVancouver],
    title: "Vancouver City — Deep Dive",
    desc: "City highlights · in-depth experience",
    intro: "A local guide walks you through the corners of Vancouver with the best stories.",
    duration: "1 day",
    group: "Small group of 4–10",
    language: "English / Mandarin / Korean",
    price: "From CAD $129",
    itinerary: [
      { stop: "09:00", title: "Stanley Park", body: "Seawall ride and totem-pole stop." },
      { stop: "11:30", title: "Granville Island", body: "Public market and artisan shops." },
      { stop: "14:00", title: "Gastown", body: "Steam clock and cobblestone streets." },
      { stop: "16:00", title: "Canada Place", body: "Waterfront views and city skyline." },
    ],
    included: ["Professional guide", "All transportation", "Granville Island ferry"],
    bring: ["Comfortable shoes", "Rain gear (Vancouver gets rainy)", "Camera"],
    notes: ["Lunch on own; the guide can recommend local spots."],
    faq: [
      { q: "Where do we depart from?", a: "Burrard Station in downtown Vancouver." },
    ],
  },
  {
    slug: "victoria-garden",
    img: tourVictoria,
    gallery: [tourVictoria],
    title: "Victoria Garden Journey",
    desc: "Ferry + Butchart Gardens + classic downtown",
    intro: "British charm and an afternoon among gardens — the most relaxed island getaway.",
    duration: "1 day",
    group: "Small group of 6–14",
    language: "English / Mandarin",
    price: "From CAD $219",
    itinerary: [
      { stop: "07:00", title: "Vancouver meet-up", body: "Drive to Tsawwassen Ferry Terminal." },
      { stop: "09:00", title: "BC Ferries", body: "Crossing with views over the strait." },
      { stop: "11:00", title: "Butchart Gardens", body: "Sunken Garden · Rose Garden · Japanese Garden." },
      { stop: "14:30", title: "Downtown Victoria", body: "Parliament Buildings and Inner Harbour stroll." },
      { stop: "20:00", title: "Return to Vancouver", body: "End of trip." },
    ],
    included: ["Ferry tickets", "Butchart Gardens admission", "All transportation"],
    bring: ["Light walking shoes", "Camera", "Sunscreen"],
    notes: ["Bloom season is May–September; scenery varies by month."],
    faq: [{ q: "Can I book solo?", a: "Yes — minimum 2 to depart." }],
  },
  {
    slug: "private-tour",
    img: tourPrivate,
    gallery: [tourPrivate],
    title: "Private Custom Tours",
    desc: "Tailored for you, your family, and friends",
    intro: "Flexible dates, flexible routes, flexible pace — let us write your one-of-a-kind travel script.",
    duration: "Custom (1–14 days)",
    group: "2–20 travellers",
    language: "English / Mandarin / Korean",
    price: "Quote on request",
    itinerary: [
      { stop: "Step 1", title: "Discovery call", body: "Tell us your party size, dates, interests, and budget." },
      { stop: "Step 2", title: "Itinerary proposal", body: "We send a tailored route and quote within 48 hours." },
      { stop: "Step 3", title: "Confirmation & deposit", body: "Confirm the details and place a deposit." },
      { stop: "Step 4", title: "Departure!", body: "Your private guide accompanies you throughout." },
    ],
    included: ["Bespoke itinerary design", "Private vehicle", "Dedicated guide"],
    bring: ["Depends on the trip"],
    notes: ["We recommend booking at least one month in advance."],
    faq: [{ q: "Minimum group size?", a: "Just 2 travellers." }],
  },
];

export function getTour(slug: string) {
  return tours.find((t) => t.slug === slug);
}
