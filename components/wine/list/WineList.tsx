import { Wine } from '@/types/domain/wine';
import WineCard from '../WineCard';

interface WineListProps {
  wines: Wine[];
}

export default function WineList({ wines }: WineListProps) {
  return (
    <div className="flex flex-col">
      {wines.map(wine => (
        <WineCard key={wine.id} wine={wine} />
      ))}
    </div>
  );
}
