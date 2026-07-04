"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

/** Counts up from 0 to `value` when scrolled into view. */
export default function CountUp({
  value,
  suffix = "",
  duration = 1600,
}: {
  value: number;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    // Reduced motion: jump straight to the final value.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(value);
      return;
    }
    let raf = 0;
    let start = 0;
    const ease = (t: number) => 1 - Math.pow(1 - t, 3);
    const tick = (now: number) => {
      if (!start) start = now;
      const t = Math.min(1, (now - start) / duration);
      setDisplay(Math.round(ease(t) * value));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, duration]);

  return (
    <span ref={ref}>
      {display.toLocaleString()}
      {suffix}
    </span>
  );
}
