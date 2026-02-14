import { useState } from 'react';
import WineSearchBar from './WineSearchBar';
import WineList from './WineList';
import { mockWineData } from '@/mock/wine.mock';
import WineListEmpty from './WineListEmpty';

export default function WineListSection() {
  const [keyword, setKeyword] = useState('');

  const wines = mockWineData.list;

  const filtered = wines.filter(w => w.name.toLowerCase().includes(keyword.toLowerCase()));

  const isSearching = keyword.trim().length > 0;

  const showEmpty = isSearching && filtered.length === 0;
  const showList = !showEmpty;

  return (
    <section className="flex-1 flex flex-col">
      <WineSearchBar value={keyword} onChange={setKeyword} />
      {showEmpty && <WineListEmpty />}
      {showList && <WineList wines={filtered} />}
    </section>
  );
}
