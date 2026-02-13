import { Slider } from './Slider';
import { WineRecommendedCard } from '@/components/wine/WineRecommendedCard';

interface ListCarouselProps {
  wineList: Array<{
    id: number;
    name: string;
    region: string;
    image: string;
  }>;
}

export const ListCarousel = ({ wineList }: ListCarouselProps) => {
  return (
    <section className="w-full py-24">
      <div className="w-full">
        <Slider type="list">
          {wineList.map((wine, idx) => {
            const RenderItem = () => (
              <div key={`${wine.id}-${idx}`} className="flex flex-col group">
                <WineRecommendedCard
                  isActive={false}
                  name={wine.name}
                  region={wine.region}
                  image={wine.image}
                  variant="list"
                />
              </div>
            );
            return RenderItem;
          })}
        </Slider>
      </div>
    </section>
  );
};
