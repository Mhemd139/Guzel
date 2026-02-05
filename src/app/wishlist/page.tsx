'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, Share2, Heart, ShoppingBag } from 'lucide-react';
import { useWishlist } from '@/lib/contexts/wishlist-context';
import { useCart } from '@/lib/contexts/cart-context';
import { useToast } from '@/components/ui/toast-provider';
import { formatPrice } from '@/lib/commerce/utils';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';

export default function WishlistPage() {
  const { items, removeItem, moveToCart } = useWishlist();
  const { addItem } = useCart();
  const { addToast } = useToast();
  const [shareCopied, setShareCopied] = useState(false);
  const t = useTranslations('wishlist');
  const tShop = useTranslations('shop');
  const tCommerce = useTranslations('commerce');

  const handleMoveToCart = (item: typeof items[0]) => {
    const defaultColor = item.colors[0];
    const defaultSize = item.sizes[0];
    if (defaultColor && defaultSize) {
      moveToCart(item.productId, defaultColor, defaultSize, addItem);
      addToast({
        message: tCommerce('added_to_cart_toast', { name: item.name }),
        type: 'success',
        image: item.image,
      });
    }
  };

  const handleShareWishlist = () => {
    const wishlistUrl = `${window.location.origin}/wishlist`;
    navigator.clipboard.writeText(wishlistUrl);
    setShareCopied(true);
    setTimeout(() => setShareCopied(false), 2000);
  };

  return (
    <div className="w-full">
      {/* Breadcrumb */}
      <div className="bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">
              {tShop('home')}
            </Link>
            <ChevronRight className="w-4 h-4 rtl:rotate-180" />
            <span className="text-foreground font-medium">{t('title')}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {items.length === 0 ? (
          // Empty State
          <div className="text-center py-16">
            <div className="w-20 h-20 rounded-full bg-secondary mx-auto mb-6 flex items-center justify-center">
              <Heart className="w-10 h-10 text-muted-foreground" />
            </div>
            <h1 className="text-3xl font-serif font-bold text-foreground mb-2">
              {t('empty_title')}
            </h1>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              {t('empty_subtitle')}
            </p>
            <Button asChild size="lg">
              <Link href="/shop">{t('start_shopping')}</Link>
            </Button>
          </div>
        ) : (
          // Wishlist Items
          <div>
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
              <div>
                <h1 className="text-2xl sm:text-3xl font-serif font-bold text-foreground mb-1">
                  {t('title')}
                </h1>
                <p className="text-muted-foreground">
                  {items.length} {items.length === 1 ? tCommerce('item') : tCommerce('items_plural')}
                </p>
              </div>
              <Button
                variant="outline"
                onClick={handleShareWishlist}
                className="gap-2 w-full sm:w-auto"
              >
                <Share2 className="w-4 h-4" />
                {shareCopied ? tCommerce('link_copied') : t('share')}
              </Button>
            </div>

            {/* Items Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {items.map((item) => (
                <div
                  key={item.productId}
                  className="group rounded-lg border border-border overflow-hidden hover:shadow-lg transition-all duration-300"
                >
                  {/* Image */}
                  <Link href={`/shop/${item.slug}`}>
                    <div className="relative h-64 sm:h-80 bg-secondary overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                    </div>
                  </Link>

                  {/* Info */}
                  <div className="p-4 space-y-4">
                    <div>
                      <Link
                        href={`/shop/${item.slug}`}
                        className="text-base font-semibold text-foreground hover:text-accent transition-colors line-clamp-2"
                      >
                        {item.name}
                      </Link>
                      <p className="text-lg font-semibold text-foreground mt-2">
                        {formatPrice(item.price)}
                      </p>
                      {/* Color swatches */}
                      {item.colors.length > 0 && (
                        <div className="flex gap-1.5 mt-2">
                          {item.colors.slice(0, 5).map((color) => (
                            <span
                              key={color.hex}
                              className="w-4 h-4 rounded-full border border-border"
                              style={{ backgroundColor: color.hex }}
                              title={color.name}
                            />
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Buttons */}
                    <div className="space-y-2">
                      <Button
                        size="sm"
                        className="w-full font-semibold gap-2"
                        onClick={() => handleMoveToCart(item)}
                      >
                        <ShoppingBag className="w-4 h-4" />
                        {t('move_to_bag')}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="w-full font-semibold text-red-500 hover:text-red-600"
                        onClick={() => removeItem(item.productId)}
                      >
                        {t('remove')}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Continue Shopping */}
            <div className="mt-12 pt-8 border-t border-border">
              <p className="text-muted-foreground mb-4">
                {tCommerce('continue_shopping_text')}
              </p>
              <Button asChild variant="outline">
                <Link href="/shop">{t('start_shopping')}</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
