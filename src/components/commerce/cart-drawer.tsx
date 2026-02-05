'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useCart } from '@/lib/contexts/cart-context';
import { formatPrice } from '@/lib/commerce/utils';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export function CartDrawer({ open, onClose }: CartDrawerProps) {
  const { items, itemCount, subtotal, removeItem, updateQuantity } = useCart();
  const t = useTranslations('commerce');

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="right" className="flex flex-col w-full sm:max-w-md">
        <SheetHeader className="border-b pb-4">
          <SheetTitle className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5" />
            {t('cart_drawer_title')} ({itemCount})
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center">
            <ShoppingBag className="w-16 h-16 text-muted-foreground" />
            <p className="text-lg font-medium text-muted-foreground">{t('empty_bag')}</p>
            <Button asChild onClick={onClose}>
              <Link href="/shop">{t('shop_now')}</Link>
            </Button>
          </div>
        ) : (
          <>
            {/* Items list */}
            <div className="flex-1 overflow-y-auto py-4 space-y-4">
              {items.map((item) => (
                <div
                  key={`${item.productId}-${item.color.name}-${item.size}`}
                  className="flex gap-3 p-3 rounded-lg bg-secondary/30"
                >
                  {/* Thumbnail */}
                  <Link
                    href={`/shop/${item.slug}`}
                    onClick={onClose}
                    className="relative w-20 h-20 rounded overflow-hidden flex-shrink-0"
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </Link>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/shop/${item.slug}`}
                      onClick={onClose}
                      className="text-sm font-medium text-foreground hover:text-accent line-clamp-1"
                    >
                      {item.name}
                    </Link>
                    <div className="flex items-center gap-2 mt-1">
                      <span
                        className="w-3 h-3 rounded-full border border-border"
                        style={{ backgroundColor: item.color.hex }}
                      />
                      <span className="text-xs text-muted-foreground">
                        {item.color.name} / {item.size}
                      </span>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      {/* Quantity controls */}
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() =>
                            updateQuantity(item.productId, item.color.name, item.size, item.quantity - 1)
                          }
                          className="w-6 h-6 rounded flex items-center justify-center bg-background border border-border hover:bg-secondary"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center text-sm">{item.quantity}</span>
                        <button
                          onClick={() =>
                            updateQuantity(item.productId, item.color.name, item.size, item.quantity + 1)
                          }
                          className="w-6 h-6 rounded flex items-center justify-center bg-background border border-border hover:bg-secondary"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      {/* Price */}
                      <span className="text-sm font-semibold">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>

                  {/* Remove button */}
                  <button
                    onClick={() => removeItem(item.productId, item.color.name, item.size)}
                    className="p-1 self-start hover:bg-secondary rounded"
                    aria-label="Remove"
                  >
                    <X className="w-4 h-4 text-muted-foreground" />
                  </button>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="border-t pt-4 space-y-3">
              <div className="flex justify-between text-base font-semibold">
                <span>{t('subtotal')}</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="grid gap-2">
                <Button asChild className="w-full" variant="outline" onClick={onClose}>
                  <Link href="/cart">{t('view_bag')}</Link>
                </Button>
                <Button asChild className="w-full">
                  <Link href="/checkout" onClick={onClose}>
                    {t('proceed_to_checkout')}
                  </Link>
                </Button>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
