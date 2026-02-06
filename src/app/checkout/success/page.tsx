'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { CheckCircle, Package, ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import confetti from 'canvas-confetti';
import { useCart } from '@/lib/contexts/cart-context';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams();
  const { clearCart } = useCart();
  const t = useTranslations('commerce');
  const [cleared, setCleared] = useState(false);

  const sessionId = searchParams.get('session_id') || 'ORDER-' + Math.random().toString(36).substr(2, 9).toUpperCase();

  // Clear cart and trigger confetti on mount
  useEffect(() => {
    if (!cleared) {
      clearCart();
      setCleared(true);
      
      // Confetti animation
      const duration = 3 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

      const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

      const interval: any = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
          colors: ['#DCC5AF', '#8B5A34', '#AB6432', '#F2E8DE']
        });
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
          colors: ['#DCC5AF', '#8B5A34', '#AB6432', '#F2E8DE']
        });
      }, 250);
    }
  }, [clearCart, cleared]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-secondary/10 py-12">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-xl w-full mx-auto px-4 sm:px-6"
      >
        <div className="bg-background rounded-3xl shadow-soft-lg p-8 sm:p-12 text-center border border-white/50 relative overflow-hidden">
          {/* Decorative background elements */}
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary via-accent to-primary opacity-30" />
          
          {/* Success Icon */}
          <div className="flex justify-center mb-8">
            <motion.div 
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", duration: 0.8, bounce: 0.5 }}
              className="w-24 h-24 rounded-full bg-green-50 flex items-center justify-center shadow-soft"
            >
              <CheckCircle className="w-12 h-12 text-green-500" />
            </motion.div>
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-foreground mb-4">
            {t('order_confirmed')}
          </h1>
          <p className="text-lg text-muted-foreground mb-10">
            {t('thank_you')}
          </p>

          {/* Order details card */}
          {sessionId && (
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-secondary/30 rounded-2xl p-6 mb-8 text-start border border-border"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-background p-2 rounded-full shadow-sm">
                  <Package className="w-5 h-5 text-accent" />
                </div>
                <h2 className="font-semibold">{t('order_summary')}</h2>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between py-2 border-b border-border/50">
                  <span className="text-muted-foreground">{t('order_id')}</span>
                  <span className="font-mono text-xs font-medium">{sessionId.slice(0, 20)}...</span>
                </div>
                <div className="flex justify-between py-2 border-b border-border/50">
                  <span className="text-muted-foreground">{t('order_date')}</span>
                  <span>{new Date().toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between pt-2">
                  <span className="text-muted-foreground">{t('order_status')}</span>
                  <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs font-medium border border-green-200">{t('status_paid')}</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* Email confirmation */}
          <p className="text-sm text-muted-foreground mb-10">
            {t('confirmation_email_sent', { email: 'your email' })}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="shadow-soft hover:shadow-soft-lg hover:scale-105 transition-all duration-300">
              <Link href="/shop">
                {t('continue_shopping')}
                <ArrowRight className="w-4 h-4 ms-2 rtl:rotate-180" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-border hover:bg-secondary/20 shadow-sm hover:shadow-md transition-all">
              <Link href="/orders">{t('order_history')}</Link>
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
