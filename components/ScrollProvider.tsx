"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { scrollState, clamp } from "@/lib/scroll";

/**
 * Sets up Lenis smooth scrolling and wires it into GSAP's ticker so
 * ScrollTrigger stays perfectly in sync. Also feeds the global scrollState
 * that the 3D scene reads. Renders nothing.
 */
export default function ScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Respect reduced-motion: skip smooth scroll entirely.
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    gsap.registerPlugin(ScrollTrigger);

    let lenis: Lenis | null = null;

    if (!reduce) {
      lenis = new Lenis({
        duration: 1.15,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        touchMultiplier: 1.4,
        wheelMultiplier: 1,
      });

      lenis.on(
        "scroll",
        ({
          scroll,
          limit,
          velocity,
        }: {
          scroll: number;
          limit: number;
          velocity: number;
        }) => {
          scrollState.progress = limit > 0 ? clamp(scroll / limit) : 0;
          scrollState.velocity = velocity;
          ScrollTrigger.update();
        },
      );

      const raf = (time: number) => {
        lenis?.raf(time * 1000);
      };
      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(0);
    } else {
      // Reduced motion: still keep progress updated for the 3D scene.
      const onScroll = () => {
        const limit =
          document.documentElement.scrollHeight - window.innerHeight;
        scrollState.progress = limit > 0 ? clamp(window.scrollY / limit) : 0;
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
    }

    // Pointer feeds the ring's parallax tilt.
    const onPointer = (e: PointerEvent) => {
      scrollState.pointerX = (e.clientX / window.innerWidth) * 2 - 1;
      scrollState.pointerY = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onPointer, { passive: true });

    // Anchor links → smooth Lenis scroll.
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!link) return;
      const id = link.getAttribute("href");
      if (!id || id === "#") return;
      const el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      if (lenis) lenis.scrollTo(el as HTMLElement, { offset: 0, duration: 1.4 });
      else (el as HTMLElement).scrollIntoView({ behavior: "smooth" });
    };
    document.addEventListener("click", onClick);

    ScrollTrigger.refresh();

    return () => {
      window.removeEventListener("pointermove", onPointer);
      document.removeEventListener("click", onClick);
      lenis?.destroy();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return <>{children}</>;
}
