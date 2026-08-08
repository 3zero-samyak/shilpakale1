import Image from 'next/image';

export default function SiteHeader() {
  return (
    <header
      id="site-masthead"
      className="homepage-hero"
      aria-label="SHILPAKALE"
    >
      {/* Screen reader accessible content */}
      <h1 className="sr-only">
        SHILPAKALE
        <span className="block mt-2">TRACING ROOTS. SHAPING FORMS.</span>
      </h1>

      {/* Homepage hero image */}
      <Image
        src="/images/brand/homepage.jpeg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="homepage-hero-image"
      />
    </header>
  );
}
