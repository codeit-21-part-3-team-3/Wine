import Image from 'next/image';
import vector from '@/assets/icons/vector.png';
import WineRating from './WineRating';
import { Wine } from '@/types/wine';

type WineMetaProps = Pick<Wine, 'avgRating' | 'reviewCount'>;

export default function WineMeta({ avgRating, reviewCount }: WineMetaProps) {
  return (
    <div className="flex md:flex-col items-center md:items-end gap-9">
      <WineRating avgRating={avgRating} reviewCount={reviewCount} />
      <Image src={vector} alt="arrow" width={24} height={24} />
    </div>
  );
}
