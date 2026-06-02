import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { StarMark, DottedLine } from "@/components/site/BrandMarks";
import { PlaneJourney } from "@/components/site/PlaneJourney";
import { useLocale } from "@/i18n/locale";

export type HeroSlide = {
  id: string;
  eyebrow: string;
  badge?: string;
  headingLines: string[];        // each line; last line rendered italic-accent
  body: string;
  tags?: string[];
  primary: { label: string; to: string };
  secondary?: { label: string; to: string };
  image: string;
  imageCaption: string;          // e.g. "Moraine Lake · 06:42"
  accentImage?: string;
  accentCaption?: string;
  polaroidImage?: string;        // optional single PNG to replace the polaroid composition
  backgroundImage?: string;      // optional per-slide background override
};

type Props = {
  slides: HeroSlide[];
  intervalMs?: number;
  prevLabel?: string;
  nextLabel?: string;
  backgroundImage?: string;
  slogan?: string;
};


export function HeroSlideshow({
  slides,
  intervalMs = 7500,
  prevLabel = "Previous slide",
  nextLabel = "Next slide",
  backgroundImage,
  slogan,
}: Props) {
  const [index, setIndex] = useState(0);

  const [paused, setPaused] = useState(false);
  const touchStart = useRef<number | null>(null);

  const go = useCallback((next: number) => {
    setIndex((next + slides.length) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    if (paused || slides.length <= 1) return;
    const t = window.setTimeout(() => go(index + 1), intervalMs);
    return () => window.clearTimeout(t);
  }, [index, paused, intervalMs, go, slides.length]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStart.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStart.current == null) return;
    const dx = e.changedTouches[0].clientX - touchStart.current;
    if (Math.abs(dx) > 48) go(index + (dx < 0 ? 1 : -1));
    touchStart.current = null;
  };

  return (
    <section
      className="relative bg-cream overflow-hidden"
      aria-roledescription="carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {(slides.some((s) => s.backgroundImage) || backgroundImage) && (
        <>
          {slides.map((s, i) => {
            const bg = s.backgroundImage ?? backgroundImage;
            if (!bg) return null;
            return (
              <img
                key={s.id}
                src={bg}
                alt=""
                aria-hidden
                className={
                  "absolute inset-0 w-full h-full object-cover transition-opacity duration-[1400ms] ease-out " +
                  (i === index ? "opacity-100" : "opacity-0")
                }
              />
            );
          })}
          <div
            aria-hidden
            className="absolute inset-0 bg-cream/97 md:bg-cream/95"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-r from-cream/90 via-cream/70 to-cream/40"
          />
          <div
            aria-hidden
            className="absolute inset-0 opacity-25 mix-blend-multiply pointer-events-none"
            style={{
              backgroundImage: `url("/paper-texture.webp")`,
              backgroundSize: "480px 480px",
            }}
          />
        </>
      )}

      <PlaneJourney className="absolute inset-x-0 top-[12%] w-full h-28 md:h-36 text-primary/45 pointer-events-none" />

      <div className="relative mx-auto max-w-[1280px] px-6 md:px-12 pt-6 md:pt-12 pb-12 md:pb-16">
        {slogan && (
          <div className="text-center mb-6 md:mb-10">
            <p className="font-serif text-[17px] md:text-[21px] text-ink/70 italic tracking-wide leading-relaxed">
              {slogan}
            </p>
          </div>
        )}

        <div className="relative">
          {slides.map((s, i) => (
            <Slide key={s.id} slide={s} active={i === index} hidden={i !== index} />
          ))}
        </div>

        {/* dots + arrows */}
        {slides.length > 1 && (
          <div className="relative z-30 mt-10 md:mt-14 flex items-center justify-between gap-6">
            <div className="flex items-center gap-2.5">
              {slides.map((s, i) => (
                <button
                  key={s.id}
                  aria-label={`Go to slide ${i + 1}`}
                  onClick={() => go(i)}
                  className={
                    "h-[3px] rounded-full transition-all duration-500 " +
                    (i === index
                      ? "w-10 bg-primary"
                      : "w-5 bg-primary/25 hover:bg-primary/50")
                  }
                />
              ))}
            </div>
            <div className="hidden md:flex items-center gap-2">
              <button
                aria-label={prevLabel}
                onClick={() => go(index - 1)}
                className="grid h-10 w-10 place-items-center rounded-full border border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground transition"
              >
                <span aria-hidden>←</span>
              </button>
              <button
                aria-label={nextLabel}
                onClick={() => go(index + 1)}
                className="grid h-10 w-10 place-items-center rounded-full border border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground transition"
              >
                <span aria-hidden>→</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function Slide({ slide, active, hidden }: { slide: HeroSlide; active: boolean; hidden: boolean }) {
  const s = slide;
  const locale = useLocale();
  return (
    <div
      aria-hidden={hidden}
      className={
        "transition-all ease-out " +
        (active
          ? "relative opacity-100 duration-[1400ms] translate-y-0"
          : "absolute inset-0 opacity-0 duration-[900ms] pointer-events-none translate-y-1")
      }
    >
      <div className="grid md:grid-cols-12 gap-10 md:gap-20 items-center">
        {/* LEFT — campaign copy */}
        <div className="md:col-span-6 order-1">
          <div className="flex items-center gap-3 text-primary/75">
            <StarMark size={14} className="text-primary/65" />
            <DottedLine length={28} className="text-primary/45" />
            <span className="text-[10.5px] md:text-[11px] tracking-[0.38em] uppercase font-medium">
              {s.eyebrow}
            </span>
          </div>

          <h1 className={`${locale === "ko" ? "hero-slide-heading-ko " : ""}hero-slide-heading font-serif text-[34px] sm:text-[44px] md:text-[64px] leading-[1.08] tracking-[-0.018em] text-ink mt-6 md:mt-8 font-semibold`}>
            {s.headingLines.map((ln, i) => {
              const last = i === s.headingLines.length - 1;
              return (
                <span key={i} className="block">
                  {last ? <span className="italic text-primary font-semibold [text-shadow:0_1px_0_oklch(0.99_0.01_95/0.8)]">{ln}</span> : ln}
                </span>
              );
            })}
          </h1>

          <p className="mt-7 md:mt-10 text-ink/85 leading-[1.95] text-[15px] md:text-[16.5px] max-w-md">
            {s.body}
          </p>


          {s.tags && s.tags.length > 0 && (
            <ul className="mt-5 flex flex-wrap gap-2">
              {s.tags.map((t) => (
                <li
                  key={t}
                  className="rounded-full border border-primary/25 bg-cream/70 px-3 py-1 text-[10.5px] md:text-[11px] tracking-[0.16em] uppercase text-ink/65"
                >
                  {t}
                </li>
              ))}
            </ul>
          )}

          <div className="mt-7 md:mt-10 flex flex-wrap items-center gap-4 md:gap-6">
            <Link
              to={s.primary.to as never}
              className="inline-flex items-center gap-3 rounded-full bg-primary px-7 md:px-8 py-3 md:py-3.5 text-primary-foreground font-medium text-[13px] md:text-[14px] tracking-[0.08em] uppercase shadow-[0_14px_32px_-14px_oklch(0.55_0.04_152/0.65)] hover:bg-primary/90 transition"
            >
              {s.primary.label} <span aria-hidden>→</span>
            </Link>
            {s.secondary && (
              <Link
                to={s.secondary.to as never}
                className="text-ink/65 text-[12.5px] md:text-[13.5px] tracking-[0.08em] uppercase underline decoration-primary/30 underline-offset-[6px] hover:text-primary transition"
              >
                {s.secondary.label}
              </Link>
            )}

          </div>
        </div>

        {/* RIGHT — editorial polaroid composition */}
        <div className="md:col-span-6 order-2 relative">
          <div className="relative h-[300px] md:h-[520px] mx-auto max-w-[600px] md:max-w-[820px]">
            <div
              className="absolute -top-12 -left-8 w-52 h-52 rounded-full opacity-50 blur-3xl"
              style={{ background: "var(--lavender-soft)" }}
              aria-hidden
            />
            <div
              className="absolute -bottom-14 -right-8 w-64 h-64 rounded-full opacity-55 blur-3xl"
              style={{ background: "var(--sage-soft)" }}
              aria-hidden
            />

            {s.badge && (
              <span className="absolute -top-3 md:top-2 left-1/2 -translate-x-1/2 z-30 rounded-full bg-cream/95 backdrop-blur-sm border border-primary/35 px-4 py-1.5 text-[10px] md:text-[11px] tracking-[0.32em] uppercase text-primary shadow-[0_8px_24px_-12px_oklch(0.55_0.04_152/0.55)]">
                {s.badge}
              </span>
            )}

            {s.polaroidImage ? (
              <img
                src={s.polaroidImage}
                alt={s.imageCaption}
                className="absolute inset-0 w-full h-full object-contain z-10 rotate-[-1.5deg] drop-shadow-[0_30px_50px_oklch(0_0_0/0.28)]"
              />
            ) : (

              <>
                <figure className="polaroid absolute top-2 left-2 md:left-4 w-[58%] md:w-[64%] rotate-[-4deg] z-10">
                  <img
                    src={s.image}
                    alt={s.imageCaption}
                    className="aspect-[5/4] md:aspect-[4/5] w-full object-cover"
                    width={1200}
                    height={1200}
                  />
                  <figcaption className="font-marker text-ink/70 text-[11px] md:text-[13px] mt-2 md:mt-3 text-center tracking-wide">
                    {s.imageCaption}
                  </figcaption>
                </figure>

                {s.accentImage && (
                  <figure className="polaroid absolute bottom-0 right-2 md:right-4 w-[44%] md:w-[50%] rotate-[5deg] z-20">
                    <img
                      src={s.accentImage}
                      alt={s.accentCaption ?? ""}
                      className="aspect-square w-full object-cover"
                      loading="lazy"
                    />
                    <figcaption className="font-marker text-ink/70 text-[11px] md:text-[13px] mt-2 md:mt-3 text-center tracking-wide">
                      {s.accentCaption}
                    </figcaption>
                  </figure>
                )}
              </>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
