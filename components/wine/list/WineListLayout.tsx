import Container from '@/components/common/layout/Container';
import WineListSection from './WineListSection';
import SidebarFilter from '@/components/filter/SidebarFilter';
import type { Wine, WineType } from '@/types/domain/wine';
import { useState } from 'react';

interface WineListLayoutProps {
  initialWines: Wine[];
}

interface FilterState {
  type: WineType | null;
  minPrice: number;
  maxPrice: number;
  rating: number | null;
}

const initialFilter: FilterState = {
  type: null,
  minPrice: 0,
  maxPrice: 100000,
  rating: null,
};

export default function WineListLayout({ initialWines }: WineListLayoutProps) {
  const [filter, setFilter] = useState<FilterState>(initialFilter);
  const handleApply = () => {
    console.log('apply filter');
  };

  return (
    <Container>
      <div className="flex gap-6 mt-10">
        <section className="w-71 hidden lg:block shrink-0">
          <SidebarFilter value={filter} onChange={setFilter} onApply={handleApply} />
        </section>
        <WineListSection initialWines={initialWines} />
      </div>
    </Container>
  );
}
