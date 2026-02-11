import { cn } from '@/utils/cn';
import type { ComponentPropsWithoutRef } from 'react';
import type { IconName } from './Icon';
import Icon from './Icon';

interface IconButtonProps extends ComponentPropsWithoutRef<'button'> {
  icon: IconName;
  alt?: string;
  size?: number;
}

export default function IconButton({
  icon,
  alt,
  size,
  className,
  type = 'button',
  ...props
}: IconButtonProps) {
  return (
    <button
      type={type}
      aria-label={alt}
      className={cn(
        'inline-flex items-center justify-center cursor-pointer rounded-md transition hover:opacity-80 disabled:opacity-50',
        className
      )}
      {...props}
    >
      <Icon name={icon} size={size} alt={alt ?? ''} />
    </button>
  );
}
