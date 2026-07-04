"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/** Sparse drifting gold specks — subtle depth, never distracting. */
export default function Particles({ count = 220 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null!);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Distribute in a wide shell around the ring, biased to the back.
      const r = 6 + Math.random() * 10;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = Math.sin(phi) * Math.cos(theta) * r;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 12;
      arr[i * 3 + 2] = -2 - Math.random() * 14 + Math.cos(phi) * r * 0.3;
    }
    return arr;
  }, [count]);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime * 0.05;
    ref.current.rotation.y = t;
    ref.current.rotation.x = Math.sin(t) * 0.05;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color={"#d4af37"}
        size={0.03}
        sizeAttenuation
        transparent
        opacity={0.55}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
