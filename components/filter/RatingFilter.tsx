import { cn } from '@/utils/cn';
import { RadioGroup, RadioGroupItem } from '../common/ui/RadioGroup';

interface RatingFilterProps {
  value: number | null;
  onChange: (next: number | null) => void;
  className?: string;
}

const OPTIONS = [
  { label: '전체', value: null },
  { label: '5.0 - 4.5', value: 5 },
  { label: '4.5 - 4.0', value: 4.5 },
  { label: '4.0 - 3.5', value: 4 },
  { label: '3.5 - 3.0', value: 3.5 },
];

export default function RatingFilter({ value, onChange, className }: RatingFilterProps) {
  const stringValue = value === null ? 'all' : String(value);

  const handleChange = (next: string) => {
    if (next === 'all') {
      onChange(null);
      return;
    }
    const num = Number(next);
    if (!Number.isNaN(num)) {
      onChange(num);
    }
  };

  return (
    <section className={cn('space-y-5 mt-16 lg:mt-12', className)}>
      <h3 className="text-lg mb-3 font-semibold">평점</h3>

      <RadioGroup
        name="rating-filter"
        value={stringValue}
        onValueChange={handleChange}
        className="flex flex-col gap-3"
      >
        {OPTIONS.map(item => {
          const radioValue = item.value === null ? 'all' : String(item.value);

          return (
            <RadioGroupItem key={radioValue} value={radioValue}>
              {item.label}
            </RadioGroupItem>
          );
        })}
      </RadioGroup>
    </section>
  );
}
