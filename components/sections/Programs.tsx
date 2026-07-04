"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Kicker from "@/components/ui/Kicker";
import { Reveal } from "@/components/ui/Reveal";
import { programs } from "@/lib/content";

function TiltCard({
  title,
  level,
  blurb,
  index,
}: {
  title: string;
  level: string;
  blurb: string;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rx = useSpring(useTransform(py, [0, 1], [7, -7]), {
    stiffness: 150,
    damping: 18,
  });
  const ry = useSpring(useTransform(px, [0, 1], [-7, 7]), {
    stiffness: 150,
    damping: 18,
  });

  const onMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  };
  const reset = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: (index % 3) * 0.08 }}
      style={{ perspective: 900 }}
    >
      <motion.article
        ref={ref}
        onPointerMove={onMove}
        onPointerLeave={reset}
        style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
        className="group relative h-full overflow-hidden rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)]/50 p-7 backdrop-blur-sm transition-colors duration-500 hover:border-[color:var(--color-gold)]/60 hover:shadow-[0_20px_60px_-30px_rgba(212,175,55,0.5)]"
      >
        <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          <div className="absolute -inset-px rounded-2xl bg-[radial-gradient(130%_90%_at_30%_0%,rgba(212,175,55,0.16),transparent_55%)]" />
        </div>

        <div style={{ transform: "translateZ(30px)" }}>
          <span className="inline-flex rounded-full border border-[color:var(--color-border)] px-3 py-1 text-[11px] uppercase tracking-wider text-[color:var(--color-faint)]">
            {level}
          </span>
          <h3 className="mt-5 font-[family-name:var(--font-display)] text-xl font-semibold text-white">
            {title}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-[color:var(--color-faint)]">
            {blurb}
          </p>
        </div>
      </motion.article>
    </motion.div>
  );
}

export default function Programs() {
  return (
    <section
      id="programs"
      className="section-anchor relative z-10 mx-auto max-w-6xl px-6 py-32 md:py-44"
    >
      <div className="flex flex-col items-center text-center">
        <Kicker>Programs</Kicker>
        <Reveal delay={0.05}>
          <h2 className="mt-8 max-w-3xl font-[family-name:var(--font-display)] text-[length:var(--text-section)] font-semibold leading-[1.08] tracking-tight">
            Pick your <span className="gold-text">track</span>.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-5 max-w-xl text-[color:var(--color-faint)]">
            Structured programs for every level — from first line of code to
            launching your own chapter.
          </p>
        </Reveal>
      </div>

      <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {programs.map((p, i) => (
          <TiltCard key={p.title} index={i} {...p} />
        ))}
      </div>
    </section>
  );
}
