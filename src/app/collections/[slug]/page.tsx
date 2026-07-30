import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import {
  collections,
  getCollectionById,
  getProductsByCollection,
} from '@/data/collections';
import ProductPageHeader from '@/components/layout/ProductPageHeader';

interface CollectionPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return collections.map((collection) => ({
    slug: collection.id,
  }));
}

export async function generateMetadata({ params }: CollectionPageProps) {
  const resolvedParams = await params;
  const collection = getCollectionById(resolvedParams.slug);

  if (!collection) {
    return {
      title: 'Collection Not Found',
    };
  }

  return {
    title: `${collection.title} | SHILPAKALE`,
    description: collection.description,
  };
}

export default async function CollectionPage({ params }: CollectionPageProps) {
  const resolvedParams = await params;
  const collection = getCollectionById(resolvedParams.slug);

  if (!collection) {
    notFound();
  }

  const collectionProducts = getProductsByCollection(collection.id);

  return (
    <>
      <ProductPageHeader />

      <main 
        className="w-full bg-[var(--ivory-archive)] min-h-screen"
        style={{
          paddingTop: 'clamp(3.5rem, 5vw, 4rem)',
        }}
      >
        {/* Collection Header */}
      <section className="w-full py-20 md:py-28 border-b" style={{ borderColor: 'rgba(11, 58, 47, 0.1)' }}>
        <div className="max-w-7xl mx-auto px-[5vw]">
          {/* Breadcrumb */}
          <nav className="mb-8" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-sm">
              <li>
                <Link
                  href="/"
                  className="hover:opacity-70 transition-opacity"
                  style={{ color: 'var(--heritage-green)' }}
                >
                  Home
                </Link>
              </li>
              <li style={{ color: 'var(--heritage-green)', opacity: 0.4 }}>/</li>
              <li>
                <Link
                  href="/collections"
                  className="hover:opacity-70 transition-opacity"
                  style={{ color: 'var(--heritage-green)' }}
                >
                  Collections
                </Link>
              </li>
              <li style={{ color: 'var(--heritage-green)', opacity: 0.4 }}>/</li>
              <li style={{ color: 'var(--heritage-green)', opacity: 0.6 }}>
                {collection.title}
              </li>
            </ol>
          </nav>

          {/* Collection Number */}
          <p
            className="text-xs md:text-sm uppercase mb-4 md:mb-6"
            style={{
              color: 'var(--heritage-green)',
              letterSpacing: '0.2em',
              opacity: 0.5,
            }}
          >
            {collection.number}
          </p>

          {/* Collection Title */}
          <h1
            className="text-4xl md:text-6xl lg:text-7xl mb-4 md:mb-6"
            style={{
              color: 'var(--heritage-green)',
              fontFamily: 'Georgia, serif',
              fontWeight: 400,
              lineHeight: 1.1,
            }}
          >
            {collection.title}
          </h1>

          {/* Collection Subtitle */}
          <p
            className="text-sm md:text-base uppercase mb-6 md:mb-8"
            style={{
              color: 'var(--archive-sage)',
              letterSpacing: '0.15em',
            }}
          >
            {collection.subtitle}
          </p>

          {/* Collection Description */}
          <div className="max-w-3xl">
            <p
              className="text-base md:text-lg mb-6"
              style={{
                color: 'var(--heritage-green)',
                opacity: 0.8,
                lineHeight: 1.6,
              }}
            >
              {collection.description}
            </p>

            {collection.longDescription && (
              <p
                className="text-base md:text-lg"
                style={{
                  color: 'var(--heritage-green)',
                  opacity: 0.7,
                  lineHeight: 1.7,
                }}
              >
                {collection.longDescription}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Products in Collection */}
      <section className="w-full py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-[5vw]">
          {/* Section Heading */}
          <h2
            className="text-2xl md:text-3xl mb-12 md:mb-16"
            style={{
              color: 'var(--heritage-green)',
              fontFamily: 'Georgia, serif',
              fontWeight: 400,
            }}
          >
            Objects in this collection
          </h2>

          {collectionProducts.length === 0 ? (
            /* Empty State */
            <div
              className="text-center py-20 border"
              style={{ borderColor: 'rgba(11, 58, 47, 0.1)' }}
            >
              <p
                className="text-base md:text-lg"
                style={{
                  color: 'var(--heritage-green)',
                  opacity: 0.6,
                }}
              >
                No products available in this collection yet.
              </p>
            </div>
          ) : (
            /* Product Grid */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12">
              {collectionProducts.map((product) => (
                <Link
                  key={product.id}
                  href={`/products/${product.id}`}
                  className="group block focus:outline-none focus:ring-2 focus:ring-[var(--heritage-green)] focus:ring-offset-4 focus:ring-offset-[var(--ivory-archive)]"
                >
                  {/* Image with Overlay Text */}
                  <div className="relative w-full aspect-square overflow-hidden bg-white rounded-lg">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />

                    {/* Text Overlay - Lower Left */}
                    <div
                      className="absolute bottom-0 left-0 right-0 p-6 md:p-8"
                      style={{
                        background:
                          'linear-gradient(to top, rgba(11, 58, 47, 0.85) 0%, rgba(11, 58, 47, 0.6) 50%, transparent 100%)',
                      }}
                    >
                      <h3
                        className="text-lg md:text-xl mb-1"
                        style={{
                          color: 'var(--ivory-archive)',
                          fontFamily: 'Georgia, serif',
                          fontWeight: 400,
                        }}
                      >
                        {product.name}
                      </h3>
                      <p
                        className="text-sm mb-2"
                        style={{
                          color: 'var(--ivory-archive)',
                          opacity: 0.9,
                        }}
                      >
                        {product.description}
                      </p>
                      <p
                        className="text-xs uppercase tracking-wider"
                        style={{
                          color: 'var(--ivory-archive)',
                          opacity: 0.75,
                          letterSpacing: '0.1em',
                        }}
                      >
                        CATEGORY: {product.category}
                      </p>
                    </div>
                  </div>

                  {/* Discover Link Below Image */}
                  <div
                    className="py-4 border-t mt-4"
                    style={{
                      borderColor: 'rgba(110, 139, 116, 0.15)',
                    }}
                  >
                    <span
                      className="text-sm uppercase tracking-wider group-hover:opacity-70 transition-opacity"
                      style={{
                        color: 'var(--heritage-green)',
                        letterSpacing: '0.1em',
                      }}
                    >
                      DISCOVER →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Back to Collections Link */}
      <section className="w-full pb-20 md:pb-28">
        <div className="max-w-7xl mx-auto px-[5vw]">
          <Link
            href="/collections"
            className="inline-flex items-center gap-2 text-sm uppercase tracking-wider hover:opacity-70 transition-opacity focus:outline-none focus:ring-2 focus:ring-[var(--heritage-green)] focus:ring-offset-2 focus:ring-offset-[var(--ivory-archive)] rounded px-4 py-2"
            style={{
              color: 'var(--heritage-green)',
              letterSpacing: '0.1em',
            }}
          >
            ← BACK TO ALL COLLECTIONS
          </Link>
        </div>
      </section>
    </main>
    </>
  );
}
