import Link from 'next/link';
import ProductPageHeader from '@/components/layout/ProductPageHeader';

export const metadata = {
  title: 'The SHILPAKALE Journal | SHILPAKALE',
  description: 'Research notes, material studies, architectural observations, and stories behind the objects.',
};

// Journal entries data
const journalEntries = [
  {
    slug: 'light-shadow-and-architectural-time',
    category: 'ARCHITECTURE',
    title: 'Light, Shadow, and the Architecture of Time',
    excerpt:
      'Fortification towers, walls, and elevated observation posts were designed to control sight lines across territory. The relationship between geometry, light, and strategic advantage shaped their positioning and proportions.',
  },
  {
    slug: 'subtraction-as-a-way-of-making',
    category: 'FORM',
    title: 'Subtraction as a Way of Making',
    excerpt:
      'Removal may be more important than addition when making a form that needs clarity. Whether removing mass from stone, cleaning a digital model, or choosing which detail to omit, subtraction defines the final presence.',
  },
  {
    slug: 'landscape-as-strategy',
    category: 'GEOGRAPHY',
    title: 'When Landscape Becomes Strategy',
    excerpt:
      'Hill forts, settlement patterns, and coastal observation posts were placed according to topography, water, and the movement of people. Physical geography was treated as a tactical system rather than decoration.',
  },
  {
    slug: 'the-sea-as-a-route-of-power',
    category: 'MARITIME HISTORY',
    title: 'The Sea as a Route of Power',
    excerpt:
      'Maritime trade routes brought not just commodities, but also control, fortification vocabulary, and cultural dominance. Coastal architecture reflected the presence of those who held the routes.',
  },
  {
    slug: 'surface-pattern-and-domestic-memory',
    category: 'MATERIAL CULTURE',
    title: 'Surface, Pattern, and Domestic Memory',
    excerpt:
      'Domestic objects such as trays, containers, and serving ware were shaped by both use and inherited visual systems. Geometric patterns encoded ideas of order, division, and boundary.',
  },
  {
    slug: 'time-measured-through-water',
    category: 'INFRASTRUCTURE',
    title: 'Time Measured Through Water',
    excerpt:
      'Wells, step-wells, reservoirs, and irrigation systems were infrastructural monuments. They represented not only water management but also the temporal rhythms of settlement, scarcity, and daily routine.',
  },
];

export default function BlogPage() {
  return (
    <>
      <ProductPageHeader />

      <main
        style={{
          width: '100%',
          backgroundColor: 'var(--ivory-archive)',
          paddingTop: 'clamp(3.5rem, 5vw, 4rem)',
        }}
      >
        <article
          style={{
            width: '100%',
            maxWidth: '100rem',
            marginInline: 'auto',
            paddingBlock: 'clamp(4rem, 8vw, 8rem)',
            paddingInline: 'clamp(1.5rem, 7vw, 9rem)',
          }}
        >
          {/* Page Heading */}
          <h1
            style={{
              fontFamily: 'Georgia, serif',
              fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              color: 'var(--heritage-green)',
              fontWeight: 400,
              marginBottom: 'clamp(1.5rem, 3vw, 2.5rem)',
            }}
          >
            THE SHILPAKALE JOURNAL
          </h1>

          {/* Supporting Copy */}
          <div
            style={{
              maxWidth: '58rem',
              marginBottom: 'clamp(4rem, 7vw, 6rem)',
            }}
          >
            <p
              style={{
                fontSize: 'clamp(1.1rem, 1.35vw, 1.3rem)',
                lineHeight: 1.6,
                color: 'var(--heritage-green)',
                opacity: 0.85,
              }}
            >
              Research notes, material studies, architectural observations, and stories behind the objects.
            </p>
          </div>

          {/* Journal Entries */}
          <div
            style={{
              maxWidth: '75rem',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 28rem), 1fr))',
              gap: 'clamp(3rem, 5vw, 4rem)',
            }}
          >
            {journalEntries.map((entry) => (
              <article
                key={entry.slug}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  paddingBottom: 'clamp(2rem, 3vw, 2.5rem)',
                  borderBottom: '1px solid rgba(11, 58, 47, 0.15)',
                }}
              >
                {/* Category */}
                <p
                  style={{
                    fontFamily: 'var(--font-montserrat)',
                    fontSize: 'clamp(0.7rem, 0.85vw, 0.82rem)',
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: 'var(--archive-sage)',
                    fontWeight: 600,
                    marginBottom: '1rem',
                  }}
                >
                  {entry.category}
                </p>

                {/* Title */}
                <h2
                  style={{
                    fontFamily: 'Georgia, serif',
                    fontSize: 'clamp(1.5rem, 2.2vw, 2rem)',
                    lineHeight: 1.3,
                    letterSpacing: '-0.01em',
                    color: 'var(--heritage-green)',
                    fontWeight: 400,
                    marginBottom: '1.25rem',
                  }}
                >
                  {entry.title}
                </h2>

                {/* Excerpt */}
                <p
                  style={{
                    fontSize: 'clamp(1rem, 1.12vw, 1.08rem)',
                    lineHeight: 1.7,
                    color: 'var(--heritage-green)',
                    opacity: 0.8,
                    marginBottom: '1.5rem',
                    flexGrow: 1,
                  }}
                >
                  {entry.excerpt}
                </p>

                {/* Read Link */}
                <Link
                  href={`/blog/${entry.slug}`}
                  style={{
                    display: 'inline-flex',
                    alignSelf: 'flex-start',
                    fontFamily: 'var(--font-montserrat)',
                    fontSize: 'clamp(0.82rem, 0.95vw, 0.92rem)',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: 'var(--heritage-green)',
                    textDecoration: 'none',
                    fontWeight: 500,
                    borderBottom: '1px solid var(--heritage-green)',
                    paddingBottom: '0.25rem',
                  }}
                >
                  READ ARTICLE →
                </Link>
              </article>
            ))}
          </div>
        </article>
      </main>
    </>
  );
}
