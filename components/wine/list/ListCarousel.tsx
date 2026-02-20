import { cn } from '@/utils/cn';
import { Wine } from '@/types/domain/wine';
import { Slider } from '@/components/common/ui/Slider';
import { WineRecommendedCard } from '@/components/wine/WineRecommendedCard';
import { SwiperOptions } from 'swiper/types';

interface ListCarouselProps {
  wineList: Wine[];
}

const LIST_PRESET: SwiperOptions = {
  loop: false,
  centeredSlides: false,
  autoplay: false,
  scrollbar: {
    draggable: true,
    hide: false,
  },
  slidesPerView: 2,
  spaceBetween: 12,
  breakpoints: {
    768: { slidesPerView: 3, spaceBetween: 24 },
    1200: { slidesPerView: 4, spaceBetween: 20 },
  },
};

const SCROLLBAR_STYLES = cn(
  '[&_.swiper-scrollbar]:max-md:block [&_.swiper-scrollbar]:hidden',
  '[&_.swiper-scrollbar]:relative [&_.swiper-scrollbar]:mt-[30px] [&_.swiper-scrollbar]:mx-auto',
  '[&_.swiper-scrollbar]:w-[80%] [&_.swiper-scrollbar]:bg-black/10 [&_.swiper-scrollbar]:h-1',
  '[&_.swiper-scrollbar-drag]:bg-black'
);

export const ListCarousel = ({ wineList }: ListCarouselProps) => {
  return (
    <section className="w-full max-w-300 lg:m-auto">
      <Slider
        {...LIST_PRESET}
        itemKeys={wineList.map(wine => wine.id)}
        showNavigation={true}
        scrollbarStyles={SCROLLBAR_STYLES}
      >
        {wineList.map(wine => (
          <div key={wine.id} className="flex flex-col group w-full">
            <WineRecommendedCard wine={wine} isActive={false} variant="list" />
          </div>
        ))}
      </Slider>
    </section>
  );
};
