import HeroSection from '@/components/wine/list/HeroSection';
import WineListLayout from '@/components/wine/list/WineListLayout';
import { getRecommendedWines, getWines } from '@/lib/api/wine/wine';
import { Wine } from '@/types/domain/wine';
import { GetStaticProps } from 'next';

interface WineListPageProps {
  initialWines: Wine[];
  initialCursor?: number;
  recommendedWines: Wine[];
}

const RECOMMENDED_WINE_LIMIT = 12;

export const getStaticProps: GetStaticProps<WineListPageProps> = async () => {
  try {
    const [listRes, recommendedWines] = await Promise.all([
      getWines({ limit: 20 }),
      getRecommendedWines(RECOMMENDED_WINE_LIMIT),
    ]);
    return {
      props: { initialWines: listRes.list, initialCursor: listRes.nextCursor, recommendedWines },
      revalidate: 60,
    };
  } catch (e) {
    return {
      props: { initialWines: [], initialCursor: undefined, recommendedWines: [] },
      revalidate: 60,
    };
  }
};

export default function WineListPage({
  initialWines,
  initialCursor,
  recommendedWines,
}: WineListPageProps) {
  return (
    <>
      <HeroSection recommendedWines={recommendedWines} />
      <WineListLayout initialWines={initialWines} initialCursor={initialCursor} />
    </>
  );
}
