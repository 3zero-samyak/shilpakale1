const cards = [
  {
    number: '01',
    title: 'Trace the Root',
    body: 'Every object starts as a system, material, route, ritual, or built intelligence — researched at the source, not invented.',
  },
  {
    number: '02',
    title: 'Reveal the Connection',
    body: 'The root is studied against the present — what it explains, what it still shapes, and why it still matters.',
  },
  {
    number: '03',
    title: 'Shape the Object',
    body: 'The research is translated into a physical form — precise, collectible, and built to be kept.',
  },
];

export default function BrandPositioning() {
  return (
    <section
      className="w-full bg-[var(--ivory-archive)] py-20 md:py-28"
      style={{ minHeight: '75svh' }}
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
            BRAND POSITIONING
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
            Not souvenirs. Physical archives.
          </h2>

          {/* Supporting Paragraph */}
          <p
            className="text-base md:text-lg"
            style={{
              color: 'var(--heritage-green)',
              opacity: 0.75,
              lineHeight: 1.6,
            }}
          >
            Shilpakale does not make generic decor or low-ticket keepsakes. Each object begins with a root: a system, a material, a route, a ritual, or a built intelligence. The story is studied, connected to the present, and then shaped into a collectible form.
          </p>
        </div>

        {/* Three-Column Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 lg:gap-8">
          {cards.map((card) => (
            <div
              key={card.number}
              className="border pt-8 pb-10 px-6 md:px-8"
              style={{
                borderColor: 'rgba(11, 58, 47, 0.15)',
              }}
            >
              {/* Card Number */}
              <p
                className="text-xs uppercase mb-4"
                style={{
                  color: 'var(--heritage-green)',
                  letterSpacing: '0.2em',
                  opacity: 0.5,
                }}
              >
                {card.number}
              </p>

              {/* Card Title */}
              <h3
                className="text-xl md:text-2xl mb-4"
                style={{
                  color: 'var(--heritage-green)',
                  fontFamily: 'Georgia, serif',
                  fontWeight: 400,
                  lineHeight: 1.3,
                }}
              >
                {card.title}
              </h3>

              {/* Card Body */}
              <p
                className="text-sm md:text-base"
                style={{
                  color: 'var(--heritage-green)',
                  opacity: 0.7,
                  lineHeight: 1.7,
                }}
              >
                {card.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
