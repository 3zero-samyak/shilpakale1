import ProductPageHeader from '@/components/layout/ProductPageHeader';
import { getAuthenticatedCustomer } from '@/lib/shopify/customer-account/client';
import Link from 'next/link';

export const metadata = {
  title: 'Account | SHILPAKALE',
  description: 'Access your SHILPAKALE account or continue browsing the archive.',
};

export default async function AccountPage() {
  const result = await getAuthenticatedCustomer();

  return (
    <>
      <ProductPageHeader />

      <main
        className="w-full min-h-[calc(100svh-5rem)] flex items-center justify-center"
        style={{
          paddingTop: 'clamp(5rem, 6.5vw, 6.5rem)',
          backgroundColor: result.status === 'unauthenticated' ? 'var(--heritage-green)' : 'var(--ivory-archive)',
        }}
      >
        <div className="w-full max-w-[48rem] mx-auto px-6">
          {result.status === 'unauthenticated' && (
            <div className="w-full max-w-[28rem] mx-auto">
              {/* Premium Login Composition */}
              <div
                className="py-12 px-8 rounded-lg"
                style={{
                  border: '1px solid rgba(253, 246, 227, 0.15)',
                  backgroundColor: 'rgba(253, 246, 227, 0.02)',
                }}
              >
                {/* Login Title */}
                <h1
                  className="text-4xl md:text-5xl text-center mb-6"
                  style={{
                    color: 'var(--ivory-archive)',
                    fontFamily: 'Georgia, serif',
                    fontWeight: 300,
                    letterSpacing: '0.02em',
                  }}
                >
                  LOGIN
                </h1>

                {/* Explanation */}
                <p
                  className="text-center mb-2"
                  style={{
                    color: 'var(--ivory-archive)',
                    opacity: 0.8,
                    fontSize: '1rem',
                    lineHeight: 1.6,
                  }}
                >
                  Access your SHILPAKALE account through secure Shopify verification.
                </p>

                <p
                  className="text-center mb-8 text-sm"
                  style={{
                    color: 'var(--ivory-archive)',
                    opacity: 0.6,
                    fontSize: '0.875rem',
                  }}
                >
                  No password required. Your email is verified securely through Shopify.
                </p>

                {/* Sign In Button */}
                <a
                  href="/api/auth/login?returnTo=/"
                  className="block w-full text-center py-3.5 px-6 mb-5 rounded-md transition-all duration-200"
                  style={{
                    backgroundColor: 'var(--ivory-archive)',
                    color: 'var(--heritage-green)',
                    textDecoration: 'none',
                    fontSize: '0.95rem',
                    fontWeight: 500,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                  }}
                >
                  SIGN IN
                </a>

                {/* Back to Store */}
                <Link
                  href="/"
                  className="block w-full text-center py-3 px-6 rounded-md transition-all duration-200"
                  style={{
                    border: '1px solid rgba(253, 246, 227, 0.25)',
                    color: 'var(--ivory-archive)',
                    textDecoration: 'none',
                    fontSize: '0.875rem',
                    fontWeight: 400,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                  }}
                >
                  BACK TO STORE
                </Link>
              </div>
            </div>
          )}

          {result.status === 'api_error' && (
            <div className="w-full max-w-[34rem] mx-auto text-center">
              <p className="mb-6" style={{ color: 'var(--heritage-green)', opacity: 0.9 }}>
                We could not load your account details right now.
              </p>
              <div className="flex flex-col gap-4">
                <a
                  href="/account"
                  className="account-option-button group"
                >
                  <span className="text-base md:text-lg uppercase tracking-wider font-medium">
                    TRY AGAIN
                  </span>
                </a>
                {/* Plain anchor: logout clears session cookie; must not be prefetched */}
                <a href="/api/auth/logout" className="account-option-button">
                  <span className="text-sm uppercase tracking-wider font-medium">Sign Out</span>
                </a>
              </div>
            </div>
          )}

          {result.status === 'authenticated' && (
            <div className="w-full max-w-3xl mx-auto bg-white/0 p-4 rounded">
              <div className="mb-6">
                {((result.customer.firstName as string) || (result.customer.lastName as string)) ? (
                  <>
                    <h2 style={{ color: 'var(--heritage-green)', fontFamily: 'Georgia, serif', fontWeight: 400 }} className="text-xl">{`${(result.customer.firstName as string) ?? ''} ${(result.customer.lastName as string) ?? ''}`.trim()}</h2>
                    <p style={{ color: 'var(--heritage-green)', opacity: 0.85 }}>{(result.customer.emailAddress as { emailAddress?: string })?.emailAddress}</p>
                  </>
                ) : (
                  <h2 style={{ color: 'var(--heritage-green)', fontFamily: 'Georgia, serif', fontWeight: 400 }} className="text-xl">{(result.customer.emailAddress as { emailAddress?: string })?.emailAddress}</h2>
                )}
              </div>

              <div className="flex gap-3">
                {/* Plain anchor: logout clears session cookie; must not be prefetched */}
                <a href="/api/auth/logout" className="account-option-button">
                  <span className="text-sm uppercase tracking-wider font-medium">Sign Out</span>
                </a>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
