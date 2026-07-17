import tourBanff from "@/assets/tour-banff.webp";
import bgLake from "@/assets/bg-lake-louise.webp";
import banffTwoLakeFeature from "@/assets/banff-two-lake-feature.jpg";
import { banff3Hero, banff3Gallery } from "./banff3-gallery";
import tourRockies from "@/assets/tour-rockies.webp";
import tourVancouver from "@/assets/tour-vancouver.webp";
import { seattleHero, seattleGallery } from "./seattle-gallery";
import { seattle2Hero, seattle2Gallery } from "./seattle2-gallery";
import { kelownaHero, kelownaGallery } from "./kelowna-gallery";
import { westernUsaHero, westernUsaGallery } from "./western-usa-gallery";
import { vegasCanyonHero, vegasCanyonGallery } from "./vegas-canyon-gallery";
import { la3Hero, la3Gallery } from "./la3-gallery";
import { oregonHero, oregonGallery } from "./oregon-gallery";

import tourIcefield from "@/assets/tour-icefield.webp";
import heroBgMoraine from "@/assets/hero-bg-moraine.webp";
import destJasper from "@/assets/dest-jasper.jpg";
import tourToronto from "@/assets/tour-toronto.jpg";
import destWhistler from "@/assets/dest-whistler.webp";
import { whistlerHero, whistlerGallery } from "./whistler-gallery";
import { victoriaHero, victoriaGallery } from "./victoria-gallery";

export type RoomOption = {
  label: string;
  guests: string;
  price: string;
};

export type Tour = {
  slug: string;
  /** Optional override link target. When set, tour cards link here instead of `/tours/{slug}`. */
  href?: string;
  img: string;
  gallery?: string[];
  title: string;
  desc: string;
  intro: string;
  duration: string;
  group?: string;
  language?: string;
  /** Headline price shown on cards and hero, e.g. "From $140 USD / person". */
  price: string;
  /** Optional pickup / drop-off summary for multi-day itineraries. */
  pickup?: string;
  itinerary: { stop: string; title: string; body: string }[];
  /** Per-room pricing for hotel-included tours. */
  roomOptions?: RoomOption[];
  /** Explanation of room-occupancy pricing in the page locale. */
  roomNote?: string;
  /** Suggested guide gratuity, displayed under pricing. */
  gratuity?: string;
  included: string[];
  notIncluded?: (string | { text: string; href?: string })[];
  /** Optional self-paid experiences guests can add. */
  optional?: string[];
  /** Travel notes / good-to-know paragraph or list. */
  notes: (string | { text: string; href?: string })[];
  /** Booking call-to-action label for this tour. */
  bookingCta?: string;
  /** Rezdy product code linking this tour to live availability/booking (null = contact-only). */
  rezdyProductCode?: string | null;
  /** Direct Rezdy hosted booking page URL (overrides productCode-based URL construction). */
  rezdyBookingUrl?: string | null;
  /** Season classification: spring | summer | fall | winter | all_season. */
  season?: string | null;
  /** Legacy fields kept optional for compatibility with existing UI. */
  bring?: string[];
  faq?: { q: string; a: string }[];
  departures?: { date: string; seats: number }[];
  packages?: string[];
};

const LANGUAGE_NOTE =
  "[Guide & Language Service] This tour is primarily supported by trilingual (English, Chinese, and Korean) audio commentary, complemented by on-the-spot highlights from your driver-guide. The spoken language used by the driver will be adjusted flexibly based on the overall composition of guests on the day. We will do our best to accommodate your language preference, but we are unable to guarantee a single-language private tour. Thank you for your understanding.";
const ROOM_NOTE =
  "When traveling with more guests, the per-person price becomes more affordable as accommodation costs are shared.";

export const tours: Tour[] = [
  {
    slug: "seattle-1-day",
    img: seattleHero,
    gallery: seattleGallery,
    title: "Seattle 1-Day Tour | The Emerald City Classic Day Trip",
    desc: "Explore the soul of Seattle in one day — iconic skyline views, the historic Pike Place Market, the world's first Starbucks, Amazon Spheres, and the magical University of Washington.",
    intro:
      "Surrounded year-round by lush evergreen forests, Seattle is famously known as the \"Emerald City.\" Here, fresh nature, cutting-edge technology, and a century of culture weave together seamlessly. Our thoughtfully curated highlight tour takes you through Seattle's iconic skyline viewpoints, the lively century-old public market, and a fairytale-like historic campus. With a professional guide and private vehicle, you can leave traffic and parking behind and feel the unique soul of Seattle in just one elegant day.",
    duration: "1 day",
    language: LANGUAGE_NOTE,
    price: "From $140 CAD / person",
    gratuity: "Suggested guide gratuity: $20 USD / person",
    itinerary: [
      { stop: "Day 1", title: "Kerry Park", body: "Capture Seattle's postcard-perfect skyline. The city's most famous viewpoint frames the Space Needle, Puget Sound, and distant Mount Rainier in one shot — a scene every photographer dreams of." },
      { stop: "Day 1", title: "Amazon Spheres", body: "A pilgrimage to the tech giant's urban forest. We pass Seattle's most modern landmark — Amazon's HQ. The three giant glass domes form an indoor rainforest that redefines the future of work. (The interior is an employee workspace; we'll stop at the best exterior photo spot.)" },
      { stop: "Day 1", title: "Pike Place Market", body: "Step into one of America's oldest public markets. Visit the very first Starbucks (founded 1971), enjoy a free lunch break with the famous clam chowder, and don't miss the world-famous Gum Wall nearby." },
      { stop: "Day 1", title: "Space Needle & Chihuly Garden", body: "[Optional add-on] Choose between the city's most iconic landmark and a world-class glass art experience: ascend the 360° observation deck above Puget Sound, or step into Dale Chihuly's dreamlike world of color and light." },
      { stop: "Day 1", title: "University of Washington", body: "Wander through what's often called America's most beautiful campus. Step inside the Suzzallo Library — its Hogwarts-like Gothic reading room is one of the country's most magical academic spaces." },
    ],
    included: [
      "Comfortable private vehicle transportation",
      "Professional driver/guide",
      "Parking fees for scheduled stops",
    ],
    notIncluded: [
      "5% tax",
      "Meals & personal allowance",
      "Optional attraction tickets",
      "Suggested guide gratuity",
    ],
    optional: [
      "Space Needle Admission",
      "Chihuly Garden and Glass Admission",
    ],
    notes: [
      "Dress in layers — Seattle weather changes quickly. Bring a windproof or water-resistant jacket and comfortable walking shoes.",
      "Ticket booking service: Space Needle and Chihuly often have long on-site queues. Let us know in advance and we'll pre-book your tickets so you can save the time for the scenery.",
      "Campus visit flexibility: If the Suzzallo Library is closed for university events, exams, or holidays, your guide will instead lead a deeper walk through the campus's other Gothic highlights.",
    ],
    bookingCta: "Book Your Seattle 1-Day Tour",
  },
  {
    slug: "seattle-2-day",
    img: seattle2Hero,
    gallery: seattle2Gallery,
    title: "Seattle 2-Day Tour | Deep Dive & Shopping Getaway",
    desc: "Slow down and capture Seattle's iconic landmarks, seafood feasts, and ultimate shopping experiences in one perfect overnight escape.",
    intro:
      "One day is too short — give yourself a perfect two-day getaway! We take you deep into the birthplace of Boeing and big tech. From a hearty Crab Pot seafood feast to the awe-inspiring Museum of Flight, the vintage industrial Gas Works Park, and of course, beloved shopping stops at Trader Joe's and the Premium Outlets! Private vehicle transport and one night of selected accommodation included — no cross-border driving, no juggling shopping bags. Just enjoy a relaxing Seattle escape full of surprises.",
    duration: "2 days, 1 night",
    language: LANGUAGE_NOTE,
    price: "From $370 CAD / person",
    gratuity: "Suggested guide gratuity: $40 USD / person ($20 USD per day, 2 days)",
    itinerary: [
      { stop: "Day 1", title: "Kerry Park", body: "A perfect vantage point — the Space Needle and Mount Rainier framed in one classic skyline view." },
      { stop: "Day 1", title: "Pike Place Public Market", body: "Visit the century-old market, feel the energy of the flying fish show, and pay homage to the world's first Starbucks." },
      { stop: "Day 1", title: "The Crab Pot Seafood Feast", body: "Stop at Seattle's famous seafood spot for their signature experience: a bucket of crab and seafood poured straight onto the table — eaten by hand! (Optional dining stop; meal cost is at guests' own discretion.)" },
      { stop: "Day 1", title: "Museum of Flight", body: "[Optional add-on] Visit \"the home of Boeing\" — the world's largest independent air and space museum, where you can step inside a retired Air Force One and Concorde." },
      { stop: "Day 1", title: "Trader Joe's", body: "Stock up at the wildly popular North American grocery store! Exclusive snacks, seasonings, and limited-edition tote bags — a paradise for treasure-hunters." },
      { stop: "Day 2", title: "Space Needle / Chihuly Museum", body: "[Optional add-on] Choose between Seattle's two icons: panoramic harbor views from the Space Needle or the immersive light and color of the Chihuly Garden and Glass." },
      { stop: "Day 2", title: "Gas Works Park", body: "Seattle's coolest industrial-chic photo spot! A former gasification plant turned park, with massive vintage machinery and stunning skyline views across Lake Union." },
      { stop: "Day 2", title: "University of Washington", body: "Stroll through America's most beautiful campus and visit the Suzzallo Library — often compared to Hogwarts." },
      { stop: "Day 2", title: "Seattle Premium Outlets", body: "The perfect finale: hundreds of international brand-name stores at unbeatable discount prices." },
    ],
    roomOptions: [
      { label: "Family / Group Quad Room", guests: "4 Guests", price: "From $370 CAD / person" },
      { label: "Triple Shared Room", guests: "3 Guests", price: "From $400 CAD / person" },
      { label: "Private Double Room", guests: "2 Guests", price: "From $430 CAD / person" },
    ],
    roomNote: ROOM_NOTE,
    included: [
      "1-night hotel accommodation",
      "Comfortable private vehicle transportation",
      "Professional driver/guide",
      "Parking fees for scheduled stops",
    ],
    notIncluded: [
      "5% tax",
      "Meals & personal allowance (e.g., Crab Pot)",
      "Optional attraction tickets",
      "Suggested guide gratuity",
    ],
    optional: [
      "Space Needle Admission",
      "Chihuly Garden and Glass Admission",
      "Museum of Flight Admission",
    ],
    notes: [
      "Luggage space: Day 2 includes outlet shopping — leave room in your suitcase for your finds.",
      "Ticket booking: We recommend booking the Space Needle, Chihuly Museum, and Museum of Flight in advance. Let us know at sign-up and we'll arrange it.",
      "Border crossing: Guests departing from Canada must bring a passport valid for at least 6 months and confirm a valid U.S. visa or ESTA.",
    ],
    bookingCta: "Book Your Seattle 2-Day Getaway",
  },
  {
    slug: "victoria-1-day",
    img: victoriaHero,
    gallery: victoriaGallery,
    title: "Victoria 1-Day Tour | British Charm & Coastal Gardens",
    desc: "Cruise the beautiful coastal ferry route into a city of century-old British charm and world-famous gardens.",
    intro:
      "As the capital of British Columbia, Victoria — perched at the southern tip of Vancouver Island — has earned the affectionate nickname of \"Little Britain.\" Here, there's no big-city rush — only grand century-old architecture, picturesque harbors, and world-class gardens. We take care of all the ferry reservations, queueing, and island driving for you! This tour includes round-trip BC Ferries, so you can simply enjoy the ocean breeze on deck, watch for dolphins, and ease into this romantic island day trip.",
    duration: "1 day",
    language: LANGUAGE_NOTE,
    price: "From $170 CAD / person",
    gratuity: "Suggested guide gratuity: $20 CAD / person",
    itinerary: [
      { stop: "Day 1", title: "BC Ferries Scenic Cruise", body: "Glide across the Georgia Strait and Gulf Islands aboard a smooth, comfortable ferry — about 1.5 hours of relaxed scenic cruising." },
      { stop: "Day 1", title: "The Butchart Gardens", body: "[Optional add-on] Visit one of Canada's National Historic Sites and one of the world's most beautiful private gardens. From the Sunken Garden to the Rose Garden and Japanese Garden, every season brings a breathtaking floral display." },
      { stop: "Day 1", title: "Fisherman's Wharf", body: "A vibrant cluster of colourful floating homes! Stroll, sample the local fish & chips, and watch for wild harbor seals popping up at the water's edge." },
      { stop: "Day 1", title: "Mile Zero Monument", body: "Snap a photo at the symbolic start of the Trans-Canada Highway and take in views of the coastline and Washington State's Olympic Mountains across the strait." },
      { stop: "Day 1", title: "Inner Harbour & Government Street", body: "Wander Victoria's most romantic stretch of waterfront. Admire the ivy-covered Empress Hotel and the grand BC Parliament Buildings, then explore Government Street's British-style shops and cafés." },
    ],
    included: [
      "Comfortable private vehicle transportation",
      "Professional driver/guide",
      "Round-trip BC Ferries tickets & vehicle fees",
      "Parking fees for scheduled stops",
    ],
    notIncluded: [
      "5% tax",
      "Meals & personal allowance",
      "Optional attraction tickets",
      "Suggested guide gratuity",
    ],
    optional: ["The Butchart Gardens Admission"],
    notes: [
      "Wind & warmth: The ferry deck and harbor can be breezy — bring a windproof, warm layer.",
      "Ticket booking: The Butchart Gardens is a Victoria must-see. Let us know in advance and we'll pre-book your admission to save queueing time.",
      "Ferry timing: Schedules may shift slightly with season and sea conditions. Your guide will adjust the order of stops to make sure you get the most complete experience.",
    ],
    bookingCta: "Book Your Victoria 1-Day Tour",
  },
  {
    slug: "whistler-1-day",
    img: whistlerHero,
    gallery: whistlerGallery,
    title: "Whistler 1-Day Tour | Sea-to-Sky Highway & Alpine Escape",
    desc: "Travel one of the world's most beautiful coastal highways, with two stunning waterfalls and the Olympic alpine village all in one day.",
    intro:
      "Head north along the world-famous Sea-to-Sky Highway, with the shimmering Pacific on one side and towering mountains on the other. This journey takes you away from city noise and into the freshest forests of British Columbia. From magnificent waterfalls to the outdoor mecca of Squamish, all the way to Whistler — host of the 2010 Winter Olympics. Leave the winding mountain drive and pricey parking to us; just relax and enjoy this perfect blend of nature and European-style alpine charm.",
    duration: "1 day",
    language: LANGUAGE_NOTE,
    price: "From $130 CAD / person",
    gratuity: "Suggested guide gratuity: $20 CAD / person",
    itinerary: [
      { stop: "Day 1", title: "Porteau Cove", body: "The first jewel on the Sea-to-Sky Highway! Walk out on the wooden pier extending into the bay for sweeping fjord views of Howe Sound's deep blue waters." },
      { stop: "Day 1", title: "Shannon Falls", body: "BC's third-tallest waterfall. Stroll an easy forest path and feel the rush of water plunging 335 meters down the granite cliff." },
      { stop: "Day 1", title: "Squamish", body: "Pass through the \"Outdoor Recreation Capital of Canada\" and admire the world-famous Stawamus Chief — a colossal granite monolith." },
      { stop: "Day 1", title: "Brandywine Falls", body: "A hidden gem in old-growth forest. The 70-meter waterfall plunges from a volcanic rim into a deep canyon — a photographer's dream." },
      { stop: "Day 1", title: "Whistler Village", body: "Stroll the pedestrian-only European Alpine-style village — boutiques, galleries, cafés. Optionally ride the record-breaking Peak 2 Peak Gondola for 360° alpine views." },
    ],
    included: [
      "Comfortable private vehicle transportation",
      "Professional driver/guide",
      "Parking fees for scheduled stops",
    ],
    notIncluded: [
      "5% tax",
      "Meals & personal allowance",
      "Optional attraction tickets",
      "Suggested guide gratuity",
    ],
    optional: ["Peak 2 Peak Gondola"],
    notes: [
      "Dress in layers: Whistler sits at high altitude — usually 5–8°C cooler than Vancouver. Bring a warm windproof jacket and comfortable walking shoes (waterfall paths can be slippery).",
      "Gondola booking: Peak 2 Peak ticket prices vary by season and queues can be long. Let us know at booking and we'll help pre-purchase tickets.",
      "Mountain weather: Conditions change quickly. Your guide will adjust stops as needed to keep you safe and comfortable.",
    ],
    bookingCta: "Book Your Whistler 1-Day Tour",
  },
  {
    slug: "rockies-3-day",
    img: banff3Hero,
    gallery: banff3Gallery,
    title: "Rocky Mountains 3-Day Tour | Calgary Round-Trip — Glaciers & Lakes",
    desc: "Skip the long drive and parking headaches inside national parks — depart from Calgary and head deep into the heart of the Canadian Rockies.",
    intro:
      "A 3-day, 2-night highlight journey through century-old Banff town, the dreamlike Lake Louise and Moraine Lake, and the awe-inspiring Columbia Icefield. With comfortable accommodation and private vehicle transport included, you can devote every minute to nature's masterpiece — and enjoy a truly relaxing alpine holiday.",
    duration: "3 days, 2 nights",
    language: LANGUAGE_NOTE,
    price: "From $830 CAD / person",
    gratuity: "Suggested guide gratuity: $60 CAD / person ($20 CAD per day, 3 days)",
    pickup: "Departure: Day 1 morning pickup at Calgary International Airport (YYC). Return: Day 3 approximately 5:00 PM drop-off at Calgary International Airport (YYC).",
    itinerary: [
      { stop: "Day 1", title: "Calgary Airport Pickup", body: "Morning pickup at YYC, then straight into the Rockies to begin your majestic mountain journey." },
      { stop: "Day 1", title: "Banff Town & Lunch", body: "Arrive at the lively alpine town of Banff, enjoy lunch and the distinctive resort atmosphere surrounded by mountain peaks." },
      { stop: "Day 1", title: "Cascade of Time Garden", body: "Stroll through this historic English-style garden — its layered flower beds and stone architecture make a perfect viewpoint of Banff Avenue." },
      { stop: "Day 1", title: "Banff Gondola", body: "[Optional add-on] Ride the glass gondola to the top of Sulphur Mountain for 360° panoramic views of the Rockies." },
      { stop: "Day 1", title: "Banff Springs Hotel & Surroundings", body: "Visit the \"Castle in the Rockies,\" the Fairmont Banff Springs Hotel, then continue to Bow Falls and Surprise Corner for postcard-perfect views." },
      { stop: "Day 2", title: "Bow Lake", body: "Drive north along the Icefields Parkway and stop at the mirror-calm Bow Lake to admire reflections of the Crowfoot Glacier." },
      { stop: "Day 2", title: "Columbia Icefield", body: "[Optional add-on] Board the giant Ice Explorer onto the Athabasca Glacier and feel the power of millennia-old ice." },
      { stop: "Day 2", title: "Peyto Lake", body: "Look down over the iconic fox-shaped glacial lake — its unique robin-egg blue water will take your breath away." },
      { stop: "Day 2", title: "Emerald Lake", body: "Step into Yoho National Park and enjoy this jade-green alpine lake surrounded by forest and peaks." },
      { stop: "Day 3", title: "Two Jack Lake", body: "A peaceful morning stop — if you're lucky, the mighty Mount Rundle will be perfectly mirrored on the surface." },
      { stop: "Day 3", title: "Moraine Lake", body: "A summer-only world-class wonder! We handle the strict access regulations and bring you directly to the iconic Rockpile for views of the Valley of the Ten Peaks." },
      { stop: "Day 3", title: "Lake Louise & Calgary Drop-off", body: "Stroll along the \"Jewel of the Rockies\" and admire the Victoria Glacier. After this final stop, we return to Calgary, arriving at YYC by approximately 5:00 PM." },
    ],
    roomOptions: [
      { label: "Family / Group Quad Room", guests: "4 Guests", price: "From $830 CAD / person" },
      { label: "Triple Shared Room", guests: "3 Guests", price: "From $890 CAD / person" },
      { label: "Private Double Room", guests: "2 Guests", price: "From $1050 CAD / person" },
    ],
    roomNote: ROOM_NOTE,
    included: [
      "Hotel accommodation",
      "Comfortable private vehicle transportation",
      "Professional driver/guide",
      "Parking fees for scheduled stops",
    ],
    notIncluded: [
      "Flights to/from Calgary",
      "5% tax",
      "Meals & personal allowance",
      "Optional attraction tickets",
      "Suggested guide gratuity",
      { text: "Parks Canada Discovery Pass (must be purchased individually by each guest in advance)", href: "https://parkscanadashop.ca/pages/discovery-pass" },
    ],
    optional: [
      "Banff Gondola: $90 CAD (ages 6–15 $60 CAD)",
      "Columbia Icefield Adventure: $100 CAD (ages 6–15 $60 CAD)",
      "Moraine Lake Shuttle / Access Pass: $16 CAD",
    ],
    notes: [
      { text: "Important: the Parks Canada Discovery Pass is not included in this tour price. Each guest must purchase their own Discovery Pass in advance under their own name and bring it on the tour day. Purchase link: ", href: "https://parkscanadashop.ca/pages/discovery-pass" },
      "The Discovery Pass must be purchased by each guest individually; the travel agency cannot purchase or share a pass on a guest's behalf. Not purchasing it in advance may affect entry into Canada's national parks and the tour schedule.",
      "Rocky Mountain weather changes quickly at high altitudes — dress in layers and bring a windproof, warm jacket.",
      "If you'd like to add optional activities (Icefield Adventure, Gondola, etc.), please tell us at booking so we can secure popular time slots in advance.",
    ],
    bookingCta: "Book Your Rocky Mountains 3-Day Tour",
  },
  {
    slug: "kelowna-2-day",
    img: kelownaHero,
    gallery: kelownaGallery,
    title: "Kelowna 2-Day Tour | Okanagan Lake & Winery Escape",
    desc: "Step away from the city for a relaxed two-day Okanagan Valley getaway.",
    intro:
      "This tour takes you to magnificent waterfalls, vibrant lakeshores, summer-only fruit picking, and renowned local wineries. Skip the long drive and complex planning — accommodation, transportation, and expert guiding are all included, so you and your loved ones can simply soak up the sunshine and enjoy a leisurely, lightly-buzzed escape.",
    duration: "2 days, 1 night",
    language: LANGUAGE_NOTE,
    price: "From $390 CAD / person",
    gratuity: "Suggested guide gratuity: $40 CAD / person ($20 CAD per day, 2 days)",
    itinerary: [
      { stop: "Day 1", title: "Bridal Falls", body: "Walk through lush forest trails to admire the graceful, veil-like waterfall." },
      { stop: "Day 1", title: "Merritt", body: "Pass through this country-music inland town and experience a completely different side of BC's landscape." },
      { stop: "Day 1", title: "Kelowna City Park", body: "Arrive in Kelowna and stroll the lovely lakeside park, soaking up the resort atmosphere." },
      { stop: "Day 1", title: "Okanagan Lake", body: "Cool off and enjoy the crystal-clear waters of Okanagan Lake — a relaxing summer afternoon." },
      { stop: "Day 2", title: "Fruit U-Pick", body: "Hand-pick seasonal fruit at its peak (cherries in July, peaches in August) and taste the difference of farm-fresh sweetness." },
      { stop: "Day 2", title: "Kangaroo Creek Farm", body: "Get close to adorable kangaroos, capybaras, and more — a heart-warming favorite for families." },
      { stop: "Day 2", title: "Winery Tour", body: "Visit a renowned local winery, sample the Okanagan Valley's best vintages surrounded by vineyards." },
    ],
    roomOptions: [
      { label: "Family / Group Quad Room", guests: "4 Guests", price: "From $999 CAD / person" },
      { label: "Triple Shared Room", guests: "3 Guests", price: "From $999 CAD / person" },
      { label: "Private Double Room", guests: "2 Guests", price: "From $999 CAD / person" },
    ],
    roomNote: ROOM_NOTE,
    included: [
      "1-night hotel accommodation",
      "Comfortable private vehicle transportation",
      "Professional guide",
      "Parking fees for scheduled stops",
    ],
    notIncluded: [
      "5% tax",
      "Meals",
      "Attraction admission tickets",
      "Suggested guide gratuity",
    ],
    optional: [
      "Kangaroo Farm Admission",
      "Winery Tasting Fees",
      "Fruit Picking Fees",
    ],
    notes: ["Summer sun is strong — please bring sun protection, and a swimsuit if you'd like to enjoy Okanagan Lake."],
    bookingCta: "Book Your Kelowna 2-Day Tour",
  },
  {
    slug: "western-usa-8-day",
    img: westernUsaHero,
    gallery: westernUsaGallery,
    title: "Western US 8-Day Tour | The Ultimate Red Rock & California Road Trip",
    desc: "An epic road trip spanning San Francisco, Las Vegas, hidden canyons, and Los Angeles.",
    intro:
      "We've perfectly connected the most iconic landmarks and natural wonders of the American West. Our dedicated fleet takes care of long-distance interstate driving and complex route planning. With premium accommodations, transportation, and professional guiding included, this 8-day journey is filled with awe and ease.",
    duration: "8 days, 7 nights",
    language: LANGUAGE_NOTE,
    price: "From $999 CAD / person",
    gratuity: "Suggested guide gratuity: $160 USD / person ($20 USD per day, 8 days)",
    pickup: "Departure: Day 1 at 10:30 AM pickup at San Francisco International Airport (SFO). Return: Day 8 at 3:00 PM drop-off at Los Angeles International Airport (LAX).",
    itinerary: [
      { stop: "Day 1", title: "SFO Airport & Golden Gate Bridge", body: "After morning pickup at SFO at 10:30 AM, head straight to San Francisco's iconic Golden Gate Bridge for stunning bay views." },
      { stop: "Day 1", title: "Pier 39", body: "Walk through the lively wharf, watch the lazy sea lions and enjoy San Francisco's relaxed bay atmosphere." },
      { stop: "Day 2", title: "Las Vegas Strip", body: "Drive to Nevada and arrive on the dazzling Las Vegas Strip — the world's entertainment capital." },
      { stop: "Day 2", title: "Fremont Street Light Show", body: "Join an evening tour to the old downtown for the spectacular Fremont Street Experience light show." },
      { stop: "Day 3", title: "Valley of Fire & Bryce Canyon", body: "Dive into unique red-rock landscapes — from Valley of Fire's surreal formations to the towering hoodoos of Bryce Canyon." },
      { stop: "Day 4", title: "Antelope Canyon & Horseshoe Bend", body: "Capture the magical light beams of the slot canyon, and visit the dramatic Horseshoe Bend carved by the Colorado River." },
      { stop: "Day 4", title: "Grand Canyon & Glen Canyon Dam", body: "Witness one of the Seven Natural Wonders of the World — the absolute awe of the Grand Canyon." },
      { stop: "Day 5", title: "Beverly Hills & Hollywood", body: "Arrive in LA, taste the iconic In-N-Out Burger, then visit Beverly Hills and the Hollywood Walk of Fame." },
      { stop: "Day 5", title: "Urban Light at LACMA", body: "End the day at LACMA's famous \"Urban Light\" lamp-post installation — a quintessential LA photo." },
      { stop: "Day 6", title: "Universal Studios Hollywood", body: "Spend a full day immersed in Hollywood's movie magic — thrilling rides and studio tours." },
      { stop: "Day 6", title: "Griffith Observatory", body: "End the evening at the observatory with sweeping views of LA's glittering nightscape." },
      { stop: "Day 7", title: "Disneyland California", body: "A full day at the Happiest Place on Earth — classic fairy tales and dazzling parades." },
      { stop: "Day 8", title: "Santa Monica, Getty & UCLA", body: "Visit UCLA, the architectural marvel of the Getty Center, then end at Santa Monica Beach. Arrive at LAX by approximately 3:00 PM." },
    ],
    roomOptions: [
      { label: "Family / Group Quad Room", guests: "4 Guests", price: "From $999 CAD / person" },
      { label: "Triple Shared Room", guests: "3 Guests", price: "From $999 CAD / person" },
      { label: "Private Double Room", guests: "2 Guests", price: "From $999 CAD / person" },
    ],
    roomNote: ROOM_NOTE,
    included: [
      "7-night hotel accommodation",
      "Comfortable private vehicle transportation",
      "Professional guide",
      "Parking fees for scheduled stops",
    ],
    notIncluded: [
      "5% tax",
      "Meals",
      "Attraction admission tickets",
      "Suggested guide gratuity",
    ],
    optional: [
      "Antelope Canyon guided tour",
      "Universal Studios Hollywood admission",
      "Disneyland California admission",
      "Grand Canyon helicopter experience",
    ],
    notes: [
      "Guests entering the US from Canada must bring a valid passport and confirm valid US visa or ESTA status.",
    ],
    bookingCta: "Book Your Western US 8-Day Tour",
  },
  {
    slug: "vegas-canyon-4-day",
    img: vegasCanyonHero,
    gallery: vegasCanyonGallery,
    title: "Las Vegas & Canyons 4-Day Tour | Neon Lights & Natural Wonders",
    desc: "The perfect blend of the peak of human entertainment and nature's masterpiece.",
    intro:
      "From the bustling nightlife of Las Vegas, journey deep into the red-rock grandeur of Bryce Canyon and the Grand Canyon. We provide comfortable transportation and quality accommodations, making it easy to shuttle between desert and canyon on a visually stunning journey.",
    duration: "4 days, 3 nights",
    language: LANGUAGE_NOTE,
    price: "From $999 CAD / person",
    gratuity: "Suggested guide gratuity: $80 USD / person ($20 USD per day, 4 days)",
    pickup: "Departure: Day 1 at 4:00 PM pickup at Paris Hotel Las Vegas. Return: Day 4 at 3:00 PM drop-off at Los Angeles International Airport (LAX).",
    itinerary: [
      { stop: "Day 1", title: "Las Vegas Strip & Night Tour", body: "Pickup at Paris Hotel Las Vegas at 4:00 PM. Tour the Strip and head downtown for the Fremont Street light show." },
      { stop: "Day 2", title: "Valley of Fire & Bryce Canyon", body: "Leave the city behind to explore Valley of Fire's blazing red rocks and the surreal hoodoos of Bryce Canyon." },
      { stop: "Day 3", title: "Antelope Canyon & Horseshoe Bend", body: "Marvel at the magical light beams in the slot canyon and look down on the 270° Horseshoe Bend." },
      { stop: "Day 3", title: "Grand Canyon & Glen Canyon Dam", body: "Visit the mighty Glen Canyon Dam, then the Grand Canyon National Park — pure natural awe." },
      { stop: "Day 4", title: "In-N-Out & LAX Drop-off", body: "Head to LA, stopping for the West Coast's iconic In-N-Out Burger, arriving at LAX by approximately 3:00 PM." },
    ],
    roomOptions: [
      { label: "Family / Group Quad Room", guests: "4 Guests", price: "From $999 CAD / person" },
      { label: "Triple Shared Room", guests: "3 Guests", price: "From $999 CAD / person" },
      { label: "Private Double Room", guests: "2 Guests", price: "From $999 CAD / person" },
    ],
    roomNote: ROOM_NOTE,
    included: [
      "3-night hotel accommodation",
      "Comfortable private vehicle transportation",
      "Professional guide",
      "Parking fees",
    ],
    notIncluded: [
      "5% tax",
      "Meals",
      "Attraction admission tickets",
      "Suggested guide gratuity",
    ],
    optional: ["Antelope Canyon guided tour", "Grand Canyon helicopter experience"],
    notes: [
      "Guests entering the US from Canada must bring a valid passport and confirm valid US visa or ESTA status.",
      "Wear comfortable shoes for canyon hikes; deserts have large day-night temperature swings, so dress in layers.",
    ],
    bookingCta: "Book Your Vegas & Canyon 4-Day Tour",
  },
  {
    slug: "los-angeles-3-day",
    img: la3Hero,
    gallery: la3Gallery,
    title: "Los Angeles 3-Day Tour | Theme Parks & California Sunshine",
    desc: "A condensed LA experience designed for travelers with limited time.",
    intro:
      "Three major theme parks and the city's iconic landmarks all in one trip. We save you the trouble of navigating LA's complex traffic and parking — comfortable transportation and accommodations included. Land and instantly start your private California holiday.",
    duration: "3 days, 2 nights",
    language: LANGUAGE_NOTE,
    price: "From $999 CAD / person",
    gratuity: "Suggested guide gratuity: $60 USD / person ($20 USD per day, 3 days)",
    pickup: "Departure: Day 1 at 11:50 AM pickup at Los Angeles International Airport (LAX). Return: Day 3 at 5:00 PM drop-off at LAX.",
    itinerary: [
      { stop: "Day 1", title: "LAX Pickup & Beverly Hills", body: "Pickup at LAX at 11:50 AM. After In-N-Out Burger, head to the Original Farmers Market and Beverly Hills for California vibes." },
      { stop: "Day 1", title: "Hollywood & Griffith Observatory", body: "Walk the Walk of Fame, then ascend Griffith Observatory in the evening for sweeping LA skyline views." },
      { stop: "Day 2", title: "Disneyland California", body: "A full day at Disneyland — full of laughter and magic." },
      { stop: "Day 3", title: "Universal Studios Hollywood", body: "Step into the world of cinema with thrilling rides and the classic studio tour. Drop-off at LAX by approximately 5:00 PM." },
    ],
    roomOptions: [
      { label: "Family / Group Quad Room", guests: "4 Guests", price: "From $999 CAD / person" },
      { label: "Triple Shared Room", guests: "3 Guests", price: "From $999 CAD / person" },
      { label: "Private Double Room", guests: "2 Guests", price: "From $999 CAD / person" },
    ],
    roomNote: ROOM_NOTE,
    included: [
      "2-night hotel accommodation",
      "Comfortable private vehicle transportation",
      "Professional guide",
      "Parking fees",
    ],
    notIncluded: [
      "5% tax",
      "Meals",
      "Attraction admission tickets",
      "Suggested guide gratuity",
    ],
    optional: ["Disneyland California admission", "Universal Studios Hollywood admission"],
    notes: [
      "Guests entering the US from Canada must bring a valid passport and confirm valid US visa or ESTA status.",
      "Theme park operating hours may vary by season — comfortable walking shoes are recommended.",
    ],
    bookingCta: "Book Your Los Angeles 3-Day Tour",
  },
  {
    slug: "oregon-coast-3-day",
    img: oregonHero,
    gallery: oregonGallery,
    title: "Oregon 3-Day Tour | Pacific Coast & Tax-Free Shopping",
    desc: "Head south to experience the unique charm of the Pacific Northwest.",
    intro:
      "This tour takes you through Seattle's iconic market, across Washington State to Oregon's stunning coastline, and into Portland for tax-free shopping fun. Combining natural beauty with urban shopping, with transportation and accommodation included — it's the perfect weekend cross-state escape.",
    duration: "3 days, 2 nights",
    language: LANGUAGE_NOTE,
    price: "From $999 CAD / person",
    gratuity: "Suggested guide gratuity: $60 USD / person ($20 USD per day, 3 days)",
    itinerary: [
      { stop: "Day 1", title: "Pike Place Market", body: "Visit Seattle's famous Pike Place Market and feel the distinctive coffee culture and lively seafood scene." },
      { stop: "Day 1", title: "Washington State Capitol & Seaside", body: "Tour the Washington State Capitol, then visit the Astoria Column, and end at the resort-town Seaside Beach." },
      { stop: "Day 2", title: "Cannon Beach & Tillamook", body: "See the iconic Haystack Rock, then visit the Tillamook Creamery for legendary ice cream and dairy products." },
      { stop: "Day 2", title: "Woodburn Outlets & Portland", body: "Enjoy tax-free shopping at Woodburn Premium Outlets. Then visit Powell's City of Books and Portland's famous food trucks." },
      { stop: "Day 3", title: "Columbia River Gorge", body: "Visit Vista House for sweeping gorge views, then admire the country's second-tallest waterfall — Multnomah Falls." },
      { stop: "Day 3", title: "Trader Joe's", body: "End the trip with a shopping stop at Trader Joe's for specialty snacks and souvenirs." },
    ],
    roomOptions: [
      { label: "Family / Group Quad Room", guests: "4 Guests", price: "From $999 CAD / person" },
      { label: "Triple Shared Room", guests: "3 Guests", price: "From $999 CAD / person" },
      { label: "Private Double Room", guests: "2 Guests", price: "From $999 CAD / person" },
    ],
    roomNote: ROOM_NOTE,
    included: [
      "2-night hotel accommodation",
      "Comfortable private vehicle transportation",
      "Professional guide",
      "Parking fees",
    ],
    notIncluded: [
      "5% tax",
      "Meals",
      "Attraction admission tickets",
      "Suggested guide gratuity",
    ],
    optional: ["Optional admissions beyond included stops", "Trader Joe's purchases"],
    notes: [
      "Guests entering the US from Canada must bring a valid passport and confirm valid US visa or ESTA status.",
      "Oregon coastal weather changes quickly — dress in layers and bring a windproof jacket.",
    ],
    bookingCta: "Book Your Oregon Coast 3-Day Tour",
  },
  {
    slug: "banff-two-lake-1-day",
    href: "/rocky-mountain-lake-tours",
    img: banffTwoLakeFeature,
    title: "Banff Two-Lake Tour 1-Day | Lake Louise & Moraine Lake",
    desc: "A single, unhurried day at the Canadian Rockies' two most iconic lakes — Lake Louise's mirror waters and Moraine Lake's Valley of the Ten Peaks.",
    intro: "A focused one-day journey to the Rockies' most photographed lakes, designed for slow looking and great light.",
    duration: "1 day",
    language: LANGUAGE_NOTE,
    price: "From $155 CAD / person",
    itinerary: [
      { stop: "Day 1", title: "Lake Louise", body: "Morning at the emerald mirror of Lake Louise, framed by Victoria Glacier." },
      { stop: "Day 1", title: "Moraine Lake", body: "Afternoon at Moraine Lake and the Valley of the Ten Peaks." },
    ],
    included: ["Comfortable private vehicle transportation", "Professional driver/guide"],
    notIncluded: [
      "5% tax",
      "Meals & personal allowance",
      "Suggested guide gratuity",
      { text: "Parks Canada Discovery Pass (must be purchased individually by each guest in advance)", href: "https://parkscanadashop.ca/pages/discovery-pass" },
    ],
    notes: [
      "A Parks Canada Discovery Pass is required to enter Banff National Park. Each guest must purchase their own pass in advance under their own name at parkscanadashop.ca — please bring it on tour day.",
      "Lake access varies by season — itinerary may adapt to road and weather conditions.",
      "Rocky Mountain weather changes quickly at high altitudes — dress in layers and bring a windproof, warm jacket.",
    ],
    bookingCta: "Book Your Banff Two-Lake 1-Day Tour",
  },
  {
    slug: "icefields-parkway-jasper-banff-shuttle",
    href: "/icefields-parkway-jasper-banff-shuttle-tours",
    img: tourIcefield,
    title: "Icefields Parkway, Jasper, Banff & Maligne Lake Shuttle Tours",
    desc: "Flexible weekday-based shuttles between Banff, Jasper, Hinton, the Columbia Icefield, Medicine Lake, and Maligne Lake — with optional attraction tickets and clear pickup options.",
    intro: "Weekday-based sightseeing shuttles and split-segment routes across the Icefields Parkway, with optional Columbia Icefield and Maligne Lake Cruise add-ons.",
    duration: "5 – 10 hours",
    language: LANGUAGE_NOTE,
    price: "From $130 CAD / person",
    itinerary: [
      { stop: "Mon / Fri", title: "Banff → Jasper Sightseeing Shuttle", body: "Northbound full-day sightseeing along the Icefields Parkway with optional Columbia Icefield stop." },
      { stop: "Tue / Sat", title: "Split-Segment Jasper & Maligne Lake Routes", body: "Mix-and-match 5-hour segments between Banff, Jasper, Medicine Lake, and Maligne Lake." },
      { stop: "Wed / Sun", title: "Jasper → Banff Southbound Sightseeing", body: "Full-day southbound transfer with stops at Athabasca Falls, Columbia Icefield, Peyto Lake, and Bow Lake." },
    ],
    included: [
      "Comfortable transportation",
      "Scheduled pickup and drop-off based on selected route",
      "Planned sightseeing stops for sightseeing routes",
      "Booking support from Shooting Star Travel",
    ],
    notIncluded: [
      "5% GST",
      "Meals and drinks",
      "Guide gratuity",
      "Optional attraction tickets unless selected as add-ons",
      { text: "Parks Canada Discovery Pass (must be purchased individually by each guest in advance)", href: "https://parkscanadashop.ca/pages/discovery-pass" },
    ],
    notes: [
      "Routes operate on different days — Mon/Fri, Tue/Sat, and Wed/Sun each run a different product set.",
      "A $20 per person weekend surcharge is automatically added to base fares on Friday, Saturday, and Sunday.",
      "Times are planned estimates; mountain weather and road conditions may affect schedule.",
    ],
    bookingCta: "Reserve Your Route",
  },
  {
    slug: "fruit-upick-crab-catching",
    img: tourVancouver,
    title: "Fruit U-Pick & Crab Catching",
    desc: "Seasonal local day tour featuring a U-pick farm visit, Fort Langley, and crab catching experience.",
    intro: "Stops: U-pick farm; Fort Langley; crab catching. Includes car, driver/tour guide, and parking. Excludes tip $20, meals, U-pick cost, and fishing license.",
    duration: "1 day",
    language: LANGUAGE_NOTE,
    price: "From $150 CAD / person",
    itinerary: [
      { stop: "Day 1", title: "U-pick farm", body: "Guided visit / stop at U-pick farm." },
      { stop: "Day 1", title: "Fort Langley", body: "Guided visit / stop at Fort Langley." },
      { stop: "Day 1", title: "crab catching", body: "Guided visit / stop at crab catching." }
    ],
    included: ["Car", "Driver / tour guide", "Parking"],
    notIncluded: ["Tip $20", "Meals", "U-pick cost", "Fishing license", "GST"],
    optional: ["U-pick cost", "Fishing license"],
    notes: ["Latest Kim message. No fixed dates", "create as contact/open request or add sessions later."],
    bookingCta: "Book Your Fruit U-Pick & Crab Catching",
  },
  {
    slug: "vancouver-city-tour",
    img: tourVancouver,
    title: "Vancouver City Tour",
    desc: "A full-day Vancouver highlights tour covering Canada Place, Gastown, Chinatown, Queen Elizabeth Park, Granville Island, Stanley Park, and Capilano or Lynn Canyon.",
    intro: "Stops: Canada Place; Gastown Steam Clock; Chinatown; Queen Elizabeth Park; Granville Island; Stanley Park; Capilano Suspension Bridge or Lynn Canyon. Includes car, driver/tour guide, and parking. Excludes tip $20, meals, and admission.",
    duration: "1 day",
    language: LANGUAGE_NOTE,
    price: "From $150 CAD / person",
    itinerary: [
      { stop: "Day 1", title: "Canada Place", body: "Guided visit / stop at Canada Place." },
      { stop: "Day 1", title: "Gastown Steam Clock", body: "Guided visit / stop at Gastown Steam Clock." },
      { stop: "Day 1", title: "Chinatown", body: "Guided visit / stop at Chinatown." },
      { stop: "Day 1", title: "Queen Elizabeth Park", body: "Guided visit / stop at Queen Elizabeth Park." },
      { stop: "Day 1", title: "Granville Island", body: "Guided visit / stop at Granville Island." },
      { stop: "Day 1", title: "Stanley Park", body: "Guided visit / stop at Stanley Park." },
      { stop: "Day 1", title: "Capilano Suspension Bridge or Lynn Canyon", body: "Guided visit / stop at Capilano Suspension Bridge or Lynn Canyon." }
    ],
    included: ["Car", "Driver / tour guide", "Parking"],
    notIncluded: ["Tip $20", "Meals", "Admission", "GST"],
    optional: ["Capilano Suspension Bridge admission if selected"],
    notes: ["Latest Kim message. Confirm after 5 people."],
    bookingCta: "Book Your Vancouver City Tour",
  },
  {
    slug: "seattle-tech-tour",
    img: seattleHero,
    title: "Seattle Tech Tour",
    desc: "A Seattle technology-focused day tour visiting Microsoft Visitor Center, University of Washington, Boeing Flight Museum, and Amazon Go.",
    intro: "Stops: Microsoft Visitor Center; University of Washington; Boeing Flight Museum; Amazon Go. Includes bus, driver, guide, and parking. Excludes meals, tip $20, and admission.",
    duration: "1 day",
    language: LANGUAGE_NOTE,
    price: "From $180 CAD / person",
    itinerary: [
      { stop: "Day 1", title: "Microsoft Visitor Center", body: "Guided visit / stop at Microsoft Visitor Center." },
      { stop: "Day 1", title: "University of Washington", body: "Guided visit / stop at University of Washington." },
      { stop: "Day 1", title: "Boeing Flight Museum", body: "Guided visit / stop at Boeing Flight Museum." },
      { stop: "Day 1", title: "Amazon Go", body: "Guided visit / stop at Amazon Go." }
    ],
    included: ["Bus", "Driver", "Guide", "Parking"],
    notIncluded: ["Meals", "Tip $20", "Admission", "GST"],
    optional: ["Boeing Flight Museum admission"],
    notes: ["Kim message contains conflict: first says confirm after 7 people", "later date section says confirm after 10 people. Using 10 because it appears in latest date summary."],
    bookingCta: "Book Your Seattle Tech Tour",
  },
  {
    slug: "jet-johnston-emerald-takakkaw",
    img: bgLake,
    title: "JET 1-Day Tour | Johnston Canyon, Emerald Lake & Takakkaw Falls",
    desc: "A Rockies day tour combining Johnston Canyon short hike, Natural Bridge, Emerald Lake, and Takakkaw Falls.",
    intro: "Itinerary: Johnston Canyon short hiking; Natural Bridge; Emerald Lake; Takakkaw Falls. This product is from the Banff/Rockies day-tour file and Kim’s latest JET itinerary.",
    duration: "1 day",
    language: LANGUAGE_NOTE,
    price: "From $170 CAD / adult",
    itinerary: [
      { stop: "Day 1", title: "JET 1-Day Tour | Johnston Canyon, Emerald Lake & Takakkaw Falls", body: "Guided visit / stop at JET 1-Day Tour | Johnston Canyon, Emerald Lake & Takakkaw Falls." }
    ],
    included: ["Comfortable transportation"],
    notIncluded: ["GST", "Meals and drinks", "Personal expenses", "Optional self-guided hikes", "Suggested guide gratuity"],
    optional: ["None listed"],
    notes: ["Price from Banff CSV D. Latest Kim itinerary confirms JET stops but did not provide dates."],
    bookingCta: "Book Your JET 1-Day Tour",
  },
  {
    slug: "5-lakes-tour",
    img: banffTwoLakeFeature,
    title: "5 Lakes 1-Day Tour",
    desc: "A Rockies lake-focused day tour visiting Two Jack Lake, Lake Minnewanka, Lake Louise, Moraine Lake, Natural Bridge, and Emerald Lake.",
    intro: "Itinerary: Two Jack Lake; Lake Minnewanka; Lake Louise; Moraine Lake; Natural Bridge; Emerald Lake. Designed for guests who want to see multiple iconic Rockies lakes in one day.",
    duration: "1 day",
    language: LANGUAGE_NOTE,
    price: "From $230 CAD / adult",
    itinerary: [
      { stop: "Day 1", title: "5 Lakes 1-Day Tour", body: "Guided visit / stop at 5 Lakes 1-Day Tour." }
    ],
    included: ["Comfortable transportation"],
    notIncluded: ["GST", "Meals and drinks", "Personal expenses", "Canoe rental", "Optional hikes", "Suggested guide gratuity"],
    optional: ["Canoe rental", "Optional self-guided hikes"],
    notes: ["Price from Banff CSV C. Latest Kim itinerary confirms 5 Lakes stops but did not provide dates."],
    bookingCta: "Book Your 5 Lakes 1-Day Tour",
  },
  {
    slug: "moraine-lake-lake-louise-half-day",
    img: heroBgMoraine,
    title: "Moraine Lake & Lake Louise Exploration",
    desc: "A relaxed Banff lake journey to Moraine Lake and Lake Louise.",
    intro: "A relaxed journey from Banff to Moraine Lake and Lake Louise, ideal for guests who want a comfortable lake experience without a full-day commitment.",
    duration: "5 hours",
    language: LANGUAGE_NOTE,
    price: "From $130 CAD / adult",
    itinerary: [
      { stop: "Day 1", title: "Moraine Lake & Lake Louise Exploration", body: "Guided visit / stop at Moraine Lake & Lake Louise Exploration." }
    ],
    included: ["Transportation", "Banff pickup", "Moraine Lake visit", "Lake Louise visit"],
    notIncluded: ["GST", "Meals and drinks", "Personal expenses", "Canoe rental", "Optional hikes", "Suggested guide gratuity"],
    optional: ["Canoe rental"],
    notes: ["From Banff CSV product B."],
    bookingCta: "Book Your Moraine Lake & Lake Louise Exploration",
  },
  {
    slug: "moraine-lake-sunrise-tour",
    img: heroBgMoraine,
    title: "Moraine Lake Sunrise Tour",
    desc: "Early morning sunrise tour to Moraine Lake with Lake Louise free time.",
    intro: "Early-morning Rockies experience for first light at Moraine Lake plus extended free time at Lake Louise.",
    duration: "1 day",
    language: LANGUAGE_NOTE,
    price: "From $190 CAD / adult",
    itinerary: [
      { stop: "Day 1", title: "Moraine Lake Sunrise Tour", body: "Guided visit / stop at Moraine Lake Sunrise Tour." }
    ],
    included: ["Transportation", "Canmore/Banff pickup", "Moraine Lake visit", "Lake Louise visit"],
    notIncluded: ["GST", "Meals and drinks", "Personal expenses", "Suggested guide gratuity"],
    optional: ["None listed"],
    notes: ["From Banff CSV product E."],
    bookingCta: "Book Your Moraine Lake Sunrise Tour",
  },
  {
    slug: "rockies-signature-columbia-icefield",
    img: tourIcefield,
    title: "Rockies Signature 1-Day Tour | Columbia Icefield & Scenic Highway",
    desc: "A Rockies scenic highway day tour covering Crowfoot Glacier, Peyto Lake, Saskatchewan River Crossing, Columbia Icefield, and Bow Lake.",
    intro: "Itinerary: Crowfoot Glacier; Peyto Lake; Saskatchewan River Crossing; Columbia Icefield Glacier Discovery Centre; Bow Lake.",
    duration: "1 day",
    language: LANGUAGE_NOTE,
    price: "From $230 CAD / adult",
    itinerary: [
      { stop: "Day 1", title: "Rockies Signature 1-Day Tour | Columbia Icefield & Scenic Highway", body: "Guided visit / stop at Rockies Signature 1-Day Tour | Columbia Icefield & Scenic Highway." }
    ],
    included: ["Comfortable transportation"],
    notIncluded: ["GST", "Meals and drinks", "Personal expenses", "Optional attraction tickets", "Suggested guide gratuity"],
    optional: ["Columbia Icefield Ice Explorer if requested"],
    notes: ["From Banff CSV product A."],
    bookingCta: "Book Your Rockies Signature 1-Day Tour",
  },
  {
    slug: "banff-to-jasper-sightseeing-shuttle",
    img: tourIcefield,
    title: "Banff to Jasper Sightseeing Shuttle",
    desc: "Sightseeing transfer from Banff to Jasper with Icefields Parkway stops and optional Hinton extension.",
    intro: "Sightseeing transfer from Banff to Jasper with Icefields Parkway stops and optional Hinton extension. Add-ons: Columbia Icefield Ice Explorer Adult +$90 / Child +$60; Hinton extension +$20 one-way / +$35 round-trip",
    duration: "9~10 hours",
    language: LANGUAGE_NOTE,
    price: "From $210 CAD / adult",
    itinerary: [
      { stop: "Day 1", title: "Banff to Jasper Sightseeing Shuttle", body: "Guided visit / stop at Banff to Jasper Sightseeing Shuttle." }
    ],
    included: ["Transportation", "Scheduled pickup/drop-off"],
    notIncluded: ["GST", "Meals", "Personal expenses", "Optional add-ons", "Suggested gratuity"],
    optional: ["Columbia Icefield Ice Explorer Adult +$90 / Child +$60", "Hinton extension +$20 one-way / +$35 round-trip"],
    notes: ["From Icefields/Jasper shuttle xlsx. Confirm if each should be separate Rezdy product or grouped."],
    bookingCta: "Book Your Banff to Jasper Sightseeing Shuttle",
  },
  {
    slug: "jasper-maligne-lake-spirit-island-day-tour",
    img: destJasper,
    title: "Jasper & Maligne Lake Spirit Island Day Tour",
    desc: "Jasper and Maligne Lake / Spirit Island day tour with optional cruise.",
    intro: "Jasper and Maligne Lake / Spirit Island day tour with optional cruise. Add-ons: Maligne Lake Cruise Adult +$115 / Child +$76",
    duration: "5~6 hours",
    language: LANGUAGE_NOTE,
    price: "From $90 CAD / adult",
    itinerary: [
      { stop: "Day 1", title: "Jasper & Maligne Lake Spirit Island Day Tour", body: "Guided visit / stop at Jasper & Maligne Lake Spirit Island Day Tour." }
    ],
    included: ["Transportation", "Scheduled pickup/drop-off"],
    notIncluded: ["GST", "Meals", "Personal expenses", "Optional add-ons", "Suggested gratuity"],
    optional: ["Maligne Lake Cruise Adult +$115 / Child +$76"],
    notes: ["From Icefields/Jasper shuttle xlsx. Confirm if each should be separate Rezdy product or grouped."],
    bookingCta: "Book Your Jasper & Maligne Lake Spirit Island Day Tour",
  },
  {
    slug: "jasper-to-banff-express-shuttle",
    img: tourIcefield,
    title: "Jasper to Banff Express Shuttle",
    desc: "Evening Jasper to Banff express shuttle.",
    intro: "Evening Jasper to Banff express shuttle. Add-ons: None listed",
    duration: "~5 hours",
    language: LANGUAGE_NOTE,
    price: "From $150 CAD / adult",
    itinerary: [
      { stop: "Day 1", title: "Jasper to Banff Express Shuttle", body: "Guided visit / stop at Jasper to Banff Express Shuttle." }
    ],
    included: ["Transportation", "Scheduled pickup/drop-off"],
    notIncluded: ["GST", "Meals", "Personal expenses", "Optional add-ons", "Suggested gratuity"],
    optional: ["None listed"],
    notes: ["From Icefields/Jasper shuttle xlsx. Confirm if each should be separate Rezdy product or grouped."],
    bookingCta: "Book Your Jasper to Banff Express Shuttle",
  },
  {
    slug: "banff-to-jasper-express-shuttle",
    img: tourIcefield,
    title: "Banff to Jasper Express Shuttle",
    desc: "Fast Banff to Jasper shuttle with optional Hinton extension.",
    intro: "Fast Banff to Jasper shuttle with optional Hinton extension. Add-ons: Hinton extension +$20 one-way / +$35 round-trip",
    duration: "~5 hours",
    language: LANGUAGE_NOTE,
    price: "From $150 CAD / adult",
    itinerary: [
      { stop: "Day 1", title: "Banff to Jasper Express Shuttle", body: "Guided visit / stop at Banff to Jasper Express Shuttle." }
    ],
    included: ["Transportation", "Scheduled pickup/drop-off"],
    notIncluded: ["GST", "Meals", "Personal expenses", "Optional add-ons", "Suggested gratuity"],
    optional: ["Hinton extension +$20 one-way / +$35 round-trip"],
    notes: ["From Icefields/Jasper shuttle xlsx. Confirm if each should be separate Rezdy product or grouped."],
    bookingCta: "Book Your Banff to Jasper Express Shuttle",
  },
  {
    slug: "jasper-medicine-lake-maligne-lake-half-day-tour",
    img: destJasper,
    title: "Jasper Medicine Lake & Maligne Lake Half-Day Tour",
    desc: "Half-day lake sightseeing from Jasper to Medicine Lake and Maligne Lake.",
    intro: "Half-day lake sightseeing from Jasper to Medicine Lake and Maligne Lake. Add-ons: Maligne Lake Cruise Adult +$115 / Child +$76",
    duration: "5~6 hours",
    language: LANGUAGE_NOTE,
    price: "From $90 CAD / adult",
    itinerary: [
      { stop: "Day 1", title: "Jasper Medicine Lake & Maligne Lake Half-Day Tour", body: "Guided visit / stop at Jasper Medicine Lake & Maligne Lake Half-Day Tour." }
    ],
    included: ["Transportation", "Scheduled pickup/drop-off"],
    notIncluded: ["GST", "Meals", "Personal expenses", "Optional add-ons", "Suggested gratuity"],
    optional: ["Maligne Lake Cruise Adult +$115 / Child +$76"],
    notes: ["From Icefields/Jasper shuttle xlsx. Confirm if each should be separate Rezdy product or grouped."],
    bookingCta: "Book Your Jasper Medicine Lake & Maligne Lake Half-Day Tour",
  },
  {
    slug: "victoria-nanaimo-2-day",
    img: victoriaHero,
    title: "Victoria + Nanaimo 2-Day Tour",
    desc: "Two-day Vancouver Island tour combining Victoria and Nanaimo highlights.",
    intro: "Latest Kim message only provides dates and minimum group size. Full itinerary, inclusions, exclusions, and price must be confirmed before final Rezdy publication.",
    duration: "2 days, 1 night",
    language: LANGUAGE_NOTE,
    price: "Contact us for pricing",
    itinerary: [
      { stop: "Itinerary", title: "Victoria + Nanaimo 2-Day Tour", body: "Guided visit / stop at Victoria + Nanaimo 2-Day Tour." }
    ],
    included: ["CLIENT TO CONFIRM"],
    notIncluded: ["CLIENT TO CONFIRM"],
    optional: ["CLIENT TO CONFIRM"],
    notes: ["Price and itinerary not present in latest Kim message or extracted files."],
    bookingCta: "Book Your Victoria + Nanaimo 2-Day Tour",
  },
  {
    slug: "los-angeles-4-day",
    img: la3Hero,
    title: "Los Angeles 4-Day Tour | Theme Parks & California Highlights",
    desc: "Four-day Los Angeles itinerary with LAX pickup, In-N-Out, Farmers Market, Beverly Hills, Hollywood, Universal Studios, Griffith Observatory, Disneyland, Santa Monica, UCLA, and The Getty.",
    intro: "Day 1: LAX 12 PM pickup, In-N-Out Burger lunch, Farmers Market, Beverly Hills, Hollywood, Urban Lights. Day 2: Universal Studios, Griffith Observatory. Day 3: Disneyland. Day 4: Santa Monica Beach, UCLA, The Getty, LAX drop-off 3:30 PM.",
    duration: "4 days, 3 nights",
    language: LANGUAGE_NOTE,
    price: "Contact us for pricing",
    itinerary: [
      { stop: "Itinerary", title: "Los Angeles 4-Day Tour | Theme Parks & California Highlights", body: "Guided visit / stop at Los Angeles 4-Day Tour | Theme Parks & California Highlights." }
    ],
    included: ["Hotel 3 nights with breakfast", "Bus", "Driver/tour guide", "Parking"],
    notIncluded: ["Flight", "Tip USD $80", "Meals", "Admission", "GST if charged in CAD"],
    optional: ["Universal Studios", "Disneyland", "The Getty as applicable"],
    notes: ["Latest Kim itinerary. Price not supplied in latest message or extracted files."],
    bookingCta: "Book Your Los Angeles 4-Day Tour",
  },
  {
    slug: "eastern-canada-luxury-5-day",
    img: tourToronto,
    title: "Eastern Canada Luxury 5-Day Tour | Niagara Falls, Quebec & Montreal",
    desc: "Luxury Eastern Canada five-day tour covering Toronto, Niagara Falls, Kingston, Ottawa, Quebec City, and Montreal with premium hotel highlights.",
    intro: "Day 1 Toronto airport pickup 2:30 PM, CN Tower, Toronto City Hall, Niagara View Hotel. Day 2 Niagara Falls, Table Rock, Floral Clock, Niagara-on-the-Lake, winery. Day 3 Kingston, Thousand Island Cruise, Ottawa, Parliament, Rideau Hall, Rideau Canal. Day 4 Quebec upper/lower town and Fairmont Frontenac. Day 5 Montreal highlights and airport drop-off 2:30 PM.",
    duration: "5 days, 4 nights",
    language: LANGUAGE_NOTE,
    price: "From $1840 CAD / person",
    itinerary: [
      { stop: "Itinerary", title: "Eastern Canada Luxury 5-Day Tour | Niagara Falls, Quebec & Montreal", body: "Guided visit / stop at Eastern Canada Luxury 5-Day Tour | Niagara Falls, Quebec & Montreal." }
    ],
    included: ["Hotel", "Bus", "Driver", "Tour guide", "Tip", "Meals", "3 admissions: Niagara cruise, Thousand Island cruise, Saint Joseph's Oratory", "Parking"],
    notIncluded: ["Flight", "3 meals + breakfast per Kim note"],
    optional: ["Extra admissions not listed as included"],
    notes: ["Kim text says included meals but excluded 3 meals + breakfast", "flag to confirm wording."],
    bookingCta: "Book Your Eastern Canada Luxury 5-Day Tour",
  },
  {
    slug: "eastern-canada-5-day",
    img: tourToronto,
    title: "Eastern Canada 5-Day Tour | Niagara Falls, Quebec & Montreal",
    desc: "Standard Eastern Canada five-day tour covering Toronto, Ottawa, Montreal, Quebec City, Kingston, Thousand Islands, and Niagara Falls.",
    intro: "Itinerary includes Toronto airport pickup, CN Tower, Toronto City Hall, University of Toronto, Chinatown, Ottawa Parliament/Rideau Hall/Rideau Canal, Montreal Saint Joseph's Oratory, Quebec upper/lower town, Montmorency Falls, Thousand Islands Cruise, Niagara Falls, Table Rock, Floral Clock, Niagara-on-the-Lake, and winery. Drop-off Toronto airport 6 PM.",
    duration: "5 days, 4 nights",
    language: LANGUAGE_NOTE,
    price: "From $1331 CAD / person",
    itinerary: [
      { stop: "Itinerary", title: "Eastern Canada 5-Day Tour | Niagara Falls, Quebec & Montreal", body: "Guided visit / stop at Eastern Canada 5-Day Tour | Niagara Falls, Quebec & Montreal." }
    ],
    included: ["Hotel", "Bus", "Driver/guide", "9 meals"],
    notIncluded: ["Flight", "Tip $100", "hotel/restaurant tip $22", "3 meals", "all admission", "GST"],
    optional: ["CN Tower $60", "Niagara Falls Cruise $55", "Thousand Islands Cruise $42", "Saint Joseph's Oratory $6", "Montmorency Falls $16"],
    notes: ["Kim says all listed dates confirmed."],
    bookingCta: "Book Your Eastern Canada 5-Day Tour",
  },
  {
    slug: "icefields-parkway-southbound-sightseeing-shuttle",
    img: tourIcefield,
    title: "Icefields Parkway Southbound Sightseeing Shuttle",
    desc: "Southbound Icefields Parkway sightseeing shuttle from Jasper/Hinton to Banff.",
    intro: "Southbound Icefields Parkway sightseeing shuttle from Jasper/Hinton to Banff. Add-ons: Columbia Icefield Ice Explorer Adult +$90 / Child +$60; Hinton pickup +$20 one-way / +$35 round-trip",
    duration: "Approx. 10 hours",
    language: LANGUAGE_NOTE,
    price: "From $210 CAD / adult",
    itinerary: [
      { stop: "Day 1", title: "Icefields Parkway Southbound Sightseeing Shuttle", body: "Guided visit / stop at Icefields Parkway Southbound Sightseeing Shuttle." }
    ],
    included: ["Transportation", "Scheduled pickup/drop-off"],
    notIncluded: ["GST", "Meals", "Personal expenses", "Optional add-ons", "Suggested gratuity"],
    optional: ["Columbia Icefield Ice Explorer Adult +$90 / Child +$60", "Hinton pickup +$20 one-way / +$35 round-trip"],
    notes: ["From Icefields/Jasper shuttle xlsx. Confirm if each should be separate Rezdy product or grouped."],
    bookingCta: "Book Your Icefields Parkway Southbound Sightseeing Shuttle",
  },
];

export function getTour(slug: string) {
  return tours.find((t) => t.slug === slug);
}
