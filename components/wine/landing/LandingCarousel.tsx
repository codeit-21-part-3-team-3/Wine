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
    <section className="relative w-full bg-white">
      <div
        className="relative w-full bg-zinc-950 
               after:content-[''] after:absolute after:bottom-0 after:left-1/2 
                after:-translate-x-1/2 after:translate-y-[20px] 
                after:bg-zinc-950 after:z-0
                after:shadow-[0_15px_30px_-5px_rgba(0,0,0,0.3)]
                after:w-[220px] after:h-[60px] after:rounded-b-[40px]
                md:after:w-[345px] md:after:h-[80px] md:after:translate-y-[30px] md:after:rounded-b-[60px]
                lg:after:w-[400px] lg:after:h-[100px]"
      >
        <div className="relative z-10">
          {' '}
          {/* 여백 조절용 */}
          <Slider {...LANDING_PRESET} itemKeys={wineList.map(wine => wine.id)}>
            {wineList.map(wine => {
              return function SliderItem({ isActive }: { isActive?: boolean }) {
                return (
                  <div className="relative flex justify-center items-center">
                    {/* 실제 와인 카드 */}
                    <div className="relative z-10 w-full">
                      <WineRecommendedCard
                        name={wine.name}
                        region={wine.region}
                        image={wine.image}
                        isActive={isActive}
                        variant="landing"
                      />
                    </div>
                  </div>
                );
              };
            })}
          </Slider>
        </div>
      </div>
    </section>
  );
};
