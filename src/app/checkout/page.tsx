'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ChevronRight, Lock, Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useCart } from '@/lib/contexts/cart-context';
import { useToast } from '@/components/ui/toast-provider';
import { formatPrice } from '@/lib/commerce/utils';
import { calculateTax } from '@/lib/commerce/utils';
import { shippingMethods, getShippingPrice } from '@/lib/commerce/shipping';
import { CheckoutSteps } from '@/components/commerce/checkout-steps';
import { CheckoutForm } from '@/components/commerce/checkout-form';
import { ShippingMethodSelector } from '@/components/commerce/shipping-method-selector';
import { OrderSummarySidebar } from '@/components/commerce/order-summary-sidebar';
import { Button } from '@/components/ui/button';
import type { ShippingAddress } from '@/lib/types/commerce';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, clearCart } = useCart();
  const { addToast } = useToast();
  const t = useTranslations('commerce');
  const tShop = useTranslations('shop');

  const [step, setStep] = useState(1);
  const [shippingData, setShippingData] = useState<ShippingAddress | null>(null);
  const [selectedShippingId, setSelectedShippingId] = useState<string | null>(null);
  const [discount, setDiscount] = useState(0);
  const [promoCode, setPromoCode] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);

  const hasFreeShippingPromo = promoCode?.toUpperCase() === 'FREESHIP';
  const selectedMethod = shippingMethods.find((m) => m.id === selectedShippingId);
  const shippingCost = selectedMethod
    ? getShippingPrice(selectedMethod, subtotal, hasFreeShippingPromo)
    : undefined;
  const tax = shippingCost !== undefined ? calculateTax(subtotal - discount) : undefined;

  const handleShippingSubmit = (data: ShippingAddress) => {
    setShippingData(data);
    setStep(2);
  };

  const handleDeliveryContinue = () => {
    if (!selectedShippingId) {
      addToast({ message: t('select_shipping_method'), type: 'error' });
      return;
    }
    setStep(3);
  };

  const handlePayment = async () => {
    if (!shippingData || !selectedMethod) return;
    setLoading(true);

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items,
          shipping: shippingData,
          shippingMethodId: selectedMethod.id,
          promoCode,
        }),
      });

      const data = await res.json();

      if (data.url) {
        // Redirect to Stripe hosted checkout
        window.location.href = data.url;
      } else {
        addToast({ message: data.error || t('payment_unavailable'), type: 'error' });
      }
    } catch {
      addToast({ message: t('connection_error'), type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  // Redirect to cart if empty
  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <p className="text-muted-foreground mb-4">{t('empty_bag')}</p>
        <Button asChild>
          <Link href="/shop">{t('shop_now')}</Link>
        </Button>
      </div>
    );
  }

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
            <Link href="/cart" className="hover:text-foreground transition-colors">
              {t('view_bag')}
            </Link>
            <ChevronRight className="w-4 h-4 rtl:rotate-180" />
            <span className="text-foreground font-medium">{t('checkout_step_review')}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Step Indicator */}
        <div className="mb-10">
          <CheckoutSteps currentStep={step} onStepClick={setStep} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Step 1: Shipping */}
            {step === 1 && (
              <div>
                <h2 className="text-2xl font-serif font-bold text-foreground mb-6">
                  {t('checkout_step_shipping')}
                </h2>
                <CheckoutForm
                  defaultValues={shippingData || undefined}
                  onSubmit={handleShippingSubmit}
                />
              </div>
            )}

            {/* Step 2: Delivery */}
            {step === 2 && (
              <div>
                <h2 className="text-2xl font-serif font-bold text-foreground mb-6">
                  {t('checkout_step_delivery')}
                </h2>
                <ShippingMethodSelector
                  methods={shippingMethods}
                  selected={selectedShippingId}
                  onSelect={setSelectedShippingId}
                  subtotal={subtotal}
                  hasFreeShippingPromo={hasFreeShippingPromo}
                />
                <Button onClick={handleDeliveryContinue} size="lg" className="w-full mt-6">
                  {t('continue_to_review')}
                </Button>
              </div>
            )}

            {/* Step 3: Review & Pay */}
            {step === 3 && shippingData && selectedMethod && (
              <div className="space-y-8">
                <h2 className="text-2xl font-serif font-bold text-foreground">
                  {t('checkout_step_review')}
                </h2>

                {/* Shipping to */}
                <div className="p-4 rounded-lg border border-border">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">{t('shipping_to')}</h3>
                    <button
                      onClick={() => setStep(1)}
                      className="text-sm text-accent hover:underline"
                    >
                      {t('edit')}
                    </button>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {shippingData.firstName} {shippingData.lastName}
                    <br />
                    {shippingData.address1}
                    {shippingData.address2 && <>, {shippingData.address2}</>}
                    <br />
                    {shippingData.city}, {shippingData.state} {shippingData.zipCode}
                    <br />
                    {shippingData.country}
                  </p>
                </div>

                {/* Delivery method */}
                <div className="p-4 rounded-lg border border-border">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">{t('delivery_method')}</h3>
                    <button
                      onClick={() => setStep(2)}
                      className="text-sm text-accent hover:underline"
                    >
                      {t('edit')}
                    </button>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {selectedMethod.name} &middot; {selectedMethod.estimatedDays}
                  </p>
                </div>

                {/* Items */}
                <div className="p-4 rounded-lg border border-border">
                  <h3 className="font-semibold mb-4">
                    {t('items')} ({items.length})
                  </h3>
                  <div className="space-y-3">
                    {items.map((item) => (
                      <div
                        key={`${item.productId}-${item.color.name}-${item.size}`}
                        className="flex items-center gap-3"
                      >
                        <div className="relative w-14 h-14 rounded overflow-hidden flex-shrink-0">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                            sizes="56px"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium line-clamp-1">{item.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {item.color.name} / {item.size} &middot; {t('quantity')} {item.quantity}
                          </p>
                        </div>
                        <span className="text-sm font-medium">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pay button */}
                <Button
                  onClick={handlePayment}
                  disabled={loading}
                  size="lg"
                  className="w-full font-semibold gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      {t('placing_order')}
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4" />
                      {t('pay_securely')}
                    </>
                  )}
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  {t('terms_agreement')}
                </p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:sticky lg:top-20 lg:h-fit">
            <OrderSummarySidebar
              discount={discount}
              promoCode={promoCode}
              shippingCost={shippingCost}
              tax={tax}
              showPromo={step < 3}
              showItems={true}
              onApplyPromo={(code, disc) => {
                setPromoCode(code);
                setDiscount(disc);
              }}
              onRemovePromo={() => {
                setPromoCode(undefined);
                setDiscount(0);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
