import { PromoCode } from '@/lib/types/commerce';

export const promoCodes: PromoCode[] = [
  {
    code: 'WELCOME15',
    type: 'percentage',
    value: 15,
    minOrderAmount: 5000,
    maxUses: 1000,
    currentUses: 42,
    isActive: true,
  },
  {
    code: 'SPRING10',
    type: 'fixed',
    value: 1000,
    minOrderAmount: 7500,
    isActive: true,
    currentUses: 0,
  },
  {
    code: 'FREESHIP',
    type: 'fixed',
    value: 0,
    isActive: true,
    currentUses: 0,
  },
  {
    code: 'VIP25',
    type: 'percentage',
    value: 25,
    minOrderAmount: 15000,
    expiresAt: '2026-12-31T23:59:59Z',
    isActive: true,
    currentUses: 0,
  },
];

export function validatePromoCode(
  code: string,
  subtotalCents: number
): { valid: boolean; discount: number; type?: string; message: string } {
  const promo = promoCodes.find(
    (p) => p.code.toUpperCase() === code.toUpperCase()
  );

  if (!promo) {
    return { valid: false, discount: 0, message: 'Invalid promo code' };
  }

  if (!promo.isActive) {
    return { valid: false, discount: 0, message: 'This promo code is no longer active' };
  }

  if (promo.expiresAt && new Date(promo.expiresAt) < new Date()) {
    return { valid: false, discount: 0, message: 'This promo code has expired' };
  }

  if (promo.maxUses && promo.currentUses >= promo.maxUses) {
    return { valid: false, discount: 0, message: 'This promo code has reached its usage limit' };
  }

  if (promo.minOrderAmount && subtotalCents < promo.minOrderAmount) {
    return {
      valid: false,
      discount: 0,
      message: `Minimum order of ${formatCents(promo.minOrderAmount)} required`,
    };
  }

  let discount = 0;
  if (promo.type === 'percentage') {
    discount = Math.round(subtotalCents * (promo.value / 100));
  } else {
    discount = promo.value;
  }

  return {
    valid: true,
    discount,
    type: promo.type,
    message: `Promo applied! You save ${formatCents(discount)}`,
  };
}

function formatCents(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}
