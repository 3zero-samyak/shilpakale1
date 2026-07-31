import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import ProductPageHeader from '@/components/layout/ProductPageHeader';
import Footer from '@/components/layout/Footer';
import FullStoryContent from '@/components/stories/FullStoryContent';
import { getStoryBySlug, getAllStorySlug } from '@/data/stories';

interface StoryPageProps {
  params: {
    storySlug: string;
  };
}

// Generate static params for all story routes
export async function generateStaticParams() {
  return getAllStorySlug().map((storySlug) => ({
    storySlug,
  }));
}

// Generate metadata for each story
export async function generateMetadata({ params }: StoryPageProps): Promise<Metadata> {
  const story = getStoryBySlug(params.storySlug);

  if (!story) {
    return {
      title: 'Story Not Found | SHILPAKALE',
    };
  }

  return {
    title: `${story.storyTitle} | SHILPAKALE`,
    description: story.storyLine || story.preview,
  };
}

export default function StoryPage({ params }: StoryPageProps) {
  const story = getStoryBySlug(params.storySlug);

  // Return 404 if story not found
  if (!story) {
    notFound();
  }

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
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          style={{
            maxWidth: '88rem',
            marginInline: 'auto',
            paddingInline: 'clamp(1.5rem, 7vw, 9rem)',
            paddingTop: 'clamp(2rem, 3vw, 3rem)',
            paddingBottom: 'clamp(1rem, 1.5vw, 1.5rem)',
          }}
        >
          <ol
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              listStyle: 'none',
              padding: 0,
              margin: 0,
            }}
          >
            <li>
              <Link
                href="/"
                style={{
                  fontFamily: 'var(--font-montserrat)',
                  fontSize: 'clamp(0.75rem, 0.85vw, 0.82rem)',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'var(--heritage-green)',
                  opacity: 0.5,
                  textDecoration: 'none',
                  transition: 'opacity 200ms ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.8')}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.5')}
              >
                Home
              </Link>
            </li>
            <li
              style={{
                color: 'var(--heritage-green)',
                opacity: 0.3,
              }}
            >
              /
            </li>
            <li>
              <Link
                href="/stories"
                style={{
                  fontFamily: 'var(--font-montserrat)',
                  fontSize: 'clamp(0.75rem, 0.85vw, 0.82rem)',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'var(--heritage-green)',
                  opacity: 0.5,
                  textDecoration: 'none',
                  transition: 'opacity 200ms ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.8')}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.5')}
              >
                Stories
              </Link>
            </li>
            <li
              style={{
                color: 'var(--heritage-green)',
                opacity: 0.3,
              }}
            >
              /
            </li>
            <li
              style={{
                fontFamily: 'var(--font-montserrat)',
                fontSize: 'clamp(0.75rem, 0.85vw, 0.82rem)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--heritage-green)',
                opacity: 0.5,
              }}
            >
              {story.productName}
            </li>
          </ol>
        </nav>

        {/* Full Story Content */}
        <FullStoryContent story={story} />

        {/* Back to Stories Link */}
        <div
          style={{
            maxWidth: '88rem',
            marginInline: 'auto',
            paddingInline: 'clamp(1.5rem, 7vw, 9rem)',
            paddingTop: 'clamp(4rem, 6vw, 6rem)',
            paddingBottom: 'clamp(4rem, 6vw, 6rem)',
          }}
        >
          <Link
            href="/stories"
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
              padding: '0.75rem 0',
              borderBottom: '1px solid transparent',
              transition: 'border-color 200ms ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderBottomColor = 'var(--heritage-green)')}
            onMouseLeave={(e) => (e.currentTarget.style.borderBottomColor = 'transparent')}
          >
            ← STORIES
          </Link>
        </div>
      </main>

      <Footer />
    </>
  );
}
