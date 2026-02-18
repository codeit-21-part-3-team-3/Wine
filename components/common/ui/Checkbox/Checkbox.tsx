import { useId } from 'react';
import type { ReactNode, Dispatch, SetStateAction, InputHTMLAttributes } from 'react';
import { cn } from '@/utils/cn';

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  checked?: boolean;
  onCheckedChange?: Dispatch<SetStateAction<boolean>>;
  children?: ReactNode;
  className?: string;
}

function Checkbox({
  checked = false,
  onCheckedChange,
  children,
  className,
  id,
  disabled,
  ...props
}: CheckboxProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  return (
    <label
      htmlFor={inputId}
      className={cn(
        'flex items-center gap-2.5 cursor-pointer group select-none',
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
    >
      <input
        type="checkbox"
        id={inputId}
        checked={checked}
        disabled={disabled}
        className="sr-only"
        onChange={e => onCheckedChange?.(e.target.checked)}
        {...props}
      />

      <div
        className={cn(
          'w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200',
          'group-active:scale-95', // 클릭 시 쫀득한 반응성
          checked
            ? 'bg-primary border-primary shadow-sm'
            : 'bg-white border-gray-300 group-hover:border-gray-400'
        )}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="3.5"
          className={cn(
            'w-3.5 h-3.5 transition-transform duration-200 ease-in-out',
            checked ? 'scale-100' : 'scale-0'
          )}
        >
          <path d="M20 6L9 17L4 12" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {children && (
        <span className="text-sm font-medium text-slate-700 leading-none">{children}</span>
      )}
    </label>
  );
}

export { Checkbox };
