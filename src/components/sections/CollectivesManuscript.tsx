'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { collectiveSpreads } from '@/data/collectiveQuotes';

type ManuscriptState = 'closed' | 'opening' | 'open';
type TurnDirection = 'forward' | 'backward';

export default function CollectivesManuscript() {
  // State management
  const [state, setState] = useState<ManuscriptState>('closed');
  const [activeSpreadIndex, setActiveSpreadIndex] = useState(0);
  const [pendingSpreadIndex, setPendingSpreadIndex] = useState<number | null>(null);
  const [turnDirection, setTurnDirection] = useState<TurnDirection>('forward');
  const [isTurning, setIsTurning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isPageVisible, setIsPageVisible] = useState(true);
  const [isInteracting, setIsInteracting] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    return false;
  });

  // Refs
  const sectionRef = useRef<HTMLElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const progressTimerRef = useRef<NodeJS.Timeout | null>(null);
  const hasOpenedRef = useRef(false);
  const touchStartXRef = useRef<number | null>(null);
  const touchStartYRef = useRef<number | null>(null);

  // Timing constants
  const CLOSED_COVER_DURATION = 1600;
  const OPENING_DURATION = 1500;
  const PAGE_TURN_DURATION = 1400;
  const SPREAD_DURATION = 6500;
  const FINAL_SPREAD_DURATION = 7000;

  // Detect reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Clean up timers
  const clearTimers = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    if (progressTimerRef.current) {
      clearInterval(progressTimerRef.current);
      progressTimerRef.current = null;
    }
  }, []);

  // Central transition function
  const requestSpreadChange = useCallback((targetIndex: number, direction: TurnDirection) => {
    // Prevent overlapping transitions
    if (isTurning || state !== 'open') return;

    // Clear autoplay timers
    clearTimers();
    setProgress(0);

    // If already at target, do nothing
    if (targetIndex === activeSpreadIndex) return;

    // For reduced motion: instant change
    if (prefersReducedMotion) {
      setActiveSpreadIndex(targetIndex);
      return;
    }

    // Start page turn
    setPendingSpreadIndex(targetIndex);
    setTurnDirection(direction);
    setIsTurning(true);

    // Complete turn after animation
    setTimeout(() => {
      setActiveSpreadIndex(targetIndex);
      setPendingSpreadIndex(null);
      setIsTurning(false);
      setProgress(0);
    }, PAGE_TURN_DURATION);
  }, [isTurning, state, activeSpreadIndex, clearTimers, prefersReducedMotion, PAGE_TURN_DURATION]);

  // Navigation functions
  const goToNextSpread = useCallback(() => {
    const nextIndex = (activeSpreadIndex + 1) % collectiveSpreads.length;
    requestSpreadChange(nextIndex, 'forward');
  }, [activeSpreadIndex, requestSpreadChange]);

  const goToPreviousSpread = useCallback(() => {
    const prevIndex = activeSpreadIndex === 0 
      ? collectiveSpreads.length - 1 
      : activeSpreadIndex - 1;
    requestSpreadChange(prevIndex, 'backward');
  }, [activeSpreadIndex, requestSpreadChange]);

  const goToSpread = useCallback((index: number) => {
    // Determine direction based on current and target
    const direction = index > activeSpreadIndex ? 'forward' : 'backward';
    // For wrapping case (e.g., from 0 to last), use backward
    if (activeSpreadIndex === 0 && index === collectiveSpreads.length - 1) {
      requestSpreadChange(index, 'backward');
    } else {
      requestSpreadChange(index, direction);
    }
  }, [activeSpreadIndex, requestSpreadChange]);

  // Open manuscript
  const openManuscript = useCallback(() => {
    if (state !== 'closed' || hasOpenedRef.current) return;
    
    hasOpenedRef.current = true;
    setState('opening');
    
    setTimeout(() => {
      setState('open');
      setActiveSpreadIndex(0);
    }, OPENING_DURATION);
  }, [state, OPENING_DURATION]);

  // IntersectionObserver for viewport detection
  useEffect(() => {
    const currentSection = sectionRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.intersectionRatio >= 0.45);
        });
      },
      { threshold: 0.45 }
    );

    if (currentSection) {
      observer.observe(currentSection);
    }

    return () => {
      if (currentSection) {
        observer.unobserve(currentSection);
      }
    };
  }, []);

  // Page visibility detection
  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsPageVisible(!document.hidden);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  // Auto-open when visible (only once)
  useEffect(() => {
    if (isVisible && state === 'closed' && !hasOpenedRef.current && !prefersReducedMotion) {
      const timeout = setTimeout(openManuscript, CLOSED_COVER_DURATION);
      return () => clearTimeout(timeout);
    }
  }, [isVisible, state, openManuscript, CLOSED_COVER_DURATION, prefersReducedMotion]);

  // For reduced motion: show open immediately
  useEffect(() => {
    if (prefersReducedMotion && state === 'closed' && !hasOpenedRef.current) {
      hasOpenedRef.current = true;
      setState('open');
      setActiveSpreadIndex(0);
    }
  }, [prefersReducedMotion, state]);

  // Autoplay slideshow
  useEffect(() => {
    if (
      state !== 'open' ||
      !isVisible ||
      !isPageVisible ||
      isInteracting ||
      prefersReducedMotion ||
      isTurning
    ) {
      clearTimers();
      return;
    }

    const duration =
      activeSpreadIndex === collectiveSpreads.length - 1
        ? FINAL_SPREAD_DURATION
        : SPREAD_DURATION;

    // Main timer for advancing spreads
    timerRef.current = setTimeout(goToNextSpread, duration);

    // Progress timer
    const progressInterval = 50;
    const progressStep = (progressInterval / duration) * 100;
    progressTimerRef.current = setInterval(() => {
      setProgress((prev) => {
        const next = prev + progressStep;
        return next >= 100 ? 100 : next;
      });
    }, progressInterval);

    return clearTimers;
  }, [
    state,
    isVisible,
    isPageVisible,
    isInteracting,
    activeSpreadIndex,
    isTurning,
    goToNextSpread,
    clearTimers,
    prefersReducedMotion,
    SPREAD_DURATION,
    FINAL_SPREAD_DURATION,
  ]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      if (state === 'closed') {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openManuscript();
        }
        return;
      }

      if (state !== 'open' || isTurning) return;

      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          goToPreviousSpread();
          break;
        case 'ArrowRight':
          e.preventDefault();
          goToNextSpread();
          break;
        case 'Home':
          e.preventDefault();
          if (activeSpreadIndex !== 0) {
            goToSpread(0);
          }
          break;
        case 'End':
          e.preventDefault();
          if (activeSpreadIndex !== collectiveSpreads.length - 1) {
            goToSpread(collectiveSpreads.length - 1);
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [state, isTurning, activeSpreadIndex, openManuscript, goToNextSpread, goToPreviousSpread, goToSpread]);

  // Touch swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    if (state !== 'open' || isTurning) return;
    touchStartXRef.current = e.touches[0].clientX;
    touchStartYRef.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (state !== 'open' || isTurning || touchStartXRef.current === null || touchStartYRef.current === null) return;

    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    const deltaX = touchEndX - touchStartXRef.current;
    const deltaY = touchEndY - touchStartYRef.current;

    const isHorizontalGesture =
      Math.abs(deltaX) > 50 &&
      Math.abs(deltaX) > Math.abs(deltaY) * 1.25;

    if (isHorizontalGesture) {
      if (deltaX > 0) {
        goToPreviousSpread();
      } else {
        goToNextSpread();
      }
    }

    touchStartXRef.current = null;
    touchStartYRef.current = null;
  };

  const activeSpread = collectiveSpreads[activeSpreadIndex];
  const pendingSpread = pendingSpreadIndex !== null ? collectiveSpreads[pendingSpreadIndex] : null;

  // Helper to render a spread
  const renderSpread = (spread: typeof collectiveSpreads[0], zIndex: number, isUnderlying = false) => (
    <div
      style={{
        position: isUnderlying ? 'absolute' : 'relative',
        inset: isUnderlying ? 0 : 'auto',
        zIndex,
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1fr) clamp(3rem, 4.5vw, 5rem) minmax(0, 1fr)',
        alignItems: 'stretch',
        gap: '0',
        pointerEvents: isUnderlying ? 'none' : 'auto',
      }}
      className="manuscript-grid"
    >
      {/* Left Page */}
      <div
        style={{
          backgroundColor: 'var(--ivory-archive)',
          border: '2px solid var(--heritage-green)',
          borderRadius: '1.2rem 0.7rem 1rem 1.4rem / 0.8rem 1.3rem 0.9rem 1.2rem',
          padding: 'clamp(2rem, 5vw, 4rem)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          position: 'relative',
          minHeight: '60svh',
          backgroundImage: `repeating-linear-gradient(
            to bottom,
            transparent,
            transparent 2.4rem,
            rgba(11, 58, 47, 0.025) 2.4rem,
            rgba(11, 58, 47, 0.025) calc(2.4rem + 1px)
          )`,
        }}
      >
        <article>
          {spread.leftPage.languageLabel && (
            <p
              style={{
                fontFamily: 'var(--font-montserrat)',
                fontSize: 'clamp(0.65rem, 0.8vw, 0.75rem)',
                fontWeight: 500,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--heritage-green)',
                opacity: 0.6,
                marginBottom: '1rem',
                textAlign: 'center',
              }}
            >
              {spread.leftPage.languageLabel}
            </p>
          )}
          <blockquote
            style={{
              fontFamily: 'var(--font-montserrat)',
              fontSize: 'clamp(1rem, 1.55vw, 1.45rem)',
              fontWeight: 400,
              lineHeight: 1.55,
              letterSpacing: '0',
              textAlign: 'center',
              color: 'var(--heritage-green)',
              marginBlock: '2rem',
              maxWidth: '28rem',
              marginInline: 'auto',
            }}
          >
            {spread.leftPage.quote}
          </blockquote>
          {spread.leftPage.attribution && (
            <p
              style={{
                fontFamily: 'var(--font-montserrat)',
                fontSize: 'clamp(0.7rem, 0.9vw, 0.82rem)',
                fontWeight: 500,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--heritage-green)',
                textAlign: 'center',
                marginTop: '1.5rem',
              }}
            >
              {spread.leftPage.attribution}
            </p>
          )}
          <p
            style={{
              position: 'absolute',
              bottom: 'clamp(1rem, 2vw, 1.5rem)',
              left: 'clamp(1rem, 2vw, 1.5rem)',
              fontFamily: 'var(--font-montserrat)',
              fontSize: 'clamp(0.7rem, 0.85vw, 0.8rem)',
              fontWeight: 500,
              color: 'var(--heritage-green)',
              opacity: 0.5,
            }}
          >
            {String(spread.leftPage.pageNumber).padStart(2, '0')}
          </p>
        </article>
      </div>

      {/* Central Spiral Binding */}
      <div
        aria-hidden="true"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          filter: 'drop-shadow(0 1px 1px rgba(11, 58, 47, 0.12))',
          zIndex: 4,
        }}
      >
        <svg
          viewBox="0 0 80 640"
          style={{
            width: '100%',
            height: '60svh',
            minHeight: '500px',
            color: 'var(--heritage-green)',
          }}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line
            x1="40"
            y1="0"
            x2="40"
            y2="640"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          {Array.from({ length: 16 }, (_, i) => {
            const y = 40 + i * 38;
            return (
              <g key={i}>
                <path
                  d={`M 12 ${y} C 20 ${y - 10}, 60 ${y - 10}, 68 ${y}`}
                  stroke="currentColor"
                  strokeWidth="1.5"
                  fill="none"
                />
                <rect
                  x="8"
                  y={y - 2}
                  width="6"
                  height="4"
                  fill="currentColor"
                  opacity="0.3"
                />
                <rect
                  x="66"
                  y={y - 2}
                  width="6"
                  height="4"
                  fill="currentColor"
                  opacity="0.3"
                />
              </g>
            );
          })}
        </svg>
      </div>

      {/* Right Page */}
      <div
        style={{
          backgroundColor: 'var(--ivory-archive)',
          border: '2px solid var(--heritage-green)',
          borderRadius: '0.7rem 1.2rem 1.4rem 1rem / 1.3rem 0.8rem 1.2rem 0.9rem',
          padding: 'clamp(2rem, 5vw, 4rem)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          position: 'relative',
          minHeight: '60svh',
          backgroundImage: `repeating-linear-gradient(
            to bottom,
            transparent,
            transparent 2.4rem,
            rgba(11, 58, 47, 0.025) 2.4rem,
            rgba(11, 58, 47, 0.025) calc(2.4rem + 1px)
          )`,
        }}
      >
        <article>
          {spread.rightPage.languageLabel && (
            <p
              style={{
                fontFamily: 'var(--font-montserrat)',
                fontSize: 'clamp(0.65rem, 0.8vw, 0.75rem)',
                fontWeight: 500,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--heritage-green)',
                opacity: 0.6,
                marginBottom: '1rem',
                textAlign: 'center',
              }}
            >
              {spread.rightPage.languageLabel}
            </p>
          )}
          <blockquote
            style={{
              fontFamily: 'var(--font-montserrat)',
              fontSize: 'clamp(1rem, 1.55vw, 1.45rem)',
              fontWeight: 400,
              lineHeight: 1.55,
              letterSpacing: '0',
              textAlign: 'center',
              color: 'var(--heritage-green)',
              marginBlock: '2rem',
              maxWidth: '28rem',
              marginInline: 'auto',
            }}
          >
            {spread.rightPage.quote}
          </blockquote>
          {spread.rightPage.attribution && (
            <p
              style={{
                fontFamily: 'var(--font-montserrat)',
                fontSize: 'clamp(0.7rem, 0.9vw, 0.82rem)',
                fontWeight: 500,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--heritage-green)',
                textAlign: 'center',
                marginTop: '1.5rem',
              }}
            >
              {spread.rightPage.attribution}
            </p>
          )}
          <p
            style={{
              position: 'absolute',
              bottom: 'clamp(1rem, 2vw, 1.5rem)',
              right: 'clamp(1rem, 2vw, 1.5rem)',
              fontFamily: 'var(--font-montserrat)',
              fontSize: 'clamp(0.7rem, 0.85vw, 0.8rem)',
              fontWeight: 500,
              color: 'var(--heritage-green)',
              opacity: 0.5,
            }}
          >
            {String(spread.rightPage.pageNumber).padStart(2, '0')}
          </p>
        </article>
      </div>
    </div>
  );

  return (
    <section
      ref={sectionRef}
      aria-labelledby="collectives-title"
      aria-roledescription="carousel"
      style={{
        backgroundColor: 'var(--ivory-archive)',
        minHeight: '100svh',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        paddingBlock: 'clamp(5rem, 9vw, 9rem)',
        paddingInline: 'clamp(1rem, 4vw, 4rem)',
      }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Live region for accessibility */}
      <div
        className="sr-only"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {state === 'open' && !isTurning &&
          `Showing Collectives pages ${activeSpread.leftPage.pageNumber} and ${activeSpread.rightPage.pageNumber} of 6`}
      </div>

      {/* Closed Cover */}
      {state === 'closed' && (
        <button
          onClick={openManuscript}
          aria-label="Open the SHILPAKALE Collectives manuscript"
          style={{
            width: 'min(82vw, 46rem)',
            aspectRatio: '1.45 / 1',
            backgroundColor: 'var(--ivory-archive)',
            border: '2px solid var(--heritage-green)',
            borderRadius: '1.2rem 0.9rem 1.1rem 1.3rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: prefersReducedMotion
              ? 'none'
              : 'transform 300ms ease',
          }}
          onMouseEnter={(e) => {
            if (!prefersReducedMotion) {
              e.currentTarget.style.transform = 'scale(1.01)';
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          <h2
            id="collectives-title"
            style={{
              fontFamily: 'Georgia, serif',
              fontSize: 'clamp(2rem, 4.5vw, 4rem)',
              fontWeight: 400,
              color: 'var(--heritage-green)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}
          >
            COLLECTIVES
          </h2>
        </button>
      )}

      {/* Opening Animation */}
      {state === 'opening' && !prefersReducedMotion && (
        <div
          className="collectives-manuscript-stage"
          style={{
            perspective: 'clamp(1200px, 120vw, 2200px)',
            width: 'min(82vw, 46rem)',
            aspectRatio: '1.45 / 1',
          }}
        >
          <div
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: 'var(--ivory-archive)',
              border: '2px solid var(--heritage-green)',
              borderRadius: '1.2rem 0.9rem 1.1rem 1.3rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transformOrigin: 'left center',
              transformStyle: 'preserve-3d',
              backfaceVisibility: 'hidden',
              animation: 'manuscript-cover-turn-opening 1500ms cubic-bezier(0.65, 0, 0.35, 1) forwards',
              boxShadow: '0 10px 28px rgba(11, 58, 47, 0.08)',
            }}
          >
            <h2
              style={{
                fontFamily: 'Georgia, serif',
                fontSize: 'clamp(2rem, 4.5vw, 4rem)',
                fontWeight: 400,
                color: 'var(--heritage-green)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}
            >
              COLLECTIVES
            </h2>
          </div>
        </div>
      )}

      {/* Open State with Page Turning */}
      {state === 'open' && (
        <div
          style={{
            width: 'min(92vw, 78rem)',
            maxWidth: '100%',
            position: 'relative',
          }}
        >
          <div
            className="collectives-manuscript-stage"
            onMouseEnter={() => setIsInteracting(true)}
            onMouseLeave={() => setIsInteracting(false)}
            onFocus={() => setIsInteracting(true)}
            onBlur={() => setIsInteracting(false)}
            style={{
              position: 'relative',
              perspective: 'clamp(1200px, 120vw, 2200px)',
              transformStyle: 'preserve-3d',
            }}
          >
            {/* Base layer: Show target spread during turn, otherwise current spread */}
            {isTurning && pendingSpread && !prefersReducedMotion 
              ? renderSpread(pendingSpread, 1, true)
              : renderSpread(activeSpread, 3, false)
            }

            {/* Turning page layer */}
            {isTurning && pendingSpread && !prefersReducedMotion && (
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  zIndex: 6,
                  display: 'grid',
                  gridTemplateColumns: 'minmax(0, 1fr) clamp(3rem, 4.5vw, 5rem) minmax(0, 1fr)',
                  alignItems: 'stretch',
                  gap: '0',
                  pointerEvents: 'none',
                }}
                className="manuscript-grid"
              >
                {/* Empty left slot for backward turn, or turning page for forward */}
                {turnDirection === 'forward' ? <div /> : (
                  <div
                    className="turning-page turning-page-backward"
                    data-direction="backward"
                    style={{
                      position: 'relative',
                      transformStyle: 'preserve-3d',
                      transformOrigin: 'right center',
                    }}
                  >
                    {/* Front face - current left page */}
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        backgroundColor: 'var(--ivory-archive)',
                        border: '2px solid var(--heritage-green)',
                        borderRadius: '1.2rem 0.7rem 1rem 1.4rem / 0.8rem 1.3rem 0.9rem 1.2rem',
                        padding: 'clamp(2rem, 5vw, 4rem)',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        backfaceVisibility: 'hidden',
                        boxShadow: '0 10px 28px rgba(11, 58, 47, 0.08)',
                        backgroundImage: `repeating-linear-gradient(
                          to bottom,
                          transparent,
                          transparent 2.4rem,
                          rgba(11, 58, 47, 0.025) 2.4rem,
                          rgba(11, 58, 47, 0.025) calc(2.4rem + 1px)
                        )`,
                      }}
                    >
                      <blockquote
                        style={{
                          fontFamily: 'var(--font-montserrat)',
                          fontSize: 'clamp(1rem, 1.55vw, 1.45rem)',
                          fontWeight: 400,
                          lineHeight: 1.55,
                          textAlign: 'center',
                          color: 'var(--heritage-green)',
                          maxWidth: '28rem',
                          marginInline: 'auto',
                        }}
                      >
                        {activeSpread.leftPage.quote}
                      </blockquote>
                    </div>
                    {/* Back face */}
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        backgroundColor: 'var(--ivory-archive)',
                        border: '2px solid var(--heritage-green)',
                        borderRadius: '1.2rem 0.7rem 1rem 1.4rem / 0.8rem 1.3rem 0.9rem 1.2rem',
                        transform: 'rotateY(180deg)',
                        backfaceVisibility: 'hidden',
                        backgroundImage: `repeating-linear-gradient(
                          to bottom,
                          transparent,
                          transparent 2.4rem,
                          rgba(11, 58, 47, 0.025) 2.4rem,
                          rgba(11, 58, 47, 0.025) calc(2.4rem + 1px)
                        )`,
                      }}
                    />
                  </div>
                )}

                {/* Empty binding slot */}
                <div />

                {/* Empty right slot for forward turn, or turning page for backward */}
                {turnDirection === 'backward' ? <div /> : (
                  <div
                    className="turning-page turning-page-forward"
                    data-direction="forward"
                    style={{
                      position: 'relative',
                      transformStyle: 'preserve-3d',
                      transformOrigin: 'left center',
                    }}
                  >
                    {/* Front face - current right page */}
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        backgroundColor: 'var(--ivory-archive)',
                        border: '2px solid var(--heritage-green)',
                        borderRadius: '0.7rem 1.2rem 1.4rem 1rem / 1.3rem 0.8rem 1.2rem 0.9rem',
                        padding: 'clamp(2rem, 5vw, 4rem)',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        backfaceVisibility: 'hidden',
                        boxShadow: '0 10px 28px rgba(11, 58, 47, 0.08)',
                        backgroundImage: `repeating-linear-gradient(
                          to bottom,
                          transparent,
                          transparent 2.4rem,
                          rgba(11, 58, 47, 0.025) 2.4rem,
                          rgba(11, 58, 47, 0.025) calc(2.4rem + 1px)
                        )`,
                      }}
                    >
                      <blockquote
                        style={{
                          fontFamily: 'var(--font-montserrat)',
                          fontSize: 'clamp(1rem, 1.55vw, 1.45rem)',
                          fontWeight: 400,
                          lineHeight: 1.55,
                          textAlign: 'center',
                          color: 'var(--heritage-green)',
                          maxWidth: '28rem',
                          marginInline: 'auto',
                        }}
                      >
                        {activeSpread.rightPage.quote}
                      </blockquote>
                    </div>
                    {/* Back face */}
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        backgroundColor: 'var(--ivory-archive)',
                        border: '2px solid var(--heritage-green)',
                        borderRadius: '0.7rem 1.2rem 1.4rem 1rem / 1.3rem 0.8rem 1.2rem 0.9rem',
                        transform: 'rotateY(180deg)',
                        backfaceVisibility: 'hidden',
                        backgroundImage: `repeating-linear-gradient(
                          to bottom,
                          transparent,
                          transparent 2.4rem,
                          rgba(11, 58, 47, 0.025) 2.4rem,
                          rgba(11, 58, 47, 0.025) calc(2.4rem + 1px)
                        )`,
                      }}
                    />
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Navigation Controls */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '2rem',
              marginTop: 'clamp(2rem, 4vw, 3rem)',
              flexWrap: 'wrap',
            }}
          >
            {/* Previous Button */}
            <button
              onClick={goToPreviousSpread}
              disabled={isTurning}
              aria-disabled={isTurning}
              aria-label="Previous Collectives spread"
              style={{
                width: '3rem',
                height: '3rem',
                border: '1px solid var(--heritage-green)',
                borderRadius: '999px',
                backgroundColor: 'transparent',
                color: 'var(--heritage-green)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: isTurning ? 'not-allowed' : 'pointer',
                opacity: isTurning ? 0.5 : 1,
                transition: prefersReducedMotion
                  ? 'none'
                  : 'border-color 250ms ease, background-color 250ms ease, opacity 250ms ease',
              }}
              onMouseEnter={(e) => {
                if (!isTurning) {
                  e.currentTarget.style.borderColor = 'var(--heritage-green)';
                  e.currentTarget.style.backgroundColor = 'rgba(11, 58, 47, 0.06)';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--heritage-green)';
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
              onFocus={(e) => {
                if (!isTurning) {
                  e.currentTarget.style.borderColor = 'var(--heritage-green)';
                  e.currentTarget.style.backgroundColor = 'rgba(11, 58, 47, 0.06)';
                }
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = 'var(--heritage-green)';
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M10 12L6 8L10 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {/* Spread Indicator */}
            <p
              style={{
                fontFamily: 'var(--font-montserrat)',
                fontSize: 'clamp(0.75rem, 0.9vw, 0.85rem)',
                fontWeight: 500,
                color: 'var(--heritage-green)',
                letterSpacing: '0.08em',
                minWidth: '4rem',
                textAlign: 'center',
              }}
            >
              {String(activeSpreadIndex + 1).padStart(2, '0')} /{' '}
              {String(collectiveSpreads.length).padStart(2, '0')}
            </p>

            {/* Next Button */}
            <button
              onClick={goToNextSpread}
              disabled={isTurning}
              aria-disabled={isTurning}
              aria-label="Next Collectives spread"
              style={{
                width: '3rem',
                height: '3rem',
                border: '1px solid var(--heritage-green)',
                borderRadius: '999px',
                backgroundColor: 'transparent',
                color: 'var(--heritage-green)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: isTurning ? 'not-allowed' : 'pointer',
                opacity: isTurning ? 0.5 : 1,
                transition: prefersReducedMotion
                  ? 'none'
                  : 'border-color 250ms ease, background-color 250ms ease, opacity 250ms ease',
              }}
              onMouseEnter={(e) => {
                if (!isTurning) {
                  e.currentTarget.style.borderColor = 'var(--heritage-green)';
                  e.currentTarget.style.backgroundColor = 'rgba(11, 58, 47, 0.06)';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--heritage-green)';
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
              onFocus={(e) => {
                if (!isTurning) {
                  e.currentTarget.style.borderColor = 'var(--heritage-green)';
                  e.currentTarget.style.backgroundColor = 'rgba(11, 58, 47, 0.06)';
                }
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = 'var(--heritage-green)';
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M6 4L10 8L6 12"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          {/* Progress Indicator */}
          {!prefersReducedMotion && !isTurning && (
            <div
              style={{
                width: '100%',
                maxWidth: '12rem',
                height: '1px',
                backgroundColor: 'rgba(11, 58, 47, 0.15)',
                marginTop: '1.5rem',
                marginInline: 'auto',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  height: '100%',
                  width: `${progress}%`,
                  backgroundColor: 'var(--heritage-green)',
                  transition: 'width 50ms linear',
                }}
              />
            </div>
          )}
        </div>
      )}

      {/* CSS Animations */}
      <style jsx>{`
        .collectives-manuscript-stage {
          transform-style: preserve-3d;
        }

        .turning-page {
          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
        }

        /* Apply desktop animations by default */
        .turning-page-forward {
          animation: page-turn-forward-desktop 1400ms cubic-bezier(0.65, 0, 0.35, 1) forwards;
        }

        .turning-page-backward {
          animation: page-turn-backward-desktop 1400ms cubic-bezier(0.65, 0, 0.35, 1) forwards;
        }

        @keyframes manuscript-cover-turn-opening {
          0% {
            transform: translateX(0) rotateY(0deg);
            opacity: 1;
          }
          70% {
            transform: translateX(-8%) rotateY(-85deg);
            opacity: 0.3;
          }
          100% {
            transform: translateX(-15%) rotateY(-105deg);
            opacity: 0;
          }
        }

        @keyframes page-turn-forward-desktop {
          0% {
            transform: translateX(0) rotateY(0deg);
          }
          50% {
            box-shadow: 0 14px 32px rgba(11, 58, 47, 0.12);
          }
          100% {
            transform: translateX(-1%) rotateY(-165deg);
          }
        }

        @keyframes page-turn-backward-desktop {
          0% {
            transform: translateX(0) rotateY(0deg);
          }
          50% {
            box-shadow: 0 14px 32px rgba(11, 58, 47, 0.12);
          }
          100% {
            transform: translateX(1%) rotateY(165deg);
          }
        }

        /* Mobile page turns using rotateX */
        @keyframes page-turn-forward-mobile {
          0% {
            transform: translateY(0) rotateX(0deg);
          }
          50% {
            box-shadow: 0 14px 32px rgba(11, 58, 47, 0.12);
          }
          100% {
            transform: translateY(-1%) rotateX(-165deg);
          }
        }

        @keyframes page-turn-backward-mobile {
          0% {
            transform: translateY(0) rotateX(0deg);
          }
          50% {
            box-shadow: 0 14px 32px rgba(11, 58, 47, 0.12);
          }
          100% {
            transform: translateY(1%) rotateX(165deg);
          }
        }

        @media (max-width: 768px) {
          .manuscript-grid {
            grid-template-columns: 1fr !important;
            grid-template-rows: auto auto auto;
            gap: 0 !important;
          }

          .manuscript-grid > div:nth-child(2) {
            width: 100%;
            height: 3rem;
          }

          .manuscript-grid > div:nth-child(2) svg {
            width: 100%;
            height: 100%;
            transform: rotate(90deg);
          }

          /* Mobile page turn animations */
          .turning-page-forward {
            animation: page-turn-forward-mobile 1400ms cubic-bezier(0.65, 0, 0.35, 1) forwards !important;
            transform-origin: top center !important;
          }

          .turning-page-backward {
            animation: page-turn-backward-mobile 1400ms cubic-bezier(0.65, 0, 0.35, 1) forwards !important;
            transform-origin: bottom center !important;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          @keyframes manuscript-cover-turn-opening {
            0% {
              opacity: 1;
            }
            100% {
              opacity: 0;
            }
          }

          .turning-page {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
}
