'use client';

import React, { useState, useMemo, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { ChevronRight, X, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Select } from '@/components/ui/select';
import { ProductCard } from '@/components/products/product-card';
import { products, categories } from '@/lib/products';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const COLORS = [
  { name: 'Cream', hex: '#FFF8F0' },
  { name: 'Black', hex: '#1A1A1A' },
  { name: 'Camel', hex: '#C4A87F' },
  { name: 'Sage', hex: '#A6B5A1' },
  { name: 'Navy', hex: '#1B2B4E' },
  { name: 'Terracotta', hex: '#CD7F32' },
];

const SIZES = ['XS', 'S', 'M', 'L', 'XL'];

interface FilterState {
  categories: string[];
  sizes: string[];
  colors: string[];
  priceMin: number;
  priceMax: number;
  sort: string;
}

function FilterSidebar({
  filters,
  onFiltersChange,
  mobileOnly = false,
}: {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  mobileOnly?: boolean;
}) {
  const t = useTranslations('shop');

  const handleCategoryToggle = (category: string) => {
    onFiltersChange({
      ...filters,
      categories: filters.categories.includes(category)
        ? filters.categories.filter((c) => c !== category)
        : [...filters.categories, category],
    });
  };

  const handleSizeToggle = (size: string) => {
    onFiltersChange({
      ...filters,
      sizes: filters.sizes.includes(size)
        ? filters.sizes.filter((s) => s !== size)
        : [...filters.sizes, size],
    });
  };

  const handleColorToggle = (colorHex: string) => {
    onFiltersChange({
      ...filters,
      colors: filters.colors.includes(colorHex)
        ? filters.colors.filter((c) => c !== colorHex)
        : [...filters.colors, colorHex],
    });
  };

  const handlePriceChange = (type: 'min' | 'max', value: number) => {
    onFiltersChange({
      ...filters,
      [type === 'min' ? 'priceMin' : 'priceMax']: value,
    });
  };

  return (
    <div className={cn('space-y-8 p-4 md:p-0', mobileOnly && 'block md:hidden')}>
      {/* Categories */}
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-4">{t('category')}</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <label
              key={category}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <input
                type="checkbox"
                checked={filters.categories.includes(category)}
                onChange={() => handleCategoryToggle(category)}
                className="w-4 h-4 rounded border-border cursor-pointer"
              />
              <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                {category}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Sizes */}
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-4">{t('size')}</h3>
        <div className="space-y-2">
          {SIZES.map((size) => (
            <label
              key={size}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <input
                type="checkbox"
                checked={filters.sizes.includes(size)}
                onChange={() => handleSizeToggle(size)}
                className="w-4 h-4 rounded border-border cursor-pointer"
              />
              <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                {size}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Colors */}
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-4">{t('color')}</h3>
        <div className="flex flex-wrap gap-3">
          {COLORS.map((color) => (
            <button
              key={color.hex}
              onClick={() => handleColorToggle(color.hex)}
              className={cn(
                'w-10 h-10 rounded-full border-2 transition-all duration-300 shadow-soft hover:shadow-soft-lg',
                filters.colors.includes(color.hex)
                  ? 'border-foreground scale-110 ring-2 ring-primary/30'
                  : 'border-border hover:border-foreground/50 hover:scale-105'
              )}
              style={{ backgroundColor: color.hex }}
              title={color.name}
              aria-label={color.name}
            />
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-4">{t('price_range')}</h3>
        <div className="space-y-4">
          <div>
            <label className="text-xs text-muted-foreground mb-2 block">
              {t('price_min')}: ${filters.priceMin}
            </label>
            <input
              type="range"
              min="0"
              max="500"
              value={filters.priceMin}
              onChange={(e) => handlePriceChange('min', parseInt(e.target.value))}
              className="w-full h-2 bg-secondary rounded-full appearance-none cursor-pointer accent-primary shadow-soft [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:shadow-soft-lg [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:hover:scale-110"
            />
          </div>
          <div>
            <label className="text-xs text-muted-foreground mb-2 block">
              {t('price_max')}: ${filters.priceMax}
            </label>
            <input
              type="range"
              min="0"
              max="500"
              value={filters.priceMax}
              onChange={(e) => handlePriceChange('max', parseInt(e.target.value))}
              className="w-full h-2 bg-secondary rounded-full appearance-none cursor-pointer accent-primary shadow-soft [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:shadow-soft-lg [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:hover:scale-110"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function ShopContent() {
  const searchParams = useSearchParams();
  const t = useTranslations('shop');

  const isNewArrivals = searchParams.get('filter') === 'new';

  const SORT_OPTIONS = [
    { value: 'newest', label: t('sort_newest') },
    { value: 'price-low', label: t('sort_price_low') },
    { value: 'price-high', label: t('sort_price_high') },
    { value: 'bestselling', label: t('sort_bestselling') },
    { value: 'rating', label: t('sort_rating') },
  ];

  const [filters, setFilters] = useState<FilterState>({
    categories: searchParams.get('category')
      ? [searchParams.get('category')!]
      : [],
    sizes: [],
    colors: [],
    priceMin: 0,
    priceMax: 500,
    sort: 'newest',
  });

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products];

    // Apply "New Arrivals" filter from URL
    if (isNewArrivals) {
      result = result.filter((p) => p.isNew);
    }

    // Apply category filters
    if (filters.categories.length > 0) {
      result = result.filter((p) => filters.categories.includes(p.category));
    }

    // Apply size filters
    if (filters.sizes.length > 0) {
      result = result.filter((p) =>
        filters.sizes.some((s) => p.sizes.includes(s))
      );
    }

    // Apply color filters
    if (filters.colors.length > 0) {
      result = result.filter((p) =>
        filters.colors.some((c) => p.colors.some((pc) => pc.hex === c))
      );
    }

    // Apply price filter
    result = result.filter(
      (p) => p.price >= filters.priceMin && p.price <= filters.priceMax
    );

    // Apply sorting
    switch (filters.sort) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'bestselling':
        result.sort((a, b) => (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0));
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
      default:
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
    }

    return result;
  }, [filters, isNewArrivals]);

  const allActiveFilters = [
    ...filters.categories,
    ...filters.sizes,
    ...filters.colors.map((c) => COLORS.find((col) => col.hex === c)?.name || c),
    ...(filters.priceMin > 0 || filters.priceMax < 500
      ? [`$${filters.priceMin} - $${filters.priceMax}`]
      : []),
  ];

  const handleRemoveFilter = (filterValue: string) => {
    if (filters.categories.includes(filterValue)) {
      setFilters({
        ...filters,
        categories: filters.categories.filter((c) => c !== filterValue),
      });
    } else if (filters.sizes.includes(filterValue)) {
      setFilters({
        ...filters,
        sizes: filters.sizes.filter((s) => s !== filterValue),
      });
    } else if (filterValue.includes('$')) {
      setFilters({
        ...filters,
        priceMin: 0,
        priceMax: 500,
      });
    } else {
      const colorHex = COLORS.find((c) => c.name === filterValue)?.hex;
      if (colorHex) {
        setFilters({
          ...filters,
          colors: filters.colors.filter((c) => c !== colorHex),
        });
      }
    }
  };

  const handleClearAllFilters = () => {
    setFilters({
      categories: [],
      sizes: [],
      colors: [],
      priceMin: 0,
      priceMax: 500,
      sort: 'newest',
    });
  };

  return (
    <div className="w-full">
      {/* Breadcrumb */}
      <div className="bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link
              href="/"
              className="hover:text-foreground transition-colors"
            >
              {t('home')}
            </Link>
            <ChevronRight className="w-4 h-4 rtl:rotate-180" />
            <span className="text-foreground font-medium">
              {isNewArrivals ? t('new_arrivals_title') : t('title')}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-20 bg-background rounded-2xl p-6 shadow-soft">
              <FilterSidebar filters={filters} onFiltersChange={setFilters} />
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Header with Sort and Mobile Filter */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
              <div>
                <h1 className="text-2xl sm:text-3xl font-serif font-bold text-foreground mb-2">
                  {isNewArrivals ? t('new_arrivals_title') : t('title')}
                </h1>
                <p className="text-sm text-muted-foreground">
                  {t('showing')} {filteredAndSortedProducts.length} {t('of')} {products.length}{' '}
                  {t('items')}
                </p>
              </div>

              <div className="flex items-center gap-4">
                {/* Sort Dropdown */}
                <select
                  value={filters.sort}
                  onChange={(e) =>
                    setFilters({ ...filters, sort: e.target.value })
                  }
                  className="px-4 py-2 rounded-full border border-border bg-background text-sm font-medium text-foreground hover:bg-secondary transition-all duration-300 shadow-soft hover:shadow-soft-lg cursor-pointer"
                >
                  {SORT_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>

                {/* Mobile Filter Sheet */}
                <div className="lg:hidden">
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button
                        variant="outline"
                        size="default"
                        className="gap-2"
                      >
                        <Settings className="w-4 h-4" />
                        <span className="hidden sm:inline">{t('filters')}</span>
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-full sm:w-96 overflow-y-auto">
                      <div className="mt-8">
                        <FilterSidebar
                          filters={filters}
                          onFiltersChange={setFilters}
                          mobileOnly={true}
                        />
                      </div>
                    </SheetContent>
                  </Sheet>
                </div>
              </div>
            </div>

            {/* Active Filters */}
            {allActiveFilters.length > 0 && (
              <div className="mb-8">
                <div className="flex flex-wrap gap-2 mb-3">
                  {allActiveFilters.map((filter) => (
                    <Badge
                      key={filter}
                      variant="secondary"
                      className="flex items-center gap-1 px-3 py-1.5 text-sm"
                    >
                      {filter}
                      <button
                        onClick={() => handleRemoveFilter(filter)}
                        className="ms-1 hover:opacity-70 transition-opacity"
                        aria-label={`Remove ${filter} filter`}
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
                <button
                  onClick={handleClearAllFilters}
                  className="text-xs text-muted-foreground hover:text-foreground underline transition-colors"
                >
                  {t('clear_all')}
                </button>
              </div>
            )}

            {/* Products Grid */}
            {filteredAndSortedProducts.length > 0 ? (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mb-12"
                >
                  {filteredAndSortedProducts.map((product, index) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.05 }}
                    >
                      <ProductCard
                        id={product.id}
                        slug={product.slug}
                        name={product.name}
                        price={product.price}
                        originalPrice={product.originalPrice}
                        image={product.images[0]}
                        secondImage={product.images[1]}
                        colors={product.colors}
                        sizes={product.sizes}
                        isNew={product.isNew}
                        badge={product.badge}
                      />
                    </motion.div>
                  ))}
                </motion.div>

                {/* Load More Button */}
                <div className="flex justify-center">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full sm:w-auto"
                  >
                    {t('load_more')}
                  </Button>
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground mb-4">
                  {t('no_results')}
                </p>
                <Button
                  variant="outline"
                  onClick={handleClearAllFilters}
                >
                  {t('clear_filters')}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ShopContent />
    </Suspense>
  );
}
