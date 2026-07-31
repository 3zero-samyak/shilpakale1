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
              letterSpacing: '-0.02em',
              color: 'var(--heritage-green)',
              fontWeight: 400,
              marginBottom: 'clamp(4rem, 7vw, 6rem)',
            }}
          >
            FREQUENTLY ASKED QUESTIONS
          </h1>

          {/* FAQ Sections */}
          <div
            style={{
              maxWidth: '58rem',
              display: 'flex',
              flexDirection: 'column',
              gap: 'clamp(4rem, 6vw, 5rem)',
            }}
          >
            {/* About SHILPAKALE */}
            <section>
              <h2
                style={{
                  fontFamily: 'var(--font-montserrat)',
                  fontSize: 'clamp(0.9rem, 1.05vw, 1rem)',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: 'var(--archive-sage)',
                  fontWeight: 600,
                  marginBottom: '2rem',
                }}
              >
                ABOUT SHILPAKALE
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {/* Q1 */}
                <div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-montserrat)',
                      fontSize: 'clamp(1rem, 1.15vw, 1.1rem)',
                      lineHeight: 1.5,
                      color: 'var(--heritage-green)',
                      fontWeight: 600,
                      marginBottom: '0.75rem',
                    }}
                  >
                    What is SHILPAKALE?
                  </h3>
                  <p
                    style={{
                      fontSize: 'clamp(1rem, 1.12vw, 1.08rem)',
                      lineHeight: 1.7,
                      color: 'var(--heritage-green)',
                      opacity: 0.8,
                    }}
                  >
                    SHILPAKALE is a story-led object brand that traces researched histories, materials, systems, landscapes, and living traditions, then translates them into collectible physical forms.
                  </p>
                </div>

                {/* Q2 */}
                <div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-montserrat)',
                      fontSize: 'clamp(1rem, 1.15vw, 1.1rem)',
                      lineHeight: 1.5,
                      color: 'var(--heritage-green)',
                      fontWeight: 600,
                      marginBottom: '0.75rem',
                    }}
                  >
                    Are SHILPAKALE products souvenirs?
                  </h3>
                  <p
                    style={{
                      fontSize: 'clamp(1rem, 1.12vw, 1.08rem)',
                      lineHeight: 1.7,
                      color: 'var(--heritage-green)',
                      opacity: 0.8,
                    }}
                  >
                    No. The objects are developed as considered interpretations rather than generic keepsakes or tourist replicas. Each product begins with a researched narrative and a specific design translation.
                  </p>
                </div>
              </div>
            </section>

            {/* Products */}
            <section>
              <h2
                style={{
                  fontFamily: 'var(--font-montserrat)',
                  fontSize: 'clamp(0.9rem, 1.05vw, 1rem)',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: 'var(--archive-sage)',
                  fontWeight: 600,
                  marginBottom: '2rem',
                }}
              >
                PRODUCTS
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {/* Q1 */}
                <div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-montserrat)',
                      fontSize: 'clamp(1rem, 1.15vw, 1.1rem)',
                      lineHeight: 1.5,
                      color: 'var(--heritage-green)',
                      fontWeight: 600,
                      marginBottom: '0.75rem',
                    }}
                  >
                    Are the products exact historical replicas?
                  </h3>
                  <p
                    style={{
                      fontSize: 'clamp(1rem, 1.12vw, 1.08rem)',
                      lineHeight: 1.7,
                      color: 'var(--heritage-green)',
                      opacity: 0.8,
                    }}
                  >
                    Unless a product is specifically identified as a measured replica, SHILPAKALE objects are interpretations. They preserve a central story, system, form, or material idea rather than claiming to reproduce every historical detail.
                  </p>
                </div>

                {/* Q2 */}
                <div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-montserrat)',
                      fontSize: 'clamp(1rem, 1.15vw, 1.1rem)',
                      lineHeight: 1.5,
                      color: 'var(--heritage-green)',
                      fontWeight: 600,
                      marginBottom: '0.75rem',
                    }}
                  >
                    What kinds of products does SHILPAKALE create?
                  </h3>
                  <p
                    style={{
                      fontSize: 'clamp(1rem, 1.12vw, 1.08rem)',
                      lineHeight: 1.7,
                      color: 'var(--heritage-green)',
                      opacity: 0.8,
                    }}
                  >
                    The current collection includes architectural models, topographical and maritime dioramas, trays, coasters, and functional objects shaped by researched stories.
                  </p>
                </div>
              </div>
            </section>

            {/* Material and Process */}
            <section>
              <h2
                style={{
                  fontFamily: 'var(--font-montserrat)',
                  fontSize: 'clamp(0.9rem, 1.05vw, 1rem)',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: 'var(--archive-sage)',
                  fontWeight: 600,
                  marginBottom: '2rem',
                }}
              >
                MATERIAL AND PROCESS
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {/* Q1 */}
                <div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-montserrat)',
                      fontSize: 'clamp(1rem, 1.15vw, 1.1rem)',
                      lineHeight: 1.5,
                      color: 'var(--heritage-green)',
                      fontWeight: 600,
                      marginBottom: '0.75rem',
                    }}
                  >
                    Are the objects 3D printed?
                  </h3>
                  <p
                    style={{
                      fontSize: 'clamp(1rem, 1.12vw, 1.08rem)',
                      lineHeight: 1.7,
                      color: 'var(--heritage-green)',
                      opacity: 0.8,
                    }}
                  >
                    SHILPAKALE uses digital modelling and 3D printing as part of its design and production language. Products may also undergo cleaning, assembly, surface finishing, painting, or other refinement depending on the object.
                  </p>
                </div>

                {/* Q2 */}
                <div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-montserrat)',
                      fontSize: 'clamp(1rem, 1.15vw, 1.1rem)',
                      lineHeight: 1.5,
                      color: 'var(--heritage-green)',
                      fontWeight: 600,
                      marginBottom: '0.75rem',
                    }}
                  >
                    Are all products handmade?
                  </h3>
                  <p
                    style={{
                      fontSize: 'clamp(1rem, 1.12vw, 1.08rem)',
                      lineHeight: 1.7,
                      color: 'var(--heritage-green)',
                      opacity: 0.8,
                    }}
                  >
                    The forms are digitally designed and 3D printed. Finishing and preparation may include manual work, but the products should not be described as traditional handmade craft unless that process is specifically used.
                  </p>
                </div>

                {/* Q3 */}
                <div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-montserrat)',
                      fontSize: 'clamp(1rem, 1.15vw, 1.1rem)',
                      lineHeight: 1.5,
                      color: 'var(--heritage-green)',
                      fontWeight: 600,
                      marginBottom: '0.75rem',
                    }}
                  >
                    Will every object look exactly identical?
                  </h3>
                  <p
                    style={{
                      fontSize: 'clamp(1rem, 1.12vw, 1.08rem)',
                      lineHeight: 1.7,
                      color: 'var(--heritage-green)',
                      opacity: 0.8,
                    }}
                  >
                    Small variations may occur because of finishing, lighting, photography, surface preparation, and production tolerances. The approved product form and exterior will remain consistent.
                  </p>
                </div>
              </div>
            </section>

            {/* Care */}
            <section>
              <h2
                style={{
                  fontFamily: 'var(--font-montserrat)',
                  fontSize: 'clamp(0.9rem, 1.05vw, 1rem)',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: 'var(--archive-sage)',
                  fontWeight: 600,
                  marginBottom: '2rem',
                }}
              >
                CARE
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {/* Q1 */}
                <div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-montserrat)',
                      fontSize: 'clamp(1rem, 1.15vw, 1.1rem)',
                      lineHeight: 1.5,
                      color: 'var(--heritage-green)',
                      fontWeight: 600,
                      marginBottom: '0.75rem',
                    }}
                  >
                    How should I clean the product?
                  </h3>
                  <p
                    style={{
                      fontSize: 'clamp(1rem, 1.12vw, 1.08rem)',
                      lineHeight: 1.7,
                      color: 'var(--heritage-green)',
                      opacity: 0.8,
                    }}
                  >
                    Use a soft, dry cloth or a gentle soft-bristled brush. Avoid harsh chemicals, abrasive materials, and forceful cleaning.
                  </p>
                </div>

                {/* Q2 */}
                <div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-montserrat)',
                      fontSize: 'clamp(1rem, 1.15vw, 1.1rem)',
                      lineHeight: 1.5,
                      color: 'var(--heritage-green)',
                      fontWeight: 600,
                      marginBottom: '0.75rem',
                    }}
                  >
                    Can the product be washed?
                  </h3>
                  <p
                    style={{
                      fontSize: 'clamp(1rem, 1.12vw, 1.08rem)',
                      lineHeight: 1.7,
                      color: 'var(--heritage-green)',
                      opacity: 0.8,
                    }}
                  >
                    Do not wash or soak the object unless the individual product instructions specifically permit it. Water exposure may affect the finish, adhesive, or surface detailing.
                  </p>
                </div>

                {/* Q3 */}
                <div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-montserrat)',
                      fontSize: 'clamp(1rem, 1.15vw, 1.1rem)',
                      lineHeight: 1.5,
                      color: 'var(--heritage-green)',
                      fontWeight: 600,
                      marginBottom: '0.75rem',
                    }}
                  >
                    Can the object be kept outdoors?
                  </h3>
                  <p
                    style={{
                      fontSize: 'clamp(1rem, 1.12vw, 1.08rem)',
                      lineHeight: 1.7,
                      color: 'var(--heritage-green)',
                      opacity: 0.8,
                    }}
                  >
                    Unless stated otherwise, SHILPAKALE objects are intended for indoor use. Prolonged exposure to direct sunlight, moisture, heat, or weather may damage the product.
                  </p>
                </div>
              </div>
            </section>

            {/* Orders and Shipping */}
            <section>
              <h2
                style={{
                  fontFamily: 'var(--font-montserrat)',
                  fontSize: 'clamp(0.9rem, 1.05vw, 1rem)',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: 'var(--archive-sage)',
                  fontWeight: 600,
                  marginBottom: '2rem',
                }}
              >
                ORDERS AND SHIPPING
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {/* Q1 */}
                <div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-montserrat)',
                      fontSize: 'clamp(1rem, 1.15vw, 1.1rem)',
                      lineHeight: 1.5,
                      color: 'var(--heritage-green)',
                      fontWeight: 600,
                      marginBottom: '0.75rem',
                    }}
                  >
                    How can I place an order?
                  </h3>
                  <p
                    style={{
                      fontSize: 'clamp(1rem, 1.12vw, 1.08rem)',
                      lineHeight: 1.7,
                      color: 'var(--heritage-green)',
                      opacity: 0.8,
                    }}
                  >
                    Ordering and checkout will be enabled through the SHILPAKALE website once the Shopify connection is completed. Until then, product enquiries can be submitted through the Enquire page.
                  </p>
                </div>

                {/* Q2 */}
                <div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-montserrat)',
                      fontSize: 'clamp(1rem, 1.15vw, 1.1rem)',
                      lineHeight: 1.5,
                      color: 'var(--heritage-green)',
                      fontWeight: 600,
                      marginBottom: '0.75rem',
                    }}
                  >
                    Will tracking be provided?
                  </h3>
                  <p
                    style={{
                      fontSize: 'clamp(1rem, 1.12vw, 1.08rem)',
                      lineHeight: 1.7,
                      color: 'var(--heritage-green)',
                      opacity: 0.8,
                    }}
                  >
                    Tracking details will be shared after dispatch when supported by the selected delivery service.
                  </p>
                </div>

                {/* Q3 */}
                <div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-montserrat)',
                      fontSize: 'clamp(1rem, 1.15vw, 1.1rem)',
                      lineHeight: 1.5,
                      color: 'var(--heritage-green)',
                      fontWeight: 600,
                      marginBottom: '0.75rem',
                    }}
                  >
                    Do you ship across India?
                  </h3>
                  <p
                    style={{
                      fontSize: 'clamp(1rem, 1.12vw, 1.08rem)',
                      lineHeight: 1.7,
                      color: 'var(--heritage-green)',
                      opacity: 0.8,
                    }}
                  >
                    Shipping coverage will be confirmed during launch setup according to carrier availability, product safety, and destination serviceability.
                  </p>
                </div>
              </div>
            </section>

            {/* Customisation */}
            <section>
              <h2
                style={{
                  fontFamily: 'var(--font-montserrat)',
                  fontSize: 'clamp(0.9rem, 1.05vw, 1rem)',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: 'var(--archive-sage)',
                  fontWeight: 600,
                  marginBottom: '2rem',
                }}
              >
                CUSTOMISATION
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {/* Q1 */}
                <div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-montserrat)',
                      fontSize: 'clamp(1rem, 1.15vw, 1.1rem)',
                      lineHeight: 1.5,
                      color: 'var(--heritage-green)',
                      fontWeight: 600,
                      marginBottom: '0.75rem',
                    }}
                  >
                    Do you accept custom orders?
                  </h3>
                  <p
                    style={{
                      fontSize: 'clamp(1rem, 1.12vw, 1.08rem)',
                      lineHeight: 1.7,
                      color: 'var(--heritage-green)',
                      opacity: 0.8,
                    }}
                  >
                    SHILPAKALE is currently focused on its curated collections and does not accept general custom orders. Selected commissioned or limited-request projects may be considered in a later phase.
                  </p>
                </div>

                {/* Q2 */}
                <div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-montserrat)',
                      fontSize: 'clamp(1rem, 1.15vw, 1.1rem)',
                      lineHeight: 1.5,
                      color: 'var(--heritage-green)',
                      fontWeight: 600,
                      marginBottom: '0.75rem',
                    }}
                  >
                    Can I request a different colour or size?
                  </h3>
                  <p
                    style={{
                      fontSize: 'clamp(1rem, 1.12vw, 1.08rem)',
                      lineHeight: 1.7,
                      color: 'var(--heritage-green)',
                      opacity: 0.8,
                    }}
                  >
                    Availability of alternate finishes or sizes will depend on the specific product and production plan. Submit an enquiry for the object you are considering.
                  </p>
                </div>
              </div>
            </section>
          </div>

          {/* Still Have a Question */}
          <div
            style={{
              maxWidth: '58rem',
              marginTop: 'clamp(5rem, 8vw, 7rem)',
              paddingTop: 'clamp(3rem, 5vw, 4rem)',
              borderTop: '1px solid rgba(11, 58, 47, 0.15)',
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
                marginBottom: '1.5rem',
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
