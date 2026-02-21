import { WineType } from '@/types/domain/wine';
import { useState } from 'react';

export interface FormErrors {
  name?: string;
  price?: string;
  type?: string;
  region?: string;
  image?: string;
  form?: string;
}

export function useWineFormState() {
  const [errors, setErrors] = useState<FormErrors>({});

  const clearError = (key: keyof FormErrors) => {
    setErrors(prev => ({ ...prev, [key]: undefined }));
  };

  const resetErrors = () => setErrors({});

  return {
    errors,
    setErrors,
    clearError,
    resetErrors,
  };
}
