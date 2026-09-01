import React from 'react';
import { t } from '@/lib/data/i18n';
import { skillsData } from '@/lib/data/skills';

interface SkillsSectionProps {
  lang: string;
}

export default function SkillsSection({ lang }: SkillsSectionProps) {
  const skills = t(lang).skills;

  return (
    <section id="skills" className="py-20 md:py-28 border-t border-[var(--glass-border)] section-optimize">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
          {skills.title}
          {skills.titleAccent && (
            <> <span className="text-[var(--accent-primary)]">{skills.titleAccent}</span></>
          )}
        </h2>
        <p className="mt-4 text-base sm:text-lg text-[var(--text-secondary)]">
          {skills.description}
        </p>
        <div className="h-1 w-14 bg-[var(--accent-primary)] rounded-full mx-auto mt-4" />
      </div>

      {/* Grid of Skill Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skillsData.map((category) => {
          const categoryTitle = skills.categories[category.key] || category.key;

          return (
            <div
              key={category.key}
              className="mocha-glass rounded-3xl p-6 sm:p-7 flex flex-col justify-between hover:border-[var(--glass-border-hover)] transition-all duration-300 group"
            >
              <div>
                {/* Category Header */}
                <h3 className="font-heading text-lg font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors mb-4 flex items-center justify-between">
                  <span>{categoryTitle}</span>
                  <span className="font-mono text-xs text-[var(--text-muted)] font-normal">
                    {category.items.length} items
                  </span>
                </h3>

                {/* Items Badges */}
                <div className="flex flex-wrap gap-2.5">
                  {category.items.map((item) => (
                    <div
                      key={item.name}
                      className="inline-flex items-center gap-2 rounded-xl border border-[var(--glass-border)] bg-[var(--bg-surface)] px-3 py-1.5 text-xs font-mono font-medium text-[var(--text-secondary)] hover:text-[var(--accent-primary)] hover:border-[var(--glass-border-hover)] hover:bg-[var(--glass-bg-hover)] transition-all hover:scale-105"
                    >
                      {item.icon && (
                        <img
                          src={item.icon}
                          alt=""
                          width={16}
                          height={16}
                          loading="lazy"
                          decoding="async"
                          className="h-4 w-4 object-contain shrink-0"
                        />
                      )}
                      <span>{item.name}</span>
                      {item.soon && (
                        <span className="rounded bg-[var(--accent-soft)] px-1.5 py-0.5 text-[9px] font-bold text-[var(--accent-primary)] uppercase">
                          Soon
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
