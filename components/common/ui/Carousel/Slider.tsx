import { useState, ReactNode } from 'react';
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

export interface SliderInjectedProps {
  isActive?: boolean;
}

type SliderChild = ((props: SliderInjectedProps) => ReactNode) | ReactNode;

interface SliderProps extends SwiperOptions {
  children: SliderChild[];
  className?: string;
  showNavigation?: boolean;
  scrollbarStyles?: string;
  itemKeys?: (string | number)[];
}

export const Slider = ({
  children,
  className,
  showNavigation = false,
  scrollbarStyles,
  itemKeys,
  ...swiperConfig
}: SliderProps) => {
  const [prevEl, setPrevEl] = useState<HTMLButtonElement | null>(null);
  const [nextEl, setNextEl] = useState<HTMLButtonElement | null>(null);

  return (
    <div className={cn('w-full relative overflow-hidden', className)}>
      <Swiper
        modules={[Navigation, Scrollbar, Autoplay]}
        {...swiperConfig}
        navigation={{
          prevEl,
          nextEl,
        }}
        observer={true}
        observeParents={true}
        watchSlidesProgress={true}
        className={cn('common-swiper overflow-hidden', scrollbarStyles)}
      >
        {children.map((child, index) => {
          // 1. itemKeys가 있으면 그 값을 쓰고, 없으면 index를 씁니다.
          // 2. Swiper Loop 시 중복 키 에러를 방지하기 위해 prefix를 붙여주는 것이 좋습니다.
          const slideKey = itemKeys ? `slide-${itemKeys[index]}` : `slide-${index}`;

          return (
            <SwiperSlide key={slideKey} className="flex justify-center items-center">
              {swiperProps => (typeof child === 'function' ? child(swiperProps) : child)}
            </SwiperSlide>
          );
        })}
      </Swiper>
      {showNavigation && <NavButtons setPrevEl={setPrevEl} setNextEl={setNextEl} />}
    </div>
  );
};

const NavButtons = ({
  setPrevEl,
  setNextEl,
}: {
  setPrevEl: (el: HTMLButtonElement | null) => void;
  setNextEl: (el: HTMLButtonElement | null) => void;
}) => {
  const btnClass =
    'hidden md:flex items-center justify-center absolute top-1/2 -translate-y-1/2 w-12 h-12 z-50 cursor-pointer p-0 bg-transparent border-none';

  return (
    <>
      <button ref={setPrevEl} className={cn(btnClass, 'left-[-20px]')} aria-label="이전">
        <NextImage src={prevIcon} alt="" width={48} height={48} priority />
      </button>
      <button ref={setNextEl} className={cn(btnClass, 'right-[-20px]')} aria-label="다음">
        <NextImage src={nextIcon} alt="" width={48} height={48} priority />
      </button>
    </>
  );
};
