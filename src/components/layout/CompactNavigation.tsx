'use client';

import { useEffect } from 'react';
import Link from 'next/link';

const navigation = [
  { name: 'HOME', href: '/' },
  { name: 'COLLECTION', href: '/collections' },
  { name: 'STORIES', href: '/stories' },
  { name: 'ABOUT US', href: '/about' },
];

interface CompactNavigationProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CompactNavigation({ isOpen, onClose }: CompactNavigationProps) {
  // Handle escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
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
  }, [isOpen, onClose]);

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40 transition-opacity duration-300"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Left-side Navigation Panel */}
      <div
        id="compact-navigation-menu"
        className="fixed top-0 left-0 h-full bg-[var(--heritage-green)] z-50 transition-transform duration-300 ease-in-out"
        style={{
          width: 'clamp(280px, 35vw, 400px)',
          transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
          borderRight: '1px solid rgba(110, 139, 116, 0.22)',
        }}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        {/* Close Button */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[rgba(110,139,116,0.22)]">
          <span className="text-[var(--ivory-archive)] text-sm uppercase tracking-wider opacity-60">
            Menu
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close navigation"
            className="w-8 h-8 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-[var(--ivory-archive)] focus:ring-offset-2 focus:ring-offset-[var(--heritage-green)] rounded"
          >
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
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col px-6 py-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={onClose}
              className="header-nav-link text-[var(--ivory-archive)] text-lg tracking-wide py-3 focus:outline-none focus:ring-2 focus:ring-[var(--ivory-archive)] focus:ring-offset-2 focus:ring-offset-[var(--heritage-green)]"
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
