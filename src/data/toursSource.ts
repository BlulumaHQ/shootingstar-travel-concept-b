import type { Tour } from "./tours";
import { tours as staticToursEn } from "./tours";

const SUPABASE_URL = "https://eiblzjvjscwwfnswrltn.supabase.co";
const SUPABASE_KEY = "sb_publishable_SxT7OrCqFdnHhGOgXpLxAA_fTEgHD_t";
const REST = `${SUPABASE_URL}/rest/v1/tours`;
const HEADERS = { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` };

function mapRow(r: any): Tour {
  return {
    slug: r.slug,
    href: r.href ?? undefined,
    img: r.img,
    gallery: r.gallery ?? undefined,
    title: r.title,
    desc: r.desc,
    intro: r.intro,
    duration: r.duration,
    language: r.language ?? undefined,
    price: r.price,
    pickup: r.pickup ?? undefined,
    itinerary: r.itinerary ?? [],
    roomOptions: r.room_options ?? undefined,
    roomNote: r.room_note ?? undefined,
    gratuity: r.gratuity ?? undefined,
    included: r.included ?? [],
    notIncluded: r.not_included ?? undefined,
    optional: r.optional ?? undefined,
    notes: r.notes ?? [],
    bookingCta: r.booking_cta ?? undefined,
    rezdyProductCode: r.rezdy_product_code ?? null,
  };
}

const SELECT_COLS = "*,rezdy_product_code";

export async function fetchToursEn(): Promise<Tour[]> {
  try {
    const url = `${REST}?locale=eq.en&published=eq.true&order=sort_order.asc&select=${SELECT_COLS}`;
    const res = await fetch(url, { headers: HEADERS });
    if (!res.ok) throw new Error(`status ${res.status}`);
    const rows = (await res.json()) as any[];
    if (!Array.isArray(rows) || rows.length === 0) return staticToursEn;
    return rows.map(mapRow);
  } catch (e) {
    console.error("fetchToursEn failed, using static fallback:", e);
    return staticToursEn;
  }
}

export async function fetchTourBySlugEn(slug: string): Promise<Tour | null> {
  try {
    const url = `${REST}?locale=eq.en&slug=eq.${encodeURIComponent(slug)}&limit=1&select=${SELECT_COLS}`;
    const res = await fetch(url, { headers: HEADERS });
    if (!res.ok) throw new Error(`status ${res.status}`);
    const rows = (await res.json()) as any[];
    if (Array.isArray(rows) && rows.length) return mapRow(rows[0]);
  } catch (e) {
    console.error("fetchTourBySlugEn failed, using static fallback:", e);
  }
  return staticToursEn.find((t) => t.slug === slug) ?? null;
}
