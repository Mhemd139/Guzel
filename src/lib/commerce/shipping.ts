import { ShippingMethod } from '@/lib/types/commerce';

export const shippingMethods: ShippingMethod[] = [
  {
    id: 'standard',
    name: 'Standard Shipping',
    description: 'Delivered by postal service',
    price: 799,
    estimatedDays: '5-7 business days',
    freeAbove: 15000,
  },
  {
    id: 'express',
    name: 'Express Shipping',
    description: 'Priority delivery',
    price: 1499,
    estimatedDays: '2-3 business days',
    freeAbove: 25000,
  },
  {
    id: 'overnight',
    name: 'Next Day Delivery',
    description: 'Order by 2PM for next day',
    price: 2499,
    estimatedDays: '1 business day',
  },
];

export function getShippingPrice(
  method: ShippingMethod,
  subtotal: number,
  hasFreeShippingPromo: boolean
): number {
  if (hasFreeShippingPromo) return 0;
  if (method.freeAbove && subtotal >= method.freeAbove) return 0;
  return method.price;
}
