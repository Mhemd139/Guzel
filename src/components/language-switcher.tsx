'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Globe } from 'lucide-react';
import { locales, localeNames, type Locale } from '@/i18n/config';

function getCurrentLocale(): Locale {
  if (typeof document === 'undefined') return 'en';
  const match = document.cookie.match(/(^| )Güzel_LOCALE=([^;]+)/);
  return (match ? match[2] : 'en') as Locale;
}

export function LanguageSwitcher({ variant = 'header' }: { variant?: 'header' | 'footer' }) {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState<Locale>('en');
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCurrent(getCurrentLocale());
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSwitch = (locale: Locale) => {
    document.cookie = `Güzel_LOCALE=${locale};path=/;max-age=31536000;SameSite=Lax`;
    window.location.reload();
  };

  if (variant === 'footer') {
    return (
      <div ref={ref} className="relative inline-block">
        <button
          onClick={() => setOpen(!open)}
          className={`flex items-center gap-2 text-xs transition-all duration-300 rounded-full px-3 py-1.5 ${
            open
              ? 'text-foreground bg-primary/10 scale-105 shadow-soft'
              : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50 hover:scale-105'
          }`}
        >
          <Globe className="w-4 h-4" />
          <span>{localeNames[current]}</span>
        </button>
        {open && (
          <div className="absolute bottom-full mb-2 start-0 bg-background border border-border rounded-2xl shadow-soft-lg py-2 min-w-[160px] z-50 overflow-hidden">
            {locales.map((locale) => (
              <button
                key={locale}
                onClick={() => handleSwitch(locale)}
                className={`w-full px-4 py-2.5 text-start text-sm transition-all duration-300 ${
                  locale === current
                    ? 'text-foreground font-semibold bg-primary/10 border-l-4 border-primary'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50 hover:scale-105 hover:pl-5'
                }`}
              >
                {localeNames[locale]}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={`p-2.5 rounded-full transition-all duration-300 shadow-soft ${
          open
            ? 'bg-primary/10 text-primary scale-110 shadow-soft-lg ring-2 ring-primary/30'
            : 'hover:bg-secondary hover:scale-105 hover:shadow-soft-lg'
        }`}
        aria-label="Change language"
      >
        <Globe className="w-5 h-5" />
      </button>
      {open && (
        <div className="absolute top-full mt-2 end-0 bg-background border border-border rounded-2xl shadow-soft-lg py-2 min-w-[160px] z-50 overflow-hidden">
          {locales.map((locale) => (
            <button
              key={locale}
              onClick={() => handleSwitch(locale)}
              className={`w-full px-4 py-2.5 text-start text-sm transition-all duration-300 ${
                locale === current
                  ? 'text-foreground font-semibold bg-primary/10 border-l-4 border-primary'
                  : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50 hover:scale-105 hover:pl-5'
              }`}
            >
              {localeNames[locale]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
