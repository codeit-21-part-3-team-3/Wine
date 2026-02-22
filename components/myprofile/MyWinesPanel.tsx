import { cn } from '@/utils/cn';
import MyWineCard from '../mywinecard/MyWineCard';
import { WineListItem } from '@/lib/api/wine/wine.types';
import EmptyState from '../common/ui/EmptyState';

interface MyWinesPanelProps {
  wines: WineListItem[];
  loading: boolean;
  className?: string;
}

export default function MyWinesPanel({ wines, loading, className }: MyWinesPanelProps) {
  if (loading) return null;

  if (!wines.length) {
    return (
      <section
        role="tabpanel"
        id="panel-reviews"
        aria-labelledby="tab-reviews"
        className={cn(
          'relative lg:pl-5 lg:border-l border-t border-gray-300 flex flex-col',
          className
        )}
      >
        <EmptyState title="아직 등록한 와인이 없어요!" description="새 와인을 등록해보세요" />
      </section>
    );
  }
  return (
    <section
      role="tabpanel"
      id="panel-wines"
      aria-labelledby="tab-wines"
      className={cn(
        'relative lg:pl-8 pt-10 lg:border-l border-t border-gray-300 grid grid-cols-1 md:grid-cols-2 gap-x-4 lg:gap-x-18 md:gap-y-0',
        className
      )}
    >
      {wines.map(wine => (
        <MyWineCard key={wine.id} wine={wine} />
      ))}
    </section>
  );
}
