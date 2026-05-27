import tourBanff from "@/assets/tour-banff.webp";
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
  notIncluded?: string[];
  /** Optional self-paid experiences guests can add. */
  optional?: string[];
  /** Travel notes / good-to-know paragraph or list. */
  notes: string[];
  /** Booking call-to-action label for this tour. */
  bookingCta?: string;
  /** Legacy fields kept optional for compatibility with existing UI. */
  bring?: string[];
  faq?: { q: string; a: string }[];
  departures?: { date: string; seats: number }[];
  packages?: string[];
};

export const tours: Tour[] = [
  {
    slug: "seattle-1-day",
    img: seattleHero,
    gallery: seattleGallery,
    title: "Seattle 1-Day Tour | The Soul of the Emerald City",
    desc: "A guided one-day city escape covering Seattle's skyline, Pike Place Market, the Original Starbucks, Amazon Spheres, and the University of Washington.",
    intro:
      "Discover the best of Seattle in one thoughtfully planned day trip. From postcard-perfect skyline views and the historic Pike Place Market to the city's modern tech landmarks and the beautiful University of Washington campus, this tour is designed for travelers who want to experience Seattle without the stress of driving, parking, or planning every stop. A comfortable guided city escape for guests who want a smooth, efficient, and memorable introduction to the Emerald City.",
    duration: "1 day",
    language: "English / Mandarin / Korean",
    price: "From $140 USD / person",
    gratuity: "$20 USD / person",
    itinerary: [
      { stop: "Stop 1", title: "Kerry Park", body: "Enjoy one of Seattle's most iconic viewpoints, where the Space Needle, downtown skyline, Puget Sound, and Mount Rainier can be seen together on clear days." },
      { stop: "Stop 2", title: "Amazon Spheres", body: "Visit the exterior of Amazon's famous glass-dome landmark — a glimpse into Seattle's role as a global technology hub. Interior access is not included as the Spheres are primarily a private workspace." },
      { stop: "Stop 3", title: "Pike Place Market", body: "Explore one of the oldest public markets in the United States. Local food, fresh seafood, artisan shops, the famous flying fish, and the lively atmosphere of Seattle's waterfront market." },
      { stop: "Stop 4", title: "Original Starbucks", body: "Stop by the historic first Starbucks location, opened in 1971, and experience one of Seattle's most famous cultural landmarks." },
      { stop: "Stop 5", title: "Gum Wall", body: "Visit one of Seattle's most unusual and colorful photo spots, located near Pike Place Market." },
      { stop: "Stop 6", title: "Space Needle & Chihuly Garden and Glass", body: "Guests may choose to visit the Space Needle or Chihuly Garden and Glass as optional self-paid attractions, depending on personal preference and available time." },
      { stop: "Stop 7", title: "University of Washington", body: "Walk through one of the most beautiful university campuses in the United States, including the famous Suzzallo Library — known for its grand Gothic-style reading room and, in spring, the campus cherry blossoms." },
    ],
    included: [
      "Comfortable transportation",
      "Professional bilingual guide",
      "Parking fees for scheduled tour stops",
    ],
    notIncluded: [
      "5% tax",
      "Meals",
      "Attraction admission tickets",
      "Suggested Guide Gratuity",
    ],
    optional: [
      "Space Needle Admission",
      "Chihuly Garden and Glass Admission",
    ],
    notes: [
      "Seattle weather can change quickly. Layered clothing, a light rain jacket, and comfortable walking shoes are recommended.",
    ],
    bookingCta: "Book Your Seattle 1-Day Tour",
  },
  {
    slug: "seattle-2-day",
    img: seattle2Hero,
    gallery: seattle2Gallery,
    title: "Seattle 2-Day Tour | The Ultimate Seattle Getaway & Shopping Experience",
    desc: "An overnight Seattle getaway with iconic landmarks, local seafood, aviation history, Trader Joe's, and Seattle Premium Outlets. Hotel included.",
    intro:
      "Enjoy a relaxed overnight Seattle getaway with iconic landmarks, local food, aviation history, and premium outlet shopping. This two-day tour is ideal for guests who want more time in Seattle without the fatigue of cross-border driving, hotel planning, parking, and carrying shopping bags from place to place. With hotel accommodation, transportation, and a professional guide included, this tour offers a smoother and more comfortable way to experience Seattle.",
    duration: "2 days, 1 night",
    language: "English / Mandarin / Korean",
    price: "From $370 USD / person",
    gratuity: "$40 USD / person for 2 days",
    itinerary: [
      { stop: "Day 1", title: "Kerry Park", body: "Start with Seattle's classic skyline viewpoint featuring the Space Needle, downtown Seattle, Puget Sound, and Mount Rainier on clear days." },
      { stop: "Day 1", title: "Pike Place Market", body: "Visit the city's most famous public market, known for fresh seafood, local vendors, the flying fish, and vibrant Seattle culture." },
      { stop: "Day 1", title: "Original Starbucks", body: "Stop at the historic first Starbucks location and experience one of Seattle's most recognized landmarks." },
      { stop: "Day 1", title: "The Crab Pot", body: "A scheduled stop at Seattle's famous waterfront seafood restaurant. Meal cost is not included; guests may order based on personal preference." },
      { stop: "Day 1", title: "Museum of Flight", body: "Explore Seattle's aviation heritage at one of the world's largest independent air and space museums. Admission is optional and self-paid." },
      { stop: "Day 1", title: "Trader Joe's", body: "Shopping time at one of the most popular U.S. grocery stops for Canadian visitors — known for snacks, specialty items, seasonings, and reusable bags." },
      { stop: "Day 2", title: "Space Needle / Chihuly Museum", body: "Guests may choose to visit the Space Needle or Chihuly Garden and Glass as optional self-paid attractions." },
      { stop: "Day 2", title: "Gas Works Park", body: "Visit one of Seattle's most unique parks, known for its industrial structures and skyline views across Lake Union." },
      { stop: "Day 2", title: "University of Washington", body: "Walk through the beautiful University of Washington campus and visit the exterior or accessible areas of Suzzallo Library when available." },
      { stop: "Day 2", title: "Seattle Premium Outlets", body: "End the trip with dedicated shopping time at Seattle Premium Outlets, featuring a wide selection of international and designer brands." },
    ],
    roomOptions: [
      { label: "Family / Group Quad Room", guests: "4 Guests", price: "From $370 USD / person" },
      { label: "Triple Shared Room", guests: "3 Guests", price: "From $400 USD / person" },
      { label: "Private Double Room", guests: "2 Guests", price: "From $430 USD / person" },
    ],
    roomNote: "Room rates become more cost-efficient when shared with additional guests due to hotel room allocation.",
    included: [
      "1-night hotel accommodation",
      "Comfortable transportation",
      "Professional guide",
      "Parking fees for scheduled tour stops",
    ],
    notIncluded: [
      "5% tax",
      "Meals",
      "Attraction admission tickets",
      "Suggested Guide Gratuity",
    ],
    optional: [
      "Space Needle Admission",
      "Chihuly Garden and Glass Admission",
      "Museum of Flight Admission",
    ],
    notes: [
      "Guests crossing from Canada must bring a valid passport and ensure their U.S. visa or ESTA status is valid if required.",
    ],
    bookingCta: "Book Your Seattle 2-Day Getaway",
  },
  {
    slug: "victoria-1-day",
    img: victoriaHero,
    gallery: victoriaGallery,
    title: "Victoria 1-Day Tour | British Charm & Coastal Garden Escape",
    desc: "A scenic island day trip with BC Ferries included, featuring Victoria's Inner Harbour, Fisherman's Wharf, Government Street, and optional Butchart Gardens.",
    intro:
      "Experience the elegance of Victoria in one seamless day trip. This tour includes round-trip BC Ferries transportation and takes guests through the scenic Gulf Islands to British Columbia's charming capital — known for its historic architecture, beautiful harbour, colourful floating homes, and world-famous gardens. A comfortable and well-organized island escape designed to remove the stress of ferry planning, vehicle boarding, and island driving.",
    duration: "1 day",
    language: "English / Mandarin / Korean",
    price: "From $170 USD / person",
    gratuity: "$20 USD / person",
    itinerary: [
      { stop: "Stop 1", title: "BC Ferries Scenic Cruise", body: "Travel across the beautiful Georgia Strait and Gulf Islands by ferry. Enjoy ocean views, fresh air, and the relaxed pace of the journey." },
      { stop: "Stop 2", title: "The Butchart Gardens", body: "Visit one of Victoria's most famous attractions and one of the world's most celebrated floral gardens. Admission is optional and self-paid." },
      { stop: "Stop 3", title: "Fisherman's Wharf", body: "Explore a colourful floating home community with local food, harbour views, and a relaxed seaside atmosphere." },
      { stop: "Stop 4", title: "Mile Zero Monument", body: "Stop at the symbolic starting point of the Trans-Canada Highway and enjoy views of the surrounding coastline." },
      { stop: "Stop 5", title: "Inner Harbour & Government Street", body: "Walk through the heart of Victoria, including the BC Parliament Buildings, Fairmont Empress Hotel, harbourfront views, shops, cafés, and British-inspired streetscapes." },
    ],
    included: [
      "Comfortable transportation",
      "Professional guide",
      "Round-trip BC Ferries tickets",
      "Vehicle boarding fees",
      "Parking fees for scheduled tour stops",
    ],
    notIncluded: [
      "5% tax",
      "Meals",
      "Attraction admission tickets",
      "Suggested Guide Gratuity",
    ],
    optional: ["The Butchart Gardens Admission"],
    notes: [
      "The ferry deck and harbour areas can be windy. A windproof jacket and comfortable walking shoes are recommended.",
    ],
    bookingCta: "Book Your Victoria 1-Day Tour",
  },
  {
    slug: "whistler-1-day",
    img: whistlerHero,
    gallery: whistlerGallery,
    title: "Whistler 1-Day Tour | Sea-to-Sky Highway & Alpine Escape",
    desc: "A Sea-to-Sky Highway alpine escape with Porteau Cove, Shannon Falls, Squamish, Brandywine Falls, and Whistler Village.",
    intro:
      "Travel along the spectacular Sea-to-Sky Highway and experience some of British Columbia's most beautiful coastal and mountain scenery. This one-day tour combines ocean viewpoints, waterfalls, forest trails, alpine landscapes, and the world-famous Whistler Village. Designed for guests who want to enjoy the mountains without the stress of driving winding roads, finding parking, or planning every stop.",
    duration: "1 day",
    language: "English / Mandarin / Korean",
    price: "From $130 USD / person",
    gratuity: "$20 USD / person",
    itinerary: [
      { stop: "Stop 1", title: "Porteau Cove", body: "A scenic stop along the Sea-to-Sky Highway with views of Howe Sound, coastal mountains, and the ocean." },
      { stop: "Stop 2", title: "Shannon Falls", body: "Visit one of British Columbia's tallest waterfalls and enjoy a short walk through the forest to the viewing area." },
      { stop: "Stop 3", title: "Squamish", body: "Pass through the outdoor recreation capital of Canada and enjoy views of the famous Stawamus Chief granite monolith." },
      { stop: "Stop 4", title: "Brandywine Falls", body: "Explore a beautiful forested viewpoint overlooking the dramatic Brandywine Falls." },
      { stop: "Stop 5", title: "Whistler Village", body: "Free time in the pedestrian-friendly alpine village — shops, cafés, restaurants, galleries, and photo opportunities around the Olympic rings." },
    ],
    included: [
      "Comfortable transportation",
      "Professional guide",
      "Parking fees for scheduled tour stops",
    ],
    notIncluded: [
      "5% tax",
      "Meals",
      "Attraction admission tickets",
      "Suggested Guide Gratuity",
    ],
    optional: ["Peak 2 Peak Gondola"],
    notes: [
      "Whistler is usually cooler than Vancouver, especially in mountain areas. A warm layer, windproof jacket, and comfortable walking shoes are recommended.",
    ],
    bookingCta: "Book Your Whistler 1-Day Tour",
  },
  {
    slug: "rockies-3-day",
    img: banff3Hero,
    gallery: banff3Gallery,
    title: "3-Day Rocky Mountains Tour | Banff, Moraine Lake & Icefields Adventure",
    desc: "A 3-day Calgary-based Rockies itinerary featuring Banff, Lake Louise, Moraine Lake, Columbia Icefield, Peyto Lake, and Emerald Lake. Hotel included.",
    intro:
      "Discover the Canadian Rockies with a comfortable 3-day guided journey from Calgary. This itinerary includes Banff, Lake Louise, Moraine Lake, Bow Lake, Peyto Lake, Emerald Lake, Columbia Icefield, and other iconic mountain viewpoints. Designed for guests who want to experience the beauty of the Rockies without the stress of long-distance mountain driving, parking, route planning, and attraction logistics.",
    duration: "3 days, 2 nights",
    language: "English / Mandarin / Korean",
    price: "From $830 USD / person",
    gratuity: "$60 USD / person for 3 days (calculated as $20 USD per day)",
    pickup: "Pickup: Calgary Airport at approximately 11:20 AM on Day 1. Drop-Off: Calgary Airport at approximately 5:00 PM on Day 3.",
    itinerary: [
      { stop: "Day 1", title: "Calgary Airport Pickup", body: "Meet your guide at Calgary Airport and begin the journey toward Banff National Park." },
      { stop: "Day 1", title: "Banff Town", body: "Time in Banff Town for lunch, shopping, and a relaxed introduction to the mountain village atmosphere." },
      { stop: "Day 1", title: "Cascade of Time Garden", body: "Visit the historic garden area near Banff Avenue, offering landscaped paths and mountain views." },
      { stop: "Day 1", title: "Banff Gondola", body: "Guests may choose to experience the Banff Gondola as an optional paid activity." },
      { stop: "Day 1", title: "Fairmont Banff Springs Hotel", body: "Stop at the iconic castle-like hotel known as one of Banff's most famous landmarks." },
      { stop: "Day 1", title: "Bow Falls", body: "A scenic waterfall viewpoint near Banff Springs Hotel." },
      { stop: "Day 1", title: "Surprise Corner", body: "Enjoy one of the classic photo viewpoints overlooking the Fairmont Banff Springs Hotel and surrounding mountain scenery." },
      { stop: "Day 2", title: "Bow Lake", body: "Visit a beautiful glacier-fed lake surrounded by mountain scenery along the Icefields Parkway." },
      { stop: "Day 2", title: "Columbia Icefield", body: "Explore one of the most impressive icefield regions in the Canadian Rockies. The Columbia Icefield Adventure is available as an optional paid experience." },
      { stop: "Day 2", title: "Peyto Lake", body: "Stop at one of the most famous turquoise lake viewpoints in the Rockies." },
      { stop: "Day 2", title: "Emerald Lake", body: "Visit Emerald Lake, known for its vivid colour, mountain backdrop, and peaceful alpine setting." },
      { stop: "Day 3", title: "Two Jack Lake", body: "Begin the day with a calm lake stop near Banff, known for mountain reflections and peaceful scenery." },
      { stop: "Day 3", title: "Moraine Lake", body: "Visit one of the most iconic lakes in Canada, known for turquoise water and the Valley of the Ten Peaks. Access is subject to seasonal operation, shuttle/pass availability, and park regulations." },
      { stop: "Day 3", title: "Lake Louise", body: "Explore the world-famous Lake Louise, known for its glacier-fed turquoise water and mountain backdrop." },
      { stop: "Day 3", title: "Calgary Airport Drop-Off", body: "Return to Calgary Airport at approximately 5:00 PM." },
    ],
    roomOptions: [
      { label: "Family / Group Quad Room", guests: "4 Guests", price: "From $830 USD / person" },
      { label: "Triple Shared Room", guests: "3 Guests", price: "From $890 USD / person" },
      { label: "Private Double Room", guests: "2 Guests", price: "From $1050 USD / person" },
    ],
    roomNote: "Room rates become more cost-efficient when shared with additional guests due to hotel room allocation.",
    included: [
      "Hotel accommodation",
      "Comfortable transportation",
      "Driver / guide",
      "National park pass",
      "Parking fees for scheduled tour stops",
    ],
    notIncluded: [
      "Flights",
      "Meals",
      "Personal expenses",
      "5% tax",
      "Optional experiences",
      "Suggested Guide Gratuity",
    ],
    optional: [
      "Banff Gondola Experience: $90 USD adult / $60 USD child age 6–15",
      "Columbia Icefield Adventure: $100 USD adult / $60 USD child age 6–15",
      "Moraine Lake Shuttle / Access Pass: $16 USD",
    ],
    notes: [
      "Mountain weather can change quickly. Guests should bring layered clothing, comfortable walking shoes, and a warm jacket.",
      "Moraine Lake access depends on seasonal road rules, shuttle access, and Parks Canada regulations.",
    ],
    bookingCta: "Book Your Rocky Mountains 3-Day Tour",
  },
  {
    slug: "kelowna-2-day",
    img: kelownaHero,
    gallery: kelownaGallery,
    title: "Kelowna 2-Day Tour | Okanagan Lake, Fruit Picking & Winery Escape",
    desc: "A relaxed Okanagan getaway featuring lake views, seasonal fruit picking, winery visits, and family-friendly attractions. Hotel included.",
    intro:
      "Experience a relaxing Okanagan getaway featuring lake views, seasonal fruit picking, winery visits, and family-friendly attractions. This short escape combines nature, local food culture, and scenic summer experiences without the stress of long-distance driving and trip planning. A comfortable, well-paced two-day journey designed for guests who want to enjoy the Okanagan at its most beautiful.",
    duration: "2 days, 1 night",
    language: "English / Mandarin / Korean",
    price: "From $999 USD / person",
    gratuity: "$40 USD / person for 2 days",
    itinerary: [
      { stop: "Day 1", title: "Bridal Falls", body: "Stop at the beautiful Bridal Falls Provincial Park and enjoy one of British Columbia's most iconic waterfalls." },
      { stop: "Day 1", title: "Merritt", body: "Relax during a scenic stop through the interior highways of British Columbia surrounded by mountain landscapes." },
      { stop: "Day 1", title: "Kelowna City Park", body: "Enjoy lakeside walking paths, beaches, and the vibrant summer atmosphere in downtown Kelowna." },
      { stop: "Day 1", title: "Okanagan Lake Swimming", body: "Spend free time relaxing or swimming at Okanagan Lake during the summer season." },
      { stop: "Day 2", title: "Fruit U-Pick Experience", body: "Seasonal fruit picking experience depending on availability: cherry season in July, peach season in August." },
      { stop: "Day 2", title: "Kangaroo Creek Farm", body: "Visit one of Kelowna's most popular family attractions and interact with kangaroos and other friendly animals." },
      { stop: "Day 2", title: "Winery Tour", body: "Experience Okanagan wine culture with scenic vineyard views and optional wine tasting experiences." },
    ],
    roomOptions: [
      { label: "Family / Group Quad Room", guests: "4 Guests", price: "From $999 USD / person" },
      { label: "Triple Shared Room", guests: "3 Guests", price: "From $999 USD / person" },
      { label: "Private Double Room", guests: "2 Guests", price: "From $999 USD / person" },
    ],
    roomNote: "Room rates become more cost-efficient when shared with additional guests due to hotel room allocation.",
    included: [
      "1-night hotel accommodation",
      "Comfortable transportation",
      "Professional guide",
      "Parking fees for scheduled stops",
    ],
    notIncluded: [
      "5% tax",
      "Meals",
      "Attraction admission tickets",
      "Suggested Guide Gratuity",
      "Wine tasting fees",
    ],
    optional: [
      "Winery wine tasting",
      "Seasonal fruit purchases",
      "Kangaroo Creek Farm admission",
    ],
    notes: [
      "Fruit picking locations may vary depending on seasonal availability.",
      "Swimming activities are weather dependent.",
    ],
    bookingCta: "Book Your Kelowna 2-Day Tour",
  },
  {
    slug: "western-usa-8-day",
    img: westernUsaHero,
    gallery: westernUsaGallery,
    title: "Western USA 8-Day Tour | San Francisco, Las Vegas, Grand Canyon & Los Angeles",
    desc: "The ultimate Western USA journey across California, Nevada, and Arizona — iconic landmarks, national parks, entertainment, and world-famous attractions.",
    intro:
      "Experience the ultimate Western USA adventure across California, Nevada, and Arizona. This multi-city journey combines iconic landmarks, desert landscapes, national parks, entertainment, shopping, and world-famous attractions. Designed for guests who want to see the very best of the American West without the stress of long-distance driving, hotel logistics, and attraction planning.",
    duration: "8 days, 7 nights",
    language: "English / Mandarin / Korean",
    price: "From $999 USD / person",
    gratuity: "$160 USD / person for 8 days",
    pickup: "Pickup: San Francisco International Airport at 10:30 AM on Day 1. Drop-Off: Los Angeles International Airport at 3:00 PM on Day 8.",
    itinerary: [
      { stop: "Day 1", title: "San Francisco Airport Pickup", body: "Pickup at San Francisco International Airport at 10:30 AM." },
      { stop: "Day 1", title: "Golden Gate Bridge", body: "Visit San Francisco's most iconic landmark and enjoy panoramic bay views." },
      { stop: "Day 1", title: "Pier 39", body: "Explore the famous waterfront destination featuring restaurants, shops, and sea lions." },
      { stop: "Day 2", title: "Las Vegas Strip", body: "Experience the world-famous Las Vegas Strip and luxury casino resorts." },
      { stop: "Day 2", title: "Fremont Street Experience", body: "Enjoy the nighttime electric light show and vibrant downtown Las Vegas atmosphere." },
      { stop: "Day 3", title: "Valley of Fire State Park", body: "Explore Nevada's dramatic red sandstone desert landscapes." },
      { stop: "Day 3", title: "Bryce Canyon National Park", body: "Visit one of America's most unique canyon formations and scenic viewpoints." },
      { stop: "Day 4", title: "Glen Canyon Dam", body: "Stop at the Glen Canyon Dam overlooking Lake Powell." },
      { stop: "Day 4", title: "Horseshoe Bend", body: "Visit the iconic Colorado River overlook." },
      { stop: "Day 4", title: "Antelope Canyon", body: "Experience the famous slot canyon with guided tour opportunities." },
      { stop: "Day 4", title: "Grand Canyon", body: "Explore one of the Seven Natural Wonders of the World." },
      { stop: "Day 5", title: "In-N-Out Burger", body: "Stop at the iconic California burger destination." },
      { stop: "Day 5", title: "Beverly Hills", body: "Visit Rodeo Drive and luxury shopping districts." },
      { stop: "Day 5", title: "Hollywood Walk of Fame", body: "Explore Hollywood Boulevard and famous entertainment landmarks." },
      { stop: "Day 5", title: "Urban Light", body: "Visit the iconic LACMA light installation." },
      { stop: "Day 6", title: "Universal Studios Hollywood", body: "Enjoy a full-day theme park and movie studio experience." },
      { stop: "Day 6", title: "Griffith Observatory", body: "View the Los Angeles skyline and Hollywood Sign." },
      { stop: "Day 7", title: "Disneyland", body: "Full-day Disneyland experience." },
      { stop: "Day 8", title: "Santa Monica Beach", body: "Relax at Los Angeles' famous beach and pier." },
      { stop: "Day 8", title: "The Getty Center", body: "Visit the renowned art museum and architecture landmark." },
      { stop: "Day 8", title: "UCLA", body: "Explore the University of California Los Angeles campus." },
      { stop: "Day 8", title: "LAX Airport Drop Off", body: "Drop off at Los Angeles International Airport at 3:00 PM." },
    ],
    roomOptions: [
      { label: "Family / Group Quad Room", guests: "4 Guests", price: "From $999 USD / person" },
      { label: "Triple Shared Room", guests: "3 Guests", price: "From $999 USD / person" },
      { label: "Private Double Room", guests: "2 Guests", price: "From $999 USD / person" },
    ],
    roomNote: "Room rates become more cost-efficient when shared with additional guests due to hotel room allocation.",
    included: [
      "7-night hotel accommodation",
      "Comfortable transportation",
      "Professional guide",
      "Parking fees",
    ],
    notIncluded: [
      "5% tax",
      "Meals",
      "Attraction admission tickets",
      "Suggested Guide Gratuity",
    ],
    optional: [
      "Antelope Canyon admission",
      "Universal Studios admission",
      "Disneyland admission",
      "Grand Canyon helicopter tour",
    ],
    notes: [
      "Guests must bring valid passports and required travel documents.",
      "Tour schedule may adjust depending on weather and traffic conditions.",
    ],
    bookingCta: "Book Your Western USA 8-Day Tour",
  },
  {
    slug: "vegas-canyon-4-day",
    img: vegasCanyonHero,
    gallery: vegasCanyonGallery,
    title: "Las Vegas & Canyon Adventure 4-Day Tour | Bryce Canyon, Antelope Canyon & Grand Canyon",
    desc: "Explore the natural wonders of the American Southwest combined with the excitement of Las Vegas — canyons, desert scenery, and unforgettable views.",
    intro:
      "Explore the natural wonders of the American Southwest combined with the excitement of Las Vegas. This adventure tour features iconic canyon landscapes, desert scenery, and unforgettable road trip experiences — designed for guests who want to see the West's most photographed landmarks in one smooth, well-paced journey.",
    duration: "4 days, 3 nights",
    language: "English / Mandarin / Korean",
    price: "From $999 USD / person",
    gratuity: "$80 USD / person for 4 days",
    pickup: "Pickup: Paris Hotel Las Vegas at 4:00 PM on Day 1. Drop-Off: Los Angeles International Airport at 3:00 PM on Day 4.",
    itinerary: [
      { stop: "Day 1", title: "Las Vegas Pickup", body: "Pickup at Paris Hotel Las Vegas at 4:00 PM." },
      { stop: "Day 1", title: "Las Vegas Strip", body: "Explore the famous Las Vegas Strip and luxury resorts." },
      { stop: "Day 1", title: "Fremont Street Experience", body: "Enjoy the nighttime Fremont Street electric show." },
      { stop: "Day 2", title: "Valley of Fire State Park", body: "Visit Nevada's famous red rock desert park." },
      { stop: "Day 2", title: "Bryce Canyon National Park", body: "Explore dramatic canyon viewpoints and landscapes." },
      { stop: "Day 3", title: "Glen Canyon Dam", body: "Stop at Glen Canyon Dam and Lake Powell." },
      { stop: "Day 3", title: "Horseshoe Bend", body: "Visit the famous Colorado River overlook." },
      { stop: "Day 3", title: "Antelope Canyon", body: "Experience one of the Southwest's most photographed natural wonders." },
      { stop: "Day 3", title: "Grand Canyon", body: "Explore the Grand Canyon scenic viewpoints." },
      { stop: "Day 4", title: "In-N-Out Burger", body: "California-style burger stop before airport drop-off." },
      { stop: "Day 4", title: "LAX Airport Drop Off", body: "Drop off at Los Angeles International Airport at 3:00 PM." },
    ],
    roomOptions: [
      { label: "Family / Group Quad Room", guests: "4 Guests", price: "From $999 USD / person" },
      { label: "Triple Shared Room", guests: "3 Guests", price: "From $999 USD / person" },
      { label: "Private Double Room", guests: "2 Guests", price: "From $999 USD / person" },
    ],
    roomNote: "Room rates become more cost-efficient when shared with additional guests due to hotel room allocation.",
    included: [
      "3-night hotel accommodation",
      "Comfortable transportation",
      "Professional guide",
      "Parking fees",
    ],
    notIncluded: [
      "5% tax",
      "Meals",
      "Attraction admission tickets",
      "Suggested Guide Gratuity",
    ],
    optional: [
      "Antelope Canyon guided tour",
      "Grand Canyon helicopter experience",
    ],
    notes: [
      "Desert temperatures may vary significantly between daytime and nighttime.",
      "Comfortable walking shoes are recommended.",
    ],
    bookingCta: "Book Your Vegas & Canyon 4-Day Tour",
  },
  {
    slug: "los-angeles-3-day",
    img: la3Hero,
    gallery: la3Gallery,
    title: "Los Angeles 3-Day Tour | Disneyland, Universal Studios & Hollywood Experience",
    desc: "Discover the best of Los Angeles — iconic attractions, Hollywood landmarks, shopping districts, and world-famous theme parks. Hotel included.",
    intro:
      "Discover the best of Los Angeles with iconic attractions, Hollywood landmarks, shopping districts, and world-famous theme parks. This tour combines entertainment, sightseeing, and California lifestyle experiences — designed for guests who want to enjoy LA without the stress of freeway driving, parking, or planning multi-park days.",
    duration: "3 days, 2 nights",
    language: "English / Mandarin / Korean",
    price: "From $999 USD / person",
    gratuity: "$60 USD / person for 3 days",
    pickup: "Pickup: Los Angeles International Airport at 11:50 AM on Day 1. Drop-Off: Los Angeles International Airport at 5:00 PM on Day 3.",
    itinerary: [
      { stop: "Day 1", title: "LAX Airport Pickup", body: "Pickup at Los Angeles International Airport at 11:50 AM." },
      { stop: "Day 1", title: "In-N-Out Burger", body: "Experience California's iconic burger destination." },
      { stop: "Day 1", title: "Farmers Market", body: "Visit the historic Original Farmers Market." },
      { stop: "Day 1", title: "Beverly Hills", body: "Explore Rodeo Drive and luxury shopping areas." },
      { stop: "Day 1", title: "Hollywood Walk of Fame", body: "Visit Hollywood Boulevard and entertainment landmarks." },
      { stop: "Day 1", title: "Griffith Observatory", body: "Enjoy panoramic city views and the Hollywood Sign." },
      { stop: "Day 2", title: "Disneyland", body: "Full-day Disneyland experience." },
      { stop: "Day 3", title: "Universal Studios Hollywood", body: "Enjoy movie-themed rides and attractions." },
      { stop: "Day 3", title: "LAX Airport Drop Off", body: "Drop off at Los Angeles International Airport at 5:00 PM." },
    ],
    roomOptions: [
      { label: "Family / Group Quad Room", guests: "4 Guests", price: "From $999 USD / person" },
      { label: "Triple Shared Room", guests: "3 Guests", price: "From $999 USD / person" },
      { label: "Private Double Room", guests: "2 Guests", price: "From $999 USD / person" },
    ],
    roomNote: "Room rates become more cost-efficient when shared with additional guests due to hotel room allocation.",
    included: [
      "2-night hotel accommodation",
      "Comfortable transportation",
      "Professional guide",
      "Parking fees",
    ],
    notIncluded: [
      "5% tax",
      "Meals",
      "Attraction admission tickets",
      "Suggested Guide Gratuity",
    ],
    optional: [
      "Disneyland admission",
      "Universal Studios admission",
    ],
    notes: [
      "Theme park schedules may vary depending on seasonal operations.",
      "Guests are encouraged to wear comfortable walking shoes.",
    ],
    bookingCta: "Book Your Los Angeles 3-Day Tour",
  },
  {
    slug: "oregon-coast-3-day",
    img: oregonHero,
    gallery: oregonGallery,
    title: "Oregon Coast 3-Day Tour | Cannon Beach, Multnomah Falls & Portland Escape",
    desc: "A relaxed road trip through Oregon's coastal beauty, scenic waterfalls, outlet shopping, and famous food culture. Hotel included.",
    intro:
      "Discover Oregon's coastal beauty, scenic waterfalls, outlet shopping, and famous food culture. This relaxed road trip combines nature, shopping, and local experiences across Washington and Oregon — designed for guests who want a soulful Pacific Northwest escape without the planning fatigue.",
    duration: "3 days, 2 nights",
    language: "English / Mandarin / Korean",
    price: "From $999 USD / person",
    gratuity: "$60 USD / person for 3 days",
    itinerary: [
      { stop: "Day 1", title: "Pike Place Market", body: "Explore Seattle's iconic public market." },
      { stop: "Day 1", title: "Washington State Capitol Building", body: "Visit Washington's government district and historic architecture." },
      { stop: "Day 1", title: "Astoria Column", body: "Enjoy panoramic coastal views from one of Oregon's famous landmarks." },
      { stop: "Day 1", title: "Seaside Beach", body: "Relax along Oregon's scenic coastline." },
      { stop: "Day 2", title: "Cannon Beach", body: "Visit the famous Haystack Rock and coastal scenery." },
      { stop: "Day 2", title: "Tillamook Creamery", body: "Experience Oregon's famous cheese and ice cream destination." },
      { stop: "Day 2", title: "Woodburn Premium Outlets", body: "Enjoy tax-free outlet shopping." },
      { stop: "Day 2", title: "Powell's City of Books", body: "Visit the world-famous independent bookstore." },
      { stop: "Day 2", title: "Portland Food Trucks", body: "Experience Portland's diverse street food culture." },
      { stop: "Day 3", title: "Vista House", body: "Visit the scenic Columbia River Gorge viewpoint." },
      { stop: "Day 3", title: "Multnomah Falls", body: "Explore Oregon's most famous waterfall." },
      { stop: "Day 3", title: "Trader Joe's", body: "Shopping stop before returning." },
    ],
    roomOptions: [
      { label: "Family / Group Quad Room", guests: "4 Guests", price: "From $999 USD / person" },
      { label: "Triple Shared Room", guests: "3 Guests", price: "From $999 USD / person" },
      { label: "Private Double Room", guests: "2 Guests", price: "From $999 USD / person" },
    ],
    roomNote: "Room rates become more cost-efficient when shared with additional guests due to hotel room allocation.",
    included: [
      "2-night hotel accommodation",
      "Comfortable transportation",
      "Professional guide",
      "Parking fees",
    ],
    notIncluded: [
      "5% tax",
      "Meals",
      "Attraction admission tickets",
      "Suggested Guide Gratuity",
    ],
    optional: [
      "Astoria Column admission",
      "Seasonal coastal activities",
    ],
    notes: [
      "Oregon weather can change quickly; layered clothing is recommended.",
      "Outlet shopping schedules may vary depending on store hours.",
    ],
    bookingCta: "Book Your Oregon Coast 3-Day Tour",
  },
];

export function getTour(slug: string) {
  return tours.find((t) => t.slug === slug);
}
