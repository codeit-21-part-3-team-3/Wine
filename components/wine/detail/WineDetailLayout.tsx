import Container from '@/components/common/layout/Container';
import WineProfile from '@/components/wine/detail/WineProfile';
import ReviewSection from '@/components/wine/detail/ReviewSection';
import { ApiUser } from '@/lib/api/user/user.types';
import { GetWineDetailResponse } from '@/lib/api/wine/wine.types';
import { useReviewHandlers } from '@/hooks/review/useReviewHandlers';

interface WineDetailLayoutProps {
  wine: GetWineDetailResponse;
  user: ApiUser | null;
  reviewState: ReturnType<typeof useReviewHandlers>;
}

export default function WineDetailLayout({ wine, user, reviewState }: WineDetailLayoutProps) {
  // wine.reviewCount 조건과 상관없이 프로필은 항상 렌더링해야 합니다.
  return (
    <Container className="pb-16 lg:pb-20">
      <WineProfile reviews={reviewState.reviews} />
      <ReviewSection wine={wine} myId={user?.id ?? 0} reviewState={reviewState} />
    </Container>
  );
}
