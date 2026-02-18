import HeroSection from '@/components/wine/list/HeroSection';
import WineListLayout from '@/components/wine/list/WineListLayout';
import { getWines } from '@/lib/api/wine/wine';
import { Wine } from '@/types/domain/wine';
import { GetStaticProps } from 'next';

interface WineListPageProps {
  initialWines: Wine[];
}

export const getStaticProps: GetStaticProps<WineListPageProps> = async () => {
  try {
    const res = await getWines({ limit: 20 });
    return { props: { initialWines: res.list }, revalidate: 60 };
  } catch (e) {
    return { props: { initialWines: [] }, revalidate: 60 };
  }
};

export default function WineListPage({ initialWines }: WineListPageProps) {
  return (
    <>
      <HeroSection />
      <WineListLayout initialWines={initialWines} />
    </>
  );
}
