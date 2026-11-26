# Performance Report

## Optimizations Implemented
- **Adaptive Particle Density**: 38 particles on mobile (`< 768px`), up to 90 particles on desktop, avoiding heavy WebGL/Three.js overhead.
- **Pre-allocated Particle Pool**: Particle objects are allocated once on mount and mutated in place inside `requestAnimationFrame` to minimize GC pressure.
- **Tab Visibility Pause**: `visibilitychange` listener pauses rendering when the tab is backgrounded.
- **GPU-Composited Transforms**: Card tilts, orbital rings, and light sweeps use `transform` and `opacity` rather than layout-thrashing properties.
- **Reduced Motion Support**: Canvas loop and CSS keyframe animations respect `prefers-reduced-motion: reduce`.
