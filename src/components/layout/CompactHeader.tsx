'use client';

import { useState, useLayoutEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import CompactNavigation from './CompactNavigation';

export default function CompactHeader() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useLayoutEffect(() => {
    const masthead = document.getElementById('site-masthead');
    
    // If no masthead exists (e.g., product pages), always show the header
    if (!masthead) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Show compact header when masthead is less than 50% visible
        setIsVisible(!entry.isIntersecting);
      },
      {
        threshold: 0.5,
        rootMargin: '0px',
      }
    );

    observer.observe(masthead);

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleMenuToggle = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all bg-[var(--heritage-green)]"
        style={{
          height: 'clamp(5.5rem, 8.5vw, 7.5rem)',
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(-0.5rem)',
          pointerEvents: isVisible ? 'auto' : 'none',
          transitionDuration: '220ms',
          transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
          borderTop: '1px solid rgba(110, 139, 116, 0.22)',
          borderBottom: '1px solid rgba(110, 139, 116, 0.22)',
        }}
        aria-hidden={!isVisible}
      >
        <div
          className="h-full grid items-center px-[4.2vw]"
          style={{ gridTemplateColumns: '1fr auto 1fr' }}
        >
          {/* Left: Logo */}
          <div className="flex items-center">
              <Link
                href="/"
                className="relative focus:outline-none focus:ring-2 focus:ring-[var(--ivory-archive)] focus:ring-offset-2 focus:ring-offset-[var(--heritage-green)] rounded"
                style={{
                  width: 'clamp(3rem, 6vw, 4rem)',
                  height: 'clamp(3rem, 6vw, 4rem)',
                }}
              >
              <Image
                src="/images/brand/shilpakale-logo-v2.png"
                alt="SHILPAKALE Logo"
                fill
                className="object-contain"
                sizes="clamp(2.75rem, 5.2vw, 3.5rem)"
              />
            </Link>
          </div>

          {/* Center: SHILPAKALE Wordmark */}
          <Link
            href="/"
            className="font-[var(--font-wordmark)] uppercase text-[var(--ivory-archive)] tracking-wide focus:outline-none focus:ring-2 focus:ring-[var(--ivory-archive)] focus:ring-offset-2 focus:ring-offset-[var(--heritage-green)] rounded px-2 py-1"
            style={{
              fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
              letterSpacing: '0.12em',
            }}
          >
            SHILPAKALE
          </Link>

          {/* Right: Menu Button */}
          <div className="flex items-center justify-end">
            <button
              type="button"
              onClick={handleMenuToggle}
              aria-expanded={isMenuOpen}
              aria-controls="compact-navigation-menu"
              aria-label={isMenuOpen ? 'Close navigation' : 'Open navigation'}
              className="flex flex-col items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-[var(--ivory-archive)] focus:ring-offset-2 focus:ring-offset-[var(--heritage-green)] rounded compact-menu-toggle"
                style={{ width: 'clamp(3.75rem, 6vw, 4.5rem)', height: 'clamp(3.75rem, 6vw, 4.5rem)' }}
            >
              {isMenuOpen ? (
                // Close icon (X)
                <svg
                    className="w-9 h-9"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ color: 'var(--ivory-archive)' }}
                  aria-hidden="true"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              ) : (
                <div className="flex flex-col items-center justify-center gap-1.5">
                    <span
                      className="w-8 h-2.5 rounded transition-all"
                      style={{ backgroundColor: 'var(--ivory-archive)' }}
                    />
                    <span
                      className="w-8 h-2.5 rounded transition-all"
                      style={{ backgroundColor: 'var(--ivory-archive)' }}
                    />
                </div>
              )}
            </button>
          </div>

          {/* Right: SHILPAKALE Wordmark */}
          <Link
            href="/"
            className="font-[var(--font-wordmark)] uppercase text-[var(--ivory-archive)] tracking-wide focus:outline-none focus:ring-2 focus:ring-[var(--ivory-archive)] focus:ring-offset-2 focus:ring-offset-[var(--heritage-green)] rounded px-2 py-1"
            style={{
              fontSize: 'clamp(1.25rem, 2.2vw, 1.95rem)',
              letterSpacing: '0.12em',
            }}
          >
            SHILPAKALE
          </Link>
        </div>
      </header>

      {/* Compact Navigation Menu */}
      <CompactNavigation isOpen={isMenuOpen} onClose={handleMenuClose} />
    </>
  );
}
