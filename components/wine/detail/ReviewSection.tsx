import Button from '@/components/common/ui/Button';
import ReviewFeedCard from '@/components/reviewCard/ReviewFeedCard';
import ReviewStats from '@/components/wine/detail/ReviewStates';
import { mockListReviews } from '@/mock/review.list.mock';

export default function ReviewSection() {
  const currentUserId = 10;
  const totalReviews = mockListReviews.length;
  const averageRating =
    totalReviews > 0 ? mockListReviews.reduce((acc, cur) => acc + cur.rating, 0) / totalReviews : 0;
  const distribution = [5, 4, 3, 2, 1].map(star => {
    const count = mockListReviews.filter(r => r.rating === star).length;
    const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;

    return {
      star,
      ratio: `w-[${percentage}%]`,
    };
  });

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
            {mockListReviews.map(review => (
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
