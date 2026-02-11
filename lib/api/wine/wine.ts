import { fetcher } from '@/lib/fetcher';
import { GetWinesQuery, GetWinesResponse } from './wine.types';
import { GetWineDetailResponse } from './wine.types';
import { GetRecommendedWinesResponse } from './wine.types';
import { CreateWineBody, CreateWineResponse } from './wine.types';
import { UpdateWineBody, UpdateWineResponse } from './wine.types';
import { DeleteWineResponse } from './wine.types';

export function getWines(query: GetWinesQuery) {
  return fetcher<GetWinesResponse>('/api/proxy/wines', {
    method: 'GET',
    query,
  });
}

export function getWine(id: number) {
  return fetcher<GetWineDetailResponse>(`/api/proxy/wines/${id}`, { method: 'GET' });
}

export function getRecommendedWines(limit: number) {
  return fetcher<GetRecommendedWinesResponse>('/api/proxy/wines/recommended', {
    method: 'GET',
    query: { limit },
  });
}

export function createWine(body: CreateWineBody) {
  return fetcher<CreateWineResponse>('/api/proxy/wines', {
    method: 'POST',
    body,
  });
}

export function updateWine(id: number, body: UpdateWineBody) {
  return fetcher<UpdateWineResponse>(`/api/proxy/wines/${id}`, {
    method: 'PATCH',
    body,
  });
}

export function deleteWine(id: number) {
  return fetcher<DeleteWineResponse>(`/api/wines/${id}`, { method: 'DELETE' });
}
