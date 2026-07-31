import type { ShilpakaleStory } from '@/data/stories';

interface FullStoryContentProps {
  story: ShilpakaleStory;
}

export default function FullStoryContent({ story }: FullStoryContentProps) {
  return (
    <article
      style={{
        maxWidth: '88rem',
        marginInline: 'auto',
        paddingInline: 'clamp(1.5rem, 7vw, 9rem)',
        paddingBlock: 'clamp(4rem, 8vw, 8rem)',
      }}
    >
      {/* Story Hero */}
      <div
        style={{
          maxWidth: '62rem',
          marginBottom: 'clamp(5rem, 8vw, 8rem)',
        }}
      >
        {/* Story Number */}
        <p
          style={{
            fontFamily: 'var(--font-montserrat)',
            fontSize: 'clamp(0.7rem, 0.85vw, 0.8rem)',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--archive-sage)',
            fontWeight: 500,
            marginBottom: 'clamp(1.5rem, 2vw, 2rem)',
          }}
        >
          STORY {story.number}
        </p>

        {/* Product Name */}
        <h1
          style={{
            fontFamily: 'Georgia, serif',
            fontSize: 'clamp(3rem, 7vw, 7.5rem)',
            lineHeight: 0.95,
            letterSpacing: '-0.025em',
            color: 'var(--heritage-green)',
            fontWeight: 400,
            marginBottom: 'clamp(1.5rem, 2.5vw, 2.5rem)',
          }}
        >
          {story.productName}
        </h1>

        {/* Story Title */}
        <h2
          style={{
            fontFamily: 'var(--font-montserrat)',
            fontSize: 'clamp(0.75rem, 1.1vw, 1rem)',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--heritage-green)',
            fontWeight: 500,
            lineHeight: 1.4,
            marginBottom: 'clamp(1.5rem, 2.5vw, 2.5rem)',
          }}
        >
          {story.storyTitle}
        </h2>

        {/* Story Line */}
        <p
          style={{
            fontSize: 'clamp(1.05rem, 1.35vw, 1.3rem)',
            lineHeight: 1.5,
            color: 'var(--heritage-green)',
            opacity: 0.7,
            marginBottom: 'clamp(2rem, 3vw, 3rem)',
          }}
        >
          {story.storyLine}
        </p>

        {/* Opening Statement */}
        <p
          style={{
            fontSize: 'clamp(1.35rem, 2.2vw, 2.4rem)',
            lineHeight: 1.45,
            color: 'var(--heritage-green)',
            opacity: 0.9,
          }}
        >
          {story.openingStatement}
        </p>
      </div>

      {/* Story Sections */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'clamp(4rem, 6vw, 6rem)',
        }}
      >
        {story.sections.map((section, index) => (
          <section
            key={index}
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(3rem, 7rem) minmax(0, 58rem)',
              gap: 'clamp(1.5rem, 3vw, 3rem)',
            }}
            className="story-section"
          >
            {/* Section Number */}
            <div
              style={{
                fontFamily: 'var(--font-montserrat)',
                fontSize: 'clamp(0.85rem, 1vw, 0.95rem)',
                fontWeight: 500,
                letterSpacing: '0.08em',
                color: 'rgba(11, 58, 47, 0.3)',
                paddingTop: '0.25rem',
              }}
            >
              {String(index + 1).padStart(2, '0')}
            </div>

            {/* Section Content */}
            <div>
              {/* Section Heading */}
              <h3
                style={{
                  fontFamily: 'var(--font-montserrat)',
                  fontSize: 'clamp(0.8rem, 1vw, 0.95rem)',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: 'var(--heritage-green)',
                  fontWeight: 600,
                  marginBottom: 'clamp(1.5rem, 2vw, 2rem)',
                }}
              >
                {section.heading}
              </h3>

              {/* Paragraphs */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'clamp(1.25rem, 1.75vw, 1.75rem)',
                }}
              >
                {section.paragraphs.map((paragraph, pIndex) => (
                  <p
                    key={pIndex}
                    style={{
                      fontSize: 'clamp(1rem, 1.2vw, 1.18rem)',
                      lineHeight: 1.85,
                      color: 'var(--heritage-green)',
                      opacity: 0.85,
                      textAlign: 'left',
                    }}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </section>
        ))}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .story-section {
            grid-template-columns: 1fr !important;
            gap: clamp(1rem, 2vw, 1.5rem) !important;
          }
        }
      `}</style>
    </article>
  );
}
