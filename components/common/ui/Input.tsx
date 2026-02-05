import Image from 'next/image';
import ErrorIcon from '@/assets/icon/icon-input-error.svg';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string;
}

const Input = ({ id, errorMessage, className, style, ...props }: InputProps) => {
  const borderColor = errorMessage ? '#FF6B6B' : '#D1D1D1';

  return (
    <div className={className} style={{ width: '100%', textAlign: 'left' }}>
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        <input
          id={id}
          {...props}
          style={{
            width: '100%',
            height: '48px',
            padding: '12px 44px 12px 16px',
            borderRadius: '4px',
            border: `1px solid ${borderColor}`,
            boxSizing: 'border-box',
            outline: 'none',
            fontSize: '16px',
            ...style,
          }}
        />

        {errorMessage && (
          <div
            style={{
              position: 'absolute',
              right: '16px',
              display: 'flex',
              alignItems: 'center',
              pointerEvents: 'none',
            }}
          >
            <Image src={ErrorIcon} alt="" width={24} height={24} aria-hidden="true" />
          </div>
        )}
      </div>

      {errorMessage && (
        <p style={{ color: '#FF4242', fontSize: '12px', marginTop: '4px' }}>{errorMessage}</p>
      )}
    </div>
  );
};

export default Input;
