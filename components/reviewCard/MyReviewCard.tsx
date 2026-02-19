import { Review } from '@/types/domain/review';
import ReviewContainer from '../review/ReviewContainer';
import ReviewRating from '../review/ReviewRating';
import { formatTimeAgo } from '@/utils/formatTimeAgo';
import ReviewWineInfo from '../review/ReviewWineInfo';
import ReviewMenu from '../review/ReviewMenu';

interface MyReviewCardProps {
  review: Review;
}

export default function MyReviewCard({ review }: MyReviewCardProps) {
  if (!review.wine) return null;

  const handleEdit = (reviewId: number) => {
    console.log('모달');
  };

  const handleDelete = (reviewId: number) => {
    console.log('모달');
  };

  /**
   * @todo(@jaywai-lee, 26.02.18)
   * 페이지 레벨 action 연결 전까지 임시 핸들러
   * merge 후 상위로 lift 예정
   */

  return (
    <ReviewContainer
      header={
        <div className="flex flex-col gap-2">
          <div className="flex justify-between mt-5">
            <div className="flex gap-2">
              <ReviewRating rating={review.rating} />
              <p className="mr-2">{review.rating}</p>
              <span className="text-gray-400">{formatTimeAgo(review.createdAt)}</span>
            </div>
            <ReviewMenu reviewId={review.id} onEdit={handleEdit} onDelete={handleDelete} />
          </div>
          <ReviewWineInfo wine={review.wine} />
        </div>
      }
    >
      <div className="mt-4">{review.content}</div>
      {/**
       * @todo(@jaywai-lee, 26.02.10)
       * 애란님 작업 중인 맛 부분 추가 예정
       */}
      <div className="h-19 mt-12 bg-gray-100 rounded-md" />
      <div className="h-px mt-10 bg-gray-300" />
    </ReviewContainer>
  );
}
