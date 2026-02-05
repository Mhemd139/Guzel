'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useCart } from '@/lib/contexts/cart-context';
import { useWishlist } from '@/lib/contexts/wishlist-context';
import { Menu, Heart, ShoppingBag, Search, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { LanguageSwitcher } from '@/components/language-switcher';
import { CartDrawer } from '@/components/commerce/cart-drawer';

export function Header() {
  const t = useTranslations('nav');
  const tHome = useTranslations('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
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
              Guzel
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
              <button className="p-2 hover:bg-secondary/50 rounded-full transition-all duration-300" aria-label={t('search')}>
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

            {/* Mobile Menu */}
            <div className="md:hidden flex items-center gap-4">
              <button
                onClick={() => setCartOpen(true)}
                className="p-2 hover:bg-secondary rounded-lg transition-colors relative"
                aria-label={t('cart')}
              >
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute top-1 end-1 bg-accent text-accent-foreground text-xs rounded-full w-4 h-4 flex items-center justify-center font-semibold">
                    {cartCount}
                  </span>
                )}
              </button>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" aria-label={t('menu')}>
                    <Menu className="w-5 h-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-full sm:w-96">
                  <nav className="flex flex-col gap-6 mt-8">
                    <Link
                      href="/"
                      className="font-serif text-lg font-bold hover:opacity-75 transition-opacity"
                    >
                      Guzel
                    </Link>
                    {navLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="text-base font-medium text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {link.label}
                      </Link>
                    ))}
                    <div className="border-t pt-6">
                      <Link
                        href="/wishlist"
                        className="flex items-center gap-2 font-medium hover:opacity-75 transition-opacity"
                      >
                        <Heart className="w-5 h-5" />
                        {t('wishlist')} {wishlistCount > 0 && `(${wishlistCount})`}
                      </Link>
                    </div>
                    <div className="border-t pt-6">
                      <LanguageSwitcher variant="footer" />
                    </div>
                    <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground">
                      {t('contact')}
                    </Link>
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </nav>
      </header>

      {/* Cart Drawer */}
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
