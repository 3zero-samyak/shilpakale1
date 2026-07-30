/**
 * CinematicEntry
 * 
 * A full-screen first-visit entry experience for SHILPAKALE.
 * 
 * Uses localStorage to track if the entry has been shown.
 * Sequentially highlights letters S-H-I-L-P-A-K-A-L-E with a calm, cinematic feel.
 * 
 * Testing command (to reset and see entry again):
 * ```js
 * localStorage.removeItem("shilpakale-entry-seen");
 * ```
 * Then refresh the page.
 */

'use client';

import { useEffect, useState } from 'react';

const STORAGE_KEY = 'shilpakale-entry-seen';
const LETTERS = ['S', 'H', 'I', 'L', 'P', 'A', 'K', 'A', 'L', 'E'];
const LETTER_DELAY = 180; // ms between each letter highlight
const HOLD_DURATION = 800; // ms to hold final state before fade
const FADE_DURATION = 600; // ms for fade out

export default function CinematicEntry() {
  // Lazy initialization with localStorage check
  const [shouldShow, setShouldShow] = useState<boolean>(() => {
    // During SSR or if localStorage unavailable, default to false
    if (typeof window === 'undefined') return false;
    
    try {
      const hasSeenEntry = localStorage.getItem(STORAGE_KEY);
      return hasSeenEntry !== 'true';
    } catch {
      return false;
    }
  });
  
  const [activeIndex, setActiveIndex] = useState(-1);
  const [isComplete, setIsComplete] = useState(false);

  // Run animation sequence when component mounts and shouldShow is true
  useEffect(() => {
    if (!shouldShow) return;

    // Prevent body scroll during entry
    document.body.style.overflow = 'hidden';

    // Animate letters sequentially
    let currentIndex = -1;
    const letterInterval = setInterval(() => {
      currentIndex += 1;
      if (currentIndex < LETTERS.length) {
        setActiveIndex(currentIndex);
      } else {
        clearInterval(letterInterval);
        
        // Hold final state, then fade out
        setTimeout(() => {
          setIsComplete(true);
          
          // After fade completes, hide and mark as seen
          setTimeout(() => {
            setShouldShow(false);
            document.body.style.overflow = '';
            localStorage.setItem(STORAGE_KEY, 'true');
          }, FADE_DURATION);
        }, HOLD_DURATION);
      }
    }, LETTER_DELAY);

    return () => {
      clearInterval(letterInterval);
      document.body.style.overflow = '';
    };
  }, [shouldShow]);

  // Don't render anything if not showing
  if (!shouldShow) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{
        backgroundColor: 'var(--ivory-archive)',
        opacity: isComplete ? 0 : 1,
        transition: isComplete ? `opacity ${FADE_DURATION}ms ease-out` : 'none',
      }}
      role="presentation"
      aria-hidden="true"
    >
      <div className="flex items-center gap-[0.08em]">
        {LETTERS.map((letter, index) => (
          <span
            key={index}
            className="inline-block font-[var(--font-wordmark)] uppercase"
            style={{
              fontSize: 'clamp(2.5rem, 8vw, 5rem)',
              letterSpacing: '0.2em',
              color: 'var(--heritage-green)',
              opacity: index <= activeIndex ? 1 : 0.15,
              transition: 'opacity 400ms ease-in-out',
              fontWeight: 400,
            }}
          >
            {letter}
          </span>
        ))}
      </div>
    </div>
  );
}
