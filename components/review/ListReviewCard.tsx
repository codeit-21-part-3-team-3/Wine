import { Review } from '@/types/domain/review';
import ReviewRating from './ReviewRating';
import ReviewUser from './ReviewUser';
import AromaList from './AromaList';
import ReviewContent from './ReviewContent';

interface ListReviewCardProps {
  review: Review;
  isOwner: boolean;
}

export default function ListReviewCard({ review, isOwner }: ListReviewCardProps) {
  return (
    <article>
      <ReviewRating rating={review.rating} />
      <ReviewUser userName={review.userName} />
      {isOwner && <div>button</div>}
      <AromaList aromas={review.aromas} />
      <ReviewContent content={review.content} />
    </article>
  );
}
