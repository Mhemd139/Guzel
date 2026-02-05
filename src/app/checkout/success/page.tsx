'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { CheckCircle, Package, ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useCart } from '@/lib/contexts/cart-context';
import { Button } from '@/components/ui/button';

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams();
  const { clearCart } = useCart();
  const t = useTranslations('commerce');
  const [cleared, setCleared] = useState(false);

  const sessionId = searchParams.get('session_id');

  // Clear cart on mount
  useEffect(() => {
    if (!cleared) {
      clearCart();
      setCleared(true);
    }
  }, [clearCart, cleared]);

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center">
      {/* Success Icon */}
      <div className="flex justify-center mb-8">
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center animate-in zoom-in duration-500">
          <CheckCircle className="w-12 h-12 text-green-600" />
        </div>
      </div>

      {/* Heading */}
      <h1 className="text-3xl sm:text-4xl font-serif font-bold text-foreground mb-3">
        {t('order_confirmed')}
      </h1>
      <p className="text-lg text-muted-foreground mb-8">
        {t('thank_you')}
      </p>

      {/* Order details card */}
      {sessionId && (
        <div className="bg-secondary/30 rounded-xl p-6 mb-8 text-start">
          <div className="flex items-center gap-3 mb-4">
            <Package className="w-5 h-5 text-accent" />
            <h2 className="font-semibold">{t('order_summary')}</h2>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">{t('order_id')}</span>
              <span className="font-mono text-xs">{sessionId.slice(0, 20)}...</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">{t('order_date')}</span>
              <span>{new Date().toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">{t('order_status')}</span>
              <span className="text-green-600 font-medium">{t('status_paid')}</span>
            </div>
          </div>
        </div>
      )}

      {/* Email confirmation */}
      <p className="text-sm text-muted-foreground mb-10">
        {t('confirmation_email_sent', { email: 'your email' })}
      </p>

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Button asChild size="lg">
          <Link href="/shop">
            {t('continue_shopping')}
            <ArrowRight className="w-4 h-4 ms-2 rtl:rotate-180" />
          </Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link href="/orders">{t('order_history')}</Link>
        </Button>
      </div>
    </div>
  );
}
