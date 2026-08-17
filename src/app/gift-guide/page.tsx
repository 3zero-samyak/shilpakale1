import Link from 'next/link';
import ProductPageHeader from '@/components/layout/ProductPageHeader';

export const metadata = {
  title: 'Gift Guide | SHILPAKALE',
  description: 'Choose a SHILPAKALE object according to the story, setting, and kind of ownership you want to offer.',
};

// Gift categories with product mappings
const giftSections = [
  {
    heading: 'FOR THE HISTORIAN',
    description:
      'Architectural models, fortification dioramas, and objects shaped by researched stories. For those who value narrative depth and documented heritage.',
    suggestedProducts: [
      'Aguada Fort Model',
      'Chapora Fortress Model',
      'Reis Magos Fort Model',
      'Cabo de Rama Fort Model',
    ],
  },
  {
    heading: 'FOR THE COLLECTOR',
    description:
      'Limited-edition dioramas, topographical forms, and architectural interpretations. For those who treat objects as archival possessions rather than casual decor.',
    suggestedProducts: [
      'Mandovi River Maritime Diorama',
      'Zuari River Maritime Diorama',
      'Western Ghats Topographical Model',
    ],
  },
  {
    heading: 'FOR THE ARCHITECT OR DESIGNER',
    description:
      'Scale models, spatial studies, and geometric forms that show how structure, material, and strategy are unified. For those who read objects as systems.',
    suggestedProducts: [
      'Aguada Fort Model',
      'Cabo de Rama Fort Model',
      'Mandovi River Maritime Diorama',
    ],
  },
  {
    heading: 'FOR THE HOME',
    description:
      'Functional objects shaped by domestic memory and inherited visual systems. Trays, coasters, and serving ware that balance use and considered form.',
    suggestedProducts: [
      'Heritage Tray — Classic Stone (White + Sage)',
      'Heritage Tray — Inverted Stone (Sage + White)',
      'Coaster Set — Stone',
    ],
  },
  {
    heading: 'FOR THE TRAVELER',
    description:
      'Objects that trace place, route, and movement. For those who understand travel as a way of reading geography, not just visiting destinations.',
    suggestedProducts: [
      'Mandovi River Maritime Diorama',
      'Zuari River Maritime Diorama',
      'Chapora Fortress Model',
    ],
  },
];

export default function GiftGuidePage() {
  return (
    <>
      <ProductPageHeader />

      <main
        style={{
          width: '100%',
          backgroundColor: 'var(--ivory-archive)',
          paddingTop: 'clamp(3.5rem, 5vw, 4rem)',
        }}
      >
        <article
          style={{
            width: '100%',
            maxWidth: '100rem',
            marginInline: 'auto',
            paddingBlock: 'clamp(4rem, 8vw, 8rem)',
            paddingInline: 'clamp(1.5rem, 7vw, 9rem)',
          }}
        >
          {/* Page Heading */}
          <h1
            style={{
              fontFamily: 'Georgia, serif',
              fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
              lineHeight: 1.1,
              letterSpacing: '-0.005em',
              color: 'var(--heritage-green)',
              fontWeight: 400,
              marginBottom: 'clamp(2rem, 4vw, 3rem)',
            }}
          >
            THE SHILPAKALE GIFT GUIDE
          </h1>

          {/* Supporting Copy */}
          <div
            style={{
              maxWidth: '58rem',
              marginBottom: 'clamp(4rem, 7vw, 6rem)',
            }}
          >
            <p
              style={{
                fontSize: 'clamp(1.1rem, 1.35vw, 1.3rem)',
                lineHeight: 1.6,
                color: 'var(--heritage-green)',
                opacity: 0.85,
              }}
            >
              Choose an object according to the story, setting, and kind of ownership you want to offer.
            </p>
          </div>

          {/* Gift Sections */}
          <div
            style={{
              maxWidth: '75rem',
              display: 'flex',
              flexDirection: 'column',
              gap: 'clamp(5rem, 8vw, 7rem)',
            }}
          >
            {giftSections.map((section, index) => (
              <section key={index}>
                {/* Section Heading */}
                <h2
                  style={{
                    fontFamily: 'var(--font-montserrat)',
                    fontSize: 'clamp(0.9rem, 1.05vw, 1rem)',
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: 'var(--heritage-green)',
                    fontWeight: 600,
                    marginBottom: '1.5rem',
                  }}
                >
                  {section.heading}
                </h2>

                {/* Section Description */}
                <p
                  style={{
                    fontSize: 'clamp(1.05rem, 1.22vw, 1.18rem)',
                    lineHeight: 1.7,
                    color: 'var(--heritage-green)',
                    opacity: 0.8,
                    marginBottom: 'clamp(2rem, 3vw, 2.5rem)',
                    maxWidth: '58rem',
                  }}
                >
                  {section.description}
                </p>

                {/* Suggested Products */}
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.75rem',
                  }}
                >
                  <p
                    style={{
                      fontFamily: 'var(--font-montserrat)',
                      fontSize: 'clamp(0.8rem, 0.92vw, 0.9rem)',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: 'var(--heritage-green)',
                      fontWeight: 500,
                      opacity: 0.7,
                    }}
                  >
                    Suggested Objects:
                  </p>
                  <ul
                    style={{
                      listStyle: 'none',
                      paddingLeft: 0,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.5rem',
                    }}
                  >
                    {section.suggestedProducts.map((product, productIndex) => (
                      <li
                        key={productIndex}
                        style={{
                          fontSize: 'clamp(1rem, 1.12vw, 1.08rem)',
                          lineHeight: 1.6,
                          color: 'var(--heritage-green)',
                          opacity: 0.85,
                          paddingLeft: '1.5rem',
                          position: 'relative',
                        }}
                      >
                        <span
                          style={{
                            position: 'absolute',
                            left: 0,
                            opacity: 0.5,
                          }}
                        >
                          •
                        </span>
                        {product}
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            ))}
          </div>

          {/* Call to Action */}
          <div
            style={{
              maxWidth: '58rem',
              marginTop: 'clamp(5rem, 8vw, 7rem)',
              paddingTop: 'clamp(3rem, 5vw, 4rem)',
              borderTop: '1px solid rgba(11, 58, 47, 0.15)',
              textAlign: 'center',
            }}
          >
            <Link
              href="/collections"
              style={{
                display: 'inline-flex',
                fontFamily: 'var(--font-montserrat)',
                fontSize: 'clamp(0.85rem, 1vw, 0.95rem)',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--heritage-green)',
                textDecoration: 'none',
                fontWeight: 500,
                borderBottom: '1px solid var(--heritage-green)',
                paddingBottom: '0.25rem',
              }}
            >
              EXPLORE THE COLLECTIONS →
            </Link>
          </div>

          {/* Note about availability */}
          <div
            style={{
              maxWidth: '58rem',
              marginTop: 'clamp(2rem, 3vw, 2.5rem)',
            }}
          >
            <p
              style={{
                fontSize: 'clamp(0.85rem, 0.95vw, 0.92rem)',
                lineHeight: 1.6,
                color: 'var(--heritage-green)',
                opacity: 0.6,
                fontStyle: 'italic',
                textAlign: 'center',
              }}
            >
              Product availability, pricing, and ordering will be enabled once the Shopify connection is complete.
            </p>
          </div>
        </article>
      </main>
    </>
  );
}
