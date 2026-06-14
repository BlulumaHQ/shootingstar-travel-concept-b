import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { useEffect, useState } from "react";
import { hreflangLinks, useLocale, type Locale } from "@/i18n/locale";
import { supabase } from "@/lib/supabase";
import brownLogo from "@/assets/shootingstar-brown-logo.png";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Shooting Star Travel" },
      { name: "description", content: "Latest travel moments, photos, and videos from Shooting Star Travel." },
      { property: "og:title", content: "Gallery — Shooting Star Travel" },
      { property: "og:description", content: "Trip albums and journey highlights from Shooting Star Travel." },
    ],
    links: hreflangLinks("/gallery", "en"),
  }),
  component: GalleryPage,
});

const T = {
  eyebrow: { en: "Trip Albums", zh: "旅程相簿", ko: "여행 앨범" },
  title: { en: "Gallery", zh: "相簿", ko: "갤러리" },
  sub: {
    en: "Recent journeys, captured with our travelers.",
    zh: "與旅客一同走過的近期旅程記錄。",
    ko: "여행자들과 함께한 최근 여정의 기록.",
  },
  empty: {
    en: "No albums yet. Check back soon!",
    zh: "目前還沒有相簿，敬請期待。",
    ko: "아직 등록된 앨범이 없습니다. 곧 업데이트됩니다.",
  },
  loading: { en: "Loading…", zh: "載入中…", ko: "불러오는 중…" },
  watchVideo: { en: "Watch the video", zh: "觀看影片", ko: "영상 보기" },
} as const;
const tt = (k: keyof typeof T, l: Locale) => T[k][l] ?? T[k].en;

type GalleryRow = {
  id: string;
  tour_label: string | null;
  trip_date: string | null;
  photos: string[] | null;
  youtube_url: string | null;
  status: string;
};

const dateLocaleMap: Record<Locale, string> = { en: "en-US", zh: "zh-Hant", ko: "ko-KR" };

function formatDate(iso: string | null, l: Locale): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return iso;
  return d.toLocaleDateString(dateLocaleMap[l], { year: "numeric", month: "long", day: "numeric" });
}

function youtubeEmbedUrl(url: string): string | null {
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtu.be")) {
      return `https://www.youtube.com/embed/${u.pathname.slice(1)}`;
    }
    if (u.hostname.includes("youtube.com")) {
      const v = u.searchParams.get("v");
      if (v) return `https://www.youtube.com/embed/${v}`;
      if (u.pathname.startsWith("/embed/")) return url;
      if (u.pathname.startsWith("/shorts/")) {
        return `https://www.youtube.com/embed/${u.pathname.split("/")[2]}`;
      }
    }
    return null;
  } catch {
    return null;
  }
}

function PhotoWithWatermark({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative overflow-hidden rounded-lg bg-muted aspect-[4/3] group">
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]"
      />
      <img
        src={brownLogo}
        alt=""
        aria-hidden
        draggable={false}
        className="pointer-events-none absolute bottom-2 right-2 select-none"
        style={{ width: 80, height: "auto", opacity: 0.7 }}
      />
    </div>
  );
}

function Album({ row, locale }: { row: GalleryRow; locale: Locale }) {
  const photos = Array.isArray(row.photos) ? row.photos.filter(Boolean) : [];
  const embed = row.youtube_url ? youtubeEmbedUrl(row.youtube_url) : null;

  return (
    <article className="bg-card rounded-2xl overflow-hidden shadow-sm border border-border/60">
      <header className="px-6 md:px-8 pt-6 md:pt-8 pb-4 flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="font-serif text-2xl md:text-3xl text-ink">{row.tour_label || "—"}</h2>
        <p className="text-sm text-ink/60">{formatDate(row.trip_date, locale)}</p>
      </header>

      {photos.length > 0 && (
        <div className="px-6 md:px-8 pb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {photos.map((p, i) => (
            <PhotoWithWatermark key={i} src={p} alt={`${row.tour_label ?? "photo"} ${i + 1}`} />
          ))}
        </div>
      )}

      {embed && (
        <div className="px-6 md:px-8 pb-8">
          <p className="text-sm font-medium text-ink/70 mb-3">{tt("watchVideo", locale)}</p>
          <div className="relative w-full overflow-hidden rounded-lg bg-black" style={{ paddingTop: "56.25%" }}>
            <iframe
              src={embed}
              title={row.tour_label || "Video"}
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 h-full w-full"
            />
          </div>
        </div>
      )}
    </article>
  );
}

export function GalleryPage() {
  const locale = useLocale();
  const [rows, setRows] = useState<GalleryRow[] | null>(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      const { data, error } = await supabase
        .from("gallery")
        .select("id, tour_label, trip_date, photos, youtube_url, status")
        .eq("status", "published")
        .order("trip_date", { ascending: false });
      if (!alive) return;
      if (error) {
        console.error("[gallery] fetch error", error);
        setRows([]);
        return;
      }
      setRows((data as GalleryRow[]) ?? []);
    })();
    return () => {
      alive = false;
    };
  }, []);

  return (
    <SiteLayout>
      <section className="mx-auto max-w-6xl px-6 md:px-10 pt-16 pb-10">
        <p className="font-hand text-clay text-2xl">— {tt("eyebrow", locale)}</p>
        <h1 className="font-serif text-5xl md:text-6xl mt-2">{tt("title", locale)}</h1>
        <p className="mt-4 text-ink/70 max-w-2xl">{tt("sub", locale)}</p>
      </section>

      <section className="mx-auto max-w-6xl px-6 md:px-10 pb-24">
        {rows === null ? (
          <p className="text-ink/60 py-12 text-center">{tt("loading", locale)}</p>
        ) : rows.length === 0 ? (
          <p className="text-ink/60 py-12 text-center">{tt("empty", locale)}</p>
        ) : (
          <div className="space-y-10">
            {rows.map((r) => (
              <Album key={r.id} row={r} locale={locale} />
            ))}
          </div>
        )}
      </section>
    </SiteLayout>
  );
}
