/* ================================
   공통 User
================================ */

export interface ApiUser {
  id: number;
  nickname: string;
  image: string;
}

/* ================================
   Review Base (모든 응답 공통)
================================ */

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

/* ================================
   Request Body
================================ */

export interface CreateReviewBody {
  rating: number;
  lightBold: number;
  smoothTannic: number;
  drySweet: number;
  softAcidic: number;
  aroma: string[];
  content: string;
  wineId: number;
}

export interface UpdateReviewBody {
  rating?: number;
  lightBold?: number;
  smoothTannic?: number;
  drySweet?: number;
  softAcidic?: number;
  aroma?: string[];
  content?: string;
}

/* ================================
   Response
================================ */

export type CreateReviewResponse = ApiReview;
export type GetReviewResponse = ApiReview;
export type UpdateReviewResponse = ApiReview;

export interface DeleteReviewResponse {
  id: number;
}
