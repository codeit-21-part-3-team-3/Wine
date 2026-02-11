import type { WineType } from '@/types/domain/wine';

/* ================================
   공통
================================ */

export interface ApiUser {
  id: number;
  nickname: string;
  image: string;
}

export interface ApiRecentReview {
  id: number;
  content: string;
  aroma: string[];
  rating: number;
  createdAt: string;
  updatedAt: string;
  user: ApiUser;
}

/* ================================
   Wine Base (모든 응답 공통)
================================ */

export interface ApiWineBase {
  id: number;
  name: string;
  region: string;
  image: string;
  price: number;
  type: WineType;
  avgRating: number;
  reviewCount: number;
  userId: number;
  recentReview?: ApiRecentReview;
}

/* ================================
   List / Recommended
================================ */

export type WineListItem = ApiWineBase;

type QueryValue = string | number | boolean;

export interface GetWinesQuery {
  [key: string]: QueryValue | QueryValue[] | undefined | null;
  limit: number;
  cursor?: number;
  type?: WineType;
  minPrice?: number;
  maxPrice?: number;
  rating?: number;
  name?: string;
}

export interface GetWinesResponse {
  totalCount: number;
  nextCursor?: number;
  list: WineListItem[];
}

export type GetRecommendedWinesResponse = WineListItem[];

/* ================================
   Detail
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
  isLiked: boolean;
  user: ApiUser;
}

export interface GetWineDetailResponse extends ApiWineBase {
  reviews: ApiReview[];
  avgRatings: Record<string, number>;
}

/* ================================
   Request Body
================================ */

export interface CreateWineBody {
  name: string;
  region: string;
  image: string;
  price: number;
  type: WineType;
}

export interface UpdateWineBody {
  name?: string;
  region?: string;
  image?: string;
  price?: number;
  avgRating?: number;
  type?: WineType;
}

/* ================================
   Mutation Response
================================ */

export type CreateWineResponse = ApiWineBase;
export type UpdateWineResponse = ApiWineBase;

export interface DeleteWineResponse {
  id: number;
}
