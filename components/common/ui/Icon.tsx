import type { ImgHTMLAttributes } from 'react';
import heart from '@/assets/icons/heart.png';
import kebab from '@/assets/icons/kebab-menu.png';
import chevronUp from '@/assets/icons/chevron-up.png';
import chevronDown from '@/assets/icons/chevron-down.png';
import filter from '@/assets/icons/filter.png';
import camera from '@/assets/icons/camera.png';

const ICON_MAP = {
  heart,
  kebab,
  filter,
  camera,
  'chevron-up': chevronUp,
  'chevron-down': chevronDown,
} as const;

export type IconName = keyof typeof ICON_MAP;

interface IconProps extends ImgHTMLAttributes<HTMLImageElement> {
  name: IconName;
  size?: number;
}

export default function Icon({ name, size = 32, ...props }: IconProps) {
  const src = ICON_MAP[name];

  return <img src={src.src} width={size} height={size} {...props} />;
}
