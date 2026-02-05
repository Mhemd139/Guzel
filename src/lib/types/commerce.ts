export interface CartItem {
  productId: string;
  slug: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  color: { name: string; hex: string };
  size: string;
  quantity: number;
}

export interface WishlistItem {
  productId: string;
  slug: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  colors: { name: string; hex: string }[];
  sizes: string[];
  addedAt: string;
}

export interface PromoCode {
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
  minOrderAmount?: number;
  maxUses?: number;
  currentUses: number;
  expiresAt?: string;
  applicableCategories?: string[];
  isActive: boolean;
}

export interface ShippingMethod {
  id: string;
  name: string;
  description: string;
  price: number;
  estimatedDays: string;
  freeAbove?: number;
}

export interface ShippingAddress {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface OrderSummary {
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
  promoCode?: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  shipping: ShippingAddress;
  shippingMethod: ShippingMethod;
  summary: OrderSummary;
  promoCode?: string;
  status: 'pending' | 'paid' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentSessionId?: string;
  createdAt: string;
  updatedAt: string;
}
