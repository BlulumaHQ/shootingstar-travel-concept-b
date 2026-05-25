import { useCallback, useEffect, useRef, useState } from "react";

type Props = {
  images: string[];
  title?: string;
};

export function TourGallery({ images, title }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const scrollBy = useCallback((dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const step = Math.max(280, Math.floor(el.clientWidth * 0.85));
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  }, []);

  const close = useCallback(() => setLightboxIdx(null), []);
  const next = useCallback(
    () => setLightboxIdx((i) => (i === null ? null : (i + 1) % images.length)),
    [images.length],
  );
  const prev = useCallback(
    () => setLightboxIdx((i) => (i === null ? null : (i - 1 + images.length) % images.length)),
    [images.length],
  );

  useEffect(() => {
    if (lightboxIdx === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [lightboxIdx, close, next, prev]);

  return (
    <div className="relative">
      {/* Arrows */}
      <button
        type="button"
        aria-label="Previous photos"
        onClick={() => scrollBy(-1)}
        className="hidden md:grid absolute left-2 top-1/2 -translate-y-1/2 z-10 h-11 w-11 place-items-center rounded-full bg-cream/95 border border-border shadow-md text-ink hover:bg-cream transition"
      >
        ‹
      </button>
      <button
        type="button"
        aria-label="Next photos"
        onClick={() => scrollBy(1)}
        className="hidden md:grid absolute right-2 top-1/2 -translate-y-1/2 z-10 h-11 w-11 place-items-center rounded-full bg-cream/95 border border-border shadow-md text-ink hover:bg-cream transition"
      >
        ›
      </button>

      {/* Scroll track */}
      <div
        ref={trackRef}
        className="flex gap-3 md:gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2 -mx-1 px-1"
        style={{ scrollbarWidth: "thin" }}
      >
        {images.map((src, i) => (
          <button
            type="button"
            key={i}
            onClick={() => setLightboxIdx(i)}
            className="snap-start shrink-0 overflow-hidden rounded-[6px] bg-muted relative group"
            style={{ width: "min(78vw, 420px)", aspectRatio: "4/3" }}
            aria-label={`Open photo ${i + 1}`}
          >
            <img
              src={src}
              alt={title ? `${title} — photo ${i + 1}` : `Photo ${i + 1}`}
              loading="lazy"
              className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
            />
            <span className="absolute bottom-2 right-2 rounded-full bg-ink/55 text-cream text-[11px] px-2 py-0.5 backdrop-blur-sm">
              {i + 1} / {images.length}
            </span>
          </button>
        ))}
      </div>

      {/* Mobile arrows */}
      <div className="mt-3 flex md:hidden items-center justify-end gap-2">
        <button
          type="button"
          aria-label="Previous"
          onClick={() => scrollBy(-1)}
          className="h-10 w-10 grid place-items-center rounded-full border border-border bg-cream text-ink"
        >
          ‹
        </button>
        <button
          type="button"
          aria-label="Next"
          onClick={() => scrollBy(1)}
          className="h-10 w-10 grid place-items-center rounded-full border border-border bg-cream text-ink"
        >
          ›
        </button>
      </div>

      {/* Lightbox */}
      {lightboxIdx !== null && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[100] bg-ink/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={close}
        >
          <button
            type="button"
            aria-label="Close"
            onClick={close}
            className="absolute top-4 right-4 h-10 w-10 grid place-items-center rounded-full bg-cream/15 text-cream hover:bg-cream/25 text-xl"
          >
            ×
          </button>
          <button
            type="button"
            aria-label="Previous"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 h-12 w-12 grid place-items-center rounded-full bg-cream/15 text-cream hover:bg-cream/25 text-2xl"
          >
            ‹
          </button>
          <button
            type="button"
            aria-label="Next"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 h-12 w-12 grid place-items-center rounded-full bg-cream/15 text-cream hover:bg-cream/25 text-2xl"
          >
            ›
          </button>
          <img
            src={images[lightboxIdx]}
            alt={title ? `${title} — photo ${lightboxIdx + 1}` : `Photo ${lightboxIdx + 1}`}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[88vh] max-w-[92vw] object-contain rounded-md shadow-2xl"
          />
          <span className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full bg-cream/15 text-cream text-xs px-3 py-1 backdrop-blur">
            {lightboxIdx + 1} / {images.length}
          </span>
        </div>
      )}
    </div>
  );
}
