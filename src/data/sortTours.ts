import type { Tour } from "./tours";

/**
 * Shared category-priority ordering for tour cards site-wide.
 *
 * Priority (lowest rank = shown first):
 *   1. Calgary Departure / Calgary pickup tours
 *   2. Canadian Rockies (multi-day rockies)
 *   3. Banff / Jasper / Moraine Lake / Lake Louise / Icefields Parkway
 *   4. British Columbia (Victoria, Whistler, Kelowna, Vancouver Island, fruit picking)
 *   5. Eastern Canada
 *   6. USA
 *   7. Anything else (fallback)
 *
 * Within a group, the caller's input order is preserved (stable sort),
 * which respects any custom `sort_order` already applied upstream.
 */

/** Top-priority featured tour(s) — always shown first across the whole site. */
export const FEATURED_TOUR_SLUG = "moraine-lake-lake-louise-half-day";
const FEATURED_SLUGS = new Set<string>([FEATURED_TOUR_SLUG]);

const CALGARY_SLUGS = new Set<string>([
  "moraine-lake-lake-louise-calgary-departure",
]);

const CANADIAN_ROCKIES_SLUGS = new Set<string>([
  "rockies-3-day",
  "rockies-signature-columbia-icefield",
]);

const BANFF_JASPER_SLUGS = new Set<string>([
  "banff-two-lake-1-day",
  "jet-johnston-emerald-takakkaw",
  "5-lakes-tour",
  "moraine-lake-lake-louise-half-day",
  "moraine-lake-sunrise-tour",
  "banff-to-jasper-sightseeing-shuttle",
  "banff-to-jasper-express-shuttle",
  "jasper-to-banff-express-shuttle",
  "icefields-parkway-southbound-sightseeing-shuttle",
  "icefields-parkway-jasper-banff-shuttle",
  "jasper-maligne-lake-spirit-island-day-tour",
  "jasper-medicine-lake-maligne-lake-half-day-tour",
]);

const BC_SLUGS = new Set<string>([
  "victoria-1-day",
  "whistler-1-day",
  "kelowna-2-day",
  "fruit-upick-crab-catching",
  "vancouver-city-tour",
  "victoria-nanaimo-2-day",
]);

const EASTERN_CANADA_SLUGS = new Set<string>([
  "eastern-canada-luxury-5-day",
  "eastern-canada-5-day",
]);

const USA_SLUGS = new Set<string>([
  "seattle-1-day",
  "seattle-2-day",
  "seattle-tech-tour",
  "western-usa-8-day",
  "vegas-canyon-4-day",
  "los-angeles-3-day",
  "los-angeles-4-day",
  "oregon-coast-3-day",
]);

export function tourCategoryRank(slug: string): number {
  if (CALGARY_SLUGS.has(slug)) return 1;
  if (CANADIAN_ROCKIES_SLUGS.has(slug)) return 2;
  if (BANFF_JASPER_SLUGS.has(slug)) return 3;
  if (BC_SLUGS.has(slug)) return 4;
  if (EASTERN_CANADA_SLUGS.has(slug)) return 5;
  if (USA_SLUGS.has(slug)) return 6;
  return 7;
}

/**
 * Stable sort tours by category rank. Preserves input order within a group,
 * so any upstream `sort_order` remains authoritative for intra-group ordering.
 */
export function sortToursByCategory<T extends Pick<Tour, "slug">>(list: T[]): T[] {
  return list
    .map((t, i) => ({ t, i }))
    .sort((a, b) => {
      const ra = tourCategoryRank(a.t.slug);
      const rb = tourCategoryRank(b.t.slug);
      if (ra !== rb) return ra - rb;
      return a.i - b.i;
    })
    .map((x) => x.t);
}
