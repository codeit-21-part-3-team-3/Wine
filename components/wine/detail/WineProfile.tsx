import Image from 'next/image';
import { AROMA_META } from '@/constants/aromaMap';
import TasteItem, { TASTES } from '@/components/common/ui/TasteItem';
import { GetWineDetailResponse } from '@/lib/api/wine/wine.types';
import { getTasteValueByLabel } from '@/utils/tasteValue';
import { calculateAveragePalate } from '@/utils/winePalate';

interface WineProfileProps {
  wine: GetWineDetailResponse & { aromas: string[] };
}

export default function WineProfile({ wine }: WineProfileProps) {
  const { reviewCount, reviews = [] } = wine;
  const averagePalate = calculateAveragePalate(reviews);
  const allAromas = reviews.flatMap(review => review.aroma || []);
  const uniqueAromas = Array.from(new Set(allAromas));
  const displayAromas = uniqueAromas
    .map((aromaName: string) => {
      const key = aromaName.toUpperCase() as keyof typeof AROMA_META;
      return AROMA_META[key];
    })
    .filter((aroma): aroma is (typeof AROMA_META)[keyof typeof AROMA_META] => !!aroma);

  return (
    <section className="flex flex-col lg:flex-row gap-y-12 lg:gap-y-0 lg:gap-x-20 py-6 md:py-10 lg:py-20 border-b border-border">
      <div className="flex-1">
        <div className="flex flex-col md:grid md:grid-cols-[200px_1fr] lg:flex lg:flex-col md:gap-x-10">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-end w-full mb-4 md:mb-0 lg:mb-6">
            <h3 className="text-2xl font-bold">어떤 맛이 나나요?</h3>
            <span className="text-sm text-muted-foreground mt-1">({reviewCount}명 참여)</span>
          </div>
          <div className="flex flex-col gap-5">
            {TASTES.map(name => (
              <TasteItem
                key={`detail-${name}`}
                taste={name}
                value={getTasteValueByLabel(averagePalate, name)}
                showDivider
              />
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1">
        <div className="flex flex-col md:grid md:grid-cols-[200px_1fr] lg:flex lg:flex-col md:gap-x-10">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-end w-full mb-4 md:mb-0 lg:mb-6">
            <h3 className="text-2xl font-bold">어떤 향이 나나요?</h3>
            <span className="text-sm text-muted-foreground mt-1">({reviewCount}명 참여)</span>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-4 gap-x-4 lg:gap-x-6">
            {displayAromas.slice(0, 4).map((aroma, index) => (
              <div
                key={aroma.label}
                className={`flex flex-col items-center gap-3 ${index === 3 ? 'hidden md:flex' : 'flex'}`}
              >
                <div className="relative aspect-square w-full rounded-[20px] overflow-hidden">
                  <Image src={aroma.image} alt="" fill className="object-cover" />
                </div>
                <span className="text-base font-medium text-[#31302F]">{aroma.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
