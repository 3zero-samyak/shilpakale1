import "server-only";
import { NextResponse } from 'next/server';
import { getProducts } from '@/lib/shopify/products';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get('q') || '';

  if (!q) {
    return NextResponse.json({ results: [] });
  }

  // Simple approach: fetch first 250 products and filter server-side
  const products = await getProducts(250);
  const query = q.toLowerCase();

  const results = products.filter((p) => {
    return (
      p.title.toLowerCase().includes(query) ||
      (p.description ?? '').toLowerCase().includes(query) ||
      p.handle.toLowerCase().includes(query) ||
      p.productType?.toLowerCase().includes(query) ||
      (p.metafields?.story_line ?? '').toLowerCase().includes(query)
    );
  }).slice(0, 50);

  return NextResponse.json({ results });
}
