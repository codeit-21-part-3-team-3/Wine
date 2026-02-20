import { cn } from '@/utils/cn';
import { Wine } from '@/types/domain/wine';
import Image from 'next/image';
import { HTMLAttributes } from 'react';

interface WineRecommendedCardProps extends HTMLAttributes<HTMLDivElement> {
  wine: Wine;
  isActive?: boolean;
  variant?: 'landing' | 'list';
}

const CARD_VARIANTS = {
  landing: {
    base: 'bg-transparent border-transparent',
    active: 'bg-zinc-900 shadow-2xl border-1 border-zinc-700',
    title: 'text-zinc-700 text-xs min-h-[32px] line-clamp-2 break-keep font-medium mb-1',
    activeTitle:
      'ext-white text-sm lg:text-base leading-tight min-h-[38px] lg:min-h-[48px] line-clamp-2 break-keep mb-1',
    sub: 'text-zinc-600 text-xs whitespace-nowrap overflow-hidden h-4',
    activeSub:
      'text-zinc-400 text-[10px] lg:text-sm whitespace-nowrap overflow-hidden text-ellipsis h-5',
  },
  list: {
    base: 'overflow-hidden',
    title: 'text-gray-900 text-basic leading-5 h-10 overflow-hidden break-keep mt-4 font-bold',
    sub: 'text-gray-500 text-sm h-5 overflow-hidden whitespace-nowrap mt-1',
  },
} as const;

export const WineRecommendedCard = ({
  wine,
  isActive,
  variant = 'landing',
  className,
  ...props
}: WineRecommendedCardProps) => {
  const { name, region, image } = wine;
  const isDisplayActive = variant === 'landing' && (isActive ?? false);

  const STYLES = {
    landing: {
      active: {
        card: CARD_VARIANTS.landing.active,
        title: CARD_VARIANTS.landing.activeTitle,
        sub: CARD_VARIANTS.landing.activeSub,
        container: 'scale-100 lg:scale-110 z-10 opacity-100',
        image: 'scale-100 opacity-100',
        padding: 'px-3 md:px-6 py-6 md:py-8 lg:py-10',
      },
      base: {
        card: CARD_VARIANTS.landing.base,
        title: CARD_VARIANTS.landing.title,
        sub: CARD_VARIANTS.landing.sub,
        container: 'scale-90 lg:scale-95 opacity-40',
        image: 'scale-90 opacity-80',
        padding: 'px-3 md:px-6 py-6 md:py-8 lg:py-10',
      },
    },
    list: {
      base: {
        card: CARD_VARIANTS.list.base,
        title: CARD_VARIANTS.list.title,
        sub: CARD_VARIANTS.list.sub,
        container: 'scale-100 opacity-100',
        image: 'scale-100 opacity-100',
        padding: 'px-4 py-8',
      },
    },
  } as const;

  const currentStyles =
    variant === 'landing'
      ? isDisplayActive
        ? STYLES.landing.active
        : STYLES.landing.base
      : STYLES.list.base;

  return (
    <div
      {...props}
      className={cn(
        'flex flex-col items-center w-full transition-all duration-500 ease-out',
        currentStyles.padding,
        currentStyles.container,
        className
      )}
    >
      <div
        className={cn(
          'w-full flex flex-col items-center justify-center transition-all duration-700 ease-out rounded-2xl md:rounded-3xl p-4 md:p-8',
          currentStyles.card
        )}
      >
        <div className={cn('relative w-full overflow-hidden h-40 md:h-56')}>
          <Image
            src={image}
            alt={name}
            fill
            sizes="(max-width: 768px) 100vw, 300px"
            className={cn('object-contain transition-transform duration-700', currentStyles.image)}
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
