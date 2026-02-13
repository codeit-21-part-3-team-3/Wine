interface PriceRangeProps {
  value: [number, number];
  onChange: (next: [number, number]) => void;
  className?: string;
}

export default function PriceRange({ value, onChange, className }: PriceRangeProps) {
  return (
    <section className={className}>
      <h3>가격</h3>
    </section>
  );
}
