import React, { useRef, useState } from 'react';
import { siteConfig } from '../config/site.config';

export const CinematicEmblem: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [imgError, setImgError] = useState(false);

  const { name, avatar } = siteConfig.profile;
  const showCustomImage = Boolean(avatar) && !imgError && avatar !== '/images/web3gamer-avatar.svg';

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!containerRef.current || e.pointerType === 'touch') return;
    const rect = containerRef.current.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: -ny * 16, y: nx * 16 });
  };

  const handlePointerLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="relative flex h-64 w-64 sm:h-80 sm:w-80 lg:h-[22rem] lg:w-[22rem] items-center justify-center select-none"
      style={{ perspective: '1000px' }}
    >
      {/* Volumetric cyan + violet energy field */}
      <div
        aria-hidden="true"
        className="absolute -inset-8 rounded-full bg-[radial-gradient(circle,rgba(34,211,238,0.24),rgba(124,58,237,0.18)_50%,transparent_72%)] blur-2xl"
      />

      {/* 3D Tilted Orbital Ring 1 */}
      <div
        aria-hidden="true"
        className="animate-spin-slow absolute inset-0 rounded-full border border-cyan-400/35 border-t-cyan-300"
        style={{ transform: 'rotateX(68deg) rotateY(12deg)' }}
      />

      {/* 3D Tilted Orbital Ring 2 */}
      <div
        aria-hidden="true"
        className="animate-spin-reverse absolute inset-3 rounded-full border border-violet-500/35 border-b-violet-400"
        style={{ transform: 'rotateX(-64deg) rotateY(18deg)' }}
      />

      {/* Flat outer precision ring */}
      <div
        aria-hidden="true"
        className="animate-spin-slow absolute inset-5 rounded-full border border-dashed border-slate-400/20"
      />

      {/* 3D Interactive Emblem Core */}
      <div
        className="animate-float relative flex h-48 w-48 sm:h-60 sm:w-60 lg:h-68 lg:w-68 items-center justify-center overflow-hidden rounded-full border border-cyan-400/30 bg-[#050814] shadow-[0_0_60px_rgba(34,211,238,0.22)] transition-transform duration-300 ease-out"
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transformStyle: 'preserve-3d',
        }}
      >
        {showCustomImage ? (
          <img
            src={avatar!}
            alt={`${name} profile`}
            onError={() => setImgError(true)}
            className="h-full w-full object-cover"
          />
        ) : (
          <img
            src="/images/web3gamer-avatar.svg"
            alt={`${name} W3G 3D metallic monogram`}
            className="h-full w-full object-cover"
          />
        )}

        {/* Holographic scanline */}
        <div
          aria-hidden="true"
          className="animate-holo-scan pointer-events-none absolute inset-x-0 h-10 bg-gradient-to-b from-transparent via-cyan-400/20 to-transparent"
        />

        {/* Light sweep reflection */}
        <div
          aria-hidden="true"
          className="animate-light-sweep pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -skew-x-12"
        />
      </div>
    </div>
  );
};
