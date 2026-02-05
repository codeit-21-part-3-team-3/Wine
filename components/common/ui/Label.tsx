import { ComponentPropsWithRef, ReactNode } from 'react';

interface LabelProps extends ComponentPropsWithRef<'label'> {
  children: ReactNode;
}

const Label = ({ children, className, ...props }: LabelProps) => {
  return (
    <label
      className={`
        block mb-2 font-bold text-left text-sm text-foreground cursor-pointer
        ${className || ''}
      `}
      {...props}
    >
      {children}
    </label>
  );
};

export default Label;
