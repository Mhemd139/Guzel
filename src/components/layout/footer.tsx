'use client';

import React from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Instagram, Share2, Facebook, Mail } from 'lucide-react';
import { LanguageSwitcher } from '@/components/language-switcher';

export function Footer() {
  const t = useTranslations('footer');

  return (
    <footer className="border-t bg-secondary mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 sm:gap-12 mb-12">
          {/* Column 1: Brand */}
          <div>
            <h3 className="font-serif text-xl font-bold text-foreground mb-4">Guzel</h3>
            <p className="text-sm text-muted-foreground mb-6">
              {t('tagline')}
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://www.instagram.com/guzel_tayibe?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 hover:bg-muted rounded-lg transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://pinterest.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 hover:bg-muted rounded-lg transition-colors"
                aria-label="Pinterest"
              >
                <Share2 className="w-5 h-5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 hover:bg-muted rounded-lg transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="mailto:hello@Guzel.com"
                className="p-2 hover:bg-muted rounded-lg transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Column 2: Shop */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">{t('shop')}</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/shop" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  {t('all_products')}
                </Link>
              </li>
              <li>
                <Link href="/shop?category=Dresses" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  {t('dresses')}
                </Link>
              </li>
              <li>
                <Link href="/shop?category=Tops" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  {t('tops')}
                </Link>
              </li>
              <li>
                <Link href="/shop?category=Outerwear" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  {t('outerwear')}
                </Link>
              </li>
              <li>
                <Link href="/shop?category=Accessories" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  {t('accessories')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Help */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">{t('help')}</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  {t('contact_us')}
                </Link>
              </li>
              <li>
                <a href="#faq" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  {t('faq')}
                </a>
              </li>
              <li>
                <a href="#shipping" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  {t('shipping_info')}
                </a>
              </li>
              <li>
                <a href="#returns" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  {t('returns')}
                </a>
              </li>
              <li>
                <a href="#size-guide" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  {t('size_guide')}
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: About */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">{t('about')}</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  {t('our_story')}
                </Link>
              </li>
              <li>
                <a href="#sustainability" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  {t('sustainability')}
                </a>
              </li>
              <li>
                <a href="#careers" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  {t('careers')}
                </a>
              </li>
              <li>
                <a href="#press" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  {t('press')}
                </a>
              </li>
              <li>
                <a href="#wholesale" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  {t('wholesale')}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-muted-foreground">
              {t('rights')}
            </p>
            <div className="flex items-center gap-4">
              <LanguageSwitcher variant="footer" />
              <a href="#privacy" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                {t('privacy')}
              </a>
              <a href="#terms" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                {t('terms')}
              </a>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span>{t('secure_payments')}</span>
              <div className="flex gap-2">
                <span>Visa</span>
                <span>Mastercard</span>
                <span>Amex</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
