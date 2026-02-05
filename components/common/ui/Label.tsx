import { LabelHTMLAttributes, ReactNode } from 'react';

const Label = ({
  children,
  htmlFor,
  className,
  ...props
}: LabelHTMLAttributes<HTMLLabelElement> & { children: ReactNode }) => {
  return (
    <label
      htmlFor={htmlFor}
      {...props}
      className={`block mb-[5px] font-bold text-left text-[14px] ${className || ''}`}
    >
      {children}
    </label>
  );
};

export default Label;
