import React from 'react';
import { siteConfig, type SocialPlatform } from '../config/site.config';
import { formatWhatsAppUrl, isValidHttpUrl } from '../utils/validation';
import { platformMeta } from './PlatformIcons';
import { TiltCard } from './TiltCard';

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
    <section aria-label="Social connections" className="pb-10">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {entries.map(({ platform, url }) => {
          const { label, Icon } = platformMeta[platform];
          return (
            <TiltCard key={platform}>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open ${label}`}
                className="surface-card group flex items-center justify-center gap-3 rounded-2xl px-4 py-3.5 text-sm font-medium text-[var(--text-primary)] hover:border-violet-500/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500"
              >
                <Icon className="h-4 w-4 shrink-0 text-[var(--text-secondary)] transition-colors group-hover:text-violet-500" />
                <span>{label}</span>
              </a>
            </TiltCard>
          );
        })}
      </div>
    </section>
  );
};
