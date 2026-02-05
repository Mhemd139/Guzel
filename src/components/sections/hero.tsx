'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { motion, useScroll, useTransform } from 'framer-motion';

export function HeroSection() {
  const t = useTranslations('home');
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);

  return (
    <section className="relative w-full h-screen min-h-96 overflow-hidden">
      {/* Background Image with Parallax */}
      <motion.div style={{ y }} className="absolute inset-0 w-full h-full">
        <Image
          src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1920&q=80"
          alt="Guzel Hero - Elegant Woman in Fashion"
          fill
          className="object-cover brightness-105 saturate-110"
          priority
          quality={85}
        />
      </motion.div>

      {/* Soft Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/40" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center max-w-2xl mx-auto space-y-6 sm:space-y-8"
        >
          {/* Tagline */}
          <div className="space-y-2">
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-sm sm:text-base font-sans uppercase tracking-widest text-white/90"
            >
              {t('hero_tagline')}
            </motion.p>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-white drop-shadow-lg"
            >
              {t('hero_title')}
            </motion.h1>
          </div>

          {/* Subtitle */}
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-base sm:text-lg text-white/80 drop-shadow-md max-w-lg mx-auto"
          >
            {t('hero_subtitle')}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center pt-4"
          >
            <Link href="/shop">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-white hover:bg-white/95 text-foreground font-semibold shadow-soft-lg hover:shadow-[0_8px_30px_rgba(255,255,255,0.3)] hover:scale-105 transition-all duration-300"
              >
                {t('explore_collection')}
              </Button>
            </Link>
            <Link href="/shop?filter=new">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-white hover:bg-white/95 text-foreground font-semibold shadow-soft-lg hover:shadow-[0_8px_30px_rgba(255,255,255,0.3)] hover:scale-105 transition-all duration-300"
              >
                {t('new_arrivals')}
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 start-1/2 -translate-x-1/2 animate-bounce"
      >
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </motion.div>
    </section>
  );
}
