'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';
import ProductPageHeader from '@/components/layout/ProductPageHeader';
import Footer from '@/components/layout/Footer';
import FormStatus from '@/components/forms/FormStatus';
import { submitForgotPasswordForm, type ForgotPasswordValues } from '@/lib/customer-session';

export default function ForgotPasswordPage() {
  const [formValues, setFormValues] = useState<ForgotPasswordValues>({
    email: '',
  });
  
  const [errors, setErrors] = useState<Partial<Record<keyof ForgotPasswordValues, string>>>({});
  const [statusMessage, setStatusMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    setStatusMessage('');

    // Validation
    const newErrors: Partial<Record<keyof ForgotPasswordValues, string>> = {};
    
    if (!formValues.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formValues.email)) {
      newErrors.email = 'Valid email is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      document.getElementById('email')?.focus();
      return;
    }

    // Submit form
    setIsSubmitting(true);
    try {
      const result = await submitForgotPasswordForm(formValues);
      setStatusMessage(result.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
    
    // Clear error for this field
    if (errors[name as keyof ForgotPasswordValues]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const isFormValid = formValues.email && !isSubmitting;

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
              letterSpacing: '-0.01em',
              marginBottom: 'clamp(1.5rem, 2.5vw, 2rem)',
            }}
          >
            FORGOT PASSWORD
          </h1>

          {/* Supporting Text */}
          <p
            style={{
              textAlign: 'center',
              color: 'var(--heritage-green)',
              opacity: 0.75,
              fontSize: 'clamp(0.95rem, 1.1vw, 1.05rem)',
              lineHeight: 1.6,
              fontFamily: 'var(--font-montserrat)',
              marginBottom: 'clamp(3rem, 5vw, 5rem)',
              maxWidth: '42rem',
              marginInline: 'auto',
            }}
          >
            Enter your email address and we will send you instructions to reset your password.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(1.5rem, 2.5vw, 2rem)' }}>
            {/* Email Field */}
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

            {/* Status Message */}
            {statusMessage && (
              <FormStatus message={statusMessage} type="info" />
            )}

            {/* Reset Password Button */}
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
              {isSubmitting ? 'SENDING...' : 'RESET PASSWORD'}
            </button>

            {/* Back to Sign In Link */}
            <div style={{ textAlign: 'center', marginTop: '1rem' }}>
              <Link
                href="/account/sign-in"
                style={{
                  color: 'var(--heritage-green)',
                  textDecoration: 'none',
                  fontFamily: 'var(--font-montserrat)',
                  fontSize: '0.95rem',
                  borderBottom: '1px solid transparent',
                  transition: 'border-color 200ms ease',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderBottomColor = 'var(--heritage-green)')}
                onMouseLeave={(e) => (e.currentTarget.style.borderBottomColor = 'transparent')}
              >
                Back to Sign In
              </Link>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </>
  );
}
