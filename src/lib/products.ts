export interface Product {
  id: string;
  slug: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: string;
  description: string;
  details: string;
  images: string[];
  colors: { name: string; hex: string }[];
  sizes: string[];
  rating: number;
  reviewCount: number;
  isNew?: boolean;
  isBestseller?: boolean;
  badge?: string;
}

export const products: Product[] = [
  {
    id: '1',
    slug: 'sienna-wrap-dress',
    name: 'Sienna Wrap Dress',
    price: 185,
    category: 'Dresses',
    description: 'Elegant wrap dress in premium linen blend',
    details: 'Made from 60% linen, 40% cotton blend. Hand wash cold. Perfect for any occasion.',
    images: [
      'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=80',
      'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800&q=80',
    ],
    colors: [
      { name: 'Cream', hex: '#FFF8F0' },
      { name: 'Black', hex: '#1A1A1A' },
      { name: 'Taupe', hex: '#B8A89C' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    rating: 4.8,
    reviewCount: 124,
    isNew: true,
    badge: 'New',
  },
  {
    id: '2',
    slug: 'linen-blend-oversized-blazer',
    name: 'Linen Blend Oversized Blazer',
    price: 245,
    category: 'Outerwear',
    description: 'Structured yet relaxed blazer for modern styling',
    details: 'Linen blend with natural texture. Perfect layering piece. Dry clean recommended.',
    images: [
      'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800&q=80',
      'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?w=800&q=80',
    ],
    colors: [
      { name: 'Cream', hex: '#F5E6D3' },
      { name: 'Camel', hex: '#C4A87F' },
      { name: 'Charcoal', hex: '#2C2C2C' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    rating: 4.7,
    reviewCount: 89,
    isBestseller: true,
    badge: 'Bestseller',
  },
  {
    id: '3',
    slug: 'ribbed-cashmere-turtleneck',
    name: 'Ribbed Cashmere Turtleneck',
    price: 195,
    category: 'Tops & Blouses',
    description: 'Luxurious cashmere in timeless ribbed knit',
    details: '100% Pure Cashmere. Hand wash delicate. Naturally breathable and warm.',
    images: [
      'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=800&q=80',
      'https://images.unsplash.com/photo-1475180098004-ca77a66827be?w=800&q=80',
    ],
    colors: [
      { name: 'Ivory', hex: '#FFFFF0' },
      { name: 'Camel', hex: '#C4A87F' },
      { name: 'Sage', hex: '#A6B5A1' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    rating: 4.9,
    reviewCount: 167,
    isBestseller: true,
    badge: 'Bestseller',
  },
  {
    id: '4',
    slug: 'alta-midi-dress',
    name: 'Alta Midi Dress',
    price: 215,
    category: 'Dresses',
    description: 'Flowing midi dress with elegant draping',
    details: '100% Silk charmeuse. Dry clean only. Features subtle gathering details.',
    images: [
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80',
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800&q=80',
    ],
    colors: [
      { name: 'Sand', hex: '#E8D7C5' },
      { name: 'Rose', hex: '#D8A89F' },
      { name: 'Navy', hex: '#1B2B4E' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    rating: 4.6,
    reviewCount: 95,
    isNew: true,
  },
  {
    id: '5',
    slug: 'minimalist-leather-belt',
    name: 'Minimalist Leather Belt',
    price: 89,
    category: 'Accessories',
    description: 'Premium leather belt with sleek buckle',
    details: 'Genuine leather. Adjustable fit. Handcrafted in Italy.',
    images: [
      'https://images.unsplash.com/photo-1523779105320-d1cd346ff52b?w=800&q=80',
      'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=800&q=80',
    ],
    colors: [
      { name: 'Cognac', hex: '#8B4513' },
      { name: 'Black', hex: '#1A1A1A' },
      { name: 'Cream', hex: '#FFF8E7' },
    ],
    sizes: ['One Size'],
    rating: 4.7,
    reviewCount: 56,
  },
  {
    id: '6',
    slug: 'cropped-wide-leg-trousers',
    name: 'Cropped Wide-Leg Trousers',
    price: 168,
    category: 'Bottoms',
    description: 'Contemporary tailored trousers with modern silhouette',
    details: '85% Wool, 15% Polyester. Dry clean. Side zip closure with hidden hook.',
    images: [
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80',
      'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=800&q=80',
    ],
    colors: [
      { name: 'Black', hex: '#1A1A1A' },
      { name: 'Cream', hex: '#F5EFE5' },
      { name: 'Tobacco', hex: '#B47645' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    rating: 4.5,
    reviewCount: 78,
  },
  {
    id: '7',
    slug: 'essential-white-shirt',
    name: 'Essential White Shirt',
    price: 125,
    category: 'Tops & Blouses',
    description: 'Timeless white shirt - a wardrobe essential',
    details: '100% Premium cotton. Machine wash. Classic button-down collar.',
    images: [
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80',
      'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800&q=80',
    ],
    colors: [
      { name: 'White', hex: '#FFFFFF' },
      { name: 'Cream', hex: '#FFFEF5' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    rating: 4.8,
    reviewCount: 203,
    isBestseller: true,
    badge: 'Bestseller',
  },
  {
    id: '8',
    slug: 'elegant-trench-coat',
    name: 'Elegant Trench Coat',
    price: 345,
    category: 'Outerwear',
    description: 'Classic trench coat with refined details',
    details: '60% Cotton, 40% Polyester blend. Water resistant. Double-breasted design.',
    images: [
      'https://images.unsplash.com/photo-1548624313-0396c75e4b1a?w=800&q=80',
      'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800&q=80',
    ],
    colors: [
      { name: 'Camel', hex: '#C4A87F' },
      { name: 'Khaki', hex: '#D4A574' },
      { name: 'Black', hex: '#1A1A1A' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    rating: 4.9,
    reviewCount: 142,
    isNew: true,
  },
  {
    id: '9',
    slug: 'silk-square-scarf',
    name: 'Silk Square Scarf',
    price: 95,
    category: 'Accessories',
    description: 'Premium silk scarf with artistic print',
    details: '100% Pure silk twill. Hand rolled edges. Can be worn multiple ways.',
    images: [
      'https://images.unsplash.com/photo-1547949003-9792a18a2601?w=800&q=80',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    ],
    colors: [
      { name: 'Terracotta', hex: '#CD7F32' },
      { name: 'Sage', hex: '#A6B5A1' },
      { name: 'Navy', hex: '#1B2B4E' },
    ],
    sizes: ['One Size'],
    rating: 4.6,
    reviewCount: 67,
    isNew: true,
  },
  {
    id: '10',
    slug: 'high-waisted-straight-jeans',
    name: 'High-Waisted Straight Jeans',
    price: 148,
    category: 'Bottoms',
    description: 'Contemporary jeans with perfect fit and stretch',
    details: '98% Cotton, 2% Elastane. Machine wash. Classic five-pocket styling.',
    images: [
      'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=800&q=80',
      'https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?w=800&q=80',
    ],
    colors: [
      { name: 'Dark Indigo', hex: '#2C3E5F' },
      { name: 'Light Wash', hex: '#6B99B8' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    rating: 4.7,
    reviewCount: 184,
    isBestseller: true,
    badge: 'Bestseller',
  },
  {
    id: '11',
    slug: 'structured-tote-bag',
    name: 'Structured Tote Bag',
    price: 225,
    category: 'Accessories',
    description: 'Sophisticated leather tote for everyday elegance',
    details: 'Genuine Italian leather. Reinforced handles. Interior zip pocket.',
    images: [
      'https://images.unsplash.com/photo-1547949003-9792a18a2601?w=800&q=80',
      'https://images.unsplash.com/photo-1523779105320-d1cd346ff52b?w=800&q=80',
    ],
    colors: [
      { name: 'Cognac', hex: '#8B4513' },
      { name: 'Black', hex: '#1A1A1A' },
      { name: 'Cream', hex: '#FFF8E7' },
    ],
    sizes: ['One Size'],
    rating: 4.8,
    reviewCount: 98,
    isNew: true,
  },
  {
    id: '12',
    slug: 'minimalist-shift-dress',
    name: 'Minimalist Shift Dress',
    price: 155,
    category: 'Dresses',
    description: 'Simple yet sophisticated shift dress',
    details: '100% Linen. Minimal seams. Straight cut for comfortable wear.',
    images: [
      'https://images.unsplash.com/photo-1551803091-e20673f15770?w=800&q=80',
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=80',
    ],
    colors: [
      { name: 'Cream', hex: '#F5E6D3' },
      { name: 'Sand', hex: '#D2B59E' },
      { name: 'Charcoal', hex: '#2C2C2C' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    rating: 4.5,
    reviewCount: 61,
  },
  {
    id: '13',
    slug: 'cropped-knit-cardigan',
    name: 'Cropped Knit Cardigan',
    price: 139,
    category: 'Tops & Blouses',
    description: 'Fitted cardigan in soft cotton blend',
    details: '70% Cotton, 30% Nylon. Machine wash warm. Perfect layering piece.',
    images: [
      'https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&q=80',
      'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=800&q=80',
    ],
    colors: [
      { name: 'Cream', hex: '#F5EFE5' },
      { name: 'Rust', hex: '#B7664F' },
      { name: 'Sage', hex: '#A6B5A1' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    rating: 4.6,
    reviewCount: 82,
  },
  {
    id: '14',
    slug: 'tailored-wool-coat',
    name: 'Tailored Wool Coat',
    price: 395,
    category: 'Outerwear',
    description: 'Investment piece in premium wool blend',
    details: '80% Wool, 20% Cashmere. Dry clean. Lined interior for comfort.',
    images: [
      'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?w=800&q=80',
      'https://images.unsplash.com/photo-1548624313-0396c75e4b1a?w=800&q=80',
    ],
    colors: [
      { name: 'Black', hex: '#1A1A1A' },
      { name: 'Camel', hex: '#C4A87F' },
      { name: 'Chocolate', hex: '#6B4423' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    rating: 4.9,
    reviewCount: 73,
  },
  {
    id: '15',
    slug: 'leather-crossbody-bag',
    name: 'Leather Crossbody Bag',
    price: 185,
    category: 'Accessories',
    description: 'Compact crossbody in supple Italian leather',
    details: 'Genuine leather. Adjustable strap. Gold-toned hardware.',
    images: [
      'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=800&q=80',
      'https://images.unsplash.com/photo-1547949003-9792a18a2601?w=800&q=80',
    ],
    colors: [
      { name: 'Cognac', hex: '#8B4513' },
      { name: 'Black', hex: '#1A1A1A' },
      { name: 'Tan', hex: '#D4A574' },
    ],
    sizes: ['One Size'],
    rating: 4.7,
    reviewCount: 109,
    isBestseller: true,
    badge: 'Bestseller',
  },
  {
    id: '16',
    slug: 'oversized-linen-shirt',
    name: 'Oversized Linen Shirt',
    price: 145,
    category: 'Tops & Blouses',
    description: 'Relaxed linen shirt for effortless style',
    details: '100% Linen. Machine wash. Perfect for layering or standalone.',
    images: [
      'https://images.unsplash.com/photo-1475180098004-ca77a66827be?w=800&q=80',
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80',
    ],
    colors: [
      { name: 'Natural', hex: '#E8D9C5' },
      { name: 'Rust', hex: '#B7664F' },
      { name: 'Blue', hex: '#5B7A96' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    rating: 4.5,
    reviewCount: 73,
    isNew: true,
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((product) => product.category === category);
}

export function getNewArrivals(): Product[] {
  return products.filter((product) => product.isNew).slice(0, 8);
}

export function getBestsellers(): Product[] {
  return products.filter((product) => product.isBestseller).slice(0, 4);
}

export const categories = ['Dresses', 'Tops & Blouses', 'Bottoms', 'Outerwear', 'Accessories'];
