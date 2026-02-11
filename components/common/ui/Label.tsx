import { ComponentPropsWithRef } from 'react';
import { cn } from '@/utils/cn';

type LabelProps = ComponentPropsWithRef<'label'>;

const Label = ({ children, className, ref, ...props }: LabelProps) => {
  return (
    <label
      ref={ref}
      className={cn('text-sm font-medium text-foreground cursor-pointer', className)}
      {...props}
    >
      {children}
    </label>
  );
};

export default Label;
