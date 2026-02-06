'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, Minus, Plus, ShoppingBag, Truck } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useCart } from '@/lib/contexts/cart-context';
import { formatPrice } from '@/lib/commerce/utils';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
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

  // Free shipping threshold (in cents)
  const FREE_SHIPPING_THRESHOLD = 10000; // $100
  const progress = Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100);
  const remaining = Math.max(FREE_SHIPPING_THRESHOLD - subtotal, 0);

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="right" className="flex flex-col w-full sm:max-w-md bg-white border-l border-border p-0 shadow-xl">
        <SheetHeader className="px-6 py-4 border-b border-border bg-white sticky top-0 z-10">
          <SheetTitle className="flex items-center gap-2 text-xl font-serif text-foreground">
            <ShoppingBag className="w-5 h-5 text-primary" />
            {t('cart_drawer_title')} <span className="text-muted-foreground text-base font-sans font-normal">({itemCount})</span>
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-6 text-center p-8 bg-secondary/5">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="w-24 h-24 rounded-full bg-secondary/20 flex items-center justify-center"
            >
              <ShoppingBag className="w-10 h-10 text-muted-foreground" />
            </motion.div>
            <div className="space-y-2">
              <p className="text-xl font-serif font-medium text-foreground">{t('empty_bag')}</p>
              <p className="text-muted-foreground max-w-xs mx-auto">Looks like you haven't added anything to your bag yet.</p>
            </div>
            <Button asChild onClick={onClose} size="lg" className="rounded-full shadow-soft hover:shadow-soft-lg px-8">
              <Link href="/shop">{t('shop_now')}</Link>
            </Button>
          </div>
        ) : (
          <>
            {/* Free Shipping Progress */}
            <div className="bg-secondary/10 px-6 py-4 border-b border-border/50">
              <div className="flex items-center gap-3 mb-2">
                <div className={`p-2 rounded-full ${progress === 100 ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'}`}>
                  <Truck className="w-4 h-4" />
                </div>
                <div className="flex-1 text-sm font-medium">
                  {progress === 100 ? (
                    <span className="text-primary">You've unlocked <strong>Free Shipping</strong>!</span>
                  ) : (
                    <span>Spend <strong>{formatPrice(remaining)}</strong> more for free shipping</span>
                  )}
                </div>
              </div>
              <div className="h-2 w-full bg-background rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="h-full bg-primary rounded-full"
                />
              </div>
            </div>

            {/* Items list */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 bg-white">
              <AnimatePresence mode="popLayout">
                {items.map((item) => (
                  <motion.div
                    key={`${item.productId}-${item.color.name}-${item.size}`}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex gap-4 p-4 rounded-3xl bg-white border border-border/50 shadow-sm hover:shadow-md transition-all duration-300 group"
                  >
                    {/* Thumbnail */}
                    <Link
                      href={`/shop/${item.slug}`}
                      onClick={onClose}
                      className="relative w-24 h-28 rounded-2xl overflow-hidden flex-shrink-0 bg-secondary/10"
                    >
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="96px"
                      />
                    </Link>

                    {/* Details */}
                    <div className="flex-1 min-w-0 flex flex-col justify-between py-1">
                      <div>
                        <div className="flex justify-between items-start gap-2">
                          <Link
                            href={`/shop/${item.slug}`}
                            onClick={onClose}
                            className="text-base font-serif font-bold text-foreground hover:text-primary line-clamp-2 transition-colors"
                          >
                            {item.name}
                          </Link>
                          <button
                            onClick={() => removeItem(item.productId, item.color.name, item.size)}
                            className="text-muted-foreground hover:text-red-500 transition-colors p-1 -mr-2 -mt-2"
                            aria-label="Remove"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                        
                        <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1.5 bg-secondary/10 px-2 py-1 rounded-full">
                            <span
                              className="w-3 h-3 rounded-full border border-border shadow-sm"
                              style={{ backgroundColor: item.color.hex }}
                            />
                            <span className="text-xs">{item.color.name}</span>
                          </div>
                          <div className="bg-secondary/10 px-2 py-1 rounded-full text-xs">
                            {item.size}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() =>
                              updateQuantity(item.productId, item.color.name, item.size, item.quantity - 1)
                            }
                            className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:bg-secondary/20 hover:border-secondary transition-colors"
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-4 text-center text-sm font-medium">{item.quantity}</span>
                          <button
                            onClick={() =>
                              updateQuantity(item.productId, item.color.name, item.size, item.quantity + 1)
                            }
                            className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:bg-secondary/20 hover:border-secondary transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <span className="text-base font-bold text-foreground">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Footer */}
            <div className="border-t border-border bg-white px-6 py-6 space-y-4 shadow-[0_-4px_20px_rgba(0,0,0,0.02)] z-10">
              <div className="space-y-2">
                <div className="flex justify-between text-base">
                  <span className="text-muted-foreground">{t('subtotal')}</span>
                  <span className="font-semibold">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Shipping</span>
                  <span>Calculated at checkout</span>
                </div>
              </div>
              
              <div className="grid gap-3 pt-2">
                <Button asChild className="w-full rounded-full shadow-soft hover:shadow-soft-lg h-12 text-base" size="lg">
                  <Link href="/checkout" onClick={onClose}>
                    {t('proceed_to_checkout')}
                  </Link>
                </Button>
                <Button asChild className="w-full rounded-full" variant="ghost" onClick={onClose}>
                  <Link href="/cart">{t('view_bag')}</Link>
                </Button>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
