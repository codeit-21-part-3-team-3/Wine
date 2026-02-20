import { createContext, useContext, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import Button from '../Button';

import type { ReactPortal, PropsWithChildren, MouseEvent, SetStateAction } from 'react';
import type {
  DialogContextValue,
  DialogProps,
  DialogTriggerProps,
  DialogContentProps,
} from './types';

import { cn } from '@/utils/cn';

const DialogContext = createContext<DialogContextValue | null>(null);

const useDialog = () => {
  const ctx = useContext(DialogContext);
  if (!ctx) {
    throw new Error('Dialog 컴포넌트 내부에서만 사용');
  }
  return ctx;
};

const useDialogState = () => {
  const [open, setOpen] = useState(false);

  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(false);

  return { open, onOpenChange: setOpen, onOpen, onClose };
};

function Dialog({ children, open: controlledOpen, onOpenChange }: DialogProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);

  const isOpen = controlledOpen !== undefined ? controlledOpen : uncontrolledOpen;

  const handleOpenChange = (value: SetStateAction<boolean>) => {
    if (controlledOpen !== undefined) {
      onOpenChange?.(value);
    } else {
      setUncontrolledOpen(value);
    }
  };

  const value = {
    open: isOpen,
    setOpen: handleOpenChange,
  };

  return <DialogContext.Provider value={value}>{children}</DialogContext.Provider>;
}

function DialogTrigger({ children, onClick }: DialogTriggerProps) {
  const { setOpen } = useDialog();

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    onClick?.(e);
    setOpen(true);
  };

  return <Button onClick={handleClick}>{children}</Button>;
}

function DialogPortal({ children }: PropsWithChildren): ReactPortal | null {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return createPortal(children, document.body);
}

function DialogClose({ children, className }: DialogContentProps) {
  const { setOpen } = useDialog();
  return (
    <Button className={cn('', className)} onClick={() => setOpen(false)}>
      {children}
    </Button>
  );
}

function DialogOverlay() {
  const { setOpen } = useDialog();
  return <div className="fixed inset-0 isolate z-50 bg-black/50" onClick={() => setOpen(false)} />;
}

function DialogContent({ children, className }: DialogContentProps) {
  const { open } = useDialog();
  if (!open) return null;

  return (
    <DialogPortal>
      <DialogOverlay />
      <div
        className={cn(
          'fixed z-50 bg-white shadow-lg transition-all flex flex-col',
          'bottom-0 left-0 right-0 w-full rounded-t-[20px] max-h-[90vh]',
          'md:top-1/2 md:left-1/2 md:bottom-auto md:w-full md:max-w-md md:-translate-x-1/2 md:-translate-y-1/2 md:rounded-[12px] md:max-h-[85vh]',
          className
        )}
      >
        <div className="mx-auto my-3 h-1.5 w-20 rounded-full bg-gray-300 md:hidden" />
        {children}
      </div>
    </DialogPortal>
  );
}

function DialogHeader({ children, className }: DialogContentProps) {
  return <div className={cn('flex flex-col gap-2 p-4', className)}>{children}</div>;
}

function DialogBody({ children, className }: DialogContentProps) {
  return <div className={cn('flex-1 overflow-y-auto p-4', className)}>{children}</div>;
}

function DialogFooter({ children, className }: DialogContentProps) {
  return <div className={cn('flex flex-col gap-2 p-4', className)}>{children}</div>;
}

function DialogTitle({ children, className }: DialogContentProps) {
  return <h2 className={cn('text-lg font-semibold', className)}>{children}</h2>;
}

function DialogDescription({ children, className }: DialogContentProps) {
  return <p className={cn('text-sm text-gray-600', className)}>{children}</p>;
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogBody,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
  useDialogState,
  useDialog,
};
