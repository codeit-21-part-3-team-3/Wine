import Image from 'next/image';
import Button from '../common/ui/Button';
import { GetWineDetailResponse } from '@/lib/api/wine/wine.types';
import { CreateReviewRequest } from '@/lib/api/review/review.types';
import { useReviewFormLogic } from '@/hooks/review/useReviewForm';
import {
  StarRatingField,
  TasteSection,
  AromaSelectField,
} from '@/components/review/ReviewFormFields';

interface ReviewFormProps {
  mode: 'create' | 'edit';
  wine: GetWineDetailResponse;
  onSubmit: (data: CreateReviewRequest) => Promise<void>;
}

export default function ReviewForm({ mode, wine, onSubmit }: ReviewFormProps) {
  const { formState, actions } = useReviewFormLogic(wine.id, onSubmit);
  const isEdit = mode === 'edit';

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

      <StarRatingField rating={formState.rating} onRatingChange={actions.setRating} />

      <div className="flex flex-col mb-10">
        <textarea
          value={formState.content}
          onChange={e => actions.setContent(e.target.value)}
          className="border border-input px-4 py-3 min-h-30 outline-none"
          placeholder="후기를 작성해주세요"
        />
      </div>

      <TasteSection tasteForm={formState.tasteForm} onUpdate={actions.updateTaste} />

      <AromaSelectField
        selectedAromas={formState.selectedAromas}
        onToggle={actions.handleAromaToggle}
      />

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-16 bg-linear-to-t from-white to-transparent" />
      <Button onClick={actions.handleSubmit} disabled={formState.isSubmitting}>
        {isEdit ? '리뷰 수정하기' : '리뷰 남기기'}
      </Button>
    </div>
  );
}
