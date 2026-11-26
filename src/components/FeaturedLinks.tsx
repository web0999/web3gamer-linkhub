import React from 'react';
import { ArrowUpRight, Code2, FolderKanban, Gamepad2, Globe } from 'lucide-react';
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
    <section id="links" aria-labelledby="links-heading" className="py-12 sm:py-16">
      <div className="mb-8 flex items-baseline justify-between border-b border-[var(--border-subtle)] pb-4">
        <h2
          id="links-heading"
          className="font-display text-xs font-bold uppercase tracking-[0.2em] text-cyan-400"
        >
          Editorial Showcase
        </h2>
        <span className="text-xs text-[var(--text-secondary)]">Curated Destinations</span>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {validLinks.map((item, idx) => {
          const Icon = iconMap[item.icon] || Globe;
          const isExternal = !item.resolvedUrl.startsWith('#');
          const indexLabel = String(idx + 1).padStart(2, '0');

          return (
            <TiltCard key={item.id} className={item.featured ? 'md:col-span-2 lg:col-span-1' : ''}>
              <a
                href={item.resolvedUrl}
                {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="nexus-panel group flex h-full flex-col justify-between gap-6 rounded-2xl p-6 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-primary)]/80 text-[var(--text-secondary)] transition-colors group-hover:border-cyan-400/50 group-hover:text-cyan-400">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="font-display text-xs font-bold tracking-widest text-[var(--text-secondary)]/70">
                    {indexLabel}
                  </span>
                </div>

                <div>
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-display text-base sm:text-lg font-bold text-[var(--text-primary)] group-hover:text-cyan-300 transition-colors">
                      {item.title}
                    </h3>
                    <ArrowUpRight
                      className="h-4 w-4 shrink-0 text-[var(--text-secondary)] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-cyan-400"
                      aria-hidden="true"
                    />
                  </div>
                  <p className="mt-2 text-xs sm:text-sm leading-relaxed text-[var(--text-secondary)]">
                    {item.description}
                  </p>
                </div>
              </a>
            </TiltCard>
          );
        })}
      </div>
    </section>
  );
};
