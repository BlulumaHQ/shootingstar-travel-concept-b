import type { Review } from "@/components/site/ReviewCard";


const SUPABASE_URL = "https://eiblzjvjscwwfnswrltn.supabase.co";
const SUPABASE_KEY = "sb_publishable_SxT7OrCqFdnHhGOgXpLxAA_fTEgHD_t";
const REST = `${SUPABASE_URL}/rest/v1/reviews`;
const HEADERS = { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` };

function mapRow(r: any): Review {
  return {
    avatar: r.avatar ?? "",
    name: r.name ?? "",
    country: r.country ?? undefined,
    tour: r.tour_label ?? "",
    rating: typeof r.rating === "number" ? Math.min(5, Math.max(1, Math.round(r.rating))) : 5,
    text: r.text ?? "",
    photos: Array.isArray(r.photos) ? r.photos.filter((p: unknown) => typeof p === "string") : [],
  };
}

export async function fetchReviews(): Promise<Review[]> {
  try {
    const url = `${REST}?status=eq.approved&order=created_at.desc&select=*`;
    const res = await fetch(url, { headers: HEADERS });
    if (!res.ok) throw new Error(`status ${res.status}`);
    const rows = (await res.json()) as any[];
    if (!Array.isArray(rows) || rows.length === 0) return staticReviewsEn;
    return rows.map(mapRow);
  } catch (e) {
    console.error("fetchReviews failed, using static fallback:", e);
    return staticReviewsEn;
  }
}
