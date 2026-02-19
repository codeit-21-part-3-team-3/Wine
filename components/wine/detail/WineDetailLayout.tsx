import Container from '@/components/common/layout/Container';
import WineProfile from '@/components/wine/detail/WineProfile';
import ReviewSection from '@/components/wine/detail/ReviewSection';

export default function WineDetailLayout() {
  return (
    <Container>
      <WineProfile />
      <ReviewSection />
    </Container>
  );
}
