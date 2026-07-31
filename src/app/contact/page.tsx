'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';
import ProductPageHeader from '@/components/layout/ProductPageHeader';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    subject: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Show the not-yet-enabled message instead of fake submission
    setSubmitted(true);
  };

  return (
    <>
      <ProductPageHeader />

      <main
        style={{
          width: '100%',
          backgroundColor: 'var(--ivory-archive)',
          paddingTop: 'clamp(3.5rem, 5vw, 4rem)',
        }}
      >
        <article
          style={{
            width: '100%',
            maxWidth: '100rem',
            marginInline: 'auto',
            paddingBlock: 'clamp(4rem, 8vw, 8rem)',
            paddingInline: 'clamp(1.5rem, 7vw, 9rem)',
          }}
        >
          {/* Page Heading */}
          <h1
            style={{
              fontFamily: 'Georgia, serif',
              fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              color: 'var(--heritage-green)',
              fontWeight: 400,
              marginBottom: 'clamp(2rem, 4vw, 3rem)',
            }}
          >
            CONTACT SHILPAKALE
          </h1>

          {/* Supporting Copy */}
          <div
            style={{
              maxWidth: '58rem',
              marginBottom: 'clamp(3rem, 6vw, 5rem)',
            }}
          >
            <p
              style={{
                fontSize: 'clamp(1.1rem, 1.35vw, 1.3rem)',
                lineHeight: 1.6,
                color: 'var(--heritage-green)',
                opacity: 0.85,
              }}
            >
              For product questions, collection enquiries, order support, collaborations, or general communication, use the appropriate option below.
            </p>
          </div>

          {/* Contact Options */}
          <div
            style={{
              maxWidth: '58rem',
              display: 'flex',
              flexDirection: 'column',
              gap: 'clamp(2rem, 3vw, 2.5rem)',
              marginBottom: 'clamp(4rem, 6vw, 5rem)',
            }}
          >
            {/* Product or Collection Enquiry */}
            <div
              style={{
                padding: 'clamp(1.5rem, 3vw, 2rem)',
                border: '1px solid rgba(11, 58, 47, 0.15)',
              }}
            >
              <h2
                style={{
                  fontFamily: 'var(--font-montserrat)',
                  fontSize: 'clamp(0.85rem, 1vw, 0.95rem)',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: 'var(--heritage-green)',
                  fontWeight: 600,
                  marginBottom: '1rem',
                }}
              >
                PRODUCT OR COLLECTION ENQUIRY
              </h2>
              <p
                style={{
                  fontSize: 'clamp(1rem, 1.15vw, 1.1rem)',
                  lineHeight: 1.7,
                  color: 'var(--heritage-green)',
                  opacity: 0.8,
                  marginBottom: '1.5rem',
                }}
              >
                Ask questions about specific objects, collections, materials, availability, or custom requests.
              </p>
              <Link
                href="/enquire"
                style={{
                  display: 'inline-flex',
                  fontFamily: 'var(--font-montserrat)',
                  fontSize: 'clamp(0.82rem, 0.95vw, 0.92rem)',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'var(--heritage-green)',
                  textDecoration: 'none',
                  fontWeight: 500,
                  borderBottom: '1px solid var(--heritage-green)',
                  paddingBottom: '0.25rem',
                }}
              >
                SUBMIT ENQUIRY →
              </Link>
            </div>

            {/* Order or Delivery Support */}
            <div
              style={{
                padding: 'clamp(1.5rem, 3vw, 2rem)',
                border: '1px solid rgba(11, 58, 47, 0.15)',
              }}
            >
              <h2
                style={{
                  fontFamily: 'var(--font-montserrat)',
                  fontSize: 'clamp(0.85rem, 1vw, 0.95rem)',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: 'var(--heritage-green)',
                  fontWeight: 600,
                  marginBottom: '1rem',
                }}
              >
                ORDER OR DELIVERY SUPPORT
              </h2>
              <p
                style={{
                  fontSize: 'clamp(1rem, 1.15vw, 1.1rem)',
                  lineHeight: 1.7,
                  color: 'var(--heritage-green)',
                  opacity: 0.8,
                  marginBottom: '1.5rem',
                }}
              >
                Report issues with shipment, tracking, delivery, or product condition.
              </p>
              <Link
                href="/enquire?source=order-support"
                style={{
                  display: 'inline-flex',
                  fontFamily: 'var(--font-montserrat)',
                  fontSize: 'clamp(0.82rem, 0.95vw, 0.92rem)',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'var(--heritage-green)',
                  textDecoration: 'none',
                  fontWeight: 500,
                  borderBottom: '1px solid var(--heritage-green)',
                  paddingBottom: '0.25rem',
                }}
              >
                SUBMIT SUPPORT REQUEST →
              </Link>
            </div>
          </div>

          {/* General Contact Form */}
          <div style={{ maxWidth: '58rem' }}>
            <h2
              style={{
                fontFamily: 'var(--font-montserrat)',
                fontSize: 'clamp(0.85rem, 1vw, 0.95rem)',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'var(--heritage-green)',
                fontWeight: 600,
                marginBottom: '2rem',
              }}
            >
              GENERAL CONTACT
            </h2>

            {!submitted ? (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    style={{
                      display: 'block',
                      fontFamily: 'var(--font-montserrat)',
                      fontSize: 'clamp(0.8rem, 0.92vw, 0.9rem)',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      color: 'var(--heritage-green)',
                      fontWeight: 500,
                      marginBottom: '0.5rem',
                    }}
                  >
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      fontFamily: 'var(--font-montserrat)',
                      fontSize: 'clamp(0.95rem, 1.05vw, 1rem)',
                      color: 'var(--heritage-green)',
                      backgroundColor: 'transparent',
                      border: '1px solid rgba(11, 58, 47, 0.3)',
                      outline: 'none',
                    }}
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    style={{
                      display: 'block',
                      fontFamily: 'var(--font-montserrat)',
                      fontSize: 'clamp(0.8rem, 0.92vw, 0.9rem)',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      color: 'var(--heritage-green)',
                      fontWeight: 500,
                      marginBottom: '0.5rem',
                    }}
                  >
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      fontFamily: 'var(--font-montserrat)',
                      fontSize: 'clamp(0.95rem, 1.05vw, 1rem)',
                      color: 'var(--heritage-green)',
                      backgroundColor: 'transparent',
                      border: '1px solid rgba(11, 58, 47, 0.3)',
                      outline: 'none',
                    }}
                  />
                </div>

                {/* Mobile Number */}
                <div>
                  <label
                    htmlFor="mobile"
                    style={{
                      display: 'block',
                      fontFamily: 'var(--font-montserrat)',
                      fontSize: 'clamp(0.8rem, 0.92vw, 0.9rem)',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      color: 'var(--heritage-green)',
                      fontWeight: 500,
                      marginBottom: '0.5rem',
                    }}
                  >
                    Mobile Number
                  </label>
                  <input
                    type="tel"
                    id="mobile"
                    value={formData.mobile}
                    onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      fontFamily: 'var(--font-montserrat)',
                      fontSize: 'clamp(0.95rem, 1.05vw, 1rem)',
                      color: 'var(--heritage-green)',
                      backgroundColor: 'transparent',
                      border: '1px solid rgba(11, 58, 47, 0.3)',
                      outline: 'none',
                    }}
                  />
                </div>

                {/* Subject */}
                <div>
                  <label
                    htmlFor="subject"
                    style={{
                      display: 'block',
                      fontFamily: 'var(--font-montserrat)',
                      fontSize: 'clamp(0.8rem, 0.92vw, 0.9rem)',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      color: 'var(--heritage-green)',
                      fontWeight: 500,
                      marginBottom: '0.5rem',
                    }}
                  >
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      fontFamily: 'var(--font-montserrat)',
                      fontSize: 'clamp(0.95rem, 1.05vw, 1rem)',
                      color: 'var(--heritage-green)',
                      backgroundColor: 'transparent',
                      border: '1px solid rgba(11, 58, 47, 0.3)',
                      outline: 'none',
                    }}
                  />
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    style={{
                      display: 'block',
                      fontFamily: 'var(--font-montserrat)',
                      fontSize: 'clamp(0.8rem, 0.92vw, 0.9rem)',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      color: 'var(--heritage-green)',
                      fontWeight: 500,
                      marginBottom: '0.5rem',
                    }}
                  >
                    Message *
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      fontFamily: 'var(--font-montserrat)',
                      fontSize: 'clamp(0.95rem, 1.05vw, 1rem)',
                      color: 'var(--heritage-green)',
                      backgroundColor: 'transparent',
                      border: '1px solid rgba(11, 58, 47, 0.3)',
                      outline: 'none',
                      resize: 'vertical',
                    }}
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  style={{
                    alignSelf: 'flex-start',
                    padding: '0.85rem 2rem',
                    fontFamily: 'var(--font-montserrat)',
                    fontSize: 'clamp(0.8rem, 0.92vw, 0.9rem)',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: 'var(--ivory-archive)',
                    backgroundColor: 'var(--heritage-green)',
                    border: 'none',
                    cursor: 'pointer',
                    fontWeight: 500,
                  }}
                >
                  SEND MESSAGE
                </button>
              </form>
            ) : (
              <div
                style={{
                  padding: 'clamp(2rem, 4vw, 3rem)',
                  border: '1px solid rgba(11, 58, 47, 0.15)',
                  backgroundColor: 'rgba(110, 139, 116, 0.05)',
                }}
              >
                <p
                  style={{
                    fontSize: 'clamp(1rem, 1.15vw, 1.1rem)',
                    lineHeight: 1.7,
                    color: 'var(--heritage-green)',
                    opacity: 0.85,
                  }}
                >
                  Online contact submissions will be enabled when the approved communication service is connected.
                </p>
              </div>
            )}
          </div>
        </article>
      </main>
    </>
  );
}
