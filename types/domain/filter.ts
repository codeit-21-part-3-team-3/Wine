import { WineType } from '@/types/domain/wine';

export interface FilterState {
  type: WineType | null;
  minPrice: number;
  maxPrice: number;
  rating: number | null;
}
