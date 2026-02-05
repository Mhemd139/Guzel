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
    <div className="bg-secondary/30 rounded-xl p-6 space-y-6">
      <h3 className="text-lg font-serif font-bold text-foreground">
        {t('order_summary')}
      </h3>

      {/* Compact item list */}
      {showItems && items.length > 0 && (
        <div className="space-y-3 border-b border-border pb-4">
          {items.map((item) => (
            <div
              key={`${item.productId}-${item.color.name}-${item.size}`}
              className="flex items-center gap-3"
            >
              <div className="relative w-12 h-12 rounded overflow-hidden flex-shrink-0">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                  sizes="48px"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium line-clamp-1">{item.name}</p>
                <p className="text-xs text-muted-foreground">
                  {item.color.name} / {item.size} x{item.quantity}
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
          <div className="flex justify-between text-green-600">
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
        <div className="flex justify-between pt-3 border-t border-border">
          <span className="text-base font-bold">{t('total')}</span>
          <span className="text-base font-bold">{formatPrice(total > 0 ? total : 0)}</span>
        </div>
      </div>

      {/* Trust badges */}
      <div className="grid grid-cols-3 gap-2 pt-4 border-t border-border">
        <div className="flex flex-col items-center gap-1 text-center">
          <Lock className="w-4 h-4 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">{t('secure_checkout')}</span>
        </div>
        <div className="flex flex-col items-center gap-1 text-center">
          <RotateCcw className="w-4 h-4 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">{t('free_returns')}</span>
        </div>
        <div className="flex flex-col items-center gap-1 text-center">
          <Truck className="w-4 h-4 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">{t('free_shipping_above')}</span>
        </div>
      </div>
    </div>
  );
}
