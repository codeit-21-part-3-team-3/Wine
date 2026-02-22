import { useState } from 'react';
import { AROMA_META, AromaType } from '@/constants/aromaMap';
import { useWineTasteForm } from '@/hooks/useWineTasteForm';
import { CreateReviewRequest } from '@/lib/api/review/review.types';
import { toast } from '@/components/common/ui/Toast';

export function useReviewFormLogic(
  wineId: number,
  onSubmit: (data: CreateReviewRequest) => Promise<void>
) {
  const [content, setContent] = useState('');
  const [rating, setRating] = useState(3);
  const [selectedAromas, setSelectedAromas] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { tasteForm, updateTaste } = useWineTasteForm(undefined);

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
      const aromaKeys = selectedAromas.map(label => {
        const found = aromaEntries.find(([_, value]) => value.label === label);
        if (!found) throw new Error(`알 수 없는 향기 라벨: ${label}`);
        return found[0];
      });

      await onSubmit({
        wineId,
        rating,
        content,
        aroma: aromaKeys,
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
