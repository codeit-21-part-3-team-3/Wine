import { cn } from '@/utils/cn';

interface DashedBarGraphProps {
  leftLabel?: string;
  rightLabel: string;
  count: number;
  onClick?: (count: number) => void;
  variant?: 'default' | 'review';
}

const MAX_SCORE = 5;

const DashedBarGraph = ({
  leftLabel,
  rightLabel,
  count,
  onClick,
  variant = 'default',
}: DashedBarGraphProps) => {
  const isReadOnly = !onClick;
  const isReview = variant === 'review';
  const bars = Array.from({ length: MAX_SCORE }, (_, i) => i + 1);

  return (
    <div className={cn('flex items-center w-full', isReview ? 'gap-3' : 'gap-1')}>
      {!isReadOnly && leftLabel && (
        <span className="text-sm w-16 text-left shrink-0 text-foreground/50">{leftLabel}</span>
      )}

      <div className={cn('flex items-center gap-1', isReview ? 'flex-none' : 'flex-1')}>
        {bars.map((score, index) => {
          const isActive = score <= count;
          return (
            <button
              key={score}
              type="button"
              disabled={isReadOnly}
              onClick={() => onClick?.(score)}
              className={cn('contents', !isReadOnly && 'cursor-pointer')}
            >
              <div
                className={cn(
                  'h-2.5 transition-all duration-100',
                  isReview ? 'w-6' : 'flex-1',
                  index === 0 && 'rounded-l-full',
                  index === MAX_SCORE - 1 && 'rounded-r-full',
                  isActive ? 'bg-secondary-foreground' : 'bg-secondary',
                  !isReadOnly && 'hover:opacity-80'
                )}
              />
            </button>
          );
        })}
      </div>
      <span className="text-sm w-16 text-right shrink-0 text-foreground/50">{rightLabel}</span>
    </div>
  );
};

export default DashedBarGraph;
