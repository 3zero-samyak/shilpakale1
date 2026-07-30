import PhilosophyTimeline from './PhilosophyTimeline';

export default function ProductPhilosophy() {
  return (
    <section
      className="w-full bg-[var(--ivory-archive)] py-20 md:py-28"
      style={{ minHeight: '70svh' }}
    >
      <div className="max-w-7xl mx-auto px-[5vw]">
        {/* Heading Block */}
        <div className="mb-16 md:mb-20 max-w-3xl">
          {/* Eyebrow */}
          <p
            className="text-xs md:text-sm uppercase mb-4 md:mb-6"
            style={{
              color: 'var(--heritage-green)',
              letterSpacing: '0.2em',
            }}
          >
            PRODUCT PHILOSOPHY
          </p>

          {/* Main Heading */}
          <h2
            className="text-3xl md:text-5xl lg:text-6xl mb-4 md:mb-6"
            style={{
              color: 'var(--heritage-green)',
              fontFamily: 'Georgia, serif',
              fontWeight: 400,
              lineHeight: 1.2,
            }}
          >
            From story to object is not enough.
          </h2>

          {/* Supporting Sentence */}
          <p
            className="text-base md:text-lg"
            style={{
              color: 'var(--heritage-green)',
              opacity: 0.75,
              lineHeight: 1.6,
            }}
          >
            Every Shilpakale object follows a stricter path.
          </p>
        </div>

        {/* Timeline */}
        <PhilosophyTimeline />
      </div>
    </section>
  );
}
