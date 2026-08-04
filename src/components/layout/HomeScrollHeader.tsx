'use client';

import { useState, useLayoutEffect } from 'react';
import Link from 'next/link';
import CompactNavigation from './CompactNavigation';
import ProductSearchOverlay from '../search/ProductSearchOverlay';

export default function HomeScrollHeader() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useLayoutEffect(() => {
    const masthead = document.getElementById('site-masthead');
    
    if (!masthead) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Show header when masthead is NOT intersecting (scrolled out of view)
        setIsVisible(!entry.isIntersecting);
      },
      {
        threshold: 0,
        rootMargin: '-1px',
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

  const handleSearchToggle = () => {
    setIsSearchOpen((prev) => !prev);
  };

  const handleSearchClose = () => {
    setIsSearchOpen(false);
  };

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all bg-[var(--heritage-green)]"
        style={{
          height: 'clamp(3.5rem, 5vw, 4rem)',
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
          className="h-full grid items-center px-[5vw]"
          style={{ gridTemplateColumns: '1fr auto 1fr' }}
        >
          {/* Left: Menu Button */}
          <div className="flex items-center">
            <button
              type="button"
              onClick={handleMenuToggle}
              aria-expanded={isMenuOpen}
              aria-controls="compact-navigation-menu"
              aria-label={isMenuOpen ? 'Close navigation' : 'Open navigation'}
              className="flex flex-col items-center justify-center gap-1 w-9 h-9 focus:outline-none focus:ring-2 focus:ring-[var(--ivory-archive)] focus:ring-offset-2 focus:ring-offset-[var(--heritage-green)] rounded compact-menu-toggle"
            >
              {isMenuOpen ? (
                // Close icon (X)
                <svg
                  className="w-5 h-5"
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
                <div className="flex flex-col items-center justify-center gap-1">
                  <span
                    className="w-5 h-1.5 rounded transition-all"
                    style={{ backgroundColor: 'var(--ivory-archive)' }}
                  />
                  <span
                    className="w-5 h-1.5 rounded transition-all"
                    style={{ backgroundColor: 'var(--ivory-archive)' }}
                  />
                </div>
              )}
            </button>
          </div>

          {/* Center: SHILPAKALE Wordmark */}
          <Link
            href="/"
            className="font-[var(--font-wordmark)] uppercase text-[var(--ivory-archive)] tracking-wide focus:outline-none focus:ring-2 focus:ring-[var(--ivory-archive)] focus:ring-offset-2 focus:ring-offset-[var(--heritage-green)] rounded px-2 py-1"
            style={{
              fontSize: 'clamp(1.05rem, 1.8vw, 1.5rem)',
              letterSpacing: '0.12em',
            }}
          >
            SHILPAKALE
          </Link>

          {/* Right: Search and Profile */}
          <div className="flex items-center justify-end gap-2">
            {/* Search Button */}
            <button
              type="button"
              onClick={handleSearchToggle}
              aria-label="Search SHILPAKALE products"
              className="flex items-center justify-center w-9 h-9 focus:outline-none focus:ring-2 focus:ring-[var(--ivory-archive)] focus:ring-offset-2 focus:ring-offset-[var(--heritage-green)] rounded"
            >
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ color: 'var(--ivory-archive)' }}
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
            </button>

            {/* Profile Button */}
            <Link
              href="/account"
              aria-label="Open account options"
              className="flex items-center justify-center w-9 h-9 focus:outline-none focus:ring-2 focus:ring-[var(--ivory-archive)] focus:ring-offset-2 focus:ring-offset-[var(--heritage-green)] rounded"
            >
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ color: 'var(--ivory-archive)' }}
                aria-hidden="true"
              >
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </Link>
          </div>
        </div>
      </header>

      {/* Compact Navigation Menu */}
      <CompactNavigation isOpen={isMenuOpen} onClose={handleMenuClose} />

      {/* Product Search Overlay */}
      <ProductSearchOverlay isOpen={isSearchOpen} onClose={handleSearchClose} />
    </>
  );
}
