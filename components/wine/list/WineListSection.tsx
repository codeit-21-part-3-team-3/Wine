import WineList from './WineList';
import WineListEmpty from './WineListEmpty';
import { Wine } from '@/types/domain/wine';

interface WineListSectionProps {
  wines: Wine[];
}

export default function WineListSection({ wines }: WineListSectionProps) {
  const isEmpty = wines.length === 0;

  return (
    <section className="flex-1 lg:pl-15 flex flex-col">
      {isEmpty ? <WineListEmpty /> : <WineList wines={wines} />}
    </section>
  );
}
