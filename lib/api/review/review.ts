import { fetcher } from '@/lib/fetcher';
import {
  CreateReviewRequest,
  CreateReviewResponse,
  DeleteReviewResponse,
  GetReviewResponse,
  UpdateReviewRequest,
  UpdateReviewResponse,
} from './review.types';

const clampScore = (v: number) => Math.min(5, Math.max(0, v));

export function createReview(body: CreateReviewRequest) {
  return fetcher<CreateReviewResponse>('/reviews', {
    method: 'POST',
    body: {
      ...body,
      rating: clampScore(body.rating),
      lightBold: clampScore(body.lightBold),
      smoothTannic: clampScore(body.smoothTannic),
      drySweet: clampScore(body.drySweet),
      softAcidic: clampScore(body.softAcidic),
    },
  });
}

export function getReview(id: number) {
  return fetcher<GetReviewResponse>(`/reviews/${id}`, {
    method: 'GET',
  });
}

export function updateReview(id: number, body: UpdateReviewRequest) {
  return fetcher<UpdateReviewResponse>(`/reviews/${id}`, {
    method: 'PATCH',
    body: {
      ...body,
      ...(body.rating !== undefined && { rating: clampScore(body.rating) }),
      ...(body.lightBold !== undefined && { lightBold: clampScore(body.lightBold) }),
      ...(body.smoothTannic !== undefined && { smoothTannic: clampScore(body.smoothTannic) }),
      ...(body.drySweet !== undefined && { drySweet: clampScore(body.drySweet) }),
      ...(body.softAcidic !== undefined && { softAcidic: clampScore(body.softAcidic) }),
    },
  });
}

export function deleteReview(id: number) {
  return fetcher<DeleteReviewResponse>(`/reviews/${id}`, {
    method: 'DELETE',
  });
}

export function likeReview(id: number) {
  return fetcher<void>(`/reviews/${id}/like`, { method: 'POST' });
}

export function unlikeReview(id: number) {
  return fetcher<void>(`/reviews/${id}/like`, { method: 'DELETE' });
}
