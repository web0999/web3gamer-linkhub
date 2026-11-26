import React, { useState } from 'react';
import { ArrowDownRight, MapPin } from 'lucide-react';
import { siteConfig } from '../config/site.config';

export const ProfileHero: React.FC = () => {
  const { name, username, tagline, bio, avatar, location } = siteConfig.profile;
  const [imgError, setImgError] = useState(false);

  const initials =
    name
      .split(/\s+/)
      .map((part) => part[0])
      .join('')
      .slice(0, 2)
      .toUpperCase() || 'W3';

  const showImage = Boolean(avatar) && !imgError;

  return (
    <section
      aria-labelledby="profile-heading"
      className="py-12 sm:py-16 lg:py-24"
    >
      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
        {/* Artwork: Top on mobile, Right on desktop */}
        <div className="order-1 flex justify-center lg:order-2 lg:col-span-5 lg:justify-end">
          <div className="animate-float relative">
            <div
              className="absolute -inset-4 rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.28),rgba(59,130,246,0.12)_55%,transparent_75%)] blur-xl"
              aria-hidden="true"
            />
            <div className="relative flex h-44 w-44 sm:h-56 sm:w-56 lg:h-72 lg:w-72 items-center justify-center overflow-hidden rounded-full border border-[var(--border-strong)] bg-[var(--bg-surface)] shadow-2xl">
              {showImage ? (
                <img
                  src={avatar!}
                  alt={`${name} W3G monogram artwork`}
                  onError={() => setImgError(true)}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight text-[var(--text-primary)]">
                  {initials}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Introduction: Below artwork on mobile, Left on desktop */}
        <div className="order-2 flex flex-col items-center text-center lg:order-1 lg:col-span-7 lg:items-start lg:text-left">
          {username && (
            <span className="animate-reveal inline-flex items-center gap-2 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-3.5 py-1 text-xs font-medium tracking-wide text-[var(--text-secondary)]">
              <span className="h-1.5 w-1.5 rounded-full bg-violet-500" aria-hidden="true" />
              {username}
            </span>
          )}

          <h1
            id="profile-heading"
            className="animate-reveal animate-delay-1 hero-title mt-4 font-display font-extrabold uppercase text-[var(--text-primary)]"
          >
            {name}
          </h1>

          <p className="animate-reveal animate-delay-2 mt-3 text-base sm:text-lg lg:text-xl font-semibold tracking-tight text-violet-500 dark:text-violet-400">
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
              className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-violet-500 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500"
            >
              <span>Explore Links</span>
              <ArrowDownRight className="h-4 w-4" aria-hidden="true" />
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
    </section>
  );
};
