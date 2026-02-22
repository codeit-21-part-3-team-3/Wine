import { User as ApiUser } from '@/types/auth/auth';
import { ApiReview } from '../review/review.types';
import { WineListItem } from '../wine/wine.types';

export type { ApiUser };

export type GetMeResponse = ApiUser;

export type UpdateMeRequest = Partial<Pick<ApiUser, 'nickname' | 'image'>>;

export type UpdateMeResponse = ApiUser;

export interface GetMyReviewsResponse {
  list: ApiReview[];
  totalCount: number;
  nextCursor: number | null;
}

export interface GetMyWinesResponse {
  list: WineListItem[];
  totalCount: number;
  nextCursor: number | null;
}
