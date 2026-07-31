export default function BrandPositioning() {
  return (
    <section
      className="w-full bg-[var(--ivory-archive)]"
      style={{
        paddingBlock: 'clamp(5rem, 10vw, 9rem)',
        paddingInline: 'clamp(1.5rem, 6vw, 6rem)',
      }}
      aria-labelledby="brand-position-heading"
    >
      <div
        style={{
          maxWidth: '78rem',
          marginInline: 'auto',
        }}
      >
        {/* Section Label */}
        <p
          id="brand-position-heading"
          className="uppercase"
          style={{
            color: 'var(--heritage-green)',
            fontSize: 'clamp(0.72rem, 0.9vw, 0.9rem)',
            letterSpacing: '0.22em',
            lineHeight: 1.2,
            marginBottom: 'clamp(2rem, 4vw, 3.5rem)',
            textAlign: 'center',
          }}
        >
          BRAND POSITION
        </p>

        {/* Brand Positioning Statement */}
        <p
          style={{
            color: 'var(--heritage-green)',
            fontFamily: 'Georgia, serif',
            fontSize: 'clamp(1.75rem, 3vw, 3.5rem)',
            lineHeight: 1.22,
            letterSpacing: '-0.01em',
            maxWidth: '56rem',
            marginInline: 'auto',
            textAlign: 'center',
          }}
        >
          SHILPAKALE traces the intelligence embedded in places, materials, systems, and traditions. Each object begins with research and is shaped through evidence, context, and present relevance. The result is not generic décor, but a considered physical archive. Every form is designed to preserve a story with precision, restraint, and permanence. Together, these objects create a collectible record of ideas that continue to shape the present. SHILPAKALE exists to turn researched narratives into forms worthy of being kept.
        </p>
      </div>
    </section>
  );
}
