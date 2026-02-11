import { fetcher } from '@/lib/fetcher';
import { UpdateWineBody, UpdateWineResponse } from './types';

export function updateWine(id: number, body: UpdateWineBody) {
  return fetcher<UpdateWineResponse>(`/api/proxy/wines/${id}`, {
    method: 'PATCH',
    body,
  });
}
