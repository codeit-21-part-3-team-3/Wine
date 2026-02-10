import { AromaType } from '@/constants/aromaMap';

export interface Taste {
  body: number;
  tannin: number;
  sweetness: number;
  acidity: number;
}

export interface UserInReview {
  id: number;
  name: string;
  image: string;
}

export interface WineInReview {
  id: number;
  name: string;
  region: string;
  image: string;
}

export interface Review {
  id: number;
  rating: number;
  content: string;
  createdAt: Date;
  aroma: AromaType[];
  tastes: Taste;
  wine?: WineInReview;
  user: UserInReview;
  isLiked?: boolean;
}
