import Link from 'next/link';
import { notFound } from 'next/navigation';
import { products, getProductById, getCollectionById } from '@/data/collections';
import ProductPageHeader from '@/components/layout/ProductPageHeader';
import ProductPageContent from '@/components/product/ProductPageContent';

interface ProductPageProps {
  params: Promise<{
    handle: string;
  }>;
}

export async function generateStaticParams() {
  return products.map((product) => ({
    handle: product.id,
  }));
}

export async function generateMetadata({ params }: ProductPageProps) {
  const resolvedParams = await params;
  const product = getProductById(resolvedParams.handle);

  if (!product) {
    return {
      title: 'Product Not Found',
    };
  }

  return {
    title: `${product.name} | SHILPAKALE`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const resolvedParams = await params;
  const product = getProductById(resolvedParams.handle);

  if (!product) {
    notFound();
  }

  const collection = getCollectionById(product.collectionId);

  return (
    <>
      <ProductPageHeader />
      
      <main 
        className="w-full bg-[var(--ivory-archive)]"
        style={{
          paddingTop: 'clamp(3.5rem, 5vw, 4rem)',
        }}
      >
        {/* Collection Name and Enquire Row */}
        <div
          className="w-full border-b"
          style={{
            borderColor: 'rgba(11, 58, 47, 0.15)',
          }}
        >
          <div className="max-w-7xl mx-auto px-[5vw] py-4 md:py-5 flex items-center justify-between">
            {collection && (
              <Link
                href={`/collections/${product.collectionId}`}
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
              href="/contact?enquiry=product"
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
        <ProductPageContent product={product} />
      </main>
    </>
  );
}
