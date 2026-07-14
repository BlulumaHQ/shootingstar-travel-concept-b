import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";

export type HeroDarkSlide = {
  id: string;
  image: string;
  eyebrow: string;
  h1Line1: string;
  h1Line2?: string;
  sub: string;
  badges?: string[];
  primary: { label: string; to: string };
  secondary?: { label: string; to: string };
  /** ms this slide is shown before advancing */
  durationMs?: number;
  /** Optional big circular promo badge (e.g. "45% OFF") shown top-left of the text column */
  promoBadge?: { percent: string; caption: string };
  /** Optional short highlight chips shown between the subtitle and CTA */
  highlights?: string[];
  /** Visual variant for the primary CTA button */
  primaryVariant?: "default" | "promo";
};

type Props = {
  slides: HeroDarkSlide[];
  defaultDurationMs?: number;
};

export function HeroDarkSlideshow({ slides, defaultDurationMs = 6000 }: Props) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStart = useRef<number | null>(null);

  useEffect(() => {
    if (paused || slides.length <= 1) return;
    const ms = slides[index]?.durationMs ?? defaultDurationMs;
    const t = window.setTimeout(
      () => setIndex((i) => (i + 1) % slides.length),
      ms,
    );
    return () => window.clearTimeout(t);
  }, [index, paused, slides, defaultDurationMs]);

  const go = (next: number) =>
    setIndex((next + slides.length) % slides.length);

  return (
    <section
      className="relative overflow-hidden bg-ink h-[560px] md:h-[680px]"
      aria-roledescription="carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={(e) => (touchStart.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchStart.current == null) return;
        const dx = e.changedTouches[0].clientX - touchStart.current;
        if (Math.abs(dx) > 48) go(index + (dx < 0 ? 1 : -1));
        touchStart.current = null;
      }}
    >
      {slides.map((s, i) => (
        <div
          key={s.id}
          aria-hidden={i !== index}
          className={
            "absolute inset-0 transition-opacity duration-[1200ms] ease-out " +
            (i === index ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none")
          }
        >
          <img
            src={s.image}
            alt={s.h1Line1}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/75 via-ink/35 to-ink/10" />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/50 via-ink/10 to-ink/60 md:from-transparent md:via-transparent md:to-ink/45" />

          <div className="relative h-full mx-auto max-w-[1240px] px-5 md:px-10 flex items-center">
            <div className="max-w-2xl text-cream [text-shadow:0_2px_22px_rgba(0,0,0,0.85),_0_1px_3px_rgba(0,0,0,0.6)]">
              {s.promoBadge && (
                <div className="mb-5 md:mb-6 flex items-center gap-4">
                  <div
                    aria-label={`${s.promoBadge.percent} ${s.promoBadge.caption}`}
                    className="relative shrink-0 flex flex-col items-center justify-center rounded-full text-cream [text-shadow:none] h-[124px] w-[124px] md:h-[168px] md:w-[168px] shadow-[0_18px_40px_-10px_rgba(0,0,0,0.55),_inset_0_0_0_3px_rgba(255,255,255,0.18)] ring-1 ring-white/20"
                    style={{ backgroundColor: "#C94C3C" }}
                  >
                    <span className="font-serif font-bold leading-none tracking-tight text-[56px] md:text-[78px]">
                      {s.promoBadge.percent}
                    </span>
                    <span className="mt-1 md:mt-1.5 text-[11px] md:text-[13px] tracking-[0.28em] uppercase font-medium">
                      {s.promoBadge.caption}
                    </span>
                  </div>
                </div>
              )}
              <p className="font-marker text-cream text-[13px] tracking-[0.3em] uppercase">
                {s.eyebrow}
              </p>
              <h1 className="mt-4 font-serif text-cream text-[30px] md:text-[52px] leading-[1.08] font-semibold">
                {s.h1Line1}
                {s.h1Line2 && (
                  <>
                    <br />
                    {s.h1Line2}
                  </>
                )}
              </h1>
              <p className="mt-5 max-w-xl text-cream/95 text-[15.5px] leading-[1.95]">
                {s.sub}
              </p>
              {s.highlights && s.highlights.length > 0 && (
                <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2">
                  {s.highlights.map((h, hi) => (
                    <span key={h} className="inline-flex items-center gap-2 text-[13px] md:text-[14px] text-cream/95">
                      {hi > 0 && <span aria-hidden className="h-1 w-1 rounded-full bg-cream/60" />}
                      <span className="font-medium tracking-wide">{h}</span>
                    </span>
                  ))}
                </div>
              )}
              <div className="mt-7 flex flex-wrap gap-3">
                {s.primaryVariant === "promo" ? (
                  <Link
                    to={s.primary.to as never}
                    className="rounded-full text-cream px-7 py-3.5 text-[14px] md:text-[15px] font-medium tracking-wide transition-transform duration-200 hover:scale-[1.04] shadow-[0_14px_36px_-10px_rgba(201,76,60,0.65)] ring-1 ring-white/15"
                    style={{ backgroundColor: "#C94C3C" }}
                  >
                    {s.primary.label} →
                  </Link>
                ) : (
                  <Link
                    to={s.primary.to as never}
                    className="rounded-full bg-cream text-ink px-7 py-3.5 text-[14px] tracking-wide hover:bg-cream/90 transition shadow-[0_10px_30px_-10px_rgba(0,0,0,0.4)]"
                  >
                    {s.primary.label} →
                  </Link>
                )}
                {s.secondary && (
                  <Link
                    to={s.secondary.to as never}
                    className="rounded-full border border-cream/70 text-cream px-7 py-3.5 text-[14px] tracking-wide hover:bg-cream/15 transition backdrop-blur-sm"
                  >
                    {s.secondary.label}
                  </Link>
                )}
              </div>
              {s.badges && s.badges.length > 0 && (
                <div className="mt-9 flex flex-wrap gap-x-5 gap-y-2 text-[12px] text-cream/90 tracking-[0.15em] uppercase">
                  {s.badges.map((b) => (
                    <span key={b} className="inline-flex items-center gap-2">
                      <span className="h-1 w-1 rounded-full bg-cream/80" /> {b}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

        </div>
      ))}

      {/* dots */}
      {slides.length > 1 && (
        <div className="absolute z-20 bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2.5">
          {slides.map((s, i) => (
            <button
              key={s.id}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => go(i)}
              className={
                "h-[3px] rounded-full transition-all duration-500 " +
                (i === index
                  ? "w-10 bg-cream"
                  : "w-5 bg-cream/40 hover:bg-cream/70")
              }
            />
          ))}
        </div>
      )}
    </section>
  );
}
