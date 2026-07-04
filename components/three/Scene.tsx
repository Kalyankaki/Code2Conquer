"use client";

import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { AdaptiveDpr } from "@react-three/drei";
import Ring from "./Ring";
import Particles from "./Particles";

/** Decide render quality from viewport + hardware hints. */
function useQuality() {
  const [quality, setQuality] = useState<"low" | "high">("high");
  useEffect(() => {
    const mobile = window.matchMedia("(max-width: 768px)").matches;
    const cores = navigator.hardwareConcurrency ?? 8;
    const lowPower = mobile || cores <= 4;
    setQuality(lowPower ? "low" : "high");
  }, []);
  return quality;
}

export default function Scene() {
  const quality = useQuality();
  const high = quality === "high";

  return (
    <Canvas
      className="!fixed inset-0"
      dpr={high ? [1, 1.8] : [1, 1.3]}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      }}
      camera={{ position: [0, 0, 7.5], fov: 42 }}
    >
      <color attach="background" args={["#0d0d0d"]} />
      <fog attach="fog" args={["#0d0d0d", 9, 22]} />

      {/* Studio-style rig: soft ambient + gold key + rim/back lights.
          (Reflections come from this rig — no environment map needed, so it
          renders reliably on every GPU including software fallbacks.) */}
      <ambientLight intensity={0.55} />
      <hemisphereLight args={["#fff2cf", "#0d0d0d", 0.6]} />
      <directionalLight position={[5, 7, 6]} intensity={2.4} color={"#f4e2a8"} />
      <directionalLight position={[-6, -1, -3]} intensity={0.9} color={"#8a6b25"} />
      <pointLight position={[0, 0, 3]} intensity={2.6} color={"#d4af37"} distance={12} />
      <spotLight
        position={[-4, 5, 3]}
        angle={0.5}
        penumbra={1}
        intensity={2}
        color={"#ffffff"}
      />

      <Suspense fallback={null}>
        <Ring quality={quality} />
        <Particles count={high ? 240 : 120} />
      </Suspense>

      <AdaptiveDpr pixelated />
    </Canvas>
  );
}
