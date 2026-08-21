"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { ShopifyProduct } from '@/lib/shopify/types';
import StoryOverlay from './StoryOverlay';
import { getStoryByProductHandle } from '@/data/stories';

interface ProductPageContentProps {
  product: ShopifyProduct;
}

export default function ProductPageContent({ product }: ProductPageContentProps) {
  const [isStoryOpen, setIsStoryOpen] = useState(false);

  // Check if canonical story exists for this product
  const hasStory = !!getStoryByProductHandle(product.handle);

  return (
    <>
      {/* Full-Screen Product Hero with Overlay */}
      <div className="relative w-full h-screen">
        {product.featuredImage?.url ? (
          <Image
            src={product.featuredImage.url}
            alt={product.featuredImage.altText ?? product.title}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        ) : null}

        {/* Product Info Overlay - Lower Left */}
        <div className="absolute bottom-0 left-0 right-0 p-[5vw] md:p-[8vw] lg:p-[6vw]">
          <div className="max-w-2xl">
            {/* Product Name */}
              <h1
              className="text-4xl md:text-5xl lg:text-6xl mb-3 md:mb-4"
              style={{
                color: 'var(--ivory-archive-text)',
                fontFamily: 'Georgia, serif',
                fontWeight: 400,
                lineHeight: 1.1,
                textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
              }}
            >
              {product.title}
            </h1>

            {/* Story Line */}
            {(product.metafields?.story_line || (hasStory && getStoryByProductHandle(product.handle)?.storyLine)) && (
              <p
                className="text-lg md:text-xl lg:text-2xl mb-4 md:mb-6"
                style={{
                  color: 'var(--ivory-archive-text)',
                  opacity: 0.95,
                  lineHeight: 1.4,
                  textShadow: '0 1px 4px rgba(0, 0, 0, 0.3)',
                }}
              >
                {product.metafields?.story_line || getStoryByProductHandle(product.handle)?.storyLine}
              </p>
            )}

            {/* Tags as visible rounded chips */}
            {product.tags && product.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {product.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-2.5 py-1 text-xs uppercase tracking-wide"
                    style={{
                      background: 'var(--ivory-archive)',
                      color: 'var(--heritage-green)',
                      border: '1px solid rgba(11,58,47,0.15)',
                      borderRadius: '4px',
                      letterSpacing: '0.05em',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* READ STORY Button */}
            {hasStory && (
              <button
                onClick={() => setIsStoryOpen(true)}
                className="inline-flex items-center mt-5 text-xs uppercase tracking-widest hover:opacity-70 transition-opacity focus:outline-none focus:ring-1 focus:ring-[var(--ivory-archive-text)] focus:ring-offset-1 rounded px-2 py-1"
                style={{
                  color: 'var(--ivory-archive-text)',
                  letterSpacing: '0.15em',
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
      {/* longDescription is editorial and not provided by Shopify product — keep compatibility if present */}
      {(
        (product as unknown as { longDescription?: string }).longDescription
      ) && (
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

          <div className="space-y-8 md:space-y-10">
            {/* Description - Full width if present */}
            {product.metafields?.description && (
              <div className="w-full">
                <h3
                  className="text-xs md:text-sm uppercase mb-3"
                  style={{
                    color: 'var(--heritage-green)',
                    letterSpacing: '0.15em',
                    opacity: 0.6,
                  }}
                >
                  DESCRIPTION
                </h3>
                <p
                  className="text-base md:text-lg"
                  style={{
                    color: 'var(--heritage-green)',
                    opacity: 0.9,
                    lineHeight: 1.6,
                  }}
                >
                  {product.metafields.description.trim()}
                </p>
              </div>
            )}

            {/* Two-column grid for other specifications */}
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
                    {product.metafields.material.trim()}
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
                    {product.metafields.dimensions.trim()}
                  </p>
                </div>
              )}

              {/* Weight */}
              {product.metafields?.weight && (
                <div>
                  <h3
                    className="text-xs md:text-sm uppercase mb-3"
                    style={{
                      color: 'var(--heritage-green)',
                      letterSpacing: '0.15em',
                      opacity: 0.6,
                    }}
                  >
                    WEIGHT
                  </h3>
                  <p
                    className="text-base md:text-lg"
                    style={{
                      color: 'var(--heritage-green)',
                      opacity: 0.9,
                      lineHeight: 1.6,
                    }}
                  >
                    {product.metafields.weight.trim()}
                  </p>
                </div>
              )}

              {/* Parts */}
              {product.metafields?.parts && (
                <div>
                  <h3
                    className="text-xs md:text-sm uppercase mb-3"
                    style={{
                      color: 'var(--heritage-green)',
                      letterSpacing: '0.15em',
                      opacity: 0.6,
                    }}
                  >
                    PARTS
                  </h3>
                  <p
                    className="text-base md:text-lg"
                    style={{
                      color: 'var(--heritage-green)',
                      opacity: 0.9,
                      lineHeight: 1.6,
                    }}
                  >
                    {product.metafields.parts.trim()}
                  </p>
                </div>
              )}

              {/* Colour */}
              {product.metafields?.colour && (
                <div>
                  <h3
                    className="text-xs md:text-sm uppercase mb-3"
                    style={{
                      color: 'var(--heritage-green)',
                      letterSpacing: '0.15em',
                      opacity: 0.6,
                    }}
                  >
                    COLOUR
                  </h3>
                  <p
                    className="text-base md:text-lg"
                    style={{
                      color: 'var(--heritage-green)',
                      opacity: 0.9,
                      lineHeight: 1.6,
                    }}
                  >
                    {product.metafields.colour.trim()}
                  </p>
                </div>
              )}
            </div>
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
              className="inline-flex items-center justify-center md:justify-start text-xs uppercase tracking-widest hover:opacity-70 transition-opacity focus:outline-none focus:ring-1 focus:ring-[var(--heritage-green)] focus:ring-offset-1 px-5 py-3 border whitespace-nowrap"
              style={{
                color: 'var(--heritage-green)',
                borderColor: 'var(--heritage-green)',
                letterSpacing: '0.12em',
                borderRadius: '6px',
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
