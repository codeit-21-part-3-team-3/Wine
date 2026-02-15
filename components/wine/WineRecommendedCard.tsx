import { cn } from '@/utils/cn';
import Image from 'next/image';
import { SliderInjectedProps } from '@/components/common/ui/Carousel/Slider';

const CARD_VARIANTS = {
  landing: {
    base: 'bg-transparent border-transparent',
    active: 'bg-zinc-900 shadow-2xl border-1 border-zinc-700',
    title: 'text-zinc-700 text-xs h-8 overflow-hidden break-keep font-medium',
    activeTitle:
      'text-white text-sm lg:text-base leading-tight h-10 lg:h-12 overflow-hidden break-keep',
    sub: 'text-zinc-600 text-xs whitespace-nowrap overflow-hidden h-4',
    activeSub: 'text-zinc-400 text-xs lg:text-sm whitespace-nowrap overflow-hidden h-5',
  },
  list: {
    base: 'overflow-hidden',
    title: 'text-gray-900 text-sm leading-5 h-10 overflow-hidden break-keep mt-4 font-bold',
    sub: 'text-gray-500 text-xs h-5 overflow-hidden whitespace-nowrap mt-1',
  },
} as const;

interface WineRecommendedCardProps extends SliderInjectedProps {
  name: string;
  region: string;
  image: string;
  variant?: 'landing' | 'list';
}

export const WineRecommendedCard = ({
  name,
  region,
  image,
  isActive,
  variant = 'landing',
  ...props
}: WineRecommendedCardProps) => {
  const isLanding = variant === 'landing';
  const isDisplayActive = isLanding && (isActive ?? false);

  const currentStyles = isLanding
    ? {
        card: isDisplayActive ? CARD_VARIANTS.landing.active : CARD_VARIANTS.landing.base,
        title: isDisplayActive ? CARD_VARIANTS.landing.activeTitle : CARD_VARIANTS.landing.title,
        sub: isDisplayActive ? CARD_VARIANTS.landing.activeSub : CARD_VARIANTS.landing.sub,
      }
    : {
        card: CARD_VARIANTS.list.base,
        title: CARD_VARIANTS.list.title,
        sub: CARD_VARIANTS.list.sub,
      };
  let imageStyle = 'scale-100 opacity-100';

  if (isLanding) {
    imageStyle = isDisplayActive ? 'scale-100 opacity-100' : 'scale-90 opacity-80';
  }
  return (
    <div {...props} className="flex flex-col items-center w-full px-2 py-8">
      <div
        className={cn(
          'w-full flex flex-col items-center justify-center transition-[transform,opacity,background-color] duration-700 ease-out',
          'rounded-2xl md:rounded-3xl p-4 md:p-8',
          isLanding && (isDisplayActive ? 'scale-110 opacity-100' : 'scale-90 opacity-40'),
          currentStyles.card
        )}
      >
        <div className={cn('relative w-full overflow-hidden', 'h-40 md:h-56')}>
          <Image
            src={image}
            alt={name}
            fill
            sizes="(max-width: 768px) 100vw, 300px"
            className={cn('object-contain transition-transform duration-700', imageStyle)}
          />
        </div>

        <div className="mt-8 text-center">
          <h3 className={cn('transition-colors duration-500', currentStyles.title)}>{name}</h3>
          <p className={cn('mt-1 transition-colors duration-500', currentStyles.sub)}>{region}</p>
        </div>
      </div>
    </div>
  );
};
