import Image from 'next/image';
import arrowRight from '@/assets/icons/arrow-right.png';
import WineRating from './WineRating';
import { Wine } from '@/types/domain/wine';

type WineMetaProps = Pick<Wine, 'avgRating' | 'reviewCount'>;

export default function WineMeta({ avgRating, reviewCount }: WineMetaProps) {
  return (
    <div className="flex md:flex-col items-center md:items-end gap-9">
      <WineRating avgRating={avgRating} reviewCount={reviewCount} />
      <Image src={arrowRight} alt="arrow" width={24} height={24} />
    </div>
  );
}
