/**
 * Full-width animated "signal" wave field for the hero — spans the entire
 * horizontal width, gold flowing lines over matte black. Pure CSS/SVG,
 * server-rendered. Each wave is its own SVG rendered at 200% width and
 * animated by translateX(-50%) for a seamless, reliable horizontal loop.
 */

// Periodic sine path across `width` user units (wavelength divides 1440 so a
// 50% / 1440-unit shift loops seamlessly).
function wave(
  amp: number,
  wavelength: number,
  phase: number,
  y = 200,
  width = 2880,
  step = 18,
) {
  let d = "";
  for (let x = 0; x <= width; x += step) {
    const yy = y + Math.sin((x / wavelength) * Math.PI * 2 + phase) * amp;
    d += (x === 0 ? "M" : "L") + x.toFixed(1) + "," + yy.toFixed(1) + " ";
  }
  return d.trim();
}

const WAVES = [
  { amp: 58, wl: 720, ph: 0, w: 2.2, op: 0.95, cls: "wave-flow-a", glow: true, dots: true },
  { amp: 42, wl: 480, ph: 1.1, w: 1.6, op: 0.6, cls: "wave-flow-b", glow: false, dots: false },
  { amp: 74, wl: 1440, ph: 2.3, w: 1.4, op: 0.4, cls: "wave-flow-c", glow: false, dots: false },
  { amp: 30, wl: 360, ph: 0.6, w: 1, op: 0.32, cls: "wave-flow-b", glow: false, dots: false },
];

export default function HeroWaves() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      {/* soft horizontal glow band behind the lines */}
      <div
        className="absolute inset-x-0 top-1/2 h-[48%] -translate-y-1/2"
        style={{
          background:
            "radial-gradient(58% 60% at 50% 50%, rgba(212,175,55,0.16), rgba(212,175,55,0.05) 45%, transparent 72%)",
        }}
      />

      {WAVES.map((w, i) => (
        <svg
          key={i}
          className={`absolute left-0 top-0 h-full ${w.cls}`}
          style={{ width: "200%", opacity: w.op }}
          viewBox="0 0 2880 400"
          preserveAspectRatio="none"
          fill="none"
        >
          <defs>
            <linearGradient
              id={`waveGrad-${i}`}
              x1="0"
              y1="0"
              x2="1440"
              y2="0"
              gradientUnits="userSpaceOnUse"
              spreadMethod="repeat"
            >
              <stop offset="0%" stopColor="#a8842a" stopOpacity="0" />
              <stop offset="25%" stopColor="#d4af37" stopOpacity="1" />
              <stop offset="50%" stopColor="#f0d878" stopOpacity="1" />
              <stop offset="75%" stopColor="#d4af37" stopOpacity="1" />
              <stop offset="100%" stopColor="#a8842a" stopOpacity="0" />
            </linearGradient>
            {w.glow && (
              <filter id={`waveGlow-${i}`} x="-2%" y="-40%" width="104%" height="180%">
                <feGaussianBlur stdDeviation="2.5" />
              </filter>
            )}
          </defs>
          <path
            d={wave(w.amp, w.wl, w.ph)}
            stroke={`url(#waveGrad-${i})`}
            strokeWidth={w.w}
            vectorEffect="non-scaling-stroke"
            filter={w.glow ? `url(#waveGlow-${i})` : undefined}
          />
          {w.dots &&
            Array.from({ length: 30 }, (_, k) => {
              const x = k * 100 + 40;
              const y = 200 + Math.sin((x / w.wl) * Math.PI * 2 + w.ph) * w.amp;
              return (
                <circle key={k} cx={x} cy={y} r="2.4" fill="#f6e28a" opacity="0.75" />
              );
            })}
        </svg>
      ))}

      {/* edge fades so the lines dissolve into the page at far left/right */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, #0d0d0d 0%, transparent 14%, transparent 86%, #0d0d0d 100%)",
        }}
      />
    </div>
  );
}
