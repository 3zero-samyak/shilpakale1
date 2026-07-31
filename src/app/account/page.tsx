import Link from 'next/link';
import ProductPageHeader from '@/components/layout/ProductPageHeader';

export const metadata = {
  title: 'Account | SHILPAKALE',
  description: 'Access your SHILPAKALE account or continue browsing the archive.',
};

export default function AccountPage() {
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
        <div className="w-full max-w-[34rem] mx-auto px-6">
          {/* Heading */}
          <h1
            className="text-3xl md:text-4xl text-center mb-12"
            style={{
              color: 'var(--heritage-green)',
              fontFamily: 'Georgia, serif',
              fontWeight: 400,
            }}
          >
            Account Access
          </h1>

          {/* Options */}
          <div className="flex flex-col gap-4">
            {/* Continue Without Sign In */}
            <Link
              href="/"
              className="account-option-button group"
            >
              <span className="text-base md:text-lg uppercase tracking-wider font-medium">
                CONTINUE WITHOUT SIGN IN
              </span>
            </Link>

            {/* Sign In */}
            <Link
              href="/account/sign-in"
              className="account-option-button group"
            >
              <span className="text-base md:text-lg uppercase tracking-wider font-medium">
                SIGN IN
              </span>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
