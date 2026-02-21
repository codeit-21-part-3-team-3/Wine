import { useState } from 'react';
import { AROMA_META, AromaType } from '@/constants/aromaMap';
import { getFilledStars } from '@/utils/rating';
import TasteItem, { TASTES } from '../common/ui/TasteItem';
import { useWineTasteForm } from '@/hooks/useWineTasteForm';
import Chip from '../common/ui/chip';
import Button from '../common/ui/Button';
import Image from 'next/image';
import { CreateReviewRequest } from '@/lib/api/review/review.types';
import { GetWineDetailResponse } from '@/lib/api/wine/wine.types';

type Mode = 'create' | 'edit';

interface ReviewFormProps {
  mode: Mode;
  wine: GetWineDetailResponse;
  onSubmit: (data: CreateReviewRequest) => Promise<void>;
}

export default function ReviewForm({ mode, wine, onSubmit }: ReviewFormProps) {
  const isEdit = mode === 'edit';
  const [content, setContent] = useState('');
  const [rating, setRating] = useState(3);
  const [selectedAromas, setSelectedAromas] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { tasteForm, updateTaste } = useWineTasteForm(undefined);
  const stars = getFilledStars(rating);
  const aromaLabels = Object.values(AROMA_META).map(v => v.label);
  const handleAromaToggle = (label: string) => {
    setSelectedAromas(prev =>
      prev.includes(label) ? prev.filter(a => a !== label) : [...prev, label]
    );
  };
  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const aromaEntries = Object.entries(AROMA_META) as [
        AromaType,
        (typeof AROMA_META)[AromaType],
      ][];
      const aromaKeys: AromaType[] = selectedAromas.map(label => {
        const found = aromaEntries.find(([_, value]) => value.label === label);
        if (!found) {
          throw new Error(`알 수 없는 향기 라벨: ${label}`);
        }
        return found[0];
      });

      await onSubmit({
        wineId: wine.id,
        rating,
        content,
        aroma: aromaKeys,
        lightBold: tasteForm['바디감'],
        smoothTannic: tasteForm['탄닌'],
        drySweet: tasteForm['당도'],
        softAcidic: tasteForm['산미'],
      });
    } finally {
      setIsSubmitting(false);
    }
  };
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
            <span
              key={`star-${i}`}
              onClick={() => setRating(i + 1)}
              className="cursor-pointer text-2xl text-primary hover:scale-110 transition-transform inline-block"
            >
              {filled ? '★' : '☆'}
            </span>
          ))}
        </div>
      </div>

      <div className="flex flex-col mb-10">
        <textarea
          value={content}
          onChange={e => setContent(e.target.value)}
          className="border border-input px-4 py-3 min-h-30 outline-none"
          placeholder="후기를 작성해주세요"
        />
      </div>

      <div className="flex flex-col gap-4 mb-10">
        <span className="mb-3 text-xl font-semibold">와인의 맛은 어땠나요?</span>
        {TASTES.map(taste => (
          <TasteItem
            key={taste}
            taste={taste}
            value={tasteForm[taste]}
            onChange={val => updateTaste(taste, val)}
            showDivider
          />
        ))}
      </div>

      <div className="flex flex-col gap-2 mb-7.5">
        <span className="mb-3 text-xl font-semibold">기억에 남는 향이 있나요?</span>
        <div className="flex flex-wrap py-2.5">
          {aromaLabels.map(label => (
            <Chip
              key={label}
              label={label}
              selected={selectedAromas.includes(label)}
              onClick={() => handleAromaToggle(label)}
            />
          ))}
        </div>
      </div>
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-16 bg-linear-to-t from-white to-transparent" />

      <Button onClick={handleSubmit} disabled={isSubmitting}>
        {isEdit ? '리뷰 수정하기' : '리뷰 남기기'}
      </Button>
    </div>
  );
}
