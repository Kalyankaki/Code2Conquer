/**
 * Fixed film-grain overlay for subtle texture over the dark background.
 * Sits above the page background but below content (z-0), pointer-events off.
 */
const GRAIN =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E";

export default function Grain() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 opacity-[0.055] mix-blend-soft-light"
      style={{
        backgroundImage: `url("${GRAIN}")`,
        backgroundSize: "160px 160px",
      }}
    />
  );
}
