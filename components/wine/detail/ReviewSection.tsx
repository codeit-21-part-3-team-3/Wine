import { useState } from 'react';
import Button from '@/components/common/ui/Button';
import ReviewFeedCard from '@/components/reviewCard/ReviewFeedCard';
import ReviewStats from '@/components/wine/detail/ReviewStats';
import ReviewEmpty from '@/components/wine/detail/ReviewEmpty';
import { useReviewStats } from '@/hooks/useReviewStats';
import { GetWineDetailResponse, ApiWineReview } from '@/lib/api/wine/wine.types';
import { deleteReview, likeReview, unlikeReview } from '@/lib/api/review/review';

interface ReviewSectionProps {
  wine: GetWineDetailResponse;
  myId: number;
}

export default function ReviewSection({ wine, myId }: ReviewSectionProps) {
  const [reviews, setReviews] = useState<ApiWineReview[]>(wine.reviews);
  const { totalReviews, averageRating, distribution } = useReviewStats(reviews);

  const handleDelete = async (reviewId: number) => {
    if (!confirm('정말 삭제하시겠습니까?')) return;

    try {
      await deleteReview(reviewId);
      setReviews(prev => prev.filter(r => r.id !== reviewId));
    } catch (error) {
      console.error('삭제 에러:', error);
    }
  };

  const handleLike = async (reviewId: number, isCurrentlyLiked: boolean) => {
    const previousReviews = [...reviews];

    // 좋아요 버튼 작업필요
    setReviews(prev =>
      prev.map(r =>
        r.id === reviewId
          ? {
              ...r,
              isLiked: !isCurrentlyLiked,
            }
          : r
      )
    );

    try {
      if (isCurrentlyLiked) {
        await unlikeReview(reviewId);
      } else {
        await likeReview(reviewId);
      }
    } catch (error) {
      setReviews(previousReviews);
      console.error('좋아요 적용 에러:', error);
    }
  };

  // 리뷰가 없을 때 UI
  if (!reviews || reviews.length === 0) {
    return (
      <ReviewEmpty
        onWriteClick={() => {
          /* 여기에 리뷰 작성 모달을 여는 로직을 연결하세요! */
          console.log('리뷰 작성 모달 오픈');
        }}
      />
    );
  }

  return (
    <section className="w-full py-6 md:py-10 lg:py-20 px-0">
      <div className="flex flex-col-reverse lg:flex-row gap-16 items-start">
        <div className="flex-1 w-full">
          <div className="flex justify-between items-center mb-10">
            <div className="flex items-baseline gap-3.5">
              <h2 className="text-2xl font-bold text-foreground">리뷰 목록</h2>
              <span className="text-basic text-muted-foreground font-medium">
                {totalReviews.toLocaleString()}개
              </span>
            </div>
          </div>

          <div className="">
            {reviews.map(review => (
              <ReviewFeedCard
                key={review.id}
                review={review}
                isOwner={review.user.id === myId}
                onDelete={handleDelete}
                onLike={() => handleLike(review.id, review.isLiked)}
              />
            ))}
          </div>
        </div>
        <div className="w-full lg:w-[350px]">
          <div className="flex flex-col gap-10">
            <ReviewStats rating={averageRating} distribution={distribution} />
            <Button variant="primary" className="text-lg font-bold">
              리뷰 남기기
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
