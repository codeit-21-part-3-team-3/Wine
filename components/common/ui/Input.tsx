import { ComponentPropsWithRef, ReactNode } from 'react';
import Image from 'next/image';
import { cn } from '@/utils/cn';
import iconInputError from '@/assets/icon/icon-input-error.svg';

interface InputProps extends Omit<ComponentPropsWithRef<'input'>, 'type'> {
  type?: 'text' | 'password';
  error?: boolean;
  addonBefore?: ReactNode;
}

const Input = ({ className, type = 'text', error, addonBefore, ref, ...props }: InputProps) => {
  return (
    <div
      className={cn(
        'relative flex items-center w-full h-[48px] px-4 border transition-all bg-background',
        'rounded-[8px]',
        error ? 'border-destructive' : 'border-input',
        className
      )}
    >
      {/* 좌측 Addon */}
      {addonBefore && (
        <div className="mr-3 flex items-center text-muted-foreground pointer-events-none">
          {addonBefore}
        </div>
      )}

      {/* Input */}
      <input
        ref={ref}
        type={type}
        className="
          flex-1 w-full h-full bg-transparent border-none 
          outline-none focus:outline-none focus:ring-0 
          text-base text-foreground placeholder:text-muted-foreground
        "
        {...props}
      />

      {/* 우측 에러 아이콘 */}
      {error && (
        <div className="ml-3 flex items-center pointer-events-none">
          <Image src={iconInputError} alt="Input Error" width={20} height={20} />
        </div>
      )}
    </div>
  );
};

export default Input;
