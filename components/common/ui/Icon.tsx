/* eslint-disable @next/next/no-img-element */
import type { ImgHTMLAttributes } from 'react';
import heart from '@/assets/icons/heart.png';
import kebab from '@/assets/icons/kebab-menu.png';
import chevronUp from '@/assets/icons/chevron-up.png';
import chevronDown from '@/assets/icons/chevron-down.png';
import filter from '@/assets/icons/filter.png';
import cancel from '@/assets/icons/cancel.png';

const ICON_MAP = {
  heart,
  kebab,
  filter,
  cancel,
  'chevron-up': chevronUp,
  'chevron-down': chevronDown,
} as const;

export type IconName = keyof typeof ICON_MAP;

interface IconProps extends ImgHTMLAttributes<HTMLImageElement> {
  name: IconName;
  size?: number;
  alt?: string;
}

export default function Icon({ name, size = 32, alt = '', ...props }: IconProps) {
  const src = ICON_MAP[name];

  return <img src={src.src} alt={alt} width={size} height={size} {...props} />;
}
