// Inline Pursuit wordmark. Replaces an external SVG that fails to render in
// Safari because the CDN response sets `Content-Disposition: attachment` and a
// strict `Content-Security-Policy` that blocks the SVG's internal <style>.
// Using currentColor lets us color it via Tailwind text-* classes.
export function PursuitLogo({ className = "" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 125 18.9"
      role="img"
      aria-label="Pursuit Collection — Official Partner"
      className={className}
      fill="currentColor"
    >
      <path d="M0,2.3h5.8c3.4,0,5.4,2,5.4,4.9v0c0,3.3-2.5,5-5.7,5H3.1v4.2H0V2.3z M5.6,9.4C7.1,9.4,8,8.5,8,7.2v0c0-1.4-1-2.1-2.5-2.1H3.1v4.3H5.6z" />
      <path d="M19.3,10.3V2.3h3.1v8c0,2.3,1.1,3.5,3,3.5c1.9,0,3-1.1,3-3.4V2.3h3.1v8c0,4.3-2.4,6.4-6.2,6.4S19.3,14.5,19.3,10.3z" />
      <path d="M40.7,2.3h6.4c1.8,0,3.2,0.5,4.1,1.4c0.8,0.8,1.2,1.9,1.2,3.2v0c0,2.3-1.2,3.7-3,4.4l3.4,5h-3.6l-3-4.5h0h-2.4v4.5h-3.1V2.3z M47,9.1c1.5,0,2.4-0.8,2.4-2v0c0-1.3-0.9-2-2.4-2h-3.1v4H47z" />
      <path d="M60.4,14.3l1.8-2.2c1.3,1,2.6,1.7,4.2,1.7c1.3,0,2-0.5,2-1.3v0c0-0.8-0.5-1.2-2.8-1.8c-2.8-0.7-4.7-1.5-4.7-4.3v0c0-2.6,2.1-4.2,4.9-4.2c2.1,0,3.8,0.6,5.2,1.8l-1.6,2.3c-1.2-0.9-2.5-1.4-3.7-1.4S64,5.4,64,6v0c0,0.9,0.6,1.2,3,1.9c2.9,0.7,4.5,1.8,4.5,4.2v0c0,2.8-2.1,4.4-5.2,4.4C64.2,16.6,62.1,15.8,60.4,14.3z" />
      <path d="M80,10.3V2.3h3.1v8c0,2.3,1.1,3.5,3,3.5c1.9,0,3-1.1,3-3.4V2.3h3.1v8c0,4.3-2.4,6.4-6.2,6.4C82.4,16.6,80,14.5,80,10.3z" />
      <path d="M117.6,5.1h-4.3V2.3H125v2.9h-4.3v11.2h-3.1V5.1z" />
      <path d="M102,11.4c-0.8-0.3-1.3-1.1-1.3-1.9l-1.2,5.1l-0.9,3.8c-0.1,0.4,0.5,0.7,0.7,0.3l2.1-3.3l2.8-4.4C103.6,11.5,102.8,11.7,102,11.4z" />
      <path d="M106.3,0.2l-2.1,3.3l-2.8,4.4c0.6-0.5,1.5-0.7,2.2-0.4c0.8,0.3,1.3,1.1,1.3,1.9l1.2-5.1l0.9-3.8C107.1,0.1,106.5-0.2,106.3,0.2z" />
    </svg>
  );
}
