import { fetcher } from '@/lib/fetcher';
import { GetWineDetailResponse } from './types';

export function getWine(id: number) {
  return fetcher<GetWineDetailResponse>(`/api/proxy/wines/${id}`, { method: 'GET' });
}
