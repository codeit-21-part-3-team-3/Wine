import DashedHorizontalBarGraph from '@/components/common/ui/DashedBarGraph';
import { cn } from '@/utils/cn';

export type TasteType = '바디감' | '타닌' | '당도' | '산미';

export const TASTE_ORDER: TasteType[] = ['바디감', '타닌', '당도', '산미'];

const DEFAULT_LABELS: Record<TasteType, { min: string; max: string }> = {
  바디감: { min: '가벼워요', max: '진해요' },
  타닌: { min: '부드러워요', max: '떫어요' },
  당도: { min: '드라이해요', max: '달아요' },
  산미: { min: '안셔요', max: '많이셔요' },
};

interface TasteItemProps {
  title: TasteType;
  value: number;
  onChange?: (value: number) => void;
  variant?: 'default' | 'review';
  showDivider?: boolean;
}

const TasteItem = ({
  title,
  value,
  onChange,
  variant = 'default',
  showDivider = false,
}: TasteItemProps) => {
  const isInteractive = !!onChange;
  const isReview = variant === 'review';

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
      <span className={titleStyle}>{title}</span>

      <div className={cn('flex items-center flex-1', isReview ? 'justify-start' : 'w-full')}>
        <DashedHorizontalBarGraph
          count={value}
          onClick={onChange}
          variant={variant}
          leftLabel={DEFAULT_LABELS[title].min}
          rightLabel={DEFAULT_LABELS[title].max}
        />
      </div>
    </div>
  );
};

export default TasteItem;
