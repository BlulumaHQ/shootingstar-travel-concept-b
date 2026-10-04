const SUPABASE_URL = "https://eiblzjvjscwwfnswrltn.supabase.co";
const SUPABASE_KEY = "sb_publishable_SxT7OrCqFdnHhGOgXpLxAA_fTEgHD_t";

export type FooterTourRow = {
  id: string;
  sort_order: number;
  published: boolean;
  url: string;
  linked_tour_slug: string | null;
  label_en: string;
  label_zh: string | null;
  label_ko: string | null;
};

/**
 * Footer "Popular Tours" links managed in Admin → Footer Tours.
 * Returns `null` only when the request fails (footer then uses its built-in
 * fallback list). A successful empty array means "show nothing".
 */
export async function fetchFooterTours(): Promise<FooterTourRow[] | null> {
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/footer_popular_tours?published=eq.true&order=sort_order.asc&select=*`,
      { headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` }, cache: "no-store" },
    );
    if (!res.ok) throw new Error(`status ${res.status}`);
    const rows = await res.json();
    if (!Array.isArray(rows)) throw new Error("unexpected response shape");
    return rows as FooterTourRow[];
  } catch (e) {
    console.error("fetchFooterTours failed, using fallback:", e);
    return null;
  }
}
