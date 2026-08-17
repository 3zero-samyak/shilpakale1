import Link from 'next/link';
import ProductPageHeader from '@/components/layout/ProductPageHeader';

export const metadata = {
  title: 'Returns & Exchange | SHILPAKALE',
  description: 'Returns and exchange policy for SHILPAKALE objects.',
};

export default function ReturnsAndExchangePage() {
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
            RETURNS & EXCHANGE
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
              SHILPAKALE objects are detailed, finished, and packed as collectible physical forms. Return or exchange requests must therefore be reviewed according to the condition of the product and the reason for the request.
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
            {/* Eligible Requests */}
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
                ELIGIBLE REQUESTS
              </h2>
              <p
                style={{
                  fontSize: 'clamp(1rem, 1.15vw, 1.1rem)',
                  lineHeight: 1.7,
                  color: 'var(--heritage-green)',
                  opacity: 0.8,
                }}
              >
                Eligibility for return or exchange depends on the final launch policy and the condition of the order at the time of delivery. Requests must be submitted with supporting evidence including photographs, packaging retention, and a clear description of the issue. Review timelines and outcomes will be communicated once the request is assessed.
              </p>
            </section>

            {/* Damaged or Incorrect Items */}
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
                DAMAGED OR INCORRECT ITEMS
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
                If a product arrives damaged or an incorrect item was shipped, retain all original packaging materials. Take clear, well-lit photographs of the product, the packaging exterior, and the damage or error.
              </p>
              <p
                style={{
                  fontSize: 'clamp(1rem, 1.15vw, 1.1rem)',
                  lineHeight: 1.7,
                  color: 'var(--heritage-green)',
                  opacity: 0.8,
                }}
              >
                Submit the issue through the Contact page or Enquire form with your order reference, photographs, and a detailed description. The support team will review and respond with next steps.
              </p>
            </section>

            {/* Condition of Returned Items */}
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
                CONDITION OF RETURNED ITEMS
              </h2>
              <p
                style={{
                  fontSize: 'clamp(1rem, 1.15vw, 1.1rem)',
                  lineHeight: 1.7,
                  color: 'var(--heritage-green)',
                  opacity: 0.8,
                }}
              >
                Products being returned should remain unused, undamaged, and complete with supplied cards, tags, and original packaging unless the issue being reported involves delivery damage. Items showing signs of use, modification, cleaning attempts, or missing components may not qualify for return or exchange processing.
              </p>
            </section>

            {/* Non-Eligible Requests */}
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
                NON-ELIGIBLE REQUESTS
              </h2>
              <p
                style={{
                  fontSize: 'clamp(1rem, 1.15vw, 1.1rem)',
                  lineHeight: 1.7,
                  color: 'var(--heritage-green)',
                  opacity: 0.8,
                }}
              >
                Damage caused by misuse, water exposure, heat exposure, rough handling, or unauthorised modification may not qualify for return or exchange. Changes of mind, subjective colour perception differences, or normal material variations inherent to handmade finishing processes may also not qualify depending on the final policy. Each case will be reviewed individually.
              </p>
            </section>

            {/* Exchange Review */}
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
                EXCHANGE REVIEW
              </h2>
              <p
                style={{
                  fontSize: 'clamp(1rem, 1.15vw, 1.1rem)',
                  lineHeight: 1.7,
                  color: 'var(--heritage-green)',
                  opacity: 0.8,
                }}
              >
                Approved exchanges depend on product availability and review outcomes. If the requested replacement is unavailable, alternative resolution options will be offered. Exchange processing timelines include return shipment inspection, availability confirmation, and re-dispatch preparation.
              </p>
            </section>

            {/* Refund Method */}
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
                REFUND METHOD
              </h2>
              <p
                style={{
                  fontSize: 'clamp(1rem, 1.15vw, 1.1rem)',
                  lineHeight: 1.7,
                  color: 'var(--heritage-green)',
                  opacity: 0.8,
                }}
              >
                Approved refund procedures will follow the original payment method once Shopify commerce is connected. Refund processing timelines depend on the payment provider and financial institution. Shipping charges may or may not be refunded depending on the reason for the return and the final operational policy.
              </p>
            </section>

            {/* How to Request Support */}
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
                HOW TO REQUEST SUPPORT
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
                Submit return or exchange requests through:
              </p>
              <ul
                style={{
                  listStyle: 'disc',
                  paddingLeft: '1.5rem',
                  fontSize: 'clamp(1rem, 1.15vw, 1.1rem)',
                  lineHeight: 1.7,
                  color: 'var(--heritage-green)',
                  opacity: 0.8,
                }}
              >
                <li style={{ marginBottom: '0.5rem' }}>
                  <Link
                    href="/contact"
                    style={{
                      color: 'var(--heritage-green)',
                      textDecoration: 'underline',
                    }}
                  >
                    Contact page
                  </Link>
                </li>
                <li>
                  <Link
                    href="/enquire"
                    style={{
                      color: 'var(--heritage-green)',
                      textDecoration: 'underline',
                    }}
                  >
                    Enquire form
                  </Link>
                </li>
              </ul>
            </section>
          </div>

          {/* Disclaimer Note */}
          <div
            style={{
              maxWidth: '58rem',
              marginTop: 'clamp(3rem, 5vw, 4rem)',
              paddingTop: 'clamp(2rem, 3vw, 2.5rem)',
              borderTop: '1px solid rgba(11, 58, 47, 0.15)',
            }}
          >
            <p
              style={{
                fontSize: 'clamp(0.85rem, 0.95vw, 0.92rem)',
                lineHeight: 1.6,
                color: 'var(--heritage-green)',
                opacity: 0.6,
                fontStyle: 'italic',
              }}
            >
              Final return timelines and operational terms will be confirmed before public commerce is enabled.
            </p>
          </div>
        </article>
      </main>
    </>
  );
}
