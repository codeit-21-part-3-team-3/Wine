import { AROMA_META } from '@/constants/aromaMap';
import { getFilledStars } from '@/utils/rating';
import TasteItem, { TASTES } from '../common/ui/TasteItem';
import Chip from '../common/ui/chip';
import Button from '../common/ui/Button';
import { mockWineData } from '@/mock/wine.mock';
import Image from 'next/image';

type Mode = 'create' | 'edit';

interface ReviewFormProps {
  mode: Mode;
}

export default function RevieewForm({ mode }: ReviewFormProps) {
  const isEdit = mode === 'edit';
  const wine = mockWineData.list[0];
  const stars = getFilledStars(3);
  const aromaLabels = Object.values(AROMA_META).map(v => v.label);

  return (
    <div className="flex flex-col gap-2 mt-3">
      <div className="flex items-center gap-4">
        <div className="relative w-16 h-24 shrink-0">
          <Image src={wine.image} alt={wine.name} fill className="object-contain" />
        </div>
        <div className="flex flex-col">
          <span className="font-semibold text-lg">{wine.name}</span>
          <span className="text-muted-foreground text-sm">{wine.region}</span>
        </div>
      </div>
      <div className="border-b border-border mb-3" />
      <div className="flex items-center gap-4 mb-3">
        <span className="text-muted-foreground text-sm">별점 선택</span>
        <div className="flex gap-1 text-xl">
          {stars.map((filled, i) => (
            <span key={`star-${i}`}>{filled ? '★' : '☆'}</span>
          ))}
        </div>
      </div>

      <div className="flex flex-col mb-10">
        <textarea
          className="border border-input px-4 py-3 min-h-30 outline-none"
          placeholder="후기를 작성해주세요"
        />
      </div>

      <div className="flex flex-col gap-4 mb-10">
        <span className="mb-3 text-xl font-semibold">와인의 맛은 어땠나요?</span>
        {TASTES.map(taste => (
          <TasteItem variant="default" key={taste} taste={taste} value={3} />
        ))}
      </div>

      <div className="flex flex-col gap-2 mb-7.5">
        <span className="mb-3 text-xl font-semibold">기억에 남는 향이 있나요?</span>
        <div className="flex flex-wrap py-2.5">
          {aromaLabels.map(label => (
            <Chip key={label} label={label} />
          ))}
        </div>
      </div>
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-16 bg-linear-to-t from-white to-transparent" />

      <Button>{isEdit ? '리뷰 수정하기' : '리뷰 남기기'}</Button>
    </div>
  );
}
