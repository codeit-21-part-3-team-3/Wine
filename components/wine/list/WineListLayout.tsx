import Container from '@/components/common/layout/Container';
import WineListSection from './WineListSection';
import SidebarFilter from '@/components/filter/SidebarFilter';
import { WineType } from '@/types/domain/wine';
import { useState } from 'react';

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

export default function WineListLayout() {
  const [filter, setFilter] = useState<FilterState>(initialFilter);
  const handleApply = () => {
    console.log('apply filter');
  };

  return (
    <Container>
      <div className="flex gap-6 mt-10">
        <section className="w-[284px] hidden lg:block shrink-0">
          <SidebarFilter value={filter} onChange={setFilter} onApply={handleApply} />
        </section>
        <WineListSection />
      </div>
    </Container>
  );
}
