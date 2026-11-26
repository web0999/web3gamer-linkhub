import React from 'react';
import { ArrowDown, ArrowDownRight, MapPin } from 'lucide-react';
import { siteConfig } from '../config/site.config';
import { CinematicEmblem } from './CinematicEmblem';

export const ProfileHero: React.FC = () => {
  const { name, username, tagline, bio, location } = siteConfig.profile;
  const letters = name.toUpperCase().split('');

  return (
    <section
      aria-labelledby="profile-heading"
      className="relative py-12 sm:py-16 lg:py-24"
    >
      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
        {/* Artwork: Top on mobile, Right on desktop */}
        <div className="order-1 flex justify-center lg:order-2 lg:col-span-5 lg:justify-end">
          <CinematicEmblem />
        </div>

        {/* Introduction: Below artwork on mobile, Left on desktop */}
        <div className="order-2 flex flex-col items-center text-center lg:order-1 lg:col-span-7 lg:items-start lg:text-left">
          {username && (
            <span className="animate-reveal inline-flex items-center gap-2 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface)]/80 px-3.5 py-1 text-xs font-medium tracking-wide text-[var(--text-secondary)] backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-violet-500 animate-pulse" aria-hidden="true" />
              {username}
            </span>
          )}

          <h1
            id="profile-heading"
            aria-label={name}
            className="hero-title mt-4 font-display font-extrabold uppercase text-[var(--text-primary)]"
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

          <p className="animate-reveal animate-delay-2 mt-3 bg-gradient-to-r from-violet-400 via-indigo-400 to-blue-400 bg-clip-text text-base sm:text-lg lg:text-xl font-semibold tracking-tight text-transparent">
            {tagline}
          </p>

          <p className="animate-reveal animate-delay-3 mt-4 max-w-xl text-sm sm:text-base leading-relaxed text-[var(--text-secondary)]">
            {bio}
          </p>

          {location && (
            <div className="animate-reveal animate-delay-3 mt-3 inline-flex items-center gap-1.5 text-xs text-[var(--text-secondary)]">
              <MapPin className="h-3.5 w-3.5 text-violet-500" aria-hidden="true" />
              <span>{location}</span>
            </div>
          )}

          <div className="animate-reveal animate-delay-4 mt-7 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
            <a
              href="#links"
              className="group inline-flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_0_24px_rgba(139,92,246,0.35)] transition-all hover:bg-violet-500 hover:shadow-[0_0_32px_rgba(139,92,246,0.5)] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500"
            >
              <span>Explore Links</span>
              <ArrowDownRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" aria-hidden="true" />
            </a>
            <a
              href="#contact"
              className="surface-card inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-[var(--text-primary)] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500"
            >
              <span>Connect</span>
            </a>
          </div>
        </div>
      </div>

      {/* Subtle scroll indicator */}
      <div className="mt-10 hidden lg:flex justify-center">
        <a
          href="#links"
          aria-label="Scroll to links"
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border-subtle)] text-[var(--text-secondary)] transition-colors hover:border-violet-500/40 hover:text-violet-400"
        >
          <ArrowDown className="h-4 w-4 animate-bounce" aria-hidden="true" />
        </a>
      </div>
    </section>
  );
};
