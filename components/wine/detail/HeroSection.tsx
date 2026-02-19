import Container from '@/components/common/layout/Container';
import Gnb from '@/components/common/layout/Gnb';
import Image from 'next/image';
import wineRed from '@/assets/detailwine/wine-red.png';
import { mockWineData } from '@/mock/wine.mock';

export default function HeroSection() {
  const wine = mockWineData.list[0];

  return (
    <div className="bg-gray-50 pt-px lg:rounded-b-[88px]">
      <Gnb />
      <Container className="flex-1 flex items-center justify-center">
        <section className="py-8 lg:py-0 flex flex-col lg:flex-row items-center gap-6 lg:gap-[48px] w-full">
          <div className="relative w-full lg:w-[460px] h-[300px] lg:h-[450px] flex items-center justify-center">
            <Image src={wine.image} alt={wine.name} fill className="object-contain" priority />
          </div>

          <div className="flex flex-col w-full lg:w-auto items-start">
            <div className="flex items-center gap-4 mb-[14px]">
              <div className="flex text-[16px] md:text-[20px] lg:text-[28px]">
                {[1, 2, 3, 4, 5].map(num => (
                  <span
                    key={num}
                    className={num <= Math.floor(wine.avgRating) ? 'text-primary' : 'text-gray-300'}
                  >
                    ★
                  </span>
                ))}
              </div>
              <span className="text-base font-normal text-gray-400">
                {wine.reviewCount.toLocaleString()}개의 후기
              </span>
            </div>

            <h1 className="text-2xl lg:text-[40px] font-bold text-gray-900 leading-tight mb-[14px]">
              {wine.name}
            </h1>
            <p className="text-base lg:text-lg font-normal text-gray-400 mb-6 lg:mb-8">
              {wine.region}
            </p>
            <div className="text-2xl lg:text-[32px] font-bold text-gray-900 w-full lg:text-right lg:pr-10">
              {wine.price.toLocaleString()}원
            </div>
          </div>
        </section>
      </Container>
    </div>
  );
}
