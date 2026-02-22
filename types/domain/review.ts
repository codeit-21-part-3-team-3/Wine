import { AromaType } from '@/constants/aromaMap';

export interface Taste {
  body: number;
  tannin: number;
  sweetness: number;
  acidity: number;
}

export interface UserInReview {
  id: number;
  nickname: string;
  image: string | null;
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
  createdAt: string;
  updatedAt: string;
  aroma: AromaType[];
  lightBold: number;
  smoothTannic: number;
  drySweet: number;
  softAcidic: number;
  user: UserInReview;
  wineId: number;
  isLiked: boolean;
  teamId: string;
}
