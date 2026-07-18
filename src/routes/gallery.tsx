import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { useEffect, useMemo, useState } from "react";
import { Play, X } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
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
    links: hreflangLinks("/gallery", "zh"),
  }),
  component: GalleryPage,
});

const T = {
  eyebrow: { en: "Trip Moments", zh: "旅程分享", ko: "여행 순간" },
  title: { en: "Gallery", zh: "相簿", ko: "갤러리" },
  sub: {
    en: "Photos and stories from recent journeys.",
    zh: "近期旅程的照片與故事分享。",
    ko: "최근 여정의 사진과 이야기.",
  },
  empty: { en: "No posts yet. Check back soon!", zh: "目前還沒有貼文，敬請期待。", ko: "아직 게시물이 없습니다. 곧 업데이트됩니다." },
  loading: { en: "Loading…", zh: "載入中…", ko: "불러오는 중…" },
  watchVideo: { en: "Watch video", zh: "觀看影片", ko: "영상 보기" },
} as const;
const tt = (k: keyof typeof T, l: Locale) => T[k][l] ?? T[k].en;

type GalleryRow = {
  id: string;
  photos: string[] | null;
  youtube_url: string | null;
  note: string | null;
  status: string;
  created_at: string;
};

function youtubeEmbedUrl(url: string): string | null {
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtu.be")) return `https://www.youtube.com/embed/${u.pathname.slice(1)}`;
    if (u.hostname.includes("youtube.com")) {
      const v = u.searchParams.get("v");
      if (v) return `https://www.youtube.com/embed/${v}`;
      if (u.pathname.startsWith("/embed/")) return url;
      if (u.pathname.startsWith("/shorts/")) return `https://www.youtube.com/embed/${u.pathname.split("/")[2]}`;
    }
    return null;
  } catch {
    return null;
  }
}

function AlbumCard({ row, locale }: { row: GalleryRow; locale: Locale }) {
  const photos = useMemo(
    () => (Array.isArray(row.photos) ? row.photos.filter(Boolean) : []),
    [row.photos]
  );
  const [idx, setIdx] = useState(0);
  const [videoOpen, setVideoOpen] = useState(false);
  const embed = row.youtube_url ? youtubeEmbedUrl(row.youtube_url) : null;
  const featured = photos[idx] ?? photos[0];

  return (
    <article className="bg-card rounded-[10px] overflow-hidden shadow-[0_2px_6px_-2px_rgba(70,80,75,0.05),0_36px_64px_-32px_rgba(70,80,75,0.32)] flex flex-col h-full">
      {/* Feature image — identical fixed aspect ratio on every card */}
      <div className="relative aspect-[4/3] overflow-hidden bg-[var(--sand)]">
        {featured ? (
          <img
            src={featured}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover transition-opacity duration-300"
          />
        ) : (
          <div className="h-full w-full bg-muted" />
        )}
        {featured && (
          <img
            src={brownLogo}
            alt=""
            aria-hidden
            draggable={false}
            className="pointer-events-none absolute bottom-2 right-2 select-none"
            style={{ width: 54, height: "auto", opacity: 0.33 }}
          />
        )}
      </div>

      {/* Thumbnail strip — shows the other photos, click to change the feature */}
      {photos.length > 1 && (
        <div className="px-4 pt-3 flex gap-2 overflow-x-auto">
          {photos.map((p, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIdx(i)}
              aria-label={`Photo ${i + 1}`}
              className={`shrink-0 h-12 w-16 overflow-hidden rounded-md border transition ${
                i === idx ? "border-ink ring-1 ring-ink/40" : "border-border/60 opacity-80 hover:opacity-100"
              }`}
            >
              <img src={p} alt="" loading="lazy" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}

      {/* Note (handwriting) + video button */}
      <div className="p-5 md:p-6 flex-1 flex flex-col gap-3">
        {row.note && (
          <p className="font-note text-lg md:text-xl leading-relaxed text-ink/80 whitespace-pre-line">
            {row.note}
          </p>
        )}
        {embed && (
          <button
            type="button"
            onClick={() => setVideoOpen(true)}
            className="inline-flex items-center gap-2 self-start rounded-full border border-border/70 bg-cream px-3.5 py-1.5 text-[12.5px] text-ink hover:bg-[var(--sand)] transition"
          >
            <Play size={13} fill="currentColor" /> {tt("watchVideo", locale)}
          </button>
        )}
      </div>

      {embed && (
        <Dialog open={videoOpen} onOpenChange={setVideoOpen}>
          <DialogContent className="max-w-3xl p-0 overflow-hidden bg-black">
            <button
              type="button"
              onClick={() => setVideoOpen(false)}
              aria-label="Close"
              className="absolute top-2 right-2 z-10 h-9 w-9 grid place-items-center rounded-full bg-white/15 text-white hover:bg-white/25"
            >
              <X size={18} />
            </button>
            <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
              <iframe
                src={embed}
                title="Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 h-full w-full"
              />
            </div>
          </DialogContent>
        </Dialog>
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
        .select("id, photos, youtube_url, note, status, created_at")
        .eq("status", "published")
        .order("created_at", { ascending: false });
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
      <section className="mx-auto max-w-4xl px-6 md:px-10 pt-16 pb-8">
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
          <div className="grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {rows.map((r) => (
              <AlbumCard key={r.id} row={r} locale={locale} />
            ))}
          </div>
        )}
      </section>
    </SiteLayout>
  );
}
