import { cn } from '@/utils/cn';

interface RatingUnitProps {
  isActive: boolean;
  variant: 'default' | 'review';
  readOnly: boolean;
  isFirst: boolean;
  isLast: boolean;
}

interface RatingBarProps {
  value: number;
  max?: number;
  onChange?: (value: number) => void;
  readOnly?: boolean;
  className?: string;
  ariaLabel?: string;
  variant?: 'default' | 'review';
}

// RatingUnit

const RatingUnit = ({ isActive, variant, readOnly, isFirst, isLast }: RatingUnitProps) => {
  const isReview = variant === 'review';
  const isReadOnlyReview = readOnly && isReview;
  const barWidth = isReadOnlyReview ? 'w-6' : 'flex-1';
  const activeColor = isReadOnlyReview ? 'bg-muted-foreground' : 'bg-secondary-foreground';
  const barColor = isActive ? activeColor : 'bg-secondary';

  return (
    <div
      className={cn(
        'h-2.5 transition-all duration-100',
        isFirst && 'rounded-l-full',
        isLast && 'rounded-r-full',
        barWidth,
        barColor
      )}
    />
  );
};

// RatingBar

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

  return (
    <div
      className={cn(
        'flex items-center gap-0.5 md:gap-1 w-full',
        variant === 'review' && 'gap-[2px]',
        className
      )}
      role="group"
      aria-label={ariaLabel}
    >
      {bars.map((score, index) => (
        <button
          key={score}
          type="button"
          onClick={() => onChange?.(score)}
          disabled={readOnly}
          aria-label={`${score}점`}
          className={cn('contents', !readOnly && 'cursor-pointer')}
        >
          <RatingUnit
            isActive={score <= value}
            variant={variant}
            readOnly={readOnly}
            isFirst={index === 0}
            isLast={index === bars.length - 1}
          />
        </button>
      ))}
    </div>
  );
};

export default RatingBar;
