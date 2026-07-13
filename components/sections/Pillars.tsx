"use client";

import { motion } from "framer-motion";
import Kicker from "@/components/ui/Kicker";
import { Reveal } from "@/components/ui/Reveal";
import PillarIcon from "@/components/ui/PillarIcon";
import { pillars } from "@/lib/content";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Pillars() {
  return (
    <section
      id="pillars"
      className="section-anchor relative z-10 mx-auto max-w-6xl px-6 py-16 md:py-24"
    >
      <div className="flex flex-col items-center text-center">
        <Kicker>Four Pillars</Kicker>
        <Reveal delay={0.05}>
          <h2 className="mt-8 max-w-3xl font-[family-name:var(--font-display)] text-[length:var(--text-section)] font-semibold leading-[1.08] tracking-tight">
            One mission, <span className="gold-text">four disciplines</span>.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-5 max-w-xl text-[color:var(--color-faint)]">
            Each pillar is a full program track — taught by mentors, built through
            real projects.
          </p>
        </Reveal>
      </div>

      <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {pillars.map((p, i) => (
          <motion.article
            key={p.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.8, ease: EASE, delay: i * 0.1 }}
            whileHover={{ y: -6 }}
            className="group relative overflow-hidden rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)]/50 p-6 backdrop-blur-sm transition-colors duration-500 hover:border-[color:var(--color-gold)]/60"
          >
            {/* gold glow on hover */}
            <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
              <div className="absolute -inset-px rounded-2xl bg-[radial-gradient(120%_80%_at_50%_0%,rgba(212,175,55,0.14),transparent_60%)]" />
            </div>

            <div className="flex items-center justify-between">
              <span className="grid h-12 w-12 place-items-center rounded-xl border border-[color:var(--color-gold)]/25 bg-[color:var(--color-gold)]/5 text-[color:var(--color-gold)] transition-colors duration-500 group-hover:border-[color:var(--color-gold)]/60">
                <PillarIcon id={p.id} />
              </span>
              <span className="font-[family-name:var(--font-display)] text-sm text-[color:var(--color-gold)]/60">
                {p.tag}
              </span>
            </div>
            <h3 className="mt-5 font-[family-name:var(--font-display)] text-xl font-semibold text-white">
              {p.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-[color:var(--color-faint)]">
              {p.blurb}
            </p>

            <span className="mt-6 inline-block text-sm text-[color:var(--color-muted)] opacity-0 transition-all duration-500 group-hover:opacity-100">
              Learn more →
            </span>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
