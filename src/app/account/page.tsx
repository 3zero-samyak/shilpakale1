import ProductPageHeader from '@/components/layout/ProductPageHeader';
import { getAuthenticatedCustomer } from '@/lib/shopify/customer-account/client';

export const metadata = {
  title: 'Account | SHILPAKALE',
  description: 'Access your SHILPAKALE account or continue browsing the archive.',
};

export default async function AccountPage() {
  const customer = await getAuthenticatedCustomer();

  return (
    <>
      <ProductPageHeader />

      <main
        className="w-full min-h-[80svh] flex items-center justify-center"
        style={{
          paddingTop: 'clamp(3.5rem, 5vw, 4rem)',
          backgroundColor: 'var(--ivory-archive)',
        }}
      >
        <div className="w-full max-w-[48rem] mx-auto px-6">
          {/* Heading */}
          <h1
            className="text-3xl md:text-4xl text-center mb-8"
            style={{
              color: 'var(--heritage-green)',
              fontFamily: 'Georgia, serif',
              fontWeight: 400,
            }}
          >
            ACCOUNT
          </h1>

          {!customer ? (
            <div className="w-full max-w-[34rem] mx-auto">
              <p className="mb-6 text-center" style={{ color: 'var(--heritage-green)', opacity: 0.9 }}>
                Sign in to view your SHILPAKALE account, orders and account details.
              </p>

              <div className="flex flex-col gap-4">
                {/* Plain anchor: OAuth initiation is side-effectful; must not be prefetched */}
                <a
                  href="/api/auth/login?returnTo=/account"
                  className="account-option-button group"
                >
                  <span className="text-base md:text-lg uppercase tracking-wider font-medium">
                    SIGN IN
                  </span>
                </a>
              </div>
            </div>
          ) : (
            <div className="w-full max-w-3xl mx-auto bg-white/0 p-4 rounded">
              <div className="mb-6">
                <h2 style={{ color: 'var(--heritage-green)', fontFamily: 'Georgia, serif', fontWeight: 400 }} className="text-xl">{customer.displayName || `${customer.firstName ?? ''} ${customer.lastName ?? ''}`}</h2>
                <p style={{ color: 'var(--heritage-green)', opacity: 0.85 }}>{customer.emailAddress?.emailAddress}</p>
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
