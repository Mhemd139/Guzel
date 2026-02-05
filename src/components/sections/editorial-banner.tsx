'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';

export function EditorialBannerSection() {
  const t = useTranslations('home');

  return (
    <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Image */}
          <div className="order-2 lg:order-1 relative h-80 sm:h-96 lg:h-full min-h-96 rounded-lg overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1467043237213-65f2da53396f?w=800&q=80"
              alt="Guzel Editorial Collection"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2 space-y-6 lg:space-y-8">
            <div className="space-y-4">
              <p className="text-sm font-sans uppercase tracking-widest text-accent font-semibold">
                {t('editorial_label')}
              </p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-foreground">
                {t('editorial_title')}
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                {t('editorial_text')}
              </p>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <p className="text-2xl sm:text-3xl font-serif font-bold text-foreground">{t('editorial_products')}</p>
                  <p className="text-sm text-muted-foreground">{t('editorial_products_label')}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-2xl sm:text-3xl font-serif font-bold text-foreground">{t('editorial_customers')}</p>
                  <p className="text-sm text-muted-foreground">{t('editorial_customers_label')}</p>
                </div>
              </div>
            </div>

            <Link href="/about">
              <Button size="lg" className="w-full sm:w-auto">
                {t('learn_more')}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
