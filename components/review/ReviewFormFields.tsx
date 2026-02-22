import { getFilledStars } from '@/utils/rating';
import { AROMA_META, AromaType } from '@/constants/aromaMap';
import TasteItem, { TASTES, Taste } from '../common/ui/TasteItem';
import Chip from '../common/ui/chip';

export function StarRatingField({
  rating,
  onRatingChange,
}: {
  rating: number;
  onRatingChange: (r: number) => void;
}) {
  const stars = getFilledStars(rating);
  return (
    <div className="flex items-center gap-4 mb-3">
      <span className="text-muted-foreground text-sm">별점 선택</span>
      <div className="flex gap-1 text-xl">
        {stars.map((filled, i) => (
          <span
            key={i}
            onClick={() => onRatingChange(i + 1)}
            className="cursor-pointer text-2xl text-primary hover:scale-110 transition-transform inline-block"
          >
            {filled ? '★' : '☆'}
          </span>
        ))}
      </div>
    </div>
  );
}

export function TasteSection({
  tasteForm,
  onUpdate,
}: {
  tasteForm: Record<Taste, number>;
  onUpdate: (taste: Taste, val: number) => void;
}) {
  return (
    <div className="flex flex-col gap-4 mb-10">
      <span className="mb-3 text-xl font-semibold">와인의 맛은 어땠나요?</span>
      {TASTES.map(taste => (
        <TasteItem
          key={taste}
          taste={taste}
          value={tasteForm[taste]}
          onChange={val => onUpdate(taste, val)}
          showDivider
        />
      ))}
    </div>
  );
}

export function AromaSelectField({
  selectedAromas,
  onToggle,
}: {
  selectedAromas: AromaType[];
  onToggle: (key: AromaType) => void;
}) {
  const aromaKeys = Object.keys(AROMA_META) as AromaType[];

  return (
    <div className="flex flex-col gap-2 mb-7.5">
      <span className="mb-3 text-xl font-semibold">기억에 남는 향이 있나요?</span>
      <div className="flex flex-wrap py-2.5">
        {aromaKeys.map(key => (
          <Chip
            key={key}
            label={AROMA_META[key].label}
            selected={selectedAromas.includes(key)}
            onClick={() => onToggle(key)}
          />
        ))}
      </div>
    </div>
  );
}
