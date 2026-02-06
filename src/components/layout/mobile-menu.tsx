'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimatedHamburger } from '@/components/ui/animated-hamburger';
import { LanguageSwitcher } from '@/components/language-switcher';

interface NavLink {
  href: string;
  label: string;
}

interface MobileMenuProps {
  navLinks: NavLink[];
  wishlistCount: number;
}

const menuVariants = {
  closed: {
    x: '100%',
    transition: {
      duration: 0.4,
      ease: [0.4, 0, 0.2, 1] as const,
    },
  },
  open: {
    x: 0,
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1] as const,
    },
  },
};

const backdropVariants = {
  closed: { opacity: 0 },
  open: { opacity: 1 },
};

const itemVariants = {
  closed: { x: 20, opacity: 0 },
  open: (i: number) => ({
    x: 0,
    opacity: 1,
    transition: {
      delay: i * 0.1,
      duration: 0.4,
      ease: [0.4, 0, 0.2, 1] as const,
    },
  }),
};

export function MobileMenu({ navLinks, wishlistCount }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations('nav');

  const handleClose = () => setIsOpen(false);

  return (
    <>
      {/* Hamburger Button */}
      <AnimatedHamburger isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />

      {/* Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              variants={backdropVariants}
              initial="closed"
              animate="open"
              exit="closed"
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              onClick={handleClose}
            />

            {/* Menu Panel */}
            <motion.div
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="fixed top-0 right-0 bottom-0 w-full sm:w-96 bg-background z-50 shadow-soft-lg overflow-y-auto"
            >
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-border">
                  <Link
                    href="/"
                    onClick={handleClose}
                    className="font-serif text-2xl font-bold hover:opacity-75 transition-opacity"
                  >
                    Güzel
                  </Link>
                  <AnimatedHamburger isOpen={isOpen} onClick={handleClose} />
                </div>

                {/* Navigation Links */}
                <nav className="flex-1 px-6 py-8 space-y-2">
                  {navLinks.map((link, i) => (
                    <motion.div
                      key={link.href}
                      custom={i}
                      variants={itemVariants}
                      initial="closed"
                      animate="open"
                    >
                      <Link
                        href={link.href}
                        onClick={handleClose}
                        className="block py-3 px-4 text-lg font-medium text-foreground hover:bg-secondary/50 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-soft"
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}

                  {/* Wishlist Link */}
                  <motion.div
                    custom={navLinks.length}
                    variants={itemVariants}
                    initial="closed"
                    animate="open"
                    className="pt-6 border-t border-border"
                  >
                    <Link
                      href="/wishlist"
                      onClick={handleClose}
                      className="flex items-center gap-3 py-3 px-4 text-lg font-medium text-foreground hover:bg-secondary/50 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-soft"
                    >
                      <Heart className="w-5 h-5" />
                      <span>{t('wishlist')}</span>
                      {wishlistCount > 0 && (
                        <span className="ml-auto bg-accent text-accent-foreground text-xs rounded-full w-6 h-6 flex items-center justify-center font-semibold shadow-soft">
                          {wishlistCount}
                        </span>
                      )}
                    </Link>
                  </motion.div>

                  {/* Language Switcher */}
                  <motion.div
                    custom={navLinks.length + 1}
                    variants={itemVariants}
                    initial="closed"
                    animate="open"
                    className="pt-6 border-t border-border"
                  >
                    <div className="py-3 px-4">
                      <LanguageSwitcher variant="footer" />
                    </div>
                  </motion.div>

                  {/* Contact Link */}
                  <motion.div
                    custom={navLinks.length + 2}
                    variants={itemVariants}
                    initial="closed"
                    animate="open"
                  >
                    <Link
                      href="/contact"
                      onClick={handleClose}
                      className="block py-3 px-4 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-2xl transition-all duration-300"
                    >
                      {t('contact')}
                    </Link>
                  </motion.div>
                </nav>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
