import React from 'react';
import { t } from '@/lib/data/i18n';
import { siteConfig } from '@/lib/data/site';

interface FooterProps {
  lang: string;
}

export default function Footer({ lang }: FooterProps) {
  const footer = t(lang).footer;
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full py-10 md:py-14 border-t border-[var(--glass-border)] mt-16 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div className="flex items-center gap-2.5">
          <img src="/favicon.svg" alt="Logo" className="h-6 w-6 object-contain" />
          <span className="font-heading font-bold text-xs tracking-wider text-[var(--text-primary)]">
            {siteConfig.name}
          </span>
        </div>

        <p className="font-mono text-xs text-[var(--text-muted)]">
          &copy; {currentYear} {siteConfig.name}. {footer.rights}
        </p>
      </div>
    </footer>
  );
}
