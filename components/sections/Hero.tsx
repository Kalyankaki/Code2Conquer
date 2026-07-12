"use client";

import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import Magnetic from "@/components/ui/Magnetic";
import HeroRing from "@/components/HeroRing";
import HeroSpotlight from "@/components/HeroSpotlight";
import { site } from "@/lib/content";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Hero() {
  return (
    <section
      id="hero"
      className="section-anchor relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6 text-center"
    >
      {/* Golden ring centerpiece (CSS/SVG — renders everywhere) */}
      <HeroRing />

      {/* Cursor-following light */}
      <HeroSpotlight />

      {/* Soft scrim so the headline stays legible over the ring */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[5]"
        style={{
          background:
            "radial-gradient(46% 26% at 50% 52%, rgba(13,13,13,0.66) 0%, rgba(13,13,13,0.28) 55%, transparent 80%)",
        }}
      />

      <div className="relative z-10 flex flex-col items-center">
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
        className="mb-6 inline-flex items-center gap-2 rounded-full border border-[color:var(--color-border)] bg-[#0d0d0d]/40 px-4 py-1.5 text-xs uppercase tracking-[0.25em] text-[color:var(--color-faint)] backdrop-blur-sm"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--color-gold)]" />
        Student-led STEM initiative
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, ease: EASE, delay: 0.35 }}
        className="max-w-4xl font-[family-name:var(--font-display)] text-[length:var(--text-hero)] font-semibold leading-[1.03] tracking-tight"
      >
        Empowering the Next
        <br className="hidden sm:block" /> Generation of{" "}
        <span className="gold-text">Innovators</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: EASE, delay: 0.5 }}
        className="mt-7 max-w-xl text-balance text-base leading-relaxed text-[color:var(--color-muted)] sm:text-lg"
      >
        {site.description}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: EASE, delay: 0.65 }}
        className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
      >
        <Magnetic>
          <Button href="#cta" variant="gold">
            Join Code2Conquer
          </Button>
        </Magnetic>
        <Magnetic>
          <Button href="#pillars" variant="ghost">
            Explore Programs
          </Button>
        </Magnetic>
      </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <div className="flex h-10 w-6 items-start justify-center rounded-full border border-[color:var(--color-border)] p-1.5">
          <motion.span
            animate={{ y: [0, 10, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="h-1.5 w-1.5 rounded-full bg-[color:var(--color-gold)]"
          />
        </div>
      </motion.div>
    </section>
  );
}
