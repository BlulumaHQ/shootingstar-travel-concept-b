import { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { TourCard } from "@/components/site/TourCard";
import type { Tour } from "@/data/tours";
import type { Locale } from "@/i18n/locale";

/**
 * Independent, autoplaying, loopable horizontal carousel for one tour category row.
 *
 * Behaviour (per row, all others unaffected):
 * - autoplays every 8s
 * - pauses on hover
 * - stops autoplay after user interaction (arrow / drag / swipe)
 * - moves one "page" of cards per interaction
 *   (desktop 3 cards, tablet 2 cards, mobile 1 card + peek of the next)
 * - infinite loop
 * - mouse drag on desktop, swipe on mobile
 */
export function CategoryCarousel({
  tours,
  locale,
  ariaLabel,
}: {
  tours: Tour[];
  locale: Locale;
  ariaLabel: string;
}) {
  // Autoplay is a per-instance plugin so each row is independent.
  const autoplay = useRef(
    Autoplay({
      delay: 8000,
      stopOnInteraction: true,
      stopOnMouseEnter: true,
      stopOnFocusIn: true,
    })
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      containScroll: false,
      dragFree: false,
      slidesToScroll: 1,
      breakpoints: {
        "(min-width: 640px)": { slidesToScroll: 2 },
        "(min-width: 1024px)": { slidesToScroll: 3 },
      },
    },
    [autoplay.current]
  );

  const [canScroll, setCanScroll] = useState(false);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const update = () => setCanScroll(emblaApi.scrollSnapList().length > 1);
    update();
    emblaApi.on("reInit", update);
    return () => {
      emblaApi.off("reInit", update);
    };
  }, [emblaApi]);

  if (tours.length === 0) return null;

  return (
    <div className="relative" aria-label={ariaLabel} role="region">
      <div className="overflow-hidden -mx-3" ref={emblaRef}>
        <div className="flex touch-pan-y">
          {tours.map((t) => (
            <div
              key={t.slug}
              className="min-w-0 shrink-0 grow-0 basis-[85%] sm:basis-1/2 lg:basis-1/3 px-3"
            >
              <TourCard tour={t} locale={locale} />
            </div>
          ))}
        </div>
      </div>

      {canScroll && (
        <>
          <button
            type="button"
            onClick={scrollPrev}
            aria-label="Previous"
            className="hidden md:grid absolute -left-4 lg:-left-6 top-1/2 -translate-y-1/2 z-10 h-11 w-11 place-items-center rounded-full bg-cream/95 text-primary shadow-[0_10px_30px_-12px_rgba(60,80,70,0.35)] backdrop-blur border border-border/50 transition hover:bg-cream hover:text-primary/90"
          >
            <ChevronLeft size={20} strokeWidth={1.8} />
          </button>
          <button
            type="button"
            onClick={scrollNext}
            aria-label="Next"
            className="hidden md:grid absolute -right-4 lg:-right-6 top-1/2 -translate-y-1/2 z-10 h-11 w-11 place-items-center rounded-full bg-cream/95 text-primary shadow-[0_10px_30px_-12px_rgba(60,80,70,0.35)] backdrop-blur border border-border/50 transition hover:bg-cream hover:text-primary/90"
          >
            <ChevronRight size={20} strokeWidth={1.8} />
          </button>
        </>
      )}
    </div>
  );
}
