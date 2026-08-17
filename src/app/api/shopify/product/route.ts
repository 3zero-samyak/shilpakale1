import "server-only";
import { NextResponse } from 'next/server';
import { getProductByHandle } from '@/lib/shopify/products';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const handle = searchParams.get('handle');

  if (!handle) return NextResponse.json({ product: null });

  const product = await getProductByHandle(handle);
  return NextResponse.json({ product });
}
