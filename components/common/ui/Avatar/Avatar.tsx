import { createContext, useContext, useState, useEffect } from 'react';

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

function Avatar({ children, ...props }: AvatarProps) {
  const [status, setStatus] = useState<AvatarStatus>('loading');

  const value = {
    status,
    setStatus,
  };

  return (
    <AvatarContext.Provider value={value}>
      <span {...props}>{children}</span>
    </AvatarContext.Provider>
  );
}

function AvatarImage({ src, alt, ...props }: AvatarImageProps) {
  const { status, setStatus } = useAvatar();

  useEffect(() => {
    let cancelled = false;

    setStatus('loading');

    const img = new Image();

    img.onload = () => {
      if (!cancelled) setStatus('loaded');
    };

    img.onerror = () => {
      if (!cancelled) setStatus('error');
    };

    img.src = src;

    return () => {
      cancelled = true;
    };
  }, [src, setStatus]);

  if (status !== 'loaded') return null;

  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={alt} {...props} />;
}

function AvatarFallback({ children, ...props }: AvatarFallbackProps) {
  const { status } = useAvatar();
  if (status === 'loaded') return null;

  return <span {...props}>{children}</span>;
}

export { Avatar, AvatarImage, AvatarFallback };
