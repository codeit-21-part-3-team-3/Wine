import type { ReactNode, Dispatch, SetStateAction, MouseEventHandler } from 'react';

export interface DialogContextValue {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export interface DialogProps {
  children: ReactNode;
  open?: boolean;
  onOpenChange?: Dispatch<SetStateAction<boolean>>;
}

export interface DialogTriggerProps {
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export interface DialogContentProps {
  children: ReactNode;
  className?: string;
}
