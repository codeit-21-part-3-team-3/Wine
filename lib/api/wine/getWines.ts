import { fetcher } from '@/lib/fetcher';
import { GetWinesQuery, GetWinesResponse } from './types';

export function getWines(query: GetWinesQuery) {
  return fetcher<GetWinesResponse>('/api/proxy/wines', {
    method: 'GET',
    query,
  });
}
