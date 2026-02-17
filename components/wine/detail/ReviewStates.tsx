import { cn } from '@/utils/cn';
import ReviewRating from '@/components/review/ReviewRating';

interface ReviewStatsProps {
  rating: number;
  distribution: { star: number; ratio: string }[];
}

export default function ReviewStats({ rating, distribution }: ReviewStatsProps) {
  return (
    <div className="flex flex-col md:flex-row lg:flex-col gap-8 md:items-center lg:items-start">
      <div className="flex items-center gap-4 md:flex-1 lg:flex-none">
        <div className="text-2xl origin-left flex gap-1">
          <ReviewRating rating={Math.round(rating)} />
        </div>
        <div className="flex items-baseline gap-1">
          <span className="text-2xl text-foreground font-bold tracking-tighter">
            {rating.toFixed(1)}
          </span>
          <span className="text-2xl text-muted-foreground font-bold">/ 5.0</span>
        </div>
      </div>

      <div className="flex flex-col gap-2 w-full md:flex-1 lg:w-full">
        {distribution.map(item => (
          <div key={item.star} className="flex items-center gap-4">
            <span className="text-basic font-bold w-6 shrink-0 text-muted-foreground">
              {item.star}점
            </span>
            <div className="flex-1 h-1.5 bg-secondary rounded-full overflow-hidden">
              <div className={cn('h-full bg-foreground transition-all duration-500', item.ratio)} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
