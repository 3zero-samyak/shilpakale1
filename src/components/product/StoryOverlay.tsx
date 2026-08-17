"use client";

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import type { ShopifyProduct } from '@/lib/shopify/types';
import { getStoryByProductHandle } from '@/data/stories';

interface StoryOverlayProps {
  product: ShopifyProduct;
  isOpen: boolean;
  onClose: () => void;
}

export default function StoryOverlay({ product, isOpen, onClose }: StoryOverlayProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Get story from shared data source using product handle
  const story = getStoryByProductHandle(product.handle);

  // Handle escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Prevent body scroll when overlay is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Focus close button for accessibility
      setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 100);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen || !story) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex"
      style={{
        backgroundColor: 'var(--ivory-archive)',
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="story-title"
    >
      {/* Left: Product Image */}
      <div className="hidden lg:block lg:w-1/2 relative">
        {product.featuredImage?.url ? (
          <Image
            src={product.featuredImage.url}
            alt={product.featuredImage.altText ?? product.title}
            fill
            className="object-cover"
            sizes="50vw"
            priority
          />
        ) : null}
      </div>

      {/* Right: Story Panel */}
      <div
        className="w-full lg:w-1/2 overflow-y-auto"
        style={{
          backgroundColor: 'var(--ivory-archive)',
        }}
      >
        {/* Story Header with Close Button */}
        <div
          className="sticky top-0 z-10 border-b"
          style={{
            backgroundColor: 'var(--ivory-archive)',
            borderColor: 'rgba(11, 58, 47, 0.15)',
          }}
        >
          <div className="max-w-3xl mx-auto px-[5vw] py-5 md:py-6 flex items-center justify-between">
            <h2
              id="story-title"
              className="text-lg md:text-xl"
              style={{
                color: 'var(--heritage-green)',
                fontFamily: 'Georgia, serif',
                fontWeight: 400,
              }}
            >
              {story.storyTitle}
            </h2>
            <button
              ref={closeButtonRef}
              onClick={onClose}
              className="text-2xl md:text-3xl hover:opacity-70 transition-opacity focus:outline-none focus:ring-2 focus:ring-[var(--heritage-green)] focus:ring-offset-2 focus:ring-offset-[var(--ivory-archive)] rounded p-2"
              style={{
                color: 'var(--heritage-green)',
                lineHeight: 1,
              }}
              aria-label="Close story"
            >
              ×
            </button>
          </div>
        </div>

        {/* Story Content */}
        <div className="max-w-3xl mx-auto px-[5vw] py-12 md:py-16">
          {/* Story Number */}
          <p
            className="text-xs md:text-sm uppercase mb-4 md:mb-6"
            style={{
              color: 'var(--archive-sage)',
              letterSpacing: '0.2em',
              fontWeight: 500,
            }}
          >
            STORY {story.number}
          </p>

          {/* Product Name */}
          <h1
            className="text-3xl md:text-4xl lg:text-5xl mb-4 md:mb-6"
            style={{
              color: 'var(--heritage-green)',
              fontFamily: 'Georgia, serif',
              fontWeight: 400,
              lineHeight: 1.1,
              letterSpacing: '-0.005em',
            }}
          >
            {story.productName}
          </h1>

          {/* Story Title */}
          <h2
            className="text-sm md:text-base uppercase mb-4 md:mb-6"
            style={{
              color: 'var(--heritage-green)',
              fontFamily: 'var(--font-montserrat)',
              letterSpacing: '0.2em',
              fontWeight: 500,
            }}
          >
            {story.storyTitle}
          </h2>

          {/* Story Line */}
          <p
            className="text-base md:text-lg mb-6 md:mb-8"
            style={{
              color: 'var(--heritage-green)',
              opacity: 0.7,
              lineHeight: 1.5,
            }}
          >
            {story.storyLine}
          </p>

          {/* Opening Statement */}
          <p
            className="text-xl md:text-2xl mb-12 md:mb-16"
            style={{
              color: 'var(--heritage-green)',
              opacity: 0.9,
              lineHeight: 1.45,
            }}
          >
            {story.openingStatement}
          </p>

          {/* Story Sections */}
          <div className="space-y-10 md:space-y-12">
            {story.sections.map((section, index) => (
              <div key={index}>
                <h3
                  className="text-sm md:text-base uppercase mb-4"
                  style={{
                    color: 'var(--heritage-green)',
                    fontFamily: 'var(--font-montserrat)',
                    letterSpacing: '0.15em',
                    fontWeight: 600,
                  }}
                >
                  {section.heading}
                </h3>
                <div className="space-y-4">
                  {section.paragraphs.map((paragraph, pIndex) => (
                    <p
                      key={pIndex}
                      className="text-base md:text-lg"
                      style={{
                        color: 'var(--heritage-green)',
                        opacity: 0.85,
                        lineHeight: 1.85,
                      }}
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
