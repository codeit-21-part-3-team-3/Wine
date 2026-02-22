import { useState } from 'react';
import { createWine, updateWine } from '@/lib/api/wine/wine';
import type { CreateWineRequest, UpdateWineRequest } from '@/lib/api/wine/wine.types';
import type { Wine, WineType } from '@/types/domain/wine';
import { toast } from '@/components/common/ui/Toast';
import { WINE_PRICE_MAX, WINE_PRICE_MIN } from '@/constants/wine';

interface useWineFormParams {
  mode: 'create' | 'edit';
  wineId?: number;
  onSuccess?: (wine: Wine) => void;
}

interface WineFormValues {
  name: string;
  price: number;
  region: string;
  type: WineType;
  image: string;
}

function extractErrorMessage(err: unknown, isEdit: boolean): string {
  if (err instanceof Error) return err.message;
  return isEdit ? '와인 수정에 실패했습니다.' : '와인 등록에 실패했습니다.';
}

export function useWineForm({ mode, wineId, onSuccess }: useWineFormParams) {
  const isEdit = mode === 'edit';
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const submit = async (values: WineFormValues) => {
    if (isSubmitting) return;

    try {
      setIsSubmitting(true);
      setFormError(null);

      if (values.price < WINE_PRICE_MIN || values.price > WINE_PRICE_MAX) {
        toast.error(`가격은 ${WINE_PRICE_MAX.toLocaleString()}원 이하만 가능합니다.`);
        return;
      }

      const payload: CreateWineRequest = {
        name: values.name,
        price: values.price,
        region: values.region,
        type: values.type!,
        image: values.image,
      };

      let result: Wine;

      if (isEdit && wineId) {
        result = await updateWine(wineId, payload as UpdateWineRequest);
        toast.success('와인이 수정되었습니다.');
      } else {
        result = await createWine(payload as CreateWineRequest);
        toast.success('와인이 등록되었습니다.');
      }
      onSuccess?.(result);
    } catch (err) {
      const message = extractErrorMessage(err, isEdit);
      toast.error(message);
      setFormError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    isEdit,
    isSubmitting,
    submit,
    formError,
  };
}
