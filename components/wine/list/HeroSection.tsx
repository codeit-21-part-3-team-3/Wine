import Container from '@/components/common/layout/Container';
import Gnb from '@/components/common/layout/Gnb';
import { ListCarousel } from '@/components/wine/list/ListCarousel';
import { Wine } from '@/types/domain/wine';

interface HeroSectionProps {
  recommendedWines: Wine[];
}
export default function HeroSection({ recommendedWines }: HeroSectionProps) {
  return (
    <div className="w-full bg-gray-50 lg:rounded-b-[88px] pb-6 md:pb-0">
      <Gnb />
      <Container>
        <ListCarousel wineList={recommendedWines} />
      </Container>
    </div>
  );
}
