import { Slider } from '@/components/common/ui/Slider';
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
      <Slider {...LANDING_PRESET} itemKeys={wineList.map(wine => wine.id)}>
        {wineList.map(wine => {
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
