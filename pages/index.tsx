import Image from 'next/image';
import Link from 'next/link';
import landingUiImg1 from '@/assets/landing/landing-ui-1.png';
import landingUiImg2 from '@/assets/landing/landing-ui-2.png';
import landingUiImg3 from '@/assets/landing/landing-ui-3.png';
import Container from '@/components/common/layout/Container';
import Gnb from '@/components/common/layout/Gnb';
import Button from '@/components/common/ui/Button';
import { LandingCarousel } from '@/components/wine/landing/LandingCarousel';
import { mockWineData } from '@/mock/wine.mock';

export default function Home() {
  const wineList = mockWineData.list;
  return (
    <main>
      <section className="bg-zinc-950 text-white pt-5">
        <Container className="mx-auto px-4 relative h-full">
          <Gnb className="bg-transparent m-0 md:m-0 lg:m-0 shadow-none" />

          <h2 className="text-2xl md:text-3xl font-bold mt-12 md:mt-12 lg:mt-24 mx-5 md:mx-10">
            한 곳에서 관리하는
            <br />
            나만의 와인창고
          </h2>
          <LandingCarousel wineList={wineList} />
        </Container>
      </section>
      <Container className="flex flex-col">
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-5 md:gap-8 lg:gap-[140px] py-[60px] lg:py-20">
          <div className="flex flex-col gap-4 items-start w-full lg:w-[238px] shrink-0">
            <h2 className="text-2xl font-semibold text-[#2D3034] leading-8 text-left">
              매달 새롭게 만나는
              <br />
              와인 추천 콘텐츠
            </h2>
            <p className="text-base font-normal text-[#A3A3A3] leading-6 text-left">
              매일 다양한 인기 와인을 만나보세요.
            </p>
          </div>
          <div className="shrink">
            <Image src={landingUiImg1} alt="" width={725} height={470} priority />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row-reverse items-start lg:items-center gap-5 md:gap-8 lg:gap-[140px] py-[60px] lg:py-20">
          <div className="flex flex-col gap-4 items-start w-full lg:w-[238px] shrink-0">
            <h2 className="text-2xl font-semibold text-[#2D3034] leading-8 text-left">
              다양한 필터로 찾는
              <br />내 맞춤 와인
            </h2>
            <p className="text-base font-normal text-[#A3A3A3] leading-6 text-left">
              와인 타입, 가격, 평점으로
              <br />
              나에게 맞는 와인을 쉽게 검색해요.
            </p>
          </div>
          <div className="shrink">
            <Image src={landingUiImg2} alt="" width={725} height={470} />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-5 md:gap-8 lg:gap-[140px] py-[60px] lg:py-20">
          <div className="flex flex-col gap-4 items-start w-full lg:w-[238px] shrink-0">
            <h2 className="text-2xl font-semibold text-[#2D3034] leading-8 text-left">
              직관적인
              <br />
              리뷰 시스템
            </h2>
            <p className="text-base font-normal text-[#A3A3A3] leading-6 text-left">
              더 구체화된 리뷰 시스템으로
              <br />
              쉽고 빠르게 와인 리뷰를 살펴보세요.
            </p>
          </div>
          <div className="shrink">
            <Image src={landingUiImg3} alt="" width={725} height={470} />
          </div>
        </div>
        <div className="flex justify-center pt-0 pb-16 lg:pb-32">
          <Link href="/wines">
            <Button className="w-72 bg-zinc-950 text-lg font-bold cursor-pointer">
              와인 보러가기
            </Button>
          </Link>
        </div>
      </Container>
    </main>
  );
}
