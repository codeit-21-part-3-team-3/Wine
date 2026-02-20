import { Wine } from '@/types/domain/wine';
import { cn } from '@/utils/cn';
import MyWineCard from '../mywinecard/MyWineCard';

interface MyWinesPanelProps {
  wines: Wine[];
  className?: string;
}

export default function MyWinesPanel({ wines, className }: MyWinesPanelProps) {
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
