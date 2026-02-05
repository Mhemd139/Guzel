import { NextResponse } from 'next/server';
import { getAllpayConfig, verifyWebhookSignature } from '@/lib/allpay/server';
import { updateOrderStatus } from '@/lib/commerce/order-store';

export async function POST(req: Request) {
  const allpayConfig = getAllpayConfig();
  if (!allpayConfig) {
    return NextResponse.json({ error: 'Payment not configured' }, { status: 503 });
  }

  let payload: Record<string, unknown>;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }

  // Verify Allpay signature
  const isValid = verifyWebhookSignature(payload, allpayConfig.apiKey);
  if (!isValid) {
    console.error('Webhook signature verification failed');
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  const orderId = payload.order_id as string;
  const status = payload.status as number;

  if (!orderId) {
    return NextResponse.json({ error: 'Missing order_id' }, { status: 400 });
  }

  // status 1 = paid, 0 = unpaid
  if (status === 1) {
    updateOrderStatus(orderId, 'paid');
    console.log('Payment successful for order:', orderId);
  } else {
    console.log('Payment not completed for order:', orderId, 'status:', status);
  }

  return NextResponse.json({ received: true });
}
