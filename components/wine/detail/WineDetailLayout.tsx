import Container from '@/components/common/layout/Container';
import WineProfile from '@/components/wine/detail/WineProfile';
import ReviewSection from '@/components/wine/detail/ReviewSection';
import { ApiUser } from '@/lib/api/user/user.types';
import { GetWineDetailResponse } from '@/lib/api/wine/wine.types';

interface WineDetailLayoutProps {
  wine: GetWineDetailResponse;
  user: ApiUser | null;
}

export default function WineDetailLayout({ wine, user }: WineDetailLayoutProps) {
  return (
    <Container>
      <WineProfile wine={wine} />
      <ReviewSection wine={wine} myId={user?.id ?? 0} />
    </Container>
  );
}
