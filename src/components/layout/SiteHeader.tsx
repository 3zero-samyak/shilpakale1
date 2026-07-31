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

      {/* Center Content Wrapper - Absolutely Positioned and Centered */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center px-4"
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
