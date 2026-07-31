import Link from 'next/link';
import ProductPageHeader from '@/components/layout/ProductPageHeader';

export const metadata = {
  title: 'Shipping Policy | SHILPAKALE',
  description: 'Shipping policy for SHILPAKALE objects, including preparation, dispatch, and delivery information.',
};

export default function ShippingPolicyPage() {
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
              marginBottom: 'clamp(2rem, 4vw, 3rem)',
            }}
          >
            SHIPPING POLICY
          </h1>

          {/* Introductory Copy */}
          <div
            style={{
              maxWidth: '58rem',
              marginBottom: 'clamp(3rem, 6vw, 5rem)',
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
              SHILPAKALE objects are prepared, checked, and packed with care before dispatch. Shipping timelines may vary according to product availability, finishing requirements, destination, and carrier service.
            </p>
          </div>

          {/* Sections */}
          <div
            style={{
              maxWidth: '58rem',
              display: 'flex',
              flexDirection: 'column',
              gap: 'clamp(3rem, 5vw, 4rem)',
            }}
          >
            {/* Order Preparation */}
            <section>
              <h2
                style={{
                  fontFamily: 'var(--font-montserrat)',
                  fontSize: 'clamp(0.85rem, 1vw, 0.95rem)',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: 'var(--heritage-green)',
                  fontWeight: 600,
                  marginBottom: '1.5rem',
                }}
              >
                ORDER PREPARATION
              </h2>
              <p
                style={{
                  fontSize: 'clamp(1rem, 1.15vw, 1.1rem)',
                  lineHeight: 1.7,
                  color: 'var(--heritage-green)',
                  opacity: 0.8,
                }}
              >
                Some objects may require finishing and quality inspection before dispatch. Preparation timelines depend on the specific product and current production schedule. Orders are not dispatched the same day or next day as placement. Each object is checked, cleaned if required, and packed according to its material and form.
              </p>
            </section>

            {/* Dispatch and Delivery */}
            <section>
              <h2
                style={{
                  fontFamily: 'var(--font-montserrat)',
                  fontSize: 'clamp(0.85rem, 1vw, 0.95rem)',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: 'var(--heritage-green)',
                  fontWeight: 600,
                  marginBottom: '1.5rem',
                }}
              >
                DISPATCH AND DELIVERY
              </h2>
              <p
                style={{
                  fontSize: 'clamp(1rem, 1.15vw, 1.1rem)',
                  lineHeight: 1.7,
                  color: 'var(--heritage-green)',
                  opacity: 0.8,
                }}
              >
                Estimated delivery timelines will be shown or communicated during the ordering process once Shopify commerce is connected. Actual delivery time depends on the selected carrier, origin location, destination serviceability, and current carrier schedules. SHILPAKALE does not control carrier transit times or external delays.
              </p>
            </section>

            {/* Shipping Charges */}
            <section>
              <h2
                style={{
                  fontFamily: 'var(--font-montserrat)',
                  fontSize: 'clamp(0.85rem, 1vw, 0.95rem)',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: 'var(--heritage-green)',
                  fontWeight: 600,
                  marginBottom: '1.5rem',
                }}
              >
                SHIPPING CHARGES
              </h2>
              <p
                style={{
                  fontSize: 'clamp(1rem, 1.15vw, 1.1rem)',
                  lineHeight: 1.7,
                  color: 'var(--heritage-green)',
                  opacity: 0.8,
                }}
              >
                Shipping charges may depend on destination, package size, product weight, and order value. Applicable charges will be calculated and shown at checkout before order confirmation. Special carrier requirements for certain destinations or remote areas may affect final shipping cost.
              </p>
            </section>

            {/* Tracking */}
            <section>
              <h2
                style={{
                  fontFamily: 'var(--font-montserrat)',
                  fontSize: 'clamp(0.85rem, 1vw, 0.95rem)',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: 'var(--heritage-green)',
                  fontWeight: 600,
                  marginBottom: '1.5rem',
                }}
              >
                TRACKING
              </h2>
              <p
                style={{
                  fontSize: 'clamp(1rem, 1.15vw, 1.1rem)',
                  lineHeight: 1.7,
                  color: 'var(--heritage-green)',
                  opacity: 0.8,
                }}
              >
                Tracking information will be provided after dispatch when supported by the selected delivery service. Not all carriers or service types support tracking. Where tracking is available, the reference number and carrier details will be shared via the contact information provided during order placement.
              </p>
            </section>

            {/* Delivery Inspection */}
            <section>
              <h2
                style={{
                  fontFamily: 'var(--font-montserrat)',
                  fontSize: 'clamp(0.85rem, 1vw, 0.95rem)',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: 'var(--heritage-green)',
                  fontWeight: 600,
                  marginBottom: '1.5rem',
                }}
              >
                DELIVERY INSPECTION
              </h2>
              <p
                style={{
                  fontSize: 'clamp(1rem, 1.15vw, 1.1rem)',
                  lineHeight: 1.7,
                  color: 'var(--heritage-green)',
                  opacity: 0.8,
                  marginBottom: '1rem',
                }}
              >
                Inspect the outer package and product soon after delivery. If damage is found, retain all packaging materials, take clear photographs, and contact support as early as possible.
              </p>
              <p
                style={{
                  fontSize: 'clamp(1rem, 1.15vw, 1.1rem)',
                  lineHeight: 1.7,
                  color: 'var(--heritage-green)',
                  opacity: 0.8,
                }}
              >
                Product condition claims made after extended delays or without packaging evidence may not qualify for replacement or refund review.
              </p>
            </section>

            {/* Delayed or Undelivered Orders */}
            <section>
              <h2
                style={{
                  fontFamily: 'var(--font-montserrat)',
                  fontSize: 'clamp(0.85rem, 1vw, 0.95rem)',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: 'var(--heritage-green)',
                  fontWeight: 600,
                  marginBottom: '1.5rem',
                }}
              >
                DELAYED OR UNDELIVERED ORDERS
              </h2>
              <p
                style={{
                  fontSize: 'clamp(1rem, 1.15vw, 1.1rem)',
                  lineHeight: 1.7,
                  color: 'var(--heritage-green)',
                  opacity: 0.8,
                }}
              >
                If a shipment is significantly delayed or undelivered beyond the estimated timeline, contact SHILPAKALE support through the Contact page or Enquire form with your order reference and tracking details once live commerce is connected. Carrier investigation and resolution timelines depend on the delivery service used.
              </p>
            </section>
          </div>

          {/* Contact Link */}
          <div
            style={{
              maxWidth: '58rem',
              marginTop: 'clamp(4rem, 6vw, 5rem)',
              paddingTop: 'clamp(2.5rem, 4vw, 3rem)',
              borderTop: '1px solid rgba(11, 58, 47, 0.15)',
            }}
          >
            <Link
              href="/contact"
              className="footer-link"
              style={{
                position: 'relative',
                display: 'inline-flex',
                fontFamily: 'var(--font-montserrat)',
                fontSize: 'clamp(0.85rem, 1vw, 0.95rem)',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--heritage-green)',
                textDecoration: 'none',
                fontWeight: 500,
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
