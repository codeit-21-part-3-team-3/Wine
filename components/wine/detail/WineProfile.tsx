import TasteItem, { TASTES } from '@/components/common/ui/TasteItem';
import { GetWineDetailResponse } from '@/lib/api/wine/wine.types';
import { getTasteValueByLabel } from '@/utils/tasteValue';
import { calculateAveragePalate } from '@/utils/winePalate';

interface WineProfileProps {
  wine: GetWineDetailResponse;
}
export default function WineProfile({ wine }: WineProfileProps) {
  const { reviewCount } = wine;
  const averagePalate = calculateAveragePalate(wine.reviews);

  // 임시로 보여줄 향기 리스트
  const TEMP_AROMAS = ['과일', '오크', '바닐라'];
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

          <div className="flex flex-wrap gap-2 mt-4">
            {TEMP_AROMAS.map(item => (
              <span
                key={item}
                className="inline-flex items-center px-4 py-2 rounded-full bg-gray-100 text-gray-700 text-sm border border-gray-200"
              >
                {item}
              </span>
            ))}
            {/* ui작업중  */}
          </div>
        </div>
      </div>
    </section>
  );
}
