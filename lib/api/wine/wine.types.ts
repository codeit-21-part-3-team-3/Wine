import type { WineType } from '@/types/domain/wine';
import { ApiUser } from '../user/user.types';
import { ApiReview } from '../review/review.types';
import { QueryParams } from '@/lib/fetcher';

export type WineUser = ApiUser;

export type ApiRecentReview = Pick<
  ApiReview,
  | 'id'
  | 'content'
  | 'aroma'
  | 'rating'
  | 'createdAt'
  | 'updatedAt'
  | 'user'
  | 'lightBold'
  | 'smoothTannic'
  | 'drySweet'
  | 'softAcidic'
>;

export interface ApiWine {
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
  lightBold: number;
  smoothTannic: number;
  drySweet: number;
  softAcidic: number;
}

export type WineListItem = ApiWine;

export interface GetWinesQuery extends QueryParams {
  limit: number;
  cursor?: number | null;
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

export type ApiWineReview = Omit<ApiReview, 'wineId' | 'teamId'>;

export interface GetWineDetailResponse extends ApiWine {
  reviews: ApiWineReview[];
  avgRatings: Record<string, number>;
}

export type CreateWineRequest = Pick<ApiWine, 'name' | 'region' | 'image' | 'price' | 'type'>;

export type UpdateWineRequest = Partial<
  Pick<ApiWine, 'name' | 'region' | 'image' | 'price' | 'type' | 'avgRating'>
>;

export type CreateWineResponse = ApiWine;
export type UpdateWineResponse = ApiWine;

export type DeleteWineResponse = Pick<ApiWine, 'id'>;

export interface GetWineDetailResponse extends ApiWine {
  reviews: ApiWineReview[];
  avgRatings: Record<string, number>;
}
