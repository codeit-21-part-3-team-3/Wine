import { useState } from 'react';
import { AromaType } from '@/constants/aromaMap';
import { useWineTasteForm } from '@/hooks/useWineTasteForm';
import { CreateReviewRequest } from '@/lib/api/review/review.types';
import { toast } from '@/components/common/ui/Toast';

export function useReviewFormLogic(
  wineId: number,
  onSubmit: (data: CreateReviewRequest) => Promise<void>
) {
  const [content, setContent] = useState('');
  const [rating, setRating] = useState(3);
  const [selectedAromas, setSelectedAromas] = useState<AromaType[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { tasteForm, updateTaste } = useWineTasteForm(undefined);

  const handleAromaToggle = (aromaKey: AromaType) => {
    setSelectedAromas(prev =>
      prev.includes(aromaKey) ? prev.filter(a => a !== aromaKey) : [...prev, aromaKey]
    );
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      await onSubmit({
        wineId,
        rating,
        content,
        aroma: selectedAromas,
        lightBold: tasteForm['바디감'],
        smoothTannic: tasteForm['탄닌'],
        drySweet: tasteForm['당도'],
        softAcidic: tasteForm['산미'],
      });
    } catch (error) {
      console.error(error);
      toast.error('리뷰 등록에 실패했습니다. 다시 시도해 주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formState: { content, rating, selectedAromas, isSubmitting, tasteForm },
    actions: { setContent, setRating, handleAromaToggle, updateTaste, handleSubmit },
  };
}
