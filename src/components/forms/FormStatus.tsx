interface FormStatusProps {
  message: string;
  type?: 'info' | 'success' | 'error';
}

export default function FormStatus({ message, type = 'info' }: FormStatusProps) {
  const getStyles = () => {
    switch (type) {
      case 'success':
        return {
          backgroundColor: 'rgba(72, 187, 120, 0.1)',
          borderColor: 'rgba(72, 187, 120, 0.3)',
          color: '#2f855a',
        };
      case 'error':
        return {
          backgroundColor: 'rgba(197, 48, 48, 0.1)',
          borderColor: 'rgba(197, 48, 48, 0.3)',
          color: '#c53030',
        };
      default:
        return {
          backgroundColor: 'rgba(11, 58, 47, 0.06)',
          borderColor: 'rgba(11, 58, 47, 0.2)',
          color: 'var(--heritage-green)',
        };
    }
  };

  const styles = getStyles();

  return (
    <div
      role={type === 'error' ? 'alert' : 'status'}
      aria-live="polite"
      style={{
        padding: '1rem 1.25rem',
        border: '1px solid',
        borderRadius: '0.25rem',
        fontSize: '0.95rem',
        lineHeight: 1.6,
        fontFamily: 'var(--font-montserrat)',
        ...styles,
      }}
    >
      {message}
    </div>
  );
}
