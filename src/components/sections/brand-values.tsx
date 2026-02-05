'use client';

import React from 'react';
import { Leaf, Sparkles, Heart, Globe } from 'lucide-react';
import { useTranslations } from 'next-intl';

export function BrandValuesSection() {
  const t = useTranslations('home');

  const values = [
    {
      id: '1',
      icon: <Leaf className="w-8 h-8" />,
      titleKey: 'value_sustainable_title',
      descKey: 'value_sustainable_desc',
    },
    {
      id: '2',
      icon: <Sparkles className="w-8 h-8" />,
      titleKey: 'value_quality_title',
      descKey: 'value_quality_desc',
    },
    {
      id: '3',
      icon: <Heart className="w-8 h-8" />,
      titleKey: 'value_timeless_title',
      descKey: 'value_timeless_desc',
    },
    {
      id: '4',
      icon: <Globe className="w-8 h-8" />,
      titleKey: 'value_global_title',
      descKey: 'value_global_desc',
    },
  ];

  return (
    <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-12 sm:mb-16 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">
            {t('values_title')}
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('values_subtitle')}
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value) => (
            <div key={value.id} className="text-center space-y-4 group cursor-pointer">
              {/* Icon */}
              <div className="flex justify-center">
                <div className="p-4 bg-secondary rounded-lg text-accent group-hover:bg-accent group-hover:text-accent-foreground transition-colors duration-300">
                  {value.icon}
                </div>
              </div>

              {/* Title */}
              <h3 className="text-lg sm:text-xl font-serif font-bold text-foreground">
                {t(value.titleKey)}
              </h3>

              {/* Description */}
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                {t(value.descKey)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
