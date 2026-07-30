'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

const navigation = [
  { name: 'HOME', href: '/' },
  { name: 'COLLECTION', href: '/collections' },
  { name: 'STORIES', href: '/stories' },
];

export default function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = useCallback(() => {
    setIsOpen(false);
  }, []);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        closeMenu();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when menu is open
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, closeMenu]);

  return (
    <>
      {/* Menu Button */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-expanded={isOpen}
        aria-controls="mobile-navigation-menu"
        aria-label="Open navigation"
        className="flex flex-col items-center justify-center w-10 h-10 gap-1.5 md:hidden"
      >
        <span className="w-6 h-0.5 bg-[var(--ivory-archive)] transition-all" />
        <span className="w-6 h-0.5 bg-[var(--ivory-archive)] transition-all" />
        <span className="w-6 h-0.5 bg-[var(--ivory-archive)] transition-all" />
      </button>

      {/* Mobile Menu Panel */}
      {isOpen && (
        <div
          id="mobile-navigation-menu"
          className="fixed inset-0 z-50 bg-[var(--heritage-green)] flex flex-col items-center justify-center"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
          {/* Close Button */}
          <button
            type="button"
            onClick={closeMenu}
            aria-label="Close navigation"
            className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center"
          >
            <svg
              className="w-6 h-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={closeMenu}
                className="text-[var(--ivory-archive)] text-2xl tracking-wider hover:text-[var(--archive-sage)] transition-colors text-center focus:outline-none focus:ring-2 focus:ring-[var(--ivory-archive)] focus:ring-offset-2 focus:ring-offset-[var(--heritage-green)] rounded px-4 py-2"
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
