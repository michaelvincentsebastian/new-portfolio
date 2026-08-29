'use client';

import React, { useEffect } from 'react';
import Icon from './Icon';

interface LocationModalProps {
  isOpen: boolean;
  title: string;
  detail: string;
  onClose: () => void;
}

export default function LocationModal({ isOpen, title, detail, onClose }: LocationModalProps) {
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

      {/* Modal Content */}
      <div
        className="relative w-full max-w-md transform rounded-2xl mocha-modal p-6 md:p-8 transition-all animate-fade-in z-10"
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

        <div className="flex flex-col items-center text-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--accent-soft)] text-[var(--accent-primary)] border border-[var(--glass-border)]">
            <Icon name="map-pin" size={26} />
          </div>
          <div>
            <h4 className="font-heading text-lg font-bold text-[var(--text-primary)]">{title}</h4>
            <p className="mt-2.5 text-sm text-[var(--text-secondary)] leading-relaxed">
              {detail}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
