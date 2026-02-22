import WineList from './WineList';
import { Wine } from '@/types/domain/wine';
import EmptyState from '../../common/ui/EmptyState';

interface WineListSectionProps {
  wines: Wine[];
}

export default function WineListSection({ wines }: WineListSectionProps) {
  const isEmpty = wines.length === 0;

  return (
    <section className="flex-1 lg:pl-15 flex flex-col">
      {isEmpty ? (
        <EmptyState
          title="아직 아무도 모르는 와인이네요!"
          description={
            <>
              <span className="block md:inline">지금 등록해서 다른 사람들에게</span>
              <span className="block md:lnline md:ml-1">첫 번째로 소개해보세요</span>
            </>
          }
        />
      ) : (
        <WineList wines={wines} />
      )}
    </section>
  );
}
