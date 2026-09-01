'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { t } from '@/lib/data/i18n';

interface AboutSectionProps {
  lang: string;
}

export default function AboutSection({ lang }: AboutSectionProps) {
  const [activeTab, setActiveTab] = useState(0);
  const about = t(lang).about;

  return (
    <section id="about" className="py-20 md:py-28 border-t border-[var(--glass-border)] section-optimize">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
          {about.title} <span className="text-[var(--accent-primary)]">{about.titleAccent}</span>
        </h2>
        <div className="h-1 w-14 bg-[var(--accent-primary)] rounded-full mx-auto mt-4" />
      </div>

      {/* Grid: Left Portrait + Right Tabbed Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Portrait & Badge */}
        <div className="lg:col-span-4 flex flex-col items-center">
          <div className="relative w-full max-w-xs">
            <div className="relative rounded-3xl mocha-glass p-4 overflow-hidden group">
              <div className="aspect-square w-full rounded-2xl overflow-hidden bg-[var(--bg-surface-elevated)] relative">
                <Image
                  src="/images/profile-picture.webp"
                  alt="Michael Vincent"
                  width={320}
                  height={320}
                  sizes="(max-width: 768px) 280px, 320px"
                  className="w-full h-full object-cover grayscale contrast-105 group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                />
              </div>

              <div className="mt-4 text-center">
                <h3 className="font-heading text-base font-bold text-[var(--text-primary)]">
                  Michael Vincent Sebastian Handojo
                </h3>
                <p className="font-mono text-xs text-[var(--accent-primary)] mt-1 font-semibold">
                  BINUS Online &bull; Computer Science
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Tabbed Content Container */}
        <div className="lg:col-span-8">
          <div className="mocha-glass rounded-3xl p-6 sm:p-8 md:p-10 relative overflow-hidden">
            {/* Tab Navigation Buttons */}
            <div className="flex flex-wrap gap-2 sm:gap-3 border-b border-[var(--glass-border)] pb-4 mb-6">
              {about.tabLabels.map((label, index) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => setActiveTab(index)}
                  className={`px-4 py-2 rounded-xl font-mono text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                    activeTab === index
                      ? 'bg-[var(--accent-soft)] text-[var(--accent-primary)] border border-[var(--glass-border)] shadow-xs scale-102'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--glass-bg)] border border-transparent'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Active Tab Paragraph */}
            <div className="min-h-[160px] flex items-center">
              <p className="text-base sm:text-lg leading-relaxed text-[var(--text-secondary)] font-normal animate-fade-in">
                {about.paragraphs[activeTab]}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
