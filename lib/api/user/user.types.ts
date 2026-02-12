import { ApiReview } from '../review/review.types';
import { WineListItem } from '../wine/wine.types';

export interface ApiUser {
  id: number;
  nickname: string;
  image: string | null;
  teamId: string;
  createdAt: string;
  updatedAt: string;
}

export type GetMeResponse = ApiUser;

export type UpdateMeRequest = Partial<Pick<ApiUser, 'nickname' | 'image'>>;

export type UpdateMeResponse = ApiUser;

export type GetMyReviewsResponse = ApiReview[];

export type GetMyWinesResponse = WineListItem[];
