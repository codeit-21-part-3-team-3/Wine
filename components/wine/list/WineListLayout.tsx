import { useWineFilterUrlSync, useWineListFetch, useWineNameUrlSync } from '@/hooks/list';
import type { Wine } from '@/types/domain/wine';
import Container from '@/components/common/layout/Container';
import WineListSection from './WineListSection';
import SidebarFilter from '@/components/filter/SidebarFilter';
import WineListEmpty from './WineListEmpty';
import WineListSkeleton from './WineListSkeleton';
import SearchControls from './SearchControls';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import { useState } from 'react';
import Button from '@/components/common/ui/Button';
import WineFormModal from '../WineFormModal';

interface WineListLayoutProps {
  initialWines: Wine[];
  initialCursor?: number;
}

export default function WineListLayout({ initialWines, initialCursor }: WineListLayoutProps) {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const { filter, setFilter, apply, reset, router } = useWineFilterUrlSync();
  const {
    wines,
    isLoading,
    error,
    hasNextPage: hasMoreWines,
    fetchNextPage,
    prependWine,
  } = useWineListFetch(initialWines, router, initialCursor);
  const { name, setName } = useWineNameUrlSync();
  const sentinelRef = useInfiniteScroll<HTMLDivElement>({
    onIntersect: fetchNextPage,
    hasNextPage: hasMoreWines,
    loading: isLoading,
  });

  const showError = !isLoading && !!error;
  const showEmpty = !isLoading && !error && wines.length === 0;
  const showContent = !isLoading && !error && wines.length > 0;

  return (
    <Container>
      <div className="flex gap-6 mt-10">
        <section className="w-71 hidden lg:block shrink-0">
          <SidebarFilter value={filter} onChange={setFilter} onApply={apply} />
        </section>
        <div className="flex flex-col w-full min-h-200">
          <SearchControls
            filter={filter}
            setFilter={setFilter}
            onApply={apply}
            onReset={reset}
            name={name}
            onNameChange={setName}
          />
          {isLoading && (
            <section className="flex-1 lg:pl-15 flex flex-col">
              <WineListSkeleton />
            </section>
          )}

          {showError && <p className="mt-70 text-red-500">{error}</p>}

          {showEmpty && (
            <div className="flex items-center justify-center md:h-full">
              <WineListEmpty />
            </div>
          )}

          {showContent && <WineListSection wines={wines} />}

          <Button
            className="fixed rounded-full bottom-[calc(1.5rem+env(safe-area-inset-bottom))] right-6 w-auto md:px-6 z-50 shadow-lg hover:sclae-105 transition-transform  "
            onClick={() => setIsCreateOpen(true)}
            size="sm"
          >
            <span className="md:hidden">＋</span>
            <span className="hidden md:inline lg:hidden">와인 등록</span>
            <span className="hidden lg:inline">와인 등록하기</span>
          </Button>

          {hasMoreWines && <div ref={sentinelRef} className="h-12" />}

          <WineFormModal
            open={isCreateOpen}
            onOpenChange={setIsCreateOpen}
            mode="create"
            onSuccess={prependWine}
          />
        </div>
      </div>
    </Container>
  );
}
