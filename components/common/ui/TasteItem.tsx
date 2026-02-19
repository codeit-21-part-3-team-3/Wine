import DashedHorizontalBarGraph from '@/components/common/ui/DashedBarGraph';
import { cn } from '@/utils/cn';

export type Taste = '바디감' | '탄닌' | '당도' | '산미';

export const TASTES: Taste[] = ['바디감', '탄닌', '당도', '산미'];

export const TASTE_LABEL_MAP: Record<Taste, { minLabel: string; maxLabel: string }> = {
  바디감: { minLabel: '가벼워요', maxLabel: '진해요' },
  탄닌: { minLabel: '부드러워요', maxLabel: '떫어요' },
  당도: { minLabel: '드라이해요', maxLabel: '달아요' },
  산미: { minLabel: '안셔요', maxLabel: '많이셔요' },
};

interface TasteItemProps {
  taste: Taste;
  value: number;
  onChange?: (value: number) => void;
  variant?: 'default' | 'review';
  showDivider?: boolean;
}

const TasteItem = ({
  taste,
  value,
  onChange,
  variant = 'default',
  showDivider = false,
}: TasteItemProps) => {
  const isInteractive = !!onChange;
  const isReview = variant === 'review';
  const { minLabel, maxLabel } = TASTE_LABEL_MAP[taste];

  const containerStyle = isInteractive
    ? 'max-md:flex-col max-md:items-center max-md:gap-2 flex-row items-center gap-5'
    : cn('flex-row items-center', isReview ? 'gap-5' : 'gap-4 md:gap-8');

  const titleStyle = cn(
    'relative flex items-center shrink-0 text-xs transition-all',
    isInteractive
      ? 'bg-transparent px-0 py-0 rounded-none text-foreground text-sm md:text-lg max-md:w-full max-md:justify-center max-md:text-center w-9 md:w-12 justify-start text-left'
      : 'w-12 h-6 md:h-8 bg-secondary text-muted-foreground rounded-xs px-2 justify-center',
    showDivider &&
      !isReview && [
        "after:content-[''] after:absolute after:w-px after:bg-border after:h-5 after:top-1/2 after:-translate-y-1/2 after:left-full",
        isInteractive ? 'after:ml-[3px] max-md:after:hidden' : 'after:ml-2 md:after:ml-4',
      ]
  );

  return (
    <div className={cn('flex w-full transition-all', containerStyle)}>
      <span className={titleStyle}>{taste}</span>

      <div
        className={cn(
          'flex items-center flex-1',
          isReview ? 'justify-start [&_.bg-secondary-foreground]:opacity-70' : 'w-full'
        )}
      >
        <DashedHorizontalBarGraph
          count={value}
          onClick={onChange}
          widthVariant={isReview ? 'compact' : 'full'}
          minLabel={minLabel}
          maxLabel={maxLabel}
        />
      </div>
    </div>
  );
};

export default TasteItem;
