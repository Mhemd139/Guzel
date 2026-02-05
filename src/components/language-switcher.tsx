'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Globe } from 'lucide-react';
import { locales, localeNames, type Locale } from '@/i18n/config';

function getCurrentLocale(): Locale {
  if (typeof document === 'undefined') return 'en';
  const match = document.cookie.match(/(^| )GUZEL_LOCALE=([^;]+)/);
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
    document.cookie = `GUZEL_LOCALE=${locale};path=/;max-age=31536000;SameSite=Lax`;
    window.location.reload();
  };

  if (variant === 'footer') {
    return (
      <div ref={ref} className="relative inline-block">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <Globe className="w-4 h-4" />
          <span>{localeNames[current]}</span>
        </button>
        {open && (
          <div className="absolute bottom-full mb-2 start-0 bg-background border border-border rounded-lg shadow-lg py-1 min-w-[140px] z-50">
            {locales.map((locale) => (
              <button
                key={locale}
                onClick={() => handleSwitch(locale)}
                className={`w-full px-4 py-2 text-start text-sm transition-colors ${
                  locale === current
                    ? 'text-foreground font-medium bg-secondary'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
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
        className="p-2 hover:bg-secondary rounded-lg transition-colors"
        aria-label="Change language"
      >
        <Globe className="w-5 h-5" />
      </button>
      {open && (
        <div className="absolute top-full mt-2 end-0 bg-background border border-border rounded-lg shadow-lg py-1 min-w-[140px] z-50">
          {locales.map((locale) => (
            <button
              key={locale}
              onClick={() => handleSwitch(locale)}
              className={`w-full px-4 py-2 text-start text-sm transition-colors ${
                locale === current
                  ? 'text-foreground font-medium bg-secondary'
                  : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
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
