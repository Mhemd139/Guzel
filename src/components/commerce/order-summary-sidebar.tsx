'use client';

import React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Lock, RotateCcw, Truck } from 'lucide-react';
import { useCart } from '@/lib/contexts/cart-context';
import { formatPrice } from '@/lib/commerce/utils';
import { PromoCodeInput } from './promo-code-input';

interface OrderSummarySidebarProps {
  discount: number;
  promoCode?: string;
  shippingCost?: number;
  tax?: number;
  showPromo?: boolean;
  showItems?: boolean;
  onApplyPromo?: (code: string, discount: number) => void;
  onRemovePromo?: () => void;
}

export function OrderSummarySidebar({
  discount,
  promoCode,
  shippingCost,
  tax,
  showPromo = true,
  showItems = false,
  onApplyPromo,
  onRemovePromo,
}: OrderSummarySidebarProps) {
  const { items, subtotal } = useCart();
  const t = useTranslations('commerce');

  const shippingDisplay =
    shippingCost !== undefined ? (shippingCost === 0 ? t('free') : formatPrice(shippingCost)) : t('calculated_at_checkout');
  const taxDisplay = tax !== undefined ? formatPrice(tax) : t('calculated_at_checkout');
  const total =
    subtotal -
    discount +
    (shippingCost || 0) +
    (tax || 0);

  return (
    <div className="bg-background rounded-2xl shadow-soft-lg p-6 space-y-6 sticky top-24 border border-border/50">
      <h3 className="text-lg font-serif font-bold text-foreground">
        {t('order_summary')}
      </h3>

      {/* Compact item list */}
      {showItems && items.length > 0 && (
        <div className="space-y-4 border-b border-border pb-6">
          {items.map((item) => (
            <div
              key={`${item.productId}-${item.color.name}-${item.size}`}
              className="flex items-center gap-4 group"
            >
              <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 shadow-sm border border-border/50">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="64px"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium line-clamp-1">{item.name}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {item.color.name} / {item.size} <span className="text-foreground font-medium">x{item.quantity}</span>
                </p>
              </div>
              <span className="text-sm font-medium">
                {formatPrice(item.price * item.quantity)}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Promo code */}
      {showPromo && onApplyPromo && onRemovePromo && (
        <PromoCodeInput
          subtotal={subtotal}
          onApply={onApplyPromo}
          onRemove={onRemovePromo}
          appliedCode={promoCode}
          appliedDiscount={discount}
        />
      )}

      {/* Price breakdown */}
      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">{t('subtotal')}</span>
          <span className="font-medium">{formatPrice(subtotal)}</span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-green-600 bg-green-50 p-2 rounded-lg">
            <span>{t('discount')}</span>
            <span>-{formatPrice(discount)}</span>
          </div>
        )}
        <div className="flex justify-between">
          <span className="text-muted-foreground">{t('shipping')}</span>
          <span className="font-medium">{shippingDisplay}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">{t('tax')}</span>
          <span className="font-medium">{taxDisplay}</span>
        </div>
        <div className="flex justify-between pt-4 border-t border-border mt-4">
          <span className="text-lg font-serif font-bold">{t('total')}</span>
          <span className="text-lg font-serif font-bold text-primary">{formatPrice(total > 0 ? total : 0)}</span>
        </div>
      </div>

      {/* Trust badges */}
      <div className="grid grid-cols-3 gap-2 pt-6 border-t border-border">
        <div className="flex flex-col items-center gap-2 text-center p-2 rounded-lg hover:bg-secondary/30 transition-colors">
          <Lock className="w-4 h-4 text-muted-foreground" />
          <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">{t('secure_checkout')}</span>
        </div>
        <div className="flex flex-col items-center gap-2 text-center p-2 rounded-lg hover:bg-secondary/30 transition-colors">
          <RotateCcw className="w-4 h-4 text-muted-foreground" />
          <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">{t('free_returns')}</span>
        </div>
        <div className="flex flex-col items-center gap-2 text-center p-2 rounded-lg hover:bg-secondary/30 transition-colors">
          <Truck className="w-4 h-4 text-muted-foreground" />
          <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">{t('free_shipping_above')}</span>
        </div>
      </div>
    </div>
  );
}
