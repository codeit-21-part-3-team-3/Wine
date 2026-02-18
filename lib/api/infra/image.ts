import { fetcher } from '@/lib/fetcher';
import { UploadImageResponse } from './image.types';

export function uploadImage(file: File) {
  const formData = new FormData();
  formData.append('image', file);

  return fetcher<UploadImageResponse>(`/images/upload`, {
    method: 'POST',
    body: formData,
  });
}
