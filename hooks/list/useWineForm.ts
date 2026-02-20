import { useState } from 'react';
import { createWine } from '@/lib/api/wine/wine';
import type { CreateWineRequest } from '@/lib/api/wine/wine.types';
import type { Wine } from '@/types/domain/wine';
import { useWineFormState } from './useWineFormState';

interface useWineFormParams {
  mode: 'create' | 'edit';
  onSuccess?: (wine: Wine) => void;
}

function extractErrorMessage(err: unknown): string {
  if (err instanceof Error) return err.message;

  if (typeof err === 'object' && err !== null && 'response' in err) {
    const response = (err as { response?: { data?: { message?: string } } }).response;
    return response?.data?.message ?? '와인 등록에 실패했습니다.';
  }

  return '와인 등록에 실패했습니다.';
}

export function useWineForm({ mode, onSuccess }: useWineFormParams) {
  const isEdit = mode === 'edit';
  const form = useWineFormState();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const newErrors: typeof form.errors = {};

    if (!form.name.trim()) newErrors.name = '와인 이름은 필수 입력이에요';
    if (!form.price || Number(form.price) <= 0) newErrors.price = '가격은 필수 입력이에요';
    if (!form.type) newErrors.type = '와인 타입은 필수 입력이에요';
    if (!form.region.trim()) newErrors.region = '원산지는 필수 입력이에요';
    if (!form.image) newErrors.image = '와인 사진은 필수 입력이에요';

    form.setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submit = async () => {
    if (isSubmitting) return;
    if (!validate()) return;

    try {
      setIsSubmitting(true);
      form.setErrors({});

      const payload: CreateWineRequest = {
        name: form.name,
        price: Number(form.price),
        region: form.region,
        type: form.type!,
        image: form.image,
      };

      const createdWine = await createWine(payload);

      onSuccess?.(createdWine);
      form.reset();
    } catch (err: unknown) {
      form.setErrors(prev => ({
        ...prev,
        form: extractErrorMessage(err),
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    isEdit,
    isSubmitting,
    submit,
    ...form,
  };
}
