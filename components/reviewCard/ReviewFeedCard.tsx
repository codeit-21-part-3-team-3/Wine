import { Review } from '@/types/domain/review';
import IconButton from '@/components/common/ui/IconButton';
import ReviewUser from '../review/ReviewUser';
import ReviewRating from '../review/ReviewRating';
import AromaList from '../review/AromaList';
import ReviewContent from '../review/ReviewContent';
import ReviewContainer from '../review/ReviewContainer';
import ChevronToggleButton from '../review/ChevronToggleButton';
import { useState } from 'react';

interface ReviewFeedCardProps {
  review: Review;
  isOwner: boolean;
}

export default function ReviewFeedCard({ review, isOwner }: ReviewFeedCardProps) {
  const [expanded, setExpanded] = useState(false);
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
              <IconButton icon="kebab" size={28} />
            ) : (
              <IconButton icon="heart" size={28} />
            )}
          </div>
        </div>
      }
    >
      <AromaList aromas={review.aroma} />
      <ReviewContent content={review.content} />
      {/**
       * @todo(@jaywai-lee, 26.02.10)
       * 애란님 작업 중인 맛 부분 추가 예정
       */}
      {expanded && <div className="h-19 mt-12 bg-gray-100 rounded-md" />}
      <ChevronToggleButton open={expanded} onToggle={() => setExpanded(prev => !prev)} />
      <div className="h-px bg-gray-300" />
    </ReviewContainer>
  );
}
