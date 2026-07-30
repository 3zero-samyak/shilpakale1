import Link from 'next/link';
import { collections } from '@/data/collections';

export default function MasterCollections() {
  return (
    <section
      id="master-collections"
      className="w-full py-20 md:py-28"
      style={{
        backgroundColor: 'var(--heritage-green)',
        minHeight: '75svh',
      }}
    >
      <div className="max-w-7xl mx-auto px-[5vw]">
        {/* Heading Block */}
        <div className="mb-16 md:mb-20 max-w-4xl">
          {/* Eyebrow */}
          <p
            className="text-xs md:text-sm uppercase mb-4 md:mb-6"
            style={{
              color: 'var(--ivory-archive)',
              letterSpacing: '0.2em',
              opacity: 0.7,
            }}
          >
            MASTER COLLECTIONS
          </p>

          {/* Main Heading */}
          <h2
            className="text-3xl md:text-5xl lg:text-6xl"
            style={{
              color: 'var(--ivory-archive)',
              fontFamily: 'Georgia, serif',
              fontWeight: 400,
              lineHeight: 1.2,
            }}
          >
            Six Collections of Civilizational
            <br />
            Intelligence
          </h2>
        </div>

        {/* Three-Column Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 lg:gap-8">
          {collections.map((collection) => (
            <Link
              key={collection.id}
              href={`/collections/${collection.id}`}
              className="group block border pt-8 pb-10 px-6 md:px-8 transition-opacity hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-[var(--ivory-archive)] focus:ring-offset-2 focus:ring-offset-[var(--heritage-green)]"
              style={{
                borderColor: 'rgba(110, 139, 116, 0.25)',
              }}
            >
              {/* Collection Number */}
              <p
                className="text-xs uppercase mb-4"
                style={{
                  color: 'var(--ivory-archive)',
                  letterSpacing: '0.2em',
                  opacity: 0.5,
                }}
              >
                {collection.number}
              </p>

              {/* Collection Title */}
              <h3
                className="text-xl md:text-2xl mb-2"
                style={{
                  color: 'var(--ivory-archive)',
                  fontFamily: 'Georgia, serif',
                  fontWeight: 400,
                  lineHeight: 1.3,
                }}
              >
                {collection.title}
              </h3>

              {/* Collection Subtitle */}
              <p
                className="text-xs uppercase mb-4"
                style={{
                  color: 'var(--archive-sage)',
                  letterSpacing: '0.15em',
                }}
              >
                {collection.subtitle}
              </p>

              {/* Collection Description */}
              <p
                className="text-sm md:text-base"
                style={{
                  color: 'var(--ivory-archive)',
                  opacity: 0.7,
                  lineHeight: 1.7,
                }}
              >
                {collection.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
