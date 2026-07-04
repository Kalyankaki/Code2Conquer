/**
 * Global page backdrop — replaces the flat matte-black fill with layered depth:
 * a warm top-down gradient, soft blurred gold ambient glows, a faint tech
 * dot-grid that fades out, and a fine film grain to kill banding.
 * Pure CSS/SVG, sits behind everything, renders on every browser.
 */
const GRAIN =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E";

export default function Backdrop() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-50 overflow-hidden"
    >
      {/* Base depth gradient: subtle warm lift at top → deep black at bottom */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(130% 80% at 50% -8%, #17140c 0%, #0d0d0d 40%, #080808 100%)",
        }}
      />

      {/* Primary gold ambient glow behind the hero */}
      <div
        className="absolute left-1/2 top-[-14%] h-[72vh] w-[86vw] max-w-[1100px] -translate-x-1/2 rounded-full blur-[130px]"
        style={{
          background:
            "radial-gradient(circle, rgba(212,175,55,0.11), rgba(212,175,55,0.04) 45%, transparent 68%)",
          animation: "c2c-glow 9s ease-in-out infinite",
        }}
      />

      {/* Secondary cooler glow lower-right for depth */}
      <div
        className="absolute right-[-12%] top-[52%] h-[52vh] w-[48vw] rounded-full blur-[140px]"
        style={{
          background:
            "radial-gradient(circle, rgba(212,175,55,0.05), transparent 66%)",
        }}
      />

      {/* Faint tech dot-grid, masked to fade out toward the middle/edges */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
          maskImage:
            "radial-gradient(120% 60% at 50% 0%, #000 0%, rgba(0,0,0,0.35) 45%, transparent 72%)",
          WebkitMaskImage:
            "radial-gradient(120% 60% at 50% 0%, #000 0%, rgba(0,0,0,0.35) 45%, transparent 72%)",
        }}
      />

      {/* Fine film grain to remove flat banding */}
      <div
        className="absolute inset-0 opacity-[0.05] mix-blend-soft-light"
        style={{
          backgroundImage: `url("${GRAIN}")`,
          backgroundSize: "180px 180px",
        }}
      />

      {/* Gentle bottom vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(100% 60% at 50% 120%, rgba(0,0,0,0.55), transparent 60%)",
        }}
      />
    </div>
  );
}
