import { cn } from '@/utils/cn';

interface PriceRangeProps {
  value: [number, number];
  onChange: (next: [number, number]) => void;
  className?: string;
}

const MIN = 0;
const MAX = 100000;
const STEP = 1000;

export default function PriceRange({ value, onChange, className }: PriceRangeProps) {
  const [min, max] = value;

  const handleMin = (v: number) => {
    if (v > max) return;
    onChange([v, max]);
  };

  const handleMax = (v: number) => {
    if (v < min) return;
    onChange([min, v]);
  };

  const percentMin = ((min - MIN) / (MAX - MIN)) * 100;
  const percentMax = ((max - MIN) / (MAX - MIN)) * 100;
  return (
    <section className={cn('space-y-3', className)}>
      <h3 className="text-lg font-semibold">가격</h3>
      <div className="flex justify-between text-sm text-gray-600">
        <span>₩ {min.toLocaleString()}</span>
        <span>₩ {max.toLocaleString()}</span>
      </div>
      <div className="relative h-6">
        <div className="absolute top-1/2 -translate-y-1/2 h-1 w-full rounded bg-gray-200" />
        <div
          className="absolute top-1/2 -translate-y-1/2 h-1 rounded bg-primary"
          style={{ left: `${percentMin}%`, right: `${100 - percentMax}%` }}
        />
        <input
          type="range"
          min={MIN}
          max={MAX}
          step={STEP}
          value={min}
          onChange={e => handleMin(Number(e.target.value))}
          className="absolute top-1/2 -translate-y-1/2 w-full h-0 appearance-none bg-transparent pointer-events-none range-thumb"
        />
        <input
          type="range"
          min={MIN}
          max={MAX}
          step={STEP}
          value={max}
          onChange={e => handleMax(Number(e.target.value))}
          className="absolute top-1/2 -translate-y-1/2 w-full h-0 appearance-none bg-transparent pointer-events-none range-thumb"
        />
      </div>
    </section>
  );
}
