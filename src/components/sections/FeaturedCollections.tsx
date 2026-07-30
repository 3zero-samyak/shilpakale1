import Link from 'next/link';
import Image from 'next/image';
import { products } from '@/data/collections';

export default function FeaturedCollections() {
  return (
    <section
      className="w-full bg-[var(--ivory-archive)] py-20 md:py-28"
      style={{ minHeight: '75svh' }}
    >
      {/* Full-Width Section Header */}
      <div
        className="w-full pb-8 mb-12 md:mb-16 border-b"
        style={{
          backgroundColor: 'var(--heritage-green)',
          borderColor: 'rgba(253, 246, 227, 0.2)',
        }}
      >
        <div className="max-w-7xl mx-auto px-[5vw] py-6 flex items-center justify-between">
          {/* Left: Section Title */}
          <h2
            className="text-xs md:text-sm uppercase"
            style={{
              color: 'var(--ivory-archive)',
              letterSpacing: '0.2em',
            }}
          >
            FEATURED COLLECTIONS
          </h2>

          {/* Right: View Collection Link */}
          <Link
            href="/collections"
            className="text-xs md:text-sm uppercase tracking-wider hover:opacity-70 transition-opacity focus:outline-none focus:ring-2 focus:ring-[var(--ivory-archive)] focus:ring-offset-2 focus:ring-offset-[var(--heritage-green)] rounded px-2 py-1"
            style={{
              color: 'var(--ivory-archive)',
              letterSpacing: '0.15em',
            }}
          >
            VIEW COLLECTION
          </Link>
        </div>
      </div>

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
    </section>
  );
}
