'use client';

import { useState, useEffect, useRef } from 'react';

interface Slide {
  id: number;
  content: React.ReactNode;
}

interface WhyShilpakaleSliderProps {
  slides: Slide[];
}

export default function WhyShilpakaleSlider({ slides }: WhyShilpakaleSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const [prefersReducedMotion] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });
  const sliderRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (prefersReducedMotion || hasStarted) return;

    const slider = sliderRef.current;
    if (!slider) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      {
        threshold: 0.3,
      }
    );

    observer.observe(slider);

    return () => {
      observer.disconnect();
    };
  }, [prefersReducedMotion, hasStarted]);

  useEffect(() => {
    if (!hasStarted || prefersReducedMotion || currentSlide >= slides.length - 1) {
      return;
    }

    // Auto-advance after 5 seconds
    timerRef.current = setTimeout(() => {
      setCurrentSlide((prev) => Math.min(prev + 1, slides.length - 1));
    }, 5000);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [hasStarted, currentSlide, slides.length, prefersReducedMotion]);

  const handlePrevious = () => {
    setCurrentSlide((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => Math.min(prev + 1, slides.length - 1));
  };

  return (
    <div ref={sliderRef} className="relative w-full overflow-hidden">
      {/* Slide Track */}
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{
          transform: `translateX(-${currentSlide * 100}%)`,
        }}
      >
        {slides.map((slide) => (
          <div
            key={slide.id}
            className="w-full flex-shrink-0 px-[5vw] py-12 md:py-16"
          >
            {slide.content}
          </div>
        ))}
      </div>

      {/* Manual Controls */}
      {slides.length > 1 && (
        <div className="absolute bottom-8 left-[5vw] flex items-center gap-4">
          <button
            type="button"
            onClick={handlePrevious}
            disabled={currentSlide === 0}
            aria-label="Previous slide"
            className="text-[var(--ivory-archive-text)] text-sm uppercase tracking-wider hover:text-[var(--archive-sage)] transition-colors disabled:opacity-30 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[var(--ivory-archive-text)] focus:ring-offset-2 focus:ring-offset-[var(--heritage-green)] rounded px-2 py-1"
          >
            Previous
          </button>
          <span className="text-[var(--ivory-archive-text)] text-sm opacity-60">
            {currentSlide + 1} / {slides.length}
          </span>
          <button
            type="button"
            onClick={handleNext}
            disabled={currentSlide === slides.length - 1}
            aria-label="Next slide"
            className="text-[var(--ivory-archive-text)] text-sm uppercase tracking-wider hover:text-[var(--archive-sage)] transition-colors disabled:opacity-30 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[var(--ivory-archive-text)] focus:ring-offset-2 focus:ring-offset-[var(--heritage-green)] rounded px-2 py-1"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
