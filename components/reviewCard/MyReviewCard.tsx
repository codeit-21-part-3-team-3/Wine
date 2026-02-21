import ReviewContainer from '../review/ReviewContainer';
import ReviewRating from '../review/ReviewRating';
import { formatTimeAgo } from '@/utils/formatTimeAgo';
import ReviewWineInfo from '../review/ReviewWineInfo';
import ReviewMenu from '../review/ReviewMenu';
import TasteItem, { TASTES, Taste as TasteLabel } from '@/components/common/ui/TasteItem';
import { ApiReview } from '@/lib/api/review/review.types';

interface MyReviewCardProps {
  review: ApiReview;
}

export default function MyReviewCard({ review }: MyReviewCardProps) {
  const handleEdit = (reviewId: number) => {
    console.log('모달', reviewId);
  };

  const handleDelete = (reviewId: number) => {
    console.log('모달', reviewId);
  };

  const getTasteValue = (tasteName: TasteLabel) => {
    switch (tasteName) {
      case '바디감':
        return review.lightBold;
      case '탄닌':
        return review.smoothTannic;
      case '당도':
        return review.drySweet;
      case '산미':
        return review.softAcidic;
      default:
        return 0;
    }
  };

  return (
    <ReviewContainer
      header={
        <div className="flex flex-col gap-2">
          <div className="flex justify-between mt-5">
            <div className="flex gap-2">
              <ReviewRating rating={review.rating} />
              <p className="mr-2">{review.rating}</p>
              <span className="text-gray-400">{formatTimeAgo(new Date(review.createdAt))}</span>
            </div>
            <ReviewMenu reviewId={review.id} onEdit={handleEdit} onDelete={handleDelete} />
          </div>
          {review.wine && <ReviewWineInfo wine={review.wine} />}
        </div>
      }
    >
      <div className="mt-4">{review.content}</div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4 mt-6">
        {TASTES.map(name => (
          <TasteItem
            key={`${review.id}-${name}`}
            taste={name}
            value={getTasteValue(name)}
            variant="default"
          />
        ))}
      </div>
      <div className="h-px mt-10 bg-gray-300" />
    </ReviewContainer>
  );
}
