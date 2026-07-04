"use client";

import dynamic from "next/dynamic";
import React, { useEffect, useRef, useState } from "react";

// Heavy three.js bundle — load only on the client, after first paint.
const Scene = dynamic(() => import("./Scene"), { ssr: false });

class SceneErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { error: Error | null }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { error: null };
  }
  static getDerivedStateFromError(error: Error) {
    return { error };
  }
  render() {
    if (this.state.error) return null;
    return this.props.children;
  }
}

/**
 * Full-viewport fixed 3D stage. Rendering into a fixed, always-sized element
 * means R3F measures a non-zero container on first paint and initializes
 * reliably. The whole stage fades out as the hero scrolls away, so the ring
 * reads as a "top of the page" centerpiece rather than a full-page backdrop.
 */
export default function CanvasStage() {
  const [ready, setReady] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);

  // Mount the heavy scene once the browser is idle (hero text paints first).
  useEffect(() => {
    const w = window as Window & {
      requestIdleCallback?: (cb: () => void) => number;
    };
    const start = () => setReady(true);
    if (w.requestIdleCallback) {
      const id = w.requestIdleCallback(start);
      return () => (window.cancelIdleCallback ?? clearTimeout)(id as number);
    }
    const t = setTimeout(start, 200);
    return () => clearTimeout(t);
  }, []);

  // Fade + settle the stage as the hero scrolls out of view.
  useEffect(() => {
    let raf = 0;
    const update = () => {
      const el = stageRef.current;
      if (el) {
        const h = window.innerHeight || 1;
        // Fully visible at top, gone by the time one viewport has scrolled.
        const p = Math.min(1, Math.max(0, window.scrollY / (h * 0.85)));
        el.style.opacity = String(1 - p);
        el.style.visibility = p >= 1 ? "hidden" : "visible";
      }
      raf = 0;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={stageRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 transition-opacity duration-200"
      style={{
        background:
          "radial-gradient(120% 90% at 50% 42%, transparent 55%, #0d0d0d 100%)",
      }}
    >
      {ready && (
        <SceneErrorBoundary>
          <Scene />
        </SceneErrorBoundary>
      )}
    </div>
  );
}
