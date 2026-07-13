"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Kicker from "@/components/ui/Kicker";
import { Reveal } from "@/components/ui/Reveal";
import { reasons } from "@/lib/content";

function Card({
  title,
  blurb,
  index,
  offset,
}: {
  title: string;
  blurb: string;
  index: number;
  offset: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset]);

  return (
    <motion.div
      ref={ref}
      style={{ y }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)]/50 p-8 backdrop-blur-sm"
    >
      <span className="font-[family-name:var(--font-display)] text-sm text-[color:var(--color-gold)]/70">
        0{index + 1}
      </span>
      <h3 className="mt-4 font-[family-name:var(--font-display)] text-xl font-semibold text-white">
        {title}
      </h3>
      <p className="mt-3 text-[15px] leading-relaxed text-[color:var(--color-muted)]">
        {blurb}
      </p>
    </motion.div>
  );
}

export default function Testimonials() {
  const offsets = [40, 70, 20];
  return (
    <section
      id="founding"
      className="section-anchor relative z-10 mx-auto max-w-6xl px-6 py-16 md:py-24"
    >
      <div className="flex flex-col items-center text-center">
        <Kicker>For You</Kicker>
        <Reveal delay={0.05}>
          <h2 className="mt-8 max-w-3xl font-[family-name:var(--font-display)] text-[length:var(--text-section)] font-semibold leading-[1.08] tracking-tight">
            There&apos;s room to <span className="gold-text">lead</span>.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-5 max-w-xl text-[color:var(--color-faint)]">
            Joining now means more than a seat — it means a say in what this
            becomes.
          </p>
        </Reveal>
      </div>

      <div className="mt-16 grid gap-5 md:grid-cols-3">
        {reasons.map((r, i) => (
          <Card
            key={r.title}
            index={i}
            title={r.title}
            blurb={r.blurb}
            offset={offsets[i % offsets.length]}
          />
        ))}
      </div>
    </section>
  );
}
