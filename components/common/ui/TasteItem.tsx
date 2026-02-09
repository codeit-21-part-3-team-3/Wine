import { cn } from '@/utils/cn';
import RatingBar from './RatingBar';

type TasteType = '바디감' | '타닌' | '당도' | '산미';

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
  readOnly?: boolean;
  minLabel?: string;
  maxLabel?: string;
  showDivider?: boolean;
  variant?: 'default' | 'review';
}

const TasteItem = ({
  title,
  value,
  onChange,
  readOnly = false,
  minLabel,
  maxLabel,
  showDivider = false,
  variant = 'default',
}: TasteItemProps) => {
  const isFormMode = !readOnly;
  const isReview = variant === 'review';
  const displayMinLabel = minLabel || DEFAULT_LABELS[title].min;
  const displayMaxLabel = maxLabel || DEFAULT_LABELS[title].max;
  return (
    <div
      className={cn(
        'flex w-full transition-all',
        isFormMode
          ? 'max-md:flex-col max-md:items-center max-md:gap-2 flex-row items-center gap-5'
          : ['flex-row items-center', isReview ? 'gap-5' : showDivider ? 'gap-4 md:gap-8' : 'gap-4']
      )}
    >
      <span
        className={cn(
          'w-12 shrink-0 flex justify-center items-center relative',
          'text-xs',
          'rounded-xs px-2 py-1 md:py-2',
          'bg-secondary',
          'text-muted-foreground',

          isFormMode && [
            'bg-transparent px-0 py-0 rounded-none font-bold text-foreground text-sm md:text-lg',
            'max-md:w-full max-md:justify-center max-md:text-center',
            'w-9 md:w-12 justify-start text-left',
          ],

          showDivider &&
            !isReview && [
              "after:content-[''] after:absolute after:w-px after:bg-border after:h-5 after:top-1/2 after:-translate-y-1/2 after:left-full",
              isFormMode ? 'after:ml-[3px] max-md:after:hidden' : 'after:ml-2 md:after:ml-4',
            ]
        )}
      >
        {title}
      </span>

      <div
        className={cn(
          'flex items-center flex-1',
          isFormMode ? 'gap-1' : 'gap-3',
          isReview ? 'justify-start' : 'w-full'
        )}
      >
        {isFormMode && displayMinLabel && (
          <span className={cn('text-sm w-16 text-left shrink-0', 'text-foreground/50')}>
            {displayMinLabel}
          </span>
        )}
        <div className={cn(isReview ? 'flex-none' : 'flex-1')}>
          <RatingBar
            value={value}
            onChange={onChange}
            readOnly={readOnly}
            ariaLabel={title}
            variant={variant}
          />
        </div>
        {displayMaxLabel && (
          <span
            className={cn(
              'text-sm w-16 text-right shrink-0',
              isFormMode ? 'text-foreground/50' : 'text-muted-foreground'
            )}
          >
            {displayMaxLabel}
          </span>
        )}
      </div>
    </div>
  );
};

export default TasteItem;
