'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

type PhilosophyStage = {
  number: string;
  title: string;
  description: string;
};

const stages: PhilosophyStage[] = [
  {
    number: '01',
    title: 'Root traced',
    description:
      'Every object begins with a specific root—a place, material, system, ritual, route, or built intelligence worth preserving.',
  },
  {
    number: '02',
    title: 'Evidence studied',
    description:
      'Sources, structures, techniques, and context are examined before any physical form is proposed.',
  },
  {
    number: '03',
    title: 'Present relevance found',
    description:
      'The research is connected to the present, revealing why the root still matters and what it continues to shape.',
  },
  {
    number: '04',
    title: 'Form selected',
    description:
      'The story is translated into the physical format best suited to carry its meaning with clarity and restraint.',
  },
  {
    number: '05',
    title: 'Object shaped',
    description:
      'Proportion, material, surface, and detail are refined into a precise collectible object.',
  },
  {
    number: '06',
    title: 'Archive created',
    description:
      'The completed object preserves the research as a physical record designed to be kept, revisited, and continued.',
  },
];

const STAGE_DURATION = 5000; // 5 seconds per stage

export default function ProductPhilosophy() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isPageVisible, setIsPageVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  const sectionRef = useRef<HTMLElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const progressTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Check for reduced motion preference changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Handle page visibility changes
  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsPageVisible(!document.hidden);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  // Clear timers helper
  const clearTimers = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (progressTimerRef.current) {
      clearInterval(progressTimerRef.current);
      progressTimerRef.current = null;
    }
  }, []);

  // Go to next stage
  const goToNextStage = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % stages.length);
    setProgress(0);
  }, []);

  // Select specific stage
  const selectStage = useCallback((index: number) => {
    clearTimers();
    setActiveIndex(index);
    setProgress(0);
  }, [clearTimers]);

  // Autoplay effect
  useEffect(() => {
    if (prefersReducedMotion || !isVisible || !isPageVisible) {
      clearTimers();
      return;
    }

    // Start stage timer
    timerRef.current = setInterval(goToNextStage, STAGE_DURATION);

    // Start progress timer (update every 50ms for smooth animation)
    const progressInterval = 50;
    const progressIncrement = (progressInterval / STAGE_DURATION) * 100;
    progressTimerRef.current = setInterval(() => {
      setProgress((prev) => {
        const next = prev + progressIncrement;
        return next >= 100 ? 100 : next;
      });
    }, progressInterval);

    return clearTimers;
  }, [activeIndex, isVisible, isPageVisible, prefersReducedMotion, goToNextStage, clearTimers]);

  // IntersectionObserver for viewport detection
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.4,
      }
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
    };
  }, []);

  // Keyboard controls
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          selectStage(activeIndex === 0 ? stages.length - 1 : activeIndex - 1);
          break;
        case 'ArrowRight':
          e.preventDefault();
          selectStage((activeIndex + 1) % stages.length);
          break;
        case 'Home':
          e.preventDefault();
          selectStage(0);
          break;
        case 'End':
          e.preventDefault();
          selectStage(stages.length - 1);
          break;
      }
    },
    [activeIndex, selectStage]
  );

  const activeStage = stages[activeIndex];

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[var(--ivory-archive)] relative"
      style={{
        minHeight: '90svh',
        paddingBlock: 'clamp(4.5rem, 8vw, 8rem)',
        paddingInline: 'clamp(1.5rem, 6vw, 7rem)',
      }}
      aria-label="Product Philosophy"
    >
      <div
        style={{
          maxWidth: '85rem',
          marginInline: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: 'clamp(3rem, 6vw, 5rem)',
        }}
      >
        {/* Section Label */}
        <ScrollReveal direction="up" distance={24} duration={800} threshold={0.25}>
          <p
            className="uppercase text-center"
            style={{
              color: 'var(--heritage-green)',
              fontSize: 'clamp(0.72rem, 0.9vw, 0.9rem)',
              letterSpacing: '0.22em',
              lineHeight: 1.2,
            }}
          >
            PRODUCT PHILOSOPHY
          </p>
        </ScrollReveal>

        {/* Main Statement */}
        <div style={{ textAlign: 'center' }}>
          <ScrollReveal direction="up" distance={32} duration={800} delay={100} threshold={0.25}>
            <h2
              style={{
                color: 'var(--heritage-green)',
                fontFamily: 'Georgia, serif',
                fontSize: 'clamp(2.75rem, 5.5vw, 6rem)',
                lineHeight: 1.02,
                letterSpacing: '-0.005em',
                maxWidth: '72rem',
                marginInline: 'auto',
                marginBottom: 'clamp(1rem, 2vw, 1.5rem)',
              }}
            >
              From story to object is not enough.
            </h2>
          </ScrollReveal>
          <ScrollReveal direction="up" distance={28} duration={800} delay={200} threshold={0.25}>
            <p
              style={{
                color: 'var(--heritage-green)',
                fontSize: 'clamp(1rem, 1.5vw, 1.4rem)',
                lineHeight: 1.5,
                opacity: 0.7,
              }}
            >
              Every Shilpakale object follows a stricter path.
            </p>
          </ScrollReveal>
        </div>

        {/* Active Stage Content */}
        <ScrollReveal direction="up" distance={36} duration={800} delay={300} threshold={0.25}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr',
              gap: 'clamp(2rem, 4vw, 3rem)',
              alignItems: 'start',
            }}
            className="md:grid-cols-2"
          >
            {/* Active Number and Title */}
            <div
              style={{
                textAlign: 'center',
              }}
              className="md:text-left"
            >
              <p
                style={{
                  color: 'var(--heritage-green)',
                  fontSize: 'clamp(0.85rem, 1vw, 1rem)',
                  letterSpacing: '0.15em',
                  marginBottom: '1rem',
                  opacity: 0.6,
                }}
              >
                {activeStage.number}
              </p>
              <h3
                key={`title-${activeIndex}`}
                style={{
                  color: 'var(--heritage-green)',
                  fontFamily: 'Georgia, serif',
                  fontSize: 'clamp(2rem, 3.5vw, 3.5rem)',
                  lineHeight: 1.1,
                  letterSpacing: '-0.003em',
                  animation: prefersReducedMotion ? 'none' : 'fadeInUp 500ms ease-out',
                }}
              >
                {activeStage.title}
              </h3>
            </div>

            {/* Active Description */}
            <div
              style={{
                textAlign: 'center',
              }}
              className="md:text-left"
            >
              <p
                key={`desc-${activeIndex}`}
                style={{
                  color: 'var(--heritage-green)',
                  fontSize: 'clamp(1rem, 1.2vw, 1.15rem)',
                  lineHeight: 1.7,
                  maxWidth: '44rem',
                  opacity: 0.8,
                  animation: prefersReducedMotion ? 'none' : 'fadeInUp 500ms ease-out 100ms',
                  marginInline: 'auto',
                }}
                className="md:ml-0"
              >
                {activeStage.description}
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Numbered Navigation */}
        <ScrollReveal direction="up" distance={32} duration={800} delay={400} threshold={0.25}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1.5rem',
            }}
          >
          {/* Progress Indicator */}
          {!prefersReducedMotion && (
            <div
              style={{
                width: '100%',
                maxWidth: '32rem',
                height: '1px',
                backgroundColor: 'rgba(110, 139, 116, 0.2)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  height: '100%',
                  width: `${progress}%`,
                  backgroundColor: 'var(--heritage-green)',
                  transition: 'width 50ms linear',
                }}
              />
            </div>
          )}

          {/* Stage Numbers */}
          <div
            role="tablist"
            aria-label="Philosophy stages"
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: 'clamp(0.75rem, 1.5vw, 1rem)',
            }}
            onKeyDown={handleKeyDown}
          >
            {stages.map((stage, index) => {
              const isActive = index === activeIndex;
              return (
                <button
                  key={stage.number}
                  role="tab"
                  aria-selected={isActive}
                  aria-current={isActive ? 'step' : undefined}
                  aria-label={`View stage ${stage.number}: ${stage.title}`}
                  onClick={() => selectStage(index)}
                  style={{
                    width: 'clamp(2.5rem, 3vw, 2.75rem)',
                    height: 'clamp(2.5rem, 3vw, 2.75rem)',
                    borderRadius: '999px',
                    border: '1px solid currentColor',
                    backgroundColor: isActive
                      ? 'rgba(11, 58, 47, 0.03)'
                      : 'transparent',
                    color: isActive
                      ? 'var(--heritage-green)'
                      : 'var(--archive-sage)',
                    fontSize: 'clamp(0.85rem, 1vw, 0.95rem)',
                    fontWeight: isActive ? 600 : 400,
                    opacity: isActive ? 1 : 0.5,
                    cursor: 'pointer',
                    transition: prefersReducedMotion
                      ? 'none'
                      : 'all 220ms ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.opacity = '0.8';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.opacity = '0.5';
                    }
                  }}
                >
                  {stage.number}
                </button>
              );
            })}
          </div>

          {/* Active Stage Label */}
          <p
            key={`label-${activeIndex}`}
            style={{
              color: 'var(--heritage-green)',
              fontSize: 'clamp(0.75rem, 0.9vw, 0.85rem)',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              textAlign: 'center',
              opacity: 0.7,
              animation: prefersReducedMotion ? 'none' : 'fadeIn 400ms ease-out',
            }}
          >
            {activeStage.title}
          </p>
          </div>
        </ScrollReveal>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          * {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </section>
  );
}
