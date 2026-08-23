import { useRef, useState } from "react";
import { Star, UserCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { PhotoLightbox } from "./PhotoLightbox";

export type Review = {
  avatar: string;
  name: string;
  country?: string;
  tour: string;
  rating: number;
  text: string;
  photos: string[];
};

export function ReviewCard({ r, compact = false }: { r: Review; compact?: boolean }) {
  const [idx, setIdx] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const photos = (r.photos?.length ? r.photos : r.avatar ? [r.avatar] : []).filter(Boolean);
  const multi = photos.length > 1;
  const go = (n: number) => setIdx((n + photos.length) % photos.length);
  const touch = useRef<{ x: number; y: number; horizontal: boolean | null } | null>(null);

  return (
    <article className="bg-card rounded-[10px] overflow-hidden shadow-[0_2px_6px_-2px_rgba(70,80,75,0.05),0_36px_64px_-32px_rgba(70,80,75,0.32)] flex flex-col h-full">
      {photos.length > 0 && (
        <div
          className="relative aspect-[5/4] overflow-hidden bg-[var(--sand)] group select-none"
          style={{ touchAction: "pan-y" }}
          onTouchStart={(e) => {
            const t = e.touches[0];
            touch.current = { x: t.clientX, y: t.clientY, horizontal: null };
          }}
          onTouchMove={(e) => {
            if (!touch.current || e.touches.length > 1) return;
            const t = e.touches[0];
            const dx = t.clientX - touch.current.x;
            const dy = t.clientY - touch.current.y;
            if (touch.current.horizontal === null && (Math.abs(dx) > 8 || Math.abs(dy) > 8)) {
              touch.current.horizontal = Math.abs(dx) > Math.abs(dy) * 1.2;
            }
          }}
          onTouchEnd={(e) => {
            const s = touch.current;
            touch.current = null;
            if (!s) return;
            const dx = e.changedTouches[0].clientX - s.x;
            if (multi && s.horizontal && Math.abs(dx) > 45) {
              go(dx < 0 ? idx + 1 : idx - 1);
            }
          }}
        >
          <img
            src={photos[idx]}
            alt=""
            loading="lazy"
            decoding="async"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            onClick={() => setLightbox(true)}
            className="h-full w-full object-cover cursor-zoom-in transition-opacity duration-300"
          />
          {multi && (
            <>
              <button
                type="button"
                aria-label="Previous photo"
                onClick={(e) => { e.stopPropagation(); go(idx - 1); }}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-20 pointer-events-auto grid h-9 w-9 place-items-center rounded-full bg-cream/90 text-ink/75 backdrop-blur-sm shadow-sm cursor-pointer opacity-100 md:opacity-0 md:group-hover:opacity-100 focus-visible:opacity-100 transition hover:bg-cream"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                type="button"
                aria-label="Next photo"
                onClick={(e) => { e.stopPropagation(); go(idx + 1); }}
                className="absolute right-2 top-1/2 -translate-y-1/2 z-20 pointer-events-auto grid h-9 w-9 place-items-center rounded-full bg-cream/90 text-ink/75 backdrop-blur-sm shadow-sm cursor-pointer opacity-100 md:opacity-0 md:group-hover:opacity-100 focus-visible:opacity-100 transition hover:bg-cream"
              >
                <ChevronRight size={18} />
              </button>
              <div className="absolute bottom-2 right-2 z-10 pointer-events-none rounded-full bg-black/55 text-white text-[11px] leading-none px-2 py-1 tabular-nums">
                {idx + 1} / {photos.length}
              </div>
            </>
          )}
        </div>
      )}
      <div className={`p-6 ${compact ? "" : "md:p-7"} flex-1 flex flex-col`}>
        <div className="flex gap-0.5 text-[oklch(0.7_0.18_70)]">
          {Array.from({ length: r.rating }).map((_, j) => <Star key={j} size={12} fill="currentColor" stroke="none" />)}
        </div>
        <p className="mt-4 text-[14px] text-ink/85 leading-[1.95] flex-1 font-serif">「{r.text}」</p>
        <div className="mt-6 pt-5 border-t border-border/60 flex items-center gap-3">
          {r.avatar ? (
            <img src={r.avatar} alt={r.name} loading="lazy" decoding="async" className="h-10 w-10 rounded-full object-cover" />
          ) : (
            <div className="h-10 w-10 rounded-full bg-border flex items-center justify-center">
              <UserCircle size={24} className="text-ink/40" />
            </div>
          )}
          <div className="leading-tight">
            <p className="text-[13.5px] text-ink font-semibold">{r.name}</p>
            <p className="text-[11.5px] text-ink/65 mt-0.5">{r.country ? `${r.country} · ` : ""}{r.tour}</p>
          </div>
        </div>
      </div>

      {lightbox && photos.length > 0 && (
        <PhotoLightbox
          photos={photos}
          index={idx}
          onIndexChange={setIdx}
          onClose={() => setLightbox(false)}
        />
      )}
    </article>
  );
}
