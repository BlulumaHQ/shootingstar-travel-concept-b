import type { Tour } from "./tours";
import { tours as staticToursEn } from "./tours";
import { tours as staticToursZh, getTour as getStaticTourZh } from "./tours.zh";
import { tours as staticToursKo, getTour as getStaticTourKo } from "./tours.ko";

export type Locale = "en" | "zh" | "ko";

function staticFallback(locale: Locale): Tour[] {
  if (locale === "zh") return staticToursZh;
  if (locale === "ko") return staticToursKo;
  return staticToursEn;
}

function staticFallbackBySlug(locale: Locale, slug: string): Tour | null {
  if (locale === "zh") return getStaticTourZh(slug) ?? null;
  if (locale === "ko") return getStaticTourKo(slug) ?? null;
  return staticToursEn.find((t) => t.slug === slug) ?? null;
}

export async function fetchToursByLocale(locale: Locale): Promise<Tour[]> {
  try {
    const url = `${REST}?locale=eq.${locale}&published=eq.true&order=sort_order.asc&select=${SELECT_COLS}`;
    const res = await fetch(url, { headers: HEADERS });
    if (!res.ok) throw new Error(`status ${res.status}`);
    const rows = (await res.json()) as any[];
    if (!Array.isArray(rows) || rows.length === 0) return staticFallback(locale);
    return rows.map(mapRow);
  } catch (e) {
    console.error(`fetchToursByLocale(${locale}) failed, using static fallback:`, e);
    return staticFallback(locale);
  }
}

export async function fetchTourBySlugByLocale(locale: Locale, slug: string): Promise<Tour | null> {
  try {
    const url = `${REST}?locale=eq.${locale}&slug=eq.${encodeURIComponent(slug)}&limit=1&select=${SELECT_COLS}`;
    const res = await fetch(url, { headers: HEADERS });
    if (!res.ok) throw new Error(`status ${res.status}`);
    const rows = (await res.json()) as any[];
    if (Array.isArray(rows) && rows.length) return mapRow(rows[0]);
  } catch (e) {
    console.error(`fetchTourBySlugByLocale(${locale}, ${slug}) failed, using static fallback:`, e);
  }
  return staticFallbackBySlug(locale, slug);
}

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
    rezdyBookingUrl: r.rezdy_booking_url ?? null,
    season: r.season ?? null,
    discountPercent: r.discount_percent ?? null,
    promotionBadge: r.promotion_badge ?? null,
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
