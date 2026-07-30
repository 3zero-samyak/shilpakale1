import WhyShilpakaleSlider from './WhyShilpakaleSlider';

const slides = [
  {
    id: 1,
    content: (
      <div className="max-w-4xl">
        {/* Eyebrow */}
        <p
          className="text-xs md:text-sm uppercase mb-6 md:mb-8"
          style={{
            color: 'var(--ivory-archive)',
            letterSpacing: '0.2em',
          }}
        >
          WHY SHILPAKALE EXISTS
        </p>

        {/* Main Heading */}
        <h2
          className="text-3xl md:text-5xl lg:text-6xl mb-6 md:mb-8"
          style={{
            color: 'var(--ivory-archive)',
            fontFamily: 'Georgia, serif',
            fontWeight: 400,
            lineHeight: 1.2,
          }}
        >
          We walked into tourist shops across India —<br />
          and left disappointed. Every single time.
        </h2>

        {/* Body Copy */}
        <p
          className="text-base md:text-lg max-w-2xl"
          style={{
            color: 'var(--ivory-archive)',
            lineHeight: 1.7,
            opacity: 0.95,
          }}
        >
          Plastic. Fading. Forgettable. The fridge magnets peeled in a week. The
          tabletop models looked nothing like the monuments they claimed to
          represent. A product of such poor quality felt like an insult to the
          places that inspired them.
        </p>
      </div>
    ),
  },
  {
    id: 2,
    content: (
      <div className="max-w-4xl">
        {/* Eyebrow */}
        <p
          className="text-xs md:text-sm uppercase mb-6 md:mb-8"
          style={{
            color: 'var(--ivory-archive)',
            letterSpacing: '0.2em',
          }}
        >
          WHY SHILPAKALE EXISTS
        </p>

        {/* Lead Line */}
        <h3
          className="text-2xl md:text-4xl lg:text-5xl mb-4 md:mb-6"
          style={{
            color: 'var(--ivory-archive)',
            fontFamily: 'Georgia, serif',
            fontWeight: 600,
            lineHeight: 1.3,
          }}
        >
          Either cheap or inaccessible.
        </h3>

        {/* Body Copy */}
        <p
          className="text-base md:text-lg max-w-2xl"
          style={{
            color: 'var(--ivory-archive)',
            lineHeight: 1.7,
            opacity: 0.95,
          }}
        >
          Anything premium cost ₹5,000 or more and was out of reach for most. The
          space between &ldquo;cheap plastic&rdquo; and &ldquo;luxury museum piece&rdquo; was completely
          empty. Nobody was making something worthy of India&rsquo;s heritage at an
          honest price.
        </p>
      </div>
    ),
  },
  {
    id: 3,
    content: (
      <div className="max-w-4xl">
        {/* Eyebrow */}
        <p
          className="text-xs md:text-sm uppercase mb-6 md:mb-8"
          style={{
            color: 'var(--ivory-archive)',
            letterSpacing: '0.2em',
          }}
        >
          WHY SHILPAKALE EXISTS
        </p>

        {/* Lead Line */}
        <h3
          className="text-2xl md:text-4xl lg:text-5xl mb-4 md:mb-6"
          style={{
            color: 'var(--ivory-archive)',
            fontFamily: 'Georgia, serif',
            fontWeight: 600,
            lineHeight: 1.3,
          }}
        >
          Great minds reduced to poster frames.
        </h3>

        {/* Body Copy */}
        <p
          className="text-base md:text-lg max-w-2xl"
          style={{
            color: 'var(--ivory-archive)',
            lineHeight: 1.7,
            opacity: 0.95,
          }}
        >
          Vivekananda. Ambedkar. Tesla. The people who shaped thought deserved
          more than a 2D frame behind glass. There was nothing 3-dimensional,
          nothing you could hold — nothing worthy of a serious person&rsquo;s desk.
        </p>
      </div>
    ),
  },
];

export default function WhyShilpakale() {
  return (
    <section
      className="w-full bg-[var(--heritage-green)]"
      style={{ minHeight: '50svh' }}
    >
      <div className="max-w-7xl mx-auto">
        <WhyShilpakaleSlider slides={slides} />
      </div>
    </section>
  );
}
