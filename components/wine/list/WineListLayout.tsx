import Container from '@/components/common/layout/Container';
import WineListSection from './WineListSection';

export default function WineListLayout() {
  return (
    <Container>
      <div className="flex gap-6 mt-10">
        <section className="w-[284px] h-[580px] hidden lg:flex rounded-xl bg-gray-100 shrink-0">
          <span className="text-gray-400">filter placeholder</span>
        </section>
        <WineListSection />
      </div>
    </Container>
  );
}
