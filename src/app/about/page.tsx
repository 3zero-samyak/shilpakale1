import ProductPageHeader from '@/components/layout/ProductPageHeader';

export const metadata = {
  title: 'About Us | SHILPAKALE',
  description: 'SHILPAKALE traces researched histories and translates them into collectible physical forms.',
};

export default function AboutPage() {
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
            ABOUT SHILPAKALE
          </h1>

          {/* Main Statement */}
          <div
            style={{
              maxWidth: '58rem',
              marginBottom: 'clamp(4rem, 7vw, 6rem)',
            }}
          >
            <p
              style={{
                fontSize: 'clamp(1.2rem, 1.5vw, 1.45rem)',
                lineHeight: 1.5,
                color: 'var(--heritage-green)',
                fontWeight: 500,
              }}
            >
              SHILPAKALE traces researched histories and translates them into collectible physical forms.
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
            {/* What We Trace */}
            <section>
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
                WHAT WE TRACE
              </h2>
              <p
                style={{
                  fontSize: 'clamp(1.05rem, 1.22vw, 1.18rem)',
                  lineHeight: 1.7,
                  color: 'var(--heritage-green)',
                  opacity: 0.85,
                  marginBottom: '1.25rem',
                }}
              >
                SHILPAKALE begins with histories that are documented, located, and verified. We trace architectural systems, maritime routes, fortification strategies, water infrastructure, topographical formations, domestic material culture, and living traditions that have been studied and archived.
              </p>
              <p
                style={{
                  fontSize: 'clamp(1.05rem, 1.22vw, 1.18rem)',
                  lineHeight: 1.7,
                  color: 'var(--heritage-green)',
                  opacity: 0.85,
                }}
              >
                We do not romanticise, invent, or simplify. The stories and systems we reference are drawn from architectural surveys, historical records, geographic evidence, and material studies. What we trace must exist or must have existed.
              </p>
            </section>

            {/* How Stories Become Objects */}
            <section>
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
                HOW STORIES BECOME OBJECTS
              </h2>
              <p
                style={{
                  fontSize: 'clamp(1.05rem, 1.22vw, 1.18rem)',
                  lineHeight: 1.7,
                  color: 'var(--heritage-green)',
                  opacity: 0.85,
                  marginBottom: '1.25rem',
                }}
              >
                Translation is a design process. A researched history does not automatically become a product. It must be interpreted through form, material, scale, and function. This requires decisions about what to preserve, what to abstract, and what to remove.
              </p>
              <p
                style={{
                  fontSize: 'clamp(1.05rem, 1.22vw, 1.18rem)',
                  lineHeight: 1.7,
                  color: 'var(--heritage-green)',
                  opacity: 0.85,
                  marginBottom: '1.25rem',
                }}
              >
                SHILPAKALE objects may be architectural models, topographical dioramas, functional trays and coasters, or other forms that hold narrative and physical presence. They are not replicas unless specifically stated. They are interpretations designed to be read, placed, and owned as collectible physical forms.
              </p>
              <p
                style={{
                  fontSize: 'clamp(1.05rem, 1.22vw, 1.18rem)',
                  lineHeight: 1.7,
                  color: 'var(--heritage-green)',
                  opacity: 0.85,
                }}
              >
                The process uses digital modelling, 3D printing, surface finishing, and assembly. Each object is checked, cleaned, and prepared according to its material and intended setting.
              </p>
            </section>

            {/* Why Form Matters */}
            <section>
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
                WHY FORM MATTERS
              </h2>
              <p
                style={{
                  fontSize: 'clamp(1.05rem, 1.22vw, 1.18rem)',
                  lineHeight: 1.7,
                  color: 'var(--heritage-green)',
                  opacity: 0.85,
                  marginBottom: '1.25rem',
                }}
              >
                Form is not decoration. It is the outcome of systems, constraints, materials, and function. When an object is designed without understanding the systems that shaped its original form, it becomes pastiche.
              </p>
              <p
                style={{
                  fontSize: 'clamp(1.05rem, 1.22vw, 1.18rem)',
                  lineHeight: 1.7,
                  color: 'var(--heritage-green)',
                  opacity: 0.85,
                  marginBottom: '1.25rem',
                }}
              >
                SHILPAKALE objects preserve the logic that gave the original form meaning. A fortification model carries the proportions dictated by visibility and defence. A tray holds the geometric organisation inherited from domestic material culture. A diorama maps the relationship between landscape and strategy.
              </p>
              <p
                style={{
                  fontSize: 'clamp(1.05rem, 1.22vw, 1.18rem)',
                  lineHeight: 1.7,
                  color: 'var(--heritage-green)',
                  opacity: 0.85,
                }}
              >
                Form matters because it holds memory, strategy, and material intelligence. SHILPAKALE exists to preserve that through considered design and physical presence.
              </p>
            </section>

            {/* The Archive Ahead */}
            <section>
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
                THE ARCHIVE AHEAD
              </h2>
              <p
                style={{
                  fontSize: 'clamp(1.05rem, 1.22vw, 1.18rem)',
                  lineHeight: 1.7,
                  color: 'var(--heritage-green)',
                  opacity: 0.85,
                  marginBottom: '1.25rem',
                }}
              >
                SHILPAKALE is not a finished collection. It is an evolving archive built through continued research, design translation, and material exploration. Each object adds to a body of work that connects history, geography, and form.
              </p>
              <p
                style={{
                  fontSize: 'clamp(1.05rem, 1.22vw, 1.18rem)',
                  lineHeight: 1.7,
                  color: 'var(--heritage-green)',
                  opacity: 0.85,
                  marginBottom: '1.25rem',
                }}
              >
                New collections will trace different systems, regions, and material traditions. The approach remains the same: research first, design through interpretation, preserve through physical form.
              </p>
              <p
                style={{
                  fontSize: 'clamp(1.05rem, 1.22vw, 1.18rem)',
                  lineHeight: 1.7,
                  color: 'var(--heritage-green)',
                  opacity: 0.85,
                }}
              >
                What is built is meant to last. Not as decoration, but as collectible forms that hold narrative, craft, and civilizational intelligence.
              </p>
            </section>
          </div>
        </article>
      </main>
    </>
  );
}
