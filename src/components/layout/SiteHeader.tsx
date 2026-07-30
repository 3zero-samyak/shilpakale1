import Link from 'next/link';
import Image from 'next/image';
import MobileNavigation from './MobileNavigation';

const navigation = [
  { name: 'HOME', href: '/' },
  { name: 'COLLECTION', href: '/collections' },
  { name: 'STORIES', href: '/stories' },
];

export default function SiteHeader() {
  return (
    <header
      id="site-masthead"
      className="relative w-full min-h-[100svh] overflow-hidden"
      style={{ backgroundColor: 'var(--heritage-green)' }}
    >
      {/* Top Edge Divider Line */}
      <div
        className="absolute top-0 left-0 right-0 h-px z-10"
        style={{ backgroundColor: 'rgba(110, 139, 116, 0.22)' }}
        aria-hidden="true"
      />

      {/* Top Navigation Band */}
      <nav
        className="relative z-20"
        style={{ height: 'clamp(5.5rem, 9vw, 7rem)' }}
        aria-label="Primary navigation"
      >
        <div className="h-full flex items-center justify-between px-[5vw]">
          {/* Logo Area */}
          <Link
            href="/"
            className="relative block focus:outline-none focus:ring-2 focus:ring-[var(--ivory-archive)] focus:ring-offset-2 focus:ring-offset-[var(--heritage-green)] rounded"
          >
            <Image
              src="/images/brand/shilpakale-logo.jpeg"
              alt="SHILPAKALE logo"
              width={160}
              height={64}
              className="object-contain"
              style={{ maxHeight: '4rem', width: 'auto', height: 'auto' }}
              priority
            />
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="header-nav-link text-[var(--ivory-archive)] text-sm tracking-wider focus:outline-none focus:ring-2 focus:ring-[var(--ivory-archive)] focus:ring-offset-2 focus:ring-offset-[var(--heritage-green)]"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <MobileNavigation />
        </div>
      </nav>

      {/* Below Navigation Divider Line */}
      <div
        className="absolute left-0 right-0 h-px z-10"
        style={{ 
          top: 'clamp(5.5rem, 9vw, 7rem)',
          backgroundColor: 'rgba(110, 139, 116, 0.22)' 
        }}
        aria-hidden="true"
      />

      {/* Center Content Wrapper - Absolutely Positioned and Centered */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10 px-4"
        style={{ minHeight: '100svh' }}
      >
        {/* Wordmark and Tagline Container */}
        <div className="flex flex-col items-center gap-4 sm:gap-6">
          {/* SHILPAKALE Wordmark */}
          <h1
            className="text-[var(--ivory-archive)] font-[var(--font-wordmark)] uppercase text-center"
            style={{
              fontSize: 'clamp(2.5rem, 8vw, 5rem)',
              letterSpacing: 'clamp(0.15em, 0.3vw, 0.25em)',
              fontWeight: 400,
            }}
          >
            SHILPAKALE
          </h1>

          {/* Tagline */}
          <p
            className="text-[var(--ivory-archive)] uppercase text-center tracking-wider opacity-90"
            style={{
              fontSize: 'clamp(0.75rem, 1.5vw, 1rem)',
              letterSpacing: '0.15em',
            }}
          >
            TRACING ROOTS. SHAPING FORMS.
          </p>
        </div>
      </div>

      {/* Bottom Edge Divider Line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px z-10"
        style={{ backgroundColor: 'rgba(110, 139, 116, 0.22)' }}
        aria-hidden="true"
      />
    </header>
  );
}
