import { fetcher } from '@/lib/fetcher';
import {
  CreateWineRequest,
  GetWinesQuery,
  GetWinesResponse,
  UpdateWineRequest,
} from './wine.types';
import { GetWineDetailResponse } from './wine.types';
import { GetRecommendedWinesResponse } from './wine.types';
import { CreateWineResponse } from './wine.types';
import { UpdateWineResponse } from './wine.types';
import { DeleteWineResponse } from './wine.types';

export function getWines(query: GetWinesQuery) {
  return fetcher<GetWinesResponse>('/wines', {
    method: 'GET',
    query,
  });
}

export function getWine(id: number) {
  return fetcher<GetWineDetailResponse>(`/wines/${id}`, { method: 'GET' });
}

export function getRecommendedWines(limit: number) {
  return fetcher<GetRecommendedWinesResponse>('/wines/recommended', {
    method: 'GET',
    query: { limit },
  });
}

export function createWine(body: CreateWineRequest) {
  return fetcher<CreateWineResponse>('/wines', {
    method: 'POST',
    body,
  });
}

export function updateWine(id: number, body: UpdateWineRequest) {
  return fetcher<UpdateWineResponse>(`/wines/${id}`, {
    method: 'PATCH',
    body,
  });
}

export function deleteWine(id: number) {
  return fetcher<DeleteWineResponse>(`/wines/${id}`, { method: 'DELETE' });
}
