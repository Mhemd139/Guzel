import { NextResponse } from 'next/server';
import { z } from 'zod';
import { validatePromoCode } from '@/lib/commerce/promo-codes';

const schema = z.object({
  code: z.string().min(1),
  subtotal: z.number().int().min(0),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { valid: false, message: 'Invalid request' },
        { status: 400 }
      );
    }

    const { code, subtotal } = parsed.data;
    const result = validatePromoCode(code, subtotal);

    return NextResponse.json(result);
  } catch {
    return NextResponse.json(
      { valid: false, message: 'Server error' },
      { status: 500 }
    );
  }
}
