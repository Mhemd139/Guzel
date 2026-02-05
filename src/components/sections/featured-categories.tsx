'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface Category {
  id: string;
  name: string;
  image: string;
  href: string;
}

const categories: Category[] = [
  {
    id: '1',
    name: 'Dresses',
    image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=80',
    href: '/shop?category=Dresses',
  },
  {
    id: '2',
    name: 'Outerwear',
    image: 'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?w=800&q=80',
    href: '/shop?category=Outerwear',
  },
  {
    id: '3',
    name: 'Accessories',
    image: 'https://images.unsplash.com/photo-1523779105320-d1cd346ff52b?w=800&q=80',
    href: '/shop?category=Accessories',
  },
];

export function FeaturedCategoriesSection() {
  const t = useTranslations('home');

  return (
    <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-12 sm:mb-16 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">
            {t('categories_title')}
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('categories_subtitle')}
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {categories.map((category) => (
            <Link key={category.id} href={category.href}>
              <div className="group cursor-pointer rounded-lg overflow-hidden h-80 sm:h-96 relative">
                {/* Image */}
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white drop-shadow-lg mb-4 transition-transform duration-300 group-hover:-translate-y-2">
                    {category.name}
                  </h3>
                  <div className="flex items-center gap-2 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <span className="text-sm font-medium">{t('categories_shop')}</span>
                    <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
