import Container from '@/components/common/layout/Container';
import Gnb from '@/components/common/layout/Gnb';
import { ListCarousel } from '@/components/wine/list/ListCarousel';
import { mockWineData } from '@/mock/wine.mock';

const wineList = mockWineData.list;
export default function HeroSection() {
  return (
    <div className="w-full bg-gray-50 pt-px lg:rounded-b-[88px] pb-6 md:pb-0">
      <Gnb />
      <Container>
        <ListCarousel wineList={wineList} />
      </Container>
    </div>
  );
}
