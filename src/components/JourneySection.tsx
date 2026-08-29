'use client';

import React, { useState } from 'react';
import Icon from './Icon';
import JourneyModal from './JourneyModal';
import { ExperienceItem } from '@/lib/content';
import { t } from '@/lib/data/i18n';

interface JourneySectionProps {
  experiences: ExperienceItem[];
  lang: string;
}

export default function JourneySection({ experiences, lang }: JourneySectionProps) {
  const [selectedExp, setSelectedExp] = useState<ExperienceItem | null>(null);
  const journey = t(lang).journey;

  return (
    <section id="journey" className="py-20 md:py-28 border-t border-[var(--glass-border)]">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
          {journey.title}
          {journey.titleAccent && (
            <> <span className="text-[var(--accent-primary)]">{journey.titleAccent}</span></>
          )}
        </h2>
        <p className="mt-4 text-base sm:text-lg text-[var(--text-secondary)]">
          {journey.description}
        </p>
        <div className="h-1 w-14 bg-[var(--accent-primary)] rounded-full mx-auto mt-4" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
        {/* Left Column: Timeline */}
        <div className="lg:col-span-7">
          <h3 className="font-heading text-xl font-bold text-[var(--text-primary)] mb-8 flex items-center gap-2">
            <Icon name="route" size={20} className="text-[var(--accent-primary)]" />
            <span>{journey.timelineTitle}</span>
          </h3>

          <div className="relative pl-6 sm:pl-8 border-l-2 border-[var(--glass-border)] space-y-8 ml-3 sm:ml-4">
            {journey.items.map((item) => {
              const expDetail = experiences.find((e) => e.data.id === item.id);

              return (
                <div key={item.id} className="relative group">
                  {/* Timeline Glowing Dot */}
                  <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 h-3.5 w-3.5 rounded-full bg-[var(--accent-primary)] border-4 border-[var(--bg-primary)] group-hover:scale-125 transition-transform shadow-xs" />

                  {/* Timeline Card */}
                  <div
                    onClick={() => expDetail && setSelectedExp(expDetail)}
                    className={`mocha-glass rounded-2xl p-5 sm:p-6 transition-all duration-300 ${
                      expDetail ? 'cursor-pointer hover:border-[var(--glass-border-hover)] hover:scale-[1.01]' : ''
                    }`}
                  >
                    <span className="inline-block font-mono text-xs font-semibold text-[var(--accent-primary)] bg-[var(--accent-soft)] px-2.5 py-0.5 rounded-md mb-2">
                      {item.date}
                    </span>

                    <h4 className="font-heading text-base sm:text-lg font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors">
                      {item.title}
                    </h4>

                    <p className="mt-1.5 text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                      {item.description}
                    </p>

                    {expDetail && (
                      <span className="inline-flex items-center gap-1 font-mono text-[11px] font-semibold text-[var(--accent-primary)] mt-3">
                        <span>Click to view details</span>
                        <Icon name="external-link" size={11} />
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Awards & Recognitions */}
        <div className="lg:col-span-5">
          <h3 className="font-heading text-xl font-bold text-[var(--text-primary)] mb-8 flex items-center gap-2">
            <Icon name="trophy" size={20} className="text-[var(--accent-primary)]" />
            <span>
              {journey.awardsTitle} <span className="text-[var(--accent-primary)]">{journey.awardsTitleAccent}</span>
            </span>
          </h3>

          <div className="space-y-5">
            {journey.awards.map((award) => (
              <div
                key={award.title}
                className="mocha-glass rounded-2xl p-5 sm:p-6 hover:border-[var(--glass-border-hover)] transition-all duration-300 group"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-[var(--accent-primary)] border border-[var(--glass-border)] group-hover:scale-110 transition-transform">
                    <Icon name="trophy" size={18} />
                  </div>
                  <div>
                    <h4 className="font-heading text-sm sm:text-base font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors">
                      {award.title}
                    </h4>
                    <p className="mt-1 text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                      {award.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Experience Details Modal */}
      {selectedExp && (
        <JourneyModal
          isOpen={!!selectedExp}
          period={selectedExp.data.period}
          title={selectedExp.data.title}
          institution={selectedExp.data.institution}
          htmlContent={selectedExp.htmlContent}
          onClose={() => setSelectedExp(null)}
        />
      )}
    </section>
  );
}
