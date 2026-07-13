"use client";

import { motion } from "framer-motion";
import Kicker from "@/components/ui/Kicker";
import { Reveal } from "@/components/ui/Reveal";
import CountUp from "@/components/ui/CountUp";
import { stats } from "@/lib/content";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Impact() {
  return (
    <section
      id="why"
      className="section-anchor relative z-10 mx-auto max-w-6xl px-6 py-16 md:py-24"
    >
      <div className="flex flex-col items-center text-center">
        <Kicker>Why Now</Kicker>
        <Reveal delay={0.05}>
          <h2 className="mt-8 max-w-3xl font-[family-name:var(--font-display)] text-[length:var(--text-section)] font-semibold leading-[1.08] tracking-tight">
            We&apos;re just <span className="gold-text">getting started</span>.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-5 max-w-xl text-[color:var(--color-faint)]">
            No inflated numbers, no long history — just a fresh initiative and a
            real chance to help build it from the ground up.
          </p>
        </Reveal>
      </div>

      <div className="mt-16 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ duration: 0.8, ease: EASE, delay: i * 0.12 }}
            className="group relative overflow-hidden rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)]/40 p-8 text-center"
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(100%_60%_at_50%_120%,rgba(212,175,55,0.12),transparent)] opacity-70" />
            <div className="font-[family-name:var(--font-display)] text-4xl font-bold tracking-tight sm:text-5xl">
              <span className="gold-text">
                {s.display !== undefined ? (
                  s.display
                ) : (
                  <CountUp value={s.value ?? 0} suffix={s.suffix ?? ""} />
                )}
              </span>
            </div>
            <p className="mt-3 text-sm text-[color:var(--color-faint)]">
              {s.label}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
