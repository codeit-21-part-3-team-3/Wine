import { WineType } from '@/types/domain/wine';
import Chip from '../common/ui/chip';
import { cn } from '@/utils/cn';

interface TypeFilterProps {
  value: WineType[];
  onChange: (next: WineType[]) => void;
  className?: string;
}

const TYPES: WineType[] = ['RED', 'WHITE', 'SPARKLING'];

export default function TypeFilter({ value, onChange, className }: TypeFilterProps) {
  const toggle = (type: WineType) => {
    if (value.includes(type)) {
      onChange(value.filter(v => v !== type));
    } else {
      onChange([...value, type]);
    }
  };
  return (
    <section className={cn('space-y-3', className)}>
      <h3 className="text-lg font-semibold">타입</h3>
      <div className="flex gap-3">
        {TYPES.map(type => (
          <Chip
            key={type}
            label={type}
            selected={value.includes(type)}
            onClick={() => toggle(type)}
          />
        ))}
      </div>
    </section>
  );
}
