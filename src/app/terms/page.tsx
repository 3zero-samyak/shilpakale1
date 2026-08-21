import ProductPageHeader from '@/components/layout/ProductPageHeader';

export const metadata = {
  title: 'Terms and Conditions | SHILPAKALE',
  description: 'Terms and Conditions for SHILPAKALE',
};

export default function TermsPage() {
  return (
    <>
      <ProductPageHeader />
      
      <main
        style={{
          paddingTop: 'clamp(3.5rem, 5vw, 4rem)',
          paddingBottom: 'clamp(4rem, 8vw, 8rem)',
          backgroundColor: 'var(--ivory-archive)',
          minHeight: '80svh',
        }}
      >
        <div
          style={{
            width: 'min(100%, 68rem)',
            marginInline: 'auto',
            paddingInline: 'clamp(1.25rem, 5vw, 3rem)',
            paddingTop: 'clamp(4rem, 6vw, 6rem)',
          }}
        >
          {/* Heading */}
          <h1
            style={{
              fontFamily: 'Georgia, serif',
              fontSize: 'clamp(2.75rem, 5vw, 5.5rem)',
              lineHeight: 1,
              textTransform: 'uppercase',
              textAlign: 'center',
              color: 'var(--heritage-green)',
              fontWeight: 400,
              letterSpacing: '-0.003em',
              marginBottom: 'clamp(3rem, 5vw, 5rem)',
            }}
          >
            TERMS AND CONDITIONS
          </h1>

          {/* Notice */}
          <div
            style={{
              padding: '1.5rem 2rem',
              backgroundColor: 'rgba(11, 58, 47, 0.06)',
              border: '1px solid rgba(11, 58, 47, 0.2)',
              borderRadius: '0.25rem',
              marginBottom: 'clamp(3rem, 5vw, 5rem)',
            }}
          >
            <p
              style={{
                color: 'var(--heritage-green)',
                fontSize: 'clamp(0.9rem, 1vw, 0.95rem)',
                lineHeight: 1.7,
                fontFamily: 'var(--font-montserrat)',
                fontStyle: 'italic',
                margin: 0,
              }}
            >
              <strong>Notice:</strong> The following Terms and Conditions are temporary placeholders and will be replaced with final, legally-approved terms before launch. Do not rely on this content for legal compliance.
            </p>
          </div>

          {/* Content */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'clamp(2rem, 3vw, 3rem)',
              maxWidth: '58rem',
              marginInline: 'auto',
            }}
          >
            {/* Section 1 */}
            <section>
              <h2
                style={{
                  fontFamily: 'Georgia, serif',
                  fontSize: 'clamp(1.5rem, 2vw, 1.8rem)',
                  lineHeight: 1.3,
                  color: 'var(--heritage-green)',
                  fontWeight: 400,
                  marginBottom: '1rem',
                }}
              >
                1. Acceptance of Terms
              </h2>
              <p
                style={{
                  color: 'var(--heritage-green)',
                  opacity: 0.85,
                  fontSize: 'clamp(1rem, 1.1vw, 1.05rem)',
                  lineHeight: 1.7,
                  fontFamily: 'var(--font-montserrat)',
                  margin: 0,
                }}
              >
                By accessing and using the SHILPAKALE website, you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to these terms, please do not use this website.
              </p>
            </section>

            {/* Section 2 */}
            <section>
              <h2
                style={{
                  fontFamily: 'Georgia, serif',
                  fontSize: 'clamp(1.5rem, 2vw, 1.8rem)',
                  lineHeight: 1.3,
                  color: 'var(--heritage-green)',
                  fontWeight: 400,
                  marginBottom: '1rem',
                }}
              >
                2. Use of Website
              </h2>
              <p
                style={{
                  color: 'var(--heritage-green)',
                  opacity: 0.85,
                  fontSize: 'clamp(1rem, 1.1vw, 1.05rem)',
                  lineHeight: 1.7,
                  fontFamily: 'var(--font-montserrat)',
                  margin: 0,
                }}
              >
                You may use this website for lawful purposes only. You agree not to use this website in any way that causes, or may cause, damage to the website or impairment of the availability or accessibility of the website.
              </p>
            </section>

            {/* Section 3 */}
            <section>
              <h2
                style={{
                  fontFamily: 'Georgia, serif',
                  fontSize: 'clamp(1.5rem, 2vw, 1.8rem)',
                  lineHeight: 1.3,
                  color: 'var(--heritage-green)',
                  fontWeight: 400,
                  marginBottom: '1rem',
                }}
              >
                3. Product Information
              </h2>
              <p
                style={{
                  color: 'var(--heritage-green)',
                  opacity: 0.85,
                  fontSize: 'clamp(1rem, 1.1vw, 1.05rem)',
                  lineHeight: 1.7,
                  fontFamily: 'var(--font-montserrat)',
                  margin: 0,
                }}
              >
                We make every effort to display product information as accurately as possible. However, we do not guarantee that product descriptions, images, or other content on this website is accurate, complete, reliable, current, or error-free.
              </p>
            </section>

            {/* Section 4 */}
            <section>
              <h2
                style={{
                  fontFamily: 'Georgia, serif',
                  fontSize: 'clamp(1.5rem, 2vw, 1.8rem)',
                  lineHeight: 1.3,
                  color: 'var(--heritage-green)',
                  fontWeight: 400,
                  marginBottom: '1rem',
                }}
              >
                4. Intellectual Property
              </h2>
              <p
                style={{
                  color: 'var(--heritage-green)',
                  opacity: 0.85,
                  fontSize: 'clamp(1rem, 1.1vw, 1.05rem)',
                  lineHeight: 1.7,
                  fontFamily: 'var(--font-montserrat)',
                  margin: 0,
                }}
              >
                All content on this website, including text, graphics, logos, images, and software, is the property of SHILPAKALE and is protected by intellectual property laws. You may not reproduce, distribute, or create derivative works from any content without prior written permission.
              </p>
            </section>

            {/* Section 5 */}
            <section>
              <h2
                style={{
                  fontFamily: 'Georgia, serif',
                  fontSize: 'clamp(1.5rem, 2vw, 1.8rem)',
                  lineHeight: 1.3,
                  color: 'var(--heritage-green)',
                  fontWeight: 400,
                  marginBottom: '1rem',
                }}
              >
                5. Privacy
              </h2>
              <p
                style={{
                  color: 'var(--heritage-green)',
                  opacity: 0.85,
                  fontSize: 'clamp(1rem, 1.1vw, 1.05rem)',
                  lineHeight: 1.7,
                  fontFamily: 'var(--font-montserrat)',
                  margin: 0,
                }}
              >
                Your privacy is important to us. Any personal information collected through this website will be handled in accordance with applicable privacy laws and our Privacy Policy.
              </p>
            </section>

            {/* Section 6 */}
            <section>
              <h2
                style={{
                  fontFamily: 'Georgia, serif',
                  fontSize: 'clamp(1.5rem, 2vw, 1.8rem)',
                  lineHeight: 1.3,
                  color: 'var(--heritage-green)',
                  fontWeight: 400,
                  marginBottom: '1rem',
                }}
              >
                6. Limitation of Liability
              </h2>
              <p
                style={{
                  color: 'var(--heritage-green)',
                  opacity: 0.85,
                  fontSize: 'clamp(1rem, 1.1vw, 1.05rem)',
                  lineHeight: 1.7,
                  fontFamily: 'var(--font-montserrat)',
                  margin: 0,
                }}
              >
                SHILPAKALE shall not be liable for any direct, indirect, incidental, special, or consequential damages arising from your use of this website or any products purchased through this website.
              </p>
            </section>

            {/* Section 7 */}
            <section>
              <h2
                style={{
                  fontFamily: 'Georgia, serif',
                  fontSize: 'clamp(1.5rem, 2vw, 1.8rem)',
                  lineHeight: 1.3,
                  color: 'var(--heritage-green)',
                  fontWeight: 400,
                  marginBottom: '1rem',
                }}
              >
                7. Changes to Terms
              </h2>
              <p
                style={{
                  color: 'var(--heritage-green)',
                  opacity: 0.85,
                  fontSize: 'clamp(1rem, 1.1vw, 1.05rem)',
                  lineHeight: 1.7,
                  fontFamily: 'var(--font-montserrat)',
                  margin: 0,
                }}
              >
                We reserve the right to modify these Terms and Conditions at any time. Changes will be effective immediately upon posting to the website. Your continued use of the website after any changes constitutes acceptance of the new terms.
              </p>
            </section>

            {/* Section 8 */}
            <section>
              <h2
                style={{
                  fontFamily: 'Georgia, serif',
                  fontSize: 'clamp(1.5rem, 2vw, 1.8rem)',
                  lineHeight: 1.3,
                  color: 'var(--heritage-green)',
                  fontWeight: 400,
                  marginBottom: '1rem',
                }}
              >
                8. Contact Information
              </h2>
              <p
                style={{
                  color: 'var(--heritage-green)',
                  opacity: 0.85,
                  fontSize: 'clamp(1rem, 1.1vw, 1.05rem)',
                  lineHeight: 1.7,
                  fontFamily: 'var(--font-montserrat)',
                  margin: 0,
                }}
              >
                If you have any questions about these Terms and Conditions, please contact us through our enquiry form or the contact information provided on this website.
              </p>
            </section>
          </div>

          {/* Last Updated */}
          <p
            style={{
              textAlign: 'center',
              color: 'var(--heritage-green)',
              opacity: 0.5,
              fontSize: 'clamp(0.85rem, 0.95vw, 0.9rem)',
              fontFamily: 'var(--font-montserrat)',
              marginTop: 'clamp(4rem, 6vw, 6rem)',
            }}
          >
            Last updated: Pending legal approval
          </p>
        </div>
      </main>

      {/* Footer is provided by the root layout; do not render here to avoid duplication */}
    </>
  );
}
