import { MapPin, ArrowDown, ImageIcon } from "lucide-react";

/* ------------------------------------------------------------------
 * Reusable, data-driven tour route section.
 *
 * Renders, in order, on every screen size:
 *   1. Route Map Preview (image or placeholder)
 *   2. Day-by-Day Visual Timeline
 *   3. Highlight Cards
 *
 * Designed so that a future admin/CMS can drive `days`, `mapImage`,
 * and `highlights` for any tour without touching this file.
 * ------------------------------------------------------------------ */

export type RouteStop = {
  /** Optional sequence index or label (e.g. "1", "08:00"). */
  sequence?: string;
  /** Stop name (e.g. "Athabasca Falls"). */
  name: string;
  /** Short description / context for this stop. */
  description?: string;
  /** Optional time label (e.g. "09:30 – 10:10"). */
  time?: string;
  /** Optional highlight note / small image caption. */
  highlightNote?: string;
};

export type RouteDay = {
  /** Day label (e.g. "Day 1", "Mon / Fri"). */
  dayLabel: string;
  /** Section title (e.g. "Banff → Jasper Sightseeing Shuttle"). */
  title: string;
  /** Optional short description for the day. */
  description?: string;
  /** Optional accent color for the day pill. */
  accent?: "north" | "split" | "south" | "default";
  stops: RouteStop[];
};

export type RouteHighlight = {
  name: string;
  description?: string;
  /** Optional image URL; placeholder shown when omitted. */
  image?: string;
};

export type TourRouteSectionProps = {
  id?: string;
  /** Optional pre-rendered map image URL. */
  mapImage?: string;
  copy: {
    mapEyebrow: string;
    mapTitle: string;
    mapComingSoon: string;
    mapCaption?: string;
    timelineEyebrow: string;
    timelineHeading: string;
    stopLabel: string;
    highlightsEyebrow: string;
    highlightsHeading: string;
    highlightImageSoon: string;
  };
  days: RouteDay[];
  highlights?: RouteHighlight[];
};

const ACCENT: Record<NonNullable<RouteDay["accent"]>, string> = {
  north: "bg-primary/10 text-primary border-primary/30",
  split: "bg-amber-500/10 text-amber-700 border-amber-500/30",
  south: "bg-emerald-500/10 text-emerald-700 border-emerald-500/30",
  default: "bg-ink/5 text-ink border-ink/15",
};

export function TourRouteSection({
  id,
  mapImage,
  copy,
  days,
  highlights = [],
}: TourRouteSectionProps) {
  return (
    <section id={id} className="py-20 md:py-24">
      <div className="mx-auto max-w-[1100px] px-5 md:px-10">
        {/* 1. Route Map Preview */}
        <p className="font-marker text-primary/80 text-sm tracking-[0.25em] uppercase">
          {copy.mapEyebrow}
        </p>
        <h2 className="mt-3 font-serif text-3xl md:text-[40px] text-ink font-semibold">
          {copy.mapTitle}
        </h2>

        <div className="mt-8 rounded-2xl border border-border/70 bg-cream overflow-hidden">
          {mapImage ? (
            <img
              src={mapImage}
              alt={copy.mapTitle}
              className="w-full h-auto block"
              loading="lazy"
            />
          ) : (
            <div className="relative w-full aspect-[16/9] md:aspect-[21/9] grid place-items-center bg-gradient-to-br from-primary/10 via-cream to-primary/5">
              <div className="text-center px-6 max-w-md">
                <MapPin className="mx-auto h-10 w-10 text-primary/70" aria-hidden />
                <p className="mt-4 font-serif text-xl md:text-2xl text-ink font-semibold break-words">
                  {copy.mapComingSoon}
                </p>
                {copy.mapCaption && (
                  <p className="mt-2 text-sm text-ink/65 leading-relaxed break-words">
                    {copy.mapCaption}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* 2. Day-by-Day Visual Timeline */}
        <div className="mt-16">
          <p className="font-marker text-primary/80 text-sm tracking-[0.25em] uppercase">
            {copy.timelineEyebrow}
          </p>
          <h3 className="mt-3 font-serif text-2xl md:text-[32px] text-ink font-semibold">
            {copy.timelineHeading}
          </h3>

          <div className="mt-10 space-y-12">
            {days.map((day, di) => (
              <div key={di} className="min-w-0">
                <div className="flex flex-wrap items-center gap-3">
                  <span
                    className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium tracking-wide ${ACCENT[day.accent ?? "default"]}`}
                  >
                    {day.dayLabel}
                  </span>
                  <h4 className="font-serif text-lg md:text-xl text-ink font-semibold min-w-0 break-words">
                    {day.title}
                  </h4>
                </div>
                {day.description && (
                  <p className="mt-2 text-sm text-ink/70 leading-relaxed break-words">
                    {day.description}
                  </p>
                )}

                <ol className="mt-6 space-y-4">
                  {day.stops.map((stop, si) => (
                    <li key={si} className="min-w-0">
                      <article className="rounded-xl border border-border/70 bg-cream p-4 md:p-5">
                        <div className="flex items-start gap-3 md:gap-4 min-w-0">
                          <div className="flex-none">
                            <div className="grid h-9 w-9 place-items-center rounded-full bg-primary text-white text-xs font-semibold shadow-sm">
                              {stop.sequence ?? si + 1}
                            </div>
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                              <p className="text-[11px] tracking-[0.2em] uppercase text-ink/55">
                                {copy.stopLabel}
                              </p>
                              {stop.time && (
                                <p className="text-[12px] text-primary font-medium">
                                  {stop.time}
                                </p>
                              )}
                            </div>
                            <h5 className="mt-1 font-serif text-base md:text-lg text-ink font-semibold leading-snug break-words">
                              {stop.name}
                            </h5>
                            {stop.description && (
                              <p className="mt-1.5 text-[13.5px] text-ink/75 leading-[1.7] break-words">
                                {stop.description}
                              </p>
                            )}
                            {stop.highlightNote && (
                              <p className="mt-2 text-[12.5px] text-ink/60 italic break-words">
                                {stop.highlightNote}
                              </p>
                            )}
                          </div>
                        </div>
                      </article>
                      {si < day.stops.length - 1 && (
                        <div className="flex justify-center py-1.5" aria-hidden>
                          <ArrowDown className="h-4 w-4 text-primary/60" />
                        </div>
                      )}
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Highlight Cards */}
        {highlights.length > 0 && (
          <div className="mt-16">
            <p className="font-marker text-primary/80 text-sm tracking-[0.25em] uppercase">
              {copy.highlightsEyebrow}
            </p>
            <h3 className="mt-3 font-serif text-2xl md:text-[32px] text-ink font-semibold">
              {copy.highlightsHeading}
            </h3>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {highlights.map((h, i) => (
                <article
                  key={i}
                  className="rounded-2xl border border-border/70 bg-cream overflow-hidden flex flex-col min-w-0"
                >
                  {h.image ? (
                    <img
                      src={h.image}
                      alt={h.name}
                      className="w-full aspect-[4/3] object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full aspect-[4/3] grid place-items-center bg-gradient-to-br from-primary/10 via-cream to-primary/5">
                      <div className="text-center px-4">
                        <ImageIcon className="mx-auto h-7 w-7 text-primary/60" aria-hidden />
                        <p className="mt-2 text-xs text-ink/55 break-words">
                          {copy.highlightImageSoon}
                        </p>
                      </div>
                    </div>
                  )}
                  <div className="p-4 md:p-5 min-w-0">
                    <h4 className="font-serif text-base md:text-lg text-ink font-semibold break-words">
                      {h.name}
                    </h4>
                    {h.description && (
                      <p className="mt-1.5 text-[13px] text-ink/75 leading-[1.7] break-words">
                        {h.description}
                      </p>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
