import Image from 'next/image';
import { AROMA_META } from '@/constants/aromaMap';

export default function WineProfile() {
  //ui 확인용 테스트 데이터
  const displayAromas = [
    AROMA_META.CHERRY,
    AROMA_META.ORANGE,
    AROMA_META.CHOCOLATE,
    AROMA_META.OAKBARREL,
  ];

  return (
    <section className="flex flex-col lg:flex-row gap-y-12 lg:gap-y-0 lg:gap-x-20 py-6 md:py-10 lg:py-20 border-b border-border">
      <div className="flex-1 space-y-8">
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-end gap-0 lg:gap-0 mb-6">
          <h3 className="text-2xl font-bold">어떤 맛이 나나요?</h3>
          <span className="text-sm text-muted-foreground">(417명 참여)</span>
        </div>
      </div>
      <div className="flex-1 space-y-8">
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-end gap-0 lg:gap-0 mb-6">
          <h3 className="text-2xl font-bold">어떤 향이 나나요?</h3>
          <span className="text-sm text-muted-foreground">(417명 참여)</span>
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
