import { getFilledStars } from '@/utils/rating';

interface ReviewRatingProps {
  rating: number;
}

export default function ReviewRating({ rating }: ReviewRatingProps) {
  const stars = getFilledStars(rating);

  return (
    <div className="flex text-primary">
      {stars.map((filled, i) => (
        <span key={`star-${i}`}>{filled ? '★' : '☆'}</span>
      ))}
    </div>
  );
}
