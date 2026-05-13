// Hand-drawn doodle icons — thin organic strokes, intentionally imperfect.
// Stroke uses currentColor so parent can tint with text-primary / text-accent.

type P = { size?: number; className?: string };
const base = "inline-block";
const stroke = {
  fill: "none" as const,
  stroke: "currentColor",
  strokeWidth: 1,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  vectorEffect: "non-scaling-stroke" as const,
};

export function CameraMapIcon({ size = 44, className = "" }: P) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" className={`${base} ${className}`} {...stroke}>
      {/* camera body */}
      <path d="M10 26 q-1 -1 0 -2 l8 -1 l3 -5 q1 -2 3 -2 l14 0 q2 0 3 2 l3 5 l8 1 q1 1 0 2 l0 18 q-1 2 -3 2 l-36 0 q-2 0 -3 -2 z" />
      <circle cx="32" cy="35" r="7" />
      <circle cx="32" cy="35" r="3" />
      <path d="M48 28 l4 0" />
      {/* map pin trailing */}
      <path d="M50 50 q3 -2 5 -1 q3 1 2 4 q-1 2 -4 3" />
      <circle cx="55" cy="55" r="1.4" />
    </svg>
  );
}

export function GroupRoadIcon({ size = 44, className = "" }: P) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" className={`${base} ${className}`} {...stroke}>
      <circle cx="22" cy="22" r="4" />
      <path d="M16 38 q1 -8 6 -8 q5 0 6 8" />
      <circle cx="36" cy="20" r="3.4" />
      <path d="M31 34 q1 -7 5 -7 q4 0 5 7" />
      <circle cx="48" cy="23" r="3" />
      <path d="M44 35 q1 -6 4 -6 q3 0 4 6" />
      {/* dashed road */}
      <path d="M8 50 q14 -4 24 -2 q12 2 24 -3" strokeDasharray="3 4" />
    </svg>
  );
}

export function MountainFlagIcon({ size = 44, className = "" }: P) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" className={`${base} ${className}`} {...stroke}>
      <path d="M6 50 l14 -22 l8 12 l8 -18 l22 28 z" />
      <path d="M22 28 l3 -3 l3 3" />
      <path d="M44 14 l0 -10" />
      <path d="M44 4 q6 1 8 4 q-3 2 -8 2" />
      <circle cx="50" cy="20" r="0.8" fill="currentColor" />
    </svg>
  );
}

export function ShieldHeartIcon({ size = 44, className = "" }: P) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" className={`${base} ${className}`} {...stroke}>
      <path d="M32 8 q10 4 20 4 q1 18 -4 30 q-6 10 -16 14 q-10 -4 -16 -14 q-5 -12 -4 -30 q10 0 20 -4 z" />
      <path d="M32 40 q-7 -5 -7 -10 q0 -4 4 -4 q2 0 3 2 q1 -2 3 -2 q4 0 4 4 q0 5 -7 10 z" />
    </svg>
  );
}

export function CupSuitcaseIcon({ size = 44, className = "" }: P) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" className={`${base} ${className}`} {...stroke}>
      {/* suitcase */}
      <rect x="10" y="22" width="32" height="26" rx="3" />
      <path d="M20 22 l0 -4 q0 -2 2 -2 l8 0 q2 0 2 2 l0 4" />
      <path d="M10 32 l32 0" />
      {/* cup */}
      <path d="M44 30 q0 -2 2 -2 l10 0 q2 0 2 2 l-1 12 q-1 4 -5 4 l-2 0 q-4 0 -5 -4 z" />
      <path d="M58 32 q3 1 3 4 q0 3 -3 4" />
      <path d="M48 24 q1 -2 0 -4" />
      <path d="M52 24 q1 -2 0 -4" />
    </svg>
  );
}

export function PlaneTrailIcon({ size = 44, className = "" }: P) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" className={`${base} ${className}`} {...stroke}>
      <path d="M6 48 q14 -10 30 -18 q12 -6 22 -10 l-6 14 q-6 4 -16 8" />
      <path d="M52 34 q-6 6 -10 14" />
      <path d="M6 52 q14 -3 26 -3" strokeDasharray="2 4" />
    </svg>
  );
}

export function ButterflyIcon({ size = 36, className = "" }: P) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" className={`${base} ${className}`} {...stroke}>
      <path d="M24 14 q-6 -8 -14 -6 q-4 1 -4 6 q0 8 8 12 q4 2 10 -2" />
      <path d="M24 14 q6 -8 14 -6 q4 1 4 6 q0 8 -8 12 q-4 2 -10 -2" />
      <path d="M24 14 l0 22" />
      <path d="M22 12 q0 -3 2 -4 q2 1 2 4" />
    </svg>
  );
}
