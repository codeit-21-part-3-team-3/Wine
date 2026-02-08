import { Wine } from '@/types/domain/wine';
import { getFilledStars } from '@/utils/rating';

type WineRatingProps = Pick<Wine, 'avgRating' | 'reviewCount'>;

export default function WineRating({ avgRating, reviewCount }: WineRatingProps) {
  const stars = getFilledStars(avgRating);

  return (
    <div className="flex md:flex-col ml-1 md:ml-0 gap-4 md:gap-2 items-center shrink-0">
      <span className="text-[28px] md:text-5xl font-extrabold">{avgRating.toFixed(1)}</span>

      <div className="flex flex-col items-center gap-1 md:gap-2 leading-tight">
        <div className="flex text-sm md:text-lg">
          {stars.map((isFilled, i) => (
            <span key={`star-${i}`} className={isFilled ? 'text-primary' : 'text-gray-300'}>
              ★
            </span>
          ))}
        </div>
        <span className="text-sm text-gray-400">{reviewCount}개의 후기</span>
      </div>
    </div>
  );
}
