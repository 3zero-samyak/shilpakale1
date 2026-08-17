import Link from 'next/link';
import ProductPageHeader from '@/components/layout/ProductPageHeader';

export const metadata = {
  title: 'Placing Objects with Intention | SHILPAKALE',
  description: 'Guidance on placing SHILPAKALE objects with considered attention to form, light, setting, and narrative presence.',
};

export default function DecorTipsPage() {
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
            PLACING OBJECTS WITH INTENTION
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
              SHILPAKALE objects are designed to be read as forms, not used as visual clutter. Placement should preserve their silhouette, detail, and narrative presence.
            </p>
          </div>

          {/* Sections */}
          <div
            style={{
              maxWidth: '58rem',
              display: 'flex',
              flexDirection: 'column',
              gap: 'clamp(3.5rem, 5vw, 4.5rem)',
            }}
          >
            {/* Section 1 */}
            <section>
              <h2
                style={{
                  fontFamily: 'var(--font-montserrat)',
                  fontSize: 'clamp(0.9rem, 1.05vw, 1rem)',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: 'var(--heritage-green)',
                  fontWeight: 600,
                  marginBottom: '1.5rem',
                }}
              >
                GIVE THE OBJECT SPACE
              </h2>
              <p
                style={{
                  fontSize: 'clamp(1.05rem, 1.22vw, 1.18rem)',
                  lineHeight: 1.7,
                  color: 'var(--heritage-green)',
                  opacity: 0.8,
                  marginBottom: '1rem',
                }}
              >
                Avoid placing SHILPAKALE objects in crowded arrangements. They should have enough surrounding space for their geometry and relief details to remain legible.
              </p>
              <p
                style={{
                  fontSize: 'clamp(1.05rem, 1.22vw, 1.18rem)',
                  lineHeight: 1.7,
                  color: 'var(--heritage-green)',
                  opacity: 0.8,
                }}
              >
                A shelf, mantelpiece, or dedicated surface works better than a cluttered side table. The object should be clearly visible without competing for attention.
              </p>
            </section>

            {/* Section 2 */}
            <section>
              <h2
                style={{
                  fontFamily: 'var(--font-montserrat)',
                  fontSize: 'clamp(0.9rem, 1.05vw, 1rem)',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: 'var(--heritage-green)',
                  fontWeight: 600,
                  marginBottom: '1.5rem',
                }}
              >
                USE CONTROLLED LIGHT
              </h2>
              <p
                style={{
                  fontSize: 'clamp(1.05rem, 1.22vw, 1.18rem)',
                  lineHeight: 1.7,
                  color: 'var(--heritage-green)',
                  opacity: 0.8,
                  marginBottom: '1rem',
                }}
              >
                Light reveals the depth, texture, and shadow of three-dimensional objects. Place architectural models and dioramas where natural or directed light can define their relief and geometry.
              </p>
              <p
                style={{
                  fontSize: 'clamp(1.05rem, 1.22vw, 1.18rem)',
                  lineHeight: 1.7,
                  color: 'var(--heritage-green)',
                  opacity: 0.8,
                }}
              >
                Avoid placing objects in completely flat or dim lighting. Side light, diffused daylight, or controlled accent lighting will enhance their form without distorting it.
              </p>
            </section>

            {/* Section 3 */}
            <section>
              <h2
                style={{
                  fontFamily: 'var(--font-montserrat)',
                  fontSize: 'clamp(0.9rem, 1.05vw, 1rem)',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: 'var(--heritage-green)',
                  fontWeight: 600,
                  marginBottom: '1.5rem',
                }}
              >
                BUILD A QUIET GROUPING
              </h2>
              <p
                style={{
                  fontSize: 'clamp(1.05rem, 1.22vw, 1.18rem)',
                  lineHeight: 1.7,
                  color: 'var(--heritage-green)',
                  opacity: 0.8,
                  marginBottom: '1rem',
                }}
              >
                If displaying multiple SHILPAKALE objects together, ensure they are grouped by scale, material, or narrative connection. Avoid random combinations that dilute their individual presence.
              </p>
              <p
                style={{
                  fontSize: 'clamp(1.05rem, 1.22vw, 1.18rem)',
                  lineHeight: 1.7,
                  color: 'var(--heritage-green)',
                  opacity: 0.8,
                }}
              >
                A pair of fort models or a set of maritime dioramas may be displayed together. Mixing unrelated objects reduces the clarity of each.
              </p>
            </section>

            {/* Section 4 */}
            <section>
              <h2
                style={{
                  fontFamily: 'var(--font-montserrat)',
                  fontSize: 'clamp(0.9rem, 1.05vw, 1rem)',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: 'var(--heritage-green)',
                  fontWeight: 600,
                  marginBottom: '1.5rem',
                }}
              >
                MATCH SCALE TO SURFACE
              </h2>
              <p
                style={{
                  fontSize: 'clamp(1.05rem, 1.22vw, 1.18rem)',
                  lineHeight: 1.7,
                  color: 'var(--heritage-green)',
                  opacity: 0.8,
                  marginBottom: '1rem',
                }}
              >
                Large dioramas and architectural models require surfaces that support their scale. A small coffee table may not provide adequate visual grounding for a topographical model.
              </p>
              <p
                style={{
                  fontSize: 'clamp(1.05rem, 1.22vw, 1.18rem)',
                  lineHeight: 1.7,
                  color: 'var(--heritage-green)',
                  opacity: 0.8,
                }}
              >
                Conversely, placing a small tray or coaster set on an oversized empty surface diminishes its presence. Match the object&apos;s scale to the supporting furniture or shelf.
              </p>
            </section>

            {/* Section 5 */}
            <section>
              <h2
                style={{
                  fontFamily: 'var(--font-montserrat)',
                  fontSize: 'clamp(0.9rem, 1.05vw, 1rem)',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: 'var(--heritage-green)',
                  fontWeight: 600,
                  marginBottom: '1.5rem',
                }}
              >
                KEEP FUNCTIONAL OBJECTS ACCESSIBLE
              </h2>
              <p
                style={{
                  fontSize: 'clamp(1.05rem, 1.22vw, 1.18rem)',
                  lineHeight: 1.7,
                  color: 'var(--heritage-green)',
                  opacity: 0.8,
                  marginBottom: '1rem',
                }}
              >
                Trays, coasters, and functional objects are designed to be used, not stored away. Place them where they can serve their intended purpose while remaining visually considered.
              </p>
              <p
                style={{
                  fontSize: 'clamp(1.05rem, 1.22vw, 1.18rem)',
                  lineHeight: 1.7,
                  color: 'var(--heritage-green)',
                  opacity: 0.8,
                }}
              >
                A tray may be used daily for serving or holding objects. A coaster set should be placed near seating where it can protect surfaces without being hidden.
              </p>
            </section>

            {/* Section 6 */}
            <section>
              <h2
                style={{
                  fontFamily: 'var(--font-montserrat)',
                  fontSize: 'clamp(0.9rem, 1.05vw, 1rem)',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: 'var(--heritage-green)',
                  fontWeight: 600,
                  marginBottom: '1.5rem',
                }}
              >
                PROTECT THE FINISH
              </h2>
              <p
                style={{
                  fontSize: 'clamp(1.05rem, 1.22vw, 1.18rem)',
                  lineHeight: 1.7,
                  color: 'var(--heritage-green)',
                  opacity: 0.8,
                  marginBottom: '1rem',
                }}
              >
                Keep objects away from direct heat sources, prolonged sunlight, moisture, and high-traffic areas where accidental damage may occur.
              </p>
              <p
                style={{
                  fontSize: 'clamp(1.05rem, 1.22vw, 1.18rem)',
                  lineHeight: 1.7,
                  color: 'var(--heritage-green)',
                  opacity: 0.8,
                }}
              >
                Surface finishes, painted details, and relief structures are durable but should be treated with care. Avoid placing heavy items on top of architectural models or dioramas.
              </p>
            </section>
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
        </article>
      </main>
    </>
  );
}
