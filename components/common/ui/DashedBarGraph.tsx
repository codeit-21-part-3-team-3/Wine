import { cn } from '@/utils/cn';

type BarWidthVariant = 'full' | 'compact';

interface DashedBarGraphProps {
  minLabel?: string;
  maxLabel: string;
  count: number;
  onClick?: (count: number) => void;
  widthVariant?: BarWidthVariant;
}

const MAX_SCORE = 5;

function getFirstOrLastBarStyle(index: number) {
  if (index === 0) return 'rounded-l-full';
  if (index === MAX_SCORE - 1) return 'rounded-r-full';
  return '';
}

const DashedBarGraph = ({
  minLabel,
  maxLabel,
  count,
  onClick,
  widthVariant = 'full',
}: DashedBarGraphProps) => {
  const isReadOnly = !onClick;
  const isCompact = widthVariant === 'compact';
  const bars = Array.from({ length: MAX_SCORE }, (_, i) => i + 1);

  const BAR_WIDTH_STYLE = {
    full: 'flex-1',
    compact: 'flex-1 md:w-6 md:flex-none',
  };

  return (
    <div className={cn('flex items-center w-full', isCompact ? 'gap-3' : 'gap-1')}>
      {!isReadOnly && minLabel && (
        <span className="text-sm w-16 text-left shrink-0 text-foreground/50">{minLabel}</span>
      )}

      <div className={cn('flex items-center gap-1 flex-1')}>
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
                  BAR_WIDTH_STYLE[widthVariant],
                  getFirstOrLastBarStyle(index),
                  isActive ? 'bg-secondary-foreground' : 'bg-secondary',
                  !isReadOnly && 'hover:opacity-80'
                )}
              />
            </button>
          );
        })}
      </div>
      <span className="text-sm w-16 text-right shrink-0 text-foreground/50">{maxLabel}</span>
    </div>
  );
};

export default DashedBarGraph;
