import { cn } from '@/utils/cn';

interface RatingBarProps {
  value: number;
  max?: number;
  onChange?: (value: number) => void;
  readOnly?: boolean;
  className?: string;
  ariaLabel?: string;
  variant?: 'default' | 'review';
}

const RatingBar = ({
  value,
  max = 5,
  onChange,
  readOnly = false,
  className,
  ariaLabel = '맛 점수',
  variant = 'default',
}: RatingBarProps) => {
  const bars = Array.from({ length: max }, (_, i) => i + 1);
  const isReview = variant === 'review';
  return (
    <div
      className={cn(
        'flex items-center gap-0.5 md:gap-1 w-full',
        isReview && 'gap-[2px]',
        className
      )}
      role="group"
      aria-label={ariaLabel}
    >
      {bars.map(score => {
        const isActive = score <= value;
        return (
          <button
            key={score}
            type="button"
            onClick={() => onChange?.(score)}
            disabled={readOnly}
            aria-label={`${score}점`}
            className={cn(
              'h-2.5 transition-all duration-100 first:rounded-l-full last:rounded-r-full',
              !readOnly ? 'flex-1' : variant === 'review' ? 'w-6' : 'flex-1',
              isActive
                ? !readOnly
                  ? 'bg-secondary-foreground'
                  : variant === 'review'
                    ? 'bg-muted-foreground'
                    : 'bg-secondary-foreground'
                : 'bg-secondary',
              !readOnly && 'cursor-pointer hover:opacity-80'
            )}
          />
        );
      })}
    </div>
  );
};

export default RatingBar;
