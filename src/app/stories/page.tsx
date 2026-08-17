import ProductPageHeader from '@/components/layout/ProductPageHeader';
import Footer from '@/components/layout/Footer';
import StoryIndexEntry from '@/components/stories/StoryIndexEntry';
import { stories } from '@/data/stories';

export const metadata = {
  title: 'Stories | SHILPAKALE',
  description: 'Nine objects. Nine researched foundations. Each SHILPAKALE object begins with a place, material, system, landscape, ritual, or idea worth tracing.',
};

export default function StoriesPage() {
  return (
    <>
      <ProductPageHeader />
      
      <main
        style={{
          backgroundColor: 'var(--ivory-archive)',
          minHeight: '70svh',
          paddingTop: 'clamp(3.5rem, 5vw, 4rem)',
        }}
      >
        <div
          style={{
            maxWidth: '88rem',
            marginInline: 'auto',
            paddingInline: 'clamp(1.5rem, 7vw, 9rem)',
            paddingBlock: 'clamp(4rem, 8vw, 8rem)',
          }}
        >
          {/* Page Introduction */}
          <div
            style={{
              marginBottom: 'clamp(4rem, 7vw, 7rem)',
              maxWidth: '58rem',
            }}
          >
            {/* Section Label */}
            <p
              style={{
                fontFamily: 'var(--font-montserrat)',
                fontSize: 'clamp(0.7rem, 0.85vw, 0.8rem)',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--archive-sage)',
                fontWeight: 500,
                marginBottom: 'clamp(1rem, 1.5vw, 1.5rem)',
              }}
            >
              THE STORY ARCHIVE
            </p>

            {/* Main Heading */}
            <h1
              style={{
                fontFamily: 'Georgia, serif',
                fontSize: 'clamp(2.5rem, 5vw, 5rem)',
                lineHeight: 1.1,
                letterSpacing: '-0.003em',
                color: 'var(--heritage-green)',
                fontWeight: 400,
                marginBottom: 'clamp(1.5rem, 2.5vw, 2.5rem)',
              }}
            >
              Nine objects. Nine researched foundations.
            </h1>

            {/* Supporting Line */}
            <p
              style={{
                fontSize: 'clamp(1.05rem, 1.4vw, 1.35rem)',
                lineHeight: 1.6,
                color: 'var(--heritage-green)',
                opacity: 0.75,
              }}
            >
              Each SHILPAKALE object begins with a place, material, system, landscape, ritual, or idea worth tracing.
            </p>
          </div>

          {/* Story Entries */}
          <div>
            {stories.map((story, index) => (
              <StoryIndexEntry
                key={story.storySlug}
                story={story}
                isLast={index === stories.length - 1}
              />
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
