import { ApiUser } from '../wine/wine.types';

export type ReviewUser = ApiUser;

export interface ApiReview {
  id: number;
  rating: number;
  lightBold: number;
  smoothTannic: number;
  drySweet: number;
  softAcidic: number;
  aroma: string[];
  content: string;
  createdAt: string;
  updatedAt: string;
  user: ApiUser;
  isLiked: boolean;
  wineId: number;
  teamId: string;
}

export interface CreateReviewRequest {
  rating: number;
  lightBold: number;
  smoothTannic: number;
  drySweet: number;
  softAcidic: number;
  aroma: string[];
  content: string;
  wineId: number;
}

export type UpdateReviewRequest = Partial<CreateReviewRequest>;

export type CreateReviewResponse = ApiReview;
export type GetReviewResponse = ApiReview;
export type UpdateReviewResponse = ApiReview;

export interface DeleteReviewResponse {
  id: number;
}
