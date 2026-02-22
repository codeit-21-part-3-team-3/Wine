import { cn } from '@/utils/cn';
import MyReviewCard from '../reviewCard/MyReviewCard';
import { ApiReview } from '@/lib/api/review/review.types';
import EmptyState from '../common/ui/EmptyState';

interface MyReviewsPanelProps {
  reviews: ApiReview[];
  loading: boolean;
  className?: string;
}

export default function MyReviewsPanel({ reviews, loading, className }: MyReviewsPanelProps) {
  if (loading) return null;

  if (!reviews.length) {
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
        <EmptyState title="아직 작성한 리뷰가 없어요!" description="첫 리뷰를 작성해보세요" />
      </section>
    );
  }

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
