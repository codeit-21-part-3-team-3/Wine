import { Slider } from '@/components/common/ui/Carousel/Slider';
import { WineRecommendedCard } from '@/components/wine/WineRecommendedCard';

interface LandingCarouselProps {
  wineList: Array<{
    id: number;
    name: string;
    region: string;
    image: string;
  }>;
}

export const LandingCarousel = ({ wineList }: LandingCarouselProps) => {
  return (
    <section className="w-full bg-zinc-950">
      <div className="w-full overflow-visible">
        <Slider type="landing" centeredSlides={true}>
          {wineList.map(wine => {
            const renderCard = ({ isActive }: { isActive?: boolean }) => (
              <WineRecommendedCard
                key={wine.id}
                name={wine.name}
                region={wine.region}
                image={wine.image}
                isActive={isActive ?? false}
                variant="landing"
              />
            );
            return renderCard;
          })}
        </Slider>
      </div>
    </section>
  );
};
