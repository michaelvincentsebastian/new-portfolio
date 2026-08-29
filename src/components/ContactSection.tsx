'use client';

import React, { useState } from 'react';
import Icon from './Icon';
import { t } from '@/lib/data/i18n';

interface ContactSectionProps {
  lang: string;
}

export default function ContactSection({ lang }: ContactSectionProps) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    email: '',
    subject: '',
    message: '',
  });

  const contact = t(lang).contact;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY || 'a4d01be2-4313-4364-bd0a-2d15dc7398eb',
          ...formData,
        }),
      });

      const result = await response.json();
      if (result.success) {
        setStatus('success');
        setFormData({ email: '', subject: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-20 md:py-28 border-t border-[var(--glass-border)]">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
          {contact.title} <span className="text-[var(--accent-primary)]">{contact.titleAccent}</span>
        </h2>
        <p className="mt-4 text-base sm:text-lg text-[var(--text-secondary)]">
          {contact.description}
        </p>
        <div className="h-1 w-14 bg-[var(--accent-primary)] rounded-full mx-auto mt-4" />
      </div>

      {/* Centered Message Card */}
      <div className="max-w-2xl mx-auto mocha-glass rounded-3xl p-6 sm:p-10 md:p-12 relative overflow-hidden">
        <h3 className="font-heading text-xl font-bold text-[var(--text-primary)] mb-6 text-center">
          {contact.sendMessage}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="block font-mono text-xs font-semibold text-[var(--text-muted)] mb-2"
            >
              {contact.emailLabel}
            </label>
            <input
              id="email"
              type="email"
              required
              placeholder={contact.emailPlaceholder}
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-[var(--bg-surface)] border border-[var(--glass-border)] focus:border-[var(--accent-primary)] focus:outline-hidden text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] transition-colors"
            />
          </div>

          <div>
            <label
              htmlFor="subject"
              className="block font-mono text-xs font-semibold text-[var(--text-muted)] mb-2"
            >
              {contact.subjectLabel}
            </label>
            <input
              id="subject"
              type="text"
              required
              placeholder={contact.subjectPlaceholder}
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-[var(--bg-surface)] border border-[var(--glass-border)] focus:border-[var(--accent-primary)] focus:outline-hidden text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] transition-colors"
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className="block font-mono text-xs font-semibold text-[var(--text-muted)] mb-2"
            >
              {contact.messageLabel}
            </label>
            <textarea
              id="message"
              required
              rows={5}
              placeholder={contact.messagePlaceholder}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-[var(--bg-surface)] border border-[var(--glass-border)] focus:border-[var(--accent-primary)] focus:outline-hidden text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] transition-colors resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={status === 'sending'}
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--accent-primary)] hover:bg-[var(--accent-primary-hover)] text-white px-6 py-3.5 text-sm font-semibold font-heading transition-all shadow-sm hover:scale-[1.01] cursor-pointer disabled:opacity-50"
          >
            <Icon name="mail" size={16} />
            <span>{status === 'sending' ? contact.sending : contact.sendBtn}</span>
          </button>

          {status === 'success' && (
            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs sm:text-sm font-medium animate-fade-in text-center">
              {contact.successMsg}
            </div>
          )}

          {status === 'error' && (
            <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs sm:text-sm font-medium animate-fade-in text-center">
              {contact.errorMsg}
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
