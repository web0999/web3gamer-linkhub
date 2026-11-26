import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  depth: number;
  alpha: number;
  hue: number;
}

interface TrailPoint {
  x: number;
  y: number;
  life: number;
}

export const ParticleUniverse: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let animationId = 0;
    let isPaused = false;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const isMobile = width < 768;
    const particleCount = isMobile ? 38 : Math.min(90, Math.floor((width * height) / 18000));
    const connectionDistance = isMobile ? 95 : 135;
    const mouseRadius = 170;

    const pointer = { x: -9999, y: -9999, active: false };
    const trail: TrailPoint[] = [];

    // Pre-allocate particle pool
    const particles: Particle[] = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      radius: Math.random() * 1.6 + 0.6,
      depth: Math.random() * 0.8 + 0.2,
      alpha: Math.random() * 0.5 + 0.25,
      hue: Math.random() > 0.35 ? 262 : 217, // Violet or Cobalt Blue
    }));

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handlePointerMove = (e: PointerEvent) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      pointer.active = true;
      if (trail.length < 18) {
        trail.push({ x: e.clientX, y: e.clientY, life: 1 });
      }
    };

    const handlePointerLeave = () => {
      pointer.active = false;
    };

    const handleVisibilityChange = () => {
      isPaused = document.hidden;
    };

    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerleave', handlePointerLeave);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    const render = () => {
      animationId = requestAnimationFrame(render);
      if (isPaused) return;

      ctx.clearRect(0, 0, width, height);

      // Subtle cursor spotlight
      if (pointer.active && !isMobile) {
        const grad = ctx.createRadialGradient(pointer.x, pointer.y, 0, pointer.x, pointer.y, 260);
        grad.addColorStop(0, 'rgba(139, 92, 246, 0.11)');
        grad.addColorStop(0.5, 'rgba(59, 130, 246, 0.04)');
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = grad;
        ctx.fillRect(pointer.x - 260, pointer.y - 260, 520, 520);
      }

      // Particle trail
      for (let i = trail.length - 1; i >= 0; i--) {
        const tp = trail[i];
        tp.life -= 0.05;
        if (tp.life <= 0) {
          trail.splice(i, 1);
          continue;
        }
        ctx.beginPath();
        ctx.arc(tp.x, tp.y, tp.life * 2.4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(167, 139, 250, ${tp.life * 0.35})`;
        ctx.fill();
      }

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx * p.depth;
        p.y += p.vy * p.depth;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        if (pointer.active) {
          const dx = p.x - pointer.x;
          const dy = p.y - pointer.y;
          const dist = Math.hypot(dx, dy);
          if (dist < mouseRadius && dist > 0.1) {
            const force = ((mouseRadius - dist) / mouseRadius) * 0.65 * p.depth;
            p.x += (dx / dist) * force;
            p.y += (dy / dist) * force;
          }
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 85%, 72%, ${p.alpha})`;
        ctx.fill();

        // Connecting lines
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < connectionDistance * connectionDistance) {
            const dist = Math.sqrt(distSq);
            const lineAlpha = (1 - dist / connectionDistance) * 0.16;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(139, 92, 246, ${lineAlpha})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
      }
    };

    animationId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerleave', handlePointerLeave);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 h-full w-full"
    />
  );
};

