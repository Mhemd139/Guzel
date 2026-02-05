'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail } from 'lucide-react';
import { motion } from 'framer-motion';

export function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const t = useTranslations('home');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      setEmail('');
      setTimeout(() => setIsSubmitted(false), 5000);
    }
  };


  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7 }}
      className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-primary text-primary-foreground"
    >
      <div className="mx-auto max-w-2xl text-center space-y-8">
        {/* Icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-center"
        >
          <div className="p-3 bg-primary-foreground/20 rounded-full shadow-soft">
            <Mail className="w-8 h-8" />
          </div>
        </motion.div>

        {/* Content */}
        <div className="space-y-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold">
            {t('newsletter_title')}
          </h2>
          <p className="text-base sm:text-lg opacity-90">
            {t('newsletter_subtitle')}
          </p>
        </div>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
        >
          <Input
            type="email"
            placeholder={t('newsletter_placeholder')}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="bg-white text-foreground placeholder:text-muted-foreground border-0 flex-1 rounded-full shadow-soft focus:shadow-soft-lg"
            aria-label="Email address"
          />
          <Button
            type="submit"
            className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-accent-foreground font-semibold"
          >
            {t('newsletter_button')}
          </Button>
        </motion.form>

        {/* Success Message */}
        {isSubmitted && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm opacity-90"
          >
            {t('newsletter_success')}
          </motion.p>
        )}

        {/* Terms */}
        <p className="text-xs sm:text-sm opacity-75">
          {t('newsletter_privacy')}
        </p>
      </div>
    </motion.section>
  );
}
