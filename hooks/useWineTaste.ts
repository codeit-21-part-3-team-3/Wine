import { useState } from 'react';
import { TasteType } from '@/components/common/ui/TasteItem';

export const useWineTaste = (initialData?: Partial<Record<TasteType, number>>) => {
  // ✅ 피드백 반영: undefined를 허용하지 않고 기본값 0을 할당
  const [tasteForm, setTasteForm] = useState<Record<TasteType, number>>({
    바디감: initialData?.바디감 ?? 0,
    타닌: initialData?.타닌 ?? 0,
    당도: initialData?.당도 ?? 0,
    산미: initialData?.산미 ?? 0,
  });

  const updateTaste = (key: TasteType, value: number) => {
    setTasteForm(prev => ({ ...prev, [key]: value }));
  };

  return { tasteForm, updateTaste };
};
