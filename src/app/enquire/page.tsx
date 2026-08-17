'use client';

import { useState, FormEvent, useRef, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductPageHeader from '@/components/layout/ProductPageHeader';
import Footer from '@/components/layout/Footer';
import FormStatus from '@/components/forms/FormStatus';
import { submitEnquiry, useCustomerSession, type EnquiryFormValues } from '@/lib/customer-session';
import { collectionEditorial } from '@/data/collectionEditorial';

function EnquireForm() {
  const searchParams = useSearchParams();
  const session = useCustomerSession();
  const initializedRef = useRef(false);

  // Derive context from search params (computed on each render)
  const productHandle = searchParams?.get('product');
  const collectionSlug = searchParams?.get('collection');
  const sourceParam = searchParams?.get('source');

  // Derive collection context label directly (synchronous)
  const collectionLabel = collectionSlug
    ? (() => {
        const collection = collectionEditorial.find(c => c.id === collectionSlug);
        return collection ? `Regarding: ${collection.title}` : '';
      })()
    : '';
  const [productLabel, setProductLabel] = useState('');
  const contextLabel = productLabel || collectionLabel;

  // Determine initial source
  let initialSource = '';
  if (productHandle) {
    initialSource = `product:${productHandle}`;
  } else if (collectionSlug) {
    initialSource = `collection:${collectionSlug}`;
  } else if (sourceParam) {
    initialSource = sourceParam;
  }

  const [formValues, setFormValues] = useState<EnquiryFormValues>({
    firstName: '',
    lastName: '',
    email: '',
    mobileNumber: '',
    suggestion: '',
    source: initialSource,
  });

  // Fetch product title to display context label when productHandle present
  useEffect(() => {
    let mounted = true;

    if (!productHandle) {
      const timer = setTimeout(() => {
        if (mounted) setProductLabel('');
      }, 0);
      return () => {
        mounted = false;
        clearTimeout(timer);
      };
    }

    fetch(`/api/shopify/product?handle=${encodeURIComponent(productHandle)}`)
      .then((r) => r.json())
      .then((json) => {
        if (!mounted) return;
        const p = json.product;
        if (p) {
          setProductLabel(`Regarding: ${p.title}`);
        }
      })
      .catch(() => {})
    ;

    return () => {
      mounted = false;
    };
  }, [productHandle]);

  const [errors, setErrors] = useState<Partial<Record<keyof EnquiryFormValues, string>>>({});
  const [statusMessage, setStatusMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Update source only once on mount if not already initialized
  useEffect(() => {
    if (!initializedRef.current && initialSource) {
      setFormValues(prev => ({ ...prev, source: initialSource }));
      initializedRef.current = true;
    }
  }, [initialSource]); // Run when initialSource changes

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    setStatusMessage('');

    // Validation
    const newErrors: Partial<Record<keyof EnquiryFormValues, string>> = {};

    if (!formValues.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    if (!formValues.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    // Email is required only when not authenticated
    if (!session.isAuthenticated) {
      if (!formValues.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formValues.email)) {
        newErrors.email = 'Valid email is required';
      }
    }
    if (!formValues.mobileNumber.trim()) {
      newErrors.mobileNumber = 'Mobile number is required';
    }
    if (!formValues.suggestion.trim()) {
      newErrors.suggestion = 'Suggestion is required';
    } else if (formValues.suggestion.trim().length < 10) {
      newErrors.suggestion = 'Please provide at least 10 characters';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      // Focus first invalid field
      const firstErrorField = Object.keys(newErrors)[0] as keyof EnquiryFormValues;
      document.getElementById(firstErrorField)?.focus();
      return;
    }

    // Submit form
    setIsSubmitting(true);
    try {
      const result = await submitEnquiry(formValues, session);
      setStatusMessage(result.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));

    // Clear error for this field
    if (errors[name as keyof EnquiryFormValues]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const isFormValid =
    formValues.firstName &&
    formValues.lastName &&
    (session.isAuthenticated || formValues.email) &&
    formValues.mobileNumber &&
    formValues.suggestion &&
    formValues.suggestion.length >= 10 &&
    !isSubmitting;

  return (
    <>
      <ProductPageHeader />

      <main
        style={{
          paddingTop: 'clamp(3.5rem, 5vw, 4rem)',
          paddingBottom: 'clamp(4rem, 8vw, 8rem)',
          backgroundColor: 'var(--ivory-archive)',
          minHeight: '80svh',
        }}
      >
        <div
          style={{
            width: 'min(100%, 56rem)',
            marginInline: 'auto',
            paddingInline: 'clamp(1.25rem, 5vw, 3rem)',
            paddingTop: 'clamp(4rem, 6vw, 6rem)',
          }}
        >
          {/* Heading */}
          <h1
            style={{
              fontFamily: 'Georgia, serif',
              fontSize: 'clamp(2.75rem, 5vw, 5.5rem)',
              lineHeight: 1,
              textTransform: 'uppercase',
              textAlign: 'center',
              color: 'var(--heritage-green)',
              fontWeight: 400,
              letterSpacing: '-0.003em',
              marginBottom: 'clamp(1.5rem, 2.5vw, 2rem)',
            }}
          >
            ENQUIRE
          </h1>

          {/* Supporting Line */}
          <p
            style={{
              textAlign: 'center',
              color: 'var(--heritage-green)',
              opacity: 0.75,
              fontSize: 'clamp(0.95rem, 1.1vw, 1.05rem)',
              lineHeight: 1.6,
              fontFamily: 'var(--font-montserrat)',
              marginBottom: contextLabel ? 'clamp(1rem, 1.5vw, 1.5rem)' : 'clamp(3rem, 5vw, 5rem)',
              maxWidth: '42rem',
              marginInline: 'auto',
            }}
          >
            Share your details and tell us what you would like to know.
          </p>

          {/* Context Label */}
          {contextLabel && (
            <p
              style={{
                textAlign: 'center',
                color: 'var(--archive-sage)',
                fontSize: 'clamp(0.85rem, 0.95vw, 0.9rem)',
                fontFamily: 'var(--font-montserrat)',
                fontStyle: 'italic',
                marginBottom: 'clamp(3rem, 5vw, 5rem)',
              }}
            >
              {contextLabel}
            </p>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(1.5rem, 2.5vw, 2rem)' }}>
            {/* First Name and Last Name Row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm uppercase tracking-wider mb-2"
                  style={{
                    color: 'var(--heritage-green)',
                    letterSpacing: '0.1em',
                    fontFamily: 'var(--font-montserrat)',
                    fontWeight: 500,
                  }}
                >
                  First Name *
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formValues.firstName}
                  onChange={handleChange}
                  required
                  autoComplete="given-name"
                  aria-invalid={!!errors.firstName}
                  aria-describedby={errors.firstName ? 'firstName-error' : undefined}
                  style={{
                    width: '100%',
                    padding: '1.25rem 1rem',
                    border: '1px solid rgba(11, 58, 47, 0.65)',
                    borderRadius: 0,
                    background: 'transparent',
                    color: 'var(--heritage-green)',
                    fontSize: '1rem',
                    fontFamily: 'var(--font-montserrat)',
                    transition: 'border-color 200ms ease, outline 200ms ease',
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#0B3A2F';
                    e.target.style.outline = '2px solid rgba(11, 58, 47, 0.15)';
                    e.target.style.outlineOffset = '2px';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(11, 58, 47, 0.65)';
                    e.target.style.outline = 'none';
                  }}
                />
                {errors.firstName && (
                  <p
                    id="firstName-error"
                    className="text-sm mt-2"
                    style={{ color: '#c53030' }}
                    role="alert"
                  >
                    {errors.firstName}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm uppercase tracking-wider mb-2"
                  style={{
                    color: 'var(--heritage-green)',
                    letterSpacing: '0.1em',
                    fontFamily: 'var(--font-montserrat)',
                    fontWeight: 500,
                  }}
                >
                  Last Name *
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formValues.lastName}
                  onChange={handleChange}
                  required
                  autoComplete="family-name"
                  aria-invalid={!!errors.lastName}
                  aria-describedby={errors.lastName ? 'lastName-error' : undefined}
                  style={{
                    width: '100%',
                    padding: '1.25rem 1rem',
                    border: '1px solid rgba(11, 58, 47, 0.65)',
                    borderRadius: 0,
                    background: 'transparent',
                    color: 'var(--heritage-green)',
                    fontSize: '1rem',
                    fontFamily: 'var(--font-montserrat)',
                    transition: 'border-color 200ms ease, outline 200ms ease',
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#0B3A2F';
                    e.target.style.outline = '2px solid rgba(11, 58, 47, 0.15)';
                    e.target.style.outlineOffset = '2px';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(11, 58, 47, 0.65)';
                    e.target.style.outline = 'none';
                  }}
                />
                {errors.lastName && (
                  <p
                    id="lastName-error"
                    className="text-sm mt-2"
                    style={{ color: '#c53030' }}
                    role="alert"
                  >
                    {errors.lastName}
                  </p>
                )}
              </div>
            </div>

            {/* Email Field - Only shown when not authenticated */}
            {!session.isAuthenticated && (
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm uppercase tracking-wider mb-2"
                  style={{
                    color: 'var(--heritage-green)',
                    letterSpacing: '0.1em',
                    fontFamily: 'var(--font-montserrat)',
                    fontWeight: 500,
                  }}
                >
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formValues.email}
                  onChange={handleChange}
                  required
                  autoComplete="email"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                  style={{
                    width: '100%',
                    padding: '1.25rem 1rem',
                    border: '1px solid rgba(11, 58, 47, 0.65)',
                    borderRadius: 0,
                    background: 'transparent',
                    color: 'var(--heritage-green)',
                    fontSize: '1rem',
                    fontFamily: 'var(--font-montserrat)',
                    transition: 'border-color 200ms ease, outline 200ms ease',
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#0B3A2F';
                    e.target.style.outline = '2px solid rgba(11, 58, 47, 0.15)';
                    e.target.style.outlineOffset = '2px';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(11, 58, 47, 0.65)';
                    e.target.style.outline = 'none';
                  }}
                />
                {errors.email && (
                  <p
                    id="email-error"
                    className="text-sm mt-2"
                    style={{ color: '#c53030' }}
                    role="alert"
                  >
                    {errors.email}
                  </p>
                )}
              </div>
            )}

            {/* Mobile Number Field */}
            <div>
              <label
                htmlFor="mobileNumber"
                className="block text-sm uppercase tracking-wider mb-2"
                style={{
                  color: 'var(--heritage-green)',
                  letterSpacing: '0.1em',
                  fontFamily: 'var(--font-montserrat)',
                  fontWeight: 500,
                }}
              >
                Mobile Number *
              </label>
              <input
                type="tel"
                id="mobileNumber"
                name="mobileNumber"
                value={formValues.mobileNumber}
                onChange={handleChange}
                required
                autoComplete="tel"
                aria-invalid={!!errors.mobileNumber}
                aria-describedby={errors.mobileNumber ? 'mobileNumber-error' : undefined}
                style={{
                  width: '100%',
                  padding: '1.25rem 1rem',
                  border: '1px solid rgba(11, 58, 47, 0.65)',
                  borderRadius: 0,
                  background: 'transparent',
                  color: 'var(--heritage-green)',
                  fontSize: '1rem',
                  fontFamily: 'var(--font-montserrat)',
                  transition: 'border-color 200ms ease, outline 200ms ease',
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#0B3A2F';
                  e.target.style.outline = '2px solid rgba(11, 58, 47, 0.15)';
                  e.target.style.outlineOffset = '2px';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(11, 58, 47, 0.65)';
                  e.target.style.outline = 'none';
                }}
              />
              {errors.mobileNumber && (
                <p
                  id="mobileNumber-error"
                  className="text-sm mt-2"
                  style={{ color: '#c53030' }}
                  role="alert"
                >
                  {errors.mobileNumber}
                </p>
              )}
            </div>

            {/* Suggestion Field */}
            <div>
              <label
                htmlFor="suggestion"
                className="block text-sm uppercase tracking-wider mb-2"
                style={{
                  color: 'var(--heritage-green)',
                  letterSpacing: '0.1em',
                  fontFamily: 'var(--font-montserrat)',
                  fontWeight: 500,
                }}
              >
                Suggestion *
              </label>
              <textarea
                id="suggestion"
                name="suggestion"
                value={formValues.suggestion}
                onChange={handleChange}
                required
                rows={6}
                aria-invalid={!!errors.suggestion}
                aria-describedby={errors.suggestion ? 'suggestion-error' : undefined}
                style={{
                  width: '100%',
                  padding: '1.25rem 1rem',
                  border: '1px solid rgba(11, 58, 47, 0.65)',
                  borderRadius: 0,
                  background: 'transparent',
                  color: 'var(--heritage-green)',
                  fontSize: '1rem',
                  fontFamily: 'var(--font-montserrat)',
                  lineHeight: 1.6,
                  resize: 'vertical',
                  minHeight: '150px',
                  transition: 'border-color 200ms ease, outline 200ms ease',
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#0B3A2F';
                  e.target.style.outline = '2px solid rgba(11, 58, 47, 0.15)';
                  e.target.style.outlineOffset = '2px';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(11, 58, 47, 0.65)';
                  e.target.style.outline = 'none';
                }}
              />
              {errors.suggestion && (
                <p
                  id="suggestion-error"
                  className="text-sm mt-2"
                  style={{ color: '#c53030' }}
                  role="alert"
                >
                  {errors.suggestion}
                </p>
              )}
            </div>

            {/* Status Message */}
            {statusMessage && (
              <FormStatus message={statusMessage} type="info" />
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!isFormValid}
              style={{
                width: '100%',
                padding: '1.25rem 2rem',
                backgroundColor: isFormValid ? 'var(--heritage-green)' : 'rgba(11, 58, 47, 0.5)',
                color: 'var(--ivory-archive)',
                border: 'none',
                fontSize: 'clamp(0.95rem, 1.1vw, 1.05rem)',
                fontWeight: 600,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                fontFamily: 'var(--font-montserrat)',
                cursor: isFormValid ? 'pointer' : 'not-allowed',
                transition: 'background-color 250ms ease, opacity 250ms ease',
                opacity: isFormValid ? 1 : 0.6,
              }}
              onMouseEnter={(e) => {
                if (isFormValid) {
                  e.currentTarget.style.backgroundColor = 'rgba(11, 58, 47, 0.9)';
                }
              }}
              onMouseLeave={(e) => {
                if (isFormValid) {
                  e.currentTarget.style.backgroundColor = 'var(--heritage-green)';
                }
              }}
            >
              {isSubmitting ? 'SUBMITTING...' : 'SUBMIT ENQUIRY'}
            </button>
          </form>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default function EnquirePage() {
  return (
    <Suspense fallback={
      <>
        <ProductPageHeader />
        <main style={{ paddingTop: 'clamp(3.5rem, 5vw, 4rem)', paddingBottom: 'clamp(4rem, 8vw, 8rem)', backgroundColor: 'var(--ivory-archive)', minHeight: '80svh' }}>
          <div style={{ width: 'min(100%, 56rem)', marginInline: 'auto', paddingInline: 'clamp(1.25rem, 5vw, 3rem)', paddingTop: 'clamp(4rem, 6vw, 6rem)', textAlign: 'center', color: 'var(--heritage-green)' }}>
            Loading...
          </div>
        </main>
        <Footer />
      </>
    }>
      <EnquireForm />
    </Suspense>
  );
}
