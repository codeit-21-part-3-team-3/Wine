import { Slider } from '@/components/common/ui/Carousel/Slider';
import { WineRecommendedCard } from '@/components/wine/WineRecommendedCard';
import { SwiperOptions } from 'swiper/types';

interface Wine {
  id: number;
  name: string;
  region: string;
  image: string;
}

interface LandingCarouselProps {
  wineList: Wine[];
}

const LANDING_PRESET: SwiperOptions = {
  loop: true,
  centeredSlides: true,
  slidesPerView: 2.5,
  spaceBetween: 10,
  autoplay: {
    delay: 4000,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
  },
  breakpoints: {
    768: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
    1200: {
      slidesPerView: 5,
      spaceBetween: 30,
    },
  },
};

export const LandingCarousel = ({ wineList }: LandingCarouselProps) => {
  if (!wineList || wineList.length === 0) return null;

  return (
    <section className="w-full bg-zinc-950">
      <Slider
        {...LANDING_PRESET}
        // ✅ Slider 내부에서 SwiperSlide의 key를 결정하는 유일한 통로
        itemKeys={wineList.map(wine => wine.id)}
      >
        {wineList.map(wine => {
          /** * ✅ 멘토님 가이드:
           * 여기서 반환하는 함수는 Slider 내부의 SwiperSlide 자식으로 들어갑니다.
           * Slider가 이미 부모 레벨(SwiperSlide)에서 key를 쥐고 있으므로 여기선 key가 필요 없습니다.
           */
          return function SliderItem({ isActive }: { isActive?: boolean }) {
            return (
              <WineRecommendedCard
                name={wine.name}
                region={wine.region}
                image={wine.image}
                isActive={isActive}
                variant="landing"
              />
            );
          };
        })}
      </Slider>
    </section>
  );
};
