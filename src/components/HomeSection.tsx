'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import Icon from './Icon';
import { t } from '@/lib/data/i18n';
import { socialLinks } from '@/lib/data/site';

const LocationModal = dynamic(() => import('./LocationModal'), {
  ssr: false,
});

interface HomeSectionProps {
  lang: string;
}

export default function HomeSection({ lang }: HomeSectionProps) {
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const home = t(lang).home;

  return (
    <section id="home" className="min-h-[80vh] flex items-center justify-center py-16 md:py-24">
      <div className="w-full max-w-3xl mx-auto text-center flex flex-col items-center justify-center space-y-6">
        {/* Greeting & Name */}
        <div>
          <p className="font-mono text-sm sm:text-base font-semibold text-[var(--accent-primary)] mb-2 tracking-wide">
            {home.greeting}
          </p>
          <h1 className="font-heading font-extrabold text-4xl sm:text-5xl md:text-6xl text-[var(--accent-primary)] text-glow tracking-tight text-balance">
            {home.name}
          </h1>
        </div>

        {/* Position & Location Badges */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <span className="inline-flex items-center gap-2 rounded-full border border-[var(--glass-border)] bg-[var(--accent-soft)] px-3.5 py-1.5 font-mono text-xs font-semibold text-[var(--accent-badge-text)] shadow-xs">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>{home.position}</span>
          </span>

          <button
            type="button"
            onClick={() => setIsLocationModalOpen(true)}
            className="inline-flex items-center gap-1.5 rounded-full border border-[var(--glass-border)] bg-[var(--bg-surface)] px-3.5 py-1.5 font-mono text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--accent-primary)] hover:border-[var(--glass-border-hover)] transition-all duration-300 ease-out cursor-pointer hover:scale-105 active:scale-95"
          >
            <Icon name="map-pin" size={13} />
            <span>{home.locationLabel}</span>
          </button>
        </div>

        {/* Bio Description */}
        <p
          className="text-base sm:text-lg leading-relaxed text-[var(--text-secondary)] font-normal text-pretty max-w-2xl mx-auto"
          dangerouslySetInnerHTML={{ __html: home.description }}
        />

        {/* CTA Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-[var(--accent-primary)] hover:bg-[var(--accent-primary-hover)] text-white px-6 py-3 text-xs sm:text-sm font-semibold font-heading transition-all duration-300 ease-out shadow-sm hover:scale-105 active:scale-95 cursor-pointer"
          >
            <Icon name="download" size={16} />
            <span>{home.resumeBtn}</span>
          </a>

          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-xl border border-[var(--glass-border)] bg-[var(--bg-surface)] hover:bg-[var(--glass-bg-hover)] text-[var(--text-primary)] hover:text-[var(--accent-primary)] px-6 py-3 text-xs sm:text-sm font-semibold font-heading transition-all duration-300 ease-out hover:scale-105 active:scale-95 cursor-pointer"
          >
            <Icon name="mail" size={16} />
            <span>{home.contactBtn}</span>
          </a>
        </div>

        {/* Social Links */}
        <div className="flex items-center justify-center gap-3 pt-4">
          <span className="font-mono text-xs text-[var(--text-muted)] uppercase tracking-wider mr-2">
            Connect:
          </span>
          {socialLinks.map((item) => (
            <a
              key={item.name}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={item.name}
              title={item.name}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--glass-border)] bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-[var(--accent-primary)] hover:border-[var(--glass-border-hover)] hover:bg-[var(--glass-bg-hover)] transition-all duration-300 ease-out hover:scale-110 active:scale-90"
            >
              <Icon name={item.icon} size={17} />
            </a>
          ))}
        </div>
      </div>

      {/* Location Modal */}
      {isLocationModalOpen && (
        <LocationModal
          isOpen={isLocationModalOpen}
          title={home.locationTitle}
          detail={home.locationDetail}
          onClose={() => setIsLocationModalOpen(false)}
        />
      )}
    </section>
  );
}
