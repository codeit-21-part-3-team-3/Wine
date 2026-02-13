import { cn } from '@/utils/cn';

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
  return (
    <section className={cn('space-y-5 mt-16 lg:mt-12', className)}>
      <h3 className="text-lg mb-3 font-semibold">평점</h3>

      <ul className="flex flex-col gap-3">
        {OPTIONS.map(item => (
          <li key={item.label}>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={value === item.value}
                onChange={() => onChange(item.value)}
                className="h-4 w-4 shrink-0 accent-primary"
              />
              <span className="leading-none">{item.label}</span>
            </label>
          </li>
        ))}
      </ul>
    </section>
  );
}
