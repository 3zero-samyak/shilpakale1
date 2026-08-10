"use client";

import Link from 'next/link';
import Image from 'next/image';
import { footerColumns } from '@/data/footerNavigation';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

export default function Footer() {
  return (
    <footer className="w-full">
      {/* Part 1: Main Footer Navigation - Heritage Green Background */}
      <div
        className="w-full"
        style={{
          backgroundColor: 'var(--heritage-green)',
        }}
      >
        <div
          className="w-full mx-auto"
          style={{
            maxWidth: '120rem',
            paddingBlock: 'clamp(4.5rem, 8vw, 8rem)',
            paddingInline: 'clamp(1.5rem, 6vw, 7rem)',
          }}
        >
          {/* Four Column Grid */}
          <div
            className="footer-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
              gap: 'clamp(2.5rem, 6vw, 7rem)',
            }}
          >
            {footerColumns.map((column, index) => (
              <ScrollReveal
                key={column.heading}
                direction="up"
                distance={32}
                duration={800}
                delay={index * 100}
                threshold={0.2}
              >
                <div>
                {/* Column Heading */}
                <h3
                  style={{
                    fontFamily: 'var(--font-montserrat)',
                    fontSize: 'clamp(0.72rem, 0.9vw, 0.88rem)',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: 'var(--ivory-archive)',
                    fontWeight: 500,
                    lineHeight: 1.2,
                    marginBottom: '1.75rem',
                  }}
                >
                  {column.heading}
                </h3>

                {/* Column Links */}
                <ul
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                  }}
                >
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="footer-link"
                        style={{
                          position: 'relative',
                          display: 'inline-flex',
                          fontFamily: 'var(--font-montserrat)',
                          fontSize: 'clamp(0.82rem, 0.95vw, 0.92rem)',
                          color: 'var(--ivory-archive)',
                          textDecoration: 'none',
                          opacity: 0.85,
                          transition: 'opacity 280ms ease',
                        }}
                        {...(link.external && {
                          target: '_blank',
                          rel: 'noopener noreferrer',
                        })}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>

      {/* Part 2: Bottom Brand Area - Ivory Archive Background (replaced with approved artwork) */}
      <div
        className="w-full"
        style={{
          backgroundColor: 'var(--ivory-archive)',
        }}
      >
        <div
          className="w-full mx-auto"
          style={{
            maxWidth: '120rem',
            paddingBlock: 'clamp(3.5rem, 7vw, 6rem)',
            paddingInline: '1.5rem',
            textAlign: 'center',
          }}
        >
          {/* Approved footer artwork - uses public path /images/brand/footer.jpeg */}
          <ScrollReveal direction="up" distance={24} duration={800} delay={360}>
            <div className="footer-brand-artwork">
              <div style={{ width: 'min(100%, 48rem)' }}>
                <Image
                  src="/images/brand/footer.jpeg"
                  alt="SHILPAKALE — footer artwork"
                  width={1200}
                  height={200}
                  style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
                  sizes="(max-width: 640px) 100vw, 1200px"
                />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Footer Link Hover Effect - Respects prefers-reduced-motion */}
      <style>{`
        .footer-link::after {
          content: "";
          position: absolute;
          left: 0;
          right: 0;
          bottom: -0.2rem;
          height: 1px;
          background: currentColor;
          transform: scaleX(0);
          transform-origin: right center;
          transition: transform 280ms ease;
        }

        .footer-link:hover::after,
        .footer-link:focus-visible::after {
          transform: scaleX(1);
          transform-origin: left center;
        }

        .footer-link:hover {
          opacity: 1;
        }

        /* Responsive Grid */
        @media (max-width: 1024px) {
          .footer-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
            gap: clamp(2.5rem, 5vw, 3.5rem) clamp(2rem, 4vw, 3rem) !important;
          }
        }

        @media (max-width: 640px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
            gap: clamp(2.5rem, 6vw, 3rem) !important;
          }
        }

        /* Respect prefers-reduced-motion */
        @media (prefers-reduced-motion: reduce) {
          .footer-link::after {
            transition: none;
          }
          
          .footer-link {
            transition: none;
          }
        }
      `}</style>
    </footer>
  );
}
