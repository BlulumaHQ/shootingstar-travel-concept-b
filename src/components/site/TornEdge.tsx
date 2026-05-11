type Props = {
  /** "top" places the jagged edge at the top of the next section, "bottom" at the bottom of current */
  position?: "top" | "bottom";
  /** Color of the torn paper (the side you're tearing FROM / showing) */
  color?: string;
  className?: string;
  /** Height in px */
  height?: number;
  /** Visual seed offsets edges so multiple dividers don't look identical */
  seed?: number;
};

/**
 * Hand-torn paper edge as inline SVG.
 * Place absolutely at the bottom of one section, with `color` set to the NEXT
 * section's background color, OR at the top of a section with `color` set to
 * the previous section's background. Use `position` to flip orientation.
 */
export function TornEdge({
  position = "bottom",
  color = "var(--cream)",
  className = "",
  height = 28,
  seed = 0,
}: Props) {
  // Pseudo-random but deterministic jagged points
  const rand = (i: number) => {
    const x = Math.sin((i + seed) * 12.9898) * 43758.5453;
    return x - Math.floor(x);
  };
  const W = 1440;
  const steps = 90;
  const stepW = W / steps;
  const points: string[] = [];
  for (let i = 0; i <= steps; i++) {
    const x = i * stepW;
    const y = position === "bottom"
      ? height * (0.25 + rand(i) * 0.7)
      : height - height * (0.25 + rand(i) * 0.7);
    points.push(`${x.toFixed(1)},${y.toFixed(1)}`);
  }
  const d = position === "bottom"
    ? `M0,0 L${W},0 L${W},${height} L${points.reverse().join(" L")} L0,0 Z`
    : `M0,${height} L${W},${height} L${W},0 L${points.reverse().join(" L")} L0,${height} Z`;

  return (
    <div
      className={`pointer-events-none absolute inset-x-0 ${position === "bottom" ? "bottom-[-1px]" : "top-[-1px]"} ${className}`}
      style={{ height }}
      aria-hidden
    >
      <svg viewBox={`0 0 ${W} ${height}`} preserveAspectRatio="none" className="block w-full h-full">
        {/* subtle paper shadow */}
        <path d={d} fill="rgba(0,0,0,0.08)" transform={position === "bottom" ? "translate(0,1)" : "translate(0,-1)"} />
        <path d={d} fill={color} />
      </svg>
    </div>
  );
}
