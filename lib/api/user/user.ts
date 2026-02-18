import { fetcher } from '@/lib/fetcher';
import {
  GetMeResponse,
  GetMyReviewsResponse,
  GetMyWinesResponse,
  UpdateMeRequest,
  UpdateMeResponse,
} from './user.types';

export function getMe() {
  return fetcher<GetMeResponse>('/users/me', {
    method: 'GET',
  });
}

export function updateMe(body: UpdateMeRequest) {
  return fetcher<UpdateMeResponse>('/users/me', {
    method: 'PATCH',
    body,
  });
}

export function getMyReviews() {
  return fetcher<GetMyReviewsResponse>('/users/me/reviews', {
    method: 'GET',
  });
}

export function getMyWines() {
  return fetcher<GetMyWinesResponse>('/users/me/wines', {
    method: 'GET',
  });
}
