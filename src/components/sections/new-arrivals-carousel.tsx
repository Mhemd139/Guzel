'use client';

import React, { useRef, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/products/product-card';
import { getNewArrivals } from '@/lib/products';
import { motion } from 'framer-motion';

export function NewArrivalsCarouselSection() {
  const scrollContainer = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const products = getNewArrivals();
  const t = useTranslations('home');

  const checkScroll = () => {
    if (scrollContainer.current) {
      setCanScrollLeft(scrollContainer.current.scrollLeft > 0);
      setCanScrollRight(
        scrollContainer.current.scrollLeft <
          scrollContainer.current.scrollWidth - scrollContainer.current.clientWidth - 10
      );
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainer.current) {
      const scrollAmount = 400;
      scrollContainer.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
      setTimeout(checkScroll, 300);
    }
  };

  return (
    <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-secondary/30">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mb-12 sm:mb-16 flex items-center justify-between"
        >
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-foreground mb-2">
              {t('new_arrivals_title')}
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground">
              {t('new_arrivals_subtitle')}
            </p>
          </div>

          {/* Navigation Buttons */}
          <div className="hidden sm:flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              aria-label="Scroll left"
              className="rounded-full shadow-soft hover:shadow-soft-lg"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              aria-label="Scroll right"
              className="rounded-full shadow-soft hover:shadow-soft-lg"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </motion.div>

        {/* Carousel */}
        <div
          ref={scrollContainer}
          onScroll={checkScroll}
          className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scroll-smooth hide-scrollbar"
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/4 snap-start"
            >
              <ProductCard
                id={product.id}
                slug={product.slug}
                name={product.name}
                price={product.price}
                originalPrice={product.originalPrice}
                image={product.images[0]}
                secondImage={product.images[1]}
                colors={product.colors}
                sizes={product.sizes}
                isNew={product.isNew}
                badge={product.badge}
              />
            </div>
          ))}
        </div>

        {/* Mobile Navigation */}
        <div className="sm:hidden flex gap-2 justify-center mt-6">
          <Button
            variant="outline"
            size="icon"
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            aria-label="Scroll left"
            className="rounded-full shadow-soft hover:shadow-soft-lg"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            aria-label="Scroll right"
            className="rounded-full shadow-soft hover:shadow-soft-lg"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <style jsx global>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
