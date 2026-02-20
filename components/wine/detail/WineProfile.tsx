import Image from 'next/image';
import { AROMA_META } from '@/constants/aromaMap';
import TasteItem, { TASTES, Taste } from '@/components/common/ui/TasteItem';
import { MOCK_WINE_DETAIL } from '@/mock/wineDetail.mock';

//ui 확인용 테스트 데이터
const displayAromas = [
  AROMA_META.CHERRY,
  AROMA_META.ORANGE,
  AROMA_META.CHOCOLATE,
  AROMA_META.OAKBARREL,
];

// 임시! 데이터 연결시 따로 파일분리 예정
const getTasteValue = (tasteName: Taste, data: typeof MOCK_WINE_DETAIL.tastes) => {
  switch (tasteName) {
    case '바디감':
      return data.body;
    case '탄닌':
      return data.tannin;
    case '당도':
      return data.sweetness;
    case '산미':
      return data.acidity;
    default:
      return 0;
  }
};

export default function WineProfile() {
  const { tastes: wineTastes, reviewCount } = MOCK_WINE_DETAIL;
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
                value={getTasteValue(name, wineTastes)}
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
        </div>
        <div className="grid grid-cols-4 gap-x-4 lg:gap-x-6">
          {displayAromas.map(aroma => (
            <div key={aroma.label} className="flex flex-col items-center gap-3">
              <div className="relative aspect-square w-full rounded-[20px] overflow-hidden">
                <Image src={aroma.image} alt={aroma.label} fill className="object-cover" />
              </div>
              <span className="text-base font-medium text-[#31302F]">{aroma.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
