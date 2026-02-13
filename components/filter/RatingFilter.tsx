interface RatingFilterProps {
  value: number[];
  onChange: (next: number[]) => void;
  className?: string;
}

export default function RatingFilter({ value, onChange, className }: RatingFilterProps) {
  return (
    <section className={className}>
      <h3>평점</h3>
    </section>
  );
}
