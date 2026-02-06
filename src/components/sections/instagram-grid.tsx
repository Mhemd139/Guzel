'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Instagram } from 'lucide-react';
import { motion } from 'framer-motion';

interface InstagramPost {
  id: string;
  image: string;
  alt: string;
}

const instagramPosts: InstagramPost[] = [
  {
    id: '1',
    image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&q=80',
    alt: 'Güzel Style - Look 1',
  },
  {
    id: '2',
    image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=400&q=80',
    alt: 'Güzel Style - Look 2',
  },
  {
    id: '3',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400&q=80',
    alt: 'Güzel Style - Look 3',
  },
  {
    id: '4',
    image: 'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=400&q=80',
    alt: 'Güzel Style - Look 4',
  },
  {
    id: '5',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&q=80',
    alt: 'Güzel Style - Look 5',
  },
  {
    id: '6',
    image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=400&q=80',
    alt: 'Güzel Style - Look 6',
  },
];

export function InstagramGridSection() {
  const t = useTranslations('home');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
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
          <div className="flex items-center justify-center gap-3 mb-4">
            <Instagram className="w-6 h-6 text-accent" />
            <p className="text-sm font-sans uppercase tracking-widest font-semibold text-accent">
              {t('instagram_follow')}
            </p>
          </div>
          <Link href="https://www.instagram.com/guzel_tayibe?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-foreground hover:text-accent transition-colors duration-300 mb-4">
              {t('instagram_handle')}
            </h2>
          </Link>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('instagram_text')}
          </p>
        </motion.div>

        {/* Instagram Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 mb-8"
        >
          {instagramPosts.map((post) => (
            <motion.div key={post.id} variants={itemVariants}>
              <Link
                href="https://www.instagram.com/guzel_tayibe?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                target="_blank"
                rel="noopener noreferrer"
                className="group relative aspect-square rounded-2xl overflow-hidden bg-muted shadow-soft hover:shadow-soft-lg transition-all duration-500 block"
              >
                <Image
                  src={post.image}
                  alt={post.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105 brightness-105 saturate-110"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/30 to-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                  <Instagram className="w-8 h-8 text-white" />
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <div className="text-center">
          <Link href="https://www.instagram.com/guzel_tayibe?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer">
            <p className="inline-flex items-center gap-2 text-accent hover:text-accent/80 transition-colors duration-200 font-medium">
              {t('instagram_cta')}
              <svg className="w-4 h-4 rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </p>
          </Link>
        </div>
      </div>
    </section>
  );
}
