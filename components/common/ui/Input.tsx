import { ComponentPropsWithRef, ReactNode, ChangeEvent } from 'react';
import { cn } from '@/utils/cn';
import Image from 'next/image';
import iconInputError from '@/assets/icon/icon-input-error.svg';

interface InputProps extends Omit<ComponentPropsWithRef<'input'>, 'type' | 'onChange' | 'prefix'> {
  type?: 'text' | 'password';
  status?: 'default' | 'error';
  prefix?: ReactNode;
  suffix?: ReactNode;
  onChange?: (value: string) => void;
}

const Input = ({
  className,
  type = 'text',
  status = 'default',
  prefix,
  suffix,
  onChange,
  ref,
  ...props
}: InputProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };

  const suffixContent =
    suffix ??
    (status === 'error' ? (
      <Image src={iconInputError} alt="입력 에러" width={16} height={16} />
    ) : null);

  return (
    <div className="relative w-full">
      {prefix && (
        <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">{prefix}</div>
      )}

      <input
        ref={ref}
        type={type}
        onChange={handleChange}
        aria-invalid={status === 'error' ? 'true' : 'false'}
        className={cn(
          'w-full h-11 rounded border transition-colors outline-none text-sm',
          'bg-background text-foreground border-input placeholder:text-muted-foreground',
          status === 'error' ? 'border-destructive' : 'border-input',
          prefix ? 'pl-10' : 'pl-4',
          suffixContent ? 'pr-11' : 'pr-4',
          className
        )}
        {...props}
      />

      {suffixContent && (
        <div
          className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
          aria-hidden="true"
        >
          {suffixContent}
        </div>
      )}
    </div>
  );
};

export default Input;
