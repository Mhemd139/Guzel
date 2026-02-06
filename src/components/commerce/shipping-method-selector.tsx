'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Check, Truck } from 'lucide-react';
import { ShippingMethod } from '@/lib/types/commerce';
import { formatPrice } from '@/lib/commerce/utils';
import { getShippingPrice } from '@/lib/commerce/shipping';

interface ShippingMethodSelectorProps {
  methods: ShippingMethod[];
  selected: string | null;
  onSelect: (id: string) => void;
  subtotal: number;
  hasFreeShippingPromo: boolean;
}

export function ShippingMethodSelector({
  methods,
  selected,
  onSelect,
  subtotal,
  hasFreeShippingPromo,
}: ShippingMethodSelectorProps) {
  const t = useTranslations('commerce');

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-serif font-bold text-foreground">
        {t('select_shipping_method')}
      </h3>
      <div className="space-y-3">
        {methods.map((method) => {
          const price = getShippingPrice(method, subtotal, hasFreeShippingPromo);
          const isSelected = selected === method.id;
          const isFree = price === 0;

          return (
            <button
              key={method.id}
              onClick={() => onSelect(method.id)}
              className={`w-full flex items-center gap-4 p-4 rounded-2xl border transition-all duration-300 text-start group ${
                isSelected
                  ? 'border-primary bg-primary/5 shadow-soft-lg'
                  : 'border-border hover:border-primary/50 bg-white shadow-soft hover:-translate-y-1'
              }`}
            >
              {/* Radio indicator */}
              <div
                className={`w-5 h-5 rounded-full border flex items-center justify-center flex-shrink-0 transition-colors ${
                  isSelected ? 'border-primary bg-primary' : 'border-border group-hover:border-primary/50'
                }`}
              >
                {isSelected && <Check className="w-3 h-3 text-white" />}
              </div>

              {/* Icon */}
              <Truck className="w-5 h-5 text-muted-foreground flex-shrink-0" />

              {/* Details */}
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-foreground">{method.name}</span>
                  <span
                    className={`font-semibold ${isFree ? 'text-green-600' : 'text-foreground'}`}
                  >
                    {isFree ? t('free') : formatPrice(price)}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mt-0.5">
                  {method.description} &middot; {method.estimatedDays}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
