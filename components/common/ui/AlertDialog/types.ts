import type { ReactNode, Dispatch, SetStateAction, MouseEventHandler } from 'react';

export interface AlertDialogContextValue {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export interface AlertDialogProps {
  children: ReactNode;
  open?: boolean;
  onOpenChange?: Dispatch<SetStateAction<boolean>>;
}

export interface AlertDialogTriggerProps {
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export interface AlertDialogContentProps {
  children: ReactNode;
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export interface AlertDialogActionProps {
  children: ReactNode;
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}
