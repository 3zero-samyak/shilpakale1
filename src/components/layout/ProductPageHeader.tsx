'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import CompactNavigation from './CompactNavigation';

export default function ProductPageHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 bg-[var(--heritage-green)]"
        style={{
          height: 'clamp(5rem, 6.5vw, 6.5rem)',
          borderTop: '1px solid rgba(110, 139, 116, 0.22)',
          borderBottom: '1px solid rgba(110, 139, 116, 0.22)',
        }}
      >
        <div
          className="h-full grid items-center px-[5vw]"
          style={{ gridTemplateColumns: '1fr auto 1fr' }}
        >
          {/* Left: Logo */}
          <div className="flex items-center">
            <Link
              href="/"
              className="relative focus:outline-none focus:ring-2 focus:ring-[var(--ivory-archive)] focus:ring-offset-2 focus:ring-offset-[var(--heritage-green)] rounded"
              style={{
                width: 'clamp(2rem, 4vw, 2.5rem)',
                height: 'clamp(2rem, 4vw, 2.5rem)',
              }}
            >
              <Image
                src="/images/brand/shilpakale-logo1.webp"
                alt="SHILPAKALE Logo"
                fill
                className="object-contain"
                sizes="clamp(2rem, 4vw, 2.5rem)"
              />
            </Link>
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

          {/* Right: Menu Button */}
          <div className="flex items-center justify-end">
            <button
              type="button"
              onClick={handleMenuToggle}
              aria-expanded={isMenuOpen}
              aria-controls="compact-navigation-menu"
              aria-label={isMenuOpen ? 'Close navigation' : 'Open navigation'}
              className="flex flex-col items-center justify-center gap-1.5 w-11 h-11 focus:outline-none focus:ring-2 focus:ring-[var(--ivory-archive)] focus:ring-offset-2 focus:ring-offset-[var(--heritage-green)] rounded compact-menu-toggle"
            >
              {isMenuOpen ? (
                // Close icon (X)
                <svg
                  className="w-6 h-6"
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
        </div>
      </header>

      {/* Compact Navigation Menu */}
      <CompactNavigation isOpen={isMenuOpen} onClose={handleMenuClose} />
    </>
  );
}
