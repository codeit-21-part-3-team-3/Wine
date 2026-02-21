import { cn } from '@/utils/cn';
import MyReviewCard from '../reviewCard/MyReviewCard';
import { ApiReview } from '@/lib/api/review/review.types';

interface MyReviewsPanelProps {
  reviews: ApiReview[];
  className?: string;
}

export default function MyReviewsPanel({ reviews, className }: MyReviewsPanelProps) {
  return (
    <section
      role="tabpanel"
      id="panel-reviews"
      aria-labelledby="tab-reviews"
      className={cn(
        'relative lg:pl-5 lg:border-l border-t border-gray-300 flex flex-col',
        className
      )}
    >
      {reviews.map(review => (
        <MyReviewCard key={review.id} review={review} />
      ))}
    </section>
  );
}
