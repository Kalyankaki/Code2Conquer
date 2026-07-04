# Code2Conquer

A premium, cinematic single-page website for **Code2Conquer** — a student-led STEM
nonprofit teaching coding, AI, robotics, web development, and technical leadership.

The site is a scroll-driven experience anchored by a **3D "Infinite Tech Ring"** that
transforms as you move through the story: splitting into four pillars, reassembling
over the impact stats, receding behind the programs grid, becoming a timeline wheel,
fading to a soft glow, and finally collapsing into a glowing logo core.

## Tech stack

- **Next.js (App Router)** + **TypeScript**
- **Tailwind CSS v4** — matte-black / charcoal UI with metallic-gold accents
- **React Three Fiber** + **drei** + **postprocessing** (the 3D ring, bloom, procedural env)
- **GSAP + ScrollTrigger** — scroll-scrubbed timeline
- **Lenis** — buttery smooth scrolling
- **Framer Motion** — section reveals, staggers, tilt cards, count-ups

## Design system

| Token        | Value     | Use                        |
| ------------ | --------- | -------------------------- |
| Background   | `#0D0D0D` | matte black                |
| Surface      | `#1F1F1F` | charcoal cards             |
| Border       | `#3A3A3A` | hairlines                  |
| Text         | `#FFFFFF` / `#E8E8E8` | primary / secondary |
| Accent       | `#D4AF37` | metallic gold (emphasis only) |

Spacing follows an 8px grid; gold is reserved for emphasis, highlights, and 3D glow.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

```bash
npm run build    # production build
npm start        # serve the production build
```

## Editing content

All copy, stats, programs, milestones, and testimonials live in
[`lib/content.ts`](lib/content.ts). Update that one file to change the site's text.

The 3D ring behavior is in [`components/three/Ring.tsx`](components/three/Ring.tsx);
its scroll choreography is keyed to stages defined in
[`lib/scroll.ts`](lib/scroll.ts).

## Deploy

Optimized for **Vercel** — push to GitHub and import the repo, or run `vercel`.

## Performance

- The 3D bundle is dynamically imported and mounted on browser idle.
- Render quality (DPR, bloom, particle count) auto-scales down on mobile / low-core devices.
- Honors `prefers-reduced-motion`: smooth scroll and scrubbed motion are disabled.
