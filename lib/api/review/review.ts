import { fetcher } from '@/lib/fetcher';
import {
  CreateReviewBody,
  CreateReviewResponse,
  DeleteReviewResponse,
  GetReviewResponse,
  UpdateReviewBody,
  UpdateReviewResponse,
} from './review.types';

export function createReview(body: CreateReviewBody) {
  return fetcher<CreateReviewResponse>('/api/proxy/reviews', {
    method: 'POST',
    body,
  });
}

export function getReview(id: number) {
  return fetcher<GetReviewResponse>(`/api/proxy/reviews/${id}`, {
    method: 'GET',
  });
}

export function updateReview(id: number, body: UpdateReviewBody) {
  return fetcher<UpdateReviewResponse>(`/api/proxy/reviews/${id}`, {
    method: 'PATCH',
    body,
  });
}

export function deleteReview(id: number) {
  return fetcher<DeleteReviewResponse>(`/api/proxy/reviews/${id}`, {
    method: 'DELETE',
  });
}

export function likeReview(id: number) {
  return fetcher<void>(`/api/proxy/reviews/${id}/like`, { method: 'POST' });
}

export function unlikeReview(id: number) {
  return fetcher<void>(`/api/proxy/reviews/${id}/like`, { method: 'DELETE' });
}
