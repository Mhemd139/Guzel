'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, Heart, Minus, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useCart } from '@/lib/contexts/cart-context';
import { useWishlist } from '@/lib/contexts/wishlist-context';
import { useToast } from '@/components/ui/toast-provider';
import { formatPrice } from '@/lib/commerce/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface Product {
  id: string;
  slug: string;
  name: string;
  price: number;
  originalPrice?: number;
  images: string[];
  colors: Array<{ name: string; hex: string }>;
  sizes: string[];
  description: string;
  badge?: string;
  rating: number;
  reviewCount: number;
}

interface QuickViewModalProps {
  product: Product | null | undefined;
  isOpen: boolean;
  onClose: () => void;
}

export function QuickViewModal({ product, isOpen, onClose }: QuickViewModalProps) {
  const { addItem } = useCart();
  const { toggleItem, isInWishlist } = useWishlist();
  const { addToast } = useToast();
  const t = useTranslations('product');
  const tCommerce = useTranslations('commerce');

  const [selectedColor, setSelectedColor] = useState(product?.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product?.sizes[0]);
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Reset state when product changes
  React.useEffect(() => {
    if (product) {
      setSelectedColor(product.colors[0]);
      setSelectedSize(product.sizes[0]);
      setQuantity(1);
      setCurrentImageIndex(0);
    }
  }, [product]);

  if (!product) return null;

  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = () => {
    if (selectedColor && selectedSize) {
      addItem({
        productId: product.id,
        slug: product.slug,
        name: product.name,
        price: Math.round(product.price * 100),
        originalPrice: product.originalPrice ? Math.round(product.originalPrice * 100) : undefined,
        image: product.images[0],
        color: selectedColor,
        size: selectedSize,
        quantity,
      });
      addToast({
        message: tCommerce('added_to_cart_toast', { name: product.name }),
        type: 'success',
        image: product.images[0],
      });
      onClose();
    }
  };

  const handleWishlistToggle = () => {
    toggleItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      price: Math.round(product.price * 100),
      originalPrice: product.originalPrice ? Math.round(product.originalPrice * 100) : undefined,
      image: product.images[0],
      colors: product.colors,
      sizes: product.sizes,
      addedAt: new Date().toISOString(),
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="bg-background rounded-2xl shadow-soft-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-soft hover:shadow-soft-lg transition-all duration-300 hover:scale-110"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 md:p-8">
                {/* Image Section */}
                <div>
                  {/* Main Image */}
                  <div className="relative h-96 md:h-[500px] bg-secondary rounded-2xl overflow-hidden mb-4 shadow-soft">
                    <Image
                      src={product.images[currentImageIndex]}
                      alt={product.name}
                      fill
                      className="object-cover brightness-105 saturate-110"
                    />
                    {product.badge && (
                      <div className="absolute top-4 left-4">
                        <Badge variant="default" className="bg-accent text-accent-foreground rounded-full">
                          {product.badge}
                        </Badge>
                      </div>
                    )}
                  </div>

                  {/* Thumbnails */}
                  {product.images.length > 1 && (
                    <div className="flex gap-2 overflow-x-auto pb-2">
                      {product.images.map((image, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={cn(
                            'relative h-16 w-16 flex-shrink-0 rounded-xl overflow-hidden border-2 transition-all duration-300 shadow-soft hover:shadow-soft-lg',
                            currentImageIndex === index
                              ? 'border-foreground scale-105 ring-2 ring-primary/30'
                              : 'border-border hover:border-foreground/50'
                          )}
                        >
                          <Image src={image} alt={`${product.name} view ${index + 1}`} fill className="object-cover" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="flex flex-col">
                  {/* Title */}
                  <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground mb-3">
                    {product.name}
                  </h2>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className={cn(
                            'text-base',
                            i < Math.floor(product.rating) ? 'text-accent' : 'text-border'
                          )}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {product.rating} ({product.reviewCount} {t('reviews')})
                    </span>
                  </div>

                  {/* Price */}
                  <div className="flex items-baseline gap-3 mb-4">
                    <span className="text-2xl font-semibold text-foreground">
                      {formatPrice(Math.round(product.price * 100))}
                    </span>
                    {product.originalPrice && (
                      <span className="text-base text-muted-foreground line-through">
                        {formatPrice(Math.round(product.originalPrice * 100))}
                      </span>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                    {product.description}
                  </p>

                  {/* Divider */}
                  <div className="border-t border-border my-4" />

                  {/* Color Selector */}
                  <div className="mb-4">
                    <h3 className="text-sm font-semibold text-foreground mb-3">
                      {t('color')}: <span className="font-normal">{selectedColor?.name}</span>
                    </h3>
                    <div className="flex gap-2 flex-wrap">
                      {product.colors.map((color) => (
                        <button
                          key={color.hex}
                          onClick={() => setSelectedColor(color)}
                          className={cn(
                            'relative w-8 h-8 rounded-full border-2 transition-all duration-300 shadow-soft hover:shadow-soft-lg',
                            selectedColor?.hex === color.hex
                              ? 'border-foreground scale-110 ring-2 ring-primary/30'
                              : 'border-border hover:border-foreground/50 hover:scale-105'
                          )}
                          style={{ backgroundColor: color.hex }}
                          title={color.name}
                          aria-label={color.name}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Size Selector */}
                  <div className="mb-4">
                    <h3 className="text-sm font-semibold text-foreground mb-3">
                      {t('size')}: <span className="font-normal">{selectedSize}</span>
                    </h3>
                    <div className="flex gap-2 flex-wrap">
                      {product.sizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={cn(
                            'px-3 py-1.5 rounded-full border-2 font-medium text-sm transition-all duration-300 shadow-soft hover:shadow-soft-lg',
                            selectedSize === size
                              ? 'bg-foreground text-background border-foreground scale-105'
                              : 'bg-background border-border text-foreground hover:border-foreground hover:scale-105'
                          )}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Quantity Selector */}
                  <div className="mb-6">
                    <h3 className="text-sm font-semibold text-foreground mb-3">{t('quantity')}</h3>
                    <div className="flex items-center border border-border rounded-full w-fit shadow-soft">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="p-2 hover:bg-secondary transition-all duration-300 rounded-l-full hover:scale-110"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <input
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                        className="w-12 text-center border-x border-border bg-transparent outline-none"
                        min="1"
                      />
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="p-2 hover:bg-secondary transition-all duration-300 rounded-r-full hover:scale-110"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 mb-4">
                    <Button size="lg" className="flex-1 font-semibold" onClick={handleAddToCart}>
                      {t('add_to_bag')}
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      className={cn('font-semibold', inWishlist && 'bg-red-50 border-red-200')}
                      onClick={handleWishlistToggle}
                    >
                      <Heart
                        className={cn('w-5 h-5 me-2', inWishlist && 'fill-red-500 stroke-red-500')}
                      />
                      {inWishlist ? t('saved') : t('save')}
                    </Button>
                  </div>

                  {/* View Full Details Link */}
                  <Link
                    href={`/shop/${product.slug}`}
                    className="text-sm text-accent hover:text-accent/80 transition-colors text-center underline"
                    onClick={onClose}
                  >
                    {t('view_full_details')}
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
