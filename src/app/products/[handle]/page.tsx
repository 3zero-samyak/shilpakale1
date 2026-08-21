import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProductByHandle } from '@/lib/shopify/products';
import { getCollectionByHandle } from '@/lib/shopify/collections';
import ProductPageHeader from '@/components/layout/ProductPageHeader';
import ProductPageContent from '@/components/product/ProductPageContent';
import type { ShopifyProduct } from '@/lib/shopify/types';

interface ProductPageProps {
  params: Promise<{
    handle: string;
  }>;
}

export async function generateStaticParams() {
  // Fetch all products from Shopify and return handles as params
  const products = await (await import('@/lib/shopify/products')).getProducts();
  return products.map((product) => ({ handle: product.handle }));
}

export async function generateMetadata({ params }: ProductPageProps) {
  const resolvedParams = await params;
  const product = await getProductByHandle(resolvedParams.handle);

  if (!product) {
    return { title: 'Product Not Found' };
  }

  return {
    title: `${product.title} | SHILPAKALE`,
    description: product.description ?? undefined,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const resolvedParams = await params;
  const product = await getProductByHandle(resolvedParams.handle);

  if (!product) {
    notFound();
  }

  // Derive collection if available
  const collectionHandle = product.collections?.[0]?.handle ?? null;
  const collection = collectionHandle ? await getCollectionByHandle(collectionHandle) : null;

  return (
    <>
      <ProductPageHeader />
      
      <main 
        className="w-full bg-[var(--ivory-archive)]"
        style={{
          // Match the fixed header height so content does not overlap the header
          paddingTop: 'clamp(5rem, 6.5vw, 6.5rem)',
        }}
      >
        {/* Collection Name and Enquire Row */}
        <div
          className="w-full border-b"
          style={{
            borderColor: 'rgba(11, 58, 47, 0.15)',
          }}
        >
          <div className="max-w-7xl mx-auto px-[5vw] py-4 md:py-5 flex items-center justify-between" style={{ minHeight: 'clamp(3.5rem, 5vw, 5.5rem)' }}>
            {collection && (
              <Link
                href={`/collections/${collection.handle}`}
                className="header-nav-link text-xs md:text-sm uppercase focus:outline-none focus:ring-2 focus:ring-[var(--heritage-green)] focus:ring-offset-2 focus:ring-offset-[var(--ivory-archive)]"
                style={{
                  color: 'var(--heritage-green)',
                  letterSpacing: '0.15em',
                  opacity: 0.7,
                }}
              >
                {collection.title}
              </Link>
            )}
            <Link
              href={`/enquire?product=${product.handle}`}
              className="header-nav-link text-xs md:text-sm uppercase tracking-wider focus:outline-none focus:ring-2 focus:ring-[var(--heritage-green)] focus:ring-offset-2 focus:ring-offset-[var(--ivory-archive)]"
              style={{
                color: 'var(--heritage-green)',
                letterSpacing: '0.1em',
              }}
            >
              ENQUIRE
            </Link>
          </div>
        </div>

        {/* Product Page Content */}
        <ProductPageContent product={product as ShopifyProduct} />
      </main>
    </>
  );
}
