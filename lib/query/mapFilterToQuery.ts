import { GetWinesQuery } from '@/lib/api/wine/wine.types';
import { FilterState } from '@/types/domain/filter';

export function mapFilterToQuery(filter: FilterState): Partial<GetWinesQuery> {
  return {
    ...(filter.type ? { type: filter.type } : {}),
    ...(filter.rating !== null ? { rating: filter.rating } : {}),
    ...(filter.minPrice !== 0 ? { minPrice: filter.minPrice } : {}),
    ...(filter.maxPrice !== 500000 ? { maxPrice: filter.maxPrice } : {}),
    ...(filter.name ? { name: filter.name } : {}),
  };
}
