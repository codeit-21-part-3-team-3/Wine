import IconButton from '@/components/common/ui/IconButton';
import ReviewUser from '../review/ReviewUser';
import ReviewRating from '../review/ReviewRating';
import AromaList from '../review/AromaList';
import ReviewContent from '../review/ReviewContent';
import ReviewContainer from '../review/ReviewContainer';
import ChevronToggleButton from '../review/ChevronToggleButton';
import { useState } from 'react';
import ReviewMenu from '../review/ReviewMenu';
import TasteItem, { TASTES } from '@/components/common/ui/TasteItem';
import { ApiWineReview } from '@/lib/api/wine/wine.types';
import { getTasteValueByLabel } from '@/utils/tasteValue';
import { AromaType } from '@/constants/aromaMap';

interface ReviewFeedCardProps {
  review: ApiWineReview;
  isOwner: boolean;
  onDelete: (id: number) => void;
  onLike: () => void;
}

export default function ReviewFeedCard({ review, isOwner, onDelete, onLike }: ReviewFeedCardProps) {
  const [expanded, setExpanded] = useState(false);

  const handleEdit = () => {
    console.log('수정 모달 오픈:', review.id);
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
              <ReviewMenu
                reviewId={review.id}
                onEdit={handleEdit}
                onDelete={() => onDelete(review.id)}
              />
            ) : (
              <IconButton icon="heart" size={28} onClick={onLike} />
            )}
          </div>
        </div>
      }
    >
      <AromaList aromas={review.aroma as AromaType[]} />
      <ReviewContent content={review.content} />
      {expanded && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4 mt-6">
          {TASTES.map(name => (
            <TasteItem
              key={`${review.id}-${name}`}
              taste={name}
              value={getTasteValueByLabel(review, name)}
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
