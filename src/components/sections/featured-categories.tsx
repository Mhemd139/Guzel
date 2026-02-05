'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mb-12 sm:mb-16 text-center"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">
            {t('categories_title')}
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('categories_subtitle')}
          </p>
        </motion.div>

        {/* Categories Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
        >
          {categories.map((category) => (
            <motion.div key={category.id} variants={itemVariants}>
              <Link href={category.href}>
                <div className="group cursor-pointer rounded-2xl overflow-hidden h-80 sm:h-96 relative shadow-soft hover:shadow-soft-lg transition-all duration-500 hover:-translate-y-1">
                  {/* Image */}
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105 brightness-105 saturate-110"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-black/50 group-hover:from-black/20 group-hover:via-black/30 group-hover:to-black/60 transition-all duration-500" />

                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white drop-shadow-lg mb-4 transition-transform duration-500 group-hover:-translate-y-2">
                      {category.name}
                    </h3>
                    <div className="flex items-center gap-2 text-white opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                      <span className="text-sm font-medium">{t('categories_shop')}</span>
                      <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
