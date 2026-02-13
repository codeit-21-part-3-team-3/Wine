import { cn } from '@/utils/cn';
import Image from 'next/image';
import landingUiImg1 from '@/assets/landing/landing-ui-1.png';
import landingUiImg2 from '@/assets/landing/landing-ui-2.png';
import landingUiImg3 from '@/assets/landing/landing-ui-3.png';

export default function Home() {
  const TITLE_STYLE = 'text-[24px] font-semibold text-[#2D3034] leading-[32px] text-left';
  const DESC_STYLE = 'text-[16px] font-normal text-[#A3A3A3] leading-[24px] text-left';
  const TEXT_GROUP_STYLE = 'flex flex-col gap-[16px] items-start w-full lg:w-[238px] shrink-0';
  const SECTION_CONTAINER =
    'flex flex-col lg:flex-row items-start lg:items-center ' +
    'gap-[20px] md:gap-[32px] lg:gap-[140px] ' +
    'py-[60px] lg:py-[80px] max-w-[1140px] mx-auto pl-6';

  return (
    <div>
      <h1>Codeit Wine</h1>

      <section className="flex flex-col">
        <div className={SECTION_CONTAINER}>
          <div className={TEXT_GROUP_STYLE}>
            <p className={TITLE_STYLE}>
              매달 새롭게 만나는
              <br />
              와인 추천 콘텐츠
            </p>
            <p className={DESC_STYLE}>매일 다양한 인기 와인을 만나보세요.</p>
          </div>
          <div className="flex-shrink-1">
            <Image src={landingUiImg1} alt="추천 콘텐츠" width={725} height={470} priority />
          </div>
        </div>

        <div className={cn(SECTION_CONTAINER, 'lg:flex-row-reverse')}>
          <div className={TEXT_GROUP_STYLE}>
            <p className={TITLE_STYLE}>
              다양한 필터로 찾는
              <br />내 맞춤 와인
            </p>
            <p className={DESC_STYLE}>
              와인 타입, 가격, 평점으로
              <br />
              나에게 맞는 와인을 쉽게 검색해요.
            </p>
          </div>
          <div className="flex-shrink-1">
            <Image src={landingUiImg2} alt="필터 검색" width={725} height={470} />
          </div>
        </div>

        <div className={SECTION_CONTAINER}>
          <div className={TEXT_GROUP_STYLE}>
            <p className={TITLE_STYLE}>
              직관적인
              <br />
              리뷰 시스템
            </p>
            <p className={DESC_STYLE}>
              더 구체화된 리뷰 시스템으로
              <br />
              쉽고 빠르게 와인 리뷰를 살펴보세요.
            </p>
          </div>
          <div className="flex-shrink-1">
            <Image src={landingUiImg3} alt="리뷰 시스템" width={725} height={470} />
          </div>
        </div>
      </section>
    </div>
  );
}
