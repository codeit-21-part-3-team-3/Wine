import { WineInReview } from '@/types/domain/review';

interface ReviewWineInfoProps {
  wine: WineInReview;
}

export default function ReviewWineInfo({ wine }: ReviewWineInfoProps) {
  return (
    <div className="flex items-center gap-4 h-24 overflow-hidden">
      <img src={wine.image} alt={wine.name} className="w-16 h-24 mt-5 object-contain" />
      <div className="flex flex-col">
        <p className="font-semibold text-lg">{wine.name}</p>
        <p className="text-sm text-gray-400">{wine.region}</p>
      </div>
    </div>
  );
}
