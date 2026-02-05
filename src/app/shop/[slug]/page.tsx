'use client';

import React, { use, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, Heart, Minus, Plus, Share2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useCart } from '@/lib/contexts/cart-context';
import { useWishlist } from '@/lib/contexts/wishlist-context';
import { useToast } from '@/components/ui/toast-provider';
import { formatPrice } from '@/lib/commerce/utils';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { ProductCard } from '@/components/products/product-card';
import { getProductBySlug, getProductsByCategory } from '@/lib/products';
import { cn } from '@/lib/utils';

const SAMPLE_REVIEWS = [
  {
    id: 1,
    name: 'Sarah M.',
    rating: 5,
    date: 'January 15, 2024',
    text: 'Absolutely love this dress! The fabric is so comfortable and the fit is perfect. It\'s become my go-to piece for so many occasions.',
  },
  {
    id: 2,
    name: 'Emma L.',
    rating: 4,
    date: 'January 8, 2024',
    text: 'Beautiful quality and great style. Slightly roomier than expected but works great with a belt. Would definitely recommend!',
  },
  {
    id: 3,
    name: 'Jessica K.',
    rating: 5,
    date: 'January 2, 2024',
    text: 'This is an investment piece that\'s worth every penny. The craftsmanship is impeccable and it\'s versatile enough to wear year-round.',
  },
];

interface ProductDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { slug } = use(params);
  const product = getProductBySlug(slug);
  const { addItem } = useCart();
  const { toggleItem, isInWishlist } = useWishlist();
  const { addToast } = useToast();
  const t = useTranslations('product');
  const tShop = useTranslations('shop');
  const tCommerce = useTranslations('commerce');

  const [selectedColor, setSelectedColor] = useState(product?.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product?.sizes[0]);
  const [quantity, setQuantity] = useState(1);
  const [mainImageIndex, setMainImageIndex] = useState(0);

  if (!product) {
    return (
      <div className="w-full">
        <div className="bg-secondary">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link
                href="/"
                className="hover:text-foreground transition-colors"
              >
                {tShop('home')}
              </Link>
              <ChevronRight className="w-4 h-4 rtl:rotate-180" />
              <Link
                href="/shop"
                className="hover:text-foreground transition-colors"
              >
                {tShop('title')}
              </Link>
              <ChevronRight className="w-4 h-4 rtl:rotate-180" />
              <span className="text-foreground font-medium">{t('not_found')}</span>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <h1 className="text-2xl font-serif font-bold mb-4">{t('not_found')}</h1>
          <p className="text-muted-foreground mb-8">
            {t('not_found_text')}
          </p>
          <Button asChild>
            <Link href="/shop">{t('back_to_shop')}</Link>
          </Button>
        </div>
      </div>
    );
  }

  const inWishlist = isInWishlist(product.id);
  const relatedProducts = getProductsByCategory(product.category)
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    if (selectedColor && selectedSize) {
      addItem({
        productId: product.id,
        slug: product.slug,
        name: product.name,
        price: Math.round(product.price * 100),
        originalPrice: product.originalPrice ? Math.round(product.originalPrice * 100) : undefined,
        image: product.images[0],
        color: selectedColor,
        size: selectedSize,
        quantity,
      });
      addToast({
        message: tCommerce('added_to_cart_toast', { name: product.name }),
        type: 'success',
        image: product.images[0],
      });
      setQuantity(1);
    }
  };

  const handleWishlistToggle = () => {
    toggleItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      price: Math.round(product.price * 100),
      originalPrice: product.originalPrice ? Math.round(product.originalPrice * 100) : undefined,
      image: product.images[0],
      colors: product.colors,
      sizes: product.sizes,
      addedAt: new Date().toISOString(),
    });
  };

  return (
    <div className="w-full">
      {/* Breadcrumb */}
      <div className="bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground overflow-x-auto">
            <Link
              href="/"
              className="hover:text-foreground transition-colors flex-shrink-0"
            >
              {tShop('home')}
            </Link>
            <ChevronRight className="w-4 h-4 flex-shrink-0 rtl:rotate-180" />
            <Link
              href="/shop"
              className="hover:text-foreground transition-colors flex-shrink-0"
            >
              {tShop('title')}
            </Link>
            <ChevronRight className="w-4 h-4 flex-shrink-0 rtl:rotate-180" />
            <Link
              href={`/shop?category=${product.category}`}
              className="hover:text-foreground transition-colors flex-shrink-0"
            >
              {product.category}
            </Link>
            <ChevronRight className="w-4 h-4 flex-shrink-0 rtl:rotate-180" />
            <span className="text-foreground font-medium flex-shrink-0 truncate">
              {product.name}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
          {/* Image Gallery */}
          <div>
            {/* Main Image */}
            <div className="relative h-96 sm:h-[500px] lg:h-[600px] bg-secondary rounded-2xl overflow-hidden mb-4 group shadow-soft">
              <Image
                src={product.images[mainImageIndex]}
                alt={product.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700 brightness-105 saturate-110"
                priority
              />
              {product.badge && (
                <div className="absolute top-4 start-4">
                  <Badge variant="default" className="bg-accent text-accent-foreground rounded-full">
                    {product.badge}
                  </Badge>
                </div>
              )}
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setMainImageIndex(index)}
                    className={cn(
                      'relative h-20 sm:h-24 w-20 sm:w-24 flex-shrink-0 rounded-2xl overflow-hidden border-2 transition-all duration-300 shadow-soft hover:shadow-soft-lg',
                      mainImageIndex === index
                        ? 'border-foreground scale-105 ring-2 ring-primary/30'
                        : 'border-border hover:border-foreground/50'
                    )}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} view ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            {/* Title and Price */}
            <div className="mb-6">
              <h1 className="text-3xl sm:text-4xl font-serif font-bold text-foreground mb-4">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={cn(
                        'text-lg',
                        i < Math.floor(product.rating)
                          ? 'text-accent'
                          : 'text-border'
                      )}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  {product.rating} ({product.reviewCount} {t('reviews')})
                </span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-4">
                <span className="text-2xl sm:text-3xl font-semibold text-foreground">
                  {formatPrice(Math.round(product.price * 100))}
                </span>
                {product.originalPrice && (
                  <span className="text-lg text-muted-foreground line-through">
                    {formatPrice(Math.round(product.originalPrice * 100))}
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-base text-muted-foreground leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Divider */}
            <div className="border-t border-border my-6" />

            {/* Color Selector */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-foreground mb-3">
                {t('color')}: <span className="font-normal">{selectedColor?.name}</span>
              </h3>
              <div className="flex gap-3 flex-wrap">
                {product.colors.map((color) => (
                  <button
                    key={color.hex}
                    onClick={() => setSelectedColor(color)}
                    className={cn(
                      'relative w-10 h-10 rounded-full border-2 transition-all duration-300 shadow-soft hover:shadow-soft-lg',
                      selectedColor?.hex === color.hex
                        ? 'border-foreground scale-110 ring-2 ring-primary/30'
                        : 'border-border hover:border-foreground/50 hover:scale-105'
                    )}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                    aria-label={color.name}
                  >
                    {selectedColor?.hex === color.hex && (
                      <div className="absolute inset-0 rounded-full ring-2 ring-offset-1 ring-foreground" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selector */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-foreground mb-3">
                {t('size')}: <span className="font-normal">{selectedSize}</span>
              </h3>
              <div className="flex gap-3 flex-wrap">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={cn(
                      'px-4 py-2 rounded-full border-2 font-medium text-sm transition-all duration-300 shadow-soft hover:shadow-soft-lg',
                      selectedSize === size
                        ? 'bg-foreground text-background border-foreground scale-105'
                        : 'bg-background border-border text-foreground hover:border-foreground hover:scale-105'
                    )}
                  >
                    {size}
                  </button>
                ))}
              </div>
              <button className="text-xs text-muted-foreground hover:text-foreground underline mt-2 transition-colors">
                {t('size_guide')}
              </button>
            </div>

            {/* Quantity Selector */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-foreground mb-3">
                {t('quantity')}
              </h3>
              <div className="flex items-center border border-border rounded-full w-fit shadow-soft">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 hover:bg-secondary transition-all duration-300 rounded-l-full hover:scale-110"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-12 text-center border-x border-border bg-transparent outline-none"
                  min="1"
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 hover:bg-secondary transition-all duration-300 rounded-r-full hover:scale-110"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-border my-6" />

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mb-4">
              <Button
                size="lg"
                className="flex-1 font-semibold"
                onClick={handleAddToCart}
              >
                {t('add_to_bag')}
              </Button>
              <Button
                variant="outline"
                size="lg"
                className={cn(
                  'flex-1 font-semibold',
                  inWishlist && 'bg-red-50 border-red-200'
                )}
                onClick={handleWishlistToggle}
              >
                <Heart
                  className={cn(
                    'w-5 h-5 me-2',
                    inWishlist && 'fill-red-500 stroke-red-500'
                  )}
                />
                {inWishlist ? t('saved') : t('save')}
              </Button>
            </div>

            {/* Share Button */}
            <Button
              variant="ghost"
              className="w-full justify-center text-muted-foreground hover:text-foreground"
            >
              <Share2 className="w-4 h-4 me-2" />
              {t('share')}
            </Button>
          </div>
        </div>

        {/* Accordion Sections */}
        <div className="mb-16">
          <Accordion type="single" collapsible className="border-t border-border">
            {/* Product Details */}
            <AccordionItem value="details" className="border-b">
              <AccordionTrigger className="text-base font-semibold">
                {t('details')}
              </AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground space-y-4">
                <div>
                  <h4 className="font-semibold text-foreground mb-2">{t('fabric')}</h4>
                  <p>{product.details}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">{t('care_instructions')}</h4>
                  <ul className="list-disc list-inside space-y-1">
                    <li>{t('care_1')}</li>
                    <li>{t('care_2')}</li>
                    <li>{t('care_3')}</li>
                    <li>{t('care_4')}</li>
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Shipping & Returns */}
            <AccordionItem value="shipping" className="border-b">
              <AccordionTrigger className="text-base font-semibold">
                {t('shipping')}
              </AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground space-y-4">
                <div>
                  <h4 className="font-semibold text-foreground mb-2">{t('shipping_heading')}</h4>
                  <p>
                    {t('shipping_detail')}
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">{t('returns_heading')}</h4>
                  <p>
                    {t('returns_detail')}
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Reviews */}
            <AccordionItem value="reviews" className="border-b">
              <AccordionTrigger className="text-base font-semibold">
                {t('reviews')} ({product.reviewCount})
              </AccordionTrigger>
              <AccordionContent className="space-y-6">
                {SAMPLE_REVIEWS.map((review) => (
                  <div key={review.id} className="pb-6 border-b last:border-b-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-semibold text-foreground">{review.name}</h4>
                        <p className="text-xs text-muted-foreground">{review.date}</p>
                      </div>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <span
                            key={i}
                            className={cn(
                              'text-sm',
                              i < review.rating
                                ? 'text-accent'
                                : 'text-border'
                            )}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {review.text}
                    </p>
                  </div>
                ))}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* You May Also Like */}
        {relatedProducts.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground mb-8">
              {t('you_may_also_like')}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard
                  key={relatedProduct.id}
                  id={relatedProduct.id}
                  slug={relatedProduct.slug}
                  name={relatedProduct.name}
                  price={relatedProduct.price}
                  originalPrice={relatedProduct.originalPrice}
                  image={relatedProduct.images[0]}
                  secondImage={relatedProduct.images[1]}
                  colors={relatedProduct.colors}
                  sizes={relatedProduct.sizes}
                  isNew={relatedProduct.isNew}
                  badge={relatedProduct.badge}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
