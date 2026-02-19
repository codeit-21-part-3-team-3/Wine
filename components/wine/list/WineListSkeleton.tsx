import WineCardSkeleton from '../WineCardSkeleton';

interface WineListSkeletonProps {
  count?: number;
}

export default function WineListSkeleton({ count = 6 }: WineListSkeletonProps) {
  return (
    <div className="flex flex-col">
      {Array.from({ length: count }).map((_, i) => (
        <WineCardSkeleton key={i} />
      ))}
    </div>
  );
}
