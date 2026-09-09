/**
 * Homepage hero slides — Supabase is the source of truth.
 * Visibility and ordering are managed in Admin → Hero Slides.
 */

const SUPABASE_URL = "https://eiblzjvjscwwfnswrltn.supabase.co";
const SUPABASE_KEY = "sb_publishable_SxT7OrCqFdnHhGOgXpLxAA_fTEgHD_t";
const REST = `${SUPABASE_URL}/rest/v1/hero_slides`;
const HEADERS = { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` };

export const STAMPEDE_HERO_KEY = "stampede";
export const STAMPEDE_TOUR_SLUG = "moraine-lake-lake-louise-calgary-departure";

export type HeroSlideRow = {
  key: string;
  published: boolean;
  sort_order: number;
  image: string | null;
  link_url: string | null;
  linked_tour_slug: string | null;
  duration_ms: number | null;
  eyebrow_en: string | null;
  headline_line_1_en: string | null;
  headline_line_2_en: string | null;
  subheadline_en: string | null;
  primary_label_en: string | null;
  secondary_label_en: string | null;
  eyebrow_zh: string | null;
  headline_line_1_zh: string | null;
  headline_line_2_zh: string | null;
  subheadline_zh: string | null;
  primary_label_zh: string | null;
  secondary_label_zh: string | null;
  eyebrow_ko: string | null;
  headline_line_1_ko: string | null;
  headline_line_2_ko: string | null;
  subheadline_ko: string | null;
  primary_label_ko: string | null;
  secondary_label_ko: string | null;
};

export const HERO_SELECT_COLS =
  "key,published,sort_order,image,link_url,linked_tour_slug,duration_ms," +
  "eyebrow_en,headline_line_1_en,headline_line_2_en,subheadline_en,primary_label_en,secondary_label_en," +
  "eyebrow_zh,headline_line_1_zh,headline_line_2_zh,subheadline_zh,primary_label_zh,secondary_label_zh," +
  "eyebrow_ko,headline_line_1_ko,headline_line_2_ko,subheadline_ko,primary_label_ko,secondary_label_ko";

/**
 * Published hero slides, ordered. Returns `null` when the request itself
 * fails — callers then fall back to the bundled default slides. A successful
 * empty response is authoritative and returns `[]`.
 */
export async function fetchHeroSlides(): Promise<HeroSlideRow[] | null> {
  try {
    const res = await fetch(
      `${REST}?published=eq.true&order=sort_order.asc&select=${HERO_SELECT_COLS}`,
      { headers: HEADERS, cache: "no-store" },
    );
    if (!res.ok) throw new Error(`status ${res.status}`);
    const rows = await res.json();
    if (!Array.isArray(rows)) throw new Error("unexpected response shape");
    return rows as HeroSlideRow[];
  } catch (e) {
    console.error("fetchHeroSlides failed, using bundled default hero slides:", e);
    return null;
  }
}

/**
 * A hero slide may only render publicly when it is published AND — if it
 * links to a tour — that tour is currently published too. This prevents a
 * hero CTA from pointing at a "Tour not found" page.
 */
export function heroSlideIsAvailable(row: HeroSlideRow, publishedSlugs: Set<string>): boolean {
  if (!row.published) return false;
  if (row.linked_tour_slug) return publishedSlugs.has(row.linked_tour_slug);
  return true;
}
