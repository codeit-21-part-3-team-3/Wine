import React, { forwardRef } from 'react';

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode;
}

const Label = forwardRef<HTMLLabelElement, LabelProps>(
  ({ children, htmlFor, className, style, ...props }, ref) => {
    return (
      <label
        ref={ref}
        htmlFor={htmlFor}
        className={className}
        style={{
          display: 'block',
          marginBottom: '5px',
          fontWeight: 'bold',
          textAlign: 'left',
          ...style,
        }}
        {...props}
      >
        {children}
      </label>
    );
  }
);

Label.displayName = 'Label';

export default Label;
