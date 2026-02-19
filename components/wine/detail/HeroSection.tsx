import Container from '@/components/common/layout/Container';
import Gnb from '@/components/common/layout/Gnb';

export default function HeroSection() {
  return (
    <div className="bg-gray-50 pt-px lg:rounded-b-[88px]">
      <Gnb />

      <Container>
        <section className=" h-[400px] flex items-center justify-center">
          <span className="text-gray-400">와인 상세 정보</span>
        </section>
      </Container>
    </div>
  );
}
