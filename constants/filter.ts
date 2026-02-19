import { FilterState } from '@/types/domain/filter';

export const DEFAULT_FILTER: FilterState = {
  type: null,
  minPrice: 0,
  maxPrice: 100000,
  rating: null,
};

export const WINE_TYPES = ['RED', 'WHITE', 'SPARKLING'] as const;
