"use client";

import { useEffect, useRef, useState } from 'react';
import { Fragment } from 'react';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

const BRAND_POSITION_COPY = `SHILPAKALE traces the intelligence embedded in places, materials, systems, and traditions. Each object begins with research and is shaped through evidence, context, and present relevance. The result is not generic décor, but a considered physical archive. Every form is designed to preserve a story with precision, restraint, and permanence. Together, these objects create a collectible record of ideas that continue to shape the present. SHILPAKALE exists to turn researched narratives into forms worthy of being kept.`;

function clamp(v: number, a = 0, b = 1) {
  return Math.max(a, Math.min(b, v));
}

export default function BrandPositioning() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const frameRef = useRef<number | null>(null);
  const activeRef = useRef<number>(0);
  const words = BRAND_POSITION_COPY.trim().split(/\s+/);
  // Initialize reduced-motion and active count based on the user's preference.
  const prefersReduced = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const [isReducedMotion] = useState<boolean>(prefersReduced);
  const [activeCount, setActiveCount] = useState<number>(prefersReduced ? words.length : 0);

  

  useEffect(() => {
    if (isReducedMotion) {
      // already reflected in initial state
      return undefined;
    }

    function updateProgress() {
      frameRef.current = null;
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const viewportTriggerStart = window.innerHeight * 0.7; // start when section enters lower 65-70%
      const viewportTravelAdjustment = window.innerHeight * 0.3; // finish before fully leaving

      const raw = (viewportTriggerStart - rect.top) / (rect.height - viewportTravelAdjustment);
      const progress = clamp(raw, 0, 1);
      const active = Math.round(progress * words.length);

      if (active !== activeRef.current) {
        activeRef.current = active;
        setActiveCount(active);
      }
    }

    function handleScroll() {
      if (frameRef.current !== null) return;
      frameRef.current = window.requestAnimationFrame(updateProgress);
    }

    // Initial calc
    updateProgress();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    // ResizeObserver to catch section dimension changes
    let ro: ResizeObserver | null = null;
    const observedEl = sectionRef.current;
    if ('ResizeObserver' in window && observedEl) {
      ro = new ResizeObserver(() => {
        handleScroll();
      });
      ro.observe(observedEl);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
      if (ro && observedEl) ro.unobserve(observedEl);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section
      ref={sectionRef}
      className="brand-position-scroll-section"
      aria-labelledby="brand-position-heading"
    >
      <div className="brand-position-sticky">
        <ScrollReveal direction="up" distance={20} duration={800} threshold={0.3}>
          <p
            id="brand-position-heading"
            className="brand-position-label"
          >
            BRAND POSITION
          </p>
        </ScrollReveal>

        {/* Accessible single paragraph for screen readers */}
        <p className="sr-only">{BRAND_POSITION_COPY}</p>

        {/* Visible corrected paragraph (used for reading and layout) */}
        <p className="brand-position-copy" aria-hidden="false">
          {BRAND_POSITION_COPY}
        </p>

        {/* Animated word-by-word copy (aria-hidden) */}
        <p className="brand-position-animated-copy" aria-hidden="true">
          {words.map((word, index) => (
            <Fragment key={`${word}-${index}`}>
              <span
                className={
                  index < activeCount
                    ? 'brand-position-word is-active'
                    : 'brand-position-word'
                }
                aria-hidden="true"
              >
                {word}
              </span>
              {index < words.length - 1 ? ' ' : null}
            </Fragment>
          ))}
        </p>
      </div>
    </section>
  );
}
