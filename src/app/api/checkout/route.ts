import { NextResponse } from 'next/server';
import { z } from 'zod';
import { v4 as uuidv4 } from 'uuid';
import { getAllpayConfig, createAllpayPayment } from '@/lib/allpay/server';
import { validatePromoCode } from '@/lib/commerce/promo-codes';
import { shippingMethods, getShippingPrice } from '@/lib/commerce/shipping';
import { calculateTax } from '@/lib/commerce/utils';
import { createOrder } from '@/lib/commerce/order-store';
import type { Order } from '@/lib/types/commerce';

const cartItemSchema = z.object({
  productId: z.string(),
  slug: z.string(),
  name: z.string(),
  price: z.number().int().min(1),
  originalPrice: z.number().int().optional(),
  image: z.string(),
  color: z.object({ name: z.string(), hex: z.string() }),
  size: z.string(),
  quantity: z.number().int().min(1).max(10),
});

const shippingAddressSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(1),
  address1: z.string().min(1),
  address2: z.string().optional(),
  city: z.string().min(1),
  state: z.string().min(1),
  zipCode: z.string().min(1),
  country: z.string().min(1),
});

const checkoutSchema = z.object({
  items: z.array(cartItemSchema).min(1),
  shipping: shippingAddressSchema,
  shippingMethodId: z.string(),
  promoCode: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = checkoutSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid request data', details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { items, shipping, shippingMethodId, promoCode } = parsed.data;

    // Recalculate prices server-side
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    // Validate promo code server-side
    let discount = 0;
    let hasFreeShippingPromo = false;
    if (promoCode) {
      const promoResult = validatePromoCode(promoCode, subtotal);
      if (promoResult.valid) {
        discount = promoResult.discount;
        if (promoCode.toUpperCase() === 'FREESHIP') {
          hasFreeShippingPromo = true;
        }
      }
    }

    // Find shipping method
    const shippingMethod = shippingMethods.find((m) => m.id === shippingMethodId);
    if (!shippingMethod) {
      return NextResponse.json({ error: 'Invalid shipping method' }, { status: 400 });
    }

    const shippingCost = getShippingPrice(shippingMethod, subtotal, hasFreeShippingPromo);
    const taxableAmount = subtotal - discount;
    const tax = calculateTax(taxableAmount > 0 ? taxableAmount : 0);
    const total = subtotal - discount + shippingCost + tax;

    const orderId = uuidv4();

    const allpayConfig = getAllpayConfig();
    if (!allpayConfig) {
      return NextResponse.json(
        { error: 'Payment service not configured. Set ALLPAY_LOGIN and ALLPAY_API_KEY.' },
        { status: 503 }
      );
    }

    // Build line items for Allpay (prices in dollars, not cents)
    const allpayItems = items.map((item) => ({
      name: `${item.name} (${item.color.name} / ${item.size})`,
      price: Number((item.price / 100).toFixed(2)),
      qty: item.quantity,
      vat: 0,
    }));

    // Add shipping as a line item if applicable
    if (shippingCost > 0) {
      allpayItems.push({
        name: shippingMethod.name,
        price: Number((shippingCost / 100).toFixed(2)),
        qty: 1,
        vat: 0,
      });
    }

    // Add tax as a line item
    if (tax > 0) {
      allpayItems.push({
        name: 'Tax',
        price: Number((tax / 100).toFixed(2)),
        qty: 1,
        vat: 0,
      });
    }

    // Apply discount by adding a negative line item
    if (discount > 0) {
      allpayItems.push({
        name: `Discount (${promoCode?.toUpperCase()})`,
        price: -Number((discount / 100).toFixed(2)),
        qty: 1,
        vat: 0,
      });
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

    // Create Allpay payment session
    const result = await createAllpayPayment({
      login: allpayConfig.login,
      apiKey: allpayConfig.apiKey,
      orderId,
      items: allpayItems,
      currency: 'USD',
      customerName: `${shipping.firstName} ${shipping.lastName}`,
      customerEmail: shipping.email,
      customerPhone: shipping.phone,
      webhookUrl: `${baseUrl}/api/webhook`,
      successUrl: `${baseUrl}/checkout/success?session_id=${orderId}`,
    });

    if ('error' in result) {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }

    // Create order in store
    const order: Order = {
      id: orderId,
      items,
      shipping,
      shippingMethod,
      summary: {
        subtotal,
        discount,
        shipping: shippingCost,
        tax,
        total,
        promoCode,
      },
      promoCode,
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    createOrder(order);

    return NextResponse.json({ sessionId: orderId, url: result.payment_url });
  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
