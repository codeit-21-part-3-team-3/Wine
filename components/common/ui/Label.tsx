import { LabelHTMLAttributes, ReactNode } from 'react';

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  children: ReactNode;
}

const Label = ({ children, htmlFor, className, style, ...props }: LabelProps) => {
  return (
    <label
      htmlFor={htmlFor}
      {...props}
      className={className}
      style={{
        display: 'block',
        marginBottom: '5px',
        fontWeight: 'bold',
        textAlign: 'left',
        ...style,
      }}
    >
      {children}
    </label>
  );
};

export default Label;
