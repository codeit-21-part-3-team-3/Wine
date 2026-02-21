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

export function getMyReviews(limit: number = 10, cursor?: number) {
  return fetcher<GetMyReviewsResponse>('/users/me/reviews', {
    method: 'GET',
    query: {
      limit,
      cursor,
    },
  });
}

export function getMyWines(limit: number = 10, cursor?: number) {
  return fetcher<GetMyWinesResponse>('/users/me/wines', {
    method: 'GET',
    query: {
      limit,
      cursor,
    },
  });
}
