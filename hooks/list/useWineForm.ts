import { useState } from 'react';
import { createWine } from '@/lib/api/wine/wine';
import type { CreateWineRequest } from '@/lib/api/wine/wine.types';
import type { Wine, WineType } from '@/types/domain/wine';
import { useWineFormState } from './useWineFormState';

interface useWineFormParams {
  mode: 'create' | 'edit';
  onSuccess?: (wine: Wine) => void;
}

interface WineFormValues {
  name: string;
  price: number;
  region: string;
  type: WineType | null;
  image: string;
}

function extractErrorMessage(err: unknown): string {
  if (err instanceof Error) return err.message;
  return '와인 등록에 실패했습니다.';
}

export function useWineForm({ mode, onSuccess }: useWineFormParams) {
  const isEdit = mode === 'edit';
  const { errors, setErrors, resetErrors } = useWineFormState();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = (values: WineFormValues) => {
    const newErrors: typeof errors = {};

    if (!values.name.trim()) newErrors.name = '와인 이름은 필수 입력이에요';
    if (!values.price || values.price <= 0) newErrors.price = '가격은 필수 입력이에요';
    if (!values.type) newErrors.type = '와인 타입은 필수 입력이에요';
    if (!values.region.trim()) newErrors.region = '원산지는 필수 입력이에요';
    if (!values.image) newErrors.image = '와인 사진은 필수 입력이에요';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submit = async (values: WineFormValues) => {
    if (isSubmitting) return;
    if (!validate(values)) return;

    try {
      setIsSubmitting(true);
      resetErrors();

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
      setErrors(prev => ({ ...prev, form: extractErrorMessage(err) }));
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    isEdit,
    isSubmitting,
    submit,
    errors,
  };
}
