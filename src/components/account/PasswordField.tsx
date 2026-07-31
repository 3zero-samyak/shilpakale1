'use client';

import { useState } from 'react';

interface PasswordFieldProps {
  id: string;
  name: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  autoComplete?: string;
  error?: string;
  placeholder?: string;
}

export default function PasswordField({
  id,
  name,
  label,
  value,
  onChange,
  required = false,
  autoComplete = 'current-password',
  error,
  placeholder,
}: PasswordFieldProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm uppercase tracking-wider mb-2"
        style={{
          color: 'var(--heritage-green)',
          letterSpacing: '0.1em',
          fontFamily: 'var(--font-montserrat)',
          fontWeight: 500,
        }}
      >
        {label} {required && '*'}
      </label>
      <div style={{ position: 'relative' }}>
        <input
          type={showPassword ? 'text' : 'password'}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          autoComplete={autoComplete}
          placeholder={placeholder}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          style={{
            width: '100%',
            padding: '1.25rem 3.5rem 1.25rem 1rem',
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
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          aria-label={showPassword ? 'Hide password' : 'Show password'}
          style={{
            position: 'absolute',
            right: '1rem',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'none',
            border: 'none',
            color: 'var(--heritage-green)',
            opacity: 0.6,
            cursor: 'pointer',
            fontSize: '0.85rem',
            fontFamily: 'var(--font-montserrat)',
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            padding: '0.25rem 0.5rem',
            transition: 'opacity 200ms ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.6')}
        >
          {showPassword ? 'Hide' : 'Show'}
        </button>
      </div>
      {error && (
        <p
          id={`${id}-error`}
          className="text-sm mt-2"
          style={{ color: '#c53030' }}
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
}
