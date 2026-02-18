import { Wine } from '@/types/domain/wine';
import WineInfo from './WineInfo';
import Image from 'next/image';
import WineMeta from './WineMeta';

interface WineCardProps {
  wine: Wine;
}

export default function WineCard({ wine }: WineCardProps) {
  const { image, name, region, price, avgRating, reviewCount, recentReview } = wine;
  return (
    <article className="w-full mt-2 mb-8 lg:mb-10 rounded-2xl border border-gray-300 bg-white hover:shadow-md transition">
      <div className="grid grid-cols-[80px_1fr] md:grid-cols-[60px_minmax(0,1fr)_auto] gap-x-4 md:gap-x-20 px-5 md:pl-15 md:pr-13 pt-2.5 items-start">
        <div className="relative overflow-hidden row-span-2 lg:w-15 h-57 w-18 shrink-0">
          <Image src={image} alt={name} fill className="object-cover mt-5" />
        </div>
        <div className="col-start-2 row-start-1 mt-5 md:mt-4">
          <WineInfo name={name} region={region} price={price} />
        </div>
        <div className="md:mt-4">
          <WineMeta avgRating={avgRating} reviewCount={reviewCount} />
        </div>
      </div>

      {recentReview && (
        <>
          <div className="h-px bg-gray-300" />
          <div className="py-2 px-5 md:py-5 md:px-10 lg:px-15">
            <p className="mb-2 md:mb-2.5 text-sm md:text-base font-medium">최신 후기</p>
            <p className="text-sm text-gray-400 leading-6 line-clamp-2 md:text-wrap">
              {recentReview.content}
            </p>
          </div>
        </>
      )}
    </article>
  );
}
