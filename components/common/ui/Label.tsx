import { ComponentPropsWithRef, ReactNode } from 'react';
import { cn } from '@/utils/cn';

interface LabelProps extends ComponentPropsWithRef<'label'> {
  children: ReactNode;
}

const Label = ({ children, className, ref, ...props }: LabelProps) => {
  return (
    <label
      ref={ref}
      className={cn(
        'block mb-2 text-sm font-bold text-left text-foreground cursor-pointer',
        className
      )}
      {...props}
    >
      {children}
    </label>
  );
};

export default Label;
