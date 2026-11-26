import React from 'react';
import { ArrowUpRight, FolderKanban, Gamepad2, Globe, Code2, Sparkles } from 'lucide-react';
import { type FeaturedIconName, siteConfig } from '../config/site.config';
import { formatWhatsAppUrl, isValidDestination } from '../utils/validation';
import { InstagramIcon, TelegramIcon, WhatsAppIcon, YouTubeIcon } from './PlatformIcons';
import { TiltCard } from './TiltCard';

const iconMap: Record<FeaturedIconName, React.FC<{ className?: string }>> = {
  youtube: YouTubeIcon,
  telegram: TelegramIcon,
  instagram: InstagramIcon,
  whatsapp: WhatsAppIcon,
  folder: FolderKanban,
  gamepad: Gamepad2,
  globe: Globe,
  code: Code2,
};

export const FeaturedLinks: React.FC = () => {
  const validLinks = siteConfig.featuredLinks
    .filter((item) => item.enabled)
    .map((item) => {
      const resolvedUrl =
        item.icon === 'whatsapp'
          ? formatWhatsAppUrl(item.url)
          : isValidDestination(item.url)
            ? item.url
            : null;
      return { ...item, resolvedUrl };
    })
    .filter((item): item is typeof item & { resolvedUrl: string } => item.resolvedUrl !== null)
    .sort((a, b) => a.order - b.order);

  if (validLinks.length === 0) {
    return null;
  }

  return (
    <section id="links" aria-labelledby="links-heading" className="py-6">
      <div className="mb-4 flex items-center justify-between">
        <h2
          id="links-heading"
          className="font-display text-xs font-semibold uppercase tracking-widest text-[var(--text-secondary)]"
        >
          Featured Links
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {validLinks.map((item) => {
          const Icon = iconMap[item.icon] || Globe;
          const isExternal = !item.resolvedUrl.startsWith('#');

          return (
            <TiltCard key={item.id}>
              <a
                href={item.resolvedUrl}
                {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className={`surface-card group relative flex items-center justify-between gap-4 rounded-2xl p-4 sm:p-5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500 ${
                  item.featured ? 'ring-1 ring-violet-500/25' : ''
                }`}
              >
                <div className="flex items-center gap-4 min-w-0">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-primary)] text-[var(--text-secondary)] transition-colors group-hover:border-violet-500/40 group-hover:text-violet-500">
                    <Icon className="h-5 w-5" />
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="truncate font-display text-sm sm:text-base font-semibold text-[var(--text-primary)]">
                        {item.title}
                      </h3>
                      {item.featured && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-violet-500/10 px-2 py-0.5 text-[10px] font-semibold text-violet-500">
                          <Sparkles className="h-2.5 w-2.5" aria-hidden="true" />
                          Featured
                        </span>
                      )}
                    </div>
                    <p className="mt-0.5 truncate text-xs sm:text-sm text-[var(--text-secondary)]">
                      {item.description}
                    </p>
                  </div>
                </div>

                <ArrowUpRight
                  className="h-4 w-4 shrink-0 text-[var(--text-secondary)] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-violet-500"
                  aria-hidden="true"
                />
              </a>
            </TiltCard>
          );
        })}
      </div>
    </section>
  );
};
