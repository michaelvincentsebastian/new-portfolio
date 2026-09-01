import React from 'react';
import Image from 'next/image';
import Icon from './Icon';
import { ProjectItem } from '@/lib/content';
import { t } from '@/lib/data/i18n';

interface ProjectCardProps {
  project: ProjectItem;
  lang: string;
}

export default function ProjectCard({ project, lang }: ProjectCardProps) {
  const { data } = project;
  const label = t(lang).projects;

  const hasBottomActions = Boolean(data.demo || data.github);

  const handleCardClick = (e: React.MouseEvent) => {
    // Prevent opening card link if clicked on child action buttons
    if ((e.target as HTMLElement).closest('a[data-action]')) {
      return;
    }
    if (data.notionUrl) {
      window.open(data.notionUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div
      onClick={handleCardClick}
      role={data.notionUrl ? 'link' : undefined}
      tabIndex={data.notionUrl ? 0 : undefined}
      onKeyDown={(e) => {
        if (e.key === 'Enter' && data.notionUrl) {
          window.open(data.notionUrl, '_blank', 'noopener,noreferrer');
        }
      }}
      className={`mocha-glass rounded-3xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:border-[var(--glass-border-hover)] hover:-translate-y-1 group ${
        data.notionUrl ? 'cursor-pointer' : ''
      }`}
    >
      <div>
        {/* Cover image if present */}
        {data.cover ? (
          <div className="aspect-video w-full overflow-hidden bg-[var(--bg-surface-elevated)] relative border-b border-[var(--glass-border)]">
            <Image
              src={data.cover}
              alt={data.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
              loading="lazy"
              className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
            />
            {/* Category tag overlay on image */}
            {data.category && (
              <span className="absolute top-3 left-3 rounded-full border border-[var(--glass-border)] bg-[var(--bg-surface)]/90 backdrop-blur-md px-3 py-1 font-mono text-[11px] font-semibold text-[var(--text-secondary)] shadow-sm">
                {data.category}
              </span>
            )}
            {/* Status tag */}
            {data.status && (
              <span className="absolute top-3 right-3 rounded-full border border-[var(--glass-border)] bg-[var(--bg-surface)]/90 backdrop-blur-md px-3 py-1 font-mono text-[11px] font-bold text-[var(--accent-primary)] shadow-sm">
                {data.status}
              </span>
            )}
          </div>
        ) : (
          <div className="px-6 sm:px-7 pt-6 sm:pt-7 pb-2 flex items-center justify-between gap-2">
            {data.category ? (
              <span className="rounded-full border border-[var(--glass-border)] bg-[var(--bg-surface)] px-3 py-1 font-mono text-[11px] font-semibold text-[var(--text-secondary)]">
                {data.category}
              </span>
            ) : (
              <span />
            )}
            {data.status && (
              <span className="rounded-full border border-[var(--glass-border)] bg-[var(--accent-soft)] px-2.5 py-0.5 font-mono text-[10px] font-bold text-[var(--accent-primary)]">
                {data.status}
              </span>
            )}
          </div>
        )}

        {/* Card Body */}
        <div className="p-6 sm:p-7">
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="font-mono text-xs text-[var(--text-muted)] font-medium">
              {data.year}
            </span>
            {data.notionUrl && (
              <span className="inline-flex items-center gap-1 font-mono text-[11px] text-[var(--text-muted)] group-hover:text-[var(--accent-primary)] transition-colors">
                <span>Notion</span>
                <Icon name="external-link" size={12} />
              </span>
            )}
          </div>

          <h3 className="font-heading text-xl sm:text-2xl font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors flex items-center justify-between gap-2">
            <span>{data.title}</span>
          </h3>

          <p className="mt-2.5 text-sm leading-relaxed text-[var(--text-secondary)]">
            {data.tagline}
          </p>

          {/* Technical Scope Pills (Directly rendered without label header) */}
          {data.scope && data.scope.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-1.5 pt-2">
              {data.scope.map((item, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1 rounded-md border border-[var(--glass-border)] bg-[var(--bg-surface)]/60 px-2.5 py-1 font-mono text-[11px] text-[var(--text-primary)]"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-primary)]/80" />
                  {item}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Optional Footer: Only shown if live demo or GitHub URL is configured */}
      {hasBottomActions && (
        <div className="px-6 sm:px-7 pb-6 sm:pb-7 pt-4 border-t border-[var(--glass-border)] flex items-center justify-between gap-3">
          {data.demo ? (
            <a
              data-action="true"
              href={data.demo}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1.5 rounded-xl bg-[var(--accent-primary)] hover:bg-[var(--accent-primary-hover)] text-white px-4 py-2 text-xs font-semibold font-heading transition-all shadow-sm hover:scale-[1.02] cursor-pointer"
            >
              <span>{label.liveDemo}</span>
              <Icon name="external-link" size={13} />
            </a>
          ) : (
            <div />
          )}

          {data.github && (
            <a
              data-action="true"
              href={data.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Repository"
              title="GitHub Repository"
              onClick={(e) => e.stopPropagation()}
              className="text-[var(--text-muted)] hover:text-[var(--accent-primary)] transition-colors p-1.5 rounded-lg border border-[var(--glass-border)] bg-[var(--bg-surface)] hover:border-[var(--glass-border-hover)] cursor-pointer"
            >
              <Icon name="github" size={16} />
            </a>
          )}
        </div>
      )}
    </div>
  );
}
