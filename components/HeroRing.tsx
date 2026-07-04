/**
 * The golden "Infinite Tech Ring" — pure CSS/SVG.
 * No WebGL, no JS init, no tab-focus dependency: it renders on every browser
 * instantly. Sits behind the hero headline and scrolls away with the hero.
 */
export default function HeroRing() {
  // Node dots evenly spaced on the outer ring.
  const nodes = Array.from({ length: 24 }, (_, i) => (i / 24) * 360);

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute left-1/2 top-[42%] z-0 -translate-x-1/2 -translate-y-1/2"
    >
      <div className="relative h-[min(88vw,620px)] w-[min(88vw,620px)]">
        {/* Soft gold glow behind the ring */}
        <div
          className="absolute inset-0 rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(212,175,55,0.28) 0%, rgba(212,175,55,0.10) 40%, transparent 68%)",
            animation: "c2c-glow 6s ease-in-out infinite",
          }}
        />

        <svg
          viewBox="0 0 400 400"
          className="absolute inset-0 h-full w-full"
          fill="none"
        >
          <defs>
            <linearGradient id="goldStroke" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#a8842a" />
              <stop offset="50%" stopColor="#e6c65a" />
              <stop offset="100%" stopColor="#d4af37" />
            </linearGradient>
            <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#f6e28a" />
              <stop offset="55%" stopColor="#d4af37" />
              <stop offset="100%" stopColor="#8a6b25" />
            </radialGradient>
            <filter id="soft" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="2.2" />
            </filter>
          </defs>

          {/* Outer structural ring with circuit dashes */}
          <g className="spin-slow">
            <circle
              cx="200"
              cy="200"
              r="188"
              stroke="#3a3a3a"
              strokeWidth="1.5"
            />
            <circle
              cx="200"
              cy="200"
              r="176"
              stroke="url(#goldStroke)"
              strokeWidth="2"
              strokeDasharray="3 10"
              opacity="0.8"
            />
            {nodes.map((deg, i) => {
              const rad = (deg * Math.PI) / 180;
              const x = 200 + Math.cos(rad) * 188;
              const y = 200 + Math.sin(rad) * 188;
              return (
                <circle
                  key={i}
                  cx={x}
                  cy={y}
                  r={i % 3 === 0 ? 2.6 : 1.6}
                  fill="#e6c65a"
                />
              );
            })}
          </g>

          {/* Middle rotating gold band */}
          <g className="spin-mid">
            <circle
              cx="200"
              cy="200"
              r="140"
              stroke="url(#goldStroke)"
              strokeWidth="6"
              opacity="0.95"
              filter="url(#soft)"
            />
            <circle
              cx="200"
              cy="200"
              r="140"
              stroke="#f0d878"
              strokeWidth="1"
              strokeDasharray="60 40"
              opacity="0.9"
            />
          </g>

          {/* Four orbiting arc segments */}
          <g className="spin-fast">
            {[0, 90, 180, 270].map((deg) => (
              <circle
                key={deg}
                cx="200"
                cy="200"
                r="112"
                stroke="url(#goldStroke)"
                strokeWidth="3"
                strokeDasharray="120 296"
                strokeDashoffset={-(deg / 360) * 704}
                strokeLinecap="round"
                opacity="0.9"
              />
            ))}
          </g>

          {/* Inner energy ring (pulses) */}
          <circle
            cx="200"
            cy="200"
            r="78"
            stroke="#f0d878"
            strokeWidth="2.5"
            style={{
              transformOrigin: "center",
              animation: "c2c-pulse 3.4s ease-in-out infinite",
              filter: "drop-shadow(0 0 6px rgba(240,216,120,0.7))",
            }}
          />

          {/* Center core */}
          <circle
            cx="200"
            cy="200"
            r="30"
            fill="url(#coreGlow)"
            style={{
              transformOrigin: "center",
              animation: "c2c-pulse 3.4s ease-in-out infinite",
              filter: "drop-shadow(0 0 14px rgba(212,175,55,0.8))",
            }}
          />
          <circle
            cx="200"
            cy="200"
            r="30"
            stroke="#f6e28a"
            strokeWidth="1"
            opacity="0.6"
          />
        </svg>
      </div>
    </div>
  );
}
