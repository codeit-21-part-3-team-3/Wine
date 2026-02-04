import type {
  ComponentPropsWithoutRef,
  ReactNode,
  Dispatch,
  SetStateAction,
  RefObject,
} from 'react';

export type AvatarStatus = 'loading' | 'loaded' | 'error';

export interface AvatarContextValue {
  status: AvatarStatus;
  setStatus: Dispatch<SetStateAction<AvatarStatus>>;
  imageRegisterRef: RefObject<boolean>;
}

export type AvatarProps = ComponentPropsWithoutRef<'span'> & {
  children?: ReactNode;
};

export type AvatarImageProps = Omit<ComponentPropsWithoutRef<'img'>, 'children'> & {
  src: string;
  alt?: string;
};

export type AvatarFallbackProps = ComponentPropsWithoutRef<'span'> & {
  children?: ReactNode;
};
