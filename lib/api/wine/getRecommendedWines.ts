import { fetcher } from '@/lib/fetcher';
import { GetRecommendedWinesResponse } from './types';

export function getRecommendedWines(limit: number) {
  return fetcher<GetRecommendedWinesResponse>('/api/proxy/wines/recommended', {
    method: 'GET',
    query: { limit },
  });
}
