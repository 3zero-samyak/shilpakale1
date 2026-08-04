'use client';

import { useRef, useEffect, useState } from 'react';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

export default function AnimatedVideoSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const shouldPauseNextRef = useRef(true); // First hover should pause (since video autoplays)
  const lastInteractionRef = useRef<'hover' | 'click' | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [prefersReducedMotion] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  // Initialize autoplay (unless reduced motion)
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (prefersReducedMotion) {
      // Reduced motion: start paused, show first frame
      video.pause();
      return;
    }

    // Attempt autoplay
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          // Autoplay blocked - silently handle
        });
    }
  }, [prefersReducedMotion]);

  // Handle pointer enter (hover) - toggle playback alternating pause/resume
  const handlePointerEnter = (event: React.PointerEvent) => {
    // Only handle mouse hover, not touch
    if (event.pointerType === 'touch') return;

    const video = videoRef.current;
    if (!video) return;

    lastInteractionRef.current = 'hover';

    if (shouldPauseNextRef.current) {
      // Pause at current position
      video.pause();
      setIsPlaying(false);
    } else {
      // Resume from current position
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch(() => {
            // Play failed - silently handle
          });
      }
    }

    // Toggle for next hover
    shouldPauseNextRef.current = !shouldPauseNextRef.current;
  };

  // Handle click/tap toggle (for touch devices and explicit clicks)
  const handleClick = () => {
    // Prevent double-firing if this click came from a mouse that also triggered hover
    if (lastInteractionRef.current === 'hover') {
      lastInteractionRef.current = null;
      return;
    }

    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch(() => {
            // Play failed - silently handle
          });
      }
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  // Handle keyboard interaction (Enter or Space)
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault(); // Prevent Space from scrolling
      const video = videoRef.current;
      if (!video) return;

      if (video.paused) {
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsPlaying(true);
            })
            .catch(() => {
              // Play failed - silently handle
            });
        }
      } else {
        video.pause();
        setIsPlaying(false);
      }
    }
  };

  // Accessible label based on current state
  const ariaLabel = isPlaying
    ? 'Pause animated SHILPAKALE video'
    : 'Play animated SHILPAKALE video';

  return (
    <ScrollReveal direction="up" distance={24} duration={1000} threshold={0.2}>
      <section
        className="relative w-full bg-[var(--heritage-green)] overflow-hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--ivory-archive)] focus-visible:-outline-offset-1 min-h-[60svh] h-[60svh] md:min-h-[75svh] md:h-[75svh]"
        onPointerEnter={handlePointerEnter}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="button"
        aria-label={ariaLabel}
        style={{
          cursor: 'pointer',
        }}
      >
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay={!prefersReducedMotion}
          muted
          playsInline
          loop
          preload="auto"
          aria-hidden="true"
        >
          <source src="/images/brand/animated-video.mp4" type="video/mp4" />
        </video>
      </section>
    </ScrollReveal>
  );
}
