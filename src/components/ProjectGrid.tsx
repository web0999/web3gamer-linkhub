import React from 'react';
import { ArrowUpRight, Layers } from 'lucide-react';
import { siteConfig } from '../config/site.config';
import { isValidDestination } from '../utils/validation';

export const ProjectGrid: React.FC = () => {
  const activeProjects = siteConfig.projects.filter(
    (project) => project.enabled && isValidDestination(project.url)
  );

  if (activeProjects.length === 0) {
    return null;
  }

  return (
    <section id="projects" aria-labelledby="projects-heading" className="py-8">
      <div className="mb-4 flex items-center justify-between">
        <h2
          id="projects-heading"
          className="font-display text-xs font-semibold uppercase tracking-widest text-[var(--text-secondary)]"
        >
          Projects &amp; Builds
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {activeProjects.map((project, index) => {
          const isExternal = project.url ? !project.url.startsWith('#') : false;
          const isWide = activeProjects.length % 2 === 1 && index === 0;

          return (
            <a
              key={project.id}
              href={project.url!}
              {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className={`surface-card group flex flex-col justify-between rounded-2xl p-5 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500 ${
                isWide ? 'sm:col-span-2' : ''
              }`}
            >
              <div>
                <div className="mb-3 flex items-center justify-between gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-primary)] text-violet-500">
                    <Layers className="h-4 w-4" aria-hidden="true" />
                  </div>
                  {project.tag && (
                    <span className="rounded-full border border-[var(--border-subtle)] px-2.5 py-0.5 text-[11px] font-medium text-[var(--text-secondary)]">
                      {project.tag}
                    </span>
                  )}
                </div>

                <h3 className="font-display text-base font-semibold text-[var(--text-primary)]">
                  {project.title}
                </h3>
                <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-[var(--text-secondary)]">
                  {project.description}
                </p>
              </div>

              <div className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-violet-500">
                <span>View</span>
                <ArrowUpRight
                  className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
};

