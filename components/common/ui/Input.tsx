import { ComponentPropsWithRef } from 'react';
import { cn } from '@/utils/cn';
interface InputProps extends Omit<ComponentPropsWithRef<'input'>, 'type'> {
  type?: 'text' | 'password';
  error?: boolean;
}

const Input = ({ className, type = 'text', error, ref, ...props }: InputProps) => {
  return (
    <input
      ref={ref}
      type={type}
      className={cn(
        'w-full h-12 px-4 py-3 rounded text-base',
        'bg-background text-foreground',
        'border border-input',
        'outline-none transition-colors',
        error && 'border-destructive',
        className
      )}
      {...props}
    />
  );
};

export default Input;
