import Container from '@/components/common/layout/Container';
import Gnb from '@/components/common/layout/Gnb';
import { GetWineDetailResponse } from '@/lib/api/wine/wine.types';
import Image from 'next/image';

interface HeroSectionProps {
  wine: GetWineDetailResponse;
}

export default function HeroSection({ wine }: HeroSectionProps) {
  return (
    <div className="pt-px text-white overflow-hidden">
      <Gnb />

      <Container>
        {/* 데이터연동을 위해 임시로 넣은 것 지현이 작업중 */}
        <section className="bg-gray-900 lg:py-12 flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
          <div className="relative w-full max-w-[300px] h-[400px]">
            {wine.image && !wine.image.includes('placeholder') ? (
              <Image src={wine.image} alt={wine.name} fill className="object-contain" priority />
            ) : (
              <div className="w-full h-full bg-gray-800 flex flex-col items-center justify-center text-gray-400">
                <span>이미지 준비 중</span>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-4 text-center lg:text-left">
            <div className="flex flex-col gap-2">
              <span className="text-purple-400 font-medium tracking-wider uppercase text-sm">
                {wine.region}
              </span>
              <h1 className="text-4xl lg:text-5xl font-bold leading-tight">{wine.name}</h1>
            </div>

            <div className="mt-4">
              <span className="text-3xl font-bold">₩ {wine.price.toLocaleString()}</span>
            </div>
          </div>
        </section>
      </Container>
    </div>
  );
}
