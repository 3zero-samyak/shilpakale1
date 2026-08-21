import Link from 'next/link';
import Image from 'next/image';
import type { ShilpakaleStory } from '@/data/stories';

interface StoryIndexEntryProps {
  story: ShilpakaleStory;
  isLast?: boolean;
}

export default function StoryIndexEntry({ story, isLast = false }: StoryIndexEntryProps) {
  return (
    <article>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(4rem, 8rem) minmax(5rem, 7rem) minmax(0, 1fr)',
          gap: 'clamp(1.5rem, 3vw, 3rem)',
          paddingBlock: 'clamp(3rem, 5vw, 5rem)',
          alignItems: 'start',
        }}
        className="story-entry-container"
      >
        {/* Number Column */}
        <div
          style={{
            fontFamily: 'var(--font-montserrat)',
            fontSize: 'clamp(1rem, 1.4vw, 1.3rem)',
            fontWeight: 500,
            letterSpacing: '0.08em',
            color: 'rgba(11, 58, 47, 0.4)',
            paddingTop: '0.5rem',
          }}
          className="story-entry-number"
        >
          {story.number}
        </div>
        {/* Icon Column */}
        {story.iconSrc ? (
          <div style={{ paddingTop: '0.25rem' }} className="story-entry-icon">
            <Image
              src={story.iconSrc}
              alt={`${story.productName} symbol`}
              width={120}
              height={120}
              style={{
                width: 'clamp(3.5rem, 7vw, 7rem)',
                height: 'auto',
                objectFit: 'contain',
              }}
            />
          </div>
        ) : (
          <div />
        )}

        {/* Content Column */}
        <div>
          {/* Product Name */}
          <h2
            style={{
              fontFamily: 'Georgia, serif',
              fontSize: 'clamp(2.25rem, 4.8vw, 5.5rem)',
              lineHeight: 1,
              letterSpacing: '-0.005em',
              color: 'var(--heritage-green)',
              fontWeight: 400,
              marginBottom: 'clamp(0.75rem, 1.5vw, 1.5rem)',
            }}
          >
            {story.productName}
          </h2>

          {/* Story Title */}
          <h3
            style={{
              fontFamily: 'var(--font-montserrat)',
              fontSize: 'clamp(0.72rem, 1vw, 0.95rem)',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'var(--archive-sage)',
              fontWeight: 500,
              lineHeight: 1.4,
              marginBottom: 'clamp(1.5rem, 2.5vw, 2.5rem)',
            }}
          >
            {story.storyTitle}
          </h3>

          {/* Preview Glimpse */}
          <p
            style={{
              maxWidth: '58rem',
              fontSize: 'clamp(1rem, 1.35vw, 1.3rem)',
              lineHeight: 1.65,
              color: 'var(--heritage-green)',
              opacity: 0.8,
              marginBottom: 'clamp(1.5rem, 2.5vw, 2.5rem)',
            }}
          >
            {story.preview}
          </p>

          {/* Read Full Story Link */}
          <Link
            href={`/stories/${story.storySlug}`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontFamily: 'var(--font-montserrat)',
              fontSize: 'clamp(0.8rem, 0.95vw, 0.9rem)',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--heritage-green)',
              fontWeight: 500,
              textDecoration: 'none',
            }}
          >
            READ FULL STORY →
          </Link>
        </div>
      </div>

      {/* Divider */}
      {!isLast && (
        <div
          style={{
            width: '100%',
            height: '1px',
            backgroundColor: 'var(--archive-sage)',
            opacity: 0.25,
          }}
        />
      )}

      <style>{`
        .story-entry-container a:hover {
          text-decoration: underline;
        }

        .story-entry-container a:focus {
          outline: 2px solid var(--heritage-green);
          outline-offset: 4px;
          border-radius: 2px;
        }

        @media (max-width: 420px) {
          .story-entry-container {
            grid-template-columns: 1fr !important;
            gap: clamp(1rem, 2vw, 1.5rem) !important;
          }

          .story-entry-number {
            padding-top: 0 !important;
          }
        }

        @media (min-width: 421px) and (max-width: 1024px) {
          .story-entry-container {
            grid-template-columns: minmax(4rem, 6rem) minmax(3.5rem, 6rem) minmax(0, 1fr) !important;
            gap: clamp(1rem, 3vw, 2rem) !important;
          }
        }
      `}</style>
    </article>
  );
}
