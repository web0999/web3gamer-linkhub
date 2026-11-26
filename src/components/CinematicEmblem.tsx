import React, { useRef, useState } from 'react';
import { siteConfig } from '../config/site.config';

export const CinematicEmblem: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [imgError, setImgError] = useState(false);

  const { name, avatar } = siteConfig.profile;
  const showCustomImage = Boolean(avatar) && !imgError && avatar !== '/images/web3gamer-avatar.svg';

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: -ny * 14, y: nx * 14 });
  };

  const handlePointerLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="relative flex h-56 w-56 sm:h-68 sm:w-68 lg:h-80 lg:w-80 items-center justify-center select-none"
      style={{ perspective: '900px' }}
    >
      {/* Volumetric ambient glow */}
      <div
        aria-hidden="true"
        className="absolute -inset-6 rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.32),rgba(59,130,246,0.14)_52%,transparent_74%)] blur-2xl"
      />

      {/* Outer rotating orbital ring */}
      <div
        aria-hidden="true"
        className="animate-spin-slow absolute inset-0 rounded-full border border-violet-500/25 border-t-violet-400/70"
      />

      {/* Counter-rotating inner orbital ring */}
      <div
        aria-hidden="true"
        className="animate-spin-reverse absolute inset-4 rounded-full border border-blue-500/20 border-b-blue-400/60"
      />

      {/* 3D Interactive Emblem Core */}
      <div
        className="animate-float relative flex h-44 w-44 sm:h-52 sm:w-52 lg:h-64 lg:w-64 items-center justify-center overflow-hidden rounded-full border border-white/15 bg-[#09090d] shadow-[0_0_50px_rgba(139,92,246,0.22)] transition-transform duration-300 ease-out"
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

        {/* Light sweep reflection */}
        <div
          aria-hidden="true"
          className="animate-light-sweep pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/12 to-transparent -skew-x-12"
        />
      </div>
    </div>
  );
};
