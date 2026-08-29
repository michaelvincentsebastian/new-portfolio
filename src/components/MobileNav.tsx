'use client';

import React, { useState, useEffect } from 'react';
import Icon from './Icon';

interface MobileNavProps {
  lang: string;
  isProjectPage?: boolean;
  altHref?: string;
}

export default function MobileNav({ lang, isProjectPage = false, altHref }: MobileNavProps) {
  const [isDark, setIsDark] = useState(true);
  const [activeSection, setActiveSection] = useState('home');

  const otherLang = lang === 'en' ? 'id' : 'en';
  const computedAltHref = altHref || (lang === 'en' ? '/id' : '/en');
  const base = isProjectPage ? `/${lang}` : '';

  const mobileItems = [
    { id: 'home', icon: 'home', label: 'Home' },
    { id: 'about', icon: 'user', label: 'About' },
    { id: 'skills', icon: 'sliders', label: 'Skills' },
    { id: 'projects', icon: 'code', label: 'Work' },
    { id: 'contact', icon: 'mail', label: 'Contact' },
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
    <>
      {/* Mobile Top Header with Direct Fitted Logo, Theme & Language Toggle */}
      <div className="flex md:hidden justify-between items-center px-4 py-2.5 fixed top-0 left-0 right-0 z-50 bg-[var(--glass-bg)] backdrop-blur-md border-b border-[var(--glass-border)] transition-colors duration-300">
        <a href={`${base}#home`} className="flex items-center group py-0.5" aria-label="Home">
          <img
            src="/favicon.svg"
            alt="Logo"
            className="h-7 w-7 object-contain transition-transform duration-300 ease-out group-hover:scale-110 group-active:scale-95"
          />
        </a>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className="flex h-8 w-8 items-center justify-center rounded-xl border border-[var(--glass-border)] bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-all duration-300 ease-out cursor-pointer hover:scale-110 active:scale-90"
          >
            {isDark ? <Icon name="sun" size={15} /> : <Icon name="moon" size={15} />}
          </button>

          <a
            href={computedAltHref}
            aria-label="Toggle Language"
            className="flex h-8 px-2.5 items-center justify-center rounded-xl border border-[var(--glass-border)] bg-[var(--bg-surface)] text-[var(--text-secondary)] font-mono text-[11px] font-bold tracking-wider hover:text-[var(--accent-primary)] transition-all duration-300 ease-out hover:scale-105 active:scale-95"
          >
            {otherLang.toUpperCase()}
          </a>
        </div>
      </div>

      {/* Mobile Bottom Glass Pill Navigation with Smooth Micro-interactions */}
      <nav className="fixed bottom-5 left-0 right-0 mx-auto w-[min(380px,92%)] z-50 flex justify-around items-center px-2 py-1.5 md:hidden bg-[var(--glass-bg)] backdrop-blur-xl border border-[var(--glass-border)] rounded-full shadow-lg transition-colors duration-300">
        {mobileItems.map((item) => (
          <a
            key={item.id}
            href={`${base}#${item.id}`}
            className={`flex flex-col items-center justify-center py-2 px-3.5 rounded-full font-mono text-[10px] transition-all duration-300 ease-out cursor-pointer active:scale-90 ${
              activeSection === item.id
                ? 'bg-[var(--accent-primary)] text-white font-bold scale-105 shadow-sm'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--glass-bg-hover)]'
            }`}
            aria-label={item.label}
          >
            <Icon name={item.icon} size={18} />
            <span className="mt-0.5">{item.label}</span>
          </a>
        ))}
      </nav>
    </>
  );
}
