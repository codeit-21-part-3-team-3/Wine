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
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [region, setRegion] = useState('');
  const [type, setType] = useState<WineType | null>(null);
  const [image, setImage] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});

  const clearError = (key: keyof FormErrors) => {
    setErrors(prev => ({ ...prev, [key]: undefined }));
  };

  const handleNameChange = (value: string) => {
    setName(value);
    if (errors.name) clearError('name');
  };

  const handlePriceChange = (value: string) => {
    setPrice(value);
    if (errors.price) clearError('price');
  };

  const handleRegionChange = (value: string) => {
    setRegion(value);
    if (errors.region) clearError('region');
  };

  const handleImageChange = (value: string) => {
    setImage(value);
    if (errors.image) clearError('image');
  };

  const toggleType = (value: WineType) => {
    setType(prev => (prev === value ? null : value));
    if (errors.type) clearError('type');
  };

  const reset = () => {
    setName('');
    setPrice('');
    setRegion('');
    setType(null);
    setImage('');
    setErrors({});
  };

  return {
    name,
    setName: handleNameChange,
    price,
    setPrice: handlePriceChange,
    region,
    setRegion: handleRegionChange,
    type,
    toggleType,
    image,
    setImage: handleImageChange,
    errors,
    setErrors,
    reset,
  };
}
