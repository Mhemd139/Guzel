'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useWishlist } from '@/lib/contexts/wishlist-context';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { QuickViewModal } from '@/components/products/quick-view-modal';
import { getProductBySlug } from '@/lib/products';

interface ProductCardProps {
  id: string;
  slug: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  secondImage?: string;
  colors?: { name: string; hex: string }[];
  sizes?: string[];
  isNew?: boolean;
  badge?: string;
}

export function ProductCard({
  id,
  slug,
  name,
  price,
  originalPrice,
  image,
  secondImage,
  colors = [],
  sizes = [],
  isNew,
  badge,
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [showQuickView, setShowQuickView] = useState(false);
  const { toggleItem, isInWishlist } = useWishlist();
  const inWishlist = isInWishlist(id);
  const t = useTranslations('product');

  const product = getProductBySlug(slug);

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleItem({
      productId: id,
      slug,
      name,
      price: Math.round(price * 100),
      originalPrice: originalPrice ? Math.round(originalPrice * 100) : undefined,
      image,
      colors,
      sizes,
      addedAt: new Date().toISOString(),
    });
  };

  return (
    <Link href={`/shop/${slug}`}>
      <div className="group cursor-pointer transition-all duration-300 hover:-translate-y-2">
        {/* Image Container */}
        <div
          className="relative bg-secondary rounded-2xl overflow-hidden mb-4 shadow-soft group-hover:shadow-soft-lg transition-all duration-300"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Main Image */}
          <div className="relative h-80 sm:h-96 overflow-hidden bg-muted">
            <Image
              src={image}
              alt={name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>

          {/* Second Image Overlay */}
          {secondImage && (
            <div
              className={`absolute inset-0 transition-opacity duration-500 ${
                isHovered ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <Image
                src={secondImage}
                alt={`${name} alternate view`}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>
          )}

          {/* Badge */}
          {badge && (
            <div className="absolute top-4 start-4">
              <Badge variant="default" className="bg-accent text-accent-foreground rounded-full shadow-soft">
                {badge}
              </Badge>
            </div>
          )}

          {/* Wishlist Heart */}
          <button
            onClick={handleWishlistToggle}
            className="absolute top-4 end-4 p-2.5 bg-white/90 backdrop-blur-sm rounded-full shadow-soft hover:shadow-soft-lg transition-all duration-300 hover:scale-110 z-10"
            aria-label={inWishlist ? t('remove_from_wishlist') : t('add_to_wishlist')}
          >
            <Heart
              className={`w-5 h-5 transition-colors duration-200 ${
                inWishlist
                  ? 'fill-red-500 stroke-red-500'
                  : 'stroke-foreground hover:stroke-red-500'
              }`}
            />
          </button>

          {/* Quick View Overlay */}
          <div
            className={`absolute inset-0 bg-gradient-to-t from-black/50 via-black/30 to-transparent flex items-center justify-center transition-opacity duration-300 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Button
              variant="secondary"
              className="font-medium bg-white/95 backdrop-blur-sm hover:bg-white"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setShowQuickView(true);
              }}
            >
              {t('quick_view')}
            </Button>
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-2">
          {/* Product Name */}
          <h3 className="text-sm sm:text-base font-medium text-foreground group-hover:text-primary transition-colors duration-300 line-clamp-2">
            {name}
          </h3>

          {/* Price */}
          <p className="text-base sm:text-lg font-semibold text-foreground">
            ${price.toFixed(2)}
          </p>

          {/* Color Swatches */}
          {colors.length > 0 && (
            <div className="flex gap-2 pt-1">
              {colors.slice(0, 4).map((color) => (
                <button
                  key={color.hex}
                  className="w-6 h-6 rounded-full border-2 border-border hover:border-primary transition-all duration-300 hover:scale-110 flex-shrink-0 shadow-soft"
                  style={{ backgroundColor: color.hex }}
                  aria-label={`Color: ${color.name}`}
                  title={color.name}
                />
              ))}
              {colors.length > 4 && (
                <span className="text-xs text-muted-foreground self-center">
                  +{colors.length - 4}
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Quick View Modal */}
      <QuickViewModal
        product={product}
        isOpen={showQuickView}
        onClose={() => setShowQuickView(false)}
      />
    </Link>
  );
}
