import Link from 'next/link';
import Image from 'next/image';
import { products } from '@/data/collections';

export default function FeaturedCollections() {
  return (
    <section className="w-full" style={{ minHeight: '75svh' }}>
      {/* Full-Width Heritage Green Heading Band */}
      <div
        className="w-full"
        style={{
          backgroundColor: 'var(--heritage-green)',
        }}
      >
        <div
          style={{
            width: '100%',
            maxWidth: '120rem',
            marginInline: 'auto',
            paddingInline: 'clamp(1.5rem, 5vw, 6rem)',
            paddingBlock: 'clamp(2rem, 4vw, 3.5rem)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '2rem',
            flexWrap: 'wrap',
          }}
        >
          {/* Left: Section Title */}
          <h2
            className="uppercase"
            style={{
              color: 'var(--ivory-archive)',
              fontSize: 'clamp(0.78rem, 1.15vw, 1.05rem)',
              letterSpacing: 'clamp(0.14em, 0.25vw, 0.22em)',
              lineHeight: 1.2,
            }}
          >
            FEATURED COLLECTIONS
          </h2>

          {/* Right: View Collection Link */}
          <Link
            href="/collections"
            className="featured-collections-link uppercase"
            style={{
              fontSize: 'clamp(0.78rem, 1.15vw, 1.05rem)',
              letterSpacing: 'clamp(0.14em, 0.25vw, 0.22em)',
              lineHeight: 1.2,
            }}
          >
            VIEW COLLECTION
          </Link>
        </div>
      </div>

      {/* Cream Background Section with Subtitle and Product Grid */}
      <div className="w-full bg-[var(--ivory-archive)] py-12 md:py-16">
        {/* Subtitle */}
        <div className="max-w-7xl mx-auto px-[5vw] mb-12 md:mb-16">
          <p
            className="text-center text-base md:text-lg"
            style={{
              color: 'var(--heritage-green)',
              fontFamily: 'Georgia, serif',
              fontStyle: 'italic',
            }}
          >
            Monuments, personalities, culture — crafted with love.
          </p>
        </div>

        {/* Product Grid Container */}
        <div className="max-w-7xl mx-auto px-[5vw]">
        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 lg:gap-12">
          {/* First 8 products in 2-column grid */}
          {products.slice(0, 8).map((product) => (
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
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                
                {/* Text Overlay - Lower Left */}
                <div
                  className="absolute bottom-0 left-0 right-0 p-6 md:p-8"
                  style={{
                    background: 'linear-gradient(to top, rgba(11, 58, 47, 0.85) 0%, rgba(11, 58, 47, 0.6) 50%, transparent 100%)',
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

          {/* 9th Product: Full Width with Rounded Edges */}
          <Link
            href={`/products/${products[8].id}`}
            className="group block md:col-span-2 focus:outline-none focus:ring-2 focus:ring-[var(--heritage-green)] focus:ring-offset-4 focus:ring-offset-[var(--ivory-archive)]"
          >
            {/* Image with Overlay Text */}
            <div className="relative w-full aspect-[2/1] overflow-hidden bg-white rounded-lg">
              <Image
                src={products[8].image}
                alt={products[8].name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 100vw"
              />
              
              {/* Text Overlay - Lower Left */}
              <div
                className="absolute bottom-0 left-0 right-0 p-6 md:p-8"
                style={{
                  background: 'linear-gradient(to top, rgba(11, 58, 47, 0.85) 0%, rgba(11, 58, 47, 0.6) 50%, transparent 100%)',
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
                  {products[8].name}
                </h3>
                <p
                  className="text-sm mb-2"
                  style={{
                    color: 'var(--ivory-archive)',
                    opacity: 0.9,
                  }}
                >
                  {products[8].description}
                </p>
                <p
                  className="text-xs uppercase tracking-wider"
                  style={{
                    color: 'var(--ivory-archive)',
                    opacity: 0.75,
                    letterSpacing: '0.1em',
                  }}
                >
                  CATEGORY: {products[8].category}
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
        </div>
      </div>
      </div>
    </section>
  );
}
