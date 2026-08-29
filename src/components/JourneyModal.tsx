'use client';

import React, { useEffect } from 'react';
import Icon from './Icon';

interface JourneyModalProps {
  isOpen: boolean;
  period: string;
  title: string;
  institution: string;
  htmlContent: string;
  onClose: () => void;
}

export default function JourneyModal({
  isOpen,
  period,
  title,
  institution,
  htmlContent,
  onClose,
}: JourneyModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <button
        type="button"
        className="fixed inset-0 bg-black/60 backdrop-blur-md w-full h-full border-0 cursor-default transition-opacity"
        onClick={onClose}
        aria-label="Close backdrop"
      />

      {/* Modal Dialog */}
      <div
        className="relative w-full max-w-lg transform rounded-2xl mocha-modal p-6 md:p-8 transition-all animate-fade-in max-h-[90vh] overflow-y-auto z-10"
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-lg p-1.5 text-[var(--text-muted)] hover:bg-[var(--accent-soft)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
          aria-label="Close"
        >
          <Icon name="close" size={18} />
        </button>

        <div className="flex flex-col gap-4">
          <div>
            <span className="inline-block font-mono text-xs font-semibold uppercase tracking-wider text-[var(--accent-primary)] bg-[var(--accent-soft)] px-2.5 py-1 rounded-md border border-[var(--glass-border)]">
              {period}
            </span>
            <h4 className="font-heading text-xl font-bold text-[var(--text-primary)] mt-3">
              {title}
            </h4>
            {institution && (
              <p className="text-sm font-semibold text-[var(--text-secondary)] mt-1">
                {institution}
              </p>
            )}
          </div>

          <div className="h-px bg-[var(--glass-border)] my-1" />

          {/* Rendered Markdown Body */}
          <div
            className="markdown-content text-sm leading-relaxed text-[var(--text-secondary)]"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />
        </div>
      </div>
    </div>
  );
}
