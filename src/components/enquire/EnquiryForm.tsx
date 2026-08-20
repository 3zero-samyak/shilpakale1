"use client";

import { useState, FormEvent, useRef, useEffect } from 'react';
import styles from './EnquiryForm.module.css';
import Link from 'next/link';

export type EnquiryFormProps = {
  productHandle?: string | null;
  productTitle?: string | null;
  authenticated?: boolean;
  customer?: { firstName?: string; lastName?: string; email?: string } | null;
};

export default function EnquiryForm({ productHandle, productTitle, authenticated = false, customer = null }: EnquiryFormProps) {
  const initializedRef = useRef(false);

  const initialSource = productHandle ? `product:${productHandle}` : '';

  const [formValues, setFormValues] = useState({
    firstName: customer?.firstName ?? '',
    lastName: customer?.lastName ?? '',
    email: customer?.email ?? '',
    mobileNumber: '',
    suggestion: '',
    source: initialSource,
  });

  useEffect(() => {
    if (!initializedRef.current && initialSource) {
      setFormValues(prev => ({ ...prev, source: initialSource }));
      initializedRef.current = true;
    }
  }, [initialSource]);

  const [errors, setErrors] = useState<Record<string,string>>({});
  const [statusMessage, setStatusMessage] = useState('');
  const [submittedReference, setSubmittedReference] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormValues(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrors({});
    setStatusMessage('');

    const newErrors: Record<string,string> = {};
    if (!formValues.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formValues.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!authenticated && (!formValues.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formValues.email))) newErrors.email = 'Valid email is required';
    if (!formValues.mobileNumber.trim()) newErrors.mobileNumber = 'Mobile number is required';
    if (!formValues.suggestion.trim() || formValues.suggestion.trim().length < 10) newErrors.suggestion = 'Please provide at least 10 characters';

    if (Object.keys(newErrors).length) { setErrors(newErrors); return; }

    setIsSubmitting(true);
    try {
      const payload = {
        firstName: formValues.firstName.trim(),
        lastName: formValues.lastName.trim(),
        mobileNumber: formValues.mobileNumber.trim(),
        suggestion: formValues.suggestion.trim(),
        productHandle: productHandle || undefined,
        source: formValues.source || undefined,
      };

      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      if (!res.ok) {
        if (json?.error === 'ENQUIRY_STORAGE_NOT_CONFIGURED') {
          setStatusMessage('Enquiry service not yet configured. Please try again later.');
        } else if (res.status === 401) {
          setStatusMessage('You must be signed in to submit an enquiry. Please sign in and try again.');
        } else if (res.status === 400) {
          setStatusMessage(json?.message || 'Invalid enquiry details');
        } else {
          setStatusMessage('An unexpected error occurred. Please try again later.');
        }
      } else {
        if (json?.ok && json?.enquiryReference) {
          setSubmittedReference(json.enquiryReference);
          setStatusMessage('');
        } else {
          setStatusMessage('Enquiry submission endpoint responded.');
        }
      }
    } catch {
      setStatusMessage('Network error submitting enquiry.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate className={styles.form}>
      {submittedReference ? (
        <div className={styles.status}>
          <h3 style={{ fontFamily: 'Georgia, serif', fontSize: '1.25rem', marginBottom: '12px' }}>ENQUIRY RECEIVED</h3>
          <p style={{ marginBottom: '12px' }}>Your enquiry has been recorded. Our team will review it and respond using your verified contact details.</p>
          <p style={{ marginBottom: '18px' }}>Reference<br /><strong style={{ letterSpacing: '0.08em' }}>{submittedReference}</strong></p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
            {productHandle ? (
              <Link href={`/products/${encodeURIComponent(productHandle)}`} className="account-option-button">RETURN TO PRODUCT</Link>
            ) : (
              <Link href="/" className="account-option-button">RETURN HOME</Link>
            )}
          </div>
        </div>
      ) : (
        <>
      {productTitle && (
        <div className="text-sm text-[var(--archive-sage)] italic" style={{ marginBottom: '24px' }}>Regarding: {productTitle}</div>
      )}

      <div className={styles.twoColumn}>
        <div className={styles.fieldGroup}>
          <label htmlFor="firstName" className={styles.label}>First Name *</label>
          <input
            id="firstName"
            name="firstName"
            value={formValues.firstName}
            onChange={handleChange}
            className={styles.field}
            type="text"
            autoComplete="given-name"
          />
          {errors.firstName && <div className={styles.error}>{errors.firstName}</div>}
        </div>
        <div className={styles.fieldGroup}>
          <label htmlFor="lastName" className={styles.label}>Last Name *</label>
          <input
            id="lastName"
            name="lastName"
            value={formValues.lastName}
            onChange={handleChange}
            className={styles.field}
            type="text"
            autoComplete="family-name"
          />
          {errors.lastName && <div className={styles.error}>{errors.lastName}</div>}
        </div>
      </div>

      <div className={styles.fieldGroup}>
        <label htmlFor="email" className={styles.label}>Email</label>
        <input
          id="email"
          name="email"
          value={formValues.email}
          readOnly
          className={`${styles.field} cursor-not-allowed`}
          aria-readonly
          autoComplete="email"
          type="email"
        />
        <div className={styles.helper}>Verified via Shopify</div>
      </div>

      <div className={styles.fieldGroup}>
        <label htmlFor="mobileNumber" className={styles.label}>Mobile Number *</label>
        <input
          id="mobileNumber"
          name="mobileNumber"
          value={formValues.mobileNumber}
          onChange={handleChange}
          className={styles.field}
          type="tel"
          autoComplete="tel"
        />
        {errors.mobileNumber && <div className={styles.error}>{errors.mobileNumber}</div>}
      </div>

      <div className={styles.fieldGroup}>
        <label htmlFor="suggestion" className={styles.label}>Enquiry *</label>
        <textarea
          id="suggestion"
          name="suggestion"
          value={formValues.suggestion}
          onChange={handleChange}
          rows={6}
          className={`${styles.field} ${styles.textarea}`}
        />
        {errors.suggestion && <div className={styles.error}>{errors.suggestion}</div>}
      </div>

      <div className={styles.submitWrapper}>
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-block rounded-md px-6 py-3 text-sm font-semibold transition-shadow w-full"
          style={{
            background: 'var(--heritage-green)',
            color: 'var(--ivory-archive)',
            boxShadow: '0 6px 18px rgba(11,58,47,0.04)'
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 10px 30px rgba(11,58,47,0.08)'; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 6px 18px rgba(11,58,47,0.04)'; }}
        >
          {isSubmitting ? 'Submitting…' : 'Submit Enquiry'}
        </button>
      </div>

      {statusMessage && <div className={styles.status}>{statusMessage}</div>}
        </>
      )}
    </form>
  );
}
