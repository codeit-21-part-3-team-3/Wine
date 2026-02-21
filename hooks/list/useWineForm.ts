import { useState } from 'react';
import { createWine } from '@/lib/api/wine/wine';
import type { CreateWineRequest } from '@/lib/api/wine/wine.types';
import type { Wine, WineType } from '@/types/domain/wine';

interface useWineFormParams {
  mode: 'create' | 'edit';
  onSuccess?: (wine: Wine) => void;
}

interface WineFormValues {
  name: string;
  price: number;
  region: string;
  type: WineType;
  image: string;
}

function extractErrorMessage(err: unknown): string {
  if (err instanceof Error) return err.message;
  return '와인 등록에 실패했습니다.';
}

export function useWineForm({ mode, onSuccess }: useWineFormParams) {
  const isEdit = mode === 'edit';
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const submit = async (values: WineFormValues) => {
    if (isSubmitting) return;

    try {
      setIsSubmitting(true);
      setFormError(null);

      const payload: CreateWineRequest = {
        name: values.name,
        price: values.price,
        region: values.region,
        type: values.type!,
        image: values.image,
      };

      const createdWine = await createWine(payload);
      onSuccess?.(createdWine);
    } catch (err) {
      setFormError(extractErrorMessage(err));
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
