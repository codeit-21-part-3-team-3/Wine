import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Scrollbar, Autoplay } from 'swiper/modules';
import { SwiperOptions } from 'swiper/types';
import { cn } from '@/utils/cn';
import NextImage from 'next/image';
import prevIcon from '@/assets/icon/icon-carousel-prev.svg';
import nextIcon from '@/assets/icon/icon-carousel-next.svg';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';

interface SliderProps {
  type: 'landing' | 'list';
  children: ((props: SliderInjectedProps) => React.ReactNode)[];
  slidesPerView?: number;
  centeredSlides?: boolean;
  spaceBetween?: number;
}

export interface SliderInjectedProps {
  isActive?: boolean;
}

const LANDING_CONFIG: SwiperOptions = {
  loop: true,
  centeredSlides: true,
  autoplay: { delay: 4000, disableOnInteraction: false, pauseOnMouseEnter: true },
  slidesPerView: 2.1,
  spaceBetween: 12,
  breakpoints: {
    768: { slidesPerView: 3, spaceBetween: 24 },
    1200: { slidesPerView: 5, spaceBetween: 20 },
  },
};

const LIST_CONFIG: SwiperOptions = {
  loop: false,
  centeredSlides: false,
  autoplay: false,
  navigation: { nextEl: '.icon-carousel-next', prevEl: '.icon-carousel-prev' },
  scrollbar: { draggable: true, hide: false },
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

export const Slider = ({
  type,
  children,
  slidesPerView,
  centeredSlides,
  spaceBetween,
}: SliderProps) => {
  const isLanding = type === 'landing';
  const baseConfig = isLanding ? LANDING_CONFIG : LIST_CONFIG;
  const currentConfig = {
    ...baseConfig,
    ...(slidesPerView !== undefined && { slidesPerView }),
    ...(centeredSlides !== undefined && { centeredSlides }),
    ...(spaceBetween !== undefined && { spaceBetween }),
  };

  const childrenArray = React.useMemo(() => {
    return Array.isArray(children) ? children : [children];
  }, [children]);

  return (
    <div className="w-full relative overflow-hidden">
      <div
        className={cn(
          'w-full lg:max-w-300 mx-auto px-0 relative py-12 overflow-visible',
          !isLanding && 'px-4 lg:px-12'
        )}
      >
        <Swiper
          modules={[Navigation, Scrollbar, Autoplay]}
          {...currentConfig}
          className={cn('common-swiper overflow-hidden', !isLanding && SCROLLBAR_STYLES)}
        >
          {childrenArray.map((child, index) => (
            <SwiperSlide key={index} className="flex justify-center items-center">
              {({ isActive }) => {
                const slidePadding = isLanding ? 'px-3 md:px-6 py-6 md:py-8 lg:py-10' : 'px-4';
                const animation = isLanding
                  ? isActive
                    ? 'scale-100 lg:scale-110 z-10 opacity-100'
                    : 'scale-90 lg:scale-95 opacity-40'
                  : 'scale-100 opacity-100';

                return (
                  <div
                    className={cn('transition-all duration-500 w-full', slidePadding, animation)}
                  >
                    <div className="w-full mx-auto">
                      {typeof child === 'function'
                        ? (child as (props: SliderInjectedProps) => React.ReactNode)({ isActive })
                        : child}
                    </div>
                  </div>
                );
              }}
            </SwiperSlide>
          ))}
        </Swiper>

        {!isLanding && <NavButtons />}
      </div>
    </div>
  );
};

const NavButtons = () => {
  const btnClass =
    'hidden md:flex items-center justify-center absolute top-1/2 -translate-y-1/2 w-12 h-12 bg-transparent border-none z-50 cursor-pointer p-0';
  return (
    <>
      <button className={cn(btnClass, 'left-[-20px] icon-carousel-prev')} aria-label="이전">
        <NextImage src={prevIcon} alt="" width={48} height={48} className="w-full h-full" />
      </button>
      <button className={cn(btnClass, 'right-[-20px] icon-carousel-next')} aria-label="다음">
        <NextImage src={nextIcon} alt="" width={48} height={48} className="w-full h-full" />
      </button>
    </>
  );
};
