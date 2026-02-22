import { useState } from 'react';
import { AromaType } from '@/constants/aromaMap';
import { useWineTasteForm } from '@/hooks/useWineTasteForm';
import { CreateReviewRequest, UpdateReviewRequest } from '@/lib/api/review/review.types';
import { ApiWineReview } from '@/lib/api/wine/wine.types';
import { toast } from '@/components/common/ui/Toast';

export function useReviewFormLogic<T extends CreateReviewRequest | UpdateReviewRequest>(
  wineId: number,
  onSubmit: (data: T) => Promise<void>,
  initialData?: ApiWineReview
) {
  const [content, setContent] = useState(initialData?.content || '');
  const [rating, setRating] = useState(initialData?.rating || 3);
  const [selectedAromas, setSelectedAromas] = useState<AromaType[]>(
    (initialData?.aroma as AromaType[]) || []
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { tasteForm, updateTaste } = useWineTasteForm(
    initialData
      ? {
          바디감: initialData.lightBold,
          탄닌: initialData.smoothTannic,
          당도: initialData.drySweet,
          산미: initialData.softAcidic,
        }
      : undefined
  );

  const handleAromaToggle = (aromaKey: AromaType) => {
    setSelectedAromas(prev =>
      prev.includes(aromaKey) ? prev.filter(a => a !== aromaKey) : [...prev, aromaKey]
    );
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;
    if (!content || content.trim().length === 0) {
      toast.error('리뷰 내용을 입력해 주세요.');
      return;
    }
    setIsSubmitting(true);
    try {
      const commonFields = {
        rating,
        content: content.trim(),
        aroma: selectedAromas,
        lightBold: tasteForm['바디감'],
        smoothTannic: tasteForm['탄닌'],
        drySweet: tasteForm['당도'],
        softAcidic: tasteForm['산미'],
      };
      if (initialData) {
        await onSubmit(commonFields as T);
      } else {
        await onSubmit({
          ...commonFields,
          wineId,
        } as T);
      }
    } catch (error) {
      console.error(error);
      toast.error(initialData ? '리뷰 수정에 실패했습니다.' : '리뷰 등록에 실패했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formState: { content, rating, selectedAromas, isSubmitting, tasteForm },
    actions: { setContent, setRating, handleAromaToggle, updateTaste, handleSubmit },
  };
}
