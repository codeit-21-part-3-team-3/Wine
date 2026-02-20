import { WINE_TYPES } from '@/constants/filter';
import { FilterState } from '@/types/domain/filter';
import { WineType } from '@/types/domain/wine';
import { ParsedUrlQuery } from 'querystring';

function parseInputNumber(value: string | undefined, defaultValue: number) {
  if (value == null || value === '') return defaultValue;

  const num = Number(value);
  return Number.isNaN(num) ? defaultValue : num;
}

function parseInputNullableNumber(value: string | undefined): number | null {
  if (value == null || value === '') return null;

  const num = Number(value);
  return Number.isNaN(num) ? null : num;
}

function parseWineType(value: string | string[] | undefined): WineType | null {
  if (!value) return null;

  const v = Array.isArray(value) ? value[0] : value;

  return WINE_TYPES.includes(v as WineType) ? (v as WineType) : null;
}

function getSingle(value: string | string[] | undefined): string | undefined {
  if (value === undefined) return undefined;
  return Array.isArray(value) ? value[0] : value;
}

export function parseWineFilterQuery(query: ParsedUrlQuery): FilterState {
  return {
    type: parseWineType(getSingle(query.type)),
    minPrice: parseInputNumber(getSingle(query.minPrice), 0),
    maxPrice: parseInputNumber(getSingle(query.maxPrice), 100000),
    rating: parseInputNullableNumber(getSingle(query.rating)),
    name: getSingle(query.name) ?? '',
  };
}
