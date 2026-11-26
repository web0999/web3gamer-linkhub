import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { siteConfig, type SocialPlatform } from '../config/site.config';
import { formatWhatsAppUrl, isValidHttpUrl } from '../utils/validation';
import { platformMeta } from './PlatformIcons';
import { TiltCard } from './TiltCard';

const platformAccent: Record<SocialPlatform, string> = {
  telegram: 'group-hover:text-sky-400',
  youtube: 'group-hover:text-red-400',
  instagram: 'group-hover:text-pink-400',
  github: 'group-hover:text-cyan-300',
  whatsapp: 'group-hover:text-emerald-400',
};

export const SocialLinks: React.FC = () => {
  const entries = (Object.keys(siteConfig.socials) as SocialPlatform[])
    .map((platform) => {
      const raw = siteConfig.socials[platform];
      const url = platform === 'whatsapp' ? formatWhatsAppUrl(raw) : isValidHttpUrl(raw) ? raw : null;
      return { platform, url };
    })
    .filter((item): item is { platform: SocialPlatform; url: string } => item.url !== null);

  if (entries.length === 0) {
    return null;
  }

  return (
    <section id="socials" aria-labelledby="socials-heading" className="py-12 sm:py-16">
      <div className="mb-6 flex items-baseline justify-between">
        <h2
          id="socials-heading"
          className="font-display text-xs font-bold uppercase tracking-[0.2em] text-cyan-400"
        >
          Social Universe
        </h2>
        <span className="text-xs text-[var(--text-secondary)]">Direct Channels</span>
      </div>

      <div className="flex flex-wrap items-center gap-3 sm:gap-4">
        {entries.map(({ platform, url }) => {
          const { label, Icon } = platformMeta[platform];
          return (
            <TiltCard key={platform} className="flex-1 min-w-[145px]">
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open ${label}`}
                className="nexus-panel group flex items-center justify-between gap-3 rounded-2xl px-5 py-4 text-sm font-semibold text-[var(--text-primary)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400"
              >
                <div className="flex items-center gap-3">
                  <Icon className={`h-5 w-5 shrink-0 text-[var(--text-secondary)] transition-colors ${platformAccent[platform]}`} />
                  <span>{label}</span>
                </div>
                <ArrowUpRight className="h-4 w-4 text-[var(--text-secondary)] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-cyan-400" aria-hidden="true" />
              </a>
            </TiltCard>
          );
        })}
      </div>
    </section>
  );
};
