'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useCart } from '@/lib/contexts/cart-context';
import { useWishlist } from '@/lib/contexts/wishlist-context';
import { Heart, ShoppingBag, Search, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LanguageSwitcher } from '@/components/language-switcher';
import { CartDrawer } from '@/components/commerce/cart-drawer';
import { MobileMenu } from '@/components/layout/mobile-menu';
import { SearchModal } from '@/components/layout/search-modal';

export function Header() {
  const t = useTranslations('nav');
  const tHome = useTranslations('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { itemCount: cartCount } = useCart();
  const { itemCount: wishlistCount } = useWishlist();

  const navLinks = [
    { href: '/shop', label: t('shop') },
    { href: '/shop?filter=new', label: t('new_arrivals') },
    { href: '/about', label: t('about') },
    { href: '/contact', label: t('contact') },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <a href="#main-content" className="skip-to-main">
        {t('skip_to_content')}
      </a>

      {/* Announcement Bar */}
      <div className="bg-primary text-primary-foreground py-2 text-center text-sm">
        {tHome('announcement_1')} • {tHome('announcement_2')}
      </div>

      {/* Header */}
      <header
        className={`sticky top-0 z-40 w-full border-b transition-all duration-200 ${
          isScrolled
            ? 'bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-border'
            : 'bg-background border-border'
        }`}
      >
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              className="flex-shrink-0 font-serif text-2xl font-bold text-foreground tracking-tight hover:opacity-75 transition-opacity"
            >
              Güzel
            </Link>

            {/* Desktop Navigation */}
            <ul className="hidden md:flex items-center gap-8 ms-auto me-8">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="relative text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-300 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary after:scale-x-0 after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Desktop Icons */}
            <div className="hidden md:flex items-center gap-6">
              <button 
                onClick={() => setSearchOpen(true)}
                className="p-2 hover:bg-secondary/50 rounded-full transition-all duration-300" 
                aria-label={t('search')}
              >
                <Search className="w-5 h-5" />
              </button>
              <LanguageSwitcher variant="header" />
              <Link
                href="/wishlist"
                className="p-2 hover:bg-secondary/50 rounded-full transition-all duration-300 relative"
                aria-label={t('wishlist')}
              >
                <Heart className="w-5 h-5" />
                {wishlistCount > 0 && (
                  <span className="absolute top-0 end-0 bg-accent text-accent-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold shadow-soft">
                    {wishlistCount}
                  </span>
                )}
              </Link>
              <button
                onClick={() => setCartOpen(true)}
                className="p-2 hover:bg-secondary/50 rounded-full transition-all duration-300 relative"
                aria-label={t('cart')}
              >
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute top-0 end-0 bg-accent text-accent-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold shadow-soft">
                    {cartCount}
                  </span>
                )}
              </button>
              <button className="p-2 hover:bg-secondary/50 rounded-full transition-all duration-300" aria-label={t('account')}>
                <User className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Icons + Menu */}
            <div className="md:hidden flex items-center gap-2">
              <button
                onClick={() => setSearchOpen(true)}
                className="p-1.5 hover:bg-secondary/50 rounded-full transition-all duration-300"
                aria-label={t('search')}
              >
                <Search className="w-5 h-5" />
              </button>
              <Link
                href="/wishlist"
                className="p-1.5 hover:bg-secondary/50 rounded-full transition-all duration-300 relative"
                aria-label={t('wishlist')}
              >
                <Heart className="w-5 h-5" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-0.5 -end-0.5 bg-accent text-accent-foreground text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-semibold shadow-soft">
                    {wishlistCount}
                  </span>
                )}
              </Link>
              <button
                onClick={() => setCartOpen(true)}
                className="p-1.5 hover:bg-secondary/50 rounded-full transition-all duration-300 relative"
                aria-label={t('cart')}
              >
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -end-0.5 bg-accent text-accent-foreground text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-semibold shadow-soft">
                    {cartCount}
                  </span>
                )}
              </button>
              <MobileMenu navLinks={navLinks} wishlistCount={wishlistCount} />
            </div>
          </div>
        </nav>
      </header>

      {/* Drawers & Modals */}
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
