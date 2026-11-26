import React from 'react';
import { ArrowDown, ArrowDownRight, MapPin } from 'lucide-react';
import { siteConfig } from '../config/site.config';
import { CinematicEmblem } from './CinematicEmblem';

export const ProfileHero: React.FC = () => {
  const { name, username, tagline, bio, location } = siteConfig.profile;
  const letters = name.toUpperCase().split('');

  return (
    <section
      id="top"
      aria-labelledby="profile-heading"
      className="relative flex min-h-[calc(100vh-2rem)] flex-col justify-center pt-24 pb-12 lg:pt-28 lg:pb-16"
    >
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-10">
        {/* 3D Nexus Emblem: Top on mobile, Right on desktop */}
        <div className="order-1 flex justify-center lg:order-2 lg:col-span-5 lg:justify-end">
          <CinematicEmblem />
        </div>

        {/* Editorial Introduction: Below artwork on mobile, Left on desktop */}
        <div className="order-2 flex flex-col items-center text-center lg:order-1 lg:col-span-7 lg:items-start lg:text-left">
          {username && (
            <span className="animate-reveal inline-flex items-center gap-2 rounded-full border border-cyan-400/25 bg-cyan-500/10 px-4 py-1 text-xs font-semibold tracking-widest uppercase text-cyan-300">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" aria-hidden="true" />
              {username} · NEXUS
            </span>
          )}

          <h1
            id="profile-heading"
            aria-label={name}
            className="hero-title mt-5 font-display font-extrabold uppercase text-[var(--text-primary)]"
          >
            {letters.map((char, idx) => (
              <span
                key={`${char}-${idx}`}
                className="animate-reveal inline-block"
                style={{ animationDelay: `${idx * 45}ms` }}
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </h1>

          <p className="animate-reveal animate-delay-2 mt-4 bg-gradient-to-r from-cyan-400 via-slate-200 to-violet-400 bg-clip-text text-lg sm:text-xl lg:text-2xl font-bold tracking-tight text-transparent">
            {tagline}
          </p>

          <p className="animate-reveal animate-delay-3 mt-4 max-w-xl text-sm sm:text-base lg:text-lg leading-relaxed text-[var(--text-secondary)]">
            {bio}
          </p>

          {location && (
            <div className="animate-reveal animate-delay-3 mt-3 inline-flex items-center gap-1.5 text-xs text-[var(--text-secondary)]">
              <MapPin className="h-3.5 w-3.5 text-cyan-400" aria-hidden="true" />
              <span>{location}</span>
            </div>
          )}

          <div className="animate-reveal animate-delay-4 mt-8 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
            <a
              href="#socials"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-violet-600 px-6 py-3 text-sm font-semibold text-white shadow-[0_0_28px_rgba(34,211,238,0.35)] transition-all hover:brightness-110 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400"
            >
              <span>Enter Universe</span>
              <ArrowDownRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" aria-hidden="true" />
            </a>
            <a
              href="#contact"
              className="nexus-panel inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-[var(--text-primary)] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400"
            >
              <span>Direct Contact</span>
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="mt-12 hidden lg:flex justify-center">
        <a
          href="#socials"
          aria-label="Scroll to social universe"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border-subtle)] text-[var(--text-secondary)] transition-colors hover:border-cyan-400/50 hover:text-cyan-400"
        >
          <ArrowDown className="h-4 w-4 animate-bounce" aria-hidden="true" />
        </a>
      </div>
    </section>
  );
};
