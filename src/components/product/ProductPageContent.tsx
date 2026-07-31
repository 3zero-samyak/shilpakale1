'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Product } from '@/data/collections';
import StoryOverlay from './StoryOverlay';

interface ProductPageContentProps {
  product: Product;
}

export default function ProductPageContent({ product }: ProductPageContentProps) {
  const [isStoryOpen, setIsStoryOpen] = useState(false);

  return (
    <>
      {/* Full-Screen Product Hero with Overlay */}
      <div className="relative w-full h-screen">
        <Image
          src={product.image}
          alt={product.name}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        
        {/* Product Info Overlay - Lower Left */}
        <div className="absolute bottom-0 left-0 right-0 p-[5vw] md:p-[8vw] lg:p-[6vw]">
          <div className="max-w-2xl">
            {/* Product Name */}
            <h1
              className="text-4xl md:text-5xl lg:text-6xl mb-3 md:mb-4"
              style={{
                color: 'var(--ivory-archive)',
                fontFamily: 'Georgia, serif',
                fontWeight: 400,
                lineHeight: 1.1,
                textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
              }}
            >
              {product.name}
            </h1>

            {/* Story Line / Description */}
            <p
              className="text-lg md:text-xl lg:text-2xl mb-4 md:mb-6"
              style={{
                color: 'var(--ivory-archive)',
                opacity: 0.95,
                lineHeight: 1.4,
                textShadow: '0 1px 4px rgba(0, 0, 0, 0.3)',
              }}
            >
              {product.description}
            </p>

            {/* READ STORY Button */}
            {product.story && (
              <button
                onClick={() => setIsStoryOpen(true)}
                className="inline-flex items-center text-sm md:text-base lg:text-lg uppercase tracking-wider hover:opacity-70 transition-opacity focus:outline-none focus:ring-2 focus:ring-[var(--ivory-archive)] focus:ring-offset-2 focus:ring-offset-transparent rounded px-2 py-1"
                style={{
                  color: 'var(--ivory-archive)',
                  letterSpacing: '0.1em',
                  textShadow: '0 1px 4px rgba(0, 0, 0, 0.3)',
                }}
              >
                READ STORY →
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Divider */}
      <div
        className="w-full border-t"
        style={{
          borderColor: 'rgba(11, 58, 47, 0.15)',
        }}
      ></div>

      {/* Long Description Section */}
      {product.longDescription && (
        <section className="w-full py-16 md:py-20">
          <div className="max-w-4xl mx-auto px-[5vw]">
            <p
              className="text-base md:text-lg"
              style={{
                color: 'var(--heritage-green)',
                opacity: 0.8,
                lineHeight: 1.7,
              }}
            >
              {product.longDescription}
            </p>
          </div>
        </section>
      )}

      {/* Divider */}
      <div
        className="w-full border-t"
        style={{
          borderColor: 'rgba(11, 58, 47, 0.15)',
        }}
      ></div>

      {/* Specifications Section */}
      <section className="w-full py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-[5vw]">
          <h2
            className="text-2xl md:text-3xl mb-8 md:mb-12"
            style={{
              color: 'var(--heritage-green)',
              fontFamily: 'Georgia, serif',
              fontWeight: 400,
            }}
          >
            SPECIFICATIONS
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {/* Material */}
            {product.material && (
              <div>
                <h3
                  className="text-xs md:text-sm uppercase mb-3"
                  style={{
                    color: 'var(--heritage-green)',
                    letterSpacing: '0.15em',
                    opacity: 0.6,
                  }}
                >
                  MATERIAL
                </h3>
                <p
                  className="text-base md:text-lg"
                  style={{
                    color: 'var(--heritage-green)',
                    opacity: 0.9,
                    lineHeight: 1.6,
                  }}
                >
                  {product.material}
                </p>
              </div>
            )}

            {/* Dimensions */}
            {product.dimensions && (
              <div>
                <h3
                  className="text-xs md:text-sm uppercase mb-3"
                  style={{
                    color: 'var(--heritage-green)',
                    letterSpacing: '0.15em',
                    opacity: 0.6,
                  }}
                >
                  DIMENSIONS
                </h3>
                <p
                  className="text-base md:text-lg"
                  style={{
                    color: 'var(--heritage-green)',
                    opacity: 0.9,
                    lineHeight: 1.6,
                  }}
                >
                  {product.dimensions}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div
        className="w-full border-t"
        style={{
          borderColor: 'rgba(11, 58, 47, 0.15)',
        }}
      ></div>

      {/* Build the Archive CTA */}
      <section className="w-full py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-[5vw]">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <div className="max-w-2xl">
              <h2
                className="text-2xl md:text-3xl mb-4"
                style={{
                  color: 'var(--heritage-green)',
                  fontFamily: 'Georgia, serif',
                  fontWeight: 400,
                  lineHeight: 1.2,
                }}
              >
                BUILD THE ARCHIVE
              </h2>
              <p
                className="text-base md:text-lg"
                style={{
                  color: 'var(--heritage-green)',
                  opacity: 0.75,
                  lineHeight: 1.6,
                }}
              >
                Each object is crafted for meaningful ownership — designed to be kept, studied, and passed forward as part of a personal archive of cultural intelligence.
              </p>
            </div>

            <Link
              href={`/enquire?product=${product.id}`}
              className="inline-flex items-center justify-center md:justify-start text-sm md:text-base uppercase tracking-wider hover:opacity-70 transition-opacity focus:outline-none focus:ring-2 focus:ring-[var(--heritage-green)] focus:ring-offset-2 focus:ring-offset-[var(--ivory-archive)] rounded px-6 py-3 border whitespace-nowrap"
              style={{
                color: 'var(--heritage-green)',
                borderColor: 'var(--heritage-green)',
                letterSpacing: '0.1em',
              }}
            >
              ENQUIRE →
            </Link>
          </div>
        </div>
      </section>

      {/* Story Overlay */}
      <StoryOverlay
        product={product}
        isOpen={isStoryOpen}
        onClose={() => setIsStoryOpen(false)}
      />
    </>
  );
}
