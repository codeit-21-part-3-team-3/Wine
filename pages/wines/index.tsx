import HeroSection from '@/components/wine/list/HeroSection';
import WineListLayout from '@/components/wine/list/WineListLayout';
import { getWines } from '@/lib/api/wine/wine';
import { Wine } from '@/types/domain/wine';
import { GetServerSideProps } from 'next';

interface WineListPageProps {
  initialWines: Wine[];
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const res = await getWines({ limit: 20 });
    return { props: { initialWines: res.list } };
  } catch (e) {
    return { props: { initialWines: [] } };
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
