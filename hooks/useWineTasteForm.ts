import { useState } from 'react';
import { Taste, TASTES } from '@/components/common/ui/TasteItem';

export const useWineTasteForm = (initialData: Partial<Record<Taste, number>> | undefined) => {
  const initialForm = TASTES.reduce(
    (acc, taste) => {
      acc[taste] = initialData?.[taste] ?? 0;
      return acc;
    },
    {} as Record<Taste, number>
  );

  const [tasteForm, setTasteForm] = useState<Record<Taste, number>>(initialForm);

  const updateTaste = (taste: Taste, value: number) => {
    setTasteForm(prev => ({
      ...prev,
      [taste]: value,
    }));
  };

  const resetTaste = () => {
    setTasteForm(initialForm);
  };

  return {
    tasteForm,
    updateTaste,
    resetTaste,
  };
};
