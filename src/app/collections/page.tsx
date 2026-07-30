import Link from 'next/link';
import { collections } from '@/data/collections';
import ProductPageHeader from '@/components/layout/ProductPageHeader';

export const metadata = {
  title: 'Master Collections | SHILPAKALE',
  description: 'Six Collections of Civilizational Intelligence — exploring built systems, landscapes of power, sovereign systems, cosmic measurements, material making, and living traditions.',
};

export default function CollectionsPage() {
  return (
    <>
      <ProductPageHeader />

      <main 
        className="w-full"
        style={{
          paddingTop: 'clamp(3.5rem, 5vw, 4rem)',
          backgroundColor: 'var(--ivory-archive)',
          minHeight: '100svh',
        }}
      >
        <div className="max-w-7xl mx-auto px-[5vw] py-20 md:py-28">
          {/* Heading Block */}
          <div className="mb-16 md:mb-20 max-w-4xl">
            {/* Eyebrow */}
            <p
              className="text-xs md:text-sm uppercase mb-4 md:mb-6"
              style={{
                color: 'var(--archive-sage)',
                letterSpacing: '0.2em',
                opacity: 0.9,
              }}
            >
              MASTER COLLECTIONS
            </p>

            {/* Main Heading */}
            <h1
              className="text-3xl md:text-5xl lg:text-6xl"
              style={{
                color: 'var(--heritage-green)',
                fontFamily: 'Georgia, serif',
                fontWeight: 400,
                lineHeight: 1.2,
              }}
            >
              Six Collections of Civilizational Intelligence
            </h1>
          </div>

          {/* Collections Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12">
            {collections.map((collection) => (
              <Link
                key={collection.id}
                href={`/collections/${collection.id}`}
                className="group block border rounded-sm transition-colors duration-300 hover:bg-[rgba(11,58,47,0.04)] focus:outline-none focus:ring-2 focus:ring-[var(--heritage-green)] focus:ring-offset-4 focus:ring-offset-[var(--ivory-archive)]"
                style={{
                  borderColor: 'rgba(11, 58, 47, 0.15)',
                }}
              >
                <div className="p-8 md:p-10">
                  {/* Collection Number */}
                  <p
                    className="text-xs uppercase mb-4"
                    style={{
                      color: 'var(--archive-sage)',
                      letterSpacing: '0.2em',
                      opacity: 0.8,
                    }}
                  >
                    {collection.number}
                  </p>

                  {/* Collection Title */}
                  <h2
                    className="text-2xl md:text-3xl mb-3 group-hover:opacity-80 transition-opacity"
                    style={{
                      color: 'var(--heritage-green)',
                      fontFamily: 'Georgia, serif',
                      fontWeight: 400,
                      lineHeight: 1.2,
                    }}
                  >
                    {collection.title}
                  </h2>

                  {/* Collection Subtitle */}
                  <p
                    className="text-xs uppercase mb-4"
                    style={{
                      color: 'var(--archive-sage)',
                      letterSpacing: '0.15em',
                    }}
                  >
                    {collection.subtitle}
                  </p>

                  {/* Collection Description */}
                  <p
                    className="text-sm leading-relaxed"
                    style={{
                      color: 'var(--heritage-green)',
                      opacity: 0.7,
                      lineHeight: 1.6,
                    }}
                  >
                    {collection.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
