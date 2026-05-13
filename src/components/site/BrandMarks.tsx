// Unified editorial micro icon family — ultra-thin sage strokes.
// All marks share stroke width, color, line caps. Use color="text-primary" to tint.

type P = { size?: number; className?: string; strokeWidth?: number };

const baseProps = (sw: number) => ({
  fill: "none" as const,
  stroke: "currentColor",
  strokeWidth: sw,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  vectorEffect: "non-scaling-stroke" as const,
});

export function StarMark({ size = 18, className = "", strokeWidth = 1 }: P) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...baseProps(strokeWidth)}>
      <path d="M12 3 L13.6 10.4 L21 12 L13.6 13.6 L12 21 L10.4 13.6 L3 12 L10.4 10.4 Z" />
    </svg>
  );
}

export function PlaneMark({ size = 22, className = "", strokeWidth = 1 }: P) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" className={className} {...baseProps(strokeWidth)}>
      <path d="M3 17 L29 5 L21 27 L17 19 Z" />
      <path d="M17 19 L29 5" />
    </svg>
  );
}

export function PinMark({ size = 18, className = "", strokeWidth = 1 }: P) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...baseProps(strokeWidth)}>
      <path d="M12 21 C12 21 5 13.5 5 9 A7 7 0 0 1 19 9 C19 13.5 12 21 12 21 Z" />
      <circle cx="12" cy="9" r="2.4" />
    </svg>
  );
}

export function CompassMark({ size = 20, className = "", strokeWidth = 1 }: P) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...baseProps(strokeWidth)}>
      <circle cx="12" cy="12" r="9" />
      <path d="M14.5 9.5 L12 14.5 L9.5 14.5 L12 9.5 Z" />
    </svg>
  );
}

export function MountainMark({ size = 22, className = "", strokeWidth = 1 }: P) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 24" className={className} {...baseProps(strokeWidth)}>
      <path d="M2 21 L11 7 L17 16 L21 11 L30 21 Z" />
    </svg>
  );
}

export function BusMark({ size = 22, className = "", strokeWidth = 1 }: P) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 24" className={className} {...baseProps(strokeWidth)}>
      <rect x="4" y="4" width="24" height="14" rx="2.5" />
      <path d="M4 12 L28 12" />
      <circle cx="10" cy="20" r="2" />
      <circle cx="22" cy="20" r="2" />
    </svg>
  );
}

export function CurveMark({ size = 36, className = "", strokeWidth = 1 }: P) {
  return (
    <svg width={size} height={size * 0.4} viewBox="0 0 80 32" className={className} {...baseProps(strokeWidth)}>
      <path d="M2 24 Q 22 4 40 18 T 78 10" strokeDasharray="1.5 4" />
      <circle cx="2" cy="24" r="1" fill="currentColor" stroke="none" />
      <circle cx="78" cy="10" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function DottedLine({ length = 80, className = "", strokeWidth = 1 }: { length?: number; className?: string; strokeWidth?: number }) {
  return (
    <svg width={length} height="2" viewBox={`0 0 ${length} 2`} className={className} {...baseProps(strokeWidth)}>
      <path d={`M0 1 L${length} 1`} strokeDasharray="1.5 4" />
    </svg>
  );
}

// Cross-section flowing path — drop into any section as decorative connector.
export function JourneyPath({
  className = "",
  strokeWidth = 1,
  variant = "wave",
}: {
  className?: string;
  strokeWidth?: number;
  variant?: "wave" | "arc" | "long";
}) {
  const d =
    variant === "arc"
      ? "M 10 100 Q 300 -20 600 80 T 1190 60"
      : variant === "long"
        ? "M -10 80 Q 200 140 420 80 T 820 80 T 1210 110"
        : "M -20 110 Q 200 30 480 90 T 900 70 T 1220 100";
  return (
    <svg
      className={className}
      viewBox="0 0 1200 200"
      preserveAspectRatio="none"
      aria-hidden
      {...baseProps(strokeWidth)}
    >
      <path d={d} strokeDasharray="2 7" />
    </svg>
  );
}
