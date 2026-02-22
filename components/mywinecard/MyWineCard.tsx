import Image from 'next/image';
import MyWineCardInfo from './MyWineCardInfo';
import { cn } from '@/utils/cn';
import { WineListItem } from '@/lib/api/wine/wine.types';

interface MyWineCardProps {
  wine: WineListItem;
  onEdit?: (wine: WineListItem) => void;
  onDelete?: (wine: WineListItem) => void;
  className?: string;
}

export default function MyWineCard({ wine, onEdit, onDelete, className }: MyWineCardProps) {
  return (
    <article className={cn('max-w-100 w-full mb-4 md:mb-8 lg:mb-10', className)}>
      <div className="relative aspect-square overflow-hidden bg-gray-100 group">
        <Image
          src={wine.image}
          alt={wine.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
          className="object-contain p-10 transition-transform duration-200 group-hover:scale-105"
        />
      </div>
      <MyWineCardInfo
        name={wine.name}
        region={wine.region}
        price={wine.price}
        onEdit={() => onEdit?.(wine)}
        onDelete={() => onDelete?.(wine)}
      />
    </article>
  );
}
