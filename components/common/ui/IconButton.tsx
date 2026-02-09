import { cn } from '@/utils/cn';
import type { StaticImageData } from 'next/image';
import type { ComponentPropsWithoutRef } from 'react';

interface IconButtonProps extends ComponentPropsWithoutRef<'button'> {
  icon: StaticImageData;
  alt: string;
}

export default function IconButton({
  icon,
  alt,
  className,
  type = 'button',
  ...props
}: IconButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        'inline-flex items-center justify-center rounded-md transition hover:opacity-80 disabled:opacity-50',
        className
      )}
      {...props}
    >
      <img src={icon.src} alt={alt} width={32} height={32} />
    </button>
  );
}
