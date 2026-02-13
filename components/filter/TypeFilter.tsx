import { WineType } from '@/types/domain/wine';
import Chip from '../common/ui/chip';
import { cn } from '@/utils/cn';

interface TypeFilterProps {
  value: WineType | null;
  onChange: (next: WineType | null) => void;
  className?: string;
}

const TYPES: WineType[] = ['RED', 'WHITE', 'SPARKLING'];

export default function TypeFilter({ value, onChange, className }: TypeFilterProps) {
  const select = (type: WineType) => {
    if (value === type) {
      onChange(null);
    } else {
      onChange(type);
    }
  };
  return (
    <section className={cn('space-y-5', className)}>
      <h3 className="text-lg mb-2 lg:mb-5 font-semibold">타입</h3>
      <div className="flex gap-3">
        {TYPES.map(type => (
          <Chip key={type} label={type} selected={value === type} onClick={() => select(type)} />
        ))}
      </div>
    </section>
  );
}
