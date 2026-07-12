"use client";

import { useEffect, useRef } from "react";

/**
 * A soft gold light that follows the cursor across the hero — adds a sense of
 * a live light source. Purely decorative; disabled for touch/reduced-motion.
 */
export default function HeroSpotlight() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const parent = el.parentElement;
    if (!parent) return;

    let raf = 0;
    const move = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const r = parent.getBoundingClientRect();
        const x = e.clientX - r.left;
        const y = e.clientY - r.top;
        el.style.background = `radial-gradient(280px circle at ${x}px ${y}px, rgba(212,175,55,0.10), transparent 70%)`;
        el.style.opacity = "1";
        raf = 0;
      });
    };
    const leave = () => {
      el.style.opacity = "0";
    };

    parent.addEventListener("pointermove", move);
    parent.addEventListener("pointerleave", leave);
    return () => {
      parent.removeEventListener("pointermove", move);
      parent.removeEventListener("pointerleave", leave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-0 z-[1] opacity-0 transition-opacity duration-500"
    />
  );
}
