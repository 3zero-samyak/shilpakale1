'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';
import ProductPageHeader from '@/components/layout/ProductPageHeader';
import Footer from '@/components/layout/Footer';
import PasswordField from '@/components/account/PasswordField';
import FormStatus from '@/components/forms/FormStatus';
import { submitSignInForm, type SignInValues } from '@/lib/customer-session';

export default function SignInPage() {
  const [formValues, setFormValues] = useState<SignInValues>({
    email: '',
    password: '',
    agreeToTerms: false,
  });
  
  const [errors, setErrors] = useState<Partial<Record<keyof SignInValues, string>>>({});
  const [statusMessage, setStatusMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    setStatusMessage('');

    // Basic validation
    const newErrors: Partial<Record<keyof SignInValues, string>> = {};
    
    if (!formValues.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formValues.email)) {
      newErrors.email = 'Valid email is required';
    }
    if (!formValues.password.trim()) {
      newErrors.password = 'Password is required';
    }
    if (!formValues.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the Terms and Conditions';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      // Focus first invalid field
      const firstErrorField = Object.keys(newErrors)[0] as keyof SignInValues;
      if (firstErrorField !== 'agreeToTerms') {
        document.getElementById(firstErrorField)?.focus();
      }
      return;
    }

    // Submit form
    setIsSubmitting(true);
    try {
      const result = await submitSignInForm(formValues);
      setStatusMessage(result.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;
    
    setFormValues((prev) => ({ ...prev, [name]: fieldValue }));
    
    // Clear error for this field
    if (errors[name as keyof SignInValues]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const isFormValid = formValues.email && formValues.password && formValues.agreeToTerms && !isSubmitting;

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
              marginBottom: 'clamp(3rem, 5vw, 5rem)',
            }}
          >
            SIGN IN
          </h1>

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

            {/* Password Field */}
            <PasswordField
              id="password"
              name="password"
              label="Password"
              value={formValues.password}
              onChange={handleChange}
              required
              autoComplete="current-password"
              error={errors.password}
            />

            {/* Forgot Password and Back to Store Row */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '1rem',
                flexWrap: 'wrap',
                fontSize: 'clamp(0.9rem, 1vw, 0.95rem)',
              }}
            >
              <Link
                href="/account/forgot-password"
                style={{
                  color: 'var(--heritage-green)',
                  textDecoration: 'none',
                  fontFamily: 'var(--font-montserrat)',
                  borderBottom: '1px solid transparent',
                  transition: 'border-color 200ms ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderBottomColor = 'var(--heritage-green)')}
                onMouseLeave={(e) => (e.currentTarget.style.borderBottomColor = 'transparent')}
              >
                Forgot your password?
              </Link>
              <Link
                href="/"
                style={{
                  color: 'var(--heritage-green)',
                  textDecoration: 'none',
                  fontFamily: 'var(--font-montserrat)',
                  borderBottom: '1px solid transparent',
                  transition: 'border-color 200ms ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderBottomColor = 'var(--heritage-green)')}
                onMouseLeave={(e) => (e.currentTarget.style.borderBottomColor = 'transparent')}
              >
                Back to store
              </Link>
            </div>

            {/* Terms Checkbox */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
              <input
                type="checkbox"
                id="agreeToTerms"
                name="agreeToTerms"
                checked={formValues.agreeToTerms}
                onChange={handleChange}
                required
                aria-invalid={!!errors.agreeToTerms}
                aria-describedby={errors.agreeToTerms ? 'agreeToTerms-error' : undefined}
                style={{
                  marginTop: '0.25rem',
                  width: '1.25rem',
                  height: '1.25rem',
                  cursor: 'pointer',
                  accentColor: 'var(--heritage-green)',
                }}
              />
              <label
                htmlFor="agreeToTerms"
                style={{
                  color: 'var(--heritage-green)',
                  fontSize: '0.95rem',
                  lineHeight: 1.5,
                  fontFamily: 'var(--font-montserrat)',
                  cursor: 'pointer',
                }}
              >
                I agree with{' '}
                <Link
                  href="/terms"
                  style={{
                    color: 'var(--heritage-green)',
                    textDecoration: 'underline',
                  }}
                >
                  Terms and Conditions
                </Link>
              </label>
            </div>
            {errors.agreeToTerms && (
              <p
                id="agreeToTerms-error"
                className="text-sm"
                style={{ color: '#c53030', marginTop: '-1rem' }}
                role="alert"
              >
                {errors.agreeToTerms}
              </p>
            )}

            {/* Status Message */}
            {statusMessage && (
              <FormStatus message={statusMessage} type="info" />
            )}

            {/* Sign In Button */}
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
              {isSubmitting ? 'SIGNING IN...' : 'SIGN IN'}
            </button>

            {/* Create Account Button */}
            <Link
              href="/account/create-account"
              style={{
                display: 'block',
                width: '100%',
                padding: '1.25rem 2rem',
                backgroundColor: 'var(--ivory-archive)',
                color: 'var(--heritage-green)',
                border: '1px solid var(--heritage-green)',
                fontSize: 'clamp(0.95rem, 1.1vw, 1.05rem)',
                fontWeight: 600,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                fontFamily: 'var(--font-montserrat)',
                textAlign: 'center',
                textDecoration: 'none',
                cursor: 'pointer',
                transition: 'background-color 250ms ease, color 250ms ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--heritage-green)';
                e.currentTarget.style.color = 'var(--ivory-archive)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--ivory-archive)';
                e.currentTarget.style.color = 'var(--heritage-green)';
              }}
            >
              CREATE ACCOUNT
            </Link>
          </form>
        </div>
      </main>

      <Footer />
    </>
  );
}
