"use client";

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { collectionEditorial } from '@/data/collectionEditorial';

interface ProductSearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

type SearchResult = {
  id: string;
  handle: string;
  title: string;
  description?: string | null;
  featuredImage?: { url: string; altText?: string | null } | null;
  collections?: { handle: string; title?: string }[];
  productType?: string | null;
};

export default function ProductSearchOverlay({ isOpen, onClose }: ProductSearchOverlayProps) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // Handle overlay close and reset query
  const handleClose = useCallback(() => {
    setQuery('');
    onClose();
  }, [onClose]);

  // Handle escape key and focus management
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when overlay is open
      document.body.style.overflow = 'hidden';

      // Focus input after a brief delay
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleClose]);

  // Fetch search results from server API when query changes
  useEffect(() => {
    let mounted = true;
    const controller = new AbortController();

    // Async function to perform search
    const performSearch = async () => {
      const trimmedQuery = query.trim();

      if (!trimmedQuery) {
        // Clear results when query is empty
        if (mounted) {
          setResults([]);
        }
        return;
      }

      setIsSearching(true);

      try {
        const res = await fetch(`/api/shopify/search?q=${encodeURIComponent(trimmedQuery)}`, {
          signal: controller.signal,
        });
        const json = await res.json();

        if (mounted) {
          setResults(json.results || []);
        }
      } catch {
        // Ignore abort errors
      } finally {
        if (mounted) {
          setIsSearching(false);
        }
      }
    };

    performSearch();

    return () => {
      mounted = false;
      controller.abort();
    };
  }, [query]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-40 z-[60] transition-opacity duration-300"
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Search Overlay */}
      <div
        className="fixed inset-0 z-[61] flex items-start justify-center pt-[10vh] px-4"
        role="dialog"
        aria-modal="true"
        aria-label="Product search"
      >
        <div
          className="w-full max-w-3xl bg-[var(--ivory-archive)] rounded-lg shadow-2xl overflow-hidden"
          style={{ maxHeight: '80vh' }}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-6 py-5 border-b"
            style={{ borderColor: 'rgba(11, 58, 47, 0.15)' }}
          >
            <h2
              className="text-base uppercase tracking-wider"
              style={{
                color: 'var(--heritage-green)',
                letterSpacing: '0.15em',
              }}
            >
              SEARCH THE ARCHIVE
            </h2>
            <button
              type="button"
              onClick={handleClose}
              aria-label="Close search"
              className="w-8 h-8 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-[var(--heritage-green)] focus:ring-offset-2 focus:ring-offset-[var(--ivory-archive)] rounded"
            >
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ color: 'var(--heritage-green)' }}
                aria-hidden="true"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Search Input */}
          <div className="px-6 py-6">
            <label htmlFor="product-search-input" className="sr-only">
              Search products, stories, and collections
            </label>
            <input
              ref={inputRef}
              id="product-search-input"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products, stories, and collections..."
              className="w-full px-4 py-3 text-base border-b bg-transparent focus:outline-none focus:border-[var(--heritage-green)] transition-colors"
              style={{
                color: 'var(--heritage-green)',
                borderColor: 'rgba(11, 58, 47, 0.25)',
              }}
            />
          </div>

          {/* Results */}
          <div className="px-6 pb-6 overflow-y-auto" style={{ maxHeight: 'calc(80vh - 200px)' }}>
            {!query.trim() && (
              <p
                className="text-center py-12 text-sm"
                style={{
                  color: 'var(--heritage-green)',
                  opacity: 0.6,
                }}
              >
                Search by object, story, or collection.
              </p>
            )}

            {query.trim() && !isSearching && results.length === 0 && (
              <p
                className="text-center py-12 text-sm"
                style={{
                  color: 'var(--heritage-green)',
                  opacity: 0.6,
                }}
              >
                No objects were found in the archive.
              </p>
            )}

            {results.length > 0 && (
              <div className="space-y-4">
                {results.map((product: SearchResult) => {
                  const collection = collectionEditorial.find((c) => c.id === product.collections?.[0]?.handle);
                  return (
                    <Link
                      key={product.handle}
                      href={`/products/${product.handle}`}
                      onClick={onClose}
                      className="flex gap-4 p-4 border rounded hover:bg-[rgba(11,58,47,0.03)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--heritage-green)] focus:ring-offset-2 focus:ring-offset-[var(--ivory-archive)]"
                      style={{ borderColor: 'rgba(11, 58, 47, 0.12)' }}
                    >
                      {/* Product Thumbnail */}
                      <div className="relative w-20 h-20 flex-shrink-0 bg-white rounded overflow-hidden">
                        {product.featuredImage?.url ? (
                          <Image
                            src={product.featuredImage.url}
                            alt={product.featuredImage.altText ?? product.title}
                            fill
                            className="object-cover"
                            sizes="80px"
                          />
                        ) : null}
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <h3
                          className="text-base font-medium mb-1"
                          style={{
                            color: 'var(--heritage-green)',
                            fontFamily: 'Georgia, serif',
                          }}
                        >
                          {product.title}
                        </h3>

                        <p
                          className="text-sm mb-1"
                          style={{
                            color: 'var(--heritage-green)',
                            opacity: 0.7,
                          }}
                        >
                          {product.description ?? ''}
                        </p>

                        <div className="flex flex-wrap gap-2 text-xs">
                          <span
                            className="uppercase tracking-wider"
                            style={{
                              color: 'var(--archive-sage)'
                            }}
                          >
                            {product.productType ?? ''}
                          </span>

                          {collection && (
                            <>
                              <span style={{ color: 'var(--archive-sage)' }}>•</span>
                              <span
                                className="uppercase tracking-wider"
                                style={{
                                  color: 'var(--archive-sage)',
                                }}
                              >
                                {collection.title}
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
