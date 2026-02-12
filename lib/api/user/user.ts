import { fetcher } from '@/lib/fetcher';
import {
  GetMeResponse,
  GetMyReviewsResponse,
  GetMyWinesResponse,
  UpdateMeRequest,
  UpdateMeResponse,
} from './user.types';

export function getMe() {
  return fetcher<GetMeResponse>('/api/proxy/users/me', {
    method: 'GET',
  });
}

export function updateMe(body: UpdateMeRequest) {
  return fetcher<UpdateMeResponse>('/api/proxy/users/me', {
    method: 'PATCH',
    body,
  });
}

export function getMyReviews() {
  return fetcher<GetMyReviewsResponse>('/api/proxy/users/me/reviews', {
    method: 'GET',
  });
}

export function getMyWines() {
  return fetcher<GetMyWinesResponse>('/api/proxy/users/me/wines', {
    method: 'GET',
  });
}
