'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { ChevronRight, Trash2, Minus, Plus, ShoppingBag, Heart } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useCart } from '@/lib/contexts/cart-context';
import { useWishlist } from '@/lib/contexts/wishlist-context';
import { useToast } from '@/components/ui/toast-provider';
import { formatPrice } from '@/lib/commerce/utils';
import { OrderSummarySidebar } from '@/components/commerce/order-summary-sidebar';
import { Button } from '@/components/ui/button';
import { products } from '@/lib/products';

export default function CartPage() {
  const { items, removeItem, updateQuantity, subtotal } = useCart();
  const { addItem: addToWishlist } = useWishlist();
  const { addToast } = useToast();
  const t = useTranslations('cart');
  const tCommerce = useTranslations('commerce');
  const tShop = useTranslations('shop');
  const searchParams = useSearchParams();

  const [discount, setDiscount] = useState(0);
  const [promoCode, setPromoCode] = useState<string | undefined>();

  // Show toast if payment was cancelled
  useEffect(() => {
    if (searchParams.get('cancelled') === 'true') {
      addToast({ message: tCommerce('payment_cancelled'), type: 'info' });
      // Clean up URL
      window.history.replaceState({}, '', '/cart');
    }
  }, [searchParams, addToast, tCommerce]);

  const handleMoveToWishlist = (item: (typeof items)[0]) => {
    const product = products.find((p) => p.id === item.productId);
    addToWishlist({
      productId: item.productId,
      slug: item.slug,
      name: item.name,
      price: item.price,
      originalPrice: item.originalPrice,
      image: item.image,
      colors: product?.colors || [item.color],
      sizes: product?.sizes || [item.size],
      addedAt: new Date().toISOString(),
    });
    removeItem(item.productId, item.color.name, item.size);
    addToast({ message: tCommerce('moved_to_wishlist'), type: 'success' });
  };

  // Get recommendations from different categories than cart items
  const cartCategories = new Set(
    items
      .map((item) => products.find((p) => p.id === item.productId)?.category)
      .filter(Boolean)
  );
  const recommendations = products
    .filter((p) => !cartCategories.has(p.category))
    .slice(0, 4);

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
          <div className="text-center py-16">
            <div className="w-20 h-20 rounded-full bg-secondary mx-auto mb-6 flex items-center justify-center">
              <ShoppingBag className="w-10 h-10 text-muted-foreground" />
            </div>
            <h1 className="text-3xl font-serif font-bold text-foreground mb-2">
              {t('empty_title')}
            </h1>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              {t('empty_subtitle')}
            </p>
            <Button asChild size="lg">
              <Link href="/shop">{t('continue_shopping')}</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {/* Items List */}
            <div className="lg:col-span-2">
              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-foreground mb-6">
                {t('title')} ({items.length})
              </h1>

              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={`${item.productId}-${item.color.name}-${item.size}`}
                    className="flex gap-4 p-4 rounded-lg border border-border bg-background transition-all"
                  >
                    {/* Product Image */}
                    <Link href={`/shop/${item.slug}`} className="flex-shrink-0">
                      <div className="relative w-24 h-32 sm:w-32 sm:h-40 rounded-lg overflow-hidden bg-secondary">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 640px) 96px, 128px"
                        />
                      </div>
                    </Link>

                    {/* Product Details */}
                    <div className="flex-1 flex flex-col justify-between min-w-0">
                      <div>
                        <Link
                          href={`/shop/${item.slug}`}
                          className="text-base sm:text-lg font-semibold text-foreground hover:text-accent transition-colors line-clamp-1"
                        >
                          {item.name}
                        </Link>
                        <div className="flex items-center gap-3 mt-1.5">
                          <span
                            className="w-4 h-4 rounded-full border border-border"
                            style={{ backgroundColor: item.color.hex }}
                          />
                          <span className="text-sm text-muted-foreground">
                            {item.color.name} / {item.size}
                          </span>
                        </div>
                        {item.originalPrice && item.originalPrice > item.price && (
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-sm line-through text-muted-foreground">
                              {formatPrice(item.originalPrice)}
                            </span>
                            <span className="text-sm font-medium text-red-600">
                              {formatPrice(item.price)}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Quantity & Actions */}
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.productId,
                                item.color.name,
                                item.size,
                                item.quantity - 1
                              )
                            }
                            className="w-8 h-8 rounded flex items-center justify-center border border-border hover:bg-secondary transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-10 text-center text-sm font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.productId,
                                item.color.name,
                                item.size,
                                item.quantity + 1
                              )
                            }
                            disabled={item.quantity >= 10}
                            className="w-8 h-8 rounded flex items-center justify-center border border-border hover:bg-secondary transition-colors disabled:opacity-50"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <span className="text-base sm:text-lg font-bold">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col items-center gap-2">
                      <button
                        onClick={() => handleMoveToWishlist(item)}
                        className="p-2 rounded hover:bg-secondary transition-colors"
                        aria-label={tCommerce('move_to_wishlist')}
                        title={tCommerce('move_to_wishlist')}
                      >
                        <Heart className="w-4 h-4 text-muted-foreground" />
                      </button>
                      <button
                        onClick={() => removeItem(item.productId, item.color.name, item.size)}
                        className="p-2 rounded hover:bg-red-50 transition-colors"
                        aria-label={t('remove')}
                      >
                        <Trash2 className="w-4 h-4 text-muted-foreground hover:text-red-500" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="py-6">
                <Link
                  href="/shop"
                  className="text-sm text-muted-foreground hover:text-foreground underline transition-colors"
                >
                  {t('continue_shopping')}
                </Link>
              </div>
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:sticky lg:top-20 lg:h-fit space-y-4">
              <OrderSummarySidebar
                discount={discount}
                promoCode={promoCode}
                showPromo={true}
                onApplyPromo={(code, disc) => {
                  setPromoCode(code);
                  setDiscount(disc);
                  addToast({
                    message: tCommerce('promo_success', { amount: formatPrice(disc) }),
                    type: 'success',
                  });
                }}
                onRemovePromo={() => {
                  setPromoCode(undefined);
                  setDiscount(0);
                }}
              />

              <Button asChild size="lg" className="w-full font-semibold">
                <Link href="/checkout">{tCommerce('proceed_to_checkout')}</Link>
              </Button>
            </div>
          </div>
        )}

        {/* You Might Also Like */}
        {items.length > 0 && recommendations.length > 0 && (
          <div className="py-12 border-t border-border">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground mb-8">
              {tCommerce('you_might_also_like')}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {recommendations.map((product) => (
                <Link key={product.id} href={`/shop/${product.slug}`} className="group">
                  <div className="relative h-64 rounded-lg overflow-hidden bg-secondary mb-3">
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  </div>
                  <h3 className="text-sm font-medium text-foreground group-hover:text-accent transition-colors line-clamp-1">
                    {product.name}
                  </h3>
                  <p className="text-sm font-semibold mt-1">{formatPrice(product.price * 100)}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
