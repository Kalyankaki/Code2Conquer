"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Kicker from "@/components/ui/Kicker";
import { Reveal } from "@/components/ui/Reveal";
import { milestones } from "@/lib/content";

export default function Timeline() {
  const section = useRef<HTMLDivElement>(null);
  const wheel = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const n = milestones.length;
  const step = 360 / n;

  useEffect(() => {
    if (!section.current || !wheel.current) return;
    gsap.registerPlugin(ScrollTrigger);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const total = (n - 1) * step; // rotate so each marker reaches the top
    const ctx = gsap.context(() => {
      const st = ScrollTrigger.create({
        trigger: section.current!,
        start: "top 70%",
        end: "bottom 70%",
        scrub: reduce ? false : 0.6,
        onUpdate: (self) => {
          const rot = -self.progress * total;
          gsap.set(wheel.current, { rotate: rot });
          setActive(Math.round(self.progress * (n - 1)));
        },
      });
      return () => st.kill();
    }, section);

    return () => ctx.revert();
  }, [n, step]);

  return (
    <section
      id="timeline"
      ref={section}
      className="section-anchor relative z-10 mx-auto max-w-6xl px-6 py-16 md:py-24"
    >
      <div className="flex flex-col items-center text-center">
        <Kicker>Roadmap</Kicker>
        <Reveal delay={0.05}>
          <h2 className="mt-8 max-w-3xl font-[family-name:var(--font-display)] text-[length:var(--text-section)] font-semibold leading-[1.08] tracking-tight">
            Where we&apos;re <span className="gold-text">headed</span>.
          </h2>
        </Reveal>
      </div>

      <div className="mt-20 grid items-center gap-12 md:grid-cols-2">
        {/* Rotating wheel of milestones */}
        <div className="relative mx-auto aspect-square w-full max-w-sm">
          <div className="absolute inset-0 rounded-full border border-[color:var(--color-border)]" />
          <div className="absolute inset-[14%] rounded-full border border-[color:var(--color-border)]/60" />
          {/* active marker indicator at top */}
          <div className="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[color:var(--color-gold)] gold-ring-glow" />

          <div ref={wheel} className="absolute inset-0 will-change-transform">
            {milestones.map((m, i) => {
              const angle = (i * step - 90) * (Math.PI / 180);
              const R = 46; // percent radius
              const x = 50 + R * Math.cos(angle);
              const y = 50 + R * Math.sin(angle);
              const isActive = i === active;
              return (
                <div
                  key={m.year}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${x}%`, top: `${y}%` }}
                >
                  <div
                    className={`grid h-14 w-14 place-items-center rounded-full border text-xs font-semibold transition-all duration-300 ${
                      isActive
                        ? "border-[color:var(--color-gold)] bg-[color:var(--color-gold)]/15 text-white scale-110"
                        : "border-[color:var(--color-border)] bg-[#0d0d0d]/60 text-[color:var(--color-faint)]"
                    }`}
                  >
                    {m.year}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Active milestone detail */}
        <div className="relative min-h-[180px]">
          {milestones.map((m, i) => (
            <div
              key={m.year}
              className={`transition-all duration-500 ${
                i === active
                  ? "opacity-100 translate-y-0"
                  : "pointer-events-none absolute inset-0 translate-y-3 opacity-0"
              }`}
            >
              <span className="gold-text font-[family-name:var(--font-display)] text-5xl font-bold">
                {m.year}
              </span>
              <h3 className="mt-4 font-[family-name:var(--font-display)] text-2xl font-semibold text-white">
                {m.title}
              </h3>
              <p className="mt-3 max-w-md leading-relaxed text-[color:var(--color-muted)]">
                {m.blurb}
              </p>
            </div>
          ))}
          <p className="mt-8 text-xs uppercase tracking-[0.2em] text-[color:var(--color-faint)]">
            Scroll to advance the timeline
          </p>
        </div>
      </div>
    </section>
  );
}
