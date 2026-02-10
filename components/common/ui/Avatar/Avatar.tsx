import { createContext, useContext, useState, useEffect } from 'react';
import Image from 'next/image';

import { cn } from '@/utils/cn';

import type {
  AvatarStatus,
  AvatarContextValue,
  AvatarProps,
  AvatarImageProps,
  AvatarFallbackProps,
} from './types';

const AvatarContext = createContext<AvatarContextValue | null>(null);

const useAvatar = () => {
  const ctx = useContext(AvatarContext);
  if (!ctx) {
    throw new Error('Avatar 컴포넌트 내부에서만 사용');
  }
  return ctx;
};

function Avatar({ children, className, ...props }: AvatarProps) {
  const [status, setStatus] = useState<AvatarStatus>('loading');

  const value = {
    status,
    setStatus,
  };

  return (
    <AvatarContext.Provider value={value}>
      <div
        className={cn(
          'relative flex items-center justify-center overflow-hidden rounded-full w-10 h-10',
          className
        )}
        {...props}
      >
        {children}
      </div>
    </AvatarContext.Provider>
  );
}

function AvatarImage({ src, alt, sizes, className, ...props }: AvatarImageProps) {
  const { status, setStatus } = useAvatar();

  useEffect(() => {
    if (!src) return setStatus('error');

    setStatus('loading');
  }, [src, setStatus]);

  if (status === 'error') return null;

  return (
    <Image
      className={cn('object-cover', className)}
      onError={() => setStatus('error')}
      onLoad={() => setStatus('loaded')}
      src={src}
      alt={alt}
      fill
      sizes={sizes || '40px'}
      {...props}
    />
  );
}

function AvatarFallback({ children, className, ...props }: AvatarFallbackProps) {
  const { status } = useAvatar();
  if (status === 'loaded') return null;

  return (
    <span
      className={cn(
        'bg-muted text-muted-foreground flex size-full items-center justify-center rounded-full text-xs',
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

export { Avatar, AvatarImage, AvatarFallback };
