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
          {/* Brand Name */}
          <h1 className="text-5xl sm:text-7xl font-serif font-bold text-foreground mb-4 tracking-tight">
            Güzel
          </h1>

          {/* Tagline */}
          <p className="text-lg sm:text-xl text-muted-foreground mb-12 font-light">
            {t('tagline')}
          </p>

          {/* Select Language Heading */}
          <p className="text-xs uppercase tracking-widest text-accent font-semibold mb-6">
            {t('select_language')}
          </p>

          {/* Language Buttons */}
          <div className="flex flex-col gap-4 mb-8">
            {locales.map((locale) => {
              const isRtl = localeDirection[locale] === 'rtl';
              const isSelected = selected === locale;
              return (
                <button
                  key={locale}
                  onClick={() => handleSelect(locale)}
                  dir={isRtl ? 'rtl' : 'ltr'}
                  className={`w-full px-6 py-4 rounded-full border-2 transition-all duration-300 text-lg font-medium shadow-soft
                    ${isRtl ? 'text-right' : 'text-left'}
                    ${
                      isSelected
                        ? 'border-[#AB6432] bg-[#AB6432]/15 text-foreground scale-110 shadow-soft-lg ring-2 ring-[#AB6432]/30'
                        : 'border-[#CBBFB2] text-[#7D6B5E] hover:border-[#AB6432] hover:text-foreground hover:scale-105 hover:shadow-soft-lg hover:bg-[#AB6432]/10 active:bg-[#AB6432]/20 active:scale-100'
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
            className={`w-full py-4 rounded-full font-semibold text-base transition-all duration-300 shadow-soft
              ${
                selected
                  ? 'bg-[#894F2A] text-[#FAF5F0] hover:bg-[#AB6432] active:bg-[#8B5A34] hover:scale-105 hover:shadow-soft-lg cursor-pointer'
                  : 'bg-[#D1C7BD] text-[#7D6B5E] cursor-not-allowed opacity-50'
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
