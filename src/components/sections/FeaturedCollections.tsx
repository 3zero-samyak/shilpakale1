import Link from 'next/link';
import Image from 'next/image';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { getProductsByHandles } from '@/lib/shopify/products';

const FEATURED_HANDLES = [
  'light-in-stone',
  'the-subtractive-temple',
  'the-ghatika-yantra',
  'terrain-of-resistance',
  'ports-routes-power',
  'stone-river-and-empire',
  'the-chettinad-floor-archive',
  'the-four-faces-of-water',
  'the-floating-illusion',
];

export default async function FeaturedCollections() {
  const products = await getProductsByHandles(FEATURED_HANDLES);

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
          className="w-full flex flex-col items-center text-center gap-6 md:flex-row md:items-center md:justify-between md:gap-8 md:text-left"
          style={{
            maxWidth: '120rem',
            marginInline: 'auto',
            paddingInline: 'clamp(1.5rem, 5vw, 6rem)',
            paddingBlock: 'clamp(2rem, 4vw, 3.5rem)',
          }}
        >
          {/* Section Title - centered on mobile, left on desktop */}
          <ScrollReveal direction="left" distance={24} duration={900}>
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
          </ScrollReveal>

          {/* View Collection Link - centered on mobile, right on desktop */}
          <ScrollReveal direction="right" distance={24} duration={900} delay={100}>
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
          </ScrollReveal>
        </div>
      </div>

      {/* Cream Background Section with Subtitle and Product Grid */}
      <div className="w-full bg-[var(--ivory-archive)] py-12 md:py-16">
        {/* Subtitle */}
        <ScrollReveal direction="up" distance={32} duration={800} threshold={0.2}>
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
        </ScrollReveal>

        {/* Product Grid Container */}
        <div className="max-w-7xl mx-auto px-[5vw]">
          {/* Product Grid */}
          <div className="featured-products-grid">
            {products.slice(0, 9).map((product, index) => {
              return (
                <ScrollReveal
                  key={product.id}
                  direction="up"
                  distance={28}
                  duration={800}
                  delay={index * 70}
                  threshold={0.15}
                  className={index === 8 ? 'featured-product-grid-item--wide' : ''}
                >
                    <Link
                      href={`/products/${product.handle}`}
                    className="featured-product-card group"
                  >
                    {/* Image with Overlay Text */}
                    <div className="featured-product-card__image">
                      {product.featuredImage?.url ? (
                        <Image
                          src={product.featuredImage.url}
                          alt={product.featuredImage.altText ?? product.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      ) : null}
                      
                      {/* Text Overlay - Lower Section */}
                      <div className="featured-product-card__overlay">
                        <h3 className="featured-product-card__title">
                          {product.title}
                        </h3>
                        <p className="featured-product-card__description">
                          {product.description ?? ''}
                        </p>
                        
                        {/* Discover Link */}
                        <div className="featured-product-card__discover">
                          <span>DISCOVER →</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
