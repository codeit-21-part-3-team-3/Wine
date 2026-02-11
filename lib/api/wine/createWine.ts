import { fetcher } from '@/lib/fetcher';
import { CreateWineBody, CreateWineResponse } from './types';

export function createWine(body: CreateWineBody) {
  return fetcher<CreateWineResponse>('/api/proxy/wines', {
    method: 'POST',
    body,
  });
}
