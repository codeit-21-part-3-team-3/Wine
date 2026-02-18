import { useMemo, useState } from 'react';
import WineSearchBar from './WineSearchBar';
import WineList from './WineList';
import WineListEmpty from './WineListEmpty';
import { Wine } from '@/types/domain/wine';

interface WineListSectionProps {
  initialWines: Wine[];
}

export default function WineListSection({ initialWines }: WineListSectionProps) {
  const [keyword, setKeyword] = useState('');

  const wines = initialWines;

  const filtered = useMemo(() => {
    return wines.filter(w => w.name.toLowerCase().includes(keyword.toLowerCase()));
  }, [keyword, wines]);

  const isSearching = keyword.trim().length > 0;
  const showEmpty = isSearching && filtered.length === 0;
  const showList = !showEmpty;

  return (
    <section className="flex-1 pl-15 flex flex-col">
      <WineSearchBar value={keyword} onChange={setKeyword} />
      {showEmpty && <WineListEmpty />}
      {showList && <WineList wines={filtered} />}
    </section>
  );
}
