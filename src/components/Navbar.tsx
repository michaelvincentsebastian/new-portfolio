'use client';

import React, { useState, useEffect } from 'react';
import Icon from './Icon';
import { t } from '@/lib/data/i18n';

interface NavbarProps {
  lang: string;
  isProjectPage?: boolean;
  altHref?: string;
}

export default function Navbar({ lang, isProjectPage = false, altHref }: NavbarProps) {
  const [isDark, setIsDark] = useState(true);
  const [activeSection, setActiveSection] = useState('home');

  const nav = t(lang).nav;
  const otherLang = lang === 'en' ? 'id' : 'en';
  const computedAltHref = altHref || (lang === 'en' ? '/id' : '/en');
  const base = isProjectPage ? `/${lang}` : '';

  const navItems = [
    { id: 'home', label: 'Home', key: 'home' as const },
    { id: 'about', label: 'About', key: 'about' as const },
    { id: 'skills', label: 'Skills', key: 'skills' as const },
    { id: 'projects', label: 'Projects', key: 'projects' as const },
    { id: 'journey', label: 'Journey', key: 'journey' as const },
    { id: 'contact', label: 'Contact', key: 'contact' as const },
  ];

  useEffect(() => {
    if (typeof document !== 'undefined') {
      setIsDark(document.documentElement.classList.contains('dark'));
    }

    if (!isProjectPage) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(entry.target.id);
            }
          });
        },
        {
          root: null,
          rootMargin: '-20% 0px -60% 0px',
          threshold: 0.05,
        }
      );

      const sections = ['home', 'about', 'skills', 'projects', 'journey', 'contact'];
      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
      });

      return () => observer.disconnect();
    }
  }, [isProjectPage]);

  const toggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    if (typeof document !== 'undefined') {
      if (nextDark) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
    }
  };

  return (
    <header className="hidden md:flex justify-between items-center px-8 lg:px-12 py-3.5 w-full fixed top-0 left-0 right-0 z-50 bg-[var(--glass-bg)] backdrop-blur-xl border-b border-[var(--glass-border)] transition-colors duration-300 shadow-sm will-change-transform">
      {/* Logo directly fitted without box or MVSH text */}
      <a href={`${base}#home`} className="flex items-center group py-1" aria-label="Home">
        <img
          src="/favicon.svg"
          alt="Logo"
          className="h-8 w-8 object-contain transition-transform duration-300 ease-out group-hover:scale-110 group-active:scale-95"
        />
      </a>

      {/* Nav Links with Smooth Transitions & Active Indicator */}
      <nav className="flex items-center gap-1 sm:gap-2 px-3 py-1.5 rounded-full border border-[var(--glass-border)] bg-[var(--bg-surface)]/40 backdrop-blur-md shadow-xs">
        {navItems.map((item) => (
          <a
            key={item.id}
            href={`${base}#${item.id}`}
            className={`px-4 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all duration-300 ease-out cursor-pointer hover:scale-105 active:scale-95 ${
              activeSection === item.id
                ? 'bg-[var(--accent-primary)] text-white font-semibold shadow-sm'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--glass-bg-hover)]'
            }`}
          >
            {nav[item.key] || item.label}
          </a>
        ))}
      </nav>

      {/* Controls with Interactive Animation */}
      <div className="flex items-center gap-3">
        {/* Theme Toggle */}
        <button
          type="button"
          onClick={toggleTheme}
          aria-label="Toggle Theme"
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--glass-border)] bg-[var(--bg-surface)]/60 text-[var(--text-secondary)] hover:text-[var(--accent-primary)] hover:border-[var(--glass-border-hover)] hover:bg-[var(--glass-bg-hover)] transition-all duration-300 ease-out cursor-pointer hover:scale-110 active:scale-90"
          title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {isDark ? <Icon name="sun" size={17} /> : <Icon name="moon" size={17} />}
        </button>

        {/* Language Switcher */}
        <a
          href={computedAltHref}
          aria-label="Toggle Language"
          className="flex h-9 px-3 items-center justify-center rounded-xl border border-[var(--glass-border)] bg-[var(--bg-surface)]/60 text-[var(--text-secondary)] hover:text-[var(--accent-primary)] hover:border-[var(--glass-border-hover)] hover:bg-[var(--glass-bg-hover)] font-mono text-xs font-semibold tracking-wider transition-all duration-300 ease-out hover:scale-105 active:scale-95"
        >
          <span className="opacity-40">{lang.toUpperCase()}</span>
          <span className="mx-1 text-[var(--accent-primary)]">/</span>
          <span className="font-bold text-[var(--text-primary)]">{otherLang.toUpperCase()}</span>
        </a>
      </div>
    </header>
  );
}
