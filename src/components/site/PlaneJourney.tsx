/**
 * Unified paper-airplane + dashed-journey-line as ONE SVG asset.
 * The dashed line begins exactly at the airplane tail — they always stay aligned
 * because they live in the same coordinate space and scale together.
 *
 * viewBox is 1200x200 with the airplane positioned at the right end (x≈1080).
 * Use preserveAspectRatio="none" via className width/height to stretch across
 * the hero, OR keep aspect and position absolutely.
 */
export function PlaneJourney({
  className = "",
  strokeWidth = 1,
}: { className?: string; strokeWidth?: number }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 1200 200"
      preserveAspectRatio="none"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={strokeWidth}
      className={className}
    >
      {/* dashed journey path — ends at airplane tail at (1080, 70) */}
      <path
        d="M -20 160 Q 240 110 520 140 T 1080 70"
        strokeDasharray="2 7"
        opacity="0.85"
      />
      {/* paper airplane — built from the same currentColor stroke, tail at (1080,70) */}
      <g transform="translate(1080 70) rotate(-12)">
        <path d="M 0 0 L 56 -18 L 30 14 Z" />
        <path d="M 0 0 L 30 14 L 22 26" />
        <path d="M 0 0 L 30 14" opacity="0.6" />
      </g>
    </svg>
  );
}
