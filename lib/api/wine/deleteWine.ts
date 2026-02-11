import { fetcher } from '@/lib/fetcher';
import { DeleteWineResponse } from './types';

export function deleteWine(id: number) {
  return fetcher<DeleteWineResponse>(`/api/wines/${id}`, { method: 'DELETE' });
}
