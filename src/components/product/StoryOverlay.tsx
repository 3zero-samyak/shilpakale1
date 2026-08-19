"use client";

import { useEffect, useRef, useState } from 'react';
import React from 'react';
import Image from 'next/image';

// Helper component: render Next/Image using natural dimensions when missing
function NaturalNextImage({ src, alt, width, height, priority }: { src: string; alt: string; width?: number | null; height?: number | null; priority?: boolean }) {
  const [dims, setDims] = useState<{ width: number; height: number } | null>(null);
  // Client-side measurement for missing dimensions
  useEffect(() => {
    if (width && height) return; // nothing to do when dims provided
    let isMounted = true;
    const img = document.createElement('img') as HTMLImageElement;
    img.src = src;
    img.onload = () => {
      if (isMounted) setDims({ width: img.naturalWidth, height: img.naturalHeight });
    };
    return () => {
      isMounted = false;
    };
  }, [src, width, height]);

  // If width/height already provided, render immediately
  if (width && height) {
    return (
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="w-full h-auto object-contain"
        sizes="(max-width: 1024px) 100vw, 50vw"
        priority={priority}
      />
    );
  }

  if (!dims) {
    // Placeholder occupies minimal vertical space to avoid large layout shift
    return <div style={{ width: '100%', minHeight: 160 }} />;
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={dims.width}
      height={dims.height}
      className="w-full h-auto object-contain"
      sizes="(max-width: 1024px) 100vw, 50vw"
      priority={priority}
    />
  );
}
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
      className="fixed inset-0 z-50 flex flex-col lg:flex-row"
      style={{
        backgroundColor: 'var(--ivory-archive)',
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="story-title"
    >
      {/* Left: Product Image Gallery - Independently Scrollable */}
      <div
        className="w-full lg:w-1/2 overflow-y-auto overflow-x-hidden"
        style={{
          height: '100dvh',
        }}
      >
        <div className="flex flex-col">
          {product.images && product.images.length > 0 ? (
            product.images.map((image, index) => (
              <div
                key={image.url}
                className="w-full"
                style={{
                  borderBottom: index < product.images.length - 1
                    ? '1px solid rgba(11, 58, 47, 0.08)'
                    : 'none',
                }}
              >
                <div className="w-full">
                  <NaturalNextImage
                    src={image.url}
                    alt={image.altText ?? `${product.title} — product view ${index + 1}`}
                    width={image.width ?? null}
                    height={image.height ?? null}
                    priority={index === 0}
                  />
                </div>
              </div>
            ))
          ) : product.featuredImage?.url ? (
            <div className="w-full">
              <NaturalNextImage
                src={product.featuredImage.url}
                alt={product.featuredImage.altText ?? product.title}
                width={product.featuredImage.width ?? null}
                height={product.featuredImage.height ?? null}
                priority
              />
            </div>
          ) : null}
        </div>
      </div>

      {/* Right: Story Panel - Independently Scrollable */}
      <div
        className="w-full lg:w-1/2 overflow-y-auto"
        style={{
          backgroundColor: 'var(--ivory-archive)',
          height: '100dvh',
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
