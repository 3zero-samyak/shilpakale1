import "server-only";
import { NextResponse } from 'next/server';
import { getAuthenticatedCustomer } from '@/lib/shopify/customer-account/client';
import { getProductByHandle } from '@/lib/shopify/products';

export async function POST(req: Request) {
  try {
    const origin = req.headers.get('origin');
    const expectedOrigin = process.env.NEXT_PUBLIC_APP_URL || 'https://shilpakale.vercel.app';
    if (process.env.NODE_ENV === 'production' && origin && origin !== expectedOrigin) {
      return NextResponse.json({ error: 'invalid_origin' }, { status: 403 });
    }

    const auth = await getAuthenticatedCustomer();
    if (auth.status === 'unauthenticated') return NextResponse.json({ error: 'unauthenticated' }, { status: 401 });
    if (auth.status === 'api_error') return NextResponse.json({ error: 'customer_api_error' }, { status: 503 });

    const body = await req.json().catch(() => null);
    if (!body) return NextResponse.json({ error: 'invalid_body' }, { status: 400 });

    const { firstName, lastName, mobileNumber, suggestion, productHandle } = body;
    if (!firstName || !lastName || !mobileNumber || !suggestion) {
      return NextResponse.json({ error: 'invalid_payload', message: 'Missing required fields' }, { status: 400 });
    }
    if (typeof suggestion !== 'string' || suggestion.length > 3000) {
      return NextResponse.json({ error: 'invalid_payload', message: 'Invalid suggestion length' }, { status: 400 });
    }

    if (productHandle) {
      const p = await getProductByHandle(productHandle);
      if (!p) return NextResponse.json({ error: 'invalid_product', message: 'Product not found' }, { status: 400 });
    }

    // At this stage we have a verified authenticated customer identity server-side in `auth.customer`.
    // Do not accept client-supplied email as authoritative. Use server-side identity when persistence is implemented.

    // Persistence not configured yet — respond with explicit typed status
    return NextResponse.json({ error: 'ENQUIRY_STORAGE_NOT_CONFIGURED' }, { status: 501 });
  } catch {
    return NextResponse.json({ error: 'server_error' }, { status: 500 });
  }
}
