# Guzel - Women's Fashion E-Commerce Website

A modern, elegant e-commerce platform for a curated women's fashion boutique called Guzel. Built with Next.js 15, Tailwind CSS v4, and TypeScript.

## 🎨 Brand Overview

**Guzel** is a contemporary women's fashion brand targeting women aged 22-40 who value:
- **Curated Style**: Handpicked collections with editorial sensibility
- **Quality Fabrics**: Premium materials and sustainable production
- **Effortless Sophistication**: Minimal but warm aesthetic

**Brand Personality**: Refined but approachable, editorial but shoppable, minimal but warm.

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Fonts**:
  - Display: Cormorant Garamond
  - Body: DM Sans
- **State Management**: React Context (Cart & Wishlist)
- **Images**: Next.js Image component with Unsplash

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.tsx                 # Root layout with providers
│   ├── globals.css                # Global styles, color palette
│   ├── page.tsx                   # Homepage
│   ├── not-found.tsx              # 404 page
│   ├── error.tsx                  # Error boundary
│   ├── loading.tsx                # Loading skeleton
│   ├── about/
│   │   └── page.tsx               # About page
│   ├── contact/
│   │   └── page.tsx               # Contact page
│   ├── shop/
│   │   ├── page.tsx               # Shop/collection page with filters
│   │   └── [slug]/
│   │       └── page.tsx           # Product detail page
│   ├── cart/
│   │   └── page.tsx               # Shopping cart
│   └── wishlist/
│       └── page.tsx               # Wishlist
├── components/
│   ├── layout/
│   │   ├── header.tsx             # Navigation header
│   │   └── footer.tsx             # Footer
│   ├── sections/
│   │   ├── hero.tsx               # Hero section
│   │   ├── featured-categories.tsx
│   │   ├── new-arrivals-carousel.tsx
│   │   ├── editorial-banner.tsx
│   │   ├── bestsellers.tsx
│   │   ├── brand-values.tsx
│   │   ├── newsletter.tsx
│   │   └── instagram-grid.tsx
│   ├── products/
│   │   └── product-card.tsx       # Reusable product card
│   └── ui/                        # shadcn/ui components
├── lib/
│   ├── products.ts                # Product data & helpers
│   ├── contexts/
│   │   ├── cart-context.tsx       # Cart state management
│   │   └── wishlist-context.tsx   # Wishlist state management
│   └── utils.ts                   # Utility functions
└── public/
    ├── favicon.ico
    └── images/
```

## 🎨 Design System

### Color Palette (Warm, Elegant)
- **Primary**: Deep warm brown (#6B4423)
- **Secondary**: Soft cream (#F5EFE7)
- **Accent**: Terracotta/rose (#CD7F32)
- **Background**: Warm off-white (#FFFAF5)
- **Foreground**: Deep warm black (#1A1410)

### Typography
- **Display/Headings**: Cormorant Garamond (400-700 weights)
- **Body**: DM Sans (400-700 weights)

### Spacing
- Generous vertical padding between sections
- Consistent horizontal spacing
- Max-width container: 7xl (80rem)

## 📄 Pages

### Homepage (`/`)
- Announcement bar with rotating messages
- Hero section with CTAs
- Featured product categories
- New arrivals carousel
- Editorial banner (brand story)
- Bestsellers grid
- Brand values section
- Newsletter signup
- Instagram lifestyle grid

### Shop (`/shop`)
- Advanced filtering (Category, Size, Color, Price)
- Sort options (Newest, Price, Bestselling)
- Responsive product grid (2-4 columns)
- Active filter chips
- Load more pagination

### Product Detail (`/shop/[slug]`)
- Image gallery with thumbnails
- Color & size selectors
- Quantity selector
- Add to cart/wishlist
- Product details accordion
- Shipping & returns info
- Customer reviews
- Related products

### About (`/about`)
- Brand story narrative
- Mission & values
- Founder quote
- Behind-the-scenes gallery

### Contact (`/contact`)
- Contact form with validation
- Contact information
- FAQ accordion

### Cart (`/cart`)
- Cart items with quantity adjustment
- Order summary with shipping estimate
- Product recommendations

### Wishlist (`/wishlist`)
- Saved products grid
- Move to cart functionality
- Share wishlist

## 🚀 Getting Started

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
npm run start
```

Visit `http://localhost:3000`

## 🌐 Deployment

### Vercel (Recommended)
```bash
npx vercel
```

### Netlify
```bash
npm install -g netlify-cli
netlify deploy --prod
```

## ✨ Features

- ✅ Product filtering and sorting
- ✅ Shopping cart with context state
- ✅ Wishlist functionality
- ✅ Fully responsive design
- ✅ SEO optimized
- ✅ Accessibility compliant
- ✅ Fast page loads with Next.js optimization
- ✅ Professional editorial aesthetic

## 📱 Responsive Design

- Mobile (375px): Optimized touch, hamburger menu
- Tablet (768px): 2-column grids
- Desktop (1024px+): 3-4 column grids

## 🔄 State Management

- **Cart Context**: Manage shopping cart items
- **Wishlist Context**: Save favorite products
- Uses React state (no localStorage)

---

**Built with Next.js 15, Tailwind CSS v4, and TypeScript**
