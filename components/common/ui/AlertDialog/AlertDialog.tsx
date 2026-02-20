import { createContext, useContext, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import Button from '../Button';

import type { ReactPortal, PropsWithChildren, MouseEvent, SetStateAction } from 'react';
import type {
  AlertDialogContextValue,
  AlertDialogProps,
  AlertDialogTriggerProps,
  AlertDialogContentProps,
  AlertDialogActionProps,
} from './types';

import { cn } from '@/utils/cn';

const AlertDialogContext = createContext<AlertDialogContextValue | null>(null);

const useAlertDialog = () => {
  const ctx = useContext(AlertDialogContext);
  if (!ctx) {
    throw new Error('AlertDialog 컴포넌트 내부에서만 사용');
  }
  return ctx;
};

const useAlertDialogState = () => {
  const [open, setOpen] = useState(false);

  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(false);

  return { open, onOpenChange: setOpen, onOpen, onClose };
};

function AlertDialog({ children, open: controlledOpen, onOpenChange }: AlertDialogProps) {
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

  return <AlertDialogContext.Provider value={value}>{children}</AlertDialogContext.Provider>;
}

function AlertDialogTrigger({ children, onClick }: AlertDialogTriggerProps) {
  const { setOpen } = useAlertDialog();

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    onClick?.(e);
    setOpen(true);
  };

  return <Button onClick={handleClick}>{children}</Button>;
}

function AlertDialogPortal({ children }: PropsWithChildren): ReactPortal | null {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return createPortal(children, document.body);
}

function AlertDialogOverlay() {
  return <div className="fixed inset-0 isolate z-50 bg-black/50" />;
}

function AlertDialogContent({ children, className }: AlertDialogContentProps) {
  const { open } = useAlertDialog();
  if (!open) return null;

  return (
    <AlertDialogPortal>
      <AlertDialogOverlay />
      <div
        className={cn(
          'fixed z-50 bg-white shadow-lg transition-all flex flex-col',
          'left-1/2 top-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-[12px]',
          className
        )}
      >
        {children}
      </div>
    </AlertDialogPortal>
  );
}

function AlertDialogHeader({ children, className }: AlertDialogContentProps) {
  return <div className={cn('flex flex-col gap-2 p-6', className)}>{children}</div>;
}

function AlertDialogFooter({ children, className }: AlertDialogContentProps) {
  return (
    <div className={cn('flex flex-col-reverse gap-2 p-6 sm:flex-row sm:justify-end', className)}>
      {children}
    </div>
  );
}

function AlertDialogTitle({ children, className }: AlertDialogContentProps) {
  return <h2 className={cn('text-lg font-semibold', className)}>{children}</h2>;
}

function AlertDialogDescription({ children, className }: AlertDialogContentProps) {
  return <p className={cn('text-sm text-gray-600', className)}>{children}</p>;
}

function AlertDialogCancel({ children, className, onClick }: AlertDialogContentProps) {
  const { setOpen } = useAlertDialog();
  return (
    <Button
      className={cn('', className)}
      onClick={e => {
        onClick?.(e);
        setOpen(false);
      }}
    >
      {children}
    </Button>
  );
}

function AlertDialogAction({ children, className, onClick }: AlertDialogActionProps) {
  const { setOpen } = useAlertDialog();

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    onClick?.(e);
    setOpen(false);
  };

  return (
    <Button className={cn('', className)} onClick={handleClick}>
      {children}
    </Button>
  );
}

export {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
  useAlertDialogState,
  useAlertDialog,
};
