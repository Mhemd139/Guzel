'use client';

import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { locales, localeNames, localeDirection, type Locale } from '@/i18n/config';

function getCookie(name: string): string | undefined {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? match[2] : undefined;
}

export function LanguageGate({ children }: { children: React.ReactNode }) {
  const t = useTranslations('language_gate');
  const [showGate, setShowGate] = useState<boolean | null>(null);
  const [selected, setSelected] = useState<Locale | null>(null);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const locale = getCookie('GUZEL_LOCALE');
    if (locale && locales.includes(locale as Locale)) {
      setShowGate(false);
    } else {
      setShowGate(true);
    }
  }, []);

  const handleSelect = (locale: Locale) => {
    setSelected(locale);
  };

  const handleContinue = () => {
    if (!selected) return;
    setFadeOut(true);
    setTimeout(() => {
      document.cookie = `GUZEL_LOCALE=${selected};path=/;max-age=31536000;SameSite=Lax`;
      window.location.reload();
    }, 400);
  };

  // Still checking cookie
  if (showGate === null) {
    return null;
  }

  // Cookie exists, skip gate
  if (!showGate) {
    return <>{children}</>;
  }

  return (
    <>
      {/* Gate overlay */}
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center bg-background transition-opacity duration-400 ${
          fadeOut ? 'opacity-0' : 'opacity-100 animate-in fade-in duration-500'
        }`}
      >
        <div className="text-center px-6 max-w-md w-full">
          {/* Brand Name */}
          <h1 className="text-5xl sm:text-6xl font-serif font-bold text-foreground mb-3 tracking-tight">
            Guzel
          </h1>

          {/* Tagline */}
          <p className="text-sm sm:text-base text-muted-foreground mb-12">
            {t('tagline')}
          </p>

          {/* Select Language Heading */}
          <p className="text-xs uppercase tracking-widest text-accent font-semibold mb-6">
            {t('select_language')}
          </p>

          {/* Language Buttons */}
          <div className="flex flex-col gap-3 mb-8">
            {locales.map((locale) => {
              const isRtl = localeDirection[locale] === 'rtl';
              const isSelected = selected === locale;
              return (
                <button
                  key={locale}
                  onClick={() => handleSelect(locale)}
                  dir={isRtl ? 'rtl' : 'ltr'}
                  className={`w-full px-6 py-4 rounded-lg border-2 transition-all duration-200 text-lg font-medium
                    ${isRtl ? 'text-right' : 'text-left'}
                    ${
                      isSelected
                        ? 'border-primary bg-primary/5 text-foreground scale-[1.02]'
                        : 'border-border text-muted-foreground hover:border-primary/50 hover:text-foreground hover:scale-[1.01]'
                    }
                  `}
                >
                  {localeNames[locale]}
                </button>
              );
            })}
          </div>

          {/* Continue Button */}
          <button
            onClick={handleContinue}
            disabled={!selected}
            className={`w-full py-3.5 rounded-lg font-semibold text-base transition-all duration-200
              ${
                selected
                  ? 'bg-primary text-primary-foreground hover:bg-primary/90 cursor-pointer'
                  : 'bg-muted text-muted-foreground cursor-not-allowed'
              }
            `}
          >
            {t('continue')}
          </button>
        </div>
      </div>

      {/* Hidden children for SEO */}
      <div className="hidden">{children}</div>
    </>
  );
}
