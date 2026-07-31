import { notFound } from 'next/navigation';
import Link from 'next/link';
import ProductPageHeader from '@/components/layout/ProductPageHeader';

// Supported platforms
const platforms = {
  instagram: {
    name: 'INSTAGRAM',
    description: 'The official SHILPAKALE connection will be added here once the channel is ready.',
  },
  youtube: {
    name: 'YOUTUBE',
    description: 'The official SHILPAKALE connection will be added here once the channel is ready.',
  },
  twitter: {
    name: 'X / TWITTER',
    description: 'The official SHILPAKALE connection will be added here once the channel is ready.',
  },
  whatsapp: {
    name: 'WHATSAPP',
    description: 'The official SHILPAKALE connection will be added here once the channel is ready.',
  },
};

// Generate static params
export function generateStaticParams() {
  return Object.keys(platforms).map((platform) => ({
    platform,
  }));
}

// Generate metadata
export function generateMetadata({ params }: { params: { platform: string } }) {
  const platformData = platforms[params.platform as keyof typeof platforms];

  if (!platformData) {
    return {
      title: 'Platform Not Found | SHILPAKALE',
    };
  }

  return {
    title: `${platformData.name} | SHILPAKALE`,
    description: platformData.description,
  };
}

export default function ConnectPlatformPage({ params }: { params: { platform: string } }) {
  const platformData = platforms[params.platform as keyof typeof platforms];

  if (!platformData) {
    notFound();
  }

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
            paddingBlock: 'clamp(6rem, 12vw, 10rem)',
            paddingInline: 'clamp(1.5rem, 7vw, 9rem)',
            minHeight: '60svh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
          }}
        >
          {/* Platform Heading */}
          <h1
            style={{
              fontFamily: 'var(--font-montserrat)',
              fontSize: 'clamp(1.2rem, 1.5vw, 1.4rem)',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'var(--heritage-green)',
              fontWeight: 600,
              marginBottom: 'clamp(2rem, 4vw, 3rem)',
            }}
          >
            {platformData.name}
          </h1>

          {/* Description */}
          <p
            style={{
              fontSize: 'clamp(1.05rem, 1.22vw, 1.18rem)',
              lineHeight: 1.7,
              color: 'var(--heritage-green)',
              opacity: 0.8,
              maxWidth: '42rem',
              marginBottom: 'clamp(3rem, 5vw, 4rem)',
            }}
          >
            {platformData.description}
          </p>

          {/* Back to Home Link */}
          <Link
            href="/"
            style={{
              display: 'inline-flex',
              fontFamily: 'var(--font-montserrat)',
              fontSize: 'clamp(0.85rem, 1vw, 0.95rem)',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--heritage-green)',
              textDecoration: 'none',
              fontWeight: 500,
              borderBottom: '1px solid var(--heritage-green)',
              paddingBottom: '0.25rem',
            }}
          >
            ← HOME
          </Link>
        </article>
      </main>
    </>
  );
}
