import { WineType } from '@/types/domain/wine';
import { ReactNode } from 'react';
import TypeFilter from './TypeFilter';
import PriceRange from './PriceRange';
import RatingFilter from './RatingFilter';
import { cn } from '@/utils/cn';

interface FilterState {
  types: WineType[];
  minPrice: number;
  maxPrice: number;
  ratings: number[];
}

interface FilterContentProps {
  value: FilterState;
  onChange: (next: FilterState) => void;
  footer?: ReactNode;
  className?: string;
}

export default function FilterContent({ value, onChange, footer, className }: FilterContentProps) {
  return (
    <div className={cn(className)}>
      <TypeFilter value={value.types} onChange={types => onChange({ ...value, types })} />
      <PriceRange
        value={[value.minPrice, value.maxPrice]}
        onChange={([minPrice, maxPrice]) => onChange({ ...value, minPrice, maxPrice })}
      />
      <RatingFilter value={value.ratings} onChange={ratings => onChange({ ...value, ratings })} />
      {footer}
    </div>
  );
}
