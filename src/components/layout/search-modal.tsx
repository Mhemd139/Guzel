'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search, ChevronRight, TrendingUp } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import { products, Product } from '@/lib/products';
import { Button } from '@/components/ui/button';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const t = useTranslations('nav');
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  
  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);
  
  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Filter products
  const results = debouncedQuery 
    ? products.filter((p: Product) => 
        p.name.toLowerCase().includes(debouncedQuery.toLowerCase()) || 
        p.category.toLowerCase().includes(debouncedQuery.toLowerCase())
      ).slice(0, 5)
    : [];

  const recentSearches = ['Summer Dress', 'Silk Blouse', 'Maxi Skirt'];
  const trending = ['New Arrivals', 'Bestsellers', 'Accessories'];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.3, type: "spring", damping: 25, stiffness: 300 }}
            className="fixed top-4 inset-x-4 md:top-20 md:max-w-3xl md:mx-auto bg-background rounded-3xl shadow-soft-lg z-50 overflow-hidden flex flex-col max-h-[80vh]"
          >
            {/* Header */}
            <div className="p-4 border-b border-border flex items-center gap-4">
              <Search className="w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t('search')}
                className="flex-1 bg-transparent border-none outline-none text-lg font-medium placeholder:text-muted-foreground/50"
                autoFocus
              />
              <button 
                onClick={onClose}
                className="p-2 hover:bg-secondary/50 rounded-full transition-colors"
                aria-label="Close search"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
              {!query ? (
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Recent Searches */}
                  <div>
                    <h3 className="text-sm font-semibold text-muted-foreground mb-4 uppercase tracking-wider">
                      Recent Searches
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {recentSearches.map((term) => (
                        <button
                          key={term}
                          onClick={() => setQuery(term)}
                          className="px-4 py-2 bg-secondary/30 rounded-full text-sm hover:bg-secondary/50 transition-colors cursor-pointer"
                        >
                          {term}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Trending */}
                  <div>
                    <h3 className="text-sm font-semibold text-muted-foreground mb-4 uppercase tracking-wider flex items-center gap-2">
                      <TrendingUp className="w-4 h-4" />
                      Trending Now
                    </h3>
                    <div className="space-y-2">
                      {trending.map((term) => (
                        <button
                          key={term}
                          onClick={() => setQuery(term)}
                          className="flex items-center justify-between w-full p-2 hover:bg-secondary/30 rounded-lg group transition-colors text-left"
                        >
                          <span className="font-medium group-hover:text-primary transition-colors">{term}</span>
                          <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-primary" />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {results.length > 0 ? (
                    <>
                      <h3 className="text-sm font-semibold text-muted-foreground mb-2">
                        Products ({results.length})
                      </h3>
                      <div className="space-y-2">
                        {results.map((product: Product) => (
                          <motion.div
                            key={product.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                          >
                            <Link 
                              href={`/shop/${product.slug}`}
                              onClick={onClose}
                              className="flex items-center gap-4 p-3 hover:bg-secondary/30 rounded-xl transition-all group"
                            >
                              <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-secondary/20">
                                <Image
                                  src={product.images[0]}
                                  alt={product.name}
                                  fill
                                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="font-medium truncate group-hover:text-primary transition-colors">
                                  {product.name}
                                </h4>
                                <p className="text-sm text-muted-foreground capitalize">
                                  {product.category}
                                </p>
                              </div>
                              <div className="text-right">
                                <span className="font-medium block">
                                  ${product.price.toFixed(2)}
                                </span>
                                <span className="text-xs text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                                  View Item
                                </span>
                              </div>
                            </Link>
                          </motion.div>
                        ))}
                      </div>
                      <div className="pt-4 text-center border-t border-border mt-4">
                        <Link href={`/shop?q=${query}`} onClick={onClose}>
                          <Button variant="ghost" className="hover:text-primary">
                            View all results for "{query}"
                          </Button>
                        </Link>
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-12">
                      <Search className="w-12 h-12 mx-auto text-muted-foreground/30 mb-4" />
                      <h3 className="text-lg font-medium mb-2">No results found</h3>
                      <p className="text-muted-foreground">
                        We couldn't find anything matching "{query}". Try a different search term.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
