import "server-only";
import { NextResponse } from 'next/server';
import { getAuthenticatedCustomer } from '@/lib/shopify/customer-account/client';
import { getProductByHandle } from '@/lib/shopify/products';
import { createEnquiryMetaobject } from '@/lib/shopify/admin/enquiries';
import type { EnquiryPersistenceInput } from '@/lib/shopify/admin/types';
import { sanitizeReturnTo } from '@/lib/safe-return';
import crypto from 'crypto';

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

    const { firstName, lastName, mobileNumber, suggestion, productHandle, source, enquiryType } = body;

    // Basic validation
    if (!firstName || !lastName || !mobileNumber || !suggestion) {
      return NextResponse.json({ error: 'invalid_payload', message: 'Missing required fields' }, { status: 400 });
    }

    const fn = String(firstName).trim();
    const ln = String(lastName).trim();
    const mobile = String(mobileNumber).trim();
    const msg = String(suggestion).trim();

    if (!fn || fn.length > 100) return NextResponse.json({ error: 'invalid_payload', message: 'Invalid first name' }, { status: 400 });
    if (!ln || ln.length > 100) return NextResponse.json({ error: 'invalid_payload', message: 'Invalid last name' }, { status: 400 });
    if (!mobile || mobile.length > 50) return NextResponse.json({ error: 'invalid_payload', message: 'Invalid mobile number' }, { status: 400 });
    if (!msg || msg.length < 10 || msg.length > 3000) return NextResponse.json({ error: 'invalid_payload', message: 'Invalid enquiry message length' }, { status: 400 });

    const ALLOWED_ENQUIRY_TYPES = ['Product Information', 'Availability', 'Customisation', 'Bulk / Corporate', 'Shipping', 'Other'];
    const etype = enquiryType ? String(enquiryType) : undefined;
    if (etype && !ALLOWED_ENQUIRY_TYPES.includes(etype)) return NextResponse.json({ error: 'invalid_payload', message: 'Invalid enquiry type' }, { status: 400 });

    let productGid: string | undefined = undefined;
    let product_handle: string | undefined = undefined;
    let product_title: string | undefined = undefined;
    if (productHandle) {
      const p = await getProductByHandle(String(productHandle));
      if (!p) return NextResponse.json({ error: 'invalid_product', message: 'Product not found' }, { status: 400 });
      productGid = p.id;
      product_handle = p.handle;
      product_title = p.title;
    }

    // At this stage we have a verified authenticated customer identity server-side in `auth.customer`.
    // Do not accept client-supplied email or customerId as authoritative.

    // Check Admin config presence early (client credentials required)
    if (!process.env.SHOPIFY_ADMIN_CLIENT_ID || !process.env.SHOPIFY_ADMIN_CLIENT_SECRET || !process.env.SHOPIFY_ADMIN_API_VERSION) {
      console.log('[enquiry] Shopify Admin persistence not configured');
      return NextResponse.json({ error: 'ENQUIRY_STORAGE_NOT_CONFIGURED' }, { status: 503 });
    }

    // Build sanitized source path when present
    let sourcePath: string | undefined = undefined;
    if (source && typeof source === 'string') {
      if (source.startsWith('product:')) {
        const sHandle = source.split(':', 2)[1];
        sourcePath = `/products/${encodeURIComponent(sHandle)}`;
      } else if (source.startsWith('/')) {
        sourcePath = sanitizeReturnTo(source);
      }
    }

    // Generate enquiry reference server-side
    const now = new Date();
    const ymd = now.toISOString().slice(0,10).replace(/-/g,'');
    const suffix = crypto.randomBytes(3).toString('hex').toUpperCase();
    const enquiryReference = `SK-ENQ-${ymd}-${suffix}`;

    // Derive authenticated customer identity
    const cust = auth.customer as { id?: string; emailAddress?: { emailAddress?: string } };
    const customerGid = String(cust.id);
    const customerEmail = String(cust.emailAddress?.emailAddress ?? '');

    // Build persistence input
    const persistenceInput: EnquiryPersistenceInput = {
      enquiryReference,
      customerGid,
      customerEmail,
      firstName: fn,
      lastName: ln,
      mobileNumber: mobile,
      message: msg,
      submittedAt: new Date().toISOString(),
      status: 'NEW',
      productGid,
      productHandle: product_handle,
      productTitle: product_title,
      enquiryType: etype,
      sourcePath,
    };

    // Persist via Admin API
    try {
      const result = await createEnquiryMetaobject(persistenceInput);
      if (!result.ok) {
        console.log('[enquiry] persistence failed: userErrors present');
        return NextResponse.json({ error: 'ENQUIRY_PERSISTENCE_FAILED' }, { status: 502 });
      }
      console.log('[enquiry] persistence succeeded');
      return NextResponse.json({ ok: true, enquiryReference }, { status: 200 });
    } catch (err) {
      // Detect missing admin config
      if (err instanceof Error && err.message === 'ADMIN_CONFIG_MISSING') {
        console.log('[enquiry] Shopify Admin persistence not configured');
        return NextResponse.json({ error: 'ENQUIRY_STORAGE_NOT_CONFIGURED' }, { status: 503 });
      }
      const msg = err instanceof Error ? err.message : String(err);
      console.log('[enquiry] persistence exception', msg);
      return NextResponse.json({ error: 'ENQUIRY_PERSISTENCE_FAILED' }, { status: 502 });
    }
  } catch {
    return NextResponse.json({ error: 'server_error' }, { status: 500 });
  }
}
