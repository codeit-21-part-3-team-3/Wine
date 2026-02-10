import type { ComponentPropsWithoutRef, ReactNode, Dispatch, SetStateAction } from 'react';
import type Image from 'next/image';

export type AvatarStatus = 'loading' | 'loaded' | 'error';

export interface AvatarContextValue {
  status: AvatarStatus;
  setStatus: Dispatch<SetStateAction<AvatarStatus>>;
}

export type AvatarProps = ComponentPropsWithoutRef<'div'> & {
  className?: string;
  children?: ReactNode;
};

export type AvatarImageProps = ComponentPropsWithoutRef<typeof Image> & {
  alt?: string;
  className?: string;
  sizes?: string;
};

export type AvatarFallbackProps = ComponentPropsWithoutRef<'span'> & {
  children?: ReactNode;
  className?: string;
};
