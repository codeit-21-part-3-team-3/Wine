import { AromaType } from './aroma';

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

export interface Review {
  id: number;
  rating: number;
  content: string;
  createdAt: Date;
  aroma: AromaType[];
  tastes: Taste;
  user: UserInReview;
  isLiked?: boolean;
}
