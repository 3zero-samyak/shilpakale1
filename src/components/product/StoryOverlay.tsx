'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import type { Product } from '@/data/collections';

interface StoryOverlayProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

export default function StoryOverlay({ product, isOpen, onClose }: StoryOverlayProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

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

  if (!isOpen || !product.story) return null;

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
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover"
          sizes="50vw"
          priority
        />
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
              {product.story.title}
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
          {/* Eyebrow */}
          <p
            className="text-xs md:text-sm uppercase mb-4 md:mb-6"
            style={{
              color: 'var(--heritage-green)',
              letterSpacing: '0.2em',
              opacity: 0.6,
            }}
          >
            {product.story.eyebrow}
          </p>

          {/* Story Title (repeated for mobile) */}
          <h1
            className="text-3xl md:text-4xl lg:text-5xl mb-6 md:mb-8"
            style={{
              color: 'var(--heritage-green)',
              fontFamily: 'Georgia, serif',
              fontWeight: 400,
              lineHeight: 1.2,
            }}
          >
            {product.story.title}
          </h1>

          {/* Introduction */}
          <p
            className="text-lg md:text-xl mb-12 md:mb-16"
            style={{
              color: 'var(--heritage-green)',
              opacity: 0.85,
              lineHeight: 1.6,
            }}
          >
            {product.story.introduction}
          </p>

          {/* Story Sections */}
          <div className="space-y-10 md:space-y-12">
            {product.story.sections.map((section, index) => (
              <div key={index}>
                <h3
                  className="text-xl md:text-2xl mb-4"
                  style={{
                    color: 'var(--heritage-green)',
                    fontFamily: 'Georgia, serif',
                    fontWeight: 400,
                    lineHeight: 1.3,
                  }}
                >
                  {section.heading}
                </h3>
                <p
                  className="text-base md:text-lg"
                  style={{
                    color: 'var(--heritage-green)',
                    opacity: 0.8,
                    lineHeight: 1.7,
                  }}
                >
                  {section.content}
                </p>
              </div>
            ))}
          </div>

          {/* Closing Note */}
          {product.story.closingNote && (
            <div
              className="mt-12 md:mt-16 pt-8 md:pt-10 border-t"
              style={{
                borderColor: 'rgba(11, 58, 47, 0.15)',
              }}
            >
              <p
                className="text-base md:text-lg"
                style={{
                  color: 'var(--heritage-green)',
                  opacity: 0.75,
                  lineHeight: 1.7,
                  fontStyle: 'italic',
                }}
              >
                {product.story.closingNote}
              </p>
            </div>
          )}

          {/* Sources */}
          {product.story.sources && (
            <div className="mt-8">
              <p
                className="text-sm"
                style={{
                  color: 'var(--heritage-green)',
                  opacity: 0.5,
                  lineHeight: 1.6,
                }}
              >
                {product.story.sources}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
