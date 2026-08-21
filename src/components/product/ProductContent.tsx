"use client";

import { useState } from 'react';
import Link from 'next/link';
import type { ShopifyProduct } from '@/lib/shopify/types';
import StoryOverlay from './StoryOverlay';
import { getStoryByProductHandle } from '@/data/stories';

interface ProductContentProps {
  product: ShopifyProduct;
  onlyStoryButton?: boolean;
}

export default function ProductContent({ product, onlyStoryButton = false }: ProductContentProps) {
  const [isStoryOpen, setIsStoryOpen] = useState(false);

  // Check if story exists in shared data using handle
  const hasStory = !!getStoryByProductHandle(product.handle);

  // If onlyStoryButton is true, render just the READ STORY button for hero overlay
  if (onlyStoryButton) {
    if (!hasStory) return null;

    return (
      <button
        onClick={() => setIsStoryOpen(true)}
        className="inline-flex items-center text-sm md:text-base lg:text-lg uppercase tracking-wider hover:opacity-70 transition-opacity focus:outline-none focus:ring-2 focus:ring-[var(--ivory-archive-text)] focus:ring-offset-2 focus:ring-offset-transparent rounded px-2 py-1"
        style={{
          color: 'var(--ivory-archive-text)',
          letterSpacing: '0.1em',
          textShadow: '0 1px 4px rgba(0, 0, 0, 0.3)',
        }}
      >
        READ STORY →
      </button>
    );
  }

  return (
    <>
      {/* Divider */}
      <div
        className="w-full border-t"
        style={{
          borderColor: 'rgba(11, 58, 47, 0.15)',
        }}
      ></div>

      {/* Long Description Section (editorial compatibility) */}
      {/* Editorial field longDescription may be present on product */}
      {(product as unknown as { longDescription?: string }).longDescription && (
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
              {(product as unknown as { longDescription?: string }).longDescription}
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
            {product.metafields?.material && (
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
                  {product.metafields.material}
                </p>
              </div>
            )}

            {/* Dimensions */}
            {product.metafields?.dimensions && (
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
                  {product.metafields.dimensions}
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
              href={`/enquire?product=${product.handle}`}
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
