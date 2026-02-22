import { WINE_PRICE_MAX, WINE_PRICE_MIN } from '@/constants/wine';
import { cn } from '@/utils/cn';

type MinPriceValue = number;
type MaxPriceValue = number;

type PriceRange = [MinPriceValue, MaxPriceValue];

interface PriceRangeProps {
  value: PriceRange;
  onChange: (next: PriceRange) => void;
  className?: string;
}
const STEP = 1000;

export default function PriceRange({ value, onChange, className }: PriceRangeProps) {
  const [minPrice, maxPrice] = value;

  const handleMin = (v: number) => {
    if (v > maxPrice) return;
    onChange([v, maxPrice]);
  };

  const handleMax = (v: number) => {
    if (v < minPrice) return;
    onChange([minPrice, v]);
  };

  const percentMin = ((minPrice - WINE_PRICE_MIN) / (WINE_PRICE_MAX - WINE_PRICE_MIN)) * 100;
  const percentMax = ((maxPrice - WINE_PRICE_MIN) / (WINE_PRICE_MAX - WINE_PRICE_MIN)) * 100;
  const isMinAtMax = minPrice > WINE_PRICE_MAX - STEP * 10;
  return (
    <section className={cn('space-y-5 mt-16 lg:mt-12', className)}>
      <h3 className="text-lg font-semibold">가격</h3>
      <div className="flex justify-between mb-1 text-sm text-gray-600">
        <span>₩ {minPrice.toLocaleString()}</span>
        <span>₩ {maxPrice.toLocaleString()}</span>
      </div>
      <div className="relative w-full h-6">
        <div className="absolute top-1/2 -translate-y-1/2 h-1 w-full rounded bg-gray-200" />
        <div
          className="absolute top-1/2 -translate-y-1/2 h-1 rounded bg-primary"
          style={{ left: `${percentMin}%`, right: `${100 - percentMax}%` }}
        />
        <input
          type="range"
          min={WINE_PRICE_MIN}
          max={WINE_PRICE_MAX}
          step={STEP}
          value={minPrice}
          onChange={e => handleMin(Number(e.target.value))}
          className="absolute top-1/2 -translate-y-1/2 w-full h-6 appearance-none bg-transparent range-thumb"
          style={{ zIndex: isMinAtMax ? 10 : undefined }}
        />
        <input
          type="range"
          min={WINE_PRICE_MIN}
          max={WINE_PRICE_MAX}
          step={STEP}
          value={maxPrice}
          onChange={e => handleMax(Number(e.target.value))}
          className="absolute top-1/2 -translate-y-1/2 w-full h-6 appearance-none bg-transparent range-thumb"
          style={{ zIndex: isMinAtMax ? 10 : undefined }}
        />
      </div>
    </section>
  );
}
