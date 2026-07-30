'use client';

import { useState, useEffect, useRef } from 'react';

const stages = [
  { number: 1, label: 'Root traced' },
  { number: 2, label: 'Evidence studied' },
  { number: 3, label: 'Present relevance found' },
  { number: 4, label: 'Form selected' },
  { number: 5, label: 'Object shaped' },
  { number: 6, label: 'Archive created' },
];

export default function PhilosophyTimeline() {
  // Initialize prefersReducedMotion on mount
  const [prefersReducedMotion] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  const [activeStage, setActiveStage] = useState(() => {
    if (typeof window === 'undefined') return 0;
    const matches = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    return matches ? stages.length : 0;
  });

  const [hasAnimated, setHasAnimated] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion || hasAnimated) return;

    const timeline = timelineRef.current;
    if (!timeline) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          
          // Animate stages sequentially
          let currentStage = 0;
          const interval = setInterval(() => {
            currentStage++;
            setActiveStage(currentStage);
            
            if (currentStage >= stages.length) {
              clearInterval(interval);
            }
          }, 400); // 400ms between stages

          return () => clearInterval(interval);
        }
      },
      {
        threshold: 0.3,
      }
    );

    observer.observe(timeline);

    return () => {
      observer.disconnect();
    };
  }, [hasAnimated, prefersReducedMotion]);

  return (
    <div ref={timelineRef} className="w-full">
      {/* Desktop: Horizontal Timeline */}
      <div className="hidden md:flex items-start justify-between gap-4">
        {stages.map((stage, index) => {
          const isActive = activeStage >= stage.number;
          const showLine = index < stages.length - 1;

          return (
            <div key={stage.number} className="flex items-start gap-4 flex-1">
              {/* Stage */}
              <div className="flex flex-col items-center gap-3">
                {/* Number Box */}
                <div
                  className="w-12 h-12 flex items-center justify-center border transition-all duration-300"
                  style={{
                    borderColor: isActive
                      ? 'var(--heritage-green)'
                      : 'rgba(110, 139, 116, 0.3)',
                    borderWidth: isActive ? '2px' : '1px',
                  }}
                >
                  <span
                    className="text-lg transition-colors duration-300"
                    style={{
                      color: isActive ? 'var(--heritage-green)' : 'rgba(11, 58, 47, 0.35)',
                      fontWeight: isActive ? 600 : 400,
                    }}
                  >
                    {stage.number}
                  </span>
                </div>

                {/* Label */}
                <p
                  className="text-sm text-center max-w-[8rem] transition-colors duration-300"
                  style={{
                    color: isActive ? 'var(--heritage-green)' : 'rgba(11, 58, 47, 0.45)',
                  }}
                >
                  {stage.label}
                </p>
              </div>

              {/* Connecting Line */}
              {showLine && (
                <div className="flex-1 mt-6 relative">
                  {/* Base line */}
                  <div
                    className="h-px w-full"
                    style={{ backgroundColor: 'rgba(110, 139, 116, 0.25)' }}
                  />
                  {/* Active line that fills from left to right */}
                  <div
                    className="absolute top-0 left-0 h-px transition-all duration-500"
                    style={{
                      backgroundColor: 'var(--heritage-green)',
                      width: isActive ? '100%' : '0%',
                    }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Mobile: Vertical Timeline */}
      <div className="flex md:hidden flex-col items-center gap-6">
        {stages.map((stage, index) => {
          const isActive = activeStage >= stage.number;
          const showLine = index < stages.length - 1;

          return (
            <div key={stage.number} className="flex flex-col items-center gap-3">
              {/* Stage */}
              <div className="flex items-center gap-4">
                {/* Number Box */}
                <div
                  className="w-12 h-12 flex items-center justify-center border transition-all duration-300"
                  style={{
                    borderColor: isActive
                      ? 'var(--heritage-green)'
                      : 'rgba(110, 139, 116, 0.3)',
                    borderWidth: isActive ? '2px' : '1px',
                  }}
                >
                  <span
                    className="text-lg transition-colors duration-300"
                    style={{
                      color: isActive ? 'var(--heritage-green)' : 'rgba(11, 58, 47, 0.35)',
                      fontWeight: isActive ? 600 : 400,
                    }}
                  >
                    {stage.number}
                  </span>
                </div>

                {/* Label */}
                <p
                  className="text-sm transition-colors duration-300"
                  style={{
                    color: isActive ? 'var(--heritage-green)' : 'rgba(11, 58, 47, 0.45)',
                  }}
                >
                  {stage.label}
                </p>
              </div>

              {/* Connecting Line (Vertical) */}
              {showLine && (
                <div className="relative">
                  {/* Base line */}
                  <div
                    className="w-px h-8"
                    style={{ backgroundColor: 'rgba(110, 139, 116, 0.25)' }}
                  />
                  {/* Active line that fills from top to bottom */}
                  <div
                    className="absolute top-0 left-0 w-px transition-all duration-500"
                    style={{
                      backgroundColor: 'var(--heritage-green)',
                      height: isActive ? '100%' : '0%',
                    }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
