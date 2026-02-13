import { WineType } from '@/types/domain/wine';

interface TypeFilterProps {
  value: WineType[];
  onChange: (next: WineType[]) => void;
  className?: string;
}

export default function TypeFilter({ value, onChange, className }: TypeFilterProps) {
  return (
    <section className={className}>
      <h3>타입</h3>
    </section>
  );
}
