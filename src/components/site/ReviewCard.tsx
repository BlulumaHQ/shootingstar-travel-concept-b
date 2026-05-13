import { useState } from "react";
import { Star } from "lucide-react";

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
  const photos = r.photos.length ? r.photos : [r.avatar];
  const go = (n: number) => setIdx((n + photos.length) % photos.length);

  return (
    <article className="bg-card rounded-[10px] overflow-hidden shadow-[0_2px_4px_-2px_rgba(70,80,75,0.06),0_22px_44px_-26px_rgba(70,80,75,0.28)] flex flex-col h-full">
      <div className="relative aspect-[5/4] overflow-hidden bg-[var(--sand)] group">
        <img src={photos[idx]} alt="" loading="lazy" className="h-full w-full object-cover transition-opacity duration-500" />
        {photos.length > 1 && (
          <>
            <button
              type="button"
              aria-label="Previous"
              onClick={() => go(idx - 1)}
              className="absolute left-2 top-1/2 -translate-y-1/2 grid h-8 w-8 place-items-center rounded-full bg-cream/85 text-ink/70 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition"
            >‹</button>
            <button
              type="button"
              aria-label="Next"
              onClick={() => go(idx + 1)}
              className="absolute right-2 top-1/2 -translate-y-1/2 grid h-8 w-8 place-items-center rounded-full bg-cream/85 text-ink/70 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition"
            >›</button>
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
              {photos.map((_, i) => (
                <span key={i} className={`h-1.5 rounded-full transition-all ${i === idx ? "w-5 bg-cream" : "w-1.5 bg-cream/60"}`} />
              ))}
            </div>
          </>
        )}
      </div>
      {photos.length > 1 && (
        <div className="flex gap-1.5 px-3 pt-3">
          {photos.slice(0, 6).map((p, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIdx(i)}
              aria-label={`Photo ${i + 1}`}
              className={`relative aspect-square w-12 overflow-hidden rounded-[3px] border-2 transition ${i === idx ? "border-primary" : "border-transparent opacity-70 hover:opacity-100"}`}
            >
              <img src={p} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
      <div className={`p-5 ${compact ? "" : "md:p-6"} flex-1 flex flex-col`}>
        <div className="flex gap-0.5 text-[oklch(0.7_0.18_70)]">
          {Array.from({ length: r.rating }).map((_, j) => <Star key={j} size={12} fill="currentColor" stroke="none" />)}
        </div>
        <p className="mt-3 text-[13.5px] text-ink/75 leading-[1.9] flex-1">「{r.text}」</p>
        <div className="mt-5 pt-4 border-t border-border/60 flex items-center gap-3">
          <img src={r.avatar} alt={r.name} className="h-9 w-9 rounded-full object-cover" />
          <div className="leading-tight">
            <p className="text-[13px] text-ink font-medium">{r.name}</p>
            <p className="text-[11px] text-ink/55">{r.country ? `${r.country} · ` : ""}{r.tour}</p>
          </div>
        </div>
      </div>
    </article>
  );
}
