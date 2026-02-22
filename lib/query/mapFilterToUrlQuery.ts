import { FilterState } from '@/types/domain/filter';
import type { ParsedUrlQueryInput } from 'querystring';

function clean<T>(value: T | null | undefined | ''): T | undefined {
  if (value === '' || value == null) return undefined;
  return value;
}

export function mapFilterToUrlQuery(filter: FilterState): ParsedUrlQueryInput {
  return {
    type: clean(filter.type),
    minPrice: filter.minPrice !== 0 ? String(filter.minPrice) : undefined,
    maxPrice: filter.maxPrice !== 500000 ? String(filter.maxPrice) : undefined,
    rating: filter.rating !== null ? String(filter.rating) : undefined,
    name: filter.name || undefined,
  };
}
