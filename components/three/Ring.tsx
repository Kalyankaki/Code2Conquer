"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const GOLD = new THREE.Color("#d4af37");
const GOLD_SOFT = new THREE.Color("#f0d878");

const damp = (a: number, b: number, lambda: number, dt: number) =>
  a + (b - a) * (1 - Math.exp(-lambda * dt));

type Props = { quality: "low" | "high" };

/**
 * The "Infinite Tech Ring" — a self-contained hero centerpiece.
 * Slow continuous rotation, mouse-reactive tilt, gentle breathing, and a
 * glowing gold energy core. No scroll coupling — it just lives at the top.
 */
export default function Ring({ quality }: Props) {
  const group = useRef<THREE.Group>(null!);
  const tilt = useRef<THREE.Group>(null!);
  const segmentsRef = useRef<THREE.Group>(null!);
  const coreRef = useRef<THREE.Mesh>(null!);
  const innerRef = useRef<THREE.Mesh>(null!);
  const middleRef = useRef<THREE.Mesh>(null!);

  const detail = quality === "high";
  const seg = detail ? 128 : 72;

  const segmentAngles = useMemo(
    () => [0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2],
    [],
  );

  const nodes = useMemo(() => {
    const count = detail ? 40 : 24;
    return Array.from({ length: count }, (_, i) => {
      const a = (i / count) * Math.PI * 2;
      return { a, r: 2.36, s: 0.02 + (i % 3) * 0.012 };
    });
  }, [detail]);

  useFrame((state, dt) => {
    const t = state.clock.elapsedTime;
    const d = Math.min(dt, 0.05);

    // Slow continuous spin.
    group.current.rotation.z = t * 0.06;
    // Gentle breathing scale.
    group.current.scale.setScalar(1 + Math.sin(t * 0.6) * 0.015);

    // Mouse-reactive tilt (subtle). state.pointer is normalized -1..1.
    const px = state.pointer.x;
    const py = state.pointer.y;
    tilt.current.rotation.x = damp(tilt.current.rotation.x, -0.32 + py * 0.14, 5, d);
    tilt.current.rotation.y = damp(tilt.current.rotation.y, px * 0.2, 5, d);

    // Middle gold band counter-spins.
    if (middleRef.current) middleRef.current.rotation.z = -t * 0.12;

    // Inner energy ring pulses.
    if (innerRef.current) {
      const mat = innerRef.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 1.6 + Math.sin(t * 2.2) * 0.5;
      innerRef.current.scale.setScalar(0.98 + Math.sin(t * 1.6) * 0.02);
    }

    // Core glows softly and tumbles.
    if (coreRef.current) {
      const mat = coreRef.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 1.3 + Math.sin(t * 1.2) * 0.25;
      coreRef.current.rotation.y = t * 0.4;
      coreRef.current.rotation.x = t * 0.25;
    }

    // Decorative segment arcs orbit slowly.
    if (segmentsRef.current) {
      segmentsRef.current.rotation.z = -t * 0.1;
    }
  });

  const arc = Math.PI * 0.46;

  return (
    <group ref={group} dispose={null} position={[0, 0.9, 0]}>
      <group ref={tilt} rotation={[-0.32, 0, 0]}>
        {/* Outer titanium ring */}
        <mesh>
          <torusGeometry args={[2.35, 0.09, 24, seg]} />
          <meshStandardMaterial
            color={"#4a4a4e"}
            metalness={0.85}
            roughness={0.32}
            emissive={"#1a1206"}
            emissiveIntensity={0.6}
          />
        </mesh>
        {/* Faint gold rim */}
        <mesh>
          <torusGeometry args={[2.5, 0.012, 12, seg]} />
          <meshStandardMaterial
            color={GOLD}
            emissive={GOLD}
            emissiveIntensity={0.6}
            metalness={0.9}
            roughness={0.4}
            toneMapped={false}
          />
        </mesh>

        {/* Circuit nodes */}
        {nodes.map((n, i) => (
          <mesh key={i} position={[Math.cos(n.a) * n.r, Math.sin(n.a) * n.r, 0]}>
            <boxGeometry args={[n.s, n.s, n.s]} />
            <meshStandardMaterial
              color={GOLD_SOFT}
              emissive={GOLD}
              emissiveIntensity={1}
              metalness={0.8}
              roughness={0.3}
              toneMapped={false}
            />
          </mesh>
        ))}

        {/* Middle rotating gold band */}
        <mesh ref={middleRef}>
          <torusGeometry args={[1.78, 0.14, 24, seg]} />
          <meshStandardMaterial
            color={GOLD}
            metalness={0.9}
            roughness={0.25}
            emissive={"#6b5314"}
            emissiveIntensity={0.5}
          />
        </mesh>

        {/* Inner glowing energy ring */}
        <mesh ref={innerRef}>
          <torusGeometry args={[1.2, 0.045, 20, seg]} />
          <meshStandardMaterial
            color={GOLD_SOFT}
            emissive={GOLD_SOFT}
            emissiveIntensity={1.6}
            metalness={0.2}
            roughness={0.5}
            toneMapped={false}
          />
        </mesh>

        {/* Decorative orbiting segment arcs */}
        <group ref={segmentsRef}>
          {segmentAngles.map((a, i) => (
            <group key={i} rotation={[0, 0, a]}>
              <mesh rotation={[0, 0, -arc / 2]}>
                <torusGeometry args={[2.05, 0.05, 16, 48, arc]} />
                <meshStandardMaterial
                  color={GOLD}
                  emissive={GOLD}
                  emissiveIntensity={0.7}
                  metalness={0.7}
                  roughness={0.3}
                  toneMapped={false}
                />
              </mesh>
            </group>
          ))}
        </group>

        {/* Center core */}
        <mesh ref={coreRef}>
          <icosahedronGeometry args={[0.62, 1]} />
          <meshStandardMaterial
            color={"#2a2112"}
            emissive={GOLD}
            emissiveIntensity={1.3}
            metalness={0.6}
            roughness={0.3}
            flatShading
          />
        </mesh>
        <mesh scale={0.63}>
          <icosahedronGeometry args={[0.62, 1]} />
          <meshBasicMaterial color={GOLD_SOFT} wireframe transparent opacity={0.35} />
        </mesh>
      </group>
    </group>
  );
}
