# Motion System

## 1. Mouse-Reactive Particle Universe (`src/components/ParticleUniverse.tsx`)
- **Canvas 2D + `requestAnimationFrame`**: Pre-allocated particle pool with depth layers (`depth` 0.2–1.0), violet/cobalt hues, proximity displacement, fine connecting lines, cursor spotlight radial gradient, and a fading particle trail.
- **Lifecycle**: Pauses automatically when `document.hidden` is true (`visibilitychange`) and disables when `prefers-reduced-motion: reduce` is active.

## 2. Cinematic W3G Identity (`src/components/CinematicEmblem.tsx`)
- **3D Pointer Parallax**: Tracks pointer offset within the emblem bounds and applies `rotateX`/`rotateY` perspective transforms.
- **Orbital Rings & Light Sweep**: Dual counter-rotating CSS orbital rings (`animate-spin-slow`, `animate-spin-reverse`), floating vertical motion (`animate-float`), and a periodic diagonal light sweep (`animate-light-sweep`).

## 3. Magnetic & 3D Tilt UI (`src/components/TiltCard.tsx`)
- **3D Tilt + Dynamic Edge Glow**: Social and featured cards tilt up to 6° toward the pointer with a radial spotlight following the cursor, returning smoothly on `pointerleave`. Disabled on touch pointers.

## 4. Hero & Scroll Reveals
- **Character-by-character Headline**: `WEB3GAMER` animates letter-by-letter with staggered `45ms` delays (`revealUp`).
- **Reduced Motion**: All animations and transitions collapse to `0.01ms` under `@media (prefers-reduced-motion: reduce)`.

