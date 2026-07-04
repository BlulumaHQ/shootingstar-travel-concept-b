/**
 * Frontend-only mapping of tour slug → regions it belongs to.
 * Works for both Supabase-loaded and static fallback tours.
 * Any slug not listed defaults to "canada".
 */
export type Region = "canada" | "banff" | "jasper" | "usa";

export const TOUR_REGIONS: Record<string, Region[]> = {
  // Banff
  "banff-two-lake-1-day": ["banff"],
  "jet-johnston-emerald-takakkaw": ["banff"],
  "5-lakes-tour": ["banff"],
  "moraine-lake-lake-louise-half-day": ["banff"],
  "moraine-lake-sunrise-tour": ["banff"],
  "rockies-signature-columbia-icefield": ["banff"],

  // Jasper
  "jasper-maligne-lake-spirit-island-day-tour": ["jasper"],
  "jasper-medicine-lake-maligne-lake-half-day-tour": ["jasper"],

  // Cross-region shuttles (appear under BOTH Banff and Jasper)
  "banff-to-jasper-sightseeing-shuttle": ["banff", "jasper"],
  "banff-to-jasper-express-shuttle": ["banff", "jasper"],
  "jasper-to-banff-express-shuttle": ["banff", "jasper"],
  "icefields-parkway-southbound-sightseeing-shuttle": ["banff", "jasper"],
  "icefields-parkway-jasper-banff-shuttle": ["banff", "jasper"],

  // Canada
  "victoria-1-day": ["canada"],
  "whistler-1-day": ["canada"],
  "rockies-3-day": ["canada"],
  "kelowna-2-day": ["canada"],
  "fruit-upick-crab-catching": ["canada"],
  "vancouver-city-tour": ["canada"],
  "victoria-nanaimo-2-day": ["canada"],
  "eastern-canada-luxury-5-day": ["canada"],
  "eastern-canada-5-day": ["canada"],

  // USA
  "seattle-1-day": ["usa"],
  "seattle-2-day": ["usa"],
  "seattle-tech-tour": ["usa"],
  "western-usa-8-day": ["usa"],
  "vegas-canyon-4-day": ["usa"],
  "los-angeles-3-day": ["usa"],
  "los-angeles-4-day": ["usa"],
  "oregon-coast-3-day": ["usa"],
};

export function getRegions(slug: string): Region[] {
  return TOUR_REGIONS[slug] ?? ["canada"];
}

export function tourInRegion(slug: string, region: Region): boolean {
  return getRegions(slug).includes(region);
}
