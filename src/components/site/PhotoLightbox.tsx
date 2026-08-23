import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

/**
 * Full-screen photo lightbox scoped to ONE gallery (one review).
 * - swipe left/right on touch, arrows + keyboard on desktop
 * - Escape closes, background scroll locked while open
 * - pinch-to-zoom allowed (touch-action: pinch-zoom on the image)
 */
export function PhotoLightbox({
  photos,
  index,
  onIndexChange,
  onClose,
}: {
  photos: string[];
  index: number;
  onIndexChange: (i: number) => void;
  onClose: () => void;
}) {
  const [mounted, setMounted] = useState(false);
  const touch = useRef<{ x: number; y: number; locked: boolean | null } | null>(null);

  useEffect(() => setMounted(true), []);

  const go = useCallback(
    (n: number) => onIndexChange((n + photos.length) % photos.length),
    [onIndexChange, photos.length],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") go(index - 1);
      else if (e.key === "ArrowRight") go(index + 1);
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [go, index, onClose]);

  if (!mounted) return null;

  const multi = photos.length > 1;

  return createPortal(
    <div
      className="fixed inset-0 z-[100] bg-black/92 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute top-4 right-4 z-20 grid h-11 w-11 place-items-center rounded-full bg-white/12 text-white hover:bg-white/25 transition cursor-pointer"
      >
        <X size={22} />
      </button>

      <div
        className="relative w-full h-full flex items-center justify-center px-3 py-14"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={(e) => {
          const t = e.touches[0];
          touch.current = { x: t.clientX, y: t.clientY, locked: null };
        }}
        onTouchMove={(e) => {
          if (!touch.current || e.touches.length > 1) return;
          const t = e.touches[0];
          const dx = t.clientX - touch.current.x;
          const dy = t.clientY - touch.current.y;
          if (touch.current.locked === null && (Math.abs(dx) > 8 || Math.abs(dy) > 8)) {
            touch.current.locked = Math.abs(dx) > Math.abs(dy);
          }
        }}
        onTouchEnd={(e) => {
          const s = touch.current;
          touch.current = null;
          if (!s || !s.locked || !multi) return;
          const dx = e.changedTouches[0].clientX - s.x;
          if (Math.abs(dx) > 45) go(dx < 0 ? index + 1 : index - 1);
        }}
      >
        <img
          src={photos[index]}
          alt=""
          className="max-h-full max-w-full object-contain select-none"
          style={{ touchAction: "pinch-zoom" }}
        />

        {multi && (
          <>
            <button
              type="button"
              aria-label="Previous photo"
              onClick={() => go(index - 1)}
              className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-20 grid h-11 w-11 place-items-center rounded-full bg-white/12 text-white hover:bg-white/25 transition cursor-pointer"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              type="button"
              aria-label="Next photo"
              onClick={() => go(index + 1)}
              className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-20 grid h-11 w-11 place-items-center rounded-full bg-white/12 text-white hover:bg-white/25 transition cursor-pointer"
            >
              <ChevronRight size={24} />
            </button>
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full bg-black/60 text-white text-[12px] px-3 py-1 tabular-nums">
              {index + 1} / {photos.length}
            </div>
          </>
        )}
      </div>
    </div>,
    document.body,
  );
}
