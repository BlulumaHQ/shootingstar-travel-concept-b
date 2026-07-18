import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { useEffect, useState } from "react";
import { Play, X } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { hreflangLinks, useLocale, type Locale } from "@/i18n/locale";
import { supabase } from "@/lib/supabase";

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

function PhotoLightbox({
  photos,
  index,
  onClose,
  onPrev,
  onNext,
}: {
  photos: string[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  return (
    <Dialog open onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-5xl p-0 overflow-hidden bg-black">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-2 right-2 z-10 h-9 w-9 grid place-items-center rounded-full bg-white/15 text-white hover:bg-white/25"
        >
          <X size={18} />
        </button>
        <div className="relative w-full bg-black" style={{ aspectRatio: "3 / 2" }}>
          <img src={photos[index]} alt="" className="absolute inset-0 h-full w-full object-contain" />
          {photos.length > 1 && (
            <>
              <button
                type="button"
                onClick={onPrev}
                aria-label="Previous"
                className="absolute left-3 top-1/2 -translate-y-1/2 h-10 w-10 grid place-items-center rounded-full bg-white/15 text-white hover:bg-white/25"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={onNext}
                aria-label="Next"
                className="absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 grid place-items-center rounded-full bg-white/15 text-white hover:bg-white/25"
              >
                ›
              </button>
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-white/80 text-xs bg-black/40 rounded-full px-2 py-0.5">
                {index + 1} / {photos.length}
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

function PostCard({ row, locale }: { row: GalleryRow; locale: Locale }) {
  const photos = (row.photos ?? []).filter(Boolean);
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const [videoOpen, setVideoOpen] = useState(false);
  const embed = row.youtube_url ? youtubeEmbedUrl(row.youtube_url) : null;

  const hasMedia = photos.length > 0 || !!embed;

  return (
    <article className="bg-card rounded-[10px] overflow-hidden shadow-[0_2px_6px_-2px_rgba(70,80,75,0.05),0_36px_64px_-32px_rgba(70,80,75,0.32)]">
      {/* Uniform square media grid */}
      {hasMedia && (
        <div className="p-3 md:p-4">
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
            {photos.map((p, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setLightboxIdx(i)}
                className="relative aspect-square w-full overflow-hidden rounded-md bg-[var(--sand)] group"
                aria-label={`Open photo ${i + 1}`}
              >
                <img
                  src={p}
                  alt=""
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
              </button>
            ))}
            {embed && (
              <button
                type="button"
                onClick={() => setVideoOpen(true)}
                className="relative aspect-square w-full overflow-hidden rounded-md bg-black group"
                aria-label={tt("watchVideo", locale)}
              >
                <img
                  src={`https://img.youtube.com/vi/${embed.split("/embed/")[1]?.split("?")[0] ?? ""}/hqdefault.jpg`}
                  alt=""
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover opacity-80 transition-transform duration-500 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 grid place-items-center">
                  <div className="h-10 w-10 rounded-full bg-white/90 grid place-items-center shadow">
                    <Play size={18} fill="currentColor" className="text-ink" />
                  </div>
                </div>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Body */}
      {row.note && (
        <div className="px-5 md:px-6 pb-6 pt-1">
          <p className="font-note whitespace-pre-line text-ink/80 text-lg md:text-xl leading-relaxed">
            {row.note}
          </p>
        </div>
      )}

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

      {lightboxIdx !== null && (
        <PhotoLightbox
          photos={photos}
          index={lightboxIdx}
          onClose={() => setLightboxIdx(null)}
          onPrev={() => setLightboxIdx((i) => (i === null ? 0 : (i - 1 + photos.length) % photos.length))}
          onNext={() => setLightboxIdx((i) => (i === null ? 0 : (i + 1) % photos.length))}
        />
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

      <section className="mx-auto max-w-3xl px-6 md:px-10 pb-24">
        {rows === null ? (
          <p className="text-ink/60 py-12 text-center">{tt("loading", locale)}</p>
        ) : rows.length === 0 ? (
          <p className="text-ink/60 py-12 text-center">{tt("empty", locale)}</p>
        ) : (
          <div className="space-y-8">
            {rows.map((r) => (
              <PostCard key={r.id} row={r} locale={locale} />
            ))}
          </div>
        )}
      </section>
    </SiteLayout>
  );
}
