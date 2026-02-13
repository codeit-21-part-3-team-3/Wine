import { WineType } from '@/types/domain/wine';
import { ReactNode } from 'react';
import TypeFilter from './TypeFilter';
import PriceRange from './PriceRange';
import RatingFilter from './RatingFilter';
import { cn } from '@/utils/cn';

interface FilterState {
  type: WineType | null;
  minPrice: number;
  maxPrice: number;
  rating: number | null;
}

interface FilterContentProps {
  value: FilterState;
  onChange: (next: FilterState) => void;
  actions?: ReactNode;
  className?: string;
}

export default function FilterContent({ value, onChange, actions, className }: FilterContentProps) {
  return (
    <div className={cn(className)}>
      <TypeFilter value={value.type} onChange={type => onChange({ ...value, type })} />
      <PriceRange
        value={[value.minPrice, value.maxPrice]}
        onChange={([minPrice, maxPrice]) => onChange({ ...value, minPrice, maxPrice })}
      />
      <RatingFilter value={value.rating} onChange={rating => onChange({ ...value, rating })} />
      {actions && <div className="mt-10 lg:mt-16 flex gap-2 justify-center">{actions}</div>}
    </div>
  );
}
