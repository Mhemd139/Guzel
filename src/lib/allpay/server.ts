import crypto from 'crypto';

const ALLPAY_API_URL = 'https://allpay.to/app/?show=getpayment&mode=api10';

export function getAllpayConfig() {
  const login = process.env.ALLPAY_LOGIN;
  const apiKey = process.env.ALLPAY_API_KEY;
  if (!login || !apiKey) {
    return null;
  }
  return { login, apiKey };
}

/**
 * Generate Allpay SHA256 signature.
 * 1. Remove 'sign' param and empty-value fields
 * 2. Sort keys alphabetically (including nested)
 * 3. Extract values only, join with colons
 * 4. Append API key after final colon
 * 5. SHA256 hash
 */
export function generateSignature(
  params: Record<string, unknown>,
  apiKey: string
): string {
  const values = extractSortedValues(params);
  const signString = values.join(':') + ':' + apiKey;
  return crypto.createHash('sha256').update(signString).digest('hex');
}

function extractSortedValues(obj: Record<string, unknown>): string[] {
  const values: string[] = [];
  const sortedKeys = Object.keys(obj)
    .filter((key) => key !== 'sign' && obj[key] !== '' && obj[key] !== undefined && obj[key] !== null)
    .sort();

  for (const key of sortedKeys) {
    const val = obj[key];
    if (Array.isArray(val)) {
      for (const item of val) {
        if (typeof item === 'object' && item !== null) {
          values.push(...extractSortedValues(item as Record<string, unknown>));
        } else {
          values.push(String(item));
        }
      }
    } else if (typeof val === 'object' && val !== null) {
      values.push(...extractSortedValues(val as Record<string, unknown>));
    } else {
      values.push(String(val));
    }
  }

  return values;
}

/**
 * Verify incoming webhook signature from Allpay.
 */
export function verifyWebhookSignature(
  payload: Record<string, unknown>,
  apiKey: string
): boolean {
  const receivedSign = payload.sign as string;
  if (!receivedSign) return false;

  const computed = generateSignature(payload, apiKey);
  return computed === receivedSign;
}

interface AllpayItem {
  name: string;
  price: number;
  qty: number;
  vat: number;
}

interface CreatePaymentParams {
  login: string;
  apiKey: string;
  orderId: string;
  items: AllpayItem[];
  currency?: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  webhookUrl: string;
  successUrl: string;
}

/**
 * Create a payment session with Allpay and get the payment URL.
 */
export async function createAllpayPayment(params: CreatePaymentParams): Promise<{ payment_url: string } | { error: string }> {
  const requestBody: Record<string, unknown> = {
    login: params.login,
    order_id: params.orderId,
    items: params.items,
    currency: params.currency || 'USD',
    client_name: params.customerName,
    client_email: params.customerEmail,
    client_phone: params.customerPhone,
    webhook_url: params.webhookUrl,
    success_url: params.successUrl,
  };

  // Generate signature
  requestBody.sign = generateSignature(requestBody, params.apiKey);

  const res = await fetch(ALLPAY_API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(requestBody),
  });

  const data = await res.json();

  if (data.payment_url) {
    return { payment_url: data.payment_url };
  }

  return { error: data.error || 'Failed to create payment session' };
}
