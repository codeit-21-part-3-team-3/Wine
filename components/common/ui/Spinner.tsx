import { cn } from '@/utils/cn';

type SpinnerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

const SIZE_MAP: Record<SpinnerSize, string> = {
  xs: 'h-3 w-3',
  sm: 'h-4 w-4',
  md: 'h-5 w-5',
  lg: 'h-6 w-6',
  xl: 'h-8 w-8',
};

interface SpinnerProps {
  size?: SpinnerSize;
  className?: string;
  label?: string;
}

export default function Spinner({ size = 'md', className, label = '로딩 중' }: SpinnerProps) {
  return (
    <span
      role="status"
      aria-label={label}
      className={cn('inline-flex items-center justify-center', className)}
    >
      <span
        className={cn(
          'rounded-full border-2 border-current border-t-transparent animate-spin',
          SIZE_MAP[size]
        )}
      />
      <span className="sr-only">{label}</span>
    </span>
  );
}
