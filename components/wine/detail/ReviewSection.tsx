import Button from '@/components/common/ui/Button';
import ReviewFeedCard from '@/components/reviewCard/ReviewFeedCard';
import ReviewStats from '@/components/wine/detail/ReviewStats';
import { MOCK_WINE_DETAIL } from '@/mock/wineDetail.mock';
import { useReviewStats } from '@/hooks/useReviewStats';

export default function ReviewSection() {
  const currentUserId = 10;
  const reviewsFromDetail = MOCK_WINE_DETAIL.reviews;
  const { totalReviews, averageRating, distribution } = useReviewStats(reviewsFromDetail);

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
            {reviewsFromDetail.map(review => (
              <ReviewFeedCard
                key={review.id}
                review={review}
                isOwner={review.user.id === currentUserId}
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
