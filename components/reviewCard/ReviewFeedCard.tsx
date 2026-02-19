import { Review } from '@/types/domain/review';
import IconButton from '@/components/common/ui/IconButton';
import ReviewUser from '../review/ReviewUser';
import ReviewRating from '../review/ReviewRating';
import AromaList from '../review/AromaList';
import ReviewContent from '../review/ReviewContent';
import ReviewContainer from '../review/ReviewContainer';
import ChevronToggleButton from '../review/ChevronToggleButton';
import { useState } from 'react';
import ReviewMenu from '../review/ReviewMenu';
import TasteItem, { TASTES, Taste as TasteLabel } from '@/components/common/ui/TasteItem';

interface ReviewFeedCardProps {
  review: Review;
  isOwner: boolean;
}

export default function ReviewFeedCard({ review, isOwner }: ReviewFeedCardProps) {
  const [expanded, setExpanded] = useState(false);

  const handleEdit = (reviewId: number) => {
    console.log('모달');
  };

  const handleDelete = (reviewId: number) => {
    console.log('모달');
  };
  // 임시! 데이터 연결시 따로 파일분리 예정
  const getTasteValue = (tasteName: TasteLabel) => {
    switch (tasteName) {
      case '바디감':
        return review.tastes.body;
      case '탄닌':
        return review.tastes.tannin;
      case '당도':
        return review.tastes.sweetness;
      case '산미':
        return review.tastes.acidity;
      default:
        return 0;
    }
  };

  /**
   * @todo(@jaywai-lee, 26.02.18)
   * 페이지 레벨 action 연결 전까지 임시 핸들러
   * merge 후 상위로 lift 예정
   */

  return (
    <ReviewContainer
      header={
        <div className="flex flex-col mb-2 gap-5">
          <ReviewRating rating={review.rating} />
          <div className="flex items-center justify-between">
            <div className="flex flex-col justify-center">
              <ReviewUser user={review.user} createdAt={review.createdAt} />
            </div>
            {isOwner ? (
              <ReviewMenu reviewId={review.id} onEdit={handleEdit} onDelete={handleDelete} />
            ) : (
              <IconButton icon="heart" size={28} />
            )}
          </div>
        </div>
      }
    >
      <AromaList aromas={review.aroma} />
      <ReviewContent content={review.content} />
      {expanded && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4 mt-6">
          {TASTES.map(name => (
            <TasteItem
              key={`${review.id}-${name}`}
              taste={name}
              value={getTasteValue(name)}
              variant="review"
            />
          ))}
        </div>
      )}

      <ChevronToggleButton open={expanded} onToggle={() => setExpanded(prev => !prev)} />
      <div className="h-px bg-gray-300" />
    </ReviewContainer>
  );
}
