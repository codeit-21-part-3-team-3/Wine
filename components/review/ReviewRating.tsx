interface ReviewRatingProps {
  rating: number;
}

export default function ReviewRating({ rating }: ReviewRatingProps) {
  return <p>{rating}</p>;
}
