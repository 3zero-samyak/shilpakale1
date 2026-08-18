"use client";

import { useState, FormEvent, useRef, useEffect } from 'react';

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
        // Server will not yet return success until persistence configured
        setStatusMessage('Enquiry submission endpoint responded.');
      }
    } catch {
      setStatusMessage('Network error submitting enquiry.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {productTitle && (
        <div className="text-sm text-[var(--archive-sage)] italic">Regarding: {productTitle}</div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
        <div>
          <label htmlFor="firstName" className="block text-sm uppercase tracking-wider mb-2">First Name *</label>
          <input id="firstName" name="firstName" value={formValues.firstName} onChange={handleChange} />
          {errors.firstName && <div className="text-red-600">{errors.firstName}</div>}
        </div>
        <div>
          <label htmlFor="lastName" className="block text-sm uppercase tracking-wider mb-2">Last Name *</label>
          <input id="lastName" name="lastName" value={formValues.lastName} onChange={handleChange} />
          {errors.lastName && <div className="text-red-600">{errors.lastName}</div>}
        </div>
      </div>

      <div>
        <label className="block text-sm uppercase tracking-wider mb-2">Email</label>
        <input name="email" value={formValues.email} readOnly />
        <div className="text-xs opacity-70">Verified via Shopify</div>
      </div>

      <div>
        <label className="block text-sm uppercase tracking-wider mb-2">Mobile Number *</label>
        <input name="mobileNumber" value={formValues.mobileNumber} onChange={handleChange} />
        {errors.mobileNumber && <div className="text-red-600">{errors.mobileNumber}</div>}
      </div>

      <div>
        <label className="block text-sm uppercase tracking-wider mb-2">Enquiry *</label>
        <textarea name="suggestion" value={formValues.suggestion} onChange={handleChange} rows={6} />
        {errors.suggestion && <div className="text-red-600">{errors.suggestion}</div>}
      </div>

      <div>
        <button type="submit" disabled={isSubmitting} className="account-option-button">
          {isSubmitting ? 'Submitting…' : 'Submit Enquiry'}
        </button>
      </div>

      {statusMessage && <div className="mt-4 text-center">{statusMessage}</div>}
    </form>
  );
}
