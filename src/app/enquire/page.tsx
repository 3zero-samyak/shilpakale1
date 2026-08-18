import ProductPageHeader from '@/components/layout/ProductPageHeader';
import Footer from '@/components/layout/Footer';
import EnquiryForm from '@/components/enquire/EnquiryForm';
import { getAuthenticatedCustomer } from '@/lib/shopify/customer-account/client';
import { getProductByHandle } from '@/lib/shopify/products';
import { sanitizeReturnTo } from '@/lib/safe-return';

export default async function EnquirePage({ searchParams }: { searchParams?: Record<string, string> }) {
  const productHandle = searchParams?.product ?? null;
  const returnPath = `/enquire${productHandle ? `?product=${encodeURIComponent(productHandle)}` : ''}`;
  const safeReturn = sanitizeReturnTo(returnPath);

  const auth = await getAuthenticatedCustomer();

  let productTitle: string | null = null;
  if (productHandle) {
    const p = await getProductByHandle(productHandle);
    productTitle = p?.title ?? null;
  }

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
            width: 'min(100%, 56rem)',
            marginInline: 'auto',
            paddingInline: 'clamp(1.25rem, 5vw, 3rem)',
            paddingTop: 'clamp(4rem, 6vw, 6rem)',
          }}
        >
          <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(2.75rem, 5vw, 5.5rem)', lineHeight: 1, textTransform: 'uppercase', textAlign: 'center', color: 'var(--heritage-green)', fontWeight: 400, letterSpacing: '-0.003em', marginBottom: 'clamp(1.5rem, 2.5vw, 2rem)' }}>
            ENQUIRE
          </h1>

          <p style={{ textAlign: 'center', color: 'var(--heritage-green)', opacity: 0.75, fontSize: 'clamp(0.95rem, 1.1vw, 1.05rem)', lineHeight: 1.6, fontFamily: 'var(--font-montserrat)', marginBottom: productTitle ? 'clamp(1rem, 1.5vw, 1.5rem)' : 'clamp(3rem, 5vw, 5rem)', maxWidth: '42rem', marginInline: 'auto' }}>
            Share your details and tell us what you would like to know.
          </p>

          {productTitle && <p style={{ textAlign: 'center', color: 'var(--archive-sage)', fontSize: 'clamp(0.85rem, 0.95vw, 0.9rem)', fontFamily: 'var(--font-montserrat)', fontStyle: 'italic', marginBottom: 'clamp(3rem, 5vw, 5rem)' }}>Regarding: {productTitle}</p>}

          {auth.status === 'unauthenticated' && (
            <div className="w-full max-w-[34rem] mx-auto text-center">
              <p className="mb-6" style={{ color: 'var(--heritage-green)', opacity: 0.9 }}>Sign in to continue your enquiry. Your email will be verified securely through Shopify.</p>
              <div className="flex flex-col gap-4">
                <a href={`/api/auth/login?returnTo=${encodeURIComponent(safeReturn)}`} className="account-option-button group">SIGN IN TO ENQUIRE</a>
              </div>
            </div>
          )}

          {auth.status === 'api_error' && (
            <div className="w-full max-w-[34rem] mx-auto text-center">
              <p className="mb-6" style={{ color: 'var(--heritage-green)', opacity: 0.9 }}>We could not verify your account right now.</p>
              <div className="flex flex-col gap-4">
                <a href="/enquire" className="account-option-button group">TRY AGAIN</a>
                <a href="/api/auth/logout" className="account-option-button">Sign Out</a>
              </div>
            </div>
          )}

          {auth.status === 'authenticated' && (() => {
            const cust = auth.customer as { firstName?: string; lastName?: string; emailAddress?: { emailAddress?: string } };
            return (
              <div style={{ maxWidth: '56rem', marginInline: 'auto' }}>
                <EnquiryForm
                  productHandle={productHandle}
                  productTitle={productTitle}
                  authenticated={true}
                  customer={{ firstName: cust.firstName, lastName: cust.lastName, email: cust.emailAddress?.emailAddress }}
                />
              </div>
            );
          })()}
        </div>
      </main>

      <Footer />
    </>
  );
}
