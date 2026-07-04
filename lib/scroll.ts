/**
 * A tiny framework-agnostic scroll store.
 * Lenis writes normalized progress here every frame; the R3F scene reads it
 * inside useFrame. Keeping this outside React avoids re-rendering the tree
 * 60 times a second.
 */

type ScrollState = {
  /** 0..1 progress across the entire page */
  progress: number;
  /** raw scroll velocity (px/frame-ish), useful for subtle motion */
  velocity: number;
  /** smoothed pointer position, -1..1 on each axis */
  pointerX: number;
  pointerY: number;
};

export const scrollState: ScrollState = {
  progress: 0,
  velocity: 0,
  pointerX: 0,
  pointerY: 0,
};

/**
 * Section boundaries as fractions of total scroll (0..1).
 * The 3D ring interpolates its behavior across these stages.
 * 8 sections → we key transformations to their midpoints.
 */
export const STAGES = {
  hero: 0.0,
  mission: 0.14,
  pillars: 0.3,
  impact: 0.46,
  programs: 0.6,
  timeline: 0.74,
  testimonials: 0.87,
  cta: 1.0,
} as const;

/** Linear interpolation. */
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/** Smooth damp toward a target (frame-rate aware-ish). */
export const damp = (current: number, target: number, lambda: number, dt: number) =>
  lerp(current, target, 1 - Math.exp(-lambda * dt));

/** Clamp a value. */
export const clamp = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v));

/** Map x from [inMin,inMax] to [outMin,outMax], clamped. */
export const mapRange = (
  x: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number,
) => {
  if (inMax === inMin) return outMin;
  const t = clamp((x - inMin) / (inMax - inMin));
  return outMin + (outMax - outMin) * t;
};

/** Smoothstep easing. */
export const smoothstep = (t: number) => {
  const c = clamp(t);
  return c * c * (3 - 2 * c);
};
