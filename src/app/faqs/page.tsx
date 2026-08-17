import Link from 'next/link';
import ProductPageHeader from '@/components/layout/ProductPageHeader';

export const metadata = {
  title: 'Frequently Asked Questions | SHILPAKALE',
  description: 'Answers to common questions about SHILPAKALE objects, collections, materials, care, and orders.',
};

export default function FAQsPage() {
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
              marginBottom: 'clamp(4rem, 7vw, 6rem)',
            }}
          >
            FREQUENTLY ASKED QUESTIONS
          </h1>

          <div
            style={{
              maxWidth: '58rem',
              display: 'flex',
              flexDirection: 'column',
              gap: 'clamp(2.5rem, 4vw, 3.5rem)',
            }}
          >
            {/* Opening Copy */}
            <section>
              <p
                style={{
                  fontSize: 'clamp(1rem, 1.12vw, 1.08rem)',
                  lineHeight: 1.7,
                  color: 'var(--heritage-green)',
                  opacity: 0.95,
                }}
              >
                This page answers basic questions about SHILPAKALE products, materials, care, orders, and launch collection inquiries.
              </p>

              <p
                style={{
                  fontSize: 'clamp(1rem, 1.12vw, 1.08rem)',
                  lineHeight: 1.7,
                  color: 'var(--heritage-green)',
                  marginTop: '1rem',
                  opacity: 0.95,
                }}
              >
                For product-specific details, please visit the product page or contact us directly.
              </p>
            </section>

            {/* Product Questions */}
            <section>
              <h2
                style={{
                  fontFamily: 'var(--font-montserrat)',
                  fontSize: 'clamp(0.9rem, 1.05vw, 1rem)',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: 'var(--archive-sage)',
                  fontWeight: 600,
                  marginBottom: '1rem',
                }}
              >
                Product Questions
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 600, color: 'var(--heritage-green)', marginBottom: '0.5rem' }}>What is SHILPAKALE?</h3>
                  <p style={{ color: 'var(--heritage-green)', lineHeight: 1.7 }}>
                    SHILPAKALE is a heritage product studio shaping researched stories into collectible objects.

                    We begin with Indian heritage stories, with space for the archive to grow into wider stories of architecture, craft, landscape, water, time, and cultural memory.
                  </p>
                </div>

                <div>
                  <h3 style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 600, color: 'var(--heritage-green)', marginBottom: '0.5rem' }}>What kind of products do we make?</h3>
                  <p style={{ color: 'var(--heritage-green)', lineHeight: 1.7 }}>
                    We make story-led objects such as architecture models, shadow boxes, trays, coasters, holders, and functional tabletop pieces.

                    Each product begins with a researched story and is translated into physical form through design, 3D printing, and finishing.
                  </p>
                </div>

                <div>
                  <h3 style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 600, color: 'var(--heritage-green)', marginBottom: '0.5rem' }}>Are these exact replicas?</h3>
                  <p style={{ color: 'var(--heritage-green)', lineHeight: 1.7 }}>
                    No, not unless clearly stated.

                    SHILPAKALE products are interpretations. They are inspired by historical, architectural, craft, landscape, or cultural stories, but they do not claim to be exact replicas of original monuments or traditional craft objects.
                  </p>
                </div>
              </div>
            </section>

            {/* Material and Process Questions */}
            <section>
              <h2 style={{ fontFamily: 'var(--font-montserrat)', fontSize: 'clamp(0.9rem, 1.05vw, 1rem)', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--archive-sage)', fontWeight: 600, marginBottom: '1rem' }}>Material and Process Questions</h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 600, color: 'var(--heritage-green)', marginBottom: '0.5rem' }}>Are the products 3D printed?</h3>
                  <p style={{ color: 'var(--heritage-green)', lineHeight: 1.7 }}>Yes. SHILPAKALE products are 3D printed and finished.

                    The process allows us to translate stories into controlled forms, reliefs, surfaces, and product structures.
                  </p>
                </div>

                <div>
                  <h3 style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 600, color: 'var(--heritage-green)', marginBottom: '0.5rem' }}>Are they handmade?</h3>
                  <p style={{ color: 'var(--heritage-green)', lineHeight: 1.7 }}>The products are not handmade in the traditional craft sense.

                    They are digitally designed, 3D printed, and finished through a controlled studio process. Some finishing, assembly, surface treatment, or detailing may involve handwork depending on the product.
                  </p>
                </div>

                <div>
                  <h3 style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 600, color: 'var(--heritage-green)', marginBottom: '0.5rem' }}>Are they painted or finished?</h3>
                  <p style={{ color: 'var(--heritage-green)', lineHeight: 1.7 }}>Yes, products may be painted, finished, or surface-treated depending on the product design.

                    Final finish details will be mentioned on the individual product page.
                  </p>
                </div>
              </div>
            </section>

            {/* Care Questions */}
            <section>
              <h2 style={{ fontFamily: 'var(--font-montserrat)', fontSize: 'clamp(0.9rem, 1.05vw, 1rem)', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--archive-sage)', fontWeight: 600, marginBottom: '1rem' }}>Care Questions</h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 600, color: 'var(--heritage-green)', marginBottom: '0.5rem' }}>How do I clean the product?</h3>
                  <p style={{ color: 'var(--heritage-green)', lineHeight: 1.7 }}>Clean gently with a soft, dry cloth.

                    Avoid harsh cleaning liquids, scrubbing, or abrasive materials.
                  </p>
                </div>

                <div>
                  <h3 style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 600, color: 'var(--heritage-green)', marginBottom: '0.5rem' }}>Can it be washed?</h3>
                  <p style={{ color: 'var(--heritage-green)', lineHeight: 1.7 }}>Do not wash or soak the product unless a specific product care note says otherwise.

                    For tabletop or kitchen-adjacent products, wipe gently and keep dry after contact with moisture.
                  </p>
                </div>

                <div>
                  <h3 style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 600, color: 'var(--heritage-green)', marginBottom: '0.5rem' }}>Can it be kept outdoors?</h3>
                  <p style={{ color: 'var(--heritage-green)', lineHeight: 1.7 }}>Unless mentioned otherwise, SHILPAKALE products are intended for indoor use.

                    Avoid direct rain, prolonged sunlight, excessive heat, and rough handling.
                  </p>
                </div>
              </div>
            </section>

            {/* Customization Questions */}
            <section>
              <h2 style={{ fontFamily: 'var(--font-montserrat)', fontSize: 'clamp(0.9rem, 1.05vw, 1rem)', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--archive-sage)', fontWeight: 600, marginBottom: '1rem' }}>Customization Questions</h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 600, color: 'var(--heritage-green)', marginBottom: '0.5rem' }}>Do you take custom orders?</h3>
                  <p style={{ color: 'var(--heritage-green)', lineHeight: 1.7 }}>At the moment, SHILPAKALE is focused on its curated launch collection and does not take custom orders.

                    Selected custom or limited-request projects may open later, but for now, the focus is on maintaining quality, consistency, and story depth across the current collection.
                  </p>
                </div>
              </div>
            </section>

            {/* Order Questions */}
            <section>
              <h2 style={{ fontFamily: 'var(--font-montserrat)', fontSize: 'clamp(0.9rem, 1.05vw, 1rem)', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--archive-sage)', fontWeight: 600, marginBottom: '1rem' }}>Order Questions</h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 600, color: 'var(--heritage-green)', marginBottom: '0.5rem' }}>How can I order?</h3>
                  <p style={{ color: 'var(--heritage-green)', lineHeight: 1.7 }}>You can enquire through WhatsApp or the product inquiry flow on the website.

                    We will share product availability, price, delivery details, and the next step.
                  </p>
                </div>

                <div>
                  <h3 style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 600, color: 'var(--heritage-green)', marginBottom: '0.5rem' }}>How long does delivery take?</h3>
                  <p style={{ color: 'var(--heritage-green)', lineHeight: 1.7 }}>Delivery timelines will depend on product availability, finishing, packaging, and shipping location.

                    Final timelines will be shared during the inquiry or order process.
                  </p>
                </div>

                <div>
                  <h3 style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 600, color: 'var(--heritage-green)', marginBottom: '0.5rem' }}>Do you ship across India?</h3>
                  <p style={{ color: 'var(--heritage-green)', lineHeight: 1.7 }}>Shipping details will be confirmed before launch.

                    If shipping is available to your location, we will share the delivery process and cost clearly before confirming the order.
                  </p>
                </div>
              </div>
            </section>

            {/* Collector Circle / Token Questions */}
            <section>
              <h2 style={{ fontFamily: 'var(--font-montserrat)', fontSize: 'clamp(0.9rem, 1.05vw, 1rem)', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--archive-sage)', fontWeight: 600, marginBottom: '1rem' }}>Collector Circle / Token Questions</h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div>
                  <p style={{ color: 'var(--heritage-green)', lineHeight: 1.7 }}>
                    Collector Circle and token details are not part of the public FAQ.

                    If you receive a SHILPAKALE token with your product, scan the QR code or follow the private access instruction included with your package.

                    That page will explain the token, your current circle, and what opens next.
                  </p>
                </div>
              </div>
            </section>
          </div>

          {/* Still Have a Question */}
          <div
            style={{
              maxWidth: '58rem',
              marginTop: 'clamp(3rem, 5vw, 5rem)',
              paddingTop: 'clamp(2rem, 4vw, 3rem)',
              borderTop: '1px solid rgba(11, 58, 47, 0.08)',
              textAlign: 'center',
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-montserrat)',
                fontSize: 'clamp(1rem, 1.15vw, 1.1rem)',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--heritage-green)',
                fontWeight: 500,
                marginBottom: '1rem',
              }}
            >
              STILL HAVE A QUESTION?
            </p>
            <Link
              href="/contact"
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
              CONTACT US →
            </Link>
          </div>
        </article>
      </main>
    </>
  );
}
