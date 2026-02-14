import Container from '@/components/common/layout/Container';
import Gnb from '@/components/common/layout/Gnb';

export default function HeroSection() {
  return (
    <div className="bg-gray-50 pt-px">
      <Gnb />

      <Container>
        <section className=" h-[400px] rounded-xl bg-gray-100 flex items-center justify-center">
          <span className="text-gray-400">carousel placeholder</span>
        </section>
      </Container>
    </div>
  );
}
